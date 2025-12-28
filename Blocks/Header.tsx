"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Icon } from "@iconify/react"
import { useTranslations } from "next-intl"

export default function HeroHeader() {
    const t = useTranslations("Header")

    return (
        <section className=" overflow-hidden">

            <div className="relative mx-auto max-w-7xl px-4 py-10 sm:py-14 sm:px-6 lg:px-8">
                
                <div className="grid items-center gap-8 mt-32 mx-auto ">
                    <div className="space-y-5 z-10">
                        <motion.h1
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className="text-balance text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
                        >
                            {t("title")}
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.05, ease: "easeOut" }}
                            className="text-pretty text-base text-muted-foreground sm:text-lg"
                        >
                            {t("description")}
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                            className="flex items-center gap-3"
                        >
                            <Button size="lg" className="rounded-full">
                                {t("ctaPrimary")}
                            </Button>
                            <Button size="lg" variant="outline" className="rounded-full" disabled>
                                {t("ctaSecondary")}
                            </Button>
                        </motion.div>
                    </div>


                </div>
            </div>

            {/* PUB image */}
            <motion.img
                src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Beautiful travel destination"
                initial={{ opacity: 0, y: 16, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="mx-auto w-full object-cover absolute inset-0"
            />
        </section>
    )
}

