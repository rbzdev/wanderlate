import { User } from '@/generated/prisma/client';

// Type pour l'utilisateur complet depuis la DB
export type DashboardUser = Pick<
  User,
  'id' | 'email' | 'firstname' | 'lastName' | 'phone' | 'country' | 'accountType' | 'createdAt' | 'updatedAt' | 'birthDay' | 'currency' | 'language' | 'loginProvider' 
>;

// Type pour les stats utilisateur
export interface UserStats {
  totalBookings: number;
  upcomingBookings: number;
  completedBookings: number;
  favoriteProperties: number;
  unreadMessages: number;
  totalReviews: number;
}

// Type pour les props des composants
export interface UserData {
  user: DashboardUser;
  stats: UserStats;
}
