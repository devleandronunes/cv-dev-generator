"use client"
import { Header } from "@/components/header"
import { ResumeForm } from "@/components/resume-form"
import { ResumePreview } from "@/components/resume-preview"
import { useLocalStorage } from "@/hooks/use-local-storage"
import type { ResumeData } from "@/types/resume"

const initialData: ResumeData = {
  personalInfo: {
    fullName: "",
    email: "",
    phone: "",
    linkedin: "",
    github: "",
    portfolio: "",
    linktree: "",
    address: "",
  },
  professionalSummary: "",
  experience: [],
  education: [],
  skills: [],
  languages: [],
  courses: [],
  additionalInfo: "",
}

export default function Home() {
  const [language, setLanguage] = useLocalStorage<"en" | "pt">("cv-dev-language", "en")
  const [resumeData, setResumeData] = useLocalStorage<ResumeData>("cv-dev-resume-data", initialData)

  return (
    <div className="min-h-screen bg-gray-50">
      <Header language={language} onLanguageChange={setLanguage} />
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <ResumeForm data={resumeData} onChange={setResumeData} language={language} />
          </div>
          <div className="lg:sticky lg:top-8 lg:h-fit">
            <ResumePreview data={resumeData} language={language} />
          </div>
        </div>
      </main>
    </div>
  )
}
