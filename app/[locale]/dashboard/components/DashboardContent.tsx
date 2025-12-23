'use client';

import BookingsList from './BookingsList';
import { Icon } from '@iconify/react';

interface DashboardContentProps {
  activeTab: string;
}

export default function DashboardContent({ activeTab }: DashboardContentProps) {
  const renderContent = () => {
    switch (activeTab) {
      case 'Réservations':
        return <BookingsList />;
      
      case 'Favoris':
        return (
          <div className="text-center py-20">
            <div className="flex justify-center mb-6">
              <Icon icon="mdi:heart-outline" className="w-20 h-20 text-gray-400" />
            </div>
            <h2 className="text-2xl font-medium text-gray-900 mb-2">
              Vos favoris
            </h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Sauvegardez vos propriétés préférées pour les retrouver facilement
            </p>
          </div>
        );
      
      case 'Messages':
        return (
          <div className="text-center py-20">
            <div className="flex justify-center mb-6">
              <Icon icon="mdi:message-text-outline" className="w-20 h-20 text-gray-400" />
            </div>
            <h2 className="text-2xl font-medium text-gray-900 mb-2">
              Messagerie
            </h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Communiquez avec vos hôtes et recevez des notifications importantes
            </p>
          </div>
        );
      
      case 'Profil':
        return (
          <div className="text-center py-20">
            <div className="flex justify-center mb-6">
              <Icon icon="mdi:account-outline" className="w-20 h-20 text-gray-400" />
            </div>
            <h2 className="text-2xl font-medium text-gray-900 mb-2">
              Votre profil
            </h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Gérez vos informations personnelles et vos préférences
            </p>
          </div>
        );
      
      default:
        return null;
    }
  };

  return <div className="mt-8">{renderContent()}</div>;
}
