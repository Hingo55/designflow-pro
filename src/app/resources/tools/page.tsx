'use client'

import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Link from 'next/link'
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
import { BookOpen, Target, BarChart, Users, TrendingUp, Lightbulb, Search, PenTool, Code, Truck, Heart } from 'lucide-react'

export default function ToolsPage() {
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
                className="flex items-center gap-2 px-2 py-1 hover:opacity-80 transition-opacity w-full text-left mb-3"
              >
                <BookOpen className="h-5 w-5" />
                <span className="text-sm font-semibold">Design4 Tools</span>
              </button>
              <p className="px-2 text-xs text-design4-neutral-600 leading-relaxed">
                Interactive tools to help you implement the Design4 framework and drive measurable business results.
              </p>
            </SidebarHeader>
            <SidebarContent className="overflow-y-auto flex-1">
              <SidebarGroup>
                <SidebarGroupLabel>Framework Phases</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <a href="#discover">
                          <Search className="h-4 w-4" />
                          <span>Discover</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <a href="#define">
                          <PenTool className="h-4 w-4" />
                          <span>Define</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <a href="#develop">
                          <Code className="h-4 w-4" />
                          <span>Develop</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <a href="#deliver">
                          <Truck className="h-4 w-4" />
                          <span>Deliver</span>
                        </a>
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

            {/* Main Content Area */}
            <section id="top" className="bg-design4-bg py-12 scroll-mt-24">
              <div className="mx-auto max-w-design4-container px-6">

                {/* Discover Section */}
                <section id="discover" className="mb-12 scroll-mt-24 bg-design4-gold/5 rounded-2xl p-8">
                  <div className="text-center mb-8">
                    <div className="flex items-center justify-center gap-3 mb-3">
                      <div className="w-12 h-12 bg-design4-gold/20 rounded-xl flex items-center justify-center">
                        <Search className="w-5 h-5 text-design4-gold" />
                      </div>
                      <h2 className="text-2xl lg:text-3xl font-bold text-design4-ink">Discover</h2>
                    </div>
                    <p className="text-sm lg:text-base text-design4-neutral-600 max-w-xl mx-auto">
                      Tools to help you understand your purpose, identify opportunities, and define strategic direction.
                    </p>
                  </div>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-design4-neutral-100 hover:shadow-md transition-shadow">
                      <div className="w-10 h-10 bg-design4-gold/10 rounded-lg flex items-center justify-center mb-3">
                        <Target className="w-5 h-5 text-design4-gold" />
                      </div>
                      <h3 className="text-lg font-bold text-design4-ink mb-2">Outcomes Model Tool</h3>
                      <p className="text-sm text-design4-neutral-600 mb-3 leading-relaxed">
                        Build effective outcomes models that align organizational purpose with customer needs and strategic goals.
                      </p>
                      <Link
                        href="/resources/tools/outcomes-model-tool"
                        className="inline-flex items-center bg-design4-gold text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-design4-gold/90 transition-colors"
                      >
                        Access Tool →
                      </Link>
                    </div>

                    {/* Placeholder for future Discover tools */}
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-design4-neutral-100 opacity-50">
                      <div className="w-10 h-10 bg-design4-gold/10 rounded-lg flex items-center justify-center mb-3">
                        <Search className="w-5 h-5 text-design4-gold" />
                      </div>
                      <h3 className="text-lg font-bold text-design4-ink mb-2">Market Research Tool</h3>
                      <p className="text-sm text-design4-neutral-600 mb-3 leading-relaxed">
                        Systematic approach to understanding market dynamics and competitive landscape.
                      </p>
                      <span className="inline-flex items-center bg-design4-neutral-200 text-design4-neutral-500 px-3 py-1.5 rounded-lg text-sm font-medium">
                        Coming Soon
                      </span>
                    </div>

                    <div className="bg-white rounded-xl p-4 shadow-sm border border-design4-neutral-100 opacity-50">
                      <div className="w-10 h-10 bg-design4-gold/10 rounded-lg flex items-center justify-center mb-3">
                        <Lightbulb className="w-5 h-5 text-design4-gold" />
                      </div>
                      <h3 className="text-lg font-bold text-design4-ink mb-2">Opportunity Assessment</h3>
                      <p className="text-sm text-design4-neutral-600 mb-3 leading-relaxed">
                        Identify and evaluate strategic opportunities for growth and innovation.
                      </p>
                      <span className="inline-flex items-center bg-design4-neutral-200 text-design4-neutral-500 px-3 py-1.5 rounded-lg text-sm font-medium">
                        Coming Soon
                      </span>
                    </div>
                  </div>
                </section>

                {/* Define Section */}
                <section id="define" className="mb-12 scroll-mt-24 bg-design4-purple/5 rounded-2xl p-8">
                  <div className="text-center mb-8">
                    <div className="flex items-center justify-center gap-3 mb-3">
                      <div className="w-12 h-12 bg-design4-purple/20 rounded-xl flex items-center justify-center">
                        <PenTool className="w-5 h-5 text-design4-purple" />
                      </div>
                      <h2 className="text-2xl lg:text-3xl font-bold text-design4-ink">Define</h2>
                    </div>
                    <p className="text-sm lg:text-base text-design4-neutral-600 max-w-xl mx-auto">
                      Tools to help you create clear value propositions and define what you're building.
                    </p>
                  </div>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-design4-neutral-100 hover:shadow-md transition-shadow">
                      <div className="w-12 h-12 bg-design4-purple/10 rounded-xl flex items-center justify-center mb-4">
                        <Heart className="w-5 h-5 text-design4-purple" />
                      </div>
                      <h3 className="text-lg font-bold text-design4-ink mb-2">Value Proposition Tool</h3>
                      <p className="text-sm text-design4-neutral-600 mb-3 leading-relaxed">
                        Create compelling value propositions by mapping customer jobs, pains, and gains.
                      </p>
                      <Link
                        href="/resources/tools/value-proposition-tool"
                        className="inline-flex items-center bg-design4-purple text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-design4-purple/90 transition-colors"
                      >
                        Access Tool →
                      </Link>
                    </div>

                    {/* Placeholder for future Define tools */}
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-design4-neutral-100 opacity-50">
                      <div className="w-12 h-12 bg-design4-purple/10 rounded-xl flex items-center justify-center mb-4">
                        <Target className="w-5 h-5 text-design4-purple" />
                      </div>
                      <h3 className="text-lg font-bold text-design4-ink mb-2">Product Definition Tool</h3>
                      <p className="text-sm text-design4-neutral-600 mb-3 leading-relaxed">
                        Define your product features, requirements, and success criteria.
                      </p>
                      <span className="inline-flex items-center bg-design4-neutral-200 text-design4-neutral-500 px-3 py-1.5 rounded-lg text-sm font-medium">
                        Coming Soon
                      </span>
                    </div>

                    <div className="bg-white rounded-xl p-4 shadow-sm border border-design4-neutral-100 opacity-50">
                      <div className="w-12 h-12 bg-design4-purple/10 rounded-xl flex items-center justify-center mb-4">
                        <Users className="w-5 h-5 text-design4-purple" />
                      </div>
                      <h3 className="text-lg font-bold text-design4-ink mb-2">Persona Builder</h3>
                      <p className="text-sm text-design4-neutral-600 mb-3 leading-relaxed">
                        Create detailed customer personas to guide design and development decisions.
                      </p>
                      <span className="inline-flex items-center bg-design4-neutral-200 text-design4-neutral-500 px-3 py-1.5 rounded-lg text-sm font-medium">
                        Coming Soon
                      </span>
                    </div>
                  </div>
                </section>

                {/* Develop Section */}
                <section id="develop" className="mb-12 scroll-mt-24 bg-design4-green/5 rounded-2xl p-8">
                  <div className="text-center mb-8">
                    <div className="flex items-center justify-center gap-3 mb-3">
                      <div className="w-12 h-12 bg-design4-green/20 rounded-xl flex items-center justify-center">
                        <Code className="w-5 h-5 text-design4-green" />
                      </div>
                      <h2 className="text-2xl lg:text-3xl font-bold text-design4-ink">Develop</h2>
                    </div>
                    <p className="text-sm lg:text-base text-design4-neutral-600 max-w-xl mx-auto">
                      Tools to help you build, test, and iterate on your solutions effectively.
                    </p>
                  </div>
                  <div className="grid md:grid-cols-3 gap-6">
                    {/* Placeholder for future Develop tools */}
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-design4-neutral-100 opacity-50">
                      <div className="w-12 h-12 bg-design4-green/10 rounded-xl flex items-center justify-center mb-4">
                        <Code className="w-5 h-5 text-design4-green" />
                      </div>
                      <h3 className="text-lg font-bold text-design4-ink mb-2">MVP Builder</h3>
                      <p className="text-sm text-design4-neutral-600 mb-3 leading-relaxed">
                        Plan and build minimum viable products with guided feature prioritization.
                      </p>
                      <span className="inline-flex items-center bg-design4-neutral-200 text-design4-neutral-500 px-3 py-1.5 rounded-lg text-sm font-medium">
                        Coming Soon
                      </span>
                    </div>

                    <div className="bg-white rounded-xl p-4 shadow-sm border border-design4-neutral-100 opacity-50">
                      <div className="w-12 h-12 bg-design4-green/10 rounded-xl flex items-center justify-center mb-4">
                        <TrendingUp className="w-5 h-5 text-design4-green" />
                      </div>
                      <h3 className="text-lg font-bold text-design4-ink mb-2">Testing Framework</h3>
                      <p className="text-sm text-design4-neutral-600 mb-3 leading-relaxed">
                        Design and execute experiments to validate your hypotheses and assumptions.
                      </p>
                      <span className="inline-flex items-center bg-design4-neutral-200 text-design4-neutral-500 px-3 py-1.5 rounded-lg text-sm font-medium">
                        Coming Soon
                      </span>
                    </div>

                    <div className="bg-white rounded-xl p-4 shadow-sm border border-design4-neutral-100 opacity-50">
                      <div className="w-12 h-12 bg-design4-green/10 rounded-xl flex items-center justify-center mb-4">
                        <BarChart className="w-5 h-5 text-design4-green" />
                      </div>
                      <h3 className="text-lg font-bold text-design4-ink mb-2">Performance Monitor</h3>
                      <p className="text-sm text-design4-neutral-600 mb-3 leading-relaxed">
                        Track development progress and performance metrics in real-time.
                      </p>
                      <span className="inline-flex items-center bg-design4-neutral-200 text-design4-neutral-500 px-3 py-1.5 rounded-lg text-sm font-medium">
                        Coming Soon
                      </span>
                    </div>
                  </div>
                </section>

                {/* Deliver Section */}
                <section id="deliver" className="mb-12 scroll-mt-24 bg-design4-orange/5 rounded-2xl p-8">
                  <div className="text-center mb-8">
                    <div className="flex items-center justify-center gap-3 mb-3">
                      <div className="w-12 h-12 bg-design4-orange/20 rounded-xl flex items-center justify-center">
                        <Truck className="w-5 h-5 text-design4-orange" />
                      </div>
                      <h2 className="text-2xl lg:text-3xl font-bold text-design4-ink">Deliver</h2>
                    </div>
                    <p className="text-sm lg:text-base text-design4-neutral-600 max-w-xl mx-auto">
                      Tools to help you launch, measure, and optimize your customer experience.
                    </p>
                  </div>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-design4-neutral-100 hover:shadow-md transition-shadow">
                      <div className="w-12 h-12 bg-design4-orange/10 rounded-xl flex items-center justify-center mb-4">
                        <BarChart className="w-5 h-5 text-design4-orange" />
                      </div>
                      <h3 className="text-lg font-bold text-design4-ink mb-2">Customer Journey Map Tool</h3>
                      <p className="text-sm text-design4-neutral-600 mb-3 leading-relaxed">
                        Visualize and optimize your customer's end-to-end experience and touchpoints.
                      </p>
                      <Link
                        href="/resources/tools/customer-journey-map-tool"
                        className="inline-flex items-center bg-design4-orange text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-design4-orange/90 transition-colors"
                      >
                        Access Tool →
                      </Link>
                    </div>

                    {/* Placeholder for future Deliver tools */}
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-design4-neutral-100 opacity-50">
                      <div className="w-12 h-12 bg-design4-orange/10 rounded-xl flex items-center justify-center mb-4">
                        <Users className="w-5 h-5 text-design4-orange" />
                      </div>
                      <h3 className="text-lg font-bold text-design4-ink mb-2">Launch Checklist</h3>
                      <p className="text-sm text-design4-neutral-600 mb-3 leading-relaxed">
                        Comprehensive checklist to ensure successful product launches and go-to-market.
                      </p>
                      <span className="inline-flex items-center bg-design4-neutral-200 text-design4-neutral-500 px-3 py-1.5 rounded-lg text-sm font-medium">
                        Coming Soon
                      </span>
                    </div>

                    <div className="bg-white rounded-xl p-4 shadow-sm border border-design4-neutral-100 opacity-50">
                      <div className="w-12 h-12 bg-design4-orange/10 rounded-xl flex items-center justify-center mb-4">
                        <TrendingUp className="w-5 h-5 text-design4-orange" />
                      </div>
                      <h3 className="text-lg font-bold text-design4-ink mb-2">Success Metrics Dashboard</h3>
                      <p className="text-sm text-design4-neutral-600 mb-3 leading-relaxed">
                        Track and analyze key performance indicators and customer success metrics.
                      </p>
                      <span className="inline-flex items-center bg-design4-neutral-200 text-design4-neutral-500 px-3 py-1.5 rounded-lg text-sm font-medium">
                        Coming Soon
                      </span>
                    </div>
                  </div>
                </section>
              </div>
            </section>
          </SidebarInset>
        </div>
      </SidebarProvider>

      <Footer />
    </>
  )
}