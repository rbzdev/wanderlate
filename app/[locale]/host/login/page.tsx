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

export default function HostLoginPage() {
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
                    // role: 'host', // Specify host role
                }),
            });

            const data = await response.json();

            if (response.ok && data.success) {
                // Redirect to host dashboard on success
                router.push(`/${locale}/host/dashboard`);
                router.refresh();
            } else {
                // Show error message
                setError(data.message || 'Connexion échouée. Veuillez réessayer.');
                setIsLoading(false);
            }
        } catch (err) {
            console.error('Login error:', err);
            setError('Une erreur inattendue s\'est produite. Veuillez réessayer.');
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex">
            {/* Left Section - Login Form */}
            <div className="w-full lg:w-1/2 flex flex-col">
                {/* Back to Home Link */}
                <div className="p-6 absolute">
                    <Link href={`/${locale}`} className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 font-medium">
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
                                    alt="WANDERLATE Logo"
                                    width={250}
                                    height={60}
                                />
                                <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-full text-sm font-medium">
                                    Hôte
                                </span>
                            </div>
                        </div>

                        {/* Header */}
                        <div className="space-y-2">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full bg-emerald-600 dark:bg-emerald-900/30 flex items-center justify-center">
                                    <Icon icon="lucide:home" className="w-6 h-6 text-white dark:text-emerald-400" />
                                </div>
                                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                                    Espace Hôte
                                </h1>
                            </div>
                            <p className="text-base text-gray-600 dark:text-gray-400">
                                Gérez vos propriétés et accueillez des voyageurs
                            </p>
                        </div>

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
                                        className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" 
                                    />
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="Adresse email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="pl-10 h-12 border-gray-300 dark:border-gray-600"
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div className="space-y-2">
                                <div className="relative">
                                    <Icon 
                                        icon="lucide:lock" 
                                        className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" 
                                    />
                                    <Input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Mot de passe"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className="pl-10 h-12 border-gray-300 dark:border-gray-600"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
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
                                    href={`/${locale}/host/forgot-password`}
                                    className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
                                >
                                    Mot de passe oublié ?
                                </Link>
                            </div>

                            {/* Submit Button */}
                            <Button 
                                type="submit" 
                                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3.5 h-12 rounded-lg transition-colors shadow-sm" 
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
                                href={`/${locale}/host/signup`}
                                className="text-gray-900 dark:text-white font-semibold hover:underline"
                            >
                                Inscrivez-vous
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Section - Image with Testimonial */}
            <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0">
                    <Image
                        src="https://subtle-faun-02f48b.netlify.app/assets/hero-travel-premium-Dva0bRqc.jpg"
                        alt="Host Login Background"
                        fill
                        className="object-cover"
                        priority
                    />
                    {/* Overlay for better text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                </div>

                {/* Testimonial Card */}
                <div className="relative z-10 h-full flex items-end justify-start p-12">
                    <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm rounded-3xl p-8 max-w-lg shadow-2xl">
                        <blockquote className="space-y-6">
                            <p className="text-lg font-medium text-gray-900 dark:text-gray-100 leading-relaxed">
                                &quot;Grâce à WANDERLATE, j&apos;ai pu louer ma maison de vacances et couvrir tous mes frais. Une plateforme simple et efficace !&quot;
                            </p>
                            <footer className="flex items-center gap-4 pt-2 border-t border-gray-200 dark:border-gray-700">
                                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg">
                                    <Icon icon="lucide:home" className="w-7 h-7 text-white" />
                                </div>
                                <div>
                                    <div className="font-semibold text-gray-900 dark:text-white text-lg">Jean-Marc</div>
                                    <div className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">Hôte depuis 2022</div>
                                </div>
                            </footer>
                        </blockquote>
                    </div>
                </div>
            </div>
        </div>
    );
}
