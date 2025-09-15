"use client"

import { useState, useEffect, useMemo } from 'react'
import { Search, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const PERSONAS = ["All Roles", "Founder", "Transformation Leader", "Consultant", "Project Operations"]
const PHASES = ["All Phases", "Discover", "Define", "Develop", "Deliver"]

interface BlogFiltersProps {
  onFiltersChange: (filters: { persona: string; phase: string; search: string }) => void
}

export default function BlogFilters({ onFiltersChange }: BlogFiltersProps) {
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
  }, [selectedPersona, selectedPhase, searchQuery])

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
    <div className="mb-8">
      {/* Enhanced Filter Bar with Search */}
      <div className="bg-white rounded-2xl border border-design4-neutral-100 shadow-sm p-6">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          
          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-design4-neutral-400" />
            <Input
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-10 h-10 border-design4-neutral-200 focus:border-design4-primary focus:ring-design4-primary"
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-design4-neutral-400 hover:text-design4-neutral-600 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Filters Row */}
          <div className="flex flex-wrap items-center gap-4">
            {/* Role Filter */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-design4-neutral-600 whitespace-nowrap">Role:</span>
              <Select value={selectedPersona} onValueChange={setSelectedPersona}>
                <SelectTrigger className="w-44 h-10 border-design4-neutral-200 focus:border-design4-primary focus:ring-design4-primary">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {PERSONAS.map((persona) => (
                    <SelectItem key={persona} value={persona}>
                      {persona}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Phase Filter */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-design4-neutral-600 whitespace-nowrap">Phase:</span>
              <Select value={selectedPhase} onValueChange={setSelectedPhase}>
                <SelectTrigger className="w-36 h-10 border-design4-neutral-200 focus:border-design4-primary focus:ring-design4-primary">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {PHASES.map((phase) => (
                    <SelectItem key={phase} value={phase}>
                      {phase}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Clear All Button */}
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="px-3 py-1.5 text-sm font-medium text-design4-neutral-500 hover:text-design4-primary transition-colors focus:outline-none focus:ring-2 focus:ring-design4-primary focus:ring-offset-1 rounded-lg hover:bg-design4-neutral-50 whitespace-nowrap"
              >
                Clear All
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}