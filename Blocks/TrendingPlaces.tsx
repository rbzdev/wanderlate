"use client"

import { useTranslations } from "next-intl"
import { motion } from "framer-motion"
import { Icon } from "@iconify/react"
import Image from "next/image"

const trendingPlaces = [
  {
    id: "bali",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&h=600&fit=crop",
    gradient: "from-orange-500/80 to-pink-500/80",
  },
  {
    id: "tokyo",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop",
    gradient: "from-purple-500/80 to-blue-500/80",
  },
  {
    id: "santorini",
    image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800&h=600&fit=crop",
    gradient: "from-blue-500/80 to-cyan-500/80",
  },
  {
    id: "dubai",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=600&fit=crop",
    gradient: "from-amber-500/80 to-orange-500/80",
  },
  {
    id: "maldives",
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&h=600&fit=crop",
    gradient: "from-teal-500/80 to-blue-500/80",
  },
  {
    id: "paris",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&h=600&fit=crop",
    gradient: "from-pink-500/80 to-rose-500/80",
  },
]

export default function TrendingPlaces() {
  const t = useTranslations("TrendingPlaces")

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-start mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-3 bg-clip-text text-transparent bg-linear-to-r from-primary via-gray-500 to-neutral-500">
            {t("title")}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {trendingPlaces.map((place, index) => (
            <motion.div
              key={place.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-2xl cursor-pointer h-80 shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              {/* Image */}
              <Image
                src={place.image}
                alt={t(`places.${place.id}.name`)}
                fill
                className="object-cover group-hover:scale-125 transition-transform duration-500"
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
                    <Icon icon="lucide:home" className="size-4" />
                    <span className="drop-shadow-md">
                      {t(`places.${place.id}.properties`)}
                    </span>
                  </div>
                </motion.div>

                {/* Hover Arrow */}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  whileHover={{ opacity: 1, x: 0 }}
                  className="absolute top-6 right-6 bg-white/20 backdrop-blur-sm p-2 rounded-full group-hover:bg-white/30 transition-colors"
                >
                  <Icon icon="lucide:arrow-right" className="size-5" />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
