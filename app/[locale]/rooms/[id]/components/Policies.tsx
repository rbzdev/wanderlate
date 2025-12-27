'use client';

import { useLocale } from 'next-intl';

interface PoliciesProps {
    minNights: number;
    cancellationPolicy: string;
}

export default function Policies({ minNights, cancellationPolicy }: PoliciesProps) {
    const locale = useLocale();

    return (
        <div>
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-4">
                {locale === 'fr' ? 'Politiques' : 'Policies'}
            </h2>
            <div className="space-y-3">
                <div className="flex justify-between items-center py-3 border-b border-zinc-200 dark:border-zinc-800">
                    <span className="text-zinc-700 dark:text-zinc-300">
                        {locale === 'fr' ? 'Arrivée' : 'Check-in'}
                    </span>
                    <span className="font-medium text-zinc-900 dark:text-white">
                        {locale === 'fr' ? 'À partir de 15h' : 'After 3 PM'}
                    </span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-zinc-200 dark:border-zinc-800">
                    <span className="text-zinc-700 dark:text-zinc-300">
                        {locale === 'fr' ? 'Départ' : 'Check-out'}
                    </span>
                    <span className="font-medium text-zinc-900 dark:text-white">
                        {locale === 'fr' ? 'Jusqu\'à 11h' : 'Before 11 AM'}
                    </span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-zinc-200 dark:border-zinc-800">
                    <span className="text-zinc-700 dark:text-zinc-300">
                        {locale === 'fr' ? 'Séjour minimum' : 'Minimum stay'}
                    </span>
                    <span className="font-medium text-zinc-900 dark:text-white">
                        {minNights} {locale === 'fr' ? 'nuits' : 'nights'}
                    </span>
                </div>
                <div className="flex justify-between items-center py-3">
                    <span className="text-zinc-700 dark:text-zinc-300">
                        {locale === 'fr' ? 'Politique d\'annulation' : 'Cancellation policy'}
                    </span>
                    <span className="font-medium text-zinc-900 dark:text-white">
                        {cancellationPolicy}
                    </span>
                </div>
            </div>
        </div>
    );
}