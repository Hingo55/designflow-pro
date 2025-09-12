'use client'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import Lottie from 'lottie-react'

function LottieGraphic({ src, alt, className }: { src: string, alt: string, className: string }) {
  const [animationData, setAnimationData] = useState<any>(null)

  useEffect(() => {
    fetch(src)
      .then(response => response.json())
      .then(data => setAnimationData(data))
      .catch(error => console.error('Error loading Lottie animation:', error))
  }, [src])

  if (!animationData) {
    return <div className={className}>Loading...</div>
  }

  return <Lottie animationData={animationData} className={className} />
}

interface PersonaSelectorProps {
  isOpen: boolean
  onClose: () => void
  onPersonaSelect: (personaId: string) => void
}

export default function PersonaSelector({ isOpen, onClose, onPersonaSelect }: PersonaSelectorProps) {
  const personas = [
    {
      id: 'founder-innovator',
      title: 'Founder / Innovator',
      description: 'Scale without losing focus',
      emoji: '💡'
    },
    {
      id: 'transformation-leader',
      title: 'Transformation Leader',
      description: 'Align your leadership team',
      emoji: '🔄'
    },
    {
      id: 'consultant-architect',
      title: 'Consultant / Business Architect',
      description: 'Master the framework',
      emoji: '🏗️'
    },
    {
      id: 'project-operations',
      title: 'Project / Operations',
      description: 'Bridge strategy and execution',
      emoji: '⚙️'
    },
    {
      id: 'other',
      title: 'Other',
      description: 'xxx',
      emoji: '🤔'
    }
  ]

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-design4-ink/60 flex items-center justify-center z-50 p-4">
      <div className="bg-design4-bg rounded-2xl p-8 max-w-5xl w-full max-h-[90vh] overflow-y-auto relative shadow-2xl border border-design4-neutral-100">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-design4-neutral-500 hover:text-design4-ink transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-design4-neutral-500 text-lg mb-6">
            Tell us a little about yourself so we can create a better experience for you.
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold text-design4-ink">
            What is your current professional role?
          </h2>
        </div>

        {/* Persona cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          {personas.map((persona) => (
            <button
              key={persona.id}
              className="flex flex-col items-center p-6 bg-white border-2 border-design4-neutral-100 rounded-2xl hover:border-design4-primary hover:shadow-lg hover:transform hover:-translate-y-1 transition-all duration-200 text-center group"
              onClick={() => {
                onPersonaSelect(persona.id)
                onClose()
              }}
            >
              {/* Avatar with emoji or image */}
              <div className="w-24 h-24 bg-design4-neutral-100 rounded-full flex items-center justify-center mb-4 text-4xl group-hover:bg-design4-primary/10 transition-colors">
                {persona.id === 'founder-innovator' ? (
                  <img 
                    src="/innovator.svg" 
                    alt="Founder / Innovator" 
                    className="w-16 h-16 object-contain"
                  />
                ) : persona.id === 'transformation-leader' ? (
                  <img 
                    src="/transformation.svg" 
                    alt="Transformation Leader" 
                    className="w-16 h-16 object-contain"
                  />
                ) : persona.id === 'consultant-architect' ? (
                  <LottieGraphic
                    src="/businessman.json"
                    alt="Consultant / Business Architect"
                    className="w-16 h-16"
                  />
                ) : persona.id === 'project-operations' ? (
                  <img 
                    src="/management.svg" 
                    alt="Project / Operations" 
                    className="w-16 h-16 object-contain"
                  />
                ) : persona.id === 'other' ? (
                  <img 
                    src="/design4gears.svg" 
                    alt="Design4 Framework" 
                    className="w-16 h-16 object-contain"
                  />
                ) : (
                  persona.emoji
                )}
              </div>
              
              <h3 className="font-bold text-design4-ink mb-2 text-lg leading-tight">
                {persona.title}
              </h3>
              <p className="text-design4-neutral-500 font-medium">
                {persona.description}
              </p>
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center text-design4-neutral-500 font-medium">
          Your selection helps us personalize your Design4 Framework experience
        </div>
      </div>
    </div>
  )
}