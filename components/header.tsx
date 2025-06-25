"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Globe, Share2, Check, MessageCircle, Linkedin, Facebook, Twitter, Instagram, Link } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useState } from "react"

interface HeaderProps {
  language: "en" | "pt"
  onLanguageChange: (lang: "en" | "pt") => void
}

export function Header({ language, onLanguageChange }: HeaderProps) {
  const [copied, setCopied] = useState(false)

  const translations = {
    en: {
      title: "Professional Resume Generator for Developers",
      english: "English",
      portuguese: "Portuguese",
      shareGenerator: "Share cv.dev",
      linkCopied: "Link copied!",
      copyLink: "Copy Link",
    },
    pt: {
      title: "Gerador de Currículo Profissional para Desenvolvedores",
      english: "Inglês",
      portuguese: "Português",
      shareGenerator: "Compartilhar cv.dev",
      linkCopied: "Link copiado!",
      copyLink: "Copiar Link",
    },
  }

  const t = translations[language]

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.origin)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy link:", err)
    }
  }

  const shareGenerator = (platform: string) => {
    const text =
      language === "en"
        ? "Check out cv.dev - Professional Resume Generator for Developers!"
        : "Confira o cv.dev - Gerador de Currículo Profissional para Desenvolvedores!"
    const url = window.location.origin
    const encodedText = encodeURIComponent(text)
    const encodedUrl = encodeURIComponent(url)

    let shareUrl = ""

    switch (platform) {
      case "whatsapp":
        shareUrl = `https://wa.me/?text=${encodedText}%20${encodedUrl}`
        break
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`
        break
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`
        break
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`
        break
      case "instagram":
        // Instagram doesn't support direct URL sharing, so we copy the link
        copyLink()
        return
      default:
        return
    }

    window.open(shareUrl, "_blank", "width=600,height=400")
  }

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Image src="/logo.webp" alt="cv.dev" width={120} height={40} className="h-10 w-auto" />
            <div className="hidden md:block">
              <p className="text-sm text-gray-600">{t.title}</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4 mr-2" />
                  {t.shareGenerator}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={copyLink} className="flex items-center">
                  {copied ? (
                    <>
                      <Check className="h-4 w-4 mr-2 text-green-600" />
                      {t.linkCopied}
                    </>
                  ) : (
                    <>
                      <Link className="h-4 w-4 mr-2 text-gray-600" />
                      {t.copyLink}
                    </>
                  )}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => shareGenerator("whatsapp")} className="flex items-center">
                  <MessageCircle className="h-4 w-4 mr-2 text-green-600" />
                  WhatsApp
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => shareGenerator("linkedin")} className="flex items-center">
                  <Linkedin className="h-4 w-4 mr-2 text-blue-600" />
                  LinkedIn
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => shareGenerator("facebook")} className="flex items-center">
                  <Facebook className="h-4 w-4 mr-2 text-blue-500" />
                  Facebook
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => shareGenerator("twitter")} className="flex items-center">
                  <Twitter className="h-4 w-4 mr-2 text-blue-400" />
                  Twitter
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => shareGenerator("instagram")} className="flex items-center">
                  <Instagram className="h-4 w-4 mr-2 text-pink-500" />
                  Instagram
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Globe className="h-4 w-4 mr-2" />
                  {language === "en" ? "EN" : "PT"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => onLanguageChange("en")}>🇺🇸 {t.english}</DropdownMenuItem>
                <DropdownMenuItem onClick={() => onLanguageChange("pt")}>🇧🇷 {t.portuguese}</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  )
}
