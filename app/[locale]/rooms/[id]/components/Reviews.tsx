'use client';

import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocale } from 'next-intl';

export default function Reviews() {
    const locale = useLocale();

    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
                    <Star className="w-5 h-5 inline mr-2 fill-current" />
                    4.8 • 127 {locale === 'fr' ? 'avis' : 'reviews'}
                </h2>
                <Button variant="outline" size="sm">
                    {locale === 'fr' ? 'Voir tous les avis' : 'Show all reviews'}
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <span className="text-zinc-700 dark:text-zinc-300">
                            {locale === 'fr' ? 'Propreté' : 'Cleanliness'}
                        </span>
                        <div className="flex items-center gap-2">
                            <div className="w-24 h-2 bg-zinc-200 dark:bg-zinc-700 rounded-full">
                                <div className="w-20 h-2 bg-green-500 rounded-full"></div>
                            </div>
                            <span className="text-sm font-medium">4.9</span>
                        </div>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-zinc-700 dark:text-zinc-300">
                            {locale === 'fr' ? 'Communication' : 'Communication'}
                        </span>
                        <div className="flex items-center gap-2">
                            <div className="w-24 h-2 bg-zinc-200 dark:bg-zinc-700 rounded-full">
                                <div className="w-20 h-2 bg-green-500 rounded-full"></div>
                            </div>
                            <span className="text-sm font-medium">4.8</span>
                        </div>
                    </div>
                </div>
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <span className="text-zinc-700 dark:text-zinc-300">
                            {locale === 'fr' ? 'Arrivée' : 'Check-in'}
                        </span>
                        <div className="flex items-center gap-2">
                            <div className="w-24 h-2 bg-zinc-200 dark:bg-zinc-700 rounded-full">
                                <div className="w-18 h-2 bg-green-500 rounded-full"></div>
                            </div>
                            <span className="text-sm font-medium">4.7</span>
                        </div>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-zinc-700 dark:text-zinc-300">
                            {locale === 'fr' ? 'Exactitude' : 'Accuracy'}
                        </span>
                        <div className="flex items-center gap-2">
                            <div className="w-24 h-2 bg-zinc-200 dark:bg-zinc-700 rounded-full">
                                <div className="w-20 h-2 bg-green-500 rounded-full"></div>
                            </div>
                            <span className="text-sm font-medium">4.8</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}