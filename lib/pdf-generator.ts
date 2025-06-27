import type { ResumeData } from "@/types/resume"
import { jsPDF } from "jspdf"

export async function generatePDF(element: HTMLElement, filename: string, language: "en" | "pt" = "en") {
  try {
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    })

    const pageWidth = pdf.internal.pageSize.getWidth()
    const pageHeight = pdf.internal.pageSize.getHeight()
    const margin = 20
    const lineHeight = 6
    const sectionSpacing = 8
    let yPosition = margin

    const translations = {
      en: {
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
      },
      pt: {
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
      },
    }

    const t = translations[language]

    const socialLabels = {
      en: {
        linkedin: "LinkedIn",
        github: "GitHub",
        portfolio: "Portfolio",
        linktree: "Linktree",
      },
      pt: {
        linkedin: "LinkedIn",
        github: "GitHub",
        portfolio: "Portfólio",
        linktree: "Linktree",
      },
    }

    const socialT = socialLabels[language]

    const resumeDataElement = document.querySelector("[data-resume-data]")
    let resumeData: ResumeData | null = null

    if (resumeDataElement) {
      try {
        resumeData = JSON.parse(resumeDataElement.getAttribute("data-resume-data") || "{}")
      } catch (e) {
        console.error("Error parsing resume data:", e)
      }
    }

    const addText = (
      text: string,
      fontSize = 10,
      style: "normal" | "bold" = "normal",
      color: [number, number, number] = [0, 0, 0],
    ) => {
      if (yPosition > pageHeight - margin) {
        pdf.addPage()
        yPosition = margin
      }

      pdf.setFontSize(fontSize)
      pdf.setFont("helvetica", style)
      pdf.setTextColor(color[0], color[1], color[2])

      const maxWidth = pageWidth - 2 * margin
      const lines = pdf.splitTextToSize(text, maxWidth)

      lines.forEach((line: string) => {
        if (yPosition > pageHeight - margin) {
          pdf.addPage()
          yPosition = margin
        }
        pdf.text(line, margin, yPosition)
        yPosition += lineHeight
      })
    }

    const addSectionHeader = (title: string) => {
      yPosition += sectionSpacing
      addText(title, 14, "bold")
      const textWidth = pdf.getTextWidth(title)
      pdf.setLineWidth(0.2)
      pdf.setDrawColor(200, 200, 200)
      pdf.line(margin, yPosition - 2, margin + textWidth, yPosition - 2)
      yPosition += 2
    }

    const translateProficiency = (proficiency: string) => {
      if (language === "pt") {
        switch (proficiency) {
          case "beginner":
            return "Iniciante"
          case "intermediate":
            return "Intermediário"
          case "advanced":
            return "Avançado"
          case "fluent":
            return "Fluente"
          case "native":
            return "Nativo"
          default:
            return proficiency
        }
      }
      return proficiency.charAt(0).toUpperCase() + proficiency.slice(1)
    }

    if (resumeData) {
      if (resumeData.personalInfo.fullName) {
        addText(resumeData.personalInfo.fullName, 18, "bold")
        yPosition += 4
      }

      if (resumeData.personalInfo.email) {
        addText(`${t.email}: ${resumeData.personalInfo.email}`)
      }
      if (resumeData.personalInfo.phone) {
        addText(`${t.phone}: ${resumeData.personalInfo.phone}`)
      }
      if (resumeData.personalInfo.address) {
        addText(`${t.address}: ${resumeData.personalInfo.address}`)
      }

      if (resumeData.personalInfo.linkedin) {
        if (yPosition > pageHeight - margin) {
          pdf.addPage()
          yPosition = margin
        }

        pdf.setFontSize(10)
        pdf.setFont("helvetica", "normal")
        pdf.setTextColor(0, 0, 0)
        pdf.text(`${socialT.linkedin}: `, margin, yPosition)
        const labelWidth = pdf.getTextWidth(`${socialT.linkedin}: `)

        pdf.setTextColor(0, 0, 255)
        const fullUrl = resumeData.personalInfo.linkedin.startsWith("http")
          ? resumeData.personalInfo.linkedin
          : `https://${resumeData.personalInfo.linkedin}`
        const linkWidth = pdf.getTextWidth(resumeData.personalInfo.linkedin)
        pdf.textWithLink(resumeData.personalInfo.linkedin, margin + labelWidth, yPosition, { url: fullUrl })

        pdf.setLineWidth(0.1)
        pdf.setDrawColor(0, 0, 255)
        pdf.line(margin + labelWidth, yPosition + 0.5, margin + labelWidth + linkWidth, yPosition + 0.5)
        yPosition += lineHeight
      }

      if (resumeData.personalInfo.github) {
        if (yPosition > pageHeight - margin) {
          pdf.addPage()
          yPosition = margin
        }

        pdf.setFontSize(10)
        pdf.setFont("helvetica", "normal")
        pdf.setTextColor(0, 0, 0)
        pdf.text(`${socialT.github}: `, margin, yPosition)
        const labelWidth = pdf.getTextWidth(`${socialT.github}: `)

        pdf.setTextColor(0, 0, 255)
        const fullUrl = resumeData.personalInfo.github.startsWith("http")
          ? resumeData.personalInfo.github
          : `https://${resumeData.personalInfo.github}`
        const linkWidth = pdf.getTextWidth(resumeData.personalInfo.github)
        pdf.textWithLink(resumeData.personalInfo.github, margin + labelWidth, yPosition, { url: fullUrl })

        pdf.setLineWidth(0.1)
        pdf.setDrawColor(0, 0, 255)
        pdf.line(margin + labelWidth, yPosition + 0.5, margin + labelWidth + linkWidth, yPosition + 0.5)
        yPosition += lineHeight
      }

      if (resumeData.personalInfo.portfolio) {
        if (yPosition > pageHeight - margin) {
          pdf.addPage()
          yPosition = margin
        }

        pdf.setFontSize(10)
        pdf.setFont("helvetica", "normal")
        pdf.setTextColor(0, 0, 0)
        pdf.text(`${socialT.portfolio}: `, margin, yPosition)
        const labelWidth = pdf.getTextWidth(`${socialT.portfolio}: `)

        pdf.setTextColor(0, 0, 255)
        const fullUrl = resumeData.personalInfo.portfolio.startsWith("http")
          ? resumeData.personalInfo.portfolio
          : `https://${resumeData.personalInfo.portfolio}`
        const linkWidth = pdf.getTextWidth(resumeData.personalInfo.portfolio)
        pdf.textWithLink(resumeData.personalInfo.portfolio, margin + labelWidth, yPosition, { url: fullUrl })

        pdf.setLineWidth(0.1)
        pdf.setDrawColor(0, 0, 255)
        pdf.line(margin + labelWidth, yPosition + 0.5, margin + labelWidth + linkWidth, yPosition + 0.5)
        yPosition += lineHeight
      }

      if (resumeData.personalInfo.linktree) {
        if (yPosition > pageHeight - margin) {
          pdf.addPage()
          yPosition = margin
        }

        pdf.setFontSize(10)
        pdf.setFont("helvetica", "normal")
        pdf.setTextColor(0, 0, 0)
        pdf.text(`${socialT.linktree}: `, margin, yPosition)
        const labelWidth = pdf.getTextWidth(`${socialT.linktree}: `)

        pdf.setTextColor(0, 0, 255)
        const fullUrl = resumeData.personalInfo.linktree.startsWith("http")
          ? resumeData.personalInfo.linktree
          : `https://${resumeData.personalInfo.linktree}`
        const linkWidth = pdf.getTextWidth(resumeData.personalInfo.linktree)
        pdf.textWithLink(resumeData.personalInfo.linktree, margin + labelWidth, yPosition, { url: fullUrl })

        pdf.setLineWidth(0.1)
        pdf.setDrawColor(0, 0, 255)
        pdf.line(margin + labelWidth, yPosition + 0.5, margin + labelWidth + linkWidth, yPosition + 0.5)
        yPosition += lineHeight
      }

      if (resumeData.professionalSummary) {
        addSectionHeader(t.professionalSummary)
        addText(resumeData.professionalSummary)
      }

      if (resumeData.experience.length > 0) {
        addSectionHeader(t.experience)
        resumeData.experience.forEach((exp) => {
          addText(`${exp.position} - ${exp.company}`, 11, "bold")
          addText(`${exp.startDate} - ${exp.endDate || t.present}`, 9)
          if (exp.description) {
            addText(exp.description, 10)
          }
          yPosition += 3
        })
      }

      if (resumeData.education.length > 0) {
        addSectionHeader(t.education)
        resumeData.education.forEach((edu) => {
          addText(`${edu.degree} - ${edu.institution}`, 11, "bold")
          addText(`${edu.startDate} - ${edu.endDate || t.present}`, 9)
          yPosition += 3
        })
      }

      if (resumeData.skills.length > 0) {
        addSectionHeader(t.skills)
        addText(resumeData.skills.join(" - "))
      }

      if (resumeData.languages.length > 0) {
        addSectionHeader(t.languages)
        resumeData.languages.forEach((lang) => {
          addText(`${lang.language}: ${translateProficiency(lang.proficiency)}`)
        })
      }

      if (resumeData.courses.length > 0) {
        addSectionHeader(t.courses)
        resumeData.courses.forEach((course) => {
          let courseText = course.name
          if (course.institution) courseText += ` - ${course.institution}`
          if (course.date) courseText += ` (${course.date})`
          addText(courseText)
        })
      }

      if (resumeData.additionalInfo) {
        addSectionHeader(t.additionalInfo)
        addText(resumeData.additionalInfo)
      }
    } else {
      const textContent = element.innerText
      const lines = textContent.split("\n").filter((line) => line.trim())
      lines.forEach((line) => {
        addText(line.trim())
      })
    }

    pdf.save(filename)
  } catch (error) {
    console.error("Error generating PDF:", error)
    window.print()
  }
}
