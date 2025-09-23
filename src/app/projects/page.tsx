'use client'

import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
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
  Clock
} from 'lucide-react'

export default function ProjectsPage() {
  const mockProjects = [
    {
      id: 1,
      name: "Digital Transformation Initiative",
      description: "Comprehensive strategy to modernize operations and improve customer experience through digital channels.",
      status: "active",
      phase: "develop",
      lastModified: "2 hours ago",
      models: ["Outcomes Model", "Capability Assessment", "Process Design"],
      progress: 75
    },
    {
      id: 2,
      name: "Market Expansion Strategy",
      description: "Strategic framework for entering new geographic markets while maintaining operational excellence.",
      status: "planning",
      phase: "define",
      lastModified: "1 day ago",
      models: ["Strategy Canvas", "Market Analysis"],
      progress: 45
    },
    {
      id: 3,
      name: "Customer Experience Redesign",
      description: "End-to-end customer journey optimization to increase satisfaction and reduce churn.",
      status: "active",
      phase: "deliver",
      lastModified: "3 days ago",
      models: ["Customer Journey Map", "Performance Metrics", "Value Delivery Framework"],
      progress: 90
    },
    {
      id: 4,
      name: "Operational Excellence Program",
      description: "Systematic approach to improve operational efficiency and reduce costs across all departments.",
      status: "completed",
      phase: "deliver",
      lastModified: "1 week ago",
      models: ["Operations Dashboard", "Process Optimization", "Continuous Improvement"],
      progress: 100
    },
    {
      id: 5,
      name: "Innovation Lab Setup",
      description: "Framework for establishing an innovation lab to drive future growth initiatives.",
      status: "draft",
      phase: "discover",
      lastModified: "2 weeks ago",
      models: ["Innovation Framework"],
      progress: 15
    }
  ]

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
                        <button className="w-full">
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

              {/* Header Section */}
              <section className="bg-design4-bg py-16">
                <div className="mx-auto max-w-design4-container px-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
                    <div>
                      <h1 className="text-4xl lg:text-5xl font-bold text-design4-ink leading-tight mb-4">
                        My Projects
                      </h1>
                      <p className="text-lg text-design4-neutral-500 max-w-2xl">
                        Manage your Design4 implementation projects. Create, track, and optimize your strategic initiatives using our comprehensive framework and tools.
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button className="bg-design4-primary hover:bg-design4-primary/90 text-white">
                        <Plus className="h-4 w-4 mr-2" />
                        New Project
                      </Button>
                      <Button variant="outline" className="border-design4-neutral-200">
                        <Filter className="h-4 w-4 mr-2" />
                        Filter
                      </Button>
                    </div>
                  </div>
                </div>
              </section>

              {/* Projects Grid */}
              <section className="bg-design4-bg py-12">
                <div className="mx-auto max-w-design4-container px-6">
                  {/* Search Bar */}
                  <div className="mb-8">
                    <div className="relative max-w-md">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-design4-neutral-400" />
                      <input
                        type="text"
                        placeholder="Search projects..."
                        className="w-full pl-10 pr-4 py-3 border border-design4-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-design4-primary focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Projects Grid */}
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {mockProjects.map((project) => (
                      <Card key={project.id} className="hover:shadow-lg transition-shadow duration-200 cursor-pointer group">
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <CardTitle className="text-lg font-semibold text-design4-ink group-hover:text-design4-primary transition-colors">
                                {project.name}
                              </CardTitle>
                            </div>
                            <button className="p-1 hover:bg-design4-neutral-100 rounded opacity-0 group-hover:opacity-100 transition-opacity">
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

                          {/* Models */}
                          <div className="mb-4">
                            <div className="text-xs text-design4-neutral-500 mb-2">Models Used:</div>
                            <div className="flex flex-wrap gap-1">
                              {project.models.map((model, index) => (
                                <span key={index} className="text-xs bg-design4-neutral-100 text-design4-neutral-600 px-2 py-1 rounded">
                                  {model}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Footer */}
                          <div className="flex items-center justify-between pt-3 border-t border-design4-neutral-100">
                            <div className="flex items-center text-xs text-design4-neutral-500">
                              <Clock className="h-3 w-3 mr-1" />
                              {project.lastModified}
                            </div>
                            <div className="flex items-center gap-2">
                              <button className="p-1 hover:bg-design4-neutral-100 rounded transition-colors">
                                <Edit3 className="h-4 w-4 text-design4-neutral-500" />
                              </button>
                              <button className="p-1 hover:bg-red-50 rounded transition-colors">
                                <Trash2 className="h-4 w-4 text-red-500" />
                              </button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}

                    {/* Create New Project Card */}
                    <Card className="border-2 border-dashed border-design4-neutral-200 hover:border-design4-primary transition-colors cursor-pointer group">
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

      <Footer />
    </>
  )
}