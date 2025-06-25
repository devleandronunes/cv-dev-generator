"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Trash2 } from "lucide-react"
import type { Experience } from "@/types/resume"

interface ExperienceFormProps {
  data: Experience[]
  onChange: (data: Experience[]) => void
  language: "en" | "pt"
}

export function ExperienceForm({ data, onChange, language }: ExperienceFormProps) {
  const translations = {
    en: {
      addExperience: "Add Experience",
      position: "Position",
      company: "Company",
      startDate: "Start Date",
      endDate: "End Date (leave empty if current)",
      description: "Description",
      experienceTitle: "Experience",
    },
    pt: {
      addExperience: "Adicionar Experiência",
      position: "Cargo",
      company: "Empresa",
      startDate: "Data de Início",
      endDate: "Data de Fim (deixe vazio se atual)",
      description: "Descrição",
      experienceTitle: "Experiência",
    },
  }

  const t = translations[language]

  const addExperience = () => {
    onChange([
      ...data,
      {
        position: "",
        company: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ])
  }

  const removeExperience = (index: number) => {
    onChange(data.filter((_, i) => i !== index))
  }

  const updateExperience = (index: number, field: keyof Experience, value: string) => {
    const updated = data.map((exp, i) => (i === index ? { ...exp, [field]: value } : exp))
    onChange(updated)
  }

  return (
    <div className="space-y-4">
      {data.map((experience, index) => (
        <div key={index} className="border rounded-lg p-4 space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="font-medium">
              {t.experienceTitle} {index + 1}
            </h4>
            <Button onClick={() => removeExperience(index)} variant="outline" size="sm">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>{t.position}</Label>
              <Input
                value={experience.position}
                onChange={(e) => updateExperience(index, "position", e.target.value)}
              />
            </div>
            <div>
              <Label>{t.company}</Label>
              <Input value={experience.company} onChange={(e) => updateExperience(index, "company", e.target.value)} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>{t.startDate}</Label>
              <Input
                value={experience.startDate}
                onChange={(e) => updateExperience(index, "startDate", e.target.value)}
                placeholder="MM/YYYY"
              />
            </div>
            <div>
              <Label>{t.endDate}</Label>
              <Input
                value={experience.endDate}
                onChange={(e) => updateExperience(index, "endDate", e.target.value)}
                placeholder="MM/YYYY"
              />
            </div>
          </div>

          <div>
            <Label>{t.description}</Label>
            <Textarea
              value={experience.description}
              onChange={(e) => updateExperience(index, "description", e.target.value)}
              rows={3}
            />
          </div>
        </div>
      ))}

      <Button onClick={addExperience} variant="outline" className="w-full">
        <Plus className="h-4 w-4 mr-2" />
        {t.addExperience}
      </Button>
    </div>
  )
}
