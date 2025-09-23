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
          <Sidebar variant="floating" className="hidden md:flex mt-20 z-[60]">
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
                <span className="text-sm font-semibold">Design4 Tools</span>
              </button>
            </SidebarHeader>
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupLabel>Discover</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Link href="/resources/tools/outcomes-model-tool">
                          <Target className="h-4 w-4" />
                          <span>Outcomes Model Tool</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>

              <SidebarGroup>
                <SidebarGroupLabel>Define</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Link href="/resources/tools/value-proposition-tool">
                          <Heart className="h-4 w-4" />
                          <span>Value Proposition Tool</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>

              <SidebarGroup>
                <SidebarGroupLabel>Develop</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <a href="#coming-soon">
                          <Code className="h-4 w-4" />
                          <span>Coming Soon</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>

              <SidebarGroup>
                <SidebarGroupLabel>Deliver</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Link href="/resources/tools/customer-journey-map-tool">
                          <BarChart className="h-4 w-4" />
                          <span>Customer Journey Map Tool</span>
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

            {/* Main Content Area */}
            <section id="top" className="bg-design4-bg py-20 scroll-mt-24">
              <div className="mx-auto max-w-design4-container px-6">
                <div className="text-center mb-12">
                  <h1 className="text-4xl lg:text-6xl font-bold text-design4-ink leading-tight mb-6">
                    Design4 Tools
                  </h1>
                  <p className="text-lg lg:text-xl text-design4-neutral-600 mb-8 leading-relaxed max-w-2xl mx-auto">
                    Interactive tools to help you implement the Design4 framework and drive measurable business results.
                  </p>
                </div>

                {/* Available Tools */}
                <div className="grid md:grid-cols-1 gap-6 max-w-4xl mx-auto mb-16">
                  <div className="bg-white rounded-2xl p-8 shadow-sm border border-design4-neutral-100 hover:shadow-md transition-shadow">
                    <div className="flex items-start mb-6">
                      <div className="w-16 h-16 bg-design4-primary/10 rounded-xl flex items-center justify-center mr-6 flex-shrink-0">
                        <Target className="w-8 h-8 text-design4-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-design4-ink mb-3">Outcomes Model Tool</h3>
                        <p className="text-design4-neutral-600 mb-4 leading-relaxed">
                          Interactive tool to help you build and implement effective outcomes models that align organizational purpose with customer needs and strategic goals.
                        </p>
                        <Link
                          href="/resources/tools/outcomes-model-tool"
                          className="inline-flex items-center bg-design4-gold text-white px-6 py-3 rounded-xl font-medium hover:bg-design4-gold/90 hover:transform hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200"
                        >
                          Access Tool →
                        </Link>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl p-8 shadow-sm border border-design4-neutral-100 hover:shadow-md transition-shadow">
                    <div className="flex items-start mb-6">
                      <div className="w-16 h-16 bg-design4-purple/10 rounded-xl flex items-center justify-center mr-6 flex-shrink-0">
                        <Heart className="w-8 h-8 text-design4-purple" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-design4-ink mb-3">Value Proposition Tool</h3>
                        <p className="text-design4-neutral-600 mb-4 leading-relaxed">
                          Create compelling value propositions that resonate with your customers. Map customer jobs, pains, and gains to build products and services that truly matter.
                        </p>
                        <Link
                          href="/resources/tools/value-proposition-tool"
                          className="inline-flex items-center bg-design4-purple text-white px-6 py-3 rounded-xl font-medium hover:bg-design4-purple/90 hover:transform hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200"
                        >
                          Access Tool →
                        </Link>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl p-8 shadow-sm border border-design4-neutral-100 hover:shadow-md transition-shadow">
                    <div className="flex items-start mb-6">
                      <div className="w-16 h-16 bg-design4-green/10 rounded-xl flex items-center justify-center mr-6 flex-shrink-0">
                        <BarChart className="w-8 h-8 text-design4-green" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-design4-ink mb-3">Customer Journey Map Tool</h3>
                        <p className="text-design4-neutral-600 mb-4 leading-relaxed">
                          Visualize and optimize your customer's end-to-end experience. Map touchpoints, emotions, and opportunities to create seamless customer journeys.
                        </p>
                        <Link
                          href="/resources/tools/customer-journey-map-tool"
                          className="inline-flex items-center bg-design4-orange text-white px-6 py-3 rounded-xl font-medium hover:bg-design4-orange/90 hover:transform hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200"
                        >
                          Access Tool →
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Coming Soon Tools */}
                <div className="text-center mb-8">
                  <h2 className="text-2xl lg:text-3xl font-bold text-design4-ink mb-4">
                    Coming Soon
                  </h2>
                  <p className="text-design4-neutral-600 max-w-2xl mx-auto">
                    More powerful tools to support your Design4 implementation journey.
                  </p>
                </div>

                <div id="coming-soon" className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-design4-neutral-100 opacity-75">
                    <div className="w-12 h-12 bg-design4-gold/10 rounded-xl flex items-center justify-center mb-4">
                      <BarChart className="w-6 h-6 text-design4-gold" />
                    </div>
                    <h3 className="text-xl font-bold text-design4-ink mb-3">Performance Dashboard</h3>
                    <p className="text-design4-neutral-600 leading-relaxed">
                      Track key performance indicators and monitor alignment between operations and strategic objectives.
                    </p>
                  </div>

                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-design4-neutral-100 opacity-75">
                    <div className="w-12 h-12 bg-design4-green/10 rounded-xl flex items-center justify-center mb-4">
                      <Users className="w-6 h-6 text-design4-green" />
                    </div>
                    <h3 className="text-xl font-bold text-design4-ink mb-3">Stakeholder Mapping</h3>
                    <p className="text-design4-neutral-600 leading-relaxed">
                      Visual framework for identifying, analyzing, and managing key stakeholder relationships.
                    </p>
                  </div>

                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-design4-neutral-100 opacity-75">
                    <div className="w-12 h-12 bg-design4-orange/10 rounded-xl flex items-center justify-center mb-4">
                      <TrendingUp className="w-6 h-6 text-design4-orange" />
                    </div>
                    <h3 className="text-xl font-bold text-design4-ink mb-3">Strategy Alignment</h3>
                    <p className="text-design4-neutral-600 leading-relaxed">
                      Ensure organizational strategies are aligned with purpose and deliver measurable value.
                    </p>
                  </div>

                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-design4-neutral-100 opacity-75">
                    <div className="w-12 h-12 bg-design4-plum/10 rounded-xl flex items-center justify-center mb-4">
                      <Lightbulb className="w-6 h-6 text-design4-plum" />
                    </div>
                    <h3 className="text-xl font-bold text-design4-ink mb-3">Innovation Framework</h3>
                    <p className="text-design4-neutral-600 leading-relaxed">
                      Systematic approach to driving innovation while maintaining operational excellence.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </SidebarInset>
        </div>
      </SidebarProvider>

      <Footer />
    </>
  )
}