'use client'

import { useState, useEffect } from 'react'

export function usePersona() {
  const [selectedPersona, setSelectedPersona] = useState<string | null>(null)

  // Load persona from localStorage on hook initialization
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedPersona = localStorage.getItem('selectedPersona')
      if (savedPersona) {
        setSelectedPersona(savedPersona)
      }
    }
  }, [])

  // Save persona to localStorage when it changes
  const handlePersonaSelect = (personaId: string) => {
    setSelectedPersona(personaId)
    if (typeof window !== 'undefined') {
      localStorage.setItem('selectedPersona', personaId)
    }
  }

  const getPersonaName = (personaId: string | null) => {
    switch (personaId) {
      case 'founder-innovator':
        return 'Founder / Innovator'
      case 'transformation-leader':
        return 'Transformation Leader'
      case 'consultant-architect':
        return 'Consultant / Business Architect'
      case 'project-operations':
        return 'Project / Operations'
      case 'other':
        return 'Other'
      default:
        return ''
    }
  }

  return {
    selectedPersona,
    handlePersonaSelect,
    getPersonaName
  }
}