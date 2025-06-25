"use client"

import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

interface ProfessionalSummaryFormProps {
  data: string
  onChange: (data: string) => void
  language: "en" | "pt"
}

export function ProfessionalSummaryForm({ data, onChange, language }: ProfessionalSummaryFormProps) {
  const translations = {
    en: {
      summary: "Professional Summary",
      placeholder: "Write a brief summary of your professional background and goals...",
    },
    pt: {
      summary: "Resumo Profissional",
      placeholder: "Escreva um breve resumo do seu histórico profissional e objetivos...",
    },
  }

  const t = translations[language]

  return (
    <div>
      <Label htmlFor="summary">{t.summary}</Label>
      <Textarea
        id="summary"
        value={data}
        onChange={(e) => onChange(e.target.value)}
        placeholder={t.placeholder}
        rows={4}
      />
    </div>
  )
}
