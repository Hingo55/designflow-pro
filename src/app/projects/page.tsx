'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { useProject } from '@/lib/project-context'
import { useRouter } from 'next/navigation'
import { apiClient } from '@/lib/api-client'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  FolderOpen,
  Plus,
  Search,
  Filter,
  MoreVertical,
  Edit3,
  Trash2,
  Calendar,
  Target,
  BarChart,
  Users,
  Lightbulb,
  PenTool,
  Code,
  Truck,
  Clock,
  Building
} from 'lucide-react'

export default function ProjectsPage() {
  const { projects, setProjects, selectedProject, setSelectedProject } = useProject()
  const router = useRouter()

  // New project dialog state
  const [showNewProjectDialog, setShowNewProjectDialog] = useState(false)
  const [newProjectName, setNewProjectName] = useState('')
  const [newProjectDescription, setNewProjectDescription] = useState('')
  const [newProjectPhase, setNewProjectPhase] = useState('discover')
  const [isCreatingProject, setIsCreatingProject] = useState(false)

  // Edit project dialog state
  const [showEditProjectDialog, setShowEditProjectDialog] = useState(false)
  const [editingProject, setEditingProject] = useState<any>(null)
  const [editProjectName, setEditProjectName] = useState('')
  const [editProjectDescription, setEditProjectDescription] = useState('')
  const [editProjectPhase, setEditProjectPhase] = useState('discover')
  const [editProjectStatus, setEditProjectStatus] = useState('active')
  const [isUpdatingProject, setIsUpdatingProject] = useState(false)

  // Delete project dialog state
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [deletingProject, setDeletingProject] = useState<any>(null)
  const [isDeletingProject, setIsDeletingProject] = useState(false)

  // Filter state
  const [filterPhase, setFilterPhase] = useState<string>('all')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [filterCompany, setFilterCompany] = useState<string>('all')
  const [showFilterDropdown, setShowFilterDropdown] = useState(false)

  // Helper function to calculate progress from models
  const calculateProgressFromModels = (models: any[]) => {
    if (models.length === 0) return 0
    const statusValues: Record<string, number> = {
      not_started: 0,
      in_progress: 50,
      draft: 75,
      published: 100
    }
    const totalProgress = models.reduce((sum: number, model: { status: string }) => sum + (statusValues[model.status] || 0), 0)
    return Math.round(totalProgress / models.length)
  }

  // Load projects from API
  useEffect(() => {
    const loadProjects = async () => {
      try {
        const response = await apiClient.getProjects()

        // Load models for each project to calculate real progress
        const projectsWithProgress = await Promise.all(
          response.projects.map(async (project: any) => {
            try {
              const modelsResponse = await apiClient.getModels(project.id)
              const progress = calculateProgressFromModels(modelsResponse.models || [])

              return {
                id: project.id,
                name: project.name,
                description: project.short_description || '',
                company: project.company || 'Not specified',
                status: project.status || 'draft',
                phase: project.phase || 'discover',
                progress: progress,
                models: modelsResponse.models || [],
                lastModified: new Date(project.updated_at || project.created_at).toLocaleDateString()
              }
            } catch (modelError) {
              console.error(`Error loading models for project ${project.id}:`, modelError)
              return {
                id: project.id,
                name: project.name,
                description: project.short_description || '',
                company: project.company || 'Not specified',
                status: project.status || 'draft',
                phase: project.phase || 'discover',
                progress: 0,
                models: [],
                lastModified: new Date(project.updated_at || project.created_at).toLocaleDateString()
              }
            }
          })
        )

        setProjects(projectsWithProgress)
      } catch (error) {
        console.error('Error loading projects:', error)
        // Fallback to mock data for development
        setProjects(mockProjects)
      }
    }

    loadProjects()
  }, [setProjects])

  // Handle project selection
  const handleSelectProject = (project: any) => {
    setSelectedProject(project)
    // Redirect to project detail page or tools selection
    router.push(`/resources/tools`)
  }

  // Handle viewing project details
  const handleViewProject = (project: any) => {
    router.push(`/projects/${project.id}`)
  }

  // Create new project
  const handleCreateProject = async () => {
    if (!newProjectName.trim()) return

    setIsCreatingProject(true)
    try {
      const response = await apiClient.createProject({
        name: newProjectName.trim(),
        description: newProjectDescription.trim(),
        phase: newProjectPhase,
        status: 'active'
      })

      const newProject = {
        id: response.project.id,
        name: response.project.name,
        description: response.project.description || '',
        status: response.project.status || 'active',
        phase: response.project.phase || 'discover',
        progress: 0,
        models: [],
        lastModified: new Date().toLocaleDateString()
      }

      setProjects([...projects, newProject])

      // Reset form
      setNewProjectName('')
      setNewProjectDescription('')
      setNewProjectPhase('discover')
      setShowNewProjectDialog(false)

      // Auto-select new project and navigate to tools
      setSelectedProject(newProject)
      router.push(`/resources/tools`)
    } catch (error) {
      console.error('Error creating project:', error)
      // Show user-friendly error message
      alert(`Failed to create project: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setIsCreatingProject(false)
    }
  }

  // Open edit dialog
  const handleEditProject = (project: any) => {
    setEditingProject(project)
    setEditProjectName(project.name)
    setEditProjectDescription(project.description || '')
    setEditProjectPhase(project.phase)
    setEditProjectStatus(project.status)
    setShowEditProjectDialog(true)
  }

  // Update project
  const handleUpdateProject = async () => {
    if (!editingProject || !editProjectName.trim()) return

    setIsUpdatingProject(true)
    try {
      const response = await apiClient.updateProject(editingProject.id, {
        name: editProjectName.trim(),
        description: editProjectDescription.trim(),
        phase: editProjectPhase,
        status: editProjectStatus
      })

      const updatedProject = {
        ...editingProject,
        name: response.project.name,
        description: response.project.description || '',
        phase: response.project.phase,
        status: response.project.status,
        lastModified: new Date().toLocaleDateString()
      }

      setProjects(projects.map(p => p.id === editingProject.id ? updatedProject : p))

      // Update selected project if it's the one being edited
      if (selectedProject?.id === editingProject.id) {
        setSelectedProject(updatedProject)
      }

      // Reset form
      setEditingProject(null)
      setEditProjectName('')
      setEditProjectDescription('')
      setEditProjectPhase('discover')
      setEditProjectStatus('active')
      setShowEditProjectDialog(false)
    } catch (error) {
      console.error('Error updating project:', error)
    } finally {
      setIsUpdatingProject(false)
    }
  }

  // Open delete confirmation
  const handleDeleteProject = (project: any) => {
    setDeletingProject(project)
    setShowDeleteDialog(true)
  }

  // Delete project
  const confirmDeleteProject = async () => {
    if (!deletingProject) return

    setIsDeletingProject(true)
    try {
      console.log('Attempting to delete project:', deletingProject.id)
      const result = await apiClient.deleteProject(deletingProject.id)
      console.log('Delete result:', result)

      setProjects(projects.filter(p => p.id !== deletingProject.id))

      // Clear selected project if it's the one being deleted
      if (selectedProject?.id === deletingProject.id) {
        setSelectedProject(null)
      }

      setDeletingProject(null)
      setShowDeleteDialog(false)
      console.log('Project deleted successfully from UI')
    } catch (error) {
      console.error('Error deleting project:', error)
      // Don't update UI if delete failed
      alert('Failed to delete project. Please try again.')
    } finally {
      setIsDeletingProject(false)
    }
  }

  const mockProjects = [
    {
      id: "1",
      name: "Digital Transformation Initiative",
      description: "Comprehensive strategy to modernize operations and improve customer experience through digital channels.",
      status: "active",
      phase: "develop",
      lastModified: "2 hours ago",
      models: ["Outcomes Model", "Capability Assessment", "Process Design"],
      progress: 75
    },
    {
      id: "2",
      name: "Market Expansion Strategy",
      description: "Strategic framework for entering new geographic markets while maintaining operational excellence.",
      status: "planning",
      phase: "define",
      lastModified: "1 day ago",
      models: ["Strategy Canvas", "Market Analysis"],
      progress: 45
    },
    {
      id: "3",
      name: "Customer Experience Redesign",
      description: "End-to-end customer journey optimization to increase satisfaction and reduce churn.",
      status: "active",
      phase: "deliver",
      lastModified: "3 days ago",
      models: ["Customer Journey Map", "Performance Metrics", "Value Delivery Framework"],
      progress: 90
    },
    {
      id: "4",
      name: "Operational Excellence Program",
      description: "Systematic approach to improve operational efficiency and reduce costs across all departments.",
      status: "completed",
      phase: "deliver",
      lastModified: "1 week ago",
      models: ["Operations Dashboard", "Process Optimization", "Continuous Improvement"],
      progress: 100
    },
    {
      id: "5",
      name: "Innovation Lab Setup",
      description: "Framework for establishing an innovation lab to drive future growth initiatives.",
      status: "draft",
      phase: "discover",
      lastModified: "2 weeks ago",
      models: ["Innovation Framework"],
      progress: 15
    }
  ]

  // Filter projects based on phase, status, and company
  const filterProjects = (projectsToFilter: any[]) => {
    return projectsToFilter.filter(project => {
      const phaseMatch = filterPhase === 'all' || project.phase === filterPhase
      const statusMatch = filterStatus === 'all' || project.status === filterStatus
      const companyMatch = filterCompany === 'all' || project.company === filterCompany
      return phaseMatch && statusMatch && companyMatch
    })
  }

  // Reset filters
  const resetFilters = () => {
    setFilterPhase('all')
    setFilterStatus('all')
    setFilterCompany('all')
  }

  // Get unique companies from projects
  const getUniqueCompanies = () => {
    const companies = projects.map(project => project.company).filter(Boolean) as string[]
    return [...new Set(companies)].sort()
  }

  const getPhaseColor = (phase: string) => {
    switch (phase) {
      case 'discover': return 'bg-design4-gold/10 text-design4-gold border-design4-gold/20'
      case 'define': return 'bg-design4-purple/10 text-design4-purple border-design4-purple/20'
      case 'develop': return 'bg-design4-green/10 text-design4-green border-design4-green/20'
      case 'deliver': return 'bg-design4-orange/10 text-design4-orange border-design4-orange/20'
      default: return 'bg-design4-neutral-100 text-design4-neutral-600 border-design4-neutral-200'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200'
      case 'planning': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'completed': return 'bg-gray-100 text-gray-800 border-gray-200'
      case 'draft': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      default: return 'bg-design4-neutral-100 text-design4-neutral-600 border-design4-neutral-200'
    }
  }

  const getPhaseIcon = (phase: string) => {
    switch (phase) {
      case 'discover': return <Search className="h-4 w-4" />
      case 'define': return <PenTool className="h-4 w-4" />
      case 'develop': return <Code className="h-4 w-4" />
      case 'deliver': return <Truck className="h-4 w-4" />
      default: return <Target className="h-4 w-4" />
    }
  }

  return (
    <>
      <Navigation />

      <SidebarProvider>
        <div className="flex w-full bg-design4-bg min-h-screen pt-20">
          <Sidebar variant="floating" className="hidden md:flex mt-20 z-[60] max-h-[calc(100vh-5rem)] overflow-hidden">
            <SidebarHeader>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="flex items-center gap-2 px-2 py-1 hover:opacity-80 transition-opacity w-full text-left"
              >
                <FolderOpen className="h-5 w-5" />
                <span className="text-sm font-semibold">My Projects</span>
              </button>
            </SidebarHeader>
            <SidebarContent className="overflow-y-auto flex-1">
              <SidebarGroup>
                <SidebarGroupLabel>Quick Actions</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <button
                          className="w-full"
                          onClick={() => setShowNewProjectDialog(true)}
                        >
                          <Plus className="h-4 w-4" />
                          <span>New Project</span>
                        </button>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>

              <SidebarGroup>
                <SidebarGroupLabel>Filter by Status</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <button className="w-full">
                          <div className="w-2 h-2 bg-green-500 rounded-full" />
                          <span>Active Projects</span>
                        </button>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <button className="w-full">
                          <div className="w-2 h-2 bg-blue-500 rounded-full" />
                          <span>Planning</span>
                        </button>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <button className="w-full">
                          <div className="w-2 h-2 bg-gray-500 rounded-full" />
                          <span>Completed</span>
                        </button>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <button className="w-full">
                          <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                          <span>Drafts</span>
                        </button>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>

              <SidebarGroup>
                <SidebarGroupLabel>Filter by Phase</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <button className="w-full">
                          <Search className="h-4 w-4" />
                          <span>Discover</span>
                        </button>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <button className="w-full">
                          <PenTool className="h-4 w-4" />
                          <span>Define</span>
                        </button>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <button className="w-full">
                          <Code className="h-4 w-4" />
                          <span>Develop</span>
                        </button>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <button className="w-full">
                          <Truck className="h-4 w-4" />
                          <span>Deliver</span>
                        </button>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>

              <SidebarGroup>
                <SidebarGroupLabel>Navigate</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Link href="/resources">
                          <FolderOpen className="h-4 w-4" />
                          <span>Back to Resources</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>

          <SidebarInset className="flex-1 md:ml-4">
            {/* Mobile Sidebar Trigger */}
            <div className="md:hidden p-4">
              <SidebarTrigger />
            </div>

            <main className="min-h-screen bg-design4-bg">
              {/* Breadcrumb */}
              <section className="bg-design4-bg border-b border-design4-neutral-100">
                <div className="mx-auto max-w-design4-container px-6 py-4">
                  <nav className="flex items-center space-x-2 text-sm text-design4-neutral-500">
                    <Link href="/" className="hover:text-design4-primary transition-colors">Home</Link>
                    <span>/</span>
                    <Link href="/resources" className="hover:text-design4-primary transition-colors">Resources</Link>
                    <span>/</span>
                    <span className="text-design4-ink">Projects</span>
                  </nav>
                </div>
              </section>

              {/* Search Bar Section */}
              <section className="bg-design4-bg py-4">
                <div className="mx-auto max-w-design4-container px-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="relative max-w-md">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-design4-neutral-400" />
                      <input
                        type="text"
                        placeholder="Search projects..."
                        className="w-full pl-10 pr-4 py-3 border border-design4-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-design4-primary focus:border-transparent"
                      />
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button
                        className="bg-design4-primary hover:bg-design4-primary/90 text-white"
                        onClick={() => setShowNewProjectDialog(true)}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        New Project
                      </Button>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="border-design4-neutral-200">
                              <Filter className="h-4 w-4 mr-2" />
                              Filter
                              {(filterPhase !== 'all' || filterStatus !== 'all') && (
                                <Badge className="ml-2 bg-design4-primary text-white text-xs px-1 py-0">
                                  {[filterPhase !== 'all' ? 1 : 0, filterStatus !== 'all' ? 1 : 0].reduce((a, b) => a + b)}
                                </Badge>
                              )}
                            </Button>
                          </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                          <DropdownMenuLabel>Filter by Phase</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => setFilterPhase('all')}>
                            All Phases {filterPhase === 'all' && '✓'}
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setFilterPhase('discover')}>
                            Discover {filterPhase === 'discover' && '✓'}
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setFilterPhase('define')}>
                            Define {filterPhase === 'define' && '✓'}
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setFilterPhase('develop')}>
                            Develop {filterPhase === 'develop' && '✓'}
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setFilterPhase('deliver')}>
                            Deliver {filterPhase === 'deliver' && '✓'}
                          </DropdownMenuItem>

                          <DropdownMenuSeparator />

                          <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => setFilterStatus('all')}>
                            All Statuses {filterStatus === 'all' && '✓'}
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setFilterStatus('active')}>
                            Active {filterStatus === 'active' && '✓'}
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setFilterStatus('planning')}>
                            Planning {filterStatus === 'planning' && '✓'}
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setFilterStatus('completed')}>
                            Completed {filterStatus === 'completed' && '✓'}
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setFilterStatus('draft')}>
                            Draft {filterStatus === 'draft' && '✓'}
                          </DropdownMenuItem>

                          {(filterPhase !== 'all' || filterStatus !== 'all') && (
                            <>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => {setFilterPhase('all'); setFilterStatus('all')}} className="text-design4-primary">
                                Clear Phase & Status Filters
                              </DropdownMenuItem>
                            </>
                          )}
                        </DropdownMenuContent>
                        </DropdownMenu>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="border-design4-neutral-200">
                              <Building className="h-4 w-4 mr-2" />
                              Company
                              {filterCompany !== 'all' && (
                                <Badge className="ml-2 bg-design4-primary text-white text-xs px-1 py-0">
                                  1
                                </Badge>
                              )}
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="w-56">
                            <DropdownMenuLabel>Filter by Company</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => setFilterCompany('all')}>
                              All Companies {filterCompany === 'all' && '✓'}
                            </DropdownMenuItem>
                            {getUniqueCompanies().map((company) => (
                              <DropdownMenuItem key={company} onClick={() => setFilterCompany(company)}>
                                {company} {filterCompany === company && '✓'}
                              </DropdownMenuItem>
                            ))}
                            {filterCompany !== 'all' && (
                              <>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => setFilterCompany('all')} className="text-design4-primary">
                                  Clear Company Filter
                                </DropdownMenuItem>
                              </>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                        {(filterPhase !== 'all' || filterStatus !== 'all' || filterCompany !== 'all') && (
                          <Button variant="ghost" onClick={resetFilters} className="text-design4-primary hover:bg-design4-primary/10">
                            Clear All
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Header Section */}
              <section className="bg-design4-bg py-4">
                <div className="mx-auto max-w-design4-container px-6">
                  <div>
                    <h1 className="text-3xl lg:text-4xl font-bold text-design4-ink leading-tight mb-3">
                      My Projects
                    </h1>
                    <p className="text-base text-design4-neutral-500 max-w-2xl">
                      Manage your Design4 implementation projects. Create, track, and optimize your strategic initiatives using our comprehensive framework and tools.
                    </p>
                  </div>
                </div>
              </section>

              {/* Projects Grid */}
              <section className="bg-design4-bg py-12">
                <div className="mx-auto max-w-design4-container px-6">

                  {/* Projects Grid */}
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {filterProjects(projects).map((project) => (
                      <Card key={project.id} className="hover:shadow-lg transition-shadow duration-200 cursor-pointer group" onClick={() => handleViewProject(project)}>
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <CardTitle className="text-lg font-semibold text-design4-ink group-hover:text-design4-primary transition-colors">
                                {project.name}
                              </CardTitle>
                            </div>
                            <button
                              className="p-1 hover:bg-design4-neutral-100 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <MoreVertical className="h-4 w-4 text-design4-neutral-500" />
                            </button>
                          </div>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge className={`text-xs ${getStatusColor(project.status)}`}>
                              {project.status}
                            </Badge>
                            <Badge variant="outline" className={`text-xs ${getPhaseColor(project.phase)}`}>
                              {getPhaseIcon(project.phase)}
                              <span className="ml-1 capitalize">{project.phase}</span>
                            </Badge>
                          </div>

                          {/* Company */}
                          <div className="flex items-center gap-1 text-xs text-design4-neutral-500 mt-2">
                            <Building className="h-3 w-3" />
                            <span>{project.company}</span>
                          </div>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <CardDescription className="text-sm text-design4-neutral-500 mb-4 line-clamp-2">
                            {project.description}
                          </CardDescription>

                          {/* Progress Bar */}
                          <div className="mb-4">
                            <div className="flex justify-between text-xs text-design4-neutral-500 mb-1">
                              <span>Progress</span>
                              <span>{project.progress}%</span>
                            </div>
                            <div className="w-full bg-design4-neutral-100 rounded-full h-2">
                              <div
                                className="bg-design4-primary h-2 rounded-full transition-all duration-300"
                                style={{ width: `${project.progress}%` }}
                              ></div>
                            </div>
                          </div>

                          {/* Select Project Button */}
                          <div className="pt-3 border-t border-design4-neutral-100">
                            <Button
                              onClick={(e) => {
                                e.stopPropagation()
                                handleSelectProject(project)
                              }}
                              className={`w-full mb-3 ${
                                selectedProject?.id === project.id
                                  ? 'bg-design4-primary text-white'
                                  : 'bg-design4-neutral-100 hover:bg-design4-primary hover:text-white text-design4-ink'
                              } transition-colors`}
                              size="sm"
                            >
                              {selectedProject?.id === project.id ? 'Selected Project' : 'Select Project'}
                            </Button>

                            {/* Footer */}
                            <div className="flex items-center justify-between">
                              <div className="flex items-center text-xs text-design4-neutral-500">
                                <Clock className="h-3 w-3 mr-1" />
                                {project.lastModified}
                              </div>
                              <div className="flex items-center gap-2">
                                <button
                                  className="p-1 hover:bg-design4-neutral-100 rounded transition-colors"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    handleEditProject(project)
                                  }}
                                  title="Edit project"
                                >
                                  <Edit3 className="h-4 w-4 text-design4-neutral-500" />
                                </button>
                                <button
                                  className="p-1 hover:bg-red-50 rounded transition-colors"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    handleDeleteProject(project)
                                  }}
                                  title="Delete project"
                                >
                                  <Trash2 className="h-4 w-4 text-red-500" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}

                    {/* Create New Project Card */}
                    <Card
                      className="border-2 border-dashed border-design4-neutral-200 hover:border-design4-primary transition-colors cursor-pointer group"
                      onClick={() => setShowNewProjectDialog(true)}
                    >
                      <CardContent className="flex flex-col items-center justify-center h-full py-12">
                        <div className="w-12 h-12 bg-design4-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-design4-primary/20 transition-colors">
                          <Plus className="h-6 w-6 text-design4-primary" />
                        </div>
                        <h3 className="text-lg font-semibold text-design4-ink mb-2">Create New Project</h3>
                        <p className="text-sm text-design4-neutral-500 text-center">
                          Start a new Design4 implementation project with our framework and tools.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </section>

              {/* Quick Stats */}
              <section className="bg-design4-neutral-100 py-16">
                <div className="mx-auto max-w-design4-container px-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="bg-white rounded-2xl p-6 text-center">
                      <div className="text-2xl font-bold text-design4-ink mb-1">5</div>
                      <div className="text-sm text-design4-neutral-500">Total Projects</div>
                    </div>
                    <div className="bg-white rounded-2xl p-6 text-center">
                      <div className="text-2xl font-bold text-green-600 mb-1">2</div>
                      <div className="text-sm text-design4-neutral-500">Active</div>
                    </div>
                    <div className="bg-white rounded-2xl p-6 text-center">
                      <div className="text-2xl font-bold text-gray-600 mb-1">1</div>
                      <div className="text-sm text-design4-neutral-500">Completed</div>
                    </div>
                    <div className="bg-white rounded-2xl p-6 text-center">
                      <div className="text-2xl font-bold text-design4-primary mb-1">68%</div>
                      <div className="text-sm text-design4-neutral-500">Avg Progress</div>
                    </div>
                  </div>
                </div>
              </section>
            </main>
          </SidebarInset>
        </div>
      </SidebarProvider>

      {/* New Project Dialog */}
      <Dialog open={showNewProjectDialog} onOpenChange={setShowNewProjectDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Create New Project</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="project-name">Project Name</Label>
              <Input
                id="project-name"
                value={newProjectName}
                onChange={(e) => setNewProjectName(e.target.value)}
                placeholder="Enter project name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="project-description">Description</Label>
              <Textarea
                id="project-description"
                value={newProjectDescription}
                onChange={(e) => setNewProjectDescription(e.target.value)}
                placeholder="Brief description of the project"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="project-phase">Starting Phase</Label>
              <Select value={newProjectPhase} onValueChange={setNewProjectPhase}>
                <SelectTrigger>
                  <SelectValue placeholder="Select starting phase" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="discover">
                    <div className="flex items-center gap-2">
                      <Target className="h-4 w-4 text-design4-gold" />
                      Discover
                    </div>
                  </SelectItem>
                  <SelectItem value="define">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-design4-purple" />
                      Define
                    </div>
                  </SelectItem>
                  <SelectItem value="develop">
                    <div className="flex items-center gap-2">
                      <Code className="h-4 w-4 text-design4-green" />
                      Develop
                    </div>
                  </SelectItem>
                  <SelectItem value="deliver">
                    <div className="flex items-center gap-2">
                      <Truck className="h-4 w-4 text-design4-orange" />
                      Deliver
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2 pt-4">
              <Button
                variant="outline"
                onClick={() => setShowNewProjectDialog(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleCreateProject}
                disabled={!newProjectName.trim() || isCreatingProject}
                className="flex-1 bg-design4-primary hover:bg-design4-primary/90"
              >
                {isCreatingProject ? 'Creating...' : 'Create Project'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Project Dialog */}
      <Dialog open={showEditProjectDialog} onOpenChange={setShowEditProjectDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Project</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-project-name">Project Name</Label>
              <Input
                id="edit-project-name"
                value={editProjectName}
                onChange={(e) => setEditProjectName(e.target.value)}
                placeholder="Enter project name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-project-description">Description</Label>
              <Textarea
                id="edit-project-description"
                value={editProjectDescription}
                onChange={(e) => setEditProjectDescription(e.target.value)}
                placeholder="Brief description of the project"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-project-phase">Phase</Label>
              <Select value={editProjectPhase} onValueChange={setEditProjectPhase}>
                <SelectTrigger>
                  <SelectValue placeholder="Select phase" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="discover">
                    <div className="flex items-center gap-2">
                      <Target className="h-4 w-4 text-design4-gold" />
                      Discover
                    </div>
                  </SelectItem>
                  <SelectItem value="define">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-design4-purple" />
                      Define
                    </div>
                  </SelectItem>
                  <SelectItem value="develop">
                    <div className="flex items-center gap-2">
                      <Code className="h-4 w-4 text-design4-green" />
                      Develop
                    </div>
                  </SelectItem>
                  <SelectItem value="deliver">
                    <div className="flex items-center gap-2">
                      <Truck className="h-4 w-4 text-design4-orange" />
                      Deliver
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-project-status">Status</Label>
              <Select value={editProjectStatus} onValueChange={setEditProjectStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2 pt-4">
              <Button
                variant="outline"
                onClick={() => setShowEditProjectDialog(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleUpdateProject}
                disabled={!editProjectName.trim() || isUpdatingProject}
                className="flex-1 bg-design4-primary hover:bg-design4-primary/90"
              >
                {isUpdatingProject ? 'Updating...' : 'Update Project'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Project Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Project</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <p className="text-sm text-design4-neutral-600">
              Are you sure you want to delete <strong>{deletingProject?.name}</strong>? This action cannot be undone and will permanently remove the project and all its associated models and data.
            </p>

            <div className="flex gap-2 pt-4">
              <Button
                variant="outline"
                onClick={() => setShowDeleteDialog(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={confirmDeleteProject}
                disabled={isDeletingProject}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white"
              >
                {isDeletingProject ? 'Deleting...' : 'Delete Project'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </>
  )
}