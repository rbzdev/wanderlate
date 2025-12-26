'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import { Button } from '@/components/ui/button';
import { Step1BasicInfo } from './Step1BasicInfo';
import { Step2Location } from './Step2Location';
import { Step3Capacity } from './Step3Capacity';
import { Step4Photos } from './Step4Photos';
import { Step5Pricing } from './Step5Pricing';
import { toast } from 'sonner';
import { AnimatePresence, motion } from 'framer-motion';

interface CreateListingClientProps {
  locale: string;
  userId: string;
}

interface ListingData {
  // Step 1: Basic Info
  title: string;
  propertyType: string;
  description: string;

  // Step 2: Location
  city: string;
  country: string;
  address?: string;
  postalCode?: string;

  // Step 3: Capacity & Amenities
  maxGuests: number;
  bedrooms: number;
  beds: number;
  bathrooms: number;
  amenities: string[];

  // Step 4: Photos
  photos: string[];
  mainPhotoIndex: number;

  // Step 5: Pricing
  pricePerNight: number;
  cleaningFee: number;
  minNights: number;
  maxNights: number;
  cancellationPolicy: string;
}

const STEPS = [
  { id: 1, name: 'Informations de base', icon: 'solar:home-angle-linear' },
  { id: 2, name: 'Localisation', icon: 'lucide:map-pin' },
  { id: 3, name: 'Capacité & équipements', icon: 'lucide:users' },
  { id: 4, name: 'Photos', icon: 'lucide:image' },
  { id: 5, name: 'Tarification', icon: 'lucide:euro' },
];

