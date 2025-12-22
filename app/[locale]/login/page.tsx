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
import { Input } from "@/components/ui/input";

export default function LoginPage() {
    const locale = useLocale();
    const router = useRouter();
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            const data = await response.json();

            if (response.ok && data.success) {
                // Redirect to dashboard on success
                router.push(`/${locale}/dashboard`);
                router.refresh();
            } else {
                // Show error message
                setError(data.message || 'Login failed. Please try again.');
                setIsLoading(false);
            }
        } catch (err) {
            console.error('Login error:', err);
            setError('An unexpected error occurred. Please try again.');
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex">
            {/* Left Section - Login Form */}
            <div className="w-full lg:w-1/2 flex flex-col">
                {/* Back to Home Link */}
                <div className="p-6 absolute ">
                    <Link href={`/${locale}`} className="inline-flex items-center gap-2 text-secondary hover:text-secondary/70 font-medium">
                        <Icon icon="lucide:arrow-left" className="w-5 h-5" />
                        Retour à l&apos;accueil
                    </Link>
                </div>

                {/* Form Container */}
                <div className="flex-1 flex items-center justify-center px-6 sm:px-12 lg:px-16">
                    <div className="w-full max-w-md space-y-8">
                        {/* Logo and Badge */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <Image
                                    src="/assets/logos/logo.full.png"
                                    alt="Logo"
                                    width={300}
                                    height={300}
                                />
                                <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm font-medium">
                                    Voyageur
                                </span>
                            </div>
                        </div>

                        {/* Header */}
                        <div className="space-y-2">
                            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                                Content de vous revoir
                            </h1>
                            <p className="text-base text-gray-600 dark:text-gray-400 ">
                                Connectez-vous pour accéder à vos réservations
                            </p>
                        </div>

                        {/* Host Link */}
                        <Link
                            href={`/${locale}/host/login`}
                            className="inline-flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium p-2 border rounded-lg"
                        >
                            <Icon icon="lucide:home" className="w-5 h-5" />
                            Espace Hôte
                        </Link>

                        {/* Login Form */}
                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Error Message */}
                            {error && (
                                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                                    <div className="flex items-center gap-2">
                                        <Icon icon="lucide:alert-circle" className="w-5 h-5 text-red-600 dark:text-red-400" />
                                        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                                    </div>
                                </div>
                            )}

                            {/* Email */}
                            <div className="space-y-2">
                                <div className="relative">
                                    <Icon 
                                        icon="lucide:mail" 
                                        className="absolute left-2 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" 
                                    />
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="Adresse email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="pl-8"
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div className="space-y-2">
                                <div className="relative">
                                    <Icon 
                                        icon="lucide:lock" 
                                        className="absolute left-2 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" 
                                    />
                                    <Input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Mot de passe"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className="pl-8"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                    >
                                        <Icon 
                                            icon={showPassword ? "lucide:eye-off" : "lucide:eye"} 
                                            className="w-5 h-5" 
                                        />
                                    </button>
                                </div>
                            </div>

                            {/* Forgot Password */}
                            <div className="flex justify-end">
                                <Link 
                                    href={`/${locale}/forgot-password`}
                                    className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-500 dark:hover:text-blue-400 font-medium"
                                >
                                    Mot de passe oublié ?
                                </Link>
                            </div>

                            {/* Submit Button */}
                            <Button 
                                type="submit" 
                                className="w-full bg-gray-900 hover:bg-gray-800 dark:bg-gray-100 dark:hover:bg-gray-200 text-white dark:text-gray-900 font-semibold py-3.5 rounded-lg transition-colors" 
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <div className="flex items-center gap-2">
                                        <Spinner />
                                        <span>Connexion en cours...</span>
                                    </div>
                                ) : (
                                    "Se connecter"
                                )}
                            </Button>
                        </form>

                        {/* Sign Up Link */}
                        <div className="text-center text-sm text-gray-600 dark:text-gray-400">
                            Pas encore de compte ?{' '}
                            <Link 
                                href={`/${locale}/signup`}
                                className="text-blue-600 hover:text-blue-700 dark:text-blue-500 dark:hover:text-blue-400 font-semibold hover:underline"
                            >
                                Inscrivez-vous
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Section - Image */}
            <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
                <div className="absolute ">
                    <Image
                        src="https://subtle-faun-02f48b.netlify.app/assets/hero-villa-Cil0peFb.jpg"
                        alt="Login Background"
                        height={1080}
                        width={1920}
                        className="object-cover w-full h-screen"
                    />
                </div>
                <div className="relative z-10 h-full">
                    {/* Placeholder pour l'image de fond */}
                    <div className="absolute p- bg-primary/20 inset-0">
                        <div className="absolute left-12 bottom-12 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm rounded-[40px] p-8 max-w-xl shadow-2xl">
                            <blockquote className="space-y-4">
                                <p className="text-lg font-medium dark:text-gray-200 ">
                                    &quot;WANDERLATE a transformé notre façon de voyager. Des hébergements uniques, un service impeccable !&quot;
                                </p>
                                <footer className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/40 flex items-center justify-center">
                                        <Icon icon="lucide:user" className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <div className="font-semibold text-gray-900 dark:text-white">Marie & Pierre</div>
                                        <div className="text-sm text-blue-600 dark:text-blue-400">Voyageurs depuis 2021</div>
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