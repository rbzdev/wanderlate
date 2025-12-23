"use client"

import { useTranslations } from "next-intl"
import { Icon } from "@iconify/react"
import Link from "next/link"
import Image from "next/image"

const footerLinks = {
  company: ["about", "careers", "blog"],
  support: ["help", "terms", "privacy"],
}

const socialLinks = [
  { icon: "basil:facebook-solid", href: "#", label: "Facebook" },
  { icon: "codicon:twitter", href: "#", label: "Twitter" },
  { icon: "formkit:instagram", href: "#", label: "Instagram" },
]

export default function Footer() {
  const t = useTranslations("Footer")

  return (
    <footer className="border-t bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2 mb-4 group">
                <Image
                    src="/assets/logos/logo.full.png"
                    alt="Wanderlate Logo"
                    width={100}
                    height={100}
                    className=" w-44 h-fit object-contain"
                />
             
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs mb-4">
              {t("tagline")}
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="size-9 rounded-full bg-black hover:bg-primary flex items-center justify-center transition-colors"
                >
                  <Icon icon={social.icon} className="size-4 text-white"  />
                </Link>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold mb-4">{t("company.title")}</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link}>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {t(`company.${link}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="font-semibold mb-4">{t("support.title")}</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link}>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {t(`support.${link}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t mb-6" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <p>{t("copyright")}</p>
          </div>

          <Link 
          href="https://api.whatsapp.com/send?text=Hello%20Olivier%20RUBUZ%20%20I%20want%20to%talk%20with%20you!"
          target="_black"
           className="flex items-center gap-1 text-sm text-muted-foreground/50">
            <span>{t("madeWith")}</span>
            <Icon icon="file-icons:brainfuck" className="size-4 text-red-500 fill-red-500 animate-pulse" />
            <span>{t("by")}</span>
          </Link>
        </div>
      </div>
    </footer>
  )
}
