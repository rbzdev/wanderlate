'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Icon } from '@iconify/react';
import { useTranslations } from 'next-intl';

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

export default function DashboardPage() {
  const t = useTranslations('Dashboard');
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
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredBookings = bookings.filter((booking) =>
    activeTab === 'upcoming' ? booking.status === 'upcoming' : booking.status === 'completed'
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <h1 className="text-3xl font-semibold text-gray-900">Trips</h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex gap-8 border-b border-gray-200 mb-8">
          <button
            onClick={() => setActiveTab('upcoming')}
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
            onClick={() => setActiveTab('past')}
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

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900" />
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
              <div
                key={booking.id}
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
            ))}
          </div>
        )}

        {/* Quick Actions */}
        {!loading && filteredBookings.length > 0 && activeTab === 'upcoming' && (
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
        )}
      </div>
    </div>
  );
}
