/**
 * Listing Types
 * Type definitions for host listings (accommodations, cars, activities, packages, flights)
 */

export type ListingType = 'accommodation' | 'car' | 'activity' | 'package' | 'flight';
export type ListingStatus = 'active' | 'inactive' | 'draft';

export interface Listing {
  id: string;
  hostId: string;
  title: string;
  propertyType: string;
  description: string;
  
  // Location
  city: string;
  country: string;
  address?: string | null;
  postalCode?: string | null;
  
  // Capacity
  maxGuests: number;
  bedrooms: number;
  beds: number;
  bathrooms: number;
  amenities: string[];
  
  // Photos
  photos: string[];
  mainPhotoIndex: number;
  
  // Pricing
  pricePerNight: number;
  cleaningFee: number;
  minNights: number;
  maxNights: number;
  cancellationPolicy: string;
  
  // Status
  status: string;
  isPublished: boolean;
  
  createdAt: Date;
  updatedAt: Date;
}
