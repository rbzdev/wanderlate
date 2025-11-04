import { Suspense } from 'react'
import { searchDestinations } from '@/api/destinations'
import { Icon } from '@iconify/react'
import Image from 'next/image'

// UI Components
import Navbar from '@/Blocks/navbar'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

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

async function ResultsContent({ searchParams }: { searchParams: SearchParams }) {
    const checkInDate = searchParams.checkIn ? new Date(searchParams.checkIn) : undefined
    const checkOutDate = searchParams.checkOut ? new Date(searchParams.checkOut) : undefined
    const totalGuests = Number(searchParams.adults || 0) + Number(searchParams.children || 0)

    const results = await searchDestinations({
        destination: searchParams.destination || '',
        checkIn: checkInDate,
        checkOut: checkOutDate,
        guests: totalGuests,
        type: searchParams.type ? [searchParams.type as 'hotel' | 'villa' | 'resort' | 'apartment'] : undefined,
        maxPrice: searchParams.maxPrice ? Number(searchParams.maxPrice) : undefined
    })

    if (results.length === 0) {
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
                    {results.length} {results.length === 1 ? 'résultat trouvé' : 'résultats trouvés'}
                </h1>
                <p className="text-gray-600">
                    {searchParams.destination && `Destination: ${searchParams.destination}`}
                    {checkInDate && checkOutDate && ` • ${checkInDate.toLocaleDateString('fr-FR')} - ${checkOutDate.toLocaleDateString('fr-FR')}`}
                    {totalGuests > 0 && ` • ${totalGuests} ${totalGuests === 1 ? 'personne' : 'personnes'}`}
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {results.map((destination) => (
                    <div
                        key={destination.id}
                        className="group cursor-pointer rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300"
                    >
                        {/* Image */}
                        <div className="relative h-64 overflow-hidden">
                            <Image
                                src={destination.images[0]}
                                alt={destination.name}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                            {!destination.available && (
                                <div className="absolute top-3 right-3">
                                    <Badge variant="destructive">Complet</Badge>
                                </div>
                            )}
                            {destination.starRating && (
                                <div className="absolute top-3 left-3 bg-white/90 px-2 py-1 rounded-full flex items-center gap-1">
                                    <Icon icon="mynaui:star-solid" width="16" height="16" className="text-yellow-500" />
                                    <span className="text-sm font-semibold">{destination.starRating}</span>
                                </div>
                            )}
                        </div>

                        {/* Content */}
                        <div className="p-4">
                            <div className="mb-2">
                                <Badge variant="outline" className="mb-2">
                                    {destination.type === 'hotel' && 'Hôtel'}
                                    {destination.type === 'villa' && 'Villa'}
                                    {destination.type === 'resort' && 'Resort'}
                                    {destination.type === 'apartment' && 'Appartement'}
                                </Badge>
                            </div>

                            <h3 className="text-xl font-semibold mb-1 group-hover:text-blue-600 transition-colors">
                                {destination.name}
                            </h3>

                            <div className="flex items-center text-gray-600 mb-3">
                                <Icon icon="mynaui:location" width="16" height="16" className="mr-1" />
                                <span className="text-sm">
                                    {destination.location.city}, {destination.location.country}
                                </span>
                            </div>

                            <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                                {destination.description}
                            </p>

                            {/* Amenities */}
                            <div className="flex flex-wrap gap-2 mb-3">
                                {destination.amenities.slice(0, 3).map((amenity) => (
                                    <span key={amenity} className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                                        {amenity}
                                    </span>
                                ))}
                                {destination.amenities.length > 3 && (
                                    <span className="text-xs text-gray-500">
                                        +{destination.amenities.length - 3} plus
                                    </span>
                                )}
                            </div>

                            {/* Price */}
                            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                                <div>
                                    <span className="text-2xl font-bold text-blue-600">
                                        {destination.pricePerNight.amount.toLocaleString('fr-FR')} €
                                    </span>
                                    <span className="text-sm text-gray-600"> / nuit</span>
                                </div>
                                <Button size="sm" disabled={!destination.available}>
                                    {destination.available ? 'Réserver' : 'Complet'}
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
    searchParams: SearchParams
}) {
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
                    <ResultsContent searchParams={searchParams} />
                </Suspense>
            </div>
        </>
    )
}
