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

interface Step5Props {
  data: {
    pricePerNight: number;
    cleaningFee: number;
    minNights: number;
    maxNights: number;
    cancellationPolicy: string;
  };
  updateData: (data: Partial<Step5Props['data']>) => void;
}

const CANCELLATION_POLICIES = [
  'Flexible - Remboursement intégral jusqu\'à 24h avant',
  'Modérée - Remboursement intégral jusqu\'à 5 jours avant',
  'Stricte - Remboursement de 50% jusqu\'à 7 jours avant',
];

export function Step5Pricing({ data, updateData }: Step5Props) {
  const platformFee = data.pricePerNight * 0.05; // 5% commission WANDERLATE
  const revenuePerNight = data.pricePerNight - platformFee;

  return (
    <div className="space-y-6">
      {/* <div>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">
          Tarification
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400">
          Étape 5 sur 5
        </p>
      </div> */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Price per night */}
        <div className="space-y-2">
          <Label htmlFor="pricePerNight">
            Prix par nuit (€) <span className="text-red-500">*</span>
          </Label>
          <div className="relative">
            <Input
              id="pricePerNight"
              type="number"
              min="0"
              step="1"
              value={data.pricePerNight}
              onChange={(e) => updateData({ pricePerNight: parseFloat(e.target.value) || 0 })}
              className="h-12 pl-8"
              required
            />
            <Icon
              icon="lucide:euro"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500"
            />
          </div>
        </div>

        {/* Cleaning fee */}
        <div className="space-y-2">
          <Label htmlFor="cleaningFee">
            Frais de ménage (€) <span className="text-red-500">*</span>
          </Label>
          <div className="relative">
            <Input
              id="cleaningFee"
              type="number"
              min="0"
              step="1"
              value={data.cleaningFee}
              onChange={(e) => updateData({ cleaningFee: parseFloat(e.target.value) || 0 })}
              className="h-12 pl-8"
              required
            />
            <Icon
              icon="lucide:euro"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500"
            />
          </div>
        </div>

        {/* Min nights */}
        <div className="space-y-2">
          <Label htmlFor="minNights">
            Nuits minimum <span className="text-red-500">*</span>
          </Label>
          <Input
            id="minNights"
            type="number"
            min="1"
            value={data.minNights}
            onChange={(e) => updateData({ minNights: parseInt(e.target.value) || 1 })}
            className="h-12"
            required
          />
        </div>

        {/* Max nights */}
        <div className="space-y-2">
          <Label htmlFor="maxNights">
            Nuits maximum <span className="text-red-500">*</span>
          </Label>
          <Input
            id="maxNights"
            type="number"
            min="1"
            value={data.maxNights}
            onChange={(e) => updateData({ maxNights: parseInt(e.target.value) || 1 })}
            className="h-12"
            required
          />
        </div>
      </div>

      {/* Cancellation Policy */}
      <div className="space-y-2">
        <Label htmlFor="cancellationPolicy">
          Politique d&apos;annulation <span className="text-red-500">*</span>
        </Label>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-between h-12 font-normal"
            >
              {data.cancellationPolicy}
              <Icon icon="lucide:chevron-down" className="w-4 h-4 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-full" align="start">
            {CANCELLATION_POLICIES.map((policy) => (
              <DropdownMenuItem
                key={policy}
                onClick={() => updateData({ cancellationPolicy: policy })}
                className={data.cancellationPolicy === policy ? 'bg-zinc-100 dark:bg-zinc-800' : ''}
              >
                {data.cancellationPolicy === policy && (
                  <Icon icon="lucide:check" className="w-4 h-4 mr-2" />
                )}
                {policy}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Revenue Preview */}
      <div className="mt-8 p-6 bg-zinc-50 dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
          Aperçu des revenus
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-zinc-600 dark:text-zinc-400">Prix par nuit</span>
            <span className="font-semibold text-zinc-900 dark:text-white">
              {data.pricePerNight} €
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-zinc-600 dark:text-zinc-400">Frais de ménage</span>
            <span className="font-semibold text-zinc-900 dark:text-white">
              {data.cleaningFee} €
            </span>
          </div>
          <div className="flex items-center justify-between text-sm text-secondary/50 dark:text-red-400">
            <span>Commission WANDERLATE (5%)</span>
            <span>- {platformFee.toFixed(2)} €</span>
          </div>
          <div className="pt-3 border-t border-zinc-300 dark:border-zinc-600">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-zinc-900 dark:text-white">
                Revenu par nuit
              </span>
              <span className="text-xl font-bold ">
                {revenuePerNight.toFixed(2)} €
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
