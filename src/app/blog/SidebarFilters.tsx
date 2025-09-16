"use client"

import { useState, useEffect } from 'react'
import { Search, X } from 'lucide-react'

const PERSONAS = ["All Roles", "Founder", "Transformation Leader", "Consultant", "Project Operations"]
const PHASES = ["All Phases", "Discover", "Define", "Develop", "Deliver"]

interface SidebarFiltersProps {
  onFiltersChange: (filters: { persona: string; phase: string; search: string }) => void
}

export default function SidebarFilters({ onFiltersChange }: SidebarFiltersProps) {
  const [selectedPersona, setSelectedPersona] = useState("All Roles")
  const [selectedPhase, setSelectedPhase] = useState("All Phases")
  const [searchQuery, setSearchQuery] = useState("")

  // Notify parent component when filters change
  useEffect(() => {
    onFiltersChange({
      persona: selectedPersona === "All Roles" ? "" : selectedPersona,
      phase: selectedPhase === "All Phases" ? "" : selectedPhase,
      search: searchQuery
    })
  }, [selectedPersona, selectedPhase, searchQuery, onFiltersChange])

  const hasActiveFilters = selectedPersona !== "All Roles" || selectedPhase !== "All Phases" || searchQuery.length > 0

  const clearAllFilters = () => {
    setSelectedPersona("All Roles")
    setSelectedPhase("All Phases")
    setSearchQuery("")
  }

  const clearSearch = () => {
    setSearchQuery("")
  }

  return (
    <div className="sticky top-6 space-y-8">
      {/* Search */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-4">Search</h3>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-10 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-design4-primary focus:border-transparent text-sm"
          />
          {searchQuery && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Role Filter */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-4">Role</h3>
        <div className="space-y-2">
          {PERSONAS.map((persona) => (
            <label key={persona} className="flex items-center cursor-pointer group">
              <input
                type="radio"
                name="persona"
                value={persona}
                checked={selectedPersona === persona}
                onChange={(e) => setSelectedPersona(e.target.value)}
                className="sr-only"
              />
              <div className={`w-4 h-4 rounded-full border-2 mr-3 flex items-center justify-center transition-colors ${
                selectedPersona === persona 
                  ? 'border-design4-primary bg-design4-primary' 
                  : 'border-gray-300 group-hover:border-design4-primary'
              }`}>
                {selectedPersona === persona && (
                  <div className="w-2 h-2 rounded-full bg-white"></div>
                )}
              </div>
              <span className={`text-sm transition-colors ${
                selectedPersona === persona 
                  ? 'text-design4-primary font-medium' 
                  : 'text-gray-600 group-hover:text-gray-900'
              }`}>
                {persona}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Phase Filter */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-4">Phase</h3>
        <div className="space-y-2">
          {PHASES.map((phase) => (
            <label key={phase} className="flex items-center cursor-pointer group">
              <input
                type="radio"
                name="phase"
                value={phase}
                checked={selectedPhase === phase}
                onChange={(e) => setSelectedPhase(e.target.value)}
                className="sr-only"
              />
              <div className={`w-4 h-4 rounded-full border-2 mr-3 flex items-center justify-center transition-colors ${
                selectedPhase === phase 
                  ? 'border-design4-primary bg-design4-primary' 
                  : 'border-gray-300 group-hover:border-design4-primary'
              }`}>
                {selectedPhase === phase && (
                  <div className="w-2 h-2 rounded-full bg-white"></div>
                )}
              </div>
              <span className={`text-sm transition-colors ${
                selectedPhase === phase 
                  ? 'text-design4-primary font-medium' 
                  : 'text-gray-600 group-hover:text-gray-900'
              }`}>
                {phase}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Clear All Button */}
      {hasActiveFilters && (
        <div className="pt-4 border-t border-gray-200">
          <button
            onClick={clearAllFilters}
            className="text-sm text-gray-500 hover:text-design4-primary transition-colors font-medium"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  )
}