'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Step2Props {
  data: {
    city: string;
    country: string;
    address?: string;
    postalCode?: string;
  };
  updateData: (data: Partial<Step2Props['data']>) => void;
}

export function Step2Location({ data, updateData }: Step2Props) {
  return (
    <div className="space-y-6">
      {/* <div>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">
          Localisation
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400">
          Étape 2 sur 5
        </p>
      </div> */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* City */}
        <div className="space-y-2">
          <Label htmlFor="city">
            Ville <span className="text-red-500">*</span>
          </Label>
          <Input
            id="city"
            type="text"
            placeholder="Paris"
            value={data.city}
            onChange={(e) => updateData({ city: e.target.value })}
            className="h-12"
            required
          />
        </div>

        {/* Country */}
        <div className="space-y-2">
          <Label htmlFor="country">
            Pays <span className="text-red-500">*</span>
          </Label>
          <Input
            id="country"
            type="text"
            placeholder="France"
            value={data.country}
            onChange={(e) => updateData({ country: e.target.value })}
            className="h-12"
            required
          />
        </div>
      </div>

      {/* Address */}
      <div className="space-y-2">
        <Label htmlFor="address">
          Adresse <span className="text-zinc-500">(optionnel)</span>
        </Label>
        <Input
          id="address"
          type="text"
          placeholder="123 Rue de la Paix"
          value={data.address || ''}
          onChange={(e) => updateData({ address: e.target.value })}
          className="h-12"
        />
        <p className="text-sm text-blue-600 dark:text-blue-400">
          L&apos;adresse exacte ne sera visible qu&apos;après la réservation
        </p>
      </div>

      {/* Postal Code */}
      <div className="space-y-2">
        <Label htmlFor="postalCode">
          Code postal <span className="text-zinc-500">(optionnel)</span>
        </Label>
        <Input
          id="postalCode"
          type="text"
          placeholder="75001"
          value={data.postalCode || ''}
          onChange={(e) => updateData({ postalCode: e.target.value })}
          className="h-12"
        />
      </div>
    </div>
  );
}
