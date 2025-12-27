'use client';

import { useState } from 'react';
import { Icon } from '@iconify/react';
import { Star, Phone, Mail, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocale } from 'next-intl';

interface Host {
    id: string;
    firstname: string;
    lastName: string;
    email: string;
    phone?: string;
}

interface HostInfoProps {
    host: Host;
}

export default function HostInfo({ host }: HostInfoProps) {
    const locale = useLocale();
    const [showContactInfo, setShowContactInfo] = useState(false);

    return (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-6 mt-6">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
                {locale === 'fr' ? 'Rencontrez votre hôte' : 'Meet your host'}
            </h3>

            <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-zinc-200 dark:bg-zinc-700 rounded-full flex items-center justify-center">
                    <span className="text-lg font-semibold text-zinc-600 dark:text-zinc-300">
                        {host.firstname[0]}{host.lastName[0]}
                    </span>
                </div>
                <div>
                    <p className="font-medium text-zinc-900 dark:text-white">
                        {host.firstname} {host.lastName}
                    </p>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        {locale === 'fr' ? 'Hôte' : 'Host'}
                    </p>
                </div>
            </div>

            <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                    <Star className="w-4 h-4 fill-current" />
                    <span>4.9 {locale === 'fr' ? 'évaluation' : 'rating'}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                    <Icon icon="lucide:shield" className="w-4 h-4" />
                    <span>{locale === 'fr' ? 'Hôte vérifié' : 'Verified host'}</span>
                </div>
            </div>

            <Button
                variant="outline"
                className="w-full mt-4"
                onClick={() => setShowContactInfo(!showContactInfo)}
            >
                <MessageCircle className="w-4 h-4 mr-2" />
                {locale === 'fr' ? 'Contacter l\'hôte' : 'Contact host'}
            </Button>

            {showContactInfo && (
                <div className="mt-4 p-4 bg-zinc-50 dark:bg-zinc-800 rounded-lg space-y-3">
                    <div className="flex items-center gap-3">
                        <Mail className="w-4 h-4 text-zinc-400" />
                        <span className="text-sm text-zinc-700 dark:text-zinc-300">
                            {host.email}
                        </span>
                    </div>
                    {host.phone && (
                        <div className="flex items-center gap-3">
                            <Phone className="w-4 h-4 text-zinc-400" />
                            <span className="text-sm text-zinc-700 dark:text-zinc-300">
                                {host.phone}
                            </span>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}