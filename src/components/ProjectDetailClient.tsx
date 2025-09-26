'use client'

import { useState, useEffect } from 'react'
import { useToast } from '@/hooks/use-toast'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
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
import { Progress } from "@/components/ui/progress"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Toaster } from "@/components/ui/toaster"
import {
  FolderOpen,
  Edit3,
  FileDown,
  Archive,
  Plus,
  Search,
  PenTool,
  Code,
  Truck,
  Clock,
  Building,
  Target,
  BarChart,
  CheckCircle,
  MoreVertical,
  ChevronDown,
  ChevronUp,
  StickyNote,
  Copy,
  Trash2,
  Save,
  X,
  Loader2
} from 'lucide-react'

export default function ProjectDetailClient({ id }: { id: string }) {
  const { toast } = useToast()
  const [expandedDescription, setExpandedDescription] = useState(false)
  const [expandedNotes, setExpandedNotes] = useState(false)
  const [project, setProject] = useState<any>(null)
  const [models, setModels] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isCreatingModel, setIsCreatingModel] = useState(false)
  const [isDeletingModel, setIsDeletingModel] = useState(false)
  const [deletingModelId, setDeletingModelId] = useState<string | null>(null)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [modelToDelete, setModelToDelete] = useState<string | null>(null)
  const [isEditingDescription, setIsEditingDescription] = useState(false)
  const [editedDescription, setEditedDescription] = useState('')
  const [isEditingNotes, setIsEditingNotes] = useState(false)
  const [editedNotes, setEditedNotes] = useState('')
  const [isEditingCompany, setIsEditingCompany] = useState(false)
  const [editedCompany, setEditedCompany] = useState('')
  const [isEditingShortDescription, setIsEditingShortDescription] = useState(false)
  const [editedShortDescription, setEditedShortDescription] = useState('')
  const [isSavingDescription, setIsSavingDescription] = useState(false)
  const [isSavingNotes, setIsSavingNotes] = useState(false)
  const [isSavingCompany, setIsSavingCompany] = useState(false)
  const [isSavingShortDescription, setIsSavingShortDescription] = useState(false)

  // Sorting state
  const [sortField, setSortField] = useState<'name' | 'phase' | 'status' | 'lastModified'>('lastModified')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc')

  // Fetch real project data and models
  useEffect(() => {
    const loadProjectAndModels = async () => {
      try {
        setLoading(true)

        // Load project data
        const projectResponse = await apiClient.getProjects()
        const foundProject = projectResponse.projects.find((p: any) => p.id === id)

        if (!foundProject) {
          setError('Project not found')
          return
        }

        // Load models for this project
        const modelsResponse = await apiClient.getModels(id)
        const formattedModels = modelsResponse.models.map((model: any) => ({
          id: model.id,
          name: model.name,
          phase: model.type?.includes('outcomes') ? 'discover' :
                 model.type?.includes('journey') ? 'define' :
                 model.type?.includes('process') ? 'develop' : 'deliver',
          status: model.status || 'not_started',
          notes: model.notes || '',
          lastModified: new Date(model.updated_at || model.created_at).toLocaleDateString(),
          type: model.type
        }))

        // Calculate progress from model statuses
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

        const formattedProject = {
          id: foundProject.id,
          name: foundProject.name,
          shortDescription: foundProject.short_description || '',
          detailedDescription: foundProject.description || 'No detailed description available.',
          company: foundProject.company || 'Not specified',
          phase: foundProject.phase || 'discover',
          status: foundProject.status || 'active',
          progress: calculateProgressFromModels(formattedModels),
          lastModified: new Date(foundProject.updated_at || foundProject.created_at).toLocaleDateString(),
          planningNotes: foundProject.planning_notes || 'No planning notes yet.'
        }

        setProject(formattedProject)
        setModels(formattedModels)
      } catch (err) {
        console.error('Error loading project and models:', err)
        setError('Failed to load project')
      } finally {
        setLoading(false)
      }
    }

    loadProjectAndModels()
  }, [id])

  // Available model types organized by phase
  const modelTypes = {
    discover: [
      { type: 'outcomes_model', name: 'Outcomes Model' },
      { type: 'strategy_canvas', name: 'Strategy Canvas' },
      { type: 'market_analysis', name: 'Market Analysis' }
    ],
    define: [
      { type: 'customer_journey', name: 'Customer Journey Map' },
      { type: 'value_proposition', name: 'Value Proposition Canvas' },
      { type: 'stakeholder_map', name: 'Stakeholder Map' }
    ],
    develop: [
      { type: 'process_design', name: 'Process Design' },
      { type: 'capability_assessment', name: 'Capability Assessment' },
      { type: 'implementation_plan', name: 'Implementation Plan' }
    ],
    deliver: [
      { type: 'performance_metrics', name: 'Performance Metrics' },
      { type: 'value_delivery', name: 'Value Delivery Framework' },
      { type: 'operations_dashboard', name: 'Operations Dashboard' }
    ]
  }

  // Handle model actions
  const handleDuplicateModel = async (modelId: string) => {
    try {
      const modelToDuplicate = models.find(m => m.id === modelId)
      if (!modelToDuplicate) return

      const response = await apiClient.createModel({
        project_id: id,
        type: modelToDuplicate.type,
        name: `${modelToDuplicate.name} (Copy)`,
        status: 'not_started'
      })

      // Add duplicated model to the list
      const newModel = {
        id: response.model.id,
        name: response.model.name,
        phase: modelToDuplicate.phase,
        status: 'not_started',
        notes: '',
        lastModified: new Date().toLocaleDateString(),
        type: response.model.type
      }

      setModels([...models, newModel])

      // Recalculate progress
      const updatedModels = [...models, newModel]
      const newProgress = calculateProgressFromModels(updatedModels)
      setProject({ ...project, progress: newProgress })
    } catch (err) {
      console.error('Error duplicating model:', err)
      alert('Failed to duplicate model. Please try again.')
    }
  }

  const handleDeleteModel = (modelId: string) => {
    setModelToDelete(modelId)
    setShowDeleteDialog(true)
  }

  const confirmDeleteModel = async () => {
    if (!modelToDelete) return

    try {
      setIsDeletingModel(true)
      setDeletingModelId(modelToDelete)
      setShowDeleteDialog(false)

      await apiClient.deleteModel(modelToDelete)

      // Remove model from list
      const updatedModels = models.filter(m => m.id !== modelToDelete)
      setModels(updatedModels)

      // Recalculate progress
      const newProgress = calculateProgressFromModels(updatedModels)
      setProject({ ...project, progress: newProgress })
    } catch (err) {
      console.error('Error deleting model:', err)
      toast({
        title: "Failed to delete model",
        description: "Please try again or contact support if the problem persists.",
        variant: "destructive",
      })
    } finally {
      setIsDeletingModel(false)
      setDeletingModelId(null)
      setModelToDelete(null)
    }
  }

  // Handle description editing
  const handleEditDescription = () => {
    setEditedDescription(project.detailedDescription)
    setIsEditingDescription(true)
  }

  const handleSaveDescription = async () => {
    try {
      setIsSavingDescription(true)
      await apiClient.updateProject(id, {
        description: editedDescription
      })

      // Update local state
      setProject({
        ...project,
        detailedDescription: editedDescription,
        shortDescription: editedDescription
      })
      setIsEditingDescription(false)
      toast({
        title: "Description updated",
        description: "Project description has been saved successfully.",
      })
    } catch (err) {
      console.error('Error updating description:', err)
      toast({
        title: "Failed to update description",
        description: "Please try again or contact support if the problem persists.",
        variant: "destructive",
      })
    } finally {
      setIsSavingDescription(false)
    }
  }

  const handleCancelDescription = () => {
    setEditedDescription('')
    setIsEditingDescription(false)
  }

  // Handle planning notes editing
  const handleEditNotes = () => {
    setEditedNotes(project.planningNotes)
    setIsEditingNotes(true)
  }

  const handleSaveNotes = async () => {
    try {
      setIsSavingNotes(true)
      await apiClient.updateProject(id, {
        planning_notes: editedNotes
      })

      // Update local state
      setProject({
        ...project,
        planningNotes: editedNotes
      })
      setIsEditingNotes(false)
      toast({
        title: "Planning notes updated",
        description: "Your planning notes have been saved successfully.",
      })
    } catch (err) {
      console.error('Error updating notes:', err)
      toast({
        title: "Failed to update notes",
        description: "Please try again or contact support if the problem persists.",
        variant: "destructive",
      })
    } finally {
      setIsSavingNotes(false)
    }
  }

  const handleCancelNotes = () => {
    setEditedNotes('')
    setIsEditingNotes(false)
  }

  // Handle company editing
  const handleEditCompany = () => {
    setEditedCompany(project.company === 'Not specified' ? '' : project.company)
    setIsEditingCompany(true)
  }

  const handleSaveCompany = async () => {
    try {
      setIsSavingCompany(true)
      await apiClient.updateProject(id, {
        company: editedCompany || 'Not specified'
      })

      // Update local state
      setProject({
        ...project,
        company: editedCompany || 'Not specified'
      })
      setIsEditingCompany(false)
      toast({
        title: "Company updated",
        description: "Company information has been saved successfully.",
      })
    } catch (err) {
      console.error('Error updating company:', err)
      toast({
        title: "Failed to update company",
        description: "Please try again or contact support if the problem persists.",
        variant: "destructive",
      })
    } finally {
      setIsSavingCompany(false)
    }
  }

  const handleCancelCompany = () => {
    setEditedCompany('')
    setIsEditingCompany(false)
  }

  // Handle short description editing
  const handleEditShortDescription = () => {
    setEditedShortDescription(project.shortDescription || '')
    setIsEditingShortDescription(true)
  }

  const handleSaveShortDescription = async () => {
    try {
      setIsSavingShortDescription(true)
      await apiClient.updateProject(id, {
        description: editedShortDescription
      })

      // Update local state
      setProject({
        ...project,
        shortDescription: editedShortDescription
      })
      setIsEditingShortDescription(false)
      toast({
        title: "Short description updated",
        description: "Short description has been saved successfully.",
      })
    } catch (err) {
      console.error('Error updating short description:', err)
      toast({
        title: "Failed to update short description",
        description: "Please try again or contact support if the problem persists.",
        variant: "destructive",
      })
    } finally {
      setIsSavingShortDescription(false)
    }
  }

  const handleCancelShortDescription = () => {
    setEditedShortDescription('')
    setIsEditingShortDescription(false)
  }

  // Sorting functions
  const handleSort = (field: 'name' | 'phase' | 'status' | 'lastModified') => {
    if (sortField === field) {
      // Toggle direction if same field
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      // Set new field with appropriate default direction
      setSortField(field)
      setSortDirection(field === 'lastModified' ? 'desc' : 'asc')
    }
  }

  const sortModels = (modelsToSort: any[]) => {
    return [...modelsToSort].sort((a, b) => {
      let aValue: any
      let bValue: any

      switch (sortField) {
        case 'name':
          aValue = a.name?.toLowerCase() || ''
          bValue = b.name?.toLowerCase() || ''
          break

        case 'phase':
          const phaseOrder = { discover: 1, define: 2, develop: 3, deliver: 4 }
          aValue = phaseOrder[a.phase as keyof typeof phaseOrder] || 0
          bValue = phaseOrder[b.phase as keyof typeof phaseOrder] || 0
          break

        case 'status':
          const statusOrder = { not_started: 0, in_progress: 50, draft: 75, published: 100 }
          aValue = statusOrder[a.status as keyof typeof statusOrder] || 0
          bValue = statusOrder[b.status as keyof typeof statusOrder] || 0
          break

        case 'lastModified':
          aValue = new Date(a.lastModified || a.updated_at || 0).getTime()
          bValue = new Date(b.lastModified || b.updated_at || 0).getTime()
          break

        default:
          return 0
      }

      // Handle string vs number comparison
      let comparison = 0
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        comparison = aValue.localeCompare(bValue)
      } else {
        comparison = aValue - bValue
      }

      return sortDirection === 'asc' ? comparison : -comparison
    })
  }

  // Handle model creation
  const handleCreateModel = async (modelType: string, modelName: string) => {
    try {
      setIsCreatingModel(true)

      const response = await apiClient.createModel({
        project_id: id,
        type: modelType,
        name: modelName,
        status: 'not_started'
      })

      // Add new model to the list
      const newModel = {
        id: response.model.id,
        name: response.model.name,
        phase: modelType.includes('outcomes') ? 'discover' :
               modelType.includes('journey') || modelType.includes('value_proposition') ? 'define' :
               modelType.includes('process') || modelType.includes('capability') ? 'develop' : 'deliver',
        status: 'not_started',
        notes: '',
        lastModified: new Date().toLocaleDateString(),
        type: modelType
      }

      setModels([...models, newModel])

      // Recalculate project progress
      const updatedModels = [...models, newModel]
      const newProgress = calculateProgressFromModels(updatedModels)
      setProject({ ...project, progress: newProgress })

    } catch (err) {
      console.error('Error creating model:', err)
      alert('Failed to create model. Please try again.')
    } finally {
      setIsCreatingModel(false)
    }
  }

  // Helper function to calculate progress from models
  const calculateProgressFromModels = (modelsList: any[]) => {
    if (modelsList.length === 0) return 0
    const statusValues: Record<string, number> = {
      not_started: 0,
      in_progress: 50,
      draft: 75,
      published: 100
    }
    const totalProgress = modelsList.reduce((sum: number, model: { status: string }) => sum + (statusValues[model.status] || 0), 0)
    return Math.round(totalProgress / modelsList.length)
  }

  // Handle model status updates
  const handleStatusUpdate = async (modelId: string, newStatus: string) => {
    try {
      // Store the original models for rollback
      const originalModels = [...models]
      const originalProgress = project.progress

      // Optimistically update the UI
      const updatedModels = models.map(model =>
        model.id === modelId ? { ...model, status: newStatus } : model
      )
      setModels(updatedModels)

      // Recalculate and update progress immediately
      const newProgress = calculateProgressFromModels(updatedModels)
      setProject((prev: any) => ({ ...prev, progress: newProgress }))

      // Update the backend
      await apiClient.updateModel(modelId, { status: newStatus })

    } catch (err) {
      console.error('Error updating model status:', err)

      // Revert the optimistic update on error
      setModels(models)
      setProject((prev: any) => ({ ...prev, progress: project.progress }))

      alert('Failed to update model status. Please try again.')
    }
  }

  // Map model types to tool pages
  const getModelToolPath = (modelType: string) => {
    const toolMapping: Record<string, string> = {
      'outcomes_model': '/resources/tools/outcomes-model-tool',
      'customer_journey': '/resources/tools/customer-journey-map-tool',
      'value_proposition': '/resources/tools/value-proposition-tool',
      'strategy_canvas': '/resources/tools/strategy-canvas-tool',
      'market_analysis': '/resources/tools/market-analysis-tool',
      'stakeholder_map': '/resources/tools/stakeholder-map-tool',
      'process_design': '/resources/tools/process-design-tool',
      'capability_assessment': '/resources/tools/capability-assessment-tool',
      'implementation_plan': '/resources/tools/implementation-plan-tool',
      'performance_metrics': '/resources/tools/performance-metrics-tool',
      'value_delivery': '/resources/tools/value-delivery-tool',
      'operations_dashboard': '/resources/tools/operations-dashboard-tool'
    }
    return toolMapping[modelType] || '/resources/tools'
  }

  // Handle model navigation
  const handleModelClick = (model: any) => {
    const toolPath = getModelToolPath(model.type)
    // In the future, we'll pass the model ID as a parameter to pre-populate the tool
    window.open(toolPath, '_blank')
  }

  if (loading) {
    return (
      <>
        <Navigation />
        <div className="flex items-center justify-center min-h-screen bg-design4-bg">
          <div className="text-design4-neutral-500">Loading project...</div>
        </div>
        <Footer />
      </>
    )
  }

  if (error || !project) {
    return (
      <>
        <Navigation />
        <div className="flex items-center justify-center min-h-screen bg-design4-bg">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-design4-ink mb-2">Project Not Found</h1>
            <p className="text-design4-neutral-500 mb-4">{error || 'The requested project could not be found.'}</p>
            <Link href="/projects" className="text-design4-primary hover:text-design4-primary/80">
              ← Back to Projects
            </Link>
          </div>
        </div>
        <Footer />
      </>
    )
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

  const getPhaseIcon = (phase: string) => {
    switch (phase) {
      case 'discover': return <Search className="h-4 w-4" />
      case 'define': return <PenTool className="h-4 w-4" />
      case 'develop': return <Code className="h-4 w-4" />
      case 'deliver': return <Truck className="h-4 w-4" />
      default: return <Target className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'not_started': return 'bg-gray-100 text-gray-600'
      case 'in_progress': return 'bg-blue-100 text-blue-600'
      case 'draft': return 'bg-yellow-100 text-yellow-700'
      case 'published': return 'bg-green-100 text-green-600'
      default: return 'bg-gray-100 text-gray-600'
    }
  }

  const formatStatus = (status: string) => {
    switch (status) {
      case 'not_started': return 'Not Started'
      case 'in_progress': return 'In Progress'
      case 'draft': return 'Draft'
      case 'published': return 'Published'
      default: return 'Not Started'
    }
  }

  const getStatusPercentage = (status: string) => {
    switch (status) {
      case 'not_started': return 0
      case 'in_progress': return 50
      case 'draft': return 75
      case 'published': return 100
      default: return 0
    }
  }

  // Calculate project progress based on model statuses (already calculated in useEffect)
  const calculateProgress = () => {
    return project?.progress || 0
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
                  e.preventDefault()
                  e.stopPropagation()
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
                className="flex items-center gap-2 px-2 py-1 hover:opacity-80 transition-opacity w-full text-left mb-3"
              >
                <FolderOpen className="h-5 w-5" />
                <span className="text-sm font-semibold">Project Details</span>
              </button>
              <p className="px-2 text-xs text-design4-neutral-600 leading-relaxed">
                Manage your project models, track progress, and coordinate implementation efforts.
              </p>
            </SidebarHeader>

            <SidebarContent className="overflow-y-auto flex-1">
              <SidebarGroup>
                <SidebarGroupLabel>Quick Actions</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <button className="w-full">
                          <Edit3 className="h-4 w-4" />
                          <span>Edit Project</span>
                        </button>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <button className="w-full">
                          <FileDown className="h-4 w-4" />
                          <span>Export Report</span>
                        </button>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <button className="w-full">
                          <Archive className="h-4 w-4" />
                          <span>Archive Project</span>
                        </button>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>

              <SidebarGroup>
                <SidebarGroupLabel>Filter Models</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <button className="w-full">
                          <Search className="h-4 w-4" />
                          <span>Discover Phase</span>
                        </button>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <button className="w-full">
                          <PenTool className="h-4 w-4" />
                          <span>Define Phase</span>
                        </button>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <button className="w-full">
                          <Code className="h-4 w-4" />
                          <span>Develop Phase</span>
                        </button>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <button className="w-full">
                          <Truck className="h-4 w-4" />
                          <span>Deliver Phase</span>
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
                        <Link href="/projects">
                          <FolderOpen className="h-4 w-4" />
                          <span>Back to Projects</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <button className="w-full">
                          <Plus className="h-4 w-4" />
                          <span>Add New Model</span>
                        </button>
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
                    <Link href="/projects" className="hover:text-design4-primary transition-colors">Projects</Link>
                    <span>/</span>
                    <span className="text-design4-ink">{project.name}</span>
                  </nav>
                </div>
              </section>

              {/* Metadata Cards */}
              <section className="bg-design4-bg py-4">
                <div className="mx-auto max-w-design4-container px-6">
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                    <Card>
                      <CardContent className="p-3 text-center">
                        <div className="flex items-center justify-center gap-2 mb-1">
                          <Building className="h-4 w-4 text-design4-primary" />
                          <div className="text-xs font-medium text-design4-neutral-400">Company</div>
                        </div>
                        {isEditingCompany ? (
                          <div className="space-y-2">
                            <Input
                              value={editedCompany}
                              onChange={(e) => setEditedCompany(e.target.value)}
                              className="text-sm text-center transition-all duration-200 ease-in-out min-h-[32px]"
                              placeholder="Enter company name"
                            />
                            <div className="flex gap-2 justify-center">
                              <Button size="sm" variant="ghost" onClick={handleSaveCompany} className="h-6 px-2" disabled={isSavingCompany}>
                                {isSavingCompany ? (
                                  <Loader2 className="h-3 w-3 animate-spin" />
                                ) : (
                                  <Save className="h-3 w-3" />
                                )}
                              </Button>
                              <Button size="sm" variant="ghost" onClick={handleCancelCompany} className="h-6 px-2">
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div
                            className="text-sm font-semibold text-design4-ink cursor-pointer hover:text-design4-primary transition-colors"
                            onClick={handleEditCompany}
                            title="Click to edit"
                          >
                            {project.company}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-3 text-center">
                        <div className="flex items-center justify-center gap-2 mb-1">
                          <BarChart className="h-4 w-4 text-design4-primary" />
                          <div className="text-xs font-medium text-design4-neutral-400">Total Models</div>
                        </div>
                        <div className="text-sm font-semibold text-design4-ink">{models.length}</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-3 text-center">
                        <div className="flex items-center justify-center gap-2 mb-1">
                          <Target className="h-4 w-4 text-design4-primary" />
                          <div className="text-xs font-medium text-design4-neutral-400">Active Phase</div>
                        </div>
                        <div className="text-sm font-semibold text-design4-ink capitalize">{project.phase}</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-3 text-center">
                        <div className="flex items-center justify-center gap-2 mb-1">
                          <CheckCircle className="h-4 w-4 text-design4-primary" />
                          <div className="text-xs font-medium text-design4-neutral-400">Status</div>
                        </div>
                        <div className="text-sm font-semibold text-design4-ink capitalize">{project.status}</div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </section>

              {/* Project Header */}
              <section className="bg-design4-bg py-6">
                <div className="mx-auto max-w-design4-container px-6">
                  <div className="grid grid-cols-[1fr,auto] gap-6 items-start">
                    {/* Left Column */}
                    <div className="min-w-0">
                      <h1 className="text-3xl lg:text-4xl font-bold text-design4-ink leading-tight mb-3 whitespace-nowrap overflow-hidden text-ellipsis">
                        {project.name}
                      </h1>
                      {isEditingShortDescription ? (
                        <div className="mb-4">
                          <Input
                            value={editedShortDescription}
                            onChange={(e) => setEditedShortDescription(e.target.value)}
                            className="text-sm transition-all duration-200 ease-in-out"
                            placeholder="Enter short description"
                          />
                          <div className="flex gap-2 mt-2">
                            <Button size="sm" variant="ghost" onClick={handleSaveShortDescription} className="h-6 px-2" disabled={isSavingShortDescription}>
                              {isSavingShortDescription ? (
                                <Loader2 className="h-3 w-3 animate-spin" />
                              ) : (
                                <Save className="h-3 w-3" />
                              )}
                            </Button>
                            <Button size="sm" variant="ghost" onClick={handleCancelShortDescription} className="h-6 px-2">
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <p
                          className="text-sm text-design4-neutral-500 mb-4 whitespace-nowrap overflow-hidden text-ellipsis cursor-pointer hover:text-design4-primary transition-colors"
                          onClick={handleEditShortDescription}
                          title="Click to edit"
                        >
                          {project.shortDescription}
                        </p>
                      )}
                    </div>

                    {/* Right Column */}
                    <div className="flex-shrink-0">
                      {/* Circular Progress with Last Modified below */}
                      <div className="text-center">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="relative w-16 h-16">
                            <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 64 64">
                              <circle
                                cx="32"
                                cy="32"
                                r="28"
                                fill="none"
                                stroke="#e5e7eb"
                                strokeWidth="4"
                              />
                              <circle
                                cx="32"
                                cy="32"
                                r="28"
                                fill="none"
                                stroke="#3b82f6"
                                strokeWidth="4"
                                strokeDasharray={`${2 * Math.PI * 28}`}
                                strokeDashoffset={`${2 * Math.PI * 28 * (1 - calculateProgress() / 100)}`}
                                strokeLinecap="round"
                                className="transition-all duration-300"
                              />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className="text-sm font-semibold text-design4-ink">{calculateProgress()}%</span>
                            </div>
                          </div>
                          <div className="text-left">
                            <div className="text-sm font-medium text-design4-ink">Overall Progress</div>
                            <div className="text-xs text-design4-neutral-500">{calculateProgress()}% Complete</div>
                          </div>
                        </div>

                        {/* Last Modified */}
                        <div className="flex items-center justify-center text-sm text-design4-neutral-500">
                          <Clock className="h-4 w-4 mr-2" />
                          <div className="text-left">
                            <div className="text-xs text-design4-neutral-400">Last modified</div>
                            <div className="text-sm">{project.lastModified}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Project Description and Planning Notes */}
              <section className="bg-design4-bg py-3">
                <div className="mx-auto max-w-design4-container px-6">
                  <div className="grid lg:grid-cols-2 gap-4">
                    {/* Project Description */}
                    <Card className="bg-design4-primary/5 border-design4-primary/20">
                      <CardHeader className="pb-2 pt-3 px-4">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-base">Project Description</CardTitle>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setExpandedDescription(!expandedDescription)}
                            className="h-6 w-6 p-0"
                          >
                            {expandedDescription ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                          </Button>
                        </div>
                      </CardHeader>
                      {expandedDescription && (
                        <CardContent className="pt-0 px-4 pb-3">
                          <Textarea
                            value={isEditingDescription ? editedDescription : project.detailedDescription}
                            readOnly={!isEditingDescription}
                            onChange={(e) => setEditedDescription(e.target.value)}
                            className="min-h-[100px] resize-none transition-all duration-200 ease-in-out bg-white"
                          />
                          <div className="flex flex-col sm:flex-row gap-2 mt-2">
                            {isEditingDescription ? (
                              <>
                                <Button size="sm" onClick={handleSaveDescription} disabled={isSavingDescription} className="w-full sm:w-auto bg-design4-green hover:bg-design4-green/90">
                                  {isSavingDescription ? (
                                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                  ) : (
                                    <Save className="h-4 w-4 mr-2" />
                                  )}
                                  {isSavingDescription ? 'Saving...' : 'Save'}
                                </Button>
                                <Button size="sm" variant="outline" onClick={handleCancelDescription} className="w-full sm:w-auto">
                                  <X className="h-4 w-4 mr-2" />
                                  Cancel
                                </Button>
                              </>
                            ) : (
                              <Button size="sm" onClick={handleEditDescription} className="w-full sm:w-auto bg-design4-primary hover:bg-design4-primary/90 text-white">
                                <Edit3 className="h-4 w-4 mr-2" />
                                Edit Description
                              </Button>
                            )}
                          </div>
                        </CardContent>
                      )}
                    </Card>

                    {/* Planning Notes */}
                    <Card className="bg-design4-primary/5 border-design4-primary/20">
                      <CardHeader className="pb-2 pt-3 px-4">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-base flex items-center">
                            <StickyNote className="h-4 w-4 mr-2" />
                            Planning Notes
                          </CardTitle>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setExpandedNotes(!expandedNotes)}
                            className="h-6 w-6 p-0"
                          >
                            {expandedNotes ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                          </Button>
                        </div>
                      </CardHeader>
                      {expandedNotes && (
                        <CardContent className="pt-0 px-4 pb-3">
                          <Textarea
                            value={isEditingNotes ? editedNotes : project.planningNotes}
                            readOnly={!isEditingNotes}
                            onChange={(e) => setEditedNotes(e.target.value)}
                            className="min-h-[120px] resize-none transition-all duration-200 ease-in-out bg-white"
                            placeholder={isEditingNotes ? "Add your planning notes here..." : ""}
                          />
                          <div className="flex flex-col sm:flex-row gap-2 mt-2">
                            {isEditingNotes ? (
                              <>
                                <Button size="sm" onClick={handleSaveNotes} disabled={isSavingNotes} className="w-full sm:w-auto bg-design4-green hover:bg-design4-green/90">
                                  {isSavingNotes ? (
                                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                  ) : (
                                    <Save className="h-4 w-4 mr-2" />
                                  )}
                                  {isSavingNotes ? 'Saving...' : 'Save'}
                                </Button>
                                <Button size="sm" variant="outline" onClick={handleCancelNotes} className="w-full sm:w-auto">
                                  <X className="h-4 w-4 mr-2" />
                                  Cancel
                                </Button>
                              </>
                            ) : (
                              <Button size="sm" onClick={handleEditNotes} className="w-full sm:w-auto bg-design4-primary hover:bg-design4-primary/90 text-white">
                                <Edit3 className="h-4 w-4 mr-2" />
                                Edit Notes
                              </Button>
                            )}
                          </div>
                        </CardContent>
                      )}
                    </Card>
                  </div>
                </div>
              </section>

              {/* Models Table */}
              <section className="bg-design4-bg py-8">
                <div className="mx-auto max-w-design4-container px-6">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-xl">Project Models</CardTitle>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button className="bg-design4-primary hover:bg-design4-primary/90" disabled={isCreatingModel}>
                              <Plus className="h-4 w-4 mr-2" />
                              {isCreatingModel ? 'Creating...' : 'Add Model'}
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-56">
                            <DropdownMenuLabel>Discover Phase</DropdownMenuLabel>
                            {modelTypes.discover.map((model) => (
                              <DropdownMenuItem
                                key={model.type}
                                onClick={() => handleCreateModel(model.type, model.name)}
                                className="flex items-center gap-2"
                              >
                                <Search className="h-4 w-4 text-design4-gold" />
                                {model.name}
                              </DropdownMenuItem>
                            ))}

                            <DropdownMenuSeparator />
                            <DropdownMenuLabel>Define Phase</DropdownMenuLabel>
                            {modelTypes.define.map((model) => (
                              <DropdownMenuItem
                                key={model.type}
                                onClick={() => handleCreateModel(model.type, model.name)}
                                className="flex items-center gap-2"
                              >
                                <PenTool className="h-4 w-4 text-design4-purple" />
                                {model.name}
                              </DropdownMenuItem>
                            ))}

                            <DropdownMenuSeparator />
                            <DropdownMenuLabel>Develop Phase</DropdownMenuLabel>
                            {modelTypes.develop.map((model) => (
                              <DropdownMenuItem
                                key={model.type}
                                onClick={() => handleCreateModel(model.type, model.name)}
                                className="flex items-center gap-2"
                              >
                                <Code className="h-4 w-4 text-design4-green" />
                                {model.name}
                              </DropdownMenuItem>
                            ))}

                            <DropdownMenuSeparator />
                            <DropdownMenuLabel>Deliver Phase</DropdownMenuLabel>
                            {modelTypes.deliver.map((model) => (
                              <DropdownMenuItem
                                key={model.type}
                                onClick={() => handleCreateModel(model.type, model.name)}
                                className="flex items-center gap-2"
                              >
                                <Truck className="h-4 w-4 text-design4-orange" />
                                {model.name}
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <CardDescription>
                        Manage and track all models associated with this project
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead
                              className="cursor-pointer select-none hover:bg-design4-neutral-50 focus-within:bg-design4-neutral-50"
                              onClick={() => handleSort('name')}
                              tabIndex={0}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                  e.preventDefault()
                                  handleSort('name')
                                }
                              }}
                              role="button"
                              aria-label={`Sort by Model Name ${sortField === 'name' ? (sortDirection === 'asc' ? 'descending' : 'ascending') : 'ascending'}`}
                            >
                              <div className="flex items-center gap-1">
                                Model Name
                                <div className="flex flex-col" aria-hidden="true">
                                  <ChevronUp
                                    className={`h-3 w-3 transition-colors ${
                                      sortField === 'name' && sortDirection === 'asc'
                                        ? 'text-design4-primary'
                                        : 'text-gray-300'
                                    }`}
                                  />
                                  <ChevronDown
                                    className={`h-3 w-3 -mt-1 transition-colors ${
                                      sortField === 'name' && sortDirection === 'desc'
                                        ? 'text-design4-primary'
                                        : 'text-gray-300'
                                    }`}
                                  />
                                </div>
                              </div>
                            </TableHead>
                            <TableHead
                              className="cursor-pointer select-none hover:bg-design4-neutral-50 focus-within:bg-design4-neutral-50"
                              onClick={() => handleSort('phase')}
                              tabIndex={0}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                  e.preventDefault()
                                  handleSort('phase')
                                }
                              }}
                              role="button"
                              aria-label={`Sort by Phase ${sortField === 'phase' ? (sortDirection === 'asc' ? 'descending' : 'ascending') : 'ascending'}`}
                            >
                              <div className="flex items-center gap-1">
                                Phase
                                <div className="flex flex-col" aria-hidden="true">
                                  <ChevronUp
                                    className={`h-3 w-3 transition-colors ${
                                      sortField === 'phase' && sortDirection === 'asc'
                                        ? 'text-design4-primary'
                                        : 'text-gray-300'
                                    }`}
                                  />
                                  <ChevronDown
                                    className={`h-3 w-3 -mt-1 transition-colors ${
                                      sortField === 'phase' && sortDirection === 'desc'
                                        ? 'text-design4-primary'
                                        : 'text-gray-300'
                                    }`}
                                  />
                                </div>
                              </div>
                            </TableHead>
                            <TableHead
                              className="cursor-pointer select-none hover:bg-design4-neutral-50 focus-within:bg-design4-neutral-50"
                              onClick={() => handleSort('status')}
                              tabIndex={0}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                  e.preventDefault()
                                  handleSort('status')
                                }
                              }}
                              role="button"
                              aria-label={`Sort by Status ${sortField === 'status' ? (sortDirection === 'asc' ? 'descending' : 'ascending') : 'ascending'}`}
                            >
                              <div className="flex items-center gap-1">
                                Status
                                <div className="flex flex-col" aria-hidden="true">
                                  <ChevronUp
                                    className={`h-3 w-3 transition-colors ${
                                      sortField === 'status' && sortDirection === 'asc'
                                        ? 'text-design4-primary'
                                        : 'text-gray-300'
                                    }`}
                                  />
                                  <ChevronDown
                                    className={`h-3 w-3 -mt-1 transition-colors ${
                                      sortField === 'status' && sortDirection === 'desc'
                                        ? 'text-design4-primary'
                                        : 'text-gray-300'
                                    }`}
                                  />
                                </div>
                              </div>
                            </TableHead>
                            <TableHead>Notes</TableHead>
                            <TableHead
                              className="cursor-pointer select-none hover:bg-design4-neutral-50 focus-within:bg-design4-neutral-50"
                              onClick={() => handleSort('lastModified')}
                              tabIndex={0}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                  e.preventDefault()
                                  handleSort('lastModified')
                                }
                              }}
                              role="button"
                              aria-label={`Sort by Last Modified ${sortField === 'lastModified' ? (sortDirection === 'asc' ? 'descending' : 'ascending') : 'descending'}`}
                            >
                              <div className="flex items-center gap-1">
                                Last Modified
                                <div className="flex flex-col" aria-hidden="true">
                                  <ChevronUp
                                    className={`h-3 w-3 transition-colors ${
                                      sortField === 'lastModified' && sortDirection === 'asc'
                                        ? 'text-design4-primary'
                                        : 'text-gray-300'
                                    }`}
                                  />
                                  <ChevronDown
                                    className={`h-3 w-3 -mt-1 transition-colors ${
                                      sortField === 'lastModified' && sortDirection === 'desc'
                                        ? 'text-design4-primary'
                                        : 'text-gray-300'
                                    }`}
                                  />
                                </div>
                              </div>
                            </TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {sortModels(models).map((model) => (
                            <TableRow key={model.id} className="hover:bg-design4-neutral-50">
                              <TableCell>
                                <button
                                  className="text-design4-primary hover:text-design4-primary/80 font-medium text-left hover:underline transition-all"
                                  onClick={() => handleModelClick(model)}
                                  title={`Open ${model.name} in ${getModelToolPath(model.type).split('/').pop()?.replace('-tool', '').replace('-', ' ')}`}
                                >
                                  {model.name}
                                </button>
                              </TableCell>
                              <TableCell>
                                <Badge className={`text-xs ${getPhaseColor(model.phase)}`}>
                                  {getPhaseIcon(model.phase)}
                                  <span className="ml-1 capitalize">{model.phase}</span>
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <Select
                                  value={model.status}
                                  onValueChange={(value) => handleStatusUpdate(model.id, value)}
                                >
                                  <SelectTrigger className="w-32">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="not_started">Not Started</SelectItem>
                                    <SelectItem value="in_progress">In Progress</SelectItem>
                                    <SelectItem value="draft">Draft</SelectItem>
                                    <SelectItem value="published">Published</SelectItem>
                                  </SelectContent>
                                </Select>
                              </TableCell>
                              <TableCell className="max-w-xs">
                                <span className="text-sm text-design4-neutral-600 truncate">
                                  {model.notes || "No notes"}
                                </span>
                              </TableCell>
                              <TableCell className="text-sm text-design4-neutral-500">
                                {model.lastModified}
                              </TableCell>
                              <TableCell>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="sm">
                                      <MoreVertical className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem>
                                      <Edit3 className="mr-2 h-4 w-4" />
                                      Edit
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleDuplicateModel(model.id)}>
                                      <Copy className="mr-2 h-4 w-4" />
                                      Duplicate
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                      onClick={() => handleDeleteModel(model.id)}
                                      className="text-red-600 focus:text-red-600"
                                    >
                                      <Trash2 className="mr-2 h-4 w-4" />
                                      Delete
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </div>
              </section>
            </main>
          </SidebarInset>
        </div>
      </SidebarProvider>

      <Footer />

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Model</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this model? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => {
              setShowDeleteDialog(false)
              setModelToDelete(null)
            }}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDeleteModel}
              className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Toaster />
    </>
  )
}