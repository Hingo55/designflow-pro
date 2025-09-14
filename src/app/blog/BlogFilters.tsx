"use client"

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

const PERSONAS = ["Founder", "Transformation Leader", "Consultant", "Project Operations"]
const PHASES = ["Discover", "Define", "Develop", "Deliver"]

export default function BlogFilters() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const createQueryString = useCallback(
    (name: string, value: string | null) => {
      const params = new URLSearchParams(searchParams.toString())
      if (value === null) {
        params.delete(name)
      } else {
        params.set(name, value)
      }
      return params.toString()
    },
    [searchParams]
  )

  const toggle = (key: "persona" | "phase", value: string) => {
    const currentValues = searchParams.get(key)?.split(',').filter(Boolean) || []
    const currentSet = new Set(currentValues)
    
    if (currentSet.has(value)) {
      currentSet.delete(value)
    } else {
      currentSet.add(value)
    }
    
    const newValue = currentSet.size > 0 ? Array.from(currentSet).join(',') : null
    const queryString = createQueryString(key, newValue)
    router.push(`${pathname}?${queryString}`)
  }

  const clearAll = () => {
    router.push(pathname)
  }

  const activePersonas = new Set(searchParams.get('persona')?.split(',').filter(Boolean) || [])
  const activePhases = new Set(searchParams.get('phase')?.split(',').filter(Boolean) || [])
  const hasActiveFilters = activePersonas.size > 0 || activePhases.size > 0

  return (
    <div className="mb-8 space-y-4">
      {/* Persona Filters */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-design4-ink">Filter by Role</h3>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by persona">
          {PERSONAS.map((persona) => {
            const isActive = activePersonas.has(persona)
            return (
              <button
                key={persona}
                onClick={() => toggle("persona", persona)}
                className={`px-4 py-2 rounded-full border text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-design4-primary focus:ring-offset-2 ${
                  isActive
                    ? 'bg-design4-primary text-white border-design4-primary shadow-sm'
                    : 'bg-white text-design4-neutral-600 border-design4-neutral-200 hover:bg-design4-neutral-50 hover:border-design4-primary'
                }`}
                aria-pressed={isActive}
                tabIndex={0}
              >
                {persona}
              </button>
            )
          })}
        </div>
      </div>

      {/* Phase Filters */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-design4-ink">Filter by Design4 Phase</h3>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by phase">
          {PHASES.map((phase) => {
            const isActive = activePhases.has(phase)
            return (
              <button
                key={phase}
                onClick={() => toggle("phase", phase)}
                className={`px-4 py-2 rounded-full border text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-design4-primary focus:ring-offset-2 ${
                  isActive
                    ? 'bg-design4-gold text-design4-ink border-design4-gold shadow-sm'
                    : 'bg-white text-design4-neutral-600 border-design4-neutral-200 hover:bg-design4-neutral-50 hover:border-design4-gold'
                }`}
                aria-pressed={isActive}
                tabIndex={0}
              >
                {phase}
              </button>
            )
          })}
        </div>
      </div>

      {/* Clear All Button */}
      {hasActiveFilters && (
        <div className="pt-2">
          <button
            onClick={clearAll}
            className="px-4 py-2 text-sm font-medium text-design4-neutral-500 hover:text-design4-primary transition-colors focus:outline-none focus:ring-2 focus:ring-design4-primary focus:ring-offset-2 rounded-md"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  )
}