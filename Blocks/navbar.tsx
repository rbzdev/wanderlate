"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Icon } from "@iconify/react"
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function Navbar() {
    return (
        <header className="sticky top-0 z-50 border-b bg-background/70 backdrop-blur supports-backdrop-filter:bg-background/60">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* Left: Brand */}
                <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="flex items-center gap-2"
                >
                    <Link href="/" className="inline-flex items-center gap-1">
                        <Image
                            src={"/logo.ico"}
                            width={28}
                            height={28}
                            alt="Wanderlate Logo"
                            className="rounded-sm"
                        />
                        <span className="bg-linear-to-r from-foreground to-foreground/60 bg-clip-text text-lg font-bold text-transparent">
                            Wanderlate
                        </span>
                    </Link>
                </motion.div>



                {/* Right: actions */}
                <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: 0.1, ease: "easeOut" }}
                    className="flex items-center gap-2 sm:gap-3"
                >
                    <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
                        Ajouter une logement
                    </Button>
                    <Button variant="ghost" size="icon" aria-label="Langue et devise">
                        <Icon icon="lucide:globe" className="size-5" />
                    </Button>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button
                                className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 hover:shadow-sm"
                                aria-label="Ouvrir le menu utilisateur"
                            >
                                <Icon icon="jam:menu" className="text-3xl text-muted-foreground" />
                                <Icon icon="si:user-duotone" className="size-6" />
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                            <DropdownMenuLabel>Compte</DropdownMenuLabel>
                            <DropdownMenuItem asChild>
                                <Link href="#">Connexion</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link href="#">Inscription</Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                                <Link href="#">Voyages</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link href="#">Listes de souhaits</Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                                <Link href="#">Aide</Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </motion.div>
            </div>


        </header>
    )
}

