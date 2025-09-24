'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/lib/auth-context'
import { apiClient } from '@/lib/api-client'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Folder, Clock, CheckCircle } from 'lucide-react'

interface Project {
  id: string
  name: string
  description?: string
  phase: string
  status: string
  created_at: string
  updated_at: string
}

interface ProjectSelectorProps {
  onProjectSelected: (project: Project) => void
  selectedProject?: Project | null
  toolType: string
}

export default function ProjectSelector({ onProjectSelected, selectedProject, toolType }: ProjectSelectorProps) {
  const { user } = useAuth()
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [showDialog, setShowDialog] = useState(false)
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [newProject, setNewProject] = useState({
    name: '',
    description: '',
    phase: 'discover'
  })

  useEffect(() => {
    if (user) {
      loadProjects()
    }
  }, [user])

  const loadProjects = async () => {
    try {
      setLoading(true)
      const response = await apiClient.getProjects()
      setProjects(response.projects)
    } catch (error) {
      console.error('Error loading projects:', error)
    } finally {
      setLoading(false)
    }
  }

  const createProject = async () => {
    if (!newProject.name.trim()) return

    try {
      const response = await apiClient.createProject({
        name: newProject.name,
        description: newProject.description,
        phase: newProject.phase
      })

      setProjects([response.project, ...projects])
      onProjectSelected(response.project)
      setNewProject({ name: '', description: '', phase: 'discover' })
      setShowCreateDialog(false)
    } catch (error) {
      console.error('Error creating project:', error)
    }
  }

  const handleProjectSelect = (project: Project) => {
    onProjectSelected(project)
    setShowDialog(false)
  }

  if (!user) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded-lg">
        <p className="text-sm">Please <a href="/auth" className="underline">sign in</a> to save and manage your models.</p>
      </div>
    )
  }

  return (
    <>
      <div className="bg-white border border-design4-neutral-200 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Folder className="h-5 w-5 text-design4-primary" />
            <div>
              <p className="font-medium text-design4-ink">
                {selectedProject ? selectedProject.name : 'No project selected'}
              </p>
              {selectedProject && (
                <p className="text-sm text-design4-neutral-600">
                  {selectedProject.description || `${selectedProject.phase} phase`}
                </p>
              )}
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowCreateDialog(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              New Project
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowDialog(true)}
            >
              {selectedProject ? 'Switch Project' : 'Select Project'}
            </Button>
          </div>
        </div>
      </div>

      {/* Project Selection Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Select Project for {toolType}</DialogTitle>
          </DialogHeader>

          <div className="max-h-96 overflow-y-auto">
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-design4-primary mx-auto"></div>
                <p className="text-design4-neutral-600 mt-2">Loading projects...</p>
              </div>
            ) : projects.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-design4-neutral-600 mb-4">No projects found.</p>
                <Button onClick={() => setShowCreateDialog(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Your First Project
                </Button>
              </div>
            ) : (
              <div className="grid gap-3">
                {projects.map((project) => (
                  <Card
                    key={project.id}
                    className={`cursor-pointer transition-colors hover:bg-design4-neutral-50 ${
                      selectedProject?.id === project.id ? 'ring-2 ring-design4-primary' : ''
                    }`}
                    onClick={() => handleProjectSelect(project)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-design4-ink">{project.name}</h3>
                          {project.description && (
                            <p className="text-sm text-design4-neutral-600 mt-1">
                              {project.description}
                            </p>
                          )}
                          <div className="flex items-center gap-4 mt-2">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              project.phase === 'discover' ? 'bg-design4-gold/20 text-design4-gold' :
                              project.phase === 'define' ? 'bg-design4-purple/20 text-design4-purple' :
                              project.phase === 'develop' ? 'bg-design4-green/20 text-design4-green' :
                              'bg-design4-orange/20 text-design4-orange'
                            }`}>
                              {project.phase}
                            </span>
                            <span className="flex items-center gap-1 text-xs text-design4-neutral-500">
                              <Clock className="h-3 w-3" />
                              {new Date(project.updated_at).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        {selectedProject?.id === project.id && (
                          <CheckCircle className="h-5 w-5 text-design4-primary" />
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Create Project Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Project</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label htmlFor="projectName">Project Name</Label>
              <Input
                id="projectName"
                value={newProject.name}
                onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                placeholder="Enter project name"
              />
            </div>

            <div>
              <Label htmlFor="projectDescription">Description (Optional)</Label>
              <Textarea
                id="projectDescription"
                value={newProject.description}
                onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                placeholder="Brief description of the project"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="projectPhase">Phase</Label>
              <Select
                value={newProject.phase}
                onValueChange={(value) => setNewProject({ ...newProject, phase: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select project phase" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="discover">Discover</SelectItem>
                  <SelectItem value="define">Define</SelectItem>
                  <SelectItem value="develop">Develop</SelectItem>
                  <SelectItem value="deliver">Deliver</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2 justify-end pt-4">
              <Button
                variant="outline"
                onClick={() => setShowCreateDialog(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={createProject}
                disabled={!newProject.name.trim()}
              >
                Create Project
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}