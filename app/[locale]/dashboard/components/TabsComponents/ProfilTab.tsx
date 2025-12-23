'use client';

import { useState } from 'react';
import { Icon } from '@iconify/react';
import { DashboardUser, UserStats } from '../../types';
import { Switch } from '@/components/ui/switch';

interface ProfilTabProps {
  user: DashboardUser;
  stats: UserStats;
}

export default function ProfilTab({ user, stats }: ProfilTabProps) {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [newsletter, setNewsletter] = useState(true);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900">
        Mon profil
      </h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="text-center">
              <div className="relative w-24 h-24 mx-auto mb-4">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-secondary via-secondary to-primary flex items-center justify-center text-white text-3xl font-bold">
                  {user.firstname.charAt(0).toUpperCase()}{user.lastName.charAt(0).toUpperCase()}
                </div>
                <button className="absolute bottom-0 right-0 bg-secondary text-white p-2 rounded-full hover:bg-secondary/90 transition-colors">
                  <Icon icon="mdi:camera" className="w-4 h-4" />
                </button>
              </div>
              <h3 className="font-semibold text-gray-900 text-lg mb-1">
                {user.firstname} {user.lastName}
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Membre depuis {new Date(user.createdAt).getFullYear()}
              </p>
              
              <div className="flex items-center justify-center gap-4 py-4 border-t border-gray-100">
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">{stats.totalBookings}</p>
                  <p className="text-xs text-gray-600">Voyages</p>
                </div>
                <div className="w-px h-10 bg-gray-200" />
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">{stats.totalReviews}</p>
                  <p className="text-xs text-gray-600">Avis</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Informations personnelles</h3>
              <button className="text-sm font-medium text-primary hover:text-primary">
                Modifier
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Icon icon="mdi:email" className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-medium text-gray-900">{user.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Icon icon="mdi:phone" className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Téléphone</p>
                  <p className="font-medium text-gray-900">{user.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Icon icon="mdi:cake" className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Date de naissance</p>
                  <p className="font-medium text-gray-900">
                    {new Date(user.birthDay).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Icon icon="mdi:map-marker" className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Pays</p>
                  <p className="font-medium text-gray-900">{user.country || 'Non renseigné'}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Icon icon="mdi:translate" className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Langue</p>
                  <p className="font-medium text-gray-900 uppercase">{user.language || 'Non renseigné'}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Icon icon="mdi:currency-eur" className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Devise</p>
                  <p className="font-medium text-gray-900">{user.currency}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Icon icon="mdi:account-circle" className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Type de compte</p>
                  <p className="font-medium text-gray-900 capitalize">{user.accountType}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Icon icon="mdi:login" className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Méthode de connexion</p>
                  <p className="font-medium text-gray-900 capitalize">{user.loginProvider}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Icon icon="mdi:calendar-clock" className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Dernière modification</p>
                  <p className="font-medium text-gray-900">
                    {new Date(user.updatedAt).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-4">Préférences</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <Icon icon="mdi:bell" className="w-5 h-5 text-gray-400" />
                  <span className="text-sm text-gray-900">Notifications par email</span>
                </div>
                <Switch 
                  checked={emailNotifications} 
                  onCheckedChange={setEmailNotifications}
                />
              </div>
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <Icon icon="mdi:shield-check" className="w-5 h-5 text-gray-400" />
                  <span className="text-sm text-gray-900">Authentification à deux facteurs</span>
                </div>
                <Switch 
                  checked={twoFactorAuth} 
                  onCheckedChange={setTwoFactorAuth}
                />
              </div>
              <div className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <Icon icon="mdi:email-newsletter" className="w-5 h-5 text-gray-400" />
                  <span className="text-sm text-gray-900">Newsletter</span>
                </div>
                <Switch 
                  checked={newsletter} 
                  onCheckedChange={setNewsletter}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
