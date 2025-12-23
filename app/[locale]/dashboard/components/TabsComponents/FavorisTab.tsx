import Image from 'next/image';
import { Icon } from '@iconify/react';

export default function FavorisTab() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-900">
          Mes propriétés favorites
        </h2>
        <span className="text-sm text-gray-500">3 propriétés</span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            id: 1,
            title: 'Villa Moderne avec Piscine',
            location: 'Marrakech, Maroc',
            price: 250,
            rating: 4.9,
            image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80'
          },
          {
            id: 2,
            title: 'Appartement Vue Mer',
            location: 'Nice, France',
            price: 180,
            rating: 4.8,
            image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80'
          },
          {
            id: 3,
            title: 'Chalet Montagne',
            location: 'Chamonix, France',
            price: 320,
            rating: 5.0,
            image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80'
          }
        ].map((property) => (
          <div
            key={property.id}
            className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer group"
          >
            <div className="relative h-48 w-full">
              <Image
                src={property.image}
                alt={property.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <button className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors">
                <Icon icon="mdi:heart" className="w-5 h-5 text-red-500" />
              </button>
            </div>
            <div className="p-4">
              <div className="flex items-center gap-1 mb-2">
                <Icon icon="mdi:star" className="w-4 h-4 text-yellow-500" />
                <span className="text-sm font-semibold">{property.rating}</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">
                {property.title}
              </h3>
              <p className="text-sm text-gray-600 mb-3">{property.location}</p>
              <div className="flex items-center justify-between">
                <p className="text-sm">
                  <span className="font-semibold text-gray-900">€{property.price}</span>
                  <span className="text-gray-600"> / nuit</span>
                </p>
                <button className="text-sm font-medium text-primary hover:text-primary">
                  Voir
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
