"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PersonalInfoForm } from "./forms/personal-info-form"
import { ProfessionalSummaryForm } from "./forms/professional-summary-form"
import { ExperienceForm } from "./forms/experience-form"
import { EducationForm } from "./forms/education-form"
import { SkillsForm } from "./forms/skills-form"
import { LanguagesForm } from "./forms/languages-form"
import { CoursesForm } from "./forms/courses-form"
import { AdditionalInfoForm } from "./forms/additional-info-form"
import type { ResumeData } from "@/types/resume"

interface ResumeFormProps {
  data: ResumeData
  onChange: (data: ResumeData) => void
  language: "en" | "pt"
}

export function ResumeForm({ data, onChange, language }: ResumeFormProps) {
  const translations = {
    en: {
      personalInfo: "Personal Information",
      professionalSummary: "Professional Summary",
      experience: "Professional Experience",
      education: "Education",
      skills: "Technical Skills",
      languages: "Languages",
      courses: "Courses & Certifications",
      additionalInfo: "Additional Information",
    },
    pt: {
      personalInfo: "Informações Pessoais",
      professionalSummary: "Resumo Profissional",
      experience: "Experiência Profissional",
      education: "Formação Acadêmica",
      skills: "Habilidades Técnicas",
      languages: "Idiomas",
      courses: "Cursos e Certificações",
      additionalInfo: "Informações Complementares",
    },
  }

  const t = translations[language]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{t.personalInfo}</CardTitle>
        </CardHeader>
        <CardContent>
          <PersonalInfoForm
            data={data.personalInfo}
            onChange={(personalInfo) => onChange({ ...data, personalInfo })}
            language={language}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t.professionalSummary}</CardTitle>
        </CardHeader>
        <CardContent>
          <ProfessionalSummaryForm
            data={data.professionalSummary}
            onChange={(professionalSummary) => onChange({ ...data, professionalSummary })}
            language={language}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t.experience}</CardTitle>
        </CardHeader>
        <CardContent>
          <ExperienceForm
            data={data.experience}
            onChange={(experience) => onChange({ ...data, experience })}
            language={language}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t.education}</CardTitle>
        </CardHeader>
        <CardContent>
          <EducationForm
            data={data.education}
            onChange={(education) => onChange({ ...data, education })}
            language={language}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t.skills}</CardTitle>
        </CardHeader>
        <CardContent>
          <SkillsForm data={data.skills} onChange={(skills) => onChange({ ...data, skills })} language={language} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t.languages}</CardTitle>
        </CardHeader>
        <CardContent>
          <LanguagesForm
            data={data.languages}
            onChange={(languages) => onChange({ ...data, languages })}
            language={language}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t.courses}</CardTitle>
        </CardHeader>
        <CardContent>
          <CoursesForm data={data.courses} onChange={(courses) => onChange({ ...data, courses })} language={language} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t.additionalInfo}</CardTitle>
        </CardHeader>
        <CardContent>
          <AdditionalInfoForm
            data={data.additionalInfo}
            onChange={(additionalInfo) => onChange({ ...data, additionalInfo })}
            language={language}
          />
        </CardContent>
      </Card>
    </div>
  )
}
