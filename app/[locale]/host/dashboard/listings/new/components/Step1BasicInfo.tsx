'use client';

import { Icon } from '@iconify/react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

interface Step1Props {
  data: {
    title: string;
    propertyType: string;
    description: string;
  };
  updateData: (data: Partial<Step1Props['data']>) => void;
}

const PROPERTY_TYPES = [
  'Appartement',
  'Maison',
  'Villa',
  'Chalet',
  'Cabane',
  'Studio',
  'Loft',
  'Autre',
];

export function Step1BasicInfo({ data, updateData }: Step1Props) {
  return (
    <div className="space-y-6">
      {/* <div>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">
          Informations de base
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400">
          Étape 1 sur 5
        </p>
      </div> */}

      {/* Title */}
      <div className="space-y-2">
        <Label htmlFor="title">
          Titre de l&apos;annonce <span className="text-red-500">*</span>
        </Label>
        <Input
          id="title"
          type="text"
          placeholder="Ex: Charmant appartement au cœur de Paris"
          value={data.title}
          onChange={(e) => updateData({ title: e.target.value })}
          className="h-12"
          required
        />
      </div>

      {/* Property Type */}
      <div className="space-y-2">
        <Label htmlFor="propertyType">
          Type de propriété <span className="text-red-500">*</span>
        </Label>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-between h-12 font-normal"
            >
              {data.propertyType}
              <Icon icon="lucide:chevron-down" className="w-4 h-4 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-full" align="start">
            {PROPERTY_TYPES.map((type) => (
              <DropdownMenuItem
                key={type}
                onClick={() => updateData({ propertyType: type })}
                className={data.propertyType === type ? 'bg-zinc-100 dark:bg-zinc-800' : ''}
              >
                {data.propertyType === type && (
                  <Icon icon="lucide:check" className="w-4 h-4 mr-2" />
                )}
                {type}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description">
          Description <span className="text-red-500">*</span>
        </Label>
        <textarea
          id="description"
          placeholder="Décrivez votre logement en détail : ambiance, équipements, quartier..."
          value={data.description}
          onChange={(e) => updateData({ description: e.target.value })}
          className="w-full min-h-[150px] px-3 py-2 rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary"
          required
        />
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          {data.description.length}/5000 caractères (minimum 50)
        </p>
      </div>
    </div>
  );
}
