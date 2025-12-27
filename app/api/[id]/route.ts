import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/prisma/prisma';

/**
 * GET /api/listings/[id]
 * Get a specific listing by ID
 */
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id: listingId } = await params;

        if (!listingId) {
            return NextResponse.json(
                { error: 'Listing ID is required' },
                { status: 400 }
            );
        }

        // DEBUG
        console.error("Fetching listing with ID:", listingId);

        const listing = await prisma.listing.findUnique({
            where: {
                id: listingId,
            },
            include: {
                host: {
                    select: {
                        id: true,
                        firstname: true,
                        lastName: true,
                        email: true,
                        phone: true,
                    },
                },
            },
        });

        if (!listing) {
            return NextResponse.json(
                { error: 'Listing not found' },
                { status: 404 }
            );
        }

        // Check if listing is published and active
        if (!listing.isPublished || listing.status !== 'active') {
            return NextResponse.json(
                { error: 'Listing not available' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            listing,
        });
    } catch (error) {
        console.error('Error fetching listing:', error);
        return NextResponse.json(
            {
                error: 'Internal server error',
                details: error instanceof Error ? error.message : 'Unknown error',
            },
            { status: 500 }
        );
    }
}