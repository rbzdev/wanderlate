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
  { icon: "lucide:facebook", href: "#", label: "Facebook" },
  { icon: "lucide:twitter", href: "#", label: "Twitter" },
  { icon: "lucide:instagram", href: "#", label: "Instagram" },
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
              {/* <div className="size-8 rounded-lg bg-primary flex items-center justify-center group-hover:scale-110 transition-transform"> */}
                {/* <Icon icon="uim:layers-alt" className="size-5 text-white" /> */}
                <Image
                    src="/logo.ico"
                    alt="Wanderlate Logo"
                    width={32}
                    height={32}
                    className="rounded-sm"
                />
              {/* </div> */}
              <span className="text-xl font-bold bg-clip-text text-transparent bg-linear-to-r from-primary to-rose-500">
                Wanderlate
              </span>
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
                  className="size-9 rounded-full bg-muted hover:bg-primary hover:text-white flex items-center justify-center transition-colors"
                >
                  <Icon icon={social.icon} className="size-4" />
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

          <div className="flex items-center gap-1 text-sm text-muted-foreground/50">
            <span>{t("madeWith")}</span>
            <Icon icon="file-icons:brainfuck" className="size-4 text-red-500 fill-red-500 animate-pulse" />
            <span>{t("by")}</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
