'use client';

import { Icon } from '@iconify/react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Step3Props {
  data: {
    maxGuests: number;
    bedrooms: number;
    beds: number;
    bathrooms: number;
    amenities: string[];
  };
  updateData: (data: Partial<Step3Props['data']>) => void;
}

const AMENITIES = [
  { id: 'wifi', label: 'WiFi', icon: 'lucide:wifi' },
  { id: 'parking', label: 'Parking gratuit', icon: 'lucide:car' },
  { id: 'kitchen', label: 'Cuisine équipée', icon: 'lucide:chef-hat' },
  { id: 'washer', label: 'Lave-linge', icon: 'lucide:washing-machine' },
  { id: 'dryer', label: 'Sèche-linge', icon: 'lucide:wind' },
  { id: 'ac', label: 'Climatisation', icon: 'lucide:wind' },
  { id: 'heating', label: 'Chauffage', icon: 'lucide:flame' },
  { id: 'tv', label: 'Télévision', icon: 'lucide:tv' },
  { id: 'pool', label: 'Piscine', icon: 'lucide:waves' },
  { id: 'gym', label: 'Salle de sport', icon: 'lucide:dumbbell' },
  { id: 'jacuzzi', label: 'Jacuzzi', icon: 'lucide:bath' },
  { id: 'balcony', label: 'Balcon', icon: 'lucide:square' },
  { id: 'garden', label: 'Jardin', icon: 'lucide:trees' },
  { id: 'pets', label: 'Animaux acceptés', icon: 'lucide:dog' },
  { id: 'smoking', label: 'Fumeurs acceptés', icon: 'lucide:cigarette' },
  { id: 'bbq', label: 'Barbecue', icon: 'lucide:flame-kindling' },
];

export function Step3Capacity({ data, updateData }: Step3Props) {
  const toggleAmenity = (amenityId: string) => {
    const newAmenities = data.amenities.includes(amenityId)
      ? data.amenities.filter((id) => id !== amenityId)
      : [...data.amenities, amenityId];
    updateData({ amenities: newAmenities });
  };

  return (
    <div className="space-y-8">
      {/* <div>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">
          Capacité & équipements
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400">
          Étape 3 sur 5
        </p>
      </div> */}

      {/* Capacity */}
      <div>
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
          Capacité
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label htmlFor="maxGuests">Voyageurs max</Label>
            <Input
              id="maxGuests"
              type="number"
              min="1"
              value={data.maxGuests}
              onChange={(e) => updateData({ maxGuests: parseInt(e.target.value) || 1 })}
              className="h-12"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bedrooms">Chambres</Label>
            <Input
              id="bedrooms"
              type="number"
              min="0"
              value={data.bedrooms}
              onChange={(e) => updateData({ bedrooms: parseInt(e.target.value) || 0 })}
              className="h-12"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="beds">Lits</Label>
            <Input
              id="beds"
              type="number"
              min="1"
              value={data.beds}
              onChange={(e) => updateData({ beds: parseInt(e.target.value) || 1 })}
              className="h-12"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bathrooms">Salles de bain</Label>
            <Input
              id="bathrooms"
              type="number"
              min="1"
              value={data.bathrooms}
              onChange={(e) => updateData({ bathrooms: parseInt(e.target.value) || 1 })}
              className="h-12"
            />
          </div>
        </div>
      </div>

      {/* Amenities */}
      <div>
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
          Équipements
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {AMENITIES.map((amenity) => {
            const isSelected = data.amenities.includes(amenity.id);
            return (
              <button
                key={amenity.id}
                type="button"
                onClick={() => toggleAmenity(amenity.id)}
                className={`flex items-center px-4 py-3 rounded-xl border-2 transition-all ${
                  isSelected
                    ? 'border-blue-900 dark:border-blue-600 bg-blue-50 dark:bg-blue-900/20 gap-1'
                    : 'border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600 gap-3'
                }`}
              >
                {isSelected && (
                  <Icon
                    icon="lets-icons:check-round-fill"
                    className="text-xl text-primary dark:text-primary flex-shrink-0"
                  />
                )}
                <span className="text-sm font-medium text-zinc-900 dark:text-white">
                  {amenity.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
