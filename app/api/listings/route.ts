import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/prisma/prisma';
import { fetchUser } from "@/app/api/auth/server"

/**
 * POST /api/listings
 * Create a new listing
 */
export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const currentUser = await fetchUser();
    if (!currentUser || !currentUser.user) {
      return NextResponse.json(
        { error: 'Unauthorized - User not authenticated' },
        { status: 401 }
      );
    }

    // Verify user is a host
    if (currentUser.user.accountType !== 'host') {
      return NextResponse.json(
        { error: 'Forbidden - Only hosts can create listings' },
        { status: 403 }
      );
    }

    const body = await request.json();

    // Validate required fields
    const requiredFields = [
      'title',
      'propertyType',
      'description',
      'city',
      'country',
      'maxGuests',
      'bedrooms',
      'beds',
      'bathrooms',
      'photos',
      'pricePerNight',
      'minNights',
      'maxNights',
      'cancellationPolicy',
    ];

    const missingFields = requiredFields.filter((field) => !body[field]);
    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          error: 'Missing required fields',
          missingFields,
        },
        { status: 400 }
      );
    }

    // Validate data types and constraints
    if (body.description.length < 50) {
      return NextResponse.json(
        { error: 'Description must be at least 50 characters' },
        { status: 400 }
      );
    }

    if (body.photos.length === 0) {
      return NextResponse.json(
        { error: 'At least one photo is required' },
        { status: 400 }
      );
    }

    if (body.pricePerNight <= 0) {
      return NextResponse.json(
        { error: 'Price per night must be greater than 0' },
        { status: 400 }
      );
    }

    // Create listing
    const listing = await prisma.listing.create({
      data: {
        hostId: currentUser.user.id,
        title: body.title,
        propertyType: body.propertyType,
        description: body.description,
        city: body.city,
        country: body.country,
        address: body.address || null,
        postalCode: body.postalCode || null,
        maxGuests: parseInt(body.maxGuests),
        bedrooms: parseInt(body.bedrooms),
        beds: parseInt(body.beds),
        bathrooms: parseInt(body.bathrooms),
        amenities: body.amenities || [],
        photos: body.photos,
        mainPhotoIndex: body.mainPhotoIndex || 0,
        pricePerNight: parseFloat(body.pricePerNight),
        cleaningFee: parseFloat(body.cleaningFee || 0),
        minNights: parseInt(body.minNights),
        maxNights: parseInt(body.maxNights),
        cancellationPolicy: body.cancellationPolicy,
        status: 'active',
        isPublished: true,
      },
      include: {
        host: {
          select: {
            id: true,
            firstname: true,
            lastName: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json(
      {
        success: true,
        listing,
        message: 'Listing created successfully',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating listing:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/listings
 * Get all listings (with optional filters)
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const hostId = searchParams.get('hostId');
    const status = searchParams.get('status');
    const city = searchParams.get('city');
    const country = searchParams.get('country');

    const where: {
      hostId?: string;
      status?: string;
      isPublished?: boolean;
      city?: { contains: string; mode: 'insensitive' };
      country?: { contains: string; mode: 'insensitive' };
    } = {};

    if (hostId) {
      where.hostId = hostId;
    }

    if (status) {
      where.status = status;
    } else {
      // By default, only show active and published listings
      where.status = 'active';
      where.isPublished = true;
    }

    if (city) {
      where.city = { contains: city, mode: 'insensitive' };
    }

    if (country) {
      where.country = { contains: country, mode: 'insensitive' };
    }

    const listings = await prisma.listing.findMany({
      where,
      include: {
        host: {
          select: {
            id: true,
            firstname: true,
            lastName: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({
      success: true,
      count: listings.length,
      listings,
    });
  } catch (error) {
    console.error('Error fetching listings:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
