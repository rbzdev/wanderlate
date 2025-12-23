'use client';

import Image from 'next/image';
import { Icon } from '@iconify/react';
import { useRouter } from 'next/navigation';

interface Booking {
  id: string;
  property: {
    title: string;
    location: string;
    image: string;
  };
  checkIn: string;
  checkOut: string;
  guests: number;
  totalPrice: number;
  status: 'upcoming' | 'completed' | 'cancelled';
}

interface BookingCardProps {
  booking: Booking;
  activeTab: 'upcoming' | 'past';
}

export default function BookingCard({ booking, activeTab }: BookingCardProps) {
  const router = useRouter();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div
      className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer"
      onClick={() => router.push(`/booking/${booking.id}`)}
    >
      {/* Property Image */}
      <div className="relative h-48 w-full">
        <Image
          src={booking.property.image}
          alt={booking.property.title}
          fill
          className="object-cover"
        />
        {booking.status === 'upcoming' && (
          <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full text-sm font-medium">
            Confirmed
          </div>
        )}
      </div>

      {/* Booking Details */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <p className="text-sm text-gray-500 mb-1">
              {booking.property.location}
            </p>
            <h3 className="text-lg font-medium text-gray-900 line-clamp-2">
              {booking.property.title}
            </h3>
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <div className="flex items-center text-sm text-gray-600">
            <Icon icon="mdi:calendar" className="w-4 h-4 mr-2" />
            <span>
              {formatDate(booking.checkIn)} - {formatDate(booking.checkOut)}
            </span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Icon icon="mdi:account-multiple" className="w-4 h-4 mr-2" />
            <span>{booking.guests} guests</span>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Total price</p>
            <p className="text-lg font-semibold text-gray-900">
              €{booking.totalPrice.toLocaleString()}
            </p>
          </div>
          {activeTab === 'past' && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                // TODO: Leave review
              }}
              className="text-sm font-medium text-gray-900 hover:underline"
            >
              Leave review
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
