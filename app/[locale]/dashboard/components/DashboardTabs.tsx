'use client';

import { useState } from 'react';
import { DashboardUser, UserStats } from '../types';

// Components
import { Tab } from '@/components/ui/tab';
import ReservationsTab from './TabsComponents/ReservationsTab';
import FavorisTab from './TabsComponents/FavorisTab';
import MessagesTab from './TabsComponents/MessagesTab';
import ProfilTab from './TabsComponents/ProfilTab';

const tabs = ['Réservations', 'Favoris', 'Messages', 'Profil'];

interface DashboardTabsProps {
  user: DashboardUser;
  stats: UserStats;
}

export default function DashboardTabs({ user, stats }: DashboardTabsProps) {
  const [activeTab, setActiveTab] = useState('Réservations');

  const renderContent = () => {
    switch (activeTab) {
      case 'Réservations':
        return <ReservationsTab />;
      
      case 'Favoris':
        return <FavorisTab />;
      
      case 'Messages':
        return <MessagesTab />;
      
      case 'Profil':
        return <ProfilTab user={user} stats={stats} />;
      
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-center">
        <div className="bg-muted/50 rounded-full p-1 w-fit">
          <div className="flex items-center gap-1">
            {tabs.map((tab) => (
              <Tab
                key={tab}
                text={tab}
                selected={activeTab === tab}
                setSelected={setActiveTab}
              />
            ))}
          </div>
        </div>
      </div>

      <div>{renderContent()}</div>
    </div>
  );
}
