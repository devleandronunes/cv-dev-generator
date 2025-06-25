"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Trash2 } from "lucide-react"
import type { Language } from "@/types/resume"

interface LanguagesFormProps {
  data: Language[]
  onChange: (data: Language[]) => void
  language: "en" | "pt"
}

export function LanguagesForm({ data, onChange, language }: LanguagesFormProps) {
  const translations = {
    en: {
      addLanguage: "Add Language",
      languageName: "Language",
      proficiency: "Proficiency",
      beginner: "Beginner",
      intermediate: "Intermediate",
      advanced: "Advanced",
      fluent: "Fluent",
      native: "Native",
      languageTitle: "Language",
    },
    pt: {
      addLanguage: "Adicionar Idioma",
      languageName: "Idioma",
      proficiency: "Proficiência",
      beginner: "Iniciante",
      intermediate: "Intermediário",
      advanced: "Avançado",
      fluent: "Fluente",
      native: "Nativo",
      languageTitle: "Idioma",
    },
  }

  const t = translations[language]

  const proficiencyLevels = [
    { value: "beginner", label: t.beginner },
    { value: "intermediate", label: t.intermediate },
    { value: "advanced", label: t.advanced },
    { value: "fluent", label: t.fluent },
    { value: "native", label: t.native },
  ]

  const addLanguage = () => {
    onChange([
      ...data,
      {
        language: "",
        proficiency: "intermediate",
      },
    ])
  }

  const removeLanguage = (index: number) => {
    onChange(data.filter((_, i) => i !== index))
  }

  const updateLanguage = (index: number, field: keyof Language, value: string) => {
    const updated = data.map((lang, i) => (i === index ? { ...lang, [field]: value } : lang))
    onChange(updated)
  }

  return (
    <div className="space-y-4">
      {data.map((lang, index) => (
        <div key={index} className="border rounded-lg p-4 space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="font-medium">
              {t.languageTitle} {index + 1}
            </h4>
            <Button onClick={() => removeLanguage(index)} variant="outline" size="sm">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>{t.languageName}</Label>
              <Input value={lang.language} onChange={(e) => updateLanguage(index, "language", e.target.value)} />
            </div>
            <div>
              <Label>{t.proficiency}</Label>
              <Select value={lang.proficiency} onValueChange={(value) => updateLanguage(index, "proficiency", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {proficiencyLevels.map((level) => (
                    <SelectItem key={level.value} value={level.value}>
                      {level.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      ))}

      <Button onClick={addLanguage} variant="outline" className="w-full">
        <Plus className="h-4 w-4 mr-2" />
        {t.addLanguage}
      </Button>
    </div>
  )
}