export function CreateListingClient({ locale, userId }: CreateListingClientProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState(0); // -1 for previous, 1 for next
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [listingData, setListingData] = useState<ListingData>({
    title: '',
    propertyType: 'Appartement',
    description: '',
    city: '',
    country: '',
    address: '',
    postalCode: '',
    maxGuests: 2,
    bedrooms: 1,
    beds: 1,
    bathrooms: 1,
    amenities: [],
    photos: [],
    mainPhotoIndex: 0,
    pricePerNight: 50,
    cleaningFee: 0,
    minNights: 1,
    maxNights: 30,
    cancellationPolicy: 'Flexible - Remboursement intégral jusqu\'à 24h avant',
  });

  const updateListingData = (data: Partial<ListingData>) => {
    setListingData((prev) => ({ ...prev, ...data }));
  };

  // Validation functions for each step
  const validateStep1 = (): boolean => {
    return (
      listingData.title.trim().length > 0 &&
      listingData.propertyType.trim().length > 0 &&
      listingData.description.trim().length >= 50
    );
  };

  const validateStep2 = (): boolean => {
    return (
      listingData.city.trim().length > 0 &&
      listingData.country.trim().length > 0
    );
  };

  const validateStep3 = (): boolean => {
    return (
      listingData.maxGuests > 0 &&
      listingData.bedrooms >= 0 &&
      listingData.beds > 0 &&
      listingData.bathrooms > 0
    );
  };

  const validateStep4 = (): boolean => {
    return listingData.photos.length > 0;
  };

  const validateStep5 = (): boolean => {
    return (
      listingData.pricePerNight > 0 &&
      listingData.minNights > 0 &&
      listingData.maxNights > 0 &&
      listingData.cancellationPolicy.trim().length > 0
    );
  };

  const validateCurrentStep = (): boolean => {
    switch (currentStep) {
      case 1:
        return validateStep1();
      case 2:
        return validateStep2();
      case 3:
        return validateStep3();
      case 4:
        return validateStep4();
      case 5:
        return validateStep5();
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (!validateCurrentStep()) {
      toast.info('Veuillez remplir tous les champs obligatoires avant de continuer.');
      return;
    }
    if (currentStep < 5) {
      setDirection(1);
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setDirection(-1);
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    if (!validateCurrentStep()) {
      toast.info('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/listings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(listingData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create listing');
      }

      console.log('Listing created successfully:', data.listing);
      
      // Show success message
      toast.success('Votre annonce a été créée avec succès !');
      
      // Redirect to host dashboard
      window.location.href = `/${locale}/host/dashboard`;
    } catch (error) {
      console.error('Error creating listing:', error);
    //   toast.error(
    //     error instanceof Error 
    //       ? `Erreur: ${error.message}` 
    //       : 'Une erreur est survenue lors de la création de l\'annonce. Veuillez réessayer.'
    //   );
    toast.error('Une erreur est survenue. Veuillez réessayer!');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      {/* Header */}
      <div className="bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <Link
            href={`/${locale}/host/dashboard`}
            className="inline-flex items-center gap-2 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white mb-4"
          >
            <Icon icon="lucide:arrow-left" className="w-5 h-5" />
            Retour au dashboard
          </Link>
          
          <div className="mb-6">
            <h1 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">
              Créer une annonce
            </h1>
            <p className="text-zinc-600 dark:text-zinc-400">
              Complétez les informations pour publier votre hébergement
            </p>
          </div>

          {/* Progress Steps */}
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-4">
              {STEPS.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      currentStep === step.id
                        ? 'bg-primary text-white'
                        : currentStep > step.id
                        ? 'bg-secondary text-white'
                        : 'bg-zinc-200 dark:bg-zinc-700 text-zinc-500 dark:text-zinc-400'
                    }`}
                  >
                    {currentStep > step.id ? (
                      <Icon icon="lucide:check" className="w-6 h-6" />
                    ) : (
                      <Icon icon={step.icon} className="w-6 h-6" />
                    )}
                  </div>
                  
                  {index < STEPS.length - 1 && (
                    <div
                      className={`w-6 lg:w-32 h-1 mx-2 rounded-full ${
                        currentStep > step.id
                          ? 'bg-secondary '
                          : 'bg-zinc-200 dark:bg-zinc-700'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            
            {/* Centralized Step Title */}
            <div className="text-center mt-4">
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
                {STEPS[currentStep - 1].name}
              </h2>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                Étape {currentStep} sur 5
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Step Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-2 lg:p-8 overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentStep}
              custom={direction}
              initial={{ x: direction > 0 ? 200 : -200, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: direction > 0 ? 200 : -200, opacity: 0 }}
              transition={{
                x: {
                  type: 'tween',
                  ease: [0.4, 0, 0.2, 1],
                  duration: 0.35,
                },
                opacity: {
                  duration: 0.3,
                },
              }}
            >
              {currentStep === 1 && (
                <Step1BasicInfo
                  data={listingData}
                  updateData={updateListingData}
                />
              )}
              {currentStep === 2 && (
                <Step2Location
                  data={listingData}
                  updateData={updateListingData}
                />
              )}
              {currentStep === 3 && (
                <Step3Capacity
                  data={listingData}
                  updateData={updateListingData}
                />
              )}
              {currentStep === 4 && (
                <Step4Photos
                  data={listingData}
                  updateData={updateListingData}
                />
              )}
              {currentStep === 5 && (
                <Step5Pricing
                  data={listingData}
                  updateData={updateListingData}
                />
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-zinc-200 dark:border-zinc-800">
            <Button
              onClick={handlePrevious}
              disabled={currentStep === 1}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Icon icon="lucide:arrow-left" className="w-4 h-4" />
              Précédent
            </Button>

            {currentStep < 5 ? (
              <Button
                onClick={handleNext}
                disabled={!validateCurrentStep()}
                className="flex items-center gap-2"
              >
                Suivant
                <Icon icon="lucide:arrow-right" className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting || !validateCurrentStep()}
                className="flex items-center gap-2 bg-primary hover:bg-primary/80"
              >
                {isSubmitting ? (
                  <>
                    <Icon icon="lucide:loader-2" className="w-4 h-4 animate-spin" />
                    Publication...
                  </>
                ) : (
                  <>
                    <Icon icon="lucide:check" className="w-4 h-4" />
                    Publier l&apos;annonce
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
