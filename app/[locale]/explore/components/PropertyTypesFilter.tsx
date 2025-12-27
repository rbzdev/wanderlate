'use client';

import { Icon } from '@iconify/react';

const propertyTypes = [
    { id: 'all', label: 'Tout', icon: 'lucide:home' },
    { id: 'appartements', label: 'Appartements', icon: 'lucide:building-2' },
    { id: 'villas', label: 'Villas', icon: 'lucide:home' },
    { id: 'chalets', label: 'Chalets', icon: 'lucide:mountain' },
    { id: 'bord-mer', label: 'Bord de mer', icon: 'lucide:waves' },
    { id: 'montagne', label: 'Montagne', icon: 'lucide:mountain-snow' },
    { id: 'insolites', label: 'Insolites', icon: 'lucide:tent' },
    { id: 'bateaux', label: 'Bateaux', icon: 'lucide:ship' }
];

interface PropertyTypesFilterProps {
    selectedType: string;
    setSelectedType: (type: string) => void;
}

export default function PropertyTypesFilter({ selectedType, setSelectedType }: PropertyTypesFilterProps) {

    return (
        <div className="border-b border-zinc-200 dark:border-zinc-800 sticky top-0 bg-white dark:bg-zinc-950 z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex items-center gap-2 py-4 overflow-x-auto scrollbar-hide">
                    {propertyTypes.map((type) => (
                        <button
                            key={type.id}
                            onClick={() => setSelectedType(type.id)}
                            className={`flex flex-col items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                                selectedType === type.id
                                    ? 'bg-secondary dark:bg-zinc-100 text-white dark:text-zinc-900'
                                    : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                            }`}
                        >
                            <Icon icon={type.icon} className="w-5 h-5" />
                            <span className="text-xs font-medium">{type.label}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}