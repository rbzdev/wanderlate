'use client';

import { Icon } from '@iconify/react';

export default function QuickActions() {
  return (
    <div className="mt-12 bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-8">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Make the most of your trip
        </h2>
        <p className="text-gray-600 mb-6">
          Get ready for your upcoming adventure with these helpful resources
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="bg-white p-4 rounded-lg hover:shadow-md transition-shadow">
            <Icon icon="mdi:map-marker" className="w-8 h-8 mx-auto mb-2 text-pink-500" />
            <h3 className="font-medium text-gray-900 mb-1">Explore area</h3>
            <p className="text-sm text-gray-600">Discover local attractions</p>
          </button>
          <button className="bg-white p-4 rounded-lg hover:shadow-md transition-shadow">
            <Icon icon="mdi:message-text" className="w-8 h-8 mx-auto mb-2 text-purple-500" />
            <h3 className="font-medium text-gray-900 mb-1">Message host</h3>
            <p className="text-sm text-gray-600">Ask questions</p>
          </button>
          <button className="bg-white p-4 rounded-lg hover:shadow-md transition-shadow">
            <Icon icon="mdi:file-document" className="w-8 h-8 mx-auto mb-2 text-blue-500" />
            <h3 className="font-medium text-gray-900 mb-1">Trip details</h3>
            <p className="text-sm text-gray-600">View confirmation</p>
          </button>
        </div>
      </div>
    </div>
  );
}
