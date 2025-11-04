"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Icon } from "@iconify/react"

/**
 * DestinationPanel — search field + suggestions dropdown, Airbnb-like.
 * - Shows suggestions when focused or when the user types.
 * - Emits selected destination back to parent via onChangeDestination.
 */
export function DestinationPanel({
  destination,
  onChangeDestination,
  destFocus,
  setDestFocus,
  filtered,
}: {
  destination: string
  onChangeDestination: (v: string) => void
  destFocus: boolean
  setDestFocus: (v: boolean) => void
  filtered: Array<{ id: number; title: string; subtitle: string; icon: string }>
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2 }}
      className="rounded-full border bg-card shadow-sm overflow-hidden max-w-xl "
    >
      {/* Search bar integrated in panel header */}
      <div className="flex items-center gap-2 border-b bg-background px-4 py-3">
        <Icon icon="lucide:map-pin" className="size-5 text-primary" />
        <input
          type="text"
          value={destination}
          onChange={(e) => onChangeDestination(e.target.value)}
          onFocus={() => setDestFocus(true)}
          onBlur={() => setTimeout(() => setDestFocus(false), 120)}
          placeholder="Rechercher une destination"
          aria-label="Rechercher une destination"
          className="w-full py-2 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        />
      </div>

      {/* Suggestions list (always visible when panel is active) */}
      <AnimatePresence>
        {(destFocus || destination.trim().length > 0) && (
          <motion.div
            key="suggestions"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="max-h-96 overflow-auto p-3">
              <div className="px-2 pb-2 text-sm font-medium text-muted-foreground">
                Suggestions de destinations
              </div>
              <ul className="space-y-1">
                {filtered.map((s) => (
                  <li key={s.id}>
                    <button
                      type="button"
                      className="flex w-full items-center gap-3 rounded-xl px-2 py-2 text-left hover:bg-accent/60 transition-colors"
                      onClick={() => {
                        onChangeDestination(s.title)
                        setDestFocus(false)
                      }}
                      role="option"
                      aria-selected={false}
                    >
                      <span className="grid size-12 place-items-center rounded-2xl border bg-card">
                        <Icon icon={s.icon} className="size-6 text-primary" />
                      </span>
                      <span className="min-w-0">
                        <div className="truncate text-sm font-semibold">{s.title}</div>
                        <div className="truncate text-xs text-muted-foreground">{s.subtitle}</div>
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
