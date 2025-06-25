export interface PersonalInfo {
  fullName: string
  email: string
  phone: string
  linkedin: string
  github: string
  portfolio: string
  linktree: string
  address: string
}

export interface Experience {
  position: string
  company: string
  startDate: string
  endDate: string
  description: string
}

export interface Education {
  degree: string
  institution: string
  startDate: string
  endDate: string
}

export interface Language {
  language: string
  proficiency: string
}

export interface Course {
  name: string
  institution: string
  date: string
}

export interface ResumeData {
  personalInfo: PersonalInfo
  professionalSummary: string
  experience: Experience[]
  education: Education[]
  skills: string[]
  languages: Language[]
  courses: Course[]
  additionalInfo: string
}
