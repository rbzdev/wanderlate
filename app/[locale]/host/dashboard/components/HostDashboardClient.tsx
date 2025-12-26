'use client';

import { useState } from 'react';
// import AnimatedBackground from '@/components/ui/animated-tabs';
import { Tab } from '@/components/ui/tab';
import { Icon } from '@iconify/react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Listing } from '@/lib/types/listing';

interface HostDashboardClientProps {
  locale: string;
  listings: Listing[];
}

export function HostDashboardClient({ locale, listings }: HostDashboardClientProps) {
  const [activeTab, setActiveTab] = useState<string>('sejours');

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
      {/* Tabs Navigation */}
      <div className="flex border-b bg-primary/5 p-1 border-zinc-200 dark:border-zinc-800 ">
        <div className="flex w-full gap-2 justify-between">
          <Tab
            text="Séjours"
            selected={activeTab === 'sejours'}
            setSelected={() => setActiveTab('sejours')}
          />
          <Tab
            text="Calendrier"
            selected={activeTab === 'calendrier'}
            setSelected={() => setActiveTab('calendrier')}
          />
          <Tab
            text="Réservations"
            selected={activeTab === 'reservations'}
            setSelected={() => setActiveTab('reservations')}
          />
          <Tab
            text="Revenus"
            selected={activeTab === 'revenus'}
            setSelected={() => setActiveTab('revenus')}
          />
          <Tab
            text="Messages"
            selected={activeTab === 'messages'}
            setSelected={() => setActiveTab('messages')}
          />
        </div>
      </div>

      {/* Tab Content */}
      <div className="min-h-[500px] ">
        {activeTab === 'sejours' && <SejoursContent locale={locale} listings={listings} />}
        {activeTab === 'calendrier' && <CalendrierContent locale={locale} />}
        {activeTab === 'reservations' && <ReservationsContent locale={locale} />}
        {activeTab === 'revenus' && <RevenusContent locale={locale} />}
        {activeTab === 'messages' && <MessagesContent locale={locale} />}
      </div>
    </div>
  );
}

// Séjours Tab Content
function SejoursContent({ locale, listings }: { locale: string; listings: Listing[] }) {
  if (listings.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4">
        <div className="w-20 h-20 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center mb-6">
          <Icon icon="lucide:home" className="w-10 h-10 text-blue-600 dark:text-blue-400" />
        </div>
        <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-2">
          Aucun séjours
        </h3>
        <p className="text-zinc-600 dark:text-zinc-400 mb-6 text-center max-w-md">
          Créez votre première offre de séjours
        </p>
        <Button
          asChild
          className="bg-blue-900 hover:bg-blue-800 dark:bg-blue-800 dark:hover:bg-blue-700 text-white rounded-xl px-6"
        >
          <Link href={`/${locale}/host/dashboard/listings/new?type=accommodation`}>
            <Icon icon="lucide:plus" className="w-5 h-5 mr-2" />
            Créer
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {listings.map((listing) => (
          <div
            key={listing.id}
            className="bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 overflow-hidden hover:shadow-lg transition-shadow"
          >
            {/* Listing Image */}
            {listing.photos && listing.photos.length > 0 && (
              <div className="relative h-48 bg-zinc-100 dark:bg-zinc-900">
                <img
                  src={listing.photos[listing.mainPhotoIndex || 0]}
                  alt={listing.title}
                  className="w-full h-full object-cover"
                />
                {listing.isPublished ? (
                  <span className="absolute top-2 right-2 px-3 py-1 bg-green-500 text-white text-xs font-semibold rounded-full">
                    Publié
                  </span>
                ) : (
                  <span className="absolute top-2 right-2 px-3 py-1 bg-zinc-500 text-white text-xs font-semibold rounded-full">
                    Brouillon
                  </span>
                )}
              </div>
            )}
            
            {/* Listing Info */}
            <div className="p-4">
              <h4 className="font-semibold text-zinc-900 dark:text-white mb-2">{listing.title}</h4>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">
                <Icon icon="lucide:map-pin" className="inline w-4 h-4 mr-1" />
                {listing.city}, {listing.country}
              </p>
              <div className="flex items-center justify-between mt-4">
                <div className="text-sm text-zinc-600 dark:text-zinc-400">
                  <span className="font-semibold text-lg text-zinc-900 dark:text-white">{listing.pricePerNight}€</span>
                  /nuit
                </div>
                <Link
                  href={`/${locale}/host/dashboard/listings/${listing.id}`}
                  className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
                >
                  Gérer →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Calendrier Tab Content
function CalendrierContent({ locale }: { locale: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4">
      <div className="w-20 h-20 rounded-full bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center mb-6">
        <Icon icon="lucide:calendar" className="w-10 h-10 text-purple-600 dark:text-purple-400" />
      </div>
      <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-2">
        Calendrier de disponibilité
      </h3>
      <p className="text-zinc-600 dark:text-zinc-400 mb-6 text-center max-w-md">
        Gérez les disponibilités de vos annonces
      </p>
    </div>
  );
}

// Réservations Tab Content
function ReservationsContent({ locale }: { locale: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4">
      <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center mb-6">
        <Icon icon="lucide:calendar-check" className="w-10 h-10 text-green-600 dark:text-green-400" />
      </div>
      <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-2">
        Aucune réservation
      </h3>
      <p className="text-zinc-600 dark:text-zinc-400 text-center max-w-md">
        Vos réservations apparaîtront ici
      </p>
    </div>
  );
}

// Revenus Tab Content
function RevenusContent({ locale }: { locale: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4">
      <div className="w-20 h-20 rounded-full bg-yellow-100 dark:bg-yellow-900/20 flex items-center justify-center mb-6">
        <Icon icon="lucide:euro" className="w-10 h-10 text-yellow-600 dark:text-yellow-400" />
      </div>
      <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-2">
        Aucun revenu
      </h3>
      <p className="text-zinc-600 dark:text-zinc-400 text-center max-w-md">
        Vos revenus et statistiques financières apparaîtront ici
      </p>
    </div>
  );
}

// Messages Tab Content
function MessagesContent({ locale }: { locale: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4">
      <div className="w-20 h-20 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center mb-6">
        <Icon icon="lucide:mail" className="w-10 h-10 text-red-600 dark:text-red-400" />
      </div>
      <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-2">
        Aucun message
      </h3>
      <p className="text-zinc-600 dark:text-zinc-400 text-center max-w-md">
        Vos conversations avec les voyageurs apparaîtront ici
      </p>
    </div>
  );
}
