'use client'

import { useState } from 'react'
import { X } from 'lucide-react'

interface PersonaSelectorProps {
  isOpen: boolean
  onClose: () => void
}

export default function PersonaSelector({ isOpen, onClose }: PersonaSelectorProps) {
  const personas = [
    {
      id: 'designer',
      title: 'Designer',
      description: 'Visual thinker',
      emoji: '🎨'
    },
    {
      id: 'developer',
      title: 'Developer',
      description: 'Code craftsperson',
      emoji: '💻'
    },
    {
      id: 'pm-stakeholder',
      title: 'PM/Stakeholder',
      description: 'Strategic leader',
      emoji: '📊'
    },
    {
      id: 'marketer',
      title: 'Marketer',
      description: 'Growth focused',
      emoji: '📈'
    },
    {
      id: 'other',
      title: 'Other',
      description: 'Curious explorer',
      emoji: '🤔'
    }
  ]

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-design4-neutral-400 hover:text-design4-ink transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <p className="text-design4-neutral-500 text-lg mb-4">
            Tell us a little about yourself so we can create a better experience for you.
          </p>
          <h2 className="text-2xl lg:text-3xl font-bold text-design4-ink">
            What is your current professional role?
          </h2>
        </div>

        {/* Persona cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {personas.map((persona) => (
            <button
              key={persona.id}
              className="flex flex-col items-center p-6 bg-design4-bg border border-design4-neutral-200 rounded-xl hover:border-design4-primary hover:shadow-md transition-all duration-200 text-center"
              onClick={() => {
                // TODO: Handle persona selection
                console.log('Selected persona:', persona.id)
                onClose()
              }}
            >
              {/* Avatar placeholder with emoji */}
              <div className="w-16 h-16 bg-design4-neutral-100 rounded-full flex items-center justify-center mb-4 text-2xl">
                {persona.emoji}
              </div>
              
              <h3 className="font-semibold text-design4-ink mb-1">
                {persona.title}
              </h3>
              <p className="text-sm text-design4-neutral-500">
                {persona.description}
              </p>
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-design4-neutral-400">
          Your selection helps us personalize your Design4 Framework experience
        </div>
      </div>
    </div>
  )
}