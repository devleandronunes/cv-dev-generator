"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Plus, X } from "lucide-react"
import { useState } from "react"

interface SkillsFormProps {
  data: string[]
  onChange: (data: string[]) => void
  language: "en" | "pt"
}

export function SkillsForm({ data, onChange, language }: SkillsFormProps) {
  const [newSkill, setNewSkill] = useState("")

  const translations = {
    en: {
      skills: "Technical Skills",
      addSkill: "Add Skill",
      skillPlaceholder: "Enter a skill (e.g., JavaScript, React, Node.js)",
    },
    pt: {
      skills: "Habilidades Técnicas",
      addSkill: "Adicionar Habilidade",
      skillPlaceholder: "Digite uma habilidade (ex: JavaScript, React, Node.js)",
    },
  }

  const t = translations[language]

  const addSkill = () => {
    if (newSkill.trim() && !data.includes(newSkill.trim())) {
      onChange([...data, newSkill.trim()])
      setNewSkill("")
    }
  }

  const removeSkill = (skillToRemove: string) => {
    onChange(data.filter((skill) => skill !== skillToRemove))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addSkill()
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <div className="flex-1">
          <Label htmlFor="newSkill">{t.skills}</Label>
          <Input
            id="newSkill"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={t.skillPlaceholder}
          />
        </div>
        <div className="flex items-end">
          <Button onClick={addSkill} size="sm">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {data.map((skill, index) => (
          <Badge key={index} variant="secondary" className="flex items-center gap-1">
            {skill}
            <button onClick={() => removeSkill(skill)} className="ml-1 hover:bg-gray-300 rounded-full p-0.5">
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
      </div>
    </div>
  )
}
