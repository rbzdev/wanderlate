"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Icon } from "@iconify/react"
import { Calendar } from "@/components/ui/calendar"
import { type DateRange } from "react-day-picker"
import { useTranslations } from "next-intl"

/**
 * DatesPanel — unified range calendar (from/to) with two months.
 */
export function DatesPanel({
  dateRange,
  onChangeDateRange,
}: {
  dateRange: DateRange | undefined
  onChangeDateRange: (r: DateRange | undefined) => void
}) {
  const t = useTranslations("BookUI.datesPanel")
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2 }}
      className="rounded-2xl border bg-card p-4 shadow-sm max-w-fit mx-auto"
    >
      <div className="mb-3 flex items-center gap-2 text-sm text-muted-foreground">
        <Icon icon="lucide:calendar" className="size-4" />
        <span>{t("title")}</span>
      </div>
      <Calendar
        mode="range"
        defaultMonth={dateRange?.from}
        selected={dateRange}
        onSelect={onChangeDateRange}
        numberOfMonths={2}
        className="rounded-lg border bg-background p-2 shadow-sm"
      />
    </motion.div>
  )
}
