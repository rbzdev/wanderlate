'use client';

import { Star, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocale } from 'next-intl';

interface BookingCardProps {
    pricePerNight: number;
}

export default function BookingCard({ pricePerNight }: BookingCardProps) {
    const locale = useLocale();

    return (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <span className="text-2xl font-bold text-zinc-900 dark:text-white">
                        {pricePerNight}€
                    </span>
                    <span className="text-zinc-500 dark:text-zinc-400">
                        {locale === 'fr' ? ' / nuit' : ' / night'}
                    </span>
                </div>
                <div className="flex items-center gap-1 text-sm text-zinc-600 dark:text-zinc-400">
                    <Star className="w-4 h-4 fill-current" />
                    <span>4.8</span>
                </div>
            </div>

            <div className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                    <div className="border border-zinc-200 dark:border-zinc-700 rounded-lg p-3">
                        <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1">
                            {locale === 'fr' ? 'ARRIVÉE' : 'CHECK-IN'}
                        </label>
                        <div className="text-sm text-zinc-900 dark:text-white">
                            {locale === 'fr' ? 'Sélectionner' : 'Select'}
                        </div>
                    </div>
                    <div className="border border-zinc-200 dark:border-zinc-700 rounded-lg p-3">
                        <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1">
                            {locale === 'fr' ? 'DÉPART' : 'CHECK-OUT'}
                        </label>
                        <div className="text-sm text-zinc-900 dark:text-white">
                            {locale === 'fr' ? 'Sélectionner' : 'Select'}
                        </div>
                    </div>
                </div>

                <div className="border border-zinc-200 dark:border-zinc-700 rounded-lg p-3">
                    <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1">
                        {locale === 'fr' ? 'VOYAGEURS' : 'GUESTS'}
                    </label>
                    <div className="text-sm text-zinc-900 dark:text-white">
                        1 {locale === 'fr' ? 'voyageur' : 'guest'}
                    </div>
                </div>

                <Button className="w-full bg-primary hover:bg-primary/90 text-white py-3">
                    <Calendar className="w-4 h-4 mr-2" />
                    {locale === 'fr' ? 'Réserver' : 'Reserve'}
                </Button>
            </div>
        </div>
    );
}