'use client';

import { useLocale } from 'next-intl';

interface DescriptionProps {
    description: string;
}

export default function Description({ description }: DescriptionProps) {
    const locale = useLocale();

    return (
        <div>
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-4">
                {locale === 'fr' ? 'À propos de ce logement' : 'About this place'}
            </h2>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                {description}
            </p>
        </div>
    );
}