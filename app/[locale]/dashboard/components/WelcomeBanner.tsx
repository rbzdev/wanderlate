'use client';

import { Icon } from '@iconify/react';
import { useRouter } from 'next/navigation';
import { DashboardUser } from '../types';

interface WelcomeBannerProps {
  user: DashboardUser;
}

export default function WelcomeBanner({ user }: WelcomeBannerProps) {
  const router = useRouter();
  const displayName = `${user.firstname} ${user.lastName}`;
  const initials = user 
        ? `${user.firstname.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase()
        : "";
  
  return (
    <div className="bg-background rounded-2xl border border-gray-200 p-2 lg:p-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 lg:gap-6">
          {/* Avatar Circle */}
          <div className="flex-shrink-0">
            <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center text-white text-3xl font-bold">
              {initials}
            </div>
          </div>

          {/* Welcome Text */}
          <div>
            <h1 className="text-lg lg:text-3xl font-bold text-foreground mb-1 line-clamp-1">
              Bonjour, {displayName}
            </h1>
            <p className="text-primary">
              {user.email}
            </p>
          </div>
        </div>

        {/* Explorer Button */}
        <button
          onClick={() => router.push('/')}
          className="hidden md:flex items-center gap-2 px-8 py-3 bg-primary text-white font-semibold rounded-full hover:bg-primary/90 transition-colors"
        >
          Explorer
        </button>
      </div>
    </div>
  );
}
