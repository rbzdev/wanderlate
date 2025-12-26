'use client';

import { useState, useRef } from 'react';
import { Icon } from '@iconify/react';
import Image from 'next/image';
import type { PutBlobResult } from '@vercel/blob';
import { toast } from 'sonner';

interface Step4Props {
    data: {
        photos: string[];
        mainPhotoIndex: number;
    };
    updateData: (data: Partial<Step4Props['data']>) => void;
}

export function Step4Photos({ data, updateData }: Step4Props) {
    const [photoURLs, setPhotoURLs] = useState<string[]>([]);
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;

        const files = Array.from(e.target.files);
        setIsUploading(true);

        const newPhotos = [...data.photos];
        const newPreviewURLs = [...photoURLs];

        try {
            // Upload each file following Vercel's pattern
            for (const file of files) {
                // Create preview URL
                const previewUrl = URL.createObjectURL(file);
                newPreviewURLs.push(previewUrl);
                setPhotoURLs([...newPreviewURLs]);

                // Upload to Vercel Blob
                const response = await fetch(
                    `/api/upload?filename=${encodeURIComponent(file.name)}`,
                    {
                        method: 'POST',
                        body: file,
                    }
                );

                if (!response.ok) {
                    throw new Error(`Upload failed: ${response.statusText}`);
                }

                const blob = (await response.json()) as PutBlobResult;
                newPhotos.push(blob.url);

                console.log('Photo uploadée:', blob.url);
            }

            updateData({
                photos: newPhotos
            });

        } catch (error) {
            console.error('Erreur lors de l\'upload:', error);
            toast.error('Erreur lors de l\'ajout des photos. Veuillez réessayer.');
        } finally {
            setIsUploading(false);
            // Reset file input
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };

    const removePhoto = (index: number) => {
        const newPhotos = data.photos.filter((_, i) => i !== index);

        updateData({
            photos: newPhotos,
            mainPhotoIndex: data.mainPhotoIndex >= index ? Math.max(0, data.mainPhotoIndex - 1) : data.mainPhotoIndex,
        });

        // Revoke URL to free memory
        URL.revokeObjectURL(photoURLs[index]);
        setPhotoURLs((prev) => prev.filter((_, i) => i !== index));
    };

    const setMainPhoto = (index: number) => {
        updateData({ mainPhotoIndex: index });
    };

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2">
                    Photos de votre logement
                </h3>

                <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
                    Ajoutez au moins une photo. La première sera utilisée comme image principale.
                </p>

                {/* Photo Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                    {photoURLs.map((url, index) => (
                        <div
                            key={index}
                            className="relative aspect-square rounded-xl overflow-hidden border-2 border-zinc-200 dark:border-zinc-700 group"
                        >
                            <Image
                                src={url}
                                alt={`Photo ${index + 1}`}
                                fill
                                className="object-cover"
                            />

                            {/* Main Photo Badge */}
                            {index === data.mainPhotoIndex && (
                                <div className="absolute top-2 left-2 bg-blue-900 text-white px-3 py-1 rounded-full text-xs font-semibold">
                                    Principale
                                </div>
                            )}

                            {/* Actions */}
                            {/* <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                {index !== data.mainPhotoIndex && (
                                    <button
                                        onClick={() => setMainPhoto(index)}
                                        className="p-2 bg-white rounded-full hover:bg-zinc-100 transition-colors"
                                        title="Définir comme principale"
                                    >
                                        <Icon icon="lucide:star" className="w-5 h-5 text-zinc-900" />
                                    </button>
                                )}
                                <button
                                    onClick={() => removePhoto(index)}
                                    className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
                                    title="Supprimer"
                                >
                                    <Icon icon="lucide:trash-2" className="w-5 h-5" />
                                </button>
                            </div> */}
                        </div>
                    ))}

                    {/* Add Photo Button */}
                    <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isUploading}
                        className="aspect-square rounded-xl border-2 border-dashed border-zinc-300 dark:border-zinc-700 hover:border-blue-600 dark:hover:border-blue-400 transition-colors flex flex-col items-center justify-center gap-2 text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isUploading ? (
                            <>
                                <Icon icon="lucide:loader-2" className="w-8 h-8 animate-spin" />
                                <span className="text-sm font-medium">Upload...</span>
                            </>
                        ) : (
                            <>
                                <Icon icon="lucide:upload" className="w-8 h-8" />
                                <span className="text-sm font-medium">Ajouter des photos</span>
                            </>
                        )}
                    </button>
                </div>

                <input
                    ref={fileInputRef}
                    type="file"
                    name="file"
                    accept="image/jpeg, image/png, image/webp"
                    multiple
                    onChange={handleFileSelect}
                    className="hidden"
                />
            </div>
        </div>
    );
}
