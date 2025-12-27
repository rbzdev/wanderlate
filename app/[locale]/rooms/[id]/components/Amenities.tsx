'use client';

import { Icon } from '@iconify/react';
import { Wifi, Car, ChefHat, Waves, Mountain, Home } from 'lucide-react';
import { useLocale } from 'next-intl';

const amenityIcons: Record<string, React.ComponentType<{ className?: string }>> = {
    wifi: Wifi,
    parking: Car,
    kitchen: ChefHat,
    pool: Waves,
    mountain: Mountain,
    home: Home,
};

interface AmenitiesProps {
    amenities: string[];
}

export default function Amenities({ amenities }: AmenitiesProps) {
    const locale = useLocale();

    if (!amenities || amenities.length === 0) {
        return null;
    }

    return (
        <div>
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-4">
                {locale === 'fr' ? 'Équipements' : 'Amenities'}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {amenities.map((amenity, index) => {
                    const IconComponent = amenityIcons[amenity] || Home;
                    return (
                        <div key={index} className="flex items-center gap-3">
                            <IconComponent className="w-5 h-5 text-zinc-400" />
                            <span className="text-zinc-700 dark:text-zinc-300 capitalize">
                                {amenity}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}