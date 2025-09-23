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
import { BookOpen, Target, BarChart, Users, TrendingUp, Lightbulb, Search, PenTool, Code, Truck, Wrench, FolderOpen, Folder } from 'lucide-react'

// Metadata moved to layout.tsx for client component

export default function Resources() {
  return (
    <>
      <Navigation />

      {/* Content with Sidebar */}
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
                <BookOpen className="h-5 w-5" />
                <span className="text-sm font-semibold">Design4 Resources</span>
              </button>
            </SidebarHeader>
            <SidebarContent className="overflow-y-auto flex-1">
              <SidebarGroup>
                <SidebarGroupLabel>Projects</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Link href="/projects">
                          <FolderOpen className="h-4 w-4" />
                          <span>My Projects</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>

              <SidebarGroup>
                <SidebarGroupLabel>Interactive Tools</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Link href="/resources/tools">
                          <Wrench className="h-4 w-4" />
                          <span>All Tools</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Link href="/resources/tools#discover">
                          <Search className="h-4 w-4" />
                          <span>Discover Tools</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Link href="/resources/tools#define">
                          <PenTool className="h-4 w-4" />
                          <span>Define Tools</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Link href="/resources/tools#develop">
                          <Code className="h-4 w-4" />
                          <span>Develop Tools</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Link href="/resources/tools#deliver">
                          <Truck className="h-4 w-4" />
                          <span>Deliver Tools</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>

              <SidebarGroup>
                <SidebarGroupLabel>Playbooks</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Link href="/resources/playbooks">
                          <BookOpen className="h-4 w-4" />
                          <span>All Playbooks</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Link href="/resources/playbooks#discover">
                          <Search className="h-4 w-4" />
                          <span>Discover Playbooks</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Link href="/resources/playbooks#define">
                          <PenTool className="h-4 w-4" />
                          <span>Define Playbooks</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Link href="/resources/playbooks#develop">
                          <Code className="h-4 w-4" />
                          <span>Develop Playbooks</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Link href="/resources/playbooks#deliver">
                          <Truck className="h-4 w-4" />
                          <span>Deliver Playbooks</span>
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
              <span className="text-design4-ink">Resources</span>
            </nav>
          </div>
        </section>

        {/* Header Section */}
        <section className="bg-design4-bg py-16">
          <div className="mx-auto max-w-design4-container px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold text-design4-ink leading-tight mb-6">
                  Everything You Need to Implement Design4
                </h1>
                <p className="text-lg text-design4-neutral-500 mb-8 leading-relaxed">
                  Access our complete library of tools, templates, and playbooks to accelerate your Design4 implementation and maximize your transformation success.
                </p>
                <div className="flex items-center gap-4">
                  <input
                    type="email"
                    placeholder="What's your work email?"
                    className="flex-1 px-4 py-3 border border-design4-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-design4-primary focus:border-transparent"
                  />
                  <button className="bg-design4-ink text-white px-6 py-3 rounded-xl font-medium hover:bg-design4-ink/90 transition-colors whitespace-nowrap">
                    Get Started →
                  </button>
                </div>
              </div>

              {/* Right Featured Resource */}
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-design4-neutral-100">
                <div className="text-sm text-design4-neutral-500 mb-4">Featured Resource</div>
                <div className="w-16 h-16 bg-design4-gold/10 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                  <svg className="w-8 h-8 text-design4-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-design4-ink mb-4 text-center">
                  Outcomes Model Development Playbook
                </h3>
                <p className="text-design4-neutral-500 text-sm mb-6 leading-relaxed">
                  The complete guide to developing and implementing an effective outcomes model that aligns organizational purpose with customer needs and strategic goals, ensuring measurable business results.
                </p>
                <Link
                  href="/resources/outcomes-model-development"
                  className="block w-full bg-design4-gold text-design4-ink px-4 py-3 rounded-xl font-medium hover:bg-design4-gold/90 transition-colors text-center"
                >
                  Access Playbook →
                </Link>
              </div>
            </div>
          </div>
        </section>



        {/* Framework Overview */}
        <section className="bg-design4-neutral-100 py-20">
          <div className="mx-auto max-w-design4-container px-6">
            <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-sm border border-design4-neutral-100">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-design4-ink mb-4">Why Design4 Works</h2>
                <p className="text-design4-neutral-500 max-w-2xl mx-auto">
                  The Design4 framework delivers measurable results by addressing the core challenges of business alignment and execution
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-xl font-bold text-design4-ink mb-6 flex items-center">
                    <div className="w-8 h-8 bg-design4-green/10 rounded-lg flex items-center justify-center mr-3">
                      <svg className="w-5 h-5 text-design4-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    Key Benefits
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="w-6 h-6 bg-design4-green/10 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                        <svg className="w-3 h-3 text-design4-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-design4-neutral-500">Connect organizational purpose to daily operations</span>
                    </div>
                    <div className="flex items-start">
                      <div className="w-6 h-6 bg-design4-green/10 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                        <svg className="w-3 h-3 text-design4-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-design4-neutral-500">Respond quickly to market changes without losing strategic coherence</span>
                    </div>
                    <div className="flex items-start">
                      <div className="w-6 h-6 bg-design4-green/10 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                        <svg className="w-3 h-3 text-design4-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-design4-neutral-500">Focus resources on activities that drive measurable outcomes</span>
                    </div>
                    <div className="flex items-start">
                      <div className="w-6 h-6 bg-design4-green/10 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                        <svg className="w-3 h-3 text-design4-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-design4-neutral-500">Build long-term competitive advantage through systematic improvement</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-design4-ink mb-6 flex items-center">
                    <div className="w-8 h-8 bg-design4-primary/10 rounded-lg flex items-center justify-center mr-3">
                      <svg className="w-5 h-5 text-design4-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                    What Makes Design4 Different
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="w-6 h-6 bg-design4-primary/10 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                        <svg className="w-3 h-3 text-design4-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                      <span className="text-design4-neutral-500">Continuous Design Mindset: Iterate and adapt continuously</span>
                    </div>
                    <div className="flex items-start">
                      <div className="w-6 h-6 bg-design4-primary/10 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                        <svg className="w-3 h-3 text-design4-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                      <span className="text-design4-neutral-500">Integration Patterns: Prevent common strategy traps</span>
                    </div>
                    <div className="flex items-start">
                      <div className="w-6 h-6 bg-design4-primary/10 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                        <svg className="w-3 h-3 text-design4-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                      <span className="text-design4-neutral-500">Outcome-First Operations: Enable stakeholder success</span>
                    </div>
                    <div className="flex items-start">
                      <div className="w-6 h-6 bg-design4-primary/10 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                        <svg className="w-3 h-3 text-design4-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                      <span className="text-design4-neutral-500">Evidence-Based Decisions: Ground choices in data and feedback</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Get Started CTA */}
        <section className="bg-design4-primary py-20">
          <div className="mx-auto max-w-design4-container px-6">
            <div className="text-center">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                Ready to Get Started?
              </h2>
              <p className="text-lg text-white/90 max-w-2xl mx-auto mb-8">
                Begin your Design4 journey today. Take the assessment to understand your current state or dive straight into the framework.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/design4assessment"
                  className="inline-flex items-center justify-center bg-white text-design4-primary px-8 py-4 rounded-2xl font-medium text-lg hover:bg-gray-50 hover:transform hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-design4-gold focus:ring-offset-2 focus:ring-offset-design4-primary"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  Take the Assessment
                </Link>
                <Link 
                  href="/ai-strategy"
                  className="inline-flex items-center justify-center text-white font-medium text-lg hover:text-white/80 transition-colors"
                >
                  Try Design4 Assistant →
                </Link>
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