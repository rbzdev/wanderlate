import Image from 'next/image';
import { Icon } from '@iconify/react';

export default function MessagesTab() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-900">
          Messages
        </h2>
        <button className="text-sm font-medium text-primary hover:text-primary">
          Marquer tout comme lu
        </button>
      </div>
      
      <div className="space-y-4">
        {[
          {
            id: 1,
            sender: 'Sophie Martin',
            property: 'Villa Moderne avec Piscine',
            message: 'Bonjour, est-il possible d\'arriver plus tôt le jour du check-in ?',
            time: 'Il y a 2h',
            unread: true,
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80'
          },
          {
            id: 2,
            sender: 'Jean Dubois',
            property: 'Appartement Vue Mer',
            message: 'Merci pour votre accueil ! Tout était parfait.',
            time: 'Il y a 1 jour',
            unread: false,
            avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&q=80'
          },
          {
            id: 3,
            sender: 'Marie Lambert',
            property: 'Chalet Montagne',
            message: 'Pouvez-vous me donner plus d\'informations sur les équipements ?',
            time: 'Il y a 3 jours',
            unread: false,
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80'
          }
        ].map((msg) => (
          <div
            key={msg.id}
            className={`bg-white rounded-xl p-5 border cursor-pointer hover:shadow-md transition-shadow ${
              msg.unread ? 'border-primary bg-primary30' : 'border-gray-200'
            }`}
          >
            <div className="flex items-start gap-4">
              <div className="relative">
                <Image
                  src={msg.avatar}
                  alt={msg.sender}
                  width={48}
                  height={48}
                  className="rounded-full"
                />
                {msg.unread && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full border-2 border-white" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-1">
                  <div>
                    <h3 className="font-semibold text-gray-900">{msg.sender}</h3>
                    <p className="text-sm text-gray-600">{msg.property}</p>
                  </div>
                  <span className="text-xs text-gray-500 whitespace-nowrap ml-4">
                    {msg.time}
                  </span>
                </div>
                <p className="text-sm text-gray-700 line-clamp-2">{msg.message}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
