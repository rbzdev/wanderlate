'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import { MapPin } from 'lucide-react';
import { useLocale } from 'next-intl';
import { Listing } from '@/lib/types/listing';

interface ListingsGridProps {
    listings: Listing[];
    viewMode: 'grid' | 'list';
    isLoading: boolean;
    error: string | null;
}

export default function ListingsGrid({ listings, viewMode, isLoading, error }: ListingsGridProps) {
    const locale = useLocale();

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-20">
                <div className="text-center">
                    <Icon icon="lucide:loader-2" className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
                    <p className="text-zinc-600 dark:text-zinc-400">
                        {locale === 'fr' ? 'Chargement des hébergements...' : 'Loading accommodations...'}
                    </p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center py-20">
                <div className="text-center">
                    <Icon icon="lucide:alert-circle" className="w-12 h-12 text-red-500 mx-auto mb-4" />
                    <p className="text-zinc-600 dark:text-zinc-400">
                        {locale === 'fr' ? 'Erreur lors du chargement' : 'Error loading accommodations'}
                    </p>
                </div>
            </div>
        );
    }

    if (listings.length === 0) {
        return (
            <div className="flex items-center justify-center py-20">
                <div className="text-center">
                    <Icon icon="lucide:home" className="w-12 h-12 text-zinc-400 mx-auto mb-4" />
                    <p className="text-zinc-600 dark:text-zinc-400">
                        {locale === 'fr' ? 'Aucun hébergement trouvé' : 'No accommodations found'}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : 'space-y-4'}>
            {listings.map((listing) => (
                <Link
                    key={listing.id}
                    href={`/${locale}/rooms/${listing.id}`}
                    className="group"
                >
                    <div className="bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 hover:shadow-xl transition-all duration-300">
                        {/* Image */}
                        <div className="relative aspect-[4/3] overflow-hidden">
                            {listing.photos && listing.photos.length > 0 ? (
                                <Image
                                    src={listing.photos[listing.mainPhotoIndex || 0]}
                                    alt={listing.title}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                                />
                            ) : (
                                <div className="w-full h-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center">
                                    <Icon icon="lucide:image" className="w-12 h-12 text-zinc-400" />
                                </div>
                            )}

                            {/* Badges */}
                            <div className="absolute top-3 left-3 flex gap-2">
                                <span className="px-3 py-1 bg-primary backdrop-blur-sm rounded-full text-xs font-medium text-white">
                                    {locale === 'fr' ? 'Nouveau' : 'New'}
                                </span>
                            </div>

                            {/* Type Badge */}
                            <div className="absolute bottom-3 left-3">
                                <span className="px-3 py-1 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-sm rounded-full text-xs font-medium text-zinc-700 dark:text-zinc-300">
                                    {listing.propertyType}
                                </span>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-4">
                            {/* Location */}
                            <div className="flex items-center gap-1 mb-2">
                                <MapPin className="w-4 h-4 text-zinc-400" />
                                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                                    {listing.city}, {listing.country}
                                </p>
                            </div>

                            {/* Title */}
                            <h3 className="text-base font-semibold text-zinc-900 dark:text-white mb-3 line-clamp-1 group-hover:text-primary transition-colors">
                                {listing.title}
                            </h3>

                            {/* Capacity & Price */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                                    <Icon icon="lucide:users" className="w-4 h-4" />
                                    <span>{listing.maxGuests} {locale === 'fr' ? 'voyageurs' : 'guests'}</span>
                                </div>

                                <div className="text-right">
                                    <p className="text-lg font-bold text-zinc-900 dark:text-white">
                                        {listing.pricePerNight}€
                                        <span className="text-sm font-normal text-zinc-500 dark:text-zinc-400">
                                            {locale === 'fr' ? ' / nuit' : ' / night'}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}