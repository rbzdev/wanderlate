"use client"

import Link from "next/link"
import { Icon } from "@iconify/react"
import { useEffect, useState } from "react"
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"
import { getCurrentUser } from "@/app/api/action/user"
import { logoutAction } from "@/app/api/action/logout"

interface User {
    id: string;
    email: string;
    firstname: string;
    lastName: string;
    phone: string;
    country: string | null;
    accountType: string;
    createdAt: Date;
}

export default function UserWidget() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchUser() {
            try {
                const result = await getCurrentUser();
                if (result.success && result.user) {
                    setUser(result.user);
                }
            } catch (error) {
                console.error("Erreur lors de la récupération de l'utilisateur:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchUser();
    }, []);

    const initials = user 
        ? `${user.firstname.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase()
        : "";

    const handleLogout = async () => {
        try {
            await logoutAction();
        } catch (error) {
            console.error("Erreur lors de la déconnexion:", error);
        }
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 hover:shadow-sm"
                    aria-label="Ouvrir le menu utilisateur"
                >
                    <Icon icon="jam:menu" className="text-3xl text-muted-foreground" />
                    {user ? (
                        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-sm font-bold">
                            {initials}
                        </div>
                    ) : (
                        <Icon icon="si:user-duotone" className="size-6" />
                    )}
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
                {user ? (
                    <>
                        <DropdownMenuLabel>
                            <div className="flex flex-col space-y-1">
                                <p className="text-sm font-medium leading-none">
                                    {user.firstname} {user.lastName}
                                </p>
                                <p className="text-xs leading-none text-muted-foreground truncate">
                                    {user.email}
                                </p>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                            <Link href="/dashboard">
                                <Icon icon="mdi:view-dashboard" className="mr-2 size-4" />
                                Tableau de bord
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link href="/dashboard">
                                <Icon icon="mdi:airplane" className="mr-2 size-4" />
                                Mes voyages
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link href="#">
                                <Icon icon="mdi:heart-outline" className="mr-2 size-4" />
                                Favoris
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                            <Link href="#">
                                <Icon icon="mdi:cog" className="mr-2 size-4" />
                                Paramètres
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link href="#">
                                <Icon icon="mdi:help-circle" className="mr-2 size-4" />
                                Aide
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                            className="text-red-600 focus:text-red-600"
                            asChild
                        >
                            <button 
                                onClick={handleLogout}
                                className="w-full cursor-pointer"
                            >
                                <Icon icon="mdi:logout" className="mr-2 size-4" />
                                Déconnexion
                            </button>
                        </DropdownMenuItem>
                    </>
                ) : (
                    <>
                        <DropdownMenuLabel>Compte</DropdownMenuLabel>
                        <DropdownMenuItem asChild>
                            <Link href="/login">
                                <Icon icon="mdi:login" className="mr-2 size-4" />
                                Connexion
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link href="#">
                                <Icon icon="mdi:account-plus" className="mr-2 size-4" />
                                Inscription
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                            <Link href="#">
                                <Icon icon="mdi:help-circle" className="mr-2 size-4" />
                                Aide
                            </Link>
                        </DropdownMenuItem>
                    </>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
