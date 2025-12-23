'use client';

interface BookingTabsProps {
  activeTab: 'upcoming' | 'past';
  onTabChange: (tab: 'upcoming' | 'past') => void;
}

export default function BookingTabs({ activeTab, onTabChange }: BookingTabsProps) {
  return (
    <div className="flex gap-8 border-b border-gray-200 mb-8">
      <button
        onClick={() => onTabChange('upcoming')}
        className={`pb-4 px-1 relative font-medium transition-colors ${
          activeTab === 'upcoming'
            ? 'text-gray-900'
            : 'text-gray-500 hover:text-gray-700'
        }`}
      >
        Upcoming
        {activeTab === 'upcoming' && (
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900" />
        )}
      </button>
      <button
        onClick={() => onTabChange('past')}
        className={`pb-4 px-1 relative font-medium transition-colors ${
          activeTab === 'past'
            ? 'text-gray-900'
            : 'text-gray-500 hover:text-gray-700'
        }`}
      >
        Past trips
        {activeTab === 'past' && (
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900" />
        )}
      </button>
    </div>
  );
}
