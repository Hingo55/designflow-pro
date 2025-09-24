'use client'

import { useState } from 'react'
import { useProject } from '@/lib/project-context'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Badge } from '@/components/ui/badge'
import { ChevronDown, FolderOpen, Plus } from 'lucide-react'
import Link from 'next/link'

export default function ProjectSwitcher() {
  const { selectedProject, projects, setSelectedProject } = useProject()

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'planning': return 'bg-blue-100 text-blue-800'
      case 'completed': return 'bg-gray-100 text-gray-800'
      case 'draft': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-design4-neutral-100 text-design4-neutral-600'
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="w-[200px] justify-between bg-white border-design4-neutral-200 hover:bg-design4-neutral-50"
        >
          <div className="flex items-center gap-2 min-w-0">
            <FolderOpen className="h-4 w-4 text-design4-neutral-500 flex-shrink-0" />
            <span className="truncate text-sm">
              {selectedProject ? selectedProject.name : 'Select Project'}
            </span>
          </div>
          <ChevronDown className="h-4 w-4 text-design4-neutral-500 flex-shrink-0" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-[300px] p-2" align="start">
        {projects.length > 0 ? (
          <>
            {projects.map((project) => (
              <DropdownMenuItem
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className={`cursor-pointer p-3 rounded-lg ${
                  selectedProject?.id === project.id
                    ? 'bg-design4-primary/10 border border-design4-primary/20'
                    : 'hover:bg-design4-neutral-50'
                }`}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-medium text-sm text-design4-ink truncate">
                      {project.name}
                    </h4>
                    <Badge className={`text-xs ${getStatusColor(project.status)}`}>
                      {project.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-design4-neutral-500 truncate">
                    {project.description}
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <div className="text-xs text-design4-neutral-400">
                      {project.models?.length || 0} models
                    </div>
                    <div className="text-xs text-design4-neutral-400">
                      {project.progress}% complete
                    </div>
                  </div>
                </div>
              </DropdownMenuItem>
            ))}

            <DropdownMenuSeparator className="my-2" />

            <DropdownMenuItem asChild>
              <Link
                href="/projects"
                className="flex items-center gap-2 p-2 text-sm text-design4-neutral-600 hover:text-design4-ink cursor-pointer"
              >
                <FolderOpen className="h-4 w-4" />
                Manage Projects
              </Link>
            </DropdownMenuItem>
          </>
        ) : (
          <div className="p-4 text-center">
            <p className="text-sm text-design4-neutral-500 mb-3">
              No projects yet
            </p>
            <Link href="/projects">
              <Button size="sm" className="bg-design4-primary hover:bg-design4-primary/90">
                <Plus className="h-4 w-4 mr-2" />
                Create Project
              </Button>
            </Link>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}