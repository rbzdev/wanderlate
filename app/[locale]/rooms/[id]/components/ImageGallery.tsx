/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Icon } from '@iconify/react';
import { Button } from '@/components/ui/button';
import { useLocale } from 'next-intl';

interface ImageGalleryProps {
    photos: string[];
    title: string;
}

export default function ImageGallery({ photos, title }: ImageGalleryProps) {
    const locale = useLocale();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const prevPhotosRef = useRef<string[]>(photos);

    // Reset to first image only when photos actually change
    useEffect( () => {
        if (prevPhotosRef.current !== photos) {
           setCurrentImageIndex(0);
            prevPhotosRef.current = photos;
        }
    }, [photos]);

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % photos.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + photos.length) % photos.length);
    };

    const selectImage = (index: number) => {
        setCurrentImageIndex(index);
    };

    if (!photos || photos.length === 0) {
        return (
            <div className="relative p-4 max-w-7xl mx-auto">
                <div className="w-full h-64 md:h-96 bg-zinc-200 dark:bg-zinc-800 rounded-lg flex items-center justify-center">
                    <Icon icon="lucide:image" className="w-12 h-12 text-zinc-400" />
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="relative max-w-7xl mx-auto px-4 py-4">
                {/* Main Gallery - Airbnb/Expedia Style */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-2 md:gap-3 h-[400px] lg:h-[500px]">
                    {/* Main Image - Takes 2/3 on desktop */}
                    <div className="lg:col-span-2 relative overflow-hidden rounded-lg lg:rounded-r-none lg:rounded-l-lg group cursor-pointer" onClick={() => setIsFullscreen(true)}>
                        <Image
                            src={photos[currentImageIndex]}
                            alt={title}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                            priority
                        />
                        {/* Expand Icon */}
                        <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                            <Icon icon="lucide:expand" className="w-4 h-4 text-zinc-700" />
                        </div>
                        {/* Navigation Arrows - Always visible on mobile, hover on desktop */}
                        {photos.length > 1 && (
                            <>
                                <button
                                    onClick={(e) => { e.stopPropagation(); prevImage(); }}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-zinc-700 p-2 rounded-full shadow-lg opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-200"
                                >
                                    <Icon icon="lucide:chevron-left" className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={(e) => { e.stopPropagation(); nextImage(); }}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-zinc-700 p-2 rounded-full shadow-lg opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-200"
                                >
                                    <Icon icon="lucide:chevron-right" className="w-5 h-5" />
                                </button>
                            </>
                        )}
                        {/* Image Counter */}
                        <div className="absolute bottom-4 left-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm font-medium">
                            {currentImageIndex + 1} / {photos.length}
                        </div>
                    </div>

                    {/* Right Side Grid - 2 columns, 2 rows */}
                    <div className="hidden lg:col-span-2 lg:grid grid-cols-2 gap-2 md:gap-3">
                        {/* Top Right Image */}
                        <div
                            className="relative overflow-hidden rounded-tr-lg cursor-pointer group"
                            onClick={() => selectImage(photos.length > 1 ? 1 : 0)}
                        >
                            <Image
                                src={photos[photos.length > 1 ? 1 : 0]}
                                alt={`${title} 2`}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className={`absolute inset-0 bg-black/20 transition-opacity ${photos.length > 1 && currentImageIndex === 1 ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
                        </div>

                        {/* Bottom Left Image */}
                        <div
                            className="relative overflow-hidden cursor-pointer group"
                            onClick={() => selectImage(photos.length > 2 ? 2 : 0)}
                        >
                            <Image
                                src={photos[photos.length > 2 ? 2 : 0]}
                                alt={`${title} 3`}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className={`absolute inset-0 bg-black/20 transition-opacity ${photos.length > 2 && currentImageIndex === 2 ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
                        </div>

                        {/* Bottom Right - Show More or 4th Image */}
                        <div
                            className="relative overflow-hidden rounded-br-lg cursor-pointer group"
                            onClick={() => photos.length > 3 ? setIsFullscreen(true) : selectImage(3)}
                        >
                            <Image
                                src={photos[photos.length > 3 ? 3 : 0]}
                                alt={photos.length > 3 ? `${title} 4` : title}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            {photos.length > 4 && (
                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                    <div className="text-center text-white">
                                        <Icon icon="lucide:plus" className="w-8 h-8 mx-auto mb-2" />
                                        <span className="text-lg font-semibold">
                                            +{photos.length - 4}
                                        </span>
                                    </div>
                                </div>
                            )}
                            <div className={`absolute inset-0 bg-black/20 transition-opacity ${photos.length <= 3 && currentImageIndex === 3 ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
                        </div>

                        {/* Hidden 4th spot if less than 4 images */}
                        {photos.length < 4 && (
                            <div className="hidden lg:block" />
                        )}
                    </div>
                </div>

                {/* Mobile Thumbnail Strip */}
                <div className="lg:hidden mt-4">
                    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                        {photos.map((photo, index) => (
                            <button
                                key={index}
                                onClick={() => selectImage(index)}
                                className={`relative flex-shrink-0 w-16 h-16 overflow-hidden rounded-lg border-2 transition-all ${index === currentImageIndex
                                    ? 'border-primary'
                                    : 'border-transparent hover:border-zinc-300'
                                    }`}
                            >
                                <Image
                                    src={photo}
                                    alt={`${title} ${index + 1}`}
                                    fill
                                    className="object-cover"
                                />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="absolute top-6 right-6 flex gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        className="bg-white/95 backdrop-blur-sm hover:bg-white border-zinc-300 shadow-lg"
                    >
                        <Icon icon="lucide:share" className="w-4 h-4 mr-2" />
                        <span className="hidden sm:inline">{locale === 'fr' ? 'Partager' : 'Share'}</span>
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        className="bg-white/95 backdrop-blur-sm hover:bg-white border-zinc-300 shadow-lg"
                    >
                        <Icon icon="lucide:heart" className="w-4 h-4 mr-2" />
                        <span className="hidden sm:inline">{locale === 'fr' ? 'Enregistrer' : 'Save'}</span>
                    </Button>
                </div>
            </div>

            {/* Fullscreen Modal - Airbnb/Expedia Style */}
            {isFullscreen && (
                <div className="fixed inset-0 bg-black/90 backdrop-blur-xs z-50">
                    {/* Header */}
                    <div className="absolute top-0 left-0 right-0 z-20 bg-gradient-to-b from-black/60 to-transparent p-4">
                        <div className="flex justify-between items-center max-w-7xl mx-auto">
                            <div className="text-white">
                                <span className="text-sm font-medium">
                                    {currentImageIndex + 1} / {photos.length}
                                </span>
                            </div>
                            <button
                                onClick={() => setIsFullscreen(false)}
                                className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-full transition-colors"
                            >
                                <Icon icon="lucide:x" className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Main Image */}
                    <div className="h-full flex items-center justify-center p-4">
                        <div className="relative max-w-5xl max-h-full w-full flex items-center justify-center">
                            <Image
                                src={photos[currentImageIndex]}
                                alt={title}
                                width={1200}
                                height={800}
                                className="max-w-full max-h-full object-contain"
                            />

                            {/* Navigation Arrows */}
                            {photos.length > 1 && (
                                <>
                                    <button
                                        onClick={prevImage}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-4 rounded-full transition-colors"
                                    >
                                        <Icon icon="lucide:chevron-left" className="w-6 h-6" />
                                    </button>
                                    <button
                                        onClick={nextImage}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-4 rounded-full transition-colors"
                                    >
                                        <Icon icon="lucide:chevron-right" className="w-6 h-6" />
                                    </button>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Thumbnail Strip */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary/80 to-transparent p-4 ">
                        <div className="flex justify-center gap-2 max-w-7xl mx-auto overflow-x-auto scrollbar-hide p-2">
                            {photos.map((photo, index) => (
                                <button
                                    key={index}
                                    onClick={() => selectImage(index)}
                                    className={`relative flex-shrink-0 w-16 h-16 overflow-hidden rounded-lg border-2 transition-all ${index === currentImageIndex
                                        ? 'border-white shadow-lg scale-110'
                                        : 'border-zinc-500 hover:border-zinc-300'
                                        }`}
                                >
                                    <Image
                                        src={photo}
                                        alt={`${title} ${index + 1}`}
                                        fill
                                        className="object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}