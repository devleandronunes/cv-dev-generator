"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Trash2 } from "lucide-react"
import type { Course } from "@/types/resume"

interface CoursesFormProps {
  data: Course[]
  onChange: (data: Course[]) => void
  language: "en" | "pt"
}

export function CoursesForm({ data, onChange, language }: CoursesFormProps) {
  const translations = {
    en: {
      addCourse: "Add Course/Certification",
      courseName: "Course/Certification Name",
      institution: "Institution",
      date: "Date",
      courseTitle: "Course",
    },
    pt: {
      addCourse: "Adicionar Curso/Certificação",
      courseName: "Nome do Curso/Certificação",
      institution: "Instituição",
      date: "Data",
      courseTitle: "Curso",
    },
  }

  const t = translations[language]

  const addCourse = () => {
    onChange([
      ...data,
      {
        name: "",
        institution: "",
        date: "",
      },
    ])
  }

  const removeCourse = (index: number) => {
    onChange(data.filter((_, i) => i !== index))
  }

  const updateCourse = (index: number, field: keyof Course, value: string) => {
    const updated = data.map((course, i) => (i === index ? { ...course, [field]: value } : course))
    onChange(updated)
  }

  return (
    <div className="space-y-4">
      {data.map((course, index) => (
        <div key={index} className="border rounded-lg p-4 space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="font-medium">
              {t.courseTitle} {index + 1}
            </h4>
            <Button onClick={() => removeCourse(index)} variant="outline" size="sm">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-4">
            <div>
              <Label>{t.courseName}</Label>
              <Input value={course.name} onChange={(e) => updateCourse(index, "name", e.target.value)} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>{t.institution}</Label>
                <Input
                  value={course.institution}
                  onChange={(e) => updateCourse(index, "institution", e.target.value)}
                />
              </div>
              <div>
                <Label>{t.date}</Label>
                <Input
                  value={course.date}
                  onChange={(e) => updateCourse(index, "date", e.target.value)}
                  placeholder="MM/YYYY"
                />
              </div>
            </div>
          </div>
        </div>
      ))}

      <Button onClick={addCourse} variant="outline" className="w-full">
        <Plus className="h-4 w-4 mr-2" />
        {t.addCourse}
      </Button>
    </div>
  )
}
