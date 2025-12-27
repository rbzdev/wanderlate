'use client';

import { MapPin, Calendar, Users, Search } from 'lucide-react';
import { useLocale } from 'next-intl';
import { Button } from '@/components/ui/button';

export default function SearchBar() {
    const locale = useLocale();

    return (
        <div className="bg-gradient-to-tl from-primary via-secondary to-secondary dark:from-zinc-950 dark:to-zinc-900 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="bg-white dark:bg-zinc-800 rounded-full shadow-xl p-2 flex flex-col md:flex-row gap-2 md:gap-0">
                    {/* Destination */}
                    <div className="flex-1 flex items-center gap-3 px-4 py-3 hover:bg-zinc-50 dark:hover:bg-zinc-700 rounded-full transition-colors cursor-pointer">
                        <MapPin className="w-5 h-5 text-zinc-400" />
                        <div className="flex-1">
                            <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                                {locale === 'fr' ? 'Où allez-vous ?' : 'Where to?'}
                            </p>
                        </div>
                    </div>

                    <div className="hidden md:block w-px bg-zinc-200 dark:bg-zinc-700 my-2"></div>

                    {/* Dates */}
                    <div className="flex-1 flex items-center gap-3 px-4 py-3 hover:bg-zinc-50 dark:hover:bg-zinc-700 rounded-full transition-colors cursor-pointer">
                        <Calendar className="w-5 h-5 text-zinc-400" />
                        <div className="flex-1">
                            <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                                {locale === 'fr' ? "N'importe quand" : 'Anytime'}
                            </p>
                        </div>
                    </div>

                    <div className="hidden md:block w-px bg-zinc-200 dark:bg-zinc-700 my-2"></div>

                    {/* Guests */}
                    <div className="flex-1 flex items-center gap-3 px-4 py-3 hover:bg-zinc-50 dark:hover:bg-zinc-700 rounded-full transition-colors cursor-pointer">
                        <Users className="w-5 h-5 text-zinc-400" />
                        <div className="flex-1">
                            <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                                {locale === 'fr' ? '2 voyageurs' : '2 guests'}
                            </p>
                        </div>
                    </div>

                    {/* Search Button */}
                    <Button className="bg-primary hover:bg-primary/90 text-white rounded-full h-12 w-12 md:w-auto px-6 flex items-center justify-center gap-2">
                        <Search className="w-5 h-5" />
                        <span className="hidden md:inline">{locale === 'fr' ? 'Rechercher' : 'Search'}</span>
                    </Button>
                </div>
            </div>
        </div>
    );
}