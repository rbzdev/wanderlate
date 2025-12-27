"use server";
import {prisma} from "@/prisma/prisma";

export async function GetListingById(listingId: string) {
    if (!listingId) {
        throw new Error('Listing ID is required');
    }

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
        throw new Error('Listing not found');
    }

    // Check if listing is published and active
    if (!listing.isPublished || listing.status !== 'active') {
        throw new Error('Listing not available');
    }

    return listing;
}
