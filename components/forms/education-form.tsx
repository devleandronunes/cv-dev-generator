"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Trash2 } from "lucide-react"
import type { Education } from "@/types/resume"

interface EducationFormProps {
  data: Education[]
  onChange: (data: Education[]) => void
  language: "en" | "pt"
}

export function EducationForm({ data, onChange, language }: EducationFormProps) {
  const translations = {
    en: {
      addEducation: "Add Education",
      degree: "Degree",
      institution: "Institution",
      startDate: "Start Date",
      endDate: "End Date (leave empty if current)",
      educationTitle: "Education",
    },
    pt: {
      addEducation: "Adicionar Formação",
      degree: "Curso",
      institution: "Instituição",
      startDate: "Data de Início",
      endDate: "Data de Fim (deixe vazio se atual)",
      educationTitle: "Formação",
    },
  }

  const t = translations[language]

  const addEducation = () => {
    onChange([
      ...data,
      {
        degree: "",
        institution: "",
        startDate: "",
        endDate: "",
      },
    ])
  }

  const removeEducation = (index: number) => {
    onChange(data.filter((_, i) => i !== index))
  }

  const updateEducation = (index: number, field: keyof Education, value: string) => {
    const updated = data.map((edu, i) => (i === index ? { ...edu, [field]: value } : edu))
    onChange(updated)
  }

  return (
    <div className="space-y-4">
      {data.map((education, index) => (
        <div key={index} className="border rounded-lg p-4 space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="font-medium">
              {t.educationTitle} {index + 1}
            </h4>
            <Button onClick={() => removeEducation(index)} variant="outline" size="sm">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>{t.degree}</Label>
              <Input value={education.degree} onChange={(e) => updateEducation(index, "degree", e.target.value)} />
            </div>
            <div>
              <Label>{t.institution}</Label>
              <Input
                value={education.institution}
                onChange={(e) => updateEducation(index, "institution", e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>{t.startDate}</Label>
              <Input
                value={education.startDate}
                onChange={(e) => updateEducation(index, "startDate", e.target.value)}
                placeholder="MM/YYYY"
              />
            </div>
            <div>
              <Label>{t.endDate}</Label>
              <Input
                value={education.endDate}
                onChange={(e) => updateEducation(index, "endDate", e.target.value)}
                placeholder="MM/YYYY"
              />
            </div>
          </div>
        </div>
      ))}

      <Button onClick={addEducation} variant="outline" className="w-full">
        <Plus className="h-4 w-4 mr-2" />
        {t.addEducation}
      </Button>
    </div>
  )
}
