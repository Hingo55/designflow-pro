'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface Project {
  id: string
  name: string
  description: string
  status: string
  phase: string
  progress: number
  models: string[]
  lastModified: string
  company?: string
  created_at?: string
  updated_at?: string
}

interface ProjectContextType {
  selectedProject: Project | null
  setSelectedProject: (project: Project | null) => void
  projects: Project[]
  setProjects: (projects: Project[]) => void
  loading: boolean
  setLoading: (loading: boolean) => void
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined)

const PROJECT_STORAGE_KEY = 'design4_selected_project'

export function ProjectProvider({ children }: { children: ReactNode }) {
  const [selectedProject, setSelectedProjectState] = useState<Project | null>(null)
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  // Load selected project from localStorage on mount
  useEffect(() => {
    const savedProject = localStorage.getItem(PROJECT_STORAGE_KEY)
    if (savedProject) {
      try {
        const project = JSON.parse(savedProject)
        setSelectedProjectState(project)
      } catch (error) {
        console.error('Error loading saved project:', error)
        localStorage.removeItem(PROJECT_STORAGE_KEY)
      }
    }
    setLoading(false)
  }, [])

  // Save selected project to localStorage when it changes
  const setSelectedProject = (project: Project | null) => {
    setSelectedProjectState(project)
    if (project) {
      localStorage.setItem(PROJECT_STORAGE_KEY, JSON.stringify(project))
    } else {
      localStorage.removeItem(PROJECT_STORAGE_KEY)
    }
  }

  const value = {
    selectedProject,
    setSelectedProject,
    projects,
    setProjects,
    loading,
    setLoading,
  }

  return (
    <ProjectContext.Provider value={value}>
      {children}
    </ProjectContext.Provider>
  )
}

export function useProject() {
  const context = useContext(ProjectContext)
  if (context === undefined) {
    throw new Error('useProject must be used within a ProjectProvider')
  }
  return context
}

// Hook for tools to get the current project context
export function useProjectContext() {
  const { selectedProject } = useProject()
  return selectedProject
}