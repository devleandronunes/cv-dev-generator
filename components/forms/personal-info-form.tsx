"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { PersonalInfo } from "@/types/resume"

interface PersonalInfoFormProps {
  data: PersonalInfo
  onChange: (data: PersonalInfo) => void
  language: "en" | "pt"
}

export function PersonalInfoForm({ data, onChange, language }: PersonalInfoFormProps) {
  const translations = {
    en: {
      fullName: "Full Name",
      email: "Email",
      phone: "Phone",
      linkedin: "LinkedIn",
      github: "GitHub",
      portfolio: "Portfolio",
      linktree: "Linktree",
      address: "Address",
    },
    pt: {
      fullName: "Nome Completo",
      email: "Email",
      phone: "Telefone",
      linkedin: "LinkedIn",
      github: "GitHub",
      portfolio: "Portfólio",
      linktree: "Linktree",
      address: "Endereço",
    },
  }

  const t = translations[language]

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="fullName">{t.fullName}</Label>
          <Input
            id="fullName"
            value={data.fullName}
            onChange={(e) => onChange({ ...data, fullName: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="email">{t.email}</Label>
          <Input
            id="email"
            type="email"
            value={data.email}
            onChange={(e) => onChange({ ...data, email: e.target.value })}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="phone">{t.phone}</Label>
          <Input id="phone" value={data.phone} onChange={(e) => onChange({ ...data, phone: e.target.value })} />
        </div>
        <div>
          <Label htmlFor="linkedin">{t.linkedin}</Label>
          <Input
            id="linkedin"
            value={data.linkedin}
            onChange={(e) => onChange({ ...data, linkedin: e.target.value })}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="github">{t.github}</Label>
          <Input id="github" value={data.github} onChange={(e) => onChange({ ...data, github: e.target.value })} />
        </div>
        <div>
          <Label htmlFor="portfolio">{t.portfolio}</Label>
          <Input
            id="portfolio"
            value={data.portfolio}
            onChange={(e) => onChange({ ...data, portfolio: e.target.value })}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="linktree">{t.linktree}</Label>
          <Input
            id="linktree"
            value={data.linktree}
            onChange={(e) => onChange({ ...data, linktree: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="address">{t.address}</Label>
          <Input id="address" value={data.address} onChange={(e) => onChange({ ...data, address: e.target.value })} />
        </div>
      </div>
    </div>
  )
}
