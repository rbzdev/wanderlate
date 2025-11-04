"use client"

import { useTranslations } from "next-intl"
import { motion } from "framer-motion"
import { Icon } from "@iconify/react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

const features = [
  {
    id: "commission",
    icon: "lucide:badge-percent",
  },
  {
    id: "support",
    icon: "solar:headphones-round-line-duotone",
  },
  {
    id: "visibility",
    icon: "fa:globe",
  },
  {
    id: "payment",
    icon: "lucide:shield-check",
  },
]

export default function BecomePartner() {
  const t = useTranslations("BecomePartner")

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-linear-to-br from-primary/5 via-purple-500/5 to-pink-500/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
              {t("subtitle")}
            </div>
            
            <h2 className="text-2xl sm:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-linear-to-r from-primary via-black to-gray-600">
              {t("title")}
            </h2>
            
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              {t("description")}
            </p>

            {/* Features Grid */}
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex gap-3 p-2 rounded-xl bg-background border hover:shadow-md transition-shadow"
                >
                  <div className="shrink-0 size-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon icon={feature.icon} className="size-7 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">
                      {t(`features.${feature.id}.title`)}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {t(`features.${feature.id}.description`)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap gap-6 mb-8"
            >
              <div>
                <div className="text-3xl font-bold text-primary mb-1">
                  {t("stats.partners")}
                </div>
                <div className="text-sm text-muted-foreground">
                  {t("stats.partnersLabel")}
                </div>
              </div>

              <div>
                <div className="text-3xl font-bold text-gray-700 mb-1">
                  {t("stats.countries")}
                </div>
                <div className="text-sm text-muted-foreground">
                  {t("stats.countriesLabel")}
                </div>
              </div>

              <div>
                <div className="text-3xl font-bold mb-1">
                  {t("stats.revenue")}
                </div>
                <div className="text-sm text-muted-foreground">
                  {t("stats.revenueLabel")}
                </div>
              </div>
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Button size="lg" className="group">
                {t("cta")}
                <Icon 
                  icon="lucide:arrow-right" 
                  className="ml-2 size-5 group-hover:translate-x-1 transition-transform" 
                />
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl group">
              <Image
                src="https://images.unsplash.com/photo-1717356280846-eaef82389e30?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=735"
                alt="Become a partner"
                fill
                className="object-cover "
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />
              
              {/* Floating Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-xl group-hover:scale-105 transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="size-12 rounded-full bg-green-500 flex items-center justify-center">
                    <Icon icon="lucide:trending-up" className="size-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-muted-foreground mb-1">
                      Revenus moyens
                    </div>
                    <div className="text-2xl font-bold text-green-600">
                      +3 200€ / mois
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 size-24 rounded-full bg-primary/10 blur-2xl -z-10" />
            <div className="absolute -bottom-4 -left-4 size-32 rounded-full bg-pink-500/10 blur-2xl -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
