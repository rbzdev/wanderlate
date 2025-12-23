'use client';

import Link from "next/link";
import { useState } from "react";
import { useLocale } from 'next-intl';
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

// Components
import { Button } from "@/components/ui/button";
import Spinner from "@/components/ui/spinner";
import Step1BasicInfo from "./components/Step1BasicInfo";
import Step2Authentication from "./components/Step2Authentication";
import Step3AccountType from "./components/Step3AccountType";

// Types
export interface SignupData {
    // Step 1: Basic Info
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    birthDay: string;
    birthMonth: string;
    birthYear: string;
    country: string;

    // Step 2: Authentication
    password: string;
    confirmPassword: string;

    // Step 3: Account Type
    accountType: 'traveler' | 'host';
    language: string;
    currency: string;

    // Terms
    acceptTerms: boolean;
}

export default function SignupPage() {
    const locale = useLocale();
    const router = useRouter();

    const [currentStep, setCurrentStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState<SignupData>({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        birthDay: '',
        birthMonth: '',
        birthYear: '',
        country: '',
        password: '',
        confirmPassword: '',
        accountType: 'traveler',
        language: 'fr',
        currency: 'EUR',
        acceptTerms: true,
    });

    const updateFormData = (data: Partial<SignupData>) => {
        setFormData(prev => {
            const next = { ...prev, ...data };
            // Si birthDay change, extraire birthMonth et birthYear
            if (data.birthDay) {
                const [year, month] = data.birthDay.split('-');
                next.birthMonth = month || '';
                next.birthYear = year || '';
            }
            return next;
        });
    };

    const handleNext = () => {
        setError(null);
        if (currentStep < 3) {
            setCurrentStep(prev => prev + 1);
        }
    };

    const handleBack = () => {
        setError(null);
        if (currentStep > 1) {
            setCurrentStep(prev => prev - 1);
        }
    };

    const handleSubmit = async () => {
        setError(null);
        setIsLoading(true);

        // // DEBUG: Log form data
        // console.log('Submitting signup data:', formData);

        try {
            const response = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok && data.success) {
                // Redirect to dashboard on success
                router.push(`/${locale}/dashboard`);
                router.refresh();
            } else {
                // Show error message
                setError(data.message || 'Inscription échouée. Veuillez réessayer.');
                setIsLoading(false);
            }
        } catch (err) {
            console.error('Signup error:', err);
            setError('Une erreur inattendue s\'est produite. Veuillez réessayer.');
            setIsLoading(false);
        }
    };

    const steps = [
        { number: 1, title: 'Infos de base' },
        { number: 2, title: 'Authentification' },
        { number: 3, title: 'Type de compte' },
    ];

    return (
        <div className="min-h-screen flex">
            {/* Left Section - Signup Form */}
            <div className="w-full lg:w-1/2 flex flex-col">
                {/* Back to Home Link */}
                <div className="p-2 fixed top-6 left-2 hover:border rounded-xl backdrop-blur-sm hover:scale-95 transition-all ">
                    <Link href={`/${locale}`} className="flex items-center justify-center gap-2 text-secondary hover:text-secondary/70 font-medium">
                        <Icon icon="lucide:arrow-left" className="w-5 h-5" />
                        Retour à l&apos;accueil
                    </Link>
                </div>

                {/* Form Container */}
                <div className="flex-1 flex items-center justify-center px-6 sm:px-12 lg:px-16 py-20">
                    <div className="w-full max-w-md space-y-8">
                        {/* Logo */}
                        <div className="">
                            <Image
                                src="/assets/logos/logo.full.png"
                                alt="Logo"
                                width={300}
                                height={300}
                                className="w-44 h-fit object-contain"
                            />
                        </div>

                        {/* Header */}
                        <div className="space-y-2">
                            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                                Créer votre compte
                            </h1>
                            <p className="text-xs lg:text-sm text-gray-600 dark:text-gray-400">
                                Rejoignez WANDERLATE et commencez votre aventure
                            </p>
                        </div>

                        {/* Progress Steps */}
                        <div className="flex items-center justify-between">
                            {steps.map((step, index) => (
                                <div key={step.number} className="flex items-center flex-1">
                                    <div className="relative flex flex-col items-center justify-around flex-1 ">
                                        <div
                                            className={` w-8 h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${currentStep >= step.number
                                                ? 'bg-primary text-white'
                                                : 'bg-gray-200 text-gray-600'
                                                }`}
                                        >
                                           
                                                {currentStep > step.number ? (
                                                    <Icon icon="lucide:check" className="w-5 h-5" />
                                                ) : (
                                                    <span>{step.number}</span>
                                                )}



                                        </div>

                                        <span
                                            className={`text-xs absolute mt-2 block w-24 -bottom-4 text-center truncate ${currentStep >= step.number
                                                ? 'text-gray-900'
                                                : 'text-gray-500'
                                                }`}
                                        >
                                            {step.title}
                                        </span>
                                    </div>

                                    {index < steps.length - 1 && (
                                        <div className={`h-0.5 flex-1 mx-2 rounded-full ${currentStep > step.number
                                            ? 'bg-primary'
                                            : 'bg-gray-200'
                                            }`} />
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                                <div className="flex items-center gap-2">
                                    <Icon icon="lucide:alert-circle" className="w-5 h-5 text-red-600 dark:text-red-400" />
                                    <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                                </div>
                            </div>
                        )}

                        {/* Step Content */}
                        <div className="space-y-5">
                            {currentStep === 1 && (
                                <Step1BasicInfo
                                    formData={formData}
                                    updateFormData={updateFormData}
                                    onNext={handleNext}
                                />
                            )}

                            {currentStep === 2 && (
                                <Step2Authentication
                                    formData={formData}
                                    updateFormData={updateFormData}
                                    onNext={handleNext}
                                    onBack={handleBack}
                                />
                            )}

                            {currentStep === 3 && (
                                <Step3AccountType
                                    formData={formData}
                                    updateFormData={updateFormData}
                                    onSubmit={handleSubmit}
                                    onBack={handleBack}
                                    isLoading={isLoading}
                                />
                            )}
                            {/* Accept Terms Checkbox (toujours visible à la fin) */}
                            {currentStep === 3 && (
                                <div className="flex items-center gap-2 mt-2 hidden">
                                    <input
                                        id="acceptTerms"
                                        type="checkbox"
                                        checked={formData.acceptTerms}
                                        onChange={e => updateFormData({ acceptTerms: e.target.checked })}
                                        required
                                        className="accent-primary w-4 h-4 rounded"
                                    />
                                    <label htmlFor="acceptTerms" className="text-xs text-gray-700 dark:text-gray-300 select-none cursor-pointer">
                                        J&apos;accepte les <a href="#" className="text-primary underline">conditions d&apos;utilisation</a> et la <a href="#" className="text-primary underline">politique de confidentialité</a>.
                                    </label>
                                </div>
                            )}
                        </div>

                        {/* Login Link */}
                        <div className="text-center text-sm text-gray-600 dark:text-gray-400">
                            Déjà un compte ?{' '}
                            <Link
                                href={`/${locale}/login`}
                                className="text-secondary hover:text-secondary-dark dark:text-secondary-light dark:hover:text-secondary font-semibold hover:underline"
                            >
                                Connectez-vous
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Section - Image */}
            <div className="hidden lg:block lg:w-1/2 sticky top-0 h-screen  overflow-hidden">
                <div className="absolute inset-0">
                    <Image
                        src="https://subtle-faun-02f48b.netlify.app/assets/hero-villa-Cil0peFb.jpg"
                        alt="Signup Background"
                        height={1080}
                        width={1920}
                        className="object-cover w-full h-full"
                    />
                </div>
                <div className="relative z-10 h-full">
                    <div className="absolute p- bg-primary/20 inset-0">
                        <div className="absolute left-12 bottom-12 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm rounded-[40px] p-8 max-w-xl shadow-2xl">
                            <blockquote className="space-y-4">
                                <p className="text-lg font-medium dark:text-gray-200">
                                    &quot;Créez votre compte et découvrez des milliers d&apos;hébergements uniques à travers le monde !&quot;
                                </p>
                                <footer className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/40 flex items-center justify-center">
                                        <Icon icon="lucide:globe" className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <div className="font-semibold text-gray-900 dark:text-white">WANDERLATE</div>
                                        <div className="text-sm text-blue-600 dark:text-blue-400">Votre aventure commence ici</div>
                                    </div>
                                </footer>
                            </blockquote>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
