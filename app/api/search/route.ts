/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/prisma/prisma';

interface SearchParams {
    destination?: string;
    guests?: string;
    checkIn?: string;
    checkOut?: string;
    minNights?: string;
    maxNights?: string;
    status?: string;
}

/**
 * GET /api/search
 * Search for available listings based on user criteria
 */
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);


        // DEBUG: Log search parameters
        console.log("##############################################################");
        console.log('############################# Search Parameters:', Object.fromEntries(searchParams.entries()));
        console.log("##############################################################");

        const destination = searchParams.get('destination');
        const guests = searchParams.get('guests');
        const checkIn = searchParams.get('checkIn');
        const checkOut = searchParams.get('checkOut');
        const minNights = searchParams.get('minNights');
        const maxNights = searchParams.get('maxNighSearchParams');

        const where: any = {
            // Only show active and published listings
            status: 'active',
            isPublished: true,
        };

        // Destination search (search in city, country, address, title, description)
        if (destination) {
            where.OR = [
                { city: { contains: destination, mode: 'insensitive' } },
                { country: { contains: destination, mode: 'insensitive' } },
                { address: { contains: destination, mode: 'insensitive' } },
                { title: { contains: destination, mode: 'insensitive' } },
                { description: { contains: destination, mode: 'insensitive' } },
            ];
        }

        // Guests filter - ensure listing can accommodate the number of guests
        if (guests) {
            const guestCount = parseInt(guests);
            if (!isNaN(guestCount) && guestCount > 0) {
                where.maxGuests = { gte: guestCount };
            }
        }

        // Nights filter - ensure listing allows the requested stay duration
        if (minNights) {
            const minNightsValue = parseInt(minNights);
            if (!isNaN(minNightsValue) && minNightsValue > 0) {
                where.minNights = { lte: minNightsValue };
            }
        }

        if (maxNights) {
            const maxNightsValue = parseInt(maxNights);
            if (!isNaN(maxNightsValue) && maxNightsValue > 0) {
                where.maxNights = { gte: maxNightsValue };
            }
        }

        // TODO: Add date availability filtering when booking system is implemented
        // For now, we skip date filtering as it requires a separate bookings/availability system

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
            searchCriteria: {
                destination,
                guests: guests ? parseInt(guests) : undefined,
                checkIn,
                checkOut,
                minNights: minNights ? parseInt(minNights) : undefined,
                maxNights: maxNights ? parseInt(maxNights) : undefined,
            },
        });
    } catch (error) {
        console.error('Error searching listings:', error);
        return NextResponse.json(
            {
                error: 'Internal server error',
                details: error instanceof Error ? error.message : 'Unknown error',
            },
            { status: 500 }
        );
    }
}