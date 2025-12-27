'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { Icon } from '@iconify/react';

// Components
import { Button } from '@/components/ui/button';
import Navbar from '@/Blocks/navbar';
import { Listing } from '@/lib/types/listing';
import { GetListingById } from '@/app/api/action/listings';
import ImageGallery from './components/ImageGallery';
import ListingHeader from './components/ListingHeader';
import CapacityDetails from './components/CapacityDetails';
import Description from './components/Description';
import Amenities from './components/Amenities';
import Reviews from './components/Reviews';
import Location from './components/Location';
import Policies from './components/Policies';
import BookingCard from './components/BookingCard';
import HostInfo from './components/HostInfo';

interface Host {
    id: string;
    firstname: string;
    lastName: string;
    email: string;
    phone?: string;
}

interface ListingWithHost extends Listing {
    host: Host;
}

export default function RoomDetailsPage() {
    const params = useParams();
    const locale = useLocale();
    const listingId = params.id as string;

    const [listing, setListing] = useState<ListingWithHost | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch listing details
    useEffect(() => {
        async function fetchListing() {
            setIsLoading(true);
            setError(null);
            try {
                const listingData = await GetListingById(listingId);
                setListing(listingData);
            } catch (err) {
                console.error('Error fetching listing:', err);
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setIsLoading(false);
            }
        }

        if (listingId) {
            fetchListing();
        }
    }, [listingId]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-white dark:bg-zinc-950">
                <Navbar />
                <div className="flex items-center justify-center py-20">
                    <div className="text-center">
                        <Icon icon="lucide:loader-2" className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
                        <p className="text-zinc-600 dark:text-zinc-400">
                            {locale === 'fr' ? 'Chargement du logement...' : 'Loading accommodation...'}
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    if (error || !listing) {
        return (
            <div className="min-h-screen bg-white dark:bg-zinc-950">
                <Navbar />
                <div className="flex items-center justify-center py-20">
                    <div className="text-center">
                        <Icon icon="lucide:alert-circle" className="w-12 h-12 text-red-500 mx-auto mb-4" />
                        <p className="text-zinc-600 dark:text-zinc-400">
                            {locale === 'fr' ? 'Logement non trouvé' : 'Accommodation not found'}
                        </p>
                        <Link href={`/${locale}/explore`}>
                            <Button className="mt-4">
                                {locale === 'fr' ? 'Retour à la recherche' : 'Back to search'}
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white dark:bg-zinc-950">
            <Navbar />

            <ImageGallery photos={listing.photos} title={listing.title} />

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Details */}
                    <div className="lg:col-span-2 space-y-8">
                        <ListingHeader
                            title={listing.title}
                            propertyType={listing.propertyType}
                            city={listing.city}
                            country={listing.country}
                        />

                        <CapacityDetails
                            maxGuests={listing.maxGuests}
                            bedrooms={listing.bedrooms}
                            beds={listing.beds}
                            bathrooms={listing.bathrooms}
                        />

                        <Description description={listing.description} />

                        <Amenities amenities={listing.amenities} />

                        <Reviews />

                        <Location city={listing.city} country={listing.country} />

                        <Policies minNights={listing.minNights} cancellationPolicy={listing.cancellationPolicy} />
                    </div>

                    {/* Right Column - Booking & Host */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-8">
                            <BookingCard pricePerNight={listing.pricePerNight} />

                            <HostInfo host={listing.host} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}