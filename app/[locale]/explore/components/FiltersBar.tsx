'use client';

import { SlidersHorizontal, Grid3x3, List } from 'lucide-react';
import { useLocale } from 'next-intl';
import { Button } from '@/components/ui/button';

interface FiltersBarProps {
    filteredListingsCount: number;
    sortBy: string;
    setSortBy: (sort: string) => void;
    viewMode: 'grid' | 'list';
    setViewMode: (mode: 'grid' | 'list') => void;
}

export default function FiltersBar({
    filteredListingsCount,
    sortBy,
    setSortBy,
    viewMode,
    setViewMode
}: FiltersBarProps) {
    const locale = useLocale();

    return (
        <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
                <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">
                    {locale === 'fr' ? 'Tous les hébergements' : 'All accommodations'}
                </h1>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    {filteredListingsCount} {locale === 'fr' ? 'hébergements trouvés' : 'properties found'}
                </p>
            </div>

            <div className="flex items-center gap-4">
                {/* Sort */}
                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="text-sm px-4 py-2 border border-zinc-200 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 cursor-pointer outline-none"
                >
                    <option value="relevance">{locale === 'fr' ? 'Pertinence' : 'Relevance'}</option>
                    <option value="price-asc">{locale === 'fr' ? 'Prix croissant' : 'Price: Low to High'}</option>
                    <option value="price-desc">{locale === 'fr' ? 'Prix décroissant' : 'Price: High to Low'}</option>
                    <option value="rating">{locale === 'fr' ? 'Meilleures notes' : 'Top rated'}</option>
                </select>

                {/* Filters Button */}
                <Button variant="outline" className="gap-2">
                    <SlidersHorizontal className="w-4 h-4" />
                    {locale === 'fr' ? 'Filtres' : 'Filters'}
                </Button>

                {/* View Toggle */}
                <div className="hidden md:flex items-center gap-1 p-1 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
                    <button
                        onClick={() => setViewMode('grid')}
                        className={`p-2 rounded ${
                            viewMode === 'grid'
                                ? 'bg-white dark:bg-zinc-700 shadow-sm'
                                : 'text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300'
                        }`}
                    >
                        <Grid3x3 className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => setViewMode('list')}
                        className={`p-2 rounded ${
                            viewMode === 'list'
                                ? 'bg-white dark:bg-zinc-700 shadow-sm'
                                : 'text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300'
                        }`}
                    >
                        <List className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
}