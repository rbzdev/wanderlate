"use client"

import { useTranslations } from "next-intl"
import { motion } from "framer-motion"
import { Icon } from "@iconify/react"
import Image from "next/image"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

interface LocationData {
  country: string
  region: string
  city: string
  lat: number
  lon: number
}

interface NearbyPlace {
  id: string
  image: string
  fallback: boolean
}

const nearbyPlaces: NearbyPlace[] = [
  {
    id: "paris",
    image: "https://images.unsplash.com/photo-1571955516612-b67f7a6523cb?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=670",
    fallback: false
  },
  {
    id: "lyon",
    image: "https://images.unsplash.com/photo-1602087594298-706ccc894bfd?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1332",
    fallback: false
  },
  {
    id: "marseille",
    image: "https://images.unsplash.com/photo-1632047306320-31b6726ec624?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1074",
    fallback: false
  },
  {
    id: "nice",
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop",
    fallback: false
  },
  {
    id: "barcelona",
    image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800&h=600&fit=crop",
    fallback: false
  },
  {
    id: "rome",
    image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&h=600&fit=crop",
    fallback: false
  }
]

export default function NearbyPlaces() {
  const t = useTranslations("NearbyPlaces")
  const [location, setLocation] = useState<LocationData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        // Using ipapi.co as alternative (free, no API key required)
        const response = await fetch('https://ipapi.co/json/')
        const data = await response.json()

        if (data.error) {
          throw new Error(data.reason || 'Location fetch failed')
        }

        // Map ipapi.co response to our interface
        const locationData: LocationData = {
          country: data.country_name,
          region: data.region,
          city: data.city,
          lat: data.latitude,
          lon: data.longitude
        }

        setLocation(locationData)
      } catch (err) {
        console.warn('Failed to fetch location:', err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchLocation()
  }, [])

  const handleRetry = () => {
    setLoading(true)
    setError(false)
    setLocation(null)
    // Re-trigger the effect
    window.location.reload()
  }

  if (loading) {
    return (
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-3 mb-4">
              <Icon icon="svg-spinners:ring-resize" className="size-6 text-primary" />
              <span className="text-lg">{t("loading")}</span>
            </div>
          </motion.div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <Icon icon="fluent:location-48-filled" className="size-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">{t("error")}</h3>
            <Button onClick={handleRetry} variant="outline">
              <Icon icon="lucide:rotate-ccw" className="size-4 mr-2" />
              {t("retry")}
            </Button>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto ">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-start justify-between"
        >

            {/* Title */}
          <div className="flex flex-col">
            <h2 className="text-xl sm:text-4xl font-bold mb-3">
            {t("title")}
          </h2>
          <p className="text-muted-foreground text-lg max-w-5xl mb-4">
            {t("subtitle")}
          </p>
          </div>


            {/* Location */}
          {location && (
            <div className="inline-flex items-center gap-1 px-4 py-2 bg-primary/10 rounded-full text-xs sm:text-sm">
              <Icon icon="fluent:location-48-filled" className="size-4 text-primary" />
              <span className="line-clamp-1">{location.city}, {location.country}</span>
            </div>
          )}
        </motion.div>

        {/* Horizontal Scroll */}
        <div className="overflow-x-auto scrollbar-none py-6">
          <div className="flex gap-6 min-w-max ">
            {nearbyPlaces.map((place, index) => (
              <motion.div
                key={place.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-2xl cursor-pointer w-64 h-80 md:w-[450px] md:h-[400px] shadow-lg hover:shadow-sm transition-shadow duration-300"
              >
                {/* Image */}
                <Image
                  src={place.image}
                  alt={t(`places.${place.id}.name`)}
                  height={300}
                  width={300}
                  className="object-cover w-full h-full group-hover:scale-125 transition-transform duration-500"
                />

                {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-90 group-hover:opacity-95 transition-opacity duration-300" />

                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                  <motion.div
                    initial={{ y: 10, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
                  >
                    <h3 className="text-2xl font-bold mb-2 drop-shadow-lg">
                      {t(`places.${place.id}.name`)}
                    </h3>
                    <p className="text-sm mb-3 drop-shadow-md opacity-90">
                      {t(`places.${place.id}.description`)}
                    </p>
                    <div className="flex items-center gap-2 text-sm">
                      <Icon icon="fluent:location-48-filled" className="size-4" />
                      <span className="drop-shadow-md">
                        {t(`places.${place.id}.distance`)}
                      </span>
                    </div>
                  </motion.div>

                  {/* Hover Arrow */}
                  <div
                    // initial={{ opacity: 1, x: -1 }}
                    // whileHover={{ opacity: 1, x: 0 }}
                    className="absolute z-40 top-6 right-6 bg-white/20 backdrop-blur-sm p-2 rounded-full group-hover:bg-white/30 group-hover:scale-110 group-hover:-rotate-45 transition-all"
                  >
                    <Icon icon="guidance:left-arrow" className="size-5" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}