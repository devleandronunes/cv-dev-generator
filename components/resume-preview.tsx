"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import type { ResumeData } from "@/types/resume"
import { generatePDF } from "@/lib/pdf-generator"

interface ResumePreviewProps {
  data: ResumeData
  language: "en" | "pt"
}

export function ResumePreview({ data, language }: ResumePreviewProps) {
  const translations = {
    en: {
      preview: "Resume Preview",
      download: "Download PDF",
      professionalSummary: "Professional Summary",
      experience: "Professional Experience",
      education: "Education",
      skills: "Technical Skills",
      languages: "Languages",
      courses: "Courses & Certifications",
      additionalInfo: "Additional Information",
      present: "Present",
      email: "Email",
      phone: "Phone",
      address: "Address",
      yourName: "Your Name",
    },
    pt: {
      preview: "Visualização do Currículo",
      download: "Baixar PDF",
      professionalSummary: "Resumo Profissional",
      experience: "Experiência Profissional",
      education: "Formação Acadêmica",
      skills: "Habilidades Técnicas",
      languages: "Idiomas",
      courses: "Cursos e Certificações",
      additionalInfo: "Informações Complementares",
      present: "Atual",
      email: "E-mail",
      phone: "Telefone",
      address: "Endereço",
      yourName: "Seu Nome",
    },
  }

  const t = translations[language]

  const handleDownloadPDF = async () => {
    const element = document.getElementById("resume-preview")
    if (element) {
      await generatePDF(element, `${data.personalInfo.fullName || "resume"}-cv.pdf`)
    }
  }

  const renderClickableLink = (url: string, label: string) => {
    if (!url) return null
    const fullUrl = url.startsWith("http") ? url : `https://${url}`
    return (
      <div>
        <span className="text-gray-600">{label}: </span>
        <a
          href={fullUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 underline break-all"
        >
          {url}
        </a>
      </div>
    )
  }

  return (
    <Card className="h-fit">
      <CardHeader className="no-print">
        <div className="flex items-center justify-between">
          <CardTitle>{t.preview}</CardTitle>
          <Button onClick={handleDownloadPDF} size="sm" variant="outline">
            <Download className="h-4 w-4 mr-2" />
            {t.download}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div
          id="resume-preview"
          className="bg-white p-8 shadow-lg min-h-[800px] text-sm print:shadow-none print:p-6"
          data-resume-data={JSON.stringify(data)}
        >
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{data.personalInfo.fullName || t.yourName}</h1>
            <div className="text-gray-600 space-y-1">
              {data.personalInfo.email && (
                <div>
                  {t.email}: {data.personalInfo.email}
                </div>
              )}
              {data.personalInfo.phone && (
                <div>
                  {t.phone}: {data.personalInfo.phone}
                </div>
              )}
              {data.personalInfo.linkedin && renderClickableLink(data.personalInfo.linkedin, "LinkedIn")}
              {data.personalInfo.github && renderClickableLink(data.personalInfo.github, "GitHub")}
              {data.personalInfo.portfolio &&
                renderClickableLink(data.personalInfo.portfolio, language === "en" ? "Portfolio" : "Portfólio")}
              {data.personalInfo.linktree && renderClickableLink(data.personalInfo.linktree, "Linktree")}
              {data.personalInfo.address && (
                <div>
                  {t.address}: {data.personalInfo.address}
                </div>
              )}
            </div>
          </div>

          {data.professionalSummary && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-2 border-b border-gray-300 pb-1">
                {t.professionalSummary}
              </h2>
              <p className="text-gray-700 leading-relaxed">{data.professionalSummary}</p>
            </div>
          )}

          {data.experience.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-2 border-b border-gray-300 pb-1">{t.experience}</h2>
              <div className="space-y-4">
                {data.experience.map((exp, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-medium text-gray-900">{exp.position}</h3>
                      <span className="text-gray-600 text-xs">
                        {exp.startDate} - {exp.endDate || t.present}
                      </span>
                    </div>
                    <div className="text-gray-700 mb-2">{exp.company}</div>
                    {exp.description && <p className="text-gray-600 text-sm leading-relaxed">{exp.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {data.education.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-2 border-b border-gray-300 pb-1">{t.education}</h2>
              <div className="space-y-3">
                {data.education.map((edu, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-medium text-gray-900">{edu.degree}</h3>
                      <span className="text-gray-600 text-xs">
                        {edu.startDate} - {edu.endDate || t.present}
                      </span>
                    </div>
                    <div className="text-gray-700">{edu.institution}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {data.skills.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-2 border-b border-gray-300 pb-1">{t.skills}</h2>
              <div className="text-gray-700">{data.skills.join(" - ")}</div>
            </div>
          )}

          {data.languages.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-2 border-b border-gray-300 pb-1">{t.languages}</h2>
              <div className="space-y-1">
                {data.languages.map((lang, index) => (
                  <div key={index} className="flex justify-between">
                    <span className="text-gray-700">{lang.language}</span>
                    <span className="text-gray-600 text-sm">
                      {language === "en"
                        ? lang.proficiency.charAt(0).toUpperCase() + lang.proficiency.slice(1)
                        : lang.proficiency === "beginner"
                          ? "Iniciante"
                          : lang.proficiency === "intermediate"
                            ? "Intermediário"
                            : lang.proficiency === "advanced"
                              ? "Avançado"
                              : lang.proficiency === "fluent"
                                ? "Fluente"
                                : lang.proficiency === "native"
                                  ? "Nativo"
                                  : lang.proficiency}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {data.courses.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-2 border-b border-gray-300 pb-1">{t.courses}</h2>
              <div className="space-y-2">
                {data.courses.map((course, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-start">
                      <span className="font-medium text-gray-900">{course.name}</span>
                      {course.date && <span className="text-gray-600 text-xs">{course.date}</span>}
                    </div>
                    {course.institution && <div className="text-gray-700 text-sm">{course.institution}</div>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {data.additionalInfo && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-2 border-b border-gray-300 pb-1">
                {t.additionalInfo}
              </h2>
              <p className="text-gray-700 leading-relaxed">{data.additionalInfo}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
