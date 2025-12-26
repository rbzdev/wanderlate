"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Icon } from "@iconify/react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import UserWidget from "./navbar/userWidget"

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
                            src={"/assets/logos/logo.full.png"}
                            width={100}
                            height={100}
                            priority
                            alt="Wanderlate Logo"
                            className="rounded-sm w-40 h-20 object-contain"
                        />

                    </Link>
                </motion.div>



                {/* Right: actions */}
                <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: 0.1, ease: "easeOut" }}
                    className="flex items-center gap-2 sm:gap-3"
                >
                    <Link
                        href="/host/dashboard/listings/new"
                    >
                        <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
                            Ajouter un logement
                        </Button>
                    </Link>


                    <Button variant="ghost" size="icon" aria-label="Langue et devise">
                        <Icon icon="lucide:globe" className="size-5" />
                    </Button>

                    <UserWidget />
                </motion.div>
            </div>


        </header>
    )
}

