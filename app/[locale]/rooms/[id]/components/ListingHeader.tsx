'use client';

import { MapPin, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useLocale } from 'next-intl';

interface ListingHeaderProps {
    title: string;
    propertyType: string;
    city: string;
    country: string;
}

export default function ListingHeader({ title, propertyType, city, country }: ListingHeaderProps) {
    const locale = useLocale();

    return (
        <div>
            <div className="flex items-center justify-between mb-2">
                <Badge variant="secondary" className="text-xs">
                    {propertyType}
                </Badge>
                <div className="flex items-center gap-1 text-sm text-zinc-600 dark:text-zinc-400">
                    <Star className="w-4 h-4 fill-current" />
                    <span>4.8</span>
                    <span>•</span>
                    <span>127 {locale === 'fr' ? 'avis' : 'reviews'}</span>
                </div>
            </div>
            <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">
                {title}
            </h1>
            <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
                <MapPin className="w-4 h-4" />
                <span>{city}, {country}</span>
            </div>
        </div>
    );
}