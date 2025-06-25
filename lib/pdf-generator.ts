import type { ResumeData } from "@/types/resume"
import { jsPDF } from "jspdf"

export async function generatePDF(element: HTMLElement, filename: string) {
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

    // Get resume data from the element's data attribute
    const resumeDataElement = document.querySelector("[data-resume-data]")
    let resumeData: ResumeData | null = null

    if (resumeDataElement) {
      try {
        resumeData = JSON.parse(resumeDataElement.getAttribute("data-resume-data") || "{}")
      } catch (e) {
        console.error("Error parsing resume data:", e)
      }
    }

    // Helper function to add text with proper formatting
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

    // Helper function to add section header with thin line
    const addSectionHeader = (title: string) => {
      yPosition += sectionSpacing
      addText(title, 14, "bold")
      // Add thin underline to section headers (matching preview)
      const textWidth = pdf.getTextWidth(title)
      pdf.setLineWidth(0.2) // Thinner line
      pdf.setDrawColor(200, 200, 200) // Light gray like in preview
      pdf.line(margin, yPosition - 2, margin + textWidth, yPosition - 2)
      yPosition += 2
    }

    if (resumeData) {
      // Personal Information
      if (resumeData.personalInfo.fullName) {
        addText(resumeData.personalInfo.fullName, 18, "bold")
        yPosition += 4
      }

      // Contact Information
      if (resumeData.personalInfo.email) {
        addText(`Email: ${resumeData.personalInfo.email}`)
      }
      if (resumeData.personalInfo.phone) {
        addText(`Phone: ${resumeData.personalInfo.phone}`)
      }
      if (resumeData.personalInfo.address) {
        addText(`Address: ${resumeData.personalInfo.address}`)
      }

      // Social Links (label in black, URL in blue with thin blue underline)
      if (resumeData.personalInfo.linkedin) {
        if (yPosition > pageHeight - margin) {
          pdf.addPage()
          yPosition = margin
        }

        pdf.setFontSize(10)
        pdf.setFont("helvetica", "normal")
        pdf.setTextColor(0, 0, 0)
        pdf.text("LinkedIn: ", margin, yPosition)
        const labelWidth = pdf.getTextWidth("LinkedIn: ")

        pdf.setTextColor(0, 0, 255)
        const fullUrl = resumeData.personalInfo.linkedin.startsWith("http")
          ? resumeData.personalInfo.linkedin
          : `https://${resumeData.personalInfo.linkedin}`
        const linkWidth = pdf.getTextWidth(resumeData.personalInfo.linkedin)
        pdf.textWithLink(resumeData.personalInfo.linkedin, margin + labelWidth, yPosition, { url: fullUrl })

        // Thin blue underline for link
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
        pdf.text("GitHub: ", margin, yPosition)
        const labelWidth = pdf.getTextWidth("GitHub: ")

        pdf.setTextColor(0, 0, 255)
        const fullUrl = resumeData.personalInfo.github.startsWith("http")
          ? resumeData.personalInfo.github
          : `https://${resumeData.personalInfo.github}`
        const linkWidth = pdf.getTextWidth(resumeData.personalInfo.github)
        pdf.textWithLink(resumeData.personalInfo.github, margin + labelWidth, yPosition, { url: fullUrl })

        // Thin blue underline for link
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
        pdf.text("Portfolio: ", margin, yPosition)
        const labelWidth = pdf.getTextWidth("Portfolio: ")

        pdf.setTextColor(0, 0, 255)
        const fullUrl = resumeData.personalInfo.portfolio.startsWith("http")
          ? resumeData.personalInfo.portfolio
          : `https://${resumeData.personalInfo.portfolio}`
        const linkWidth = pdf.getTextWidth(resumeData.personalInfo.portfolio)
        pdf.textWithLink(resumeData.personalInfo.portfolio, margin + labelWidth, yPosition, { url: fullUrl })

        // Thin blue underline for link
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
        pdf.text("Linktree: ", margin, yPosition)
        const labelWidth = pdf.getTextWidth("Linktree: ")

        pdf.setTextColor(0, 0, 255)
        const fullUrl = resumeData.personalInfo.linktree.startsWith("http")
          ? resumeData.personalInfo.linktree
          : `https://${resumeData.personalInfo.linktree}`
        const linkWidth = pdf.getTextWidth(resumeData.personalInfo.linktree)
        pdf.textWithLink(resumeData.personalInfo.linktree, margin + labelWidth, yPosition, { url: fullUrl })

        // Thin blue underline for link
        pdf.setLineWidth(0.1)
        pdf.setDrawColor(0, 0, 255)
        pdf.line(margin + labelWidth, yPosition + 0.5, margin + labelWidth + linkWidth, yPosition + 0.5)
        yPosition += lineHeight
      }

      // Professional Summary
      if (resumeData.professionalSummary) {
        addSectionHeader("Professional Summary")
        addText(resumeData.professionalSummary)
      }

      // Experience
      if (resumeData.experience.length > 0) {
        addSectionHeader("Professional Experience")
        resumeData.experience.forEach((exp) => {
          addText(`${exp.position} - ${exp.company}`, 11, "bold")
          addText(`${exp.startDate} - ${exp.endDate || "Present"}`, 9)
          if (exp.description) {
            addText(exp.description, 10)
          }
          yPosition += 3
        })
      }

      // Education
      if (resumeData.education.length > 0) {
        addSectionHeader("Education")
        resumeData.education.forEach((edu) => {
          addText(`${edu.degree} - ${edu.institution}`, 11, "bold")
          addText(`${edu.startDate} - ${edu.endDate || "Present"}`, 9)
          yPosition += 3
        })
      }

      // Skills
      if (resumeData.skills.length > 0) {
        addSectionHeader("Technical Skills")
        addText(resumeData.skills.join(" - "))
      }

      // Languages
      if (resumeData.languages.length > 0) {
        addSectionHeader("Languages")
        resumeData.languages.forEach((lang) => {
          addText(`${lang.language}: ${lang.proficiency}`)
        })
      }

      // Courses
      if (resumeData.courses.length > 0) {
        addSectionHeader("Courses & Certifications")
        resumeData.courses.forEach((course) => {
          let courseText = course.name
          if (course.institution) courseText += ` - ${course.institution}`
          if (course.date) courseText += ` (${course.date})`
          addText(courseText)
        })
      }

      // Additional Information
      if (resumeData.additionalInfo) {
        addSectionHeader("Additional Information")
        addText(resumeData.additionalInfo)
      }
    } else {
      // Fallback: extract text from DOM
      const textContent = element.innerText
      const lines = textContent.split("\n").filter((line) => line.trim())
      lines.forEach((line) => {
        addText(line.trim())
      })
    }

    pdf.save(filename)
  } catch (error) {
    console.error("Error generating PDF:", error)
    // Fallback to print
    window.print()
  }
}
