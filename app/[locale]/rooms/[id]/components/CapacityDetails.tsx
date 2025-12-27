'use client';

import { Users, Bed, Bath } from 'lucide-react';
import { useLocale } from 'next-intl';

interface CapacityDetailsProps {
    maxGuests: number;
    bedrooms: number;
    beds: number;
    bathrooms: number;
}

export default function CapacityDetails({ maxGuests, bedrooms, beds, bathrooms }: CapacityDetailsProps) {
    const locale = useLocale();

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 border border-zinc-200 dark:border-zinc-800 rounded-lg">
            <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-zinc-400" />
                <div>
                    <p className="font-medium text-zinc-900 dark:text-white">
                        {maxGuests} {locale === 'fr' ? 'voyageurs' : 'guests'}
                    </p>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        {locale === 'fr' ? 'Capacité' : 'Capacity'}
                    </p>
                </div>
            </div>
            <div className="flex items-center gap-3">
                <Bed className="w-5 h-5 text-zinc-400" />
                <div>
                    <p className="font-medium text-zinc-900 dark:text-white">
                        {bedrooms} {locale === 'fr' ? 'chambres' : 'bedrooms'}
                    </p>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        {locale === 'fr' ? 'Chambres' : 'Bedrooms'}
                    </p>
                </div>
            </div>
            <div className="flex items-center gap-3">
                <Bed className="w-5 h-5 text-zinc-400" />
                <div>
                    <p className="font-medium text-zinc-900 dark:text-white">
                        {beds} {locale === 'fr' ? 'lits' : 'beds'}
                    </p>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        {locale === 'fr' ? 'Lits' : 'Beds'}
                    </p>
                </div>
            </div>
            <div className="flex items-center gap-3">
                <Bath className="w-5 h-5 text-zinc-400" />
                <div>
                    <p className="font-medium text-zinc-900 dark:text-white">
                        {bathrooms} {locale === 'fr' ? 'salles de bain' : 'bathrooms'}
                    </p>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        {locale === 'fr' ? 'Salles de bain' : 'Bathrooms'}
                    </p>
                </div>
            </div>
        </div>
    );
}