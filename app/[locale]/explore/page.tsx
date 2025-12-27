'use client';

import { useState, useEffect } from 'react';

// Components
import Navbar from '@/Blocks/navbar';
import { Listing } from '@/lib/types/listing';
import SearchBar from './components/SearchBar';
import PropertyTypesFilter from './components/PropertyTypesFilter';
import FiltersBar from './components/FiltersBar';
import ListingsGrid from './components/ListingsGrid';
import Pagination from './components/Pagination';

export default function ExplorePage() {
    const [selectedType, setSelectedType] = useState('all');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [sortBy, setSortBy] = useState('relevance');
    
    // Listings state
    const [listings, setListings] = useState<Listing[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;

    // Fetch listings
    useEffect(() => {
        async function fetchListings() {
            setIsLoading(true);
            setError(null);
            try {
                const response = await fetch('/api/listings');
                
                if (!response.ok) {
                    throw new Error('Failed to fetch listings');
                }
                
                const data = await response.json();
                setListings(data.listings || []);
            } catch (err) {
                console.error('Error fetching listings:', err);
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setIsLoading(false);
            }
        }
        
        fetchListings();
    }, []);
    
    // Filter listings
    const filteredListings = listings.filter((listing) => {
        // Property type filter
        const matchesType = selectedType === 'all' || 
            listing.propertyType.toLowerCase() === selectedType.toLowerCase();
        
        // Only published listings
        const isPublished = listing.status === 'active' && listing.isPublished;
        
        return matchesType && isPublished;
    });
    
    // Sort listings
    const sortedListings = [...filteredListings].sort((a, b) => {
        switch (sortBy) {
            case 'price-asc':
                return a.pricePerNight - b.pricePerNight;
            case 'price-desc':
                return b.pricePerNight - a.pricePerNight;
            case 'rating':
                // TODO: Add rating field to Listing model
                return 0;
            default:
                return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }
    });
    
    // Paginate
    const totalPages = Math.ceil(sortedListings.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedListings = sortedListings.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className="min-h-screen bg-white dark:bg-zinc-950">
            <Navbar />
            <SearchBar />
            <PropertyTypesFilter selectedType={selectedType} setSelectedType={setSelectedType} />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
                <FiltersBar
                    filteredListingsCount={filteredListings.length}
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                    viewMode={viewMode}
                    setViewMode={setViewMode}
                />
                <ListingsGrid
                    listings={paginatedListings}
                    viewMode={viewMode}
                    isLoading={isLoading}
                    error={error}
                />
                <Pagination
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    totalPages={totalPages}
                />
            </div>
        </div>
    );
}
