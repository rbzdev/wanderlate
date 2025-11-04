"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Icon } from "@iconify/react"
import { Button } from "@/components/ui/button"
import { useTranslations } from "next-intl"

/**
 * GuestsPanel — counters for each category with min/max guards.
 */
export function GuestsPanel({
  guests,
  adjustGuest,
}: {
  guests: { adults: number; children: number; babies: number; pets: number }
  adjustGuest: (key: "adults" | "children" | "babies" | "pets", delta: number) => void
}) {
  const t = useTranslations("BookUI.guestsPanel")
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2 }}
      className="rounded-2xl border bg-card p-4 shadow-sm max-w-xl margin-end"
    >
      <div className="mb-3 flex items-center gap-2 text-sm text-muted-foreground">
        <Icon icon="lucide:users" className="size-4" />
        <span>{t("title")}</span>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {([
          ["adults", t("adults"), t("adultsAge")],
          ["children", t("children"), t("childrenAge")],
          ["babies", t("babies"), t("babiesAge")],
          ["pets", t("pets"), t("petsNote")],
        ] as const).map(([key, label, note]) => (
          <div key={key} className="flex items-center justify-between rounded-xl border bg-background px-3 py-2">
            <div>
              <div className="text-sm font-medium">{label}</div>
              <div className="text-xs text-muted-foreground">{note}</div>
            </div>
            <div className="flex items-center gap-2">
              <Button size="icon" variant="outline" onClick={() => adjustGuest(key as "adults" | "children" | "babies" | "pets", -1)} aria-label={`decrease ${label}`}>
                <Icon icon="lucide:minus" className="size-4" />
              </Button>
              <span className="w-6 text-center text-sm tabular-nums">{guests[key as keyof typeof guests]}</span>
              <Button size="icon" variant="outline" onClick={() => adjustGuest(key as "adults" | "children" | "babies" | "pets", 1)} aria-label={`increase ${label}`}>
                <Icon icon="lucide:plus" className="size-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}
