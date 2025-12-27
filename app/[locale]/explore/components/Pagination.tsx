'use client';

import { Icon } from '@iconify/react';
import { useLocale } from 'next-intl';
import { Button } from '@/components/ui/button';

interface PaginationProps {
    currentPage: number;
    setCurrentPage: (page: number) => void;
    totalPages: number;
}

export default function Pagination({ currentPage, setCurrentPage, totalPages }: PaginationProps) {
    const locale = useLocale();

    if (totalPages <= 1) return null;

    return (
        <div className="flex items-center justify-center gap-2 mt-12">
            <Button
                variant="outline"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="gap-2"
            >
                <Icon icon="lucide:chevron-left" className="w-4 h-4" />
                {locale === 'fr' ? 'Précédent' : 'Previous'}
            </Button>

            <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                            currentPage === page
                                ? 'bg-primary text-white'
                                : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                        }`}
                    >
                        {page}
                    </button>
                ))}
            </div>

            <Button
                variant="outline"
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="gap-2"
            >
                {locale === 'fr' ? 'Suivant' : 'Next'}
                <Icon icon="lucide:chevron-right" className="w-4 h-4" />
            </Button>
        </div>
    );
}