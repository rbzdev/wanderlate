"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Icon } from "@iconify/react"
import { useTranslations } from "next-intl"

export default function HeroHeader() {
    const t = useTranslations("Header")

    return (
        <section className="relative overflow-hidden">


            <div className="mx-auto max-w-7xl px-4 py-10 sm:py-14 sm:px-6 lg:px-8">
                <div className="grid items-center gap-8 md:grid-cols-2">
                    <div className="space-y-5">
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

                    {/* Decorative mock search card */}
                    <motion.div
                        initial={{ opacity: 0, y: 16, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="mx-auto w-full max-w-xl"
                    >
                        <div className="rounded-2xl border bg-background/70 p-4 shadow-xl backdrop-blur supports-backdrop-filter:bg-background/60">
                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                                <div className="flex items-center gap-2 rounded-xl border bg-card px-3 py-3">
                                    <Icon icon="si:pin-duotone" className="size-5 text-primary" />
                                    <div className="min-w-0">
                                        <div className="truncate text-xs text-muted-foreground">{t("search.where")}</div>
                                        <div className="truncate text-sm font-medium text-muted-foreground">{t("search.wherePlaceholder")}</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 rounded-xl border bg-card px-3 py-3">
                                    <Icon icon="solar:calendar-line-duotone" className="size-5 text-primary" />
                                    <div className="min-w-0">
                                        <div className="truncate text-xs text-muted-foreground">{t("search.dates")}</div>
                                        <div className="truncate text-sm font-medium text-muted-foreground">{t("search.datesPlaceholder")}</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 rounded-xl border bg-card px-3 py-3">
                                    <Icon icon="ph:users-duotone" className="size-5 text-primary" />
                                    <div className="min-w-0">
                                        <div className="truncate text-xs text-muted-foreground">{t("search.guests")}</div>
                                        <div className="truncate text-sm font-medium text-muted-foreground">{t("search.guestsPlaceholder")}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4 flex justify-end">
                                <Button className="rounded-full" disabled>
                                    <Icon icon="lucide:search" className="mr-2 size-4" />
                                    {t("search.button")}
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

