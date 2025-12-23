'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Icon } from '@iconify/react';
import BookingTabs from './BookingTabs';
import BookingCard from './BookingCard';
import QuickActions from './QuickActions';
import Spinner from '@/components/ui/spinner';

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

export default function BookingsList() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch user bookings from API
    // Temporary mock data
    setTimeout(() => {
      setBookings([
        {
          id: '1',
          property: {
            title: 'Luxury Villa with Ocean View',
            location: 'Bali, Indonesia',
            image: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&q=80',
          },
          checkIn: '2025-01-15',
          checkOut: '2025-01-22',
          guests: 4,
          totalPrice: 2800,
          status: 'upcoming',
        },
        {
          id: '2',
          property: {
            title: 'Modern Apartment Downtown',
            location: 'Paris, France',
            image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80',
          },
          checkIn: '2024-12-10',
          checkOut: '2024-12-15',
          guests: 2,
          totalPrice: 1200,
          status: 'completed',
        },
        {
          id: '3',
          property: {
            title: 'Luxury Villa with Ocean View',
            location: 'Bali, Indonesia',
            image: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&q=80',
          },
          checkIn: '2025-01-15',
          checkOut: '2025-01-22',
          guests: 4,
          totalPrice: 2800,
          status: 'upcoming',
        },
        {
          id: '4',
          property: {
            title: 'Modern Apartment Downtown',
            location: 'Paris, France',
            image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80',
          },
          checkIn: '2024-12-10',
          checkOut: '2024-12-15',
          guests: 2,
          totalPrice: 1200,
          status: 'completed',
        },
        {
          id: '5',
          property: {
            title: 'Luxury Villa with Ocean View',
            location: 'Bali, Indonesia',
            image: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&q=80',
          },
          checkIn: '2025-01-15',
          checkOut: '2025-01-22',
          guests: 4,
          totalPrice: 2800,
          status: 'upcoming',
        },
        {
          id: '6',
          property: {
            title: 'Modern Apartment Downtown',
            location: 'Paris, France',
            image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80',
          },
          checkIn: '2024-12-10',
          checkOut: '2024-12-15',
          guests: 2,
          totalPrice: 1200,
          status: 'completed',
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredBookings = bookings.filter((booking) =>
    activeTab === 'upcoming' ? booking.status === 'upcoming' : booking.status === 'completed'
  );

  return (
    <>
      {/* Tabs */}
      <BookingTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-20">
          <Spinner className='text-5xl text-primary' />
        </div>
      )}

      {/* Empty State */}
      {!loading && filteredBookings.length === 0 && (
        <div className="text-center py-20">
          <div className="flex justify-center mb-6">
            <Icon icon="mdi:calendar-blank-outline" className="w-20 h-20 text-gray-400" />
          </div>
          <h2 className="text-2xl font-medium text-gray-900 mb-2">
            {activeTab === 'upcoming' ? 'No trips booked...yet!' : 'No past trips'}
          </h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            {activeTab === 'upcoming'
              ? "Time to dust off your bags and start planning your next adventure"
              : "You haven't completed any trips yet"}
          </p>
          {activeTab === 'upcoming' && (
            <button
              onClick={() => router.push('/')}
              className="inline-flex items-center px-6 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors"
            >
              Start searching
            </button>
          )}
        </div>
      )}

      {/* Bookings Grid */}
      {!loading && filteredBookings.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBookings.map((booking) => (
            <BookingCard key={booking.id} booking={booking} activeTab={activeTab} />
          ))}
        </div>
      )}

      {/* Quick Actions */}
      {!loading && filteredBookings.length > 0 && activeTab === 'upcoming' && (
        <QuickActions />
      )}
    </>
  );
}
