import { redirect } from 'next/navigation';
import { getSession } from '@/lib/session';
import { fetchUser } from '@/app/api/auth/server';
import Link from 'next/link';
import { Icon } from '@iconify/react';

// Components
import { Button } from '@/components/ui/button';
import { HostDashboardClient } from './components/HostDashboardClient';
import Navbar from '@/Blocks/navbar';
import Footer from '@/Blocks/Footer';
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from '@/components/ui/dropdown-menu';

type Listing = {
  id: string;
  status: string;
  isPublished: boolean;
};

/**
 * Host Dashboard Page - Server Component
 * Displays host statistics, listings, and management tools
 */
export default async function HostDashboardPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Get session from JWT cookie
  const session = await getSession();

  // Redirect to login if no session
  if (!session) {
    redirect(`/${locale}/host/login`);
  }

  // Fetch user data
  const { user } = await fetchUser();

  // If user not found or not a host, redirect
  if (!user) {
    redirect(`/${locale}/host/login`);
  }

  // Fetch host's listings
  let listings = [];
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_BASE_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/listings?hostId=${user.id}`, {
      cache: 'no-store',
    });

    if (response.ok) {
      const data = await response.json();
      listings = data.listings || [];
    }
  } catch (error) {
    console.error('Error fetching listings:', error);
  }

  // Calculate statistics from listings
  const stats = {
    activeListings: listings.filter((l: Listing) => l.status === 'active' && l.isPublished).length,
    monthlyReservations: 0, // TODO: Implement bookings count
    totalRevenue: 0, // TODO: Implement revenue calculation
    occupancyRate: 0, // TODO: Implement occupancy calculation
  };

  return (
    <div className="min-h-screen ">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">
              Tableau de bord hôte
            </h1>
            <p className="text-base text-zinc-600 dark:text-zinc-400">
              Gérez vos offres et suivez vos performances
            </p>
          </div>


          {/* Nouvelle offre Dropdown */}

          <Link href={`/${locale}/host/dashboard/listings/new`}>
            <Button >
              <Icon icon="stash:plus" className="text-xl" />
              Nouvelle offre
            </Button>
          </Link>
          {/* <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="flex items-center gap-2">
                <Icon icon="lucide:plus" className="w-5 h-5" />
                Nouvelle offre
                <Icon icon="lucide:chevron-down" className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem asChild>
                <Link
                  href={`/${locale}/host/dashboard/listings/new`}
                  className="flex items-center gap-3 cursor-pointer"
                >
                  <Icon icon="lucide:home" className="w-5 h-5" />
                  Hébergement
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href={`/${locale}/host/dashboard/cars/new`}
                  className="flex items-center gap-3 cursor-pointer"
                >
                  <Icon icon="lucide:car" className="w-5 h-5" />
                  Voiture
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href={`/${locale}/host/dashboard/listings/new`}
                  className="flex items-center gap-3 cursor-pointer"
                >
                  <Icon icon="lucide:activity" className="w-5 h-5" />
                  Activité
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href={`/${locale}/host/dashboard/listings/new?type=package`}
                  className="flex items-center gap-3 cursor-pointer"
                >
                  <Icon icon="lucide:package" className="w-5 h-5" />
                  Formule voyage
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href={`/${locale}/host/dashboard/listings/new?type=flight`}
                  className="flex items-center gap-3 cursor-pointer"
                >
                  <Icon icon="lucide:plane" className="w-5 h-5" />
                  Vol
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu> */}
        </div>

        {/* Filter Buttons */}
        {/* <div className="flex items-center gap-3 mb-8 overflow-x-auto pb-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-900 dark:bg-blue-800 text-white rounded-full text-sm font-medium whitespace-nowrap">
            <Icon icon="lucide:home" className="w-4 h-4" />
            Séjours
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-700 rounded-full text-sm font-medium whitespace-nowrap">
            <Icon icon="lucide:car" className="w-4 h-4" />
            Voitures
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-700 rounded-full text-sm font-medium whitespace-nowrap">
            <Icon icon="lucide:activity" className="w-4 h-4" />
            Activités
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-700 rounded-full text-sm font-medium whitespace-nowrap">
            <Icon icon="lucide:package" className="w-4 h-4" />
            Formules
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-700 rounded-full text-sm font-medium whitespace-nowrap">
            <Icon icon="lucide:plane" className="w-4 h-4" />
            Vols
          </button>
        </div> */}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Active Listings */}
          <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                <Icon icon="lucide:home" className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <div>
              <p className="text-4xl font-bold text-zinc-900 dark:text-white mb-1">
                {stats.activeListings}
              </p>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">Annonces actives</p>
            </div>
          </div>

          {/* Monthly Reservations */}
          <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">
                <Icon icon="lucide:calendar" className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
            <div>
              <p className="text-4xl font-bold text-zinc-900 dark:text-white mb-1">
                {stats.monthlyReservations}
              </p>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">Réservations ce mois</p>
            </div>
          </div>

          {/* Total Revenue */}
          <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                <Icon icon="lucide:euro" className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <div>
              <p className="text-4xl font-bold text-zinc-900 dark:text-white mb-1">
                {stats.totalRevenue} €
              </p>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">Revenus totaux</p>
            </div>
          </div>

          {/* Occupancy Rate */}
          <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center">
                <Icon icon="lucide:trending-up" className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
            </div>
            <div>
              <p className="text-4xl font-bold text-zinc-900 dark:text-white mb-1">
                {stats.occupancyRate}%
              </p>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">Taux d&apos;occupation</p>
            </div>
          </div>
        </div>

        {/* Main Content with Tabs */}
        <HostDashboardClient locale={locale} listings={listings} />

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          {/* Export iCal */}
          <Link
            href={`/${locale}/host/dashboard/calendar/export`}
            className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                  <Icon icon="lucide:download" className="w-5 h-5 text-zinc-600 dark:text-zinc-400" />
                </div>
                <div>
                  <p className="font-semibold text-zinc-900 dark:text-white">Export iCal</p>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">Synchroniser</p>
                </div>
              </div>
              <Icon
                icon="lucide:chevron-right"
                className="w-5 h-5 text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors"
              />
            </div>
          </Link>

          {/* Calendar */}
          <Link
            href={`/${locale}/host/dashboard/calendar`}
            className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                  <Icon icon="lucide:calendar" className="w-5 h-5 text-zinc-600 dark:text-zinc-400" />
                </div>
                <div>
                  <p className="font-semibold text-zinc-900 dark:text-white">Calendrier</p>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">Disponibilités</p>
                </div>
              </div>
              <Icon
                icon="lucide:chevron-right"
                className="w-5 h-5 text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors"
              />
            </div>
          </Link>

          {/* Pricing */}
          <Link
            href={`/${locale}/host/dashboard/pricing`}
            className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                  <Icon icon="lucide:dollar-sign" className="w-5 h-5 text-zinc-600 dark:text-zinc-400" />
                </div>
                <div>
                  <p className="font-semibold text-zinc-900 dark:text-white">Tarification</p>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">Prix</p>
                </div>
              </div>
              <Icon
                icon="lucide:chevron-right"
                className="w-5 h-5 text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors"
              />
            </div>
          </Link>

          {/* Settings */}
          <Link
            href={`/${locale}/host/dashboard/settings`}
            className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                  <Icon icon="lucide:settings" className="w-5 h-5 text-zinc-600 dark:text-zinc-400" />
                </div>
                <div>
                  <p className="font-semibold text-zinc-900 dark:text-white">Paramètres</p>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">Compte</p>
                </div>
              </div>
              <Icon
                icon="lucide:chevron-right"
                className="w-5 h-5 text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors"
              />
            </div>
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
