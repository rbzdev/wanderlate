'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Icon } from '@iconify/react';
import { Button } from '@/components/ui/button';
import { Share, Heart } from 'lucide-react';
import { useLocale } from 'next-intl';

interface ImageGalleryProps {
    photos: string[];
    title: string;
}

export default function ImageGallery({ photos, title }: ImageGalleryProps) {
    const locale = useLocale();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    return (
        <div className="relative p-4 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 h-96 md:h-[500px]">
                {/* Main Image */}
                <div className="relative col-span-1 md:col-span-1 md:row-span-2 overflow-hidden rounded-l-lg">
                    {photos && photos.length > 0 ? (
                        <Image
                            src={photos[currentImageIndex]}
                            alt={title}
                            fill
                            className="object-cover"
                        />
                    ) : (
                        <div className="w-full h-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center">
                            <Icon icon="lucide:image" className="w-12 h-12 text-zinc-400" />
                        </div>
                    )}
                </div>

                {/* Thumbnail Grid */}
                <div className="hidden md:grid grid-cols-2 gap-2">
                    {photos && photos.slice(1, 5).map((photo, index) => (
                        <div key={index} className="relative aspect-square overflow-hidden rounded-r-lg">
                            <Image
                                src={photo}
                                alt={`${title} ${index + 2}`}
                                fill
                                className="object-cover cursor-pointer hover:opacity-80 transition-opacity"
                                onClick={() => setCurrentImageIndex(index + 1)}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Action Buttons */}
            <div className="absolute top-4 right-4 flex gap-2">
                <Button variant="outline" size="sm" className="bg-white/80 backdrop-blur-sm">
                    <Share className="w-4 h-4 mr-2" />
                    {locale === 'fr' ? 'Partager' : 'Share'}
                </Button>
                <Button variant="outline" size="sm" className="bg-white/80 backdrop-blur-sm">
                    <Heart className="w-4 h-4 mr-2" />
                    {locale === 'fr' ? 'Enregistrer' : 'Save'}
                </Button>
            </div>
        </div>
    );
}