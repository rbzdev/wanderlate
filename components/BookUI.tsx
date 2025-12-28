"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { useLocale, useTranslations } from "next-intl"

// UI components
import { Tab } from "@/components/ui/bookTab"
import { type DateRange } from "react-day-picker"
import { Button } from "@/components/ui/button"
import { AnimatePresence } from "framer-motion"
import { DestinationPanel } from "@/components/booking/DestinationPanel"
import { DatesPanel } from "@/components/booking/DatesPanel"
import { GuestsPanel } from "@/components/booking/GuestsPanel"
import { Icon } from "@iconify/react"
import { Spinner } from "@/components/spinner"

// Icons are now handled in individual components

// Booking tabs: Destination, Dates (range), Guests
const TABS = ["destination", "dates", "guests"] as const
type BookingTab = typeof TABS[number]

type Guests = { adults: number; children: number; babies: number; pets: number }
type SearchCriteria = {
    destination: string
    dateRange?: DateRange
    guests: Guests
}

export type BookUIProps = {
    // Controlled visible panel (optional). If omitted, component manages it internally.
    activePanel?: BookingTab
    onActivePanelChange?: (panel: BookingTab) => void
    // Initial values (uncontrolled). For full control, you can fork and pass down handlers via subcomponents later.
    defaultDestination?: string
    defaultDateRange?: DateRange
    defaultGuests?: Guests
    // Called when user hits the Search CTA with the current criteria.
    onSubmit?: (criteria: SearchCriteria) => void
}

