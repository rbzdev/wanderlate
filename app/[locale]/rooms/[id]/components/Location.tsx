'use client';

import { MapPin } from 'lucide-react';
import { useLocale } from 'next-intl';

interface LocationProps {
    city: string;
    country: string;
}

export default function Location({ city, country }: LocationProps) {
    const locale = useLocale();

    return (
        <div>
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-4">
                {locale === 'fr' ? 'Localisation' : 'Location'}
            </h2>
            <div className="space-y-4">
                <div className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
                    <MapPin className="w-5 h-5 text-zinc-400" />
                    <span>{city}, {country}</span>
                </div>
                <div className="aspect-video bg-zinc-200 dark:bg-zinc-700 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                        <MapPin className="w-8 h-8 text-zinc-400 mx-auto mb-2" />
                        <p className="text-zinc-500 dark:text-zinc-400">
                            {locale === 'fr' ? 'Carte interactive' : 'Interactive map'}
                        </p>
                    </div>
                </div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    {locale === 'fr'
                        ? 'Adresse exacte communiquée après la réservation'
                        : 'Exact address provided after booking'
                    }
                </p>
            </div>
        </div>
    );
}