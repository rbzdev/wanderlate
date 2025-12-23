import { redirect } from 'next/navigation';
import { getSession } from '@/lib/session';
import { prisma } from '@/prisma/prisma';
import { DashboardUser, UserStats } from './types';

// Components
import Navbar from '@/Blocks/navbar';
import WelcomeBanner from './components/WelcomeBanner';
import DashboardTabs from './components/DashboardTabs';
import Footer from '@/Blocks/Footer';

export default async function DashboardPage() {
  // Récupérer la session
  const session = await getSession();
  
  if (!session?.userId) {
    redirect('/login');
  }

  // Récupérer les données utilisateur
  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: {
      id: true,
      email: true,
      firstname: true,
      lastName: true,
      phone: true,
      country: true,
      accountType: true,
      createdAt: true,
      updatedAt: true,
      birthDay: true,
      currency: true,
      language: true,
      loginProvider: true,
    },
  });

  if (!user) {
    redirect('/login');
  }

  // TODO: Récupérer les vraies stats depuis la DB (bookings, favoris, messages, etc.)
  const stats: UserStats = {
    totalBookings: 5,
    upcomingBookings: 2,
    completedBookings: 3,
    favoriteProperties: 3,
    unreadMessages: 1,
    totalReviews: 12,
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          <WelcomeBanner user={user} />
          <DashboardTabs user={user} stats={stats} />
        </div>
      </div>

      <Footer />
    </div>
  );
}
