import { redirect } from 'next/navigation';
import { getSession } from '@/lib/session';
import { fetchUser } from '@/app/api/auth/server';
import { CreateListingClient } from './components/CreateListingClient';

/**
 * Create New Listing Page - Server Component
 * Multi-step form for creating accommodation listings
 */
export default async function CreateListingPage({
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

  return <CreateListingClient locale={locale} userId={user.id} />;
}
