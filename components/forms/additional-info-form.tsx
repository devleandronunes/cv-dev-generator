"use client"

import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

interface AdditionalInfoFormProps {
  data: string
  onChange: (data: string) => void
  language: "en" | "pt"
}

export function AdditionalInfoForm({ data, onChange, language }: AdditionalInfoFormProps) {
  const translations = {
    en: {
      additionalInfo: "Additional Information",
      placeholder: "Add any additional information, achievements, or relevant details...",
    },
    pt: {
      additionalInfo: "Informações Complementares",
      placeholder: "Adicione informações complementares, conquistas ou detalhes relevantes...",
    },
  }

  const t = translations[language]

  return (
    <div>
      <Label htmlFor="additionalInfo">{t.additionalInfo}</Label>
      <Textarea
        id="additionalInfo"
        value={data}
        onChange={(e) => onChange(e.target.value)}
        placeholder={t.placeholder}
        rows={4}
      />
    </div>
  )
}