export function BookUI({
    activePanel,
    onActivePanelChange,
    defaultDestination = "",
    defaultDateRange,
    defaultGuests,
    onSubmit,
}: BookUIProps = {}) {
    const router = useRouter()
    const locale = useLocale()
    const t = useTranslations("BookUI")
    const [isSearching, setIsSearching] = React.useState(false)
    
    // Internal visible panel state (falls back when not controlled)
    const [internalSelected, setInternalSelected] = React.useState<BookingTab | null>(null)
    const selected = activePanel ?? internalSelected
    const setSelected = React.useCallback((panel: BookingTab | null) =>
        onActivePanelChange ? onActivePanelChange(panel as BookingTab) : setInternalSelected(panel),
        [onActivePanelChange]
    )

    // Uncontrolled values (can be lifted and controlled with a custom wrapper if needed)
    const [dateRange, setDateRange] = React.useState<DateRange | undefined>(
        defaultDateRange
    )

    const [destination, setDestination] = React.useState(defaultDestination)
    const [destFocus, setDestFocus] = React.useState(false)
    const [guests, setGuests] = React.useState<Guests>(
        defaultGuests ?? { adults: 2, children: 0, babies: 0, pets: 0 }
    )

    function adjustGuest(key: keyof typeof guests, delta: number) {
        setGuests((g) => {
            const limits: Record<keyof typeof g, { min: number; max: number }> = {
                adults: { min: 1, max: 16 },
                children: { min: 0, max: 16 },
                babies: { min: 0, max: 10 },
                pets: { min: 0, max: 5 },
            }
            const next = Math.min(limits[key].max, Math.max(limits[key].min, g[key] + delta))
            return { ...g, [key]: next }
        })
    }

    const guestsSummary = React.useMemo(() => {
        const parts = [
            `${guests.adults} ${guests.adults > 1 ? t("guests.adults_plural") : t("guests.adults")}`,
            guests.children ? `${guests.children} ${guests.children > 1 ? t("guests.children_plural") : t("guests.children")}` : null,
            guests.babies ? `${guests.babies} ${guests.babies > 1 ? t("guests.babies_plural") : t("guests.babies")}` : null,
            guests.pets ? `${guests.pets} ${guests.pets > 1 ? t("guests.pets_plural") : t("guests.pets")}` : null,
        ].filter(Boolean)
        return parts.join(" · ") || t("addGuests")
    }, [guests, t])

    // Static, localized-ish suggestions (can be replaced by API results later)
    const suggestions = React.useMemo(
        () => [
            { id: 1, title: t("destinations.capeTown"), subtitle: t("destinations.capeTownSubtitle"), icon: "lucide:building-2" },
            { id: 2, title: t("destinations.paris"), subtitle: t("destinations.parisSubtitle"), icon: "lucide:landmark" },
            { id: 3, title: t("destinations.sandton"), subtitle: t("destinations.sandtonSubtitle"), icon: "lucide:building-2" },
            { id: 4, title: t("destinations.daressalaam"), subtitle: t("destinations.daressalaamSubtitle"), icon: "lucide:trees" },
            { id: 5, title: t("destinations.johannesburg"), subtitle: t("destinations.johannesburgSubtitle"), icon: "lucide:building-2" },
            { id: 6, title: t("destinations.cairo"), subtitle: t("destinations.cairoSubtitle"), icon: "lucide:ship-wheel" },
        ],
        [t]
    )

    // Filtered suggestions based on user input
    const filtered = React.useMemo(() => {
        const q = destination.trim().toLowerCase()
        if (!q) return suggestions
        return suggestions.filter((s) => s.title.toLowerCase().includes(q))
    }, [destination, suggestions])

    // Close panel when clicking outside
    const containerRef = React.useRef<HTMLDivElement>(null)
    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setSelected(null)
            }
        }

        if (selected !== null) {
            document.addEventListener('mousedown', handleClickOutside)
            return () => document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [selected, setSelected])

    return (
        <div ref={containerRef} className="mx-auto w-full max-w-5xl space-y-4 p-4 sticky top-0 z-20">
            {/* Footer summary (optional - can be removed if not needed) */}
            <div className="mx-auto max-w-5xl text-center text-sm text-muted-foreground bg-white rounded-full px-2 border w-fit">
                {destination ? destination : null} ● {dateRange?.from ? dateRange.from.toLocaleDateString(locale === "fr" ? "fr-FR" : "en-US", { month: "short", day: "numeric" }) : t("addDates")}
                {dateRange?.to ? ` → ${dateRange.to.toLocaleDateString(locale === "fr" ? "fr-FR" : "en-US", { month: "short", day: "numeric" })}` : ""} ● {guestsSummary}
            </div>

            {/* Tabs + Search button horizontally aligned */}
            <div className="mx-auto flex w-fit items-center gap-1 md:gap-3 bg-white rounded-full py-0.5 px-1">
                <div className="flex rounded-full border bg-background p-1 shadow-xs">
                    {TABS.map((tab) => (
                        <Tab
                            key={tab}
                            text={t(`tabs.${tab}`)}
                            selected={selected === tab}
                            setSelected={(val) => {
                                const lower = val.toLowerCase()
                                let newTab: BookingTab
                                if (lower.startsWith("dest")) newTab = "destination"
                                else if (lower.startsWith("date") || lower.includes("quand")) newTab = "dates"
                                else newTab = "guests"
                                
                                // Toggle: close if already selected, open if different
                                setSelected(selected === newTab ? null : newTab)
                            }}
                        />
                    ))}
                </div>
                <Button
                    className="rounded-full h-14 w-14 md:w-fit p-4 md:px-6!"
                    onClick={async () => {
                        setIsSearching(true)
                        
                        // Custom handler if provided
                        if (onSubmit) {
                            onSubmit({ destination, dateRange, guests })
                        }
                        
                        // Simulate search with 1 second delay
                        await new Promise(resolve => setTimeout(resolve, 1000))
                        
                        // Build query params
                        const params = new URLSearchParams()
                        if (destination) params.set('destination', destination)
                        if (dateRange?.from) params.set('checkIn', dateRange.from.toISOString())
                        if (dateRange?.to) params.set('checkOut', dateRange.to.toISOString())
                        params.set('adults', guests.adults.toString())
                        if (guests.children > 0) params.set('children', guests.children.toString())
                        if (guests.babies > 0) params.set('babies', guests.babies.toString())
                        if (guests.pets > 0) params.set('pets', guests.pets.toString())
                        
                        // Navigate to results page
                        router.push(`/results?${params.toString()}`)
                    }}
                    disabled={isSearching}
                >
                    {isSearching ? (
                        <>
                            <Spinner size={20} className="md:mr-2" />
                            <span className="hidden md:block">{t("searching")}</span>
                        </>
                    ) : (
                        <>
                            <span className="hidden md:block">{t("search")}</span>
                            <Icon icon="mynaui:search" width="24" height="24" />
                        </>
                    )}
                </Button>
            </div>

            {/* Active panel: positioned absolutely below tabs */}
            <div className="relative mx-auto w-full max-w-5xl z-30">
                <AnimatePresence mode="wait">
                    {selected === "destination" && (
                        <div key="destination" className="absolute inset-x-0 top-0 w-full">
                            <DestinationPanel
                                destination={destination}
                                onChangeDestination={setDestination}
                                destFocus={destFocus}
                                setDestFocus={setDestFocus}
                                filtered={filtered}
                            />
                        </div>
                    )}

                    {selected === "dates" && (
                        <div key="dates" className="absolute inset-x-0 top-0 w-full">
                            <DatesPanel
                                dateRange={dateRange}
                                onChangeDateRange={setDateRange}
                            />
                        </div>
                    )}

                    {selected === "guests" && (
                        <div key="guests" className="absolute right-0 top-0 w-auto">
                            <GuestsPanel
                                guests={guests}
                                adjustGuest={adjustGuest}
                            />
                        </div>
                    )}
                </AnimatePresence>
            </div>

            
        </div>
    )
}