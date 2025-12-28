/* eslint-disable @typescript-eslint/no-explicit-any */
import { Suspense } from 'react'
import { Icon } from '@iconify/react'
import Image from 'next/image'

// UI Components
import Navbar from '@/Blocks/navbar'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Listing } from '@/lib/types/listing'
import { prisma } from '@/prisma/prisma'

interface SearchParams {
    destination?: string
    checkIn?: string
    checkOut?: string
    adults?: string
    children?: string
    babies?: string
    pets?: string
    type?: string
    maxPrice?: string
}

async function searchListings(searchParams: SearchParams): Promise<Listing[]> {
    console.log('searchListings called with:', searchParams)

    const where: any = {
        // Only show active and published listings
        status: 'active',
        isPublished: true,
    };

    // Destination search (search in city, country, address, title, description)
    if (searchParams.destination) {
        where.OR = [
            { city: { contains: searchParams.destination, mode: 'insensitive' } },
            { country: { contains: searchParams.destination, mode: 'insensitive' } },
            { address: { contains: searchParams.destination, mode: 'insensitive' } },
            { title: { contains: searchParams.destination, mode: 'insensitive' } },
            { description: { contains: searchParams.destination, mode: 'insensitive' } },
        ];
    }

    // Guests filter - ensure listing can accommodate the number of guests
    const totalGuests = Number(searchParams.adults || 0) + Number(searchParams.children || 0) + Number(searchParams.babies || 0)
    if (totalGuests > 0) {
        where.maxGuests = { gte: totalGuests };
    }

    console.log('Prisma where clause:', where)

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

    console.log(`Found ${listings.length} listings`)
    return listings
}

async function ResultsContent({ searchParams }: { searchParams: SearchParams }) {
    const checkInDate = searchParams.checkIn ? new Date(searchParams.checkIn) : undefined
    const checkOutDate = searchParams.checkOut ? new Date(searchParams.checkOut) : undefined
    const totalGuests = Number(searchParams.adults || 0) + Number(searchParams.children || 0) + Number(searchParams.babies || 0)

    const listings = await searchListings(searchParams)

    if (listings.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center">
                <Icon icon="mynaui:search" width="64" height="64" className="text-gray-300 mb-4" />
                <h2 className="text-2xl font-semibold mb-2">Aucun résultat trouvé</h2>
                <p className="text-gray-600 mb-6">
                    Essayez de modifier vos critères de recherche
                </p>
                <Button onClick={() => window.history.back()}>
                    <Icon icon="mynaui:arrow-left" width="20" height="20" className="mr-2" />
                    Retour
                </Button>
            </div>
        )
    }

    return (

        <div className="py-8">

            <div className="mb-6">
                <h1 className="text-3xl font-bold mb-2">
                    {listings.length} {listings.length === 1 ? 'résultat trouvé' : 'résultats trouvés'}
                </h1>
                <p className="text-gray-600">
                    {searchParams.destination && `Destination: ${searchParams.destination}`}
                    {checkInDate && checkOutDate && ` • ${checkInDate.toLocaleDateString('fr-FR')} - ${checkOutDate.toLocaleDateString('fr-FR')}`}
                    {totalGuests > 0 && ` • ${totalGuests} ${totalGuests === 1 ? 'personne' : 'personnes'}`}
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {listings.map((listing) => (
                    <div
                        key={listing.id}
                        className="group cursor-pointer rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300"
                    >
                        {/* Image */}
                        <div className="relative h-64 overflow-hidden">
                            <Image
                                src={listing.photos[listing.mainPhotoIndex] || listing.photos[0] || '/placeholder.jpg'}
                                alt={listing.title}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                            <div className="absolute top-3 right-3">
                                <Badge variant="outline">{listing.propertyType}</Badge>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-4">
                            <h3 className="text-xl font-semibold mb-1 group-hover:text-blue-600 transition-colors">
                                {listing.title}
                            </h3>

                            <div className="flex items-center text-gray-600 mb-3">
                                <Icon icon="mynaui:location" width="16" height="16" className="mr-1" />
                                <span className="text-sm">
                                    {listing.city}, {listing.country}
                                </span>
                            </div>

                            <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                                {listing.description}
                            </p>

                            {/* Capacity */}
                            <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                                <span>{listing.maxGuests} voyageurs</span>
                                <span>{listing.bedrooms} ch.</span>
                                <span>{listing.bathrooms} sdb</span>
                            </div>

                            {/* Amenities */}
                            <div className="flex flex-wrap gap-2 mb-3">
                                {listing.amenities.slice(0, 3).map((amenity) => (
                                    <span key={amenity} className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                                        {amenity}
                                    </span>
                                ))}
                                {listing.amenities.length > 3 && (
                                    <span className="text-xs text-gray-500">
                                        +{listing.amenities.length - 3} plus
                                    </span>
                                )}
                            </div>

                            {/* Price */}
                            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                                <div>
                                    <span className="text-2xl font-bold text-blue-600">
                                        {listing.pricePerNight.toLocaleString('fr-FR')} €
                                    </span>
                                    <span className="text-sm text-gray-600"> / nuit</span>
                                </div>
                                <Button size="sm">
                                    Réserver
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default function ResultsPage({
    searchParams
}: {
    searchParams: { [key: string]: string | string[] | undefined }
}) {
    // Convert Next.js searchParams to our SearchParams interface
    const params: SearchParams = {
        destination: typeof searchParams.destination === 'string' ? searchParams.destination : undefined,
        checkIn: typeof searchParams.checkIn === 'string' ? searchParams.checkIn : undefined,
        checkOut: typeof searchParams.checkOut === 'string' ? searchParams.checkOut : undefined,
        adults: typeof searchParams.adults === 'string' ? searchParams.adults : undefined,
        children: typeof searchParams.children === 'string' ? searchParams.children : undefined,
        babies: typeof searchParams.babies === 'string' ? searchParams.babies : undefined,
        pets: typeof searchParams.pets === 'string' ? searchParams.pets : undefined,
        type: typeof searchParams.type === 'string' ? searchParams.type : undefined,
        maxPrice: typeof searchParams.maxPrice === 'string' ? searchParams.maxPrice : undefined,
    }

    return (
        <>
            <Navbar />
            <div className="container mx-auto px-4">

                <Suspense
                    fallback={
                        <div className="flex items-center justify-center py-20 h-screen">
                            <Icon icon="svg-spinners:ring-resize"  className="text-xl text-neutral-600" />
                            <span className="ml-3 text-lg">Recherche en cours...</span>
                        </div>
                    }
                >
                    <ResultsContent searchParams={params} />
                </Suspense>
            </div>
        </>
    )
}
