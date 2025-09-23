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
import { BookOpen, Target, BarChart, Users, TrendingUp, Lightbulb, Search, PenTool, Code, Truck, FileText, Download, FolderOpen } from 'lucide-react'

export default function PlaybooksPage() {
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
                <span className="text-sm font-semibold">Design4 Playbooks</span>
              </button>
              <p className="px-2 text-xs text-design4-neutral-600 leading-relaxed">
                Comprehensive playbooks to guide you through each phase of the Design4 framework implementation.
              </p>
            </SidebarHeader>
            <SidebarContent className="overflow-y-auto flex-1">
              <SidebarGroup>
                <SidebarGroupLabel>Framework Phases</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <a
                          href="#discover"
                          onClick={(e) => {
                            e.preventDefault();
                            document.getElementById('discover')?.scrollIntoView({ behavior: 'smooth' });
                          }}
                        >
                          <Search className="h-4 w-4" />
                          <span>Discover Playbooks</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <a
                          href="#define"
                          onClick={(e) => {
                            e.preventDefault();
                            document.getElementById('define')?.scrollIntoView({ behavior: 'smooth' });
                          }}
                        >
                          <PenTool className="h-4 w-4" />
                          <span>Define Playbooks</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <a
                          href="#develop"
                          onClick={(e) => {
                            e.preventDefault();
                            document.getElementById('develop')?.scrollIntoView({ behavior: 'smooth' });
                          }}
                        >
                          <Code className="h-4 w-4" />
                          <span>Develop Playbooks</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <a
                          href="#deliver"
                          onClick={(e) => {
                            e.preventDefault();
                            document.getElementById('deliver')?.scrollIntoView({ behavior: 'smooth' });
                          }}
                        >
                          <Truck className="h-4 w-4" />
                          <span>Deliver Playbooks</span>
                        </a>
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
              <div className="mx-auto max-w-design4-container px-6 py-12">

                {/* Discover Playbooks */}
                <section id="discover" className="mb-12 scroll-mt-24 bg-design4-gold/5 rounded-2xl p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <Search className="h-6 w-6 text-design4-ink" />
                    <h2 className="text-2xl font-bold text-design4-ink">Discover Playbooks</h2>
                  </div>
                  <p className="text-design4-neutral-600 mb-8">
                    Comprehensive guides to help you understand your purpose, identify opportunities, and define strategic direction.
                  </p>

                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-white border border-design4-neutral-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
                      <div className="inline-block bg-design4-gold text-design4-ink rounded-full px-3 py-1 text-sm font-medium mb-4">
                        Coming Soon
                      </div>
                      <h3 className="text-lg font-semibold text-design4-ink mb-3">Purpose Discovery Playbook</h3>
                      <p className="text-design4-neutral-600 mb-4 text-sm leading-relaxed">
                        A comprehensive guide to uncovering your organization's authentic purpose and aligning stakeholder expectations.
                      </p>
                      <button
                        disabled
                        className="inline-flex items-center text-design4-neutral-400 text-sm cursor-not-allowed"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download →
                      </button>
                    </div>

                    <div className="bg-white border border-design4-neutral-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
                      <div className="inline-block bg-design4-gold text-design4-ink rounded-full px-3 py-1 text-sm font-medium mb-4">
                        Coming Soon
                      </div>
                      <h3 className="text-lg font-semibold text-design4-ink mb-3">Stakeholder Analysis Playbook</h3>
                      <p className="text-design4-neutral-600 mb-4 text-sm leading-relaxed">
                        Systematic approach to identifying, mapping, and engaging key stakeholders throughout your transformation.
                      </p>
                      <button
                        disabled
                        className="inline-flex items-center text-design4-neutral-400 text-sm cursor-not-allowed"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download →
                      </button>
                    </div>

                    <div className="bg-white border border-design4-neutral-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
                      <div className="inline-block bg-design4-gold text-design4-ink rounded-full px-3 py-1 text-sm font-medium mb-4">
                        Coming Soon
                      </div>
                      <h3 className="text-lg font-semibold text-design4-ink mb-3">Market Research Playbook</h3>
                      <p className="text-design4-neutral-600 mb-4 text-sm leading-relaxed">
                        Guide to conducting effective market research and competitive analysis for strategic decision-making.
                      </p>
                      <button
                        disabled
                        className="inline-flex items-center text-design4-neutral-400 text-sm cursor-not-allowed"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download →
                      </button>
                    </div>
                  </div>
                </section>

                {/* Define Playbooks */}
                <section id="define" className="mb-12 scroll-mt-24 bg-design4-purple/5 rounded-2xl p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <PenTool className="h-6 w-6 text-design4-ink" />
                    <h2 className="text-2xl font-bold text-design4-ink">Define Playbooks</h2>
                  </div>
                  <p className="text-design4-neutral-600 mb-8">
                    Strategic frameworks to help you define clear direction, craft compelling value propositions, and establish roadmaps.
                  </p>

                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-white border border-design4-neutral-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
                      <div className="inline-block bg-design4-purple text-white rounded-full px-3 py-1 text-sm font-medium mb-4">
                        Available
                      </div>
                      <h3 className="text-lg font-semibold text-design4-ink mb-3">Strategic Planning Playbook</h3>
                      <p className="text-design4-neutral-600 mb-4 text-sm leading-relaxed">
                        Complete guide to developing strategic plans that connect purpose with actionable initiatives.
                      </p>
                      <Link
                        href="/resources/outcomes-model-development"
                        className="inline-flex items-center text-design4-primary hover:text-design4-purple transition-colors text-sm"
                      >
                        <FileText className="h-4 w-4 mr-2" />
                        View Playbook →
                      </Link>
                    </div>

                    <div className="bg-white border border-design4-neutral-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
                      <div className="inline-block bg-design4-purple text-white rounded-full px-3 py-1 text-sm font-medium mb-4">
                        Coming Soon
                      </div>
                      <h3 className="text-lg font-semibold text-design4-ink mb-3">Value Proposition Playbook</h3>
                      <p className="text-design4-neutral-600 mb-4 text-sm leading-relaxed">
                        Framework for creating compelling value propositions that resonate with your target stakeholders.
                      </p>
                      <button
                        disabled
                        className="inline-flex items-center text-design4-neutral-400 text-sm cursor-not-allowed"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download →
                      </button>
                    </div>

                    <div className="bg-white border border-design4-neutral-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
                      <div className="inline-block bg-design4-purple text-white rounded-full px-3 py-1 text-sm font-medium mb-4">
                        Coming Soon
                      </div>
                      <h3 className="text-lg font-semibold text-design4-ink mb-3">Strategic Roadmap Playbook</h3>
                      <p className="text-design4-neutral-600 mb-4 text-sm leading-relaxed">
                        Guide to creating clear, actionable roadmaps that sequence strategic initiatives effectively.
                      </p>
                      <button
                        disabled
                        className="inline-flex items-center text-design4-neutral-400 text-sm cursor-not-allowed"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download →
                      </button>
                    </div>
                  </div>
                </section>

                {/* Develop Playbooks */}
                <section id="develop" className="mb-12 scroll-mt-24 bg-design4-green/5 rounded-2xl p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <Code className="h-6 w-6 text-design4-ink" />
                    <h2 className="text-2xl font-bold text-design4-ink">Develop Playbooks</h2>
                  </div>
                  <p className="text-design4-neutral-600 mb-8">
                    Capability-building frameworks to help you develop the organizational capabilities needed for strategic execution.
                  </p>

                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-white border border-design4-neutral-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
                      <div className="inline-block bg-design4-green text-design4-ink rounded-full px-3 py-1 text-sm font-medium mb-4">
                        Coming Soon
                      </div>
                      <h3 className="text-lg font-semibold text-design4-ink mb-3">Capability Assessment Playbook</h3>
                      <p className="text-design4-neutral-600 mb-4 text-sm leading-relaxed">
                        Systematic approach to evaluating current capabilities and identifying critical gaps for strategic success.
                      </p>
                      <button
                        disabled
                        className="inline-flex items-center text-design4-neutral-400 text-sm cursor-not-allowed"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download →
                      </button>
                    </div>

                    <div className="bg-white border border-design4-neutral-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
                      <div className="inline-block bg-design4-green text-design4-ink rounded-full px-3 py-1 text-sm font-medium mb-4">
                        Coming Soon
                      </div>
                      <h3 className="text-lg font-semibold text-design4-ink mb-3">Process Design Playbook</h3>
                      <p className="text-design4-neutral-600 mb-4 text-sm leading-relaxed">
                        Framework for designing systematic processes that enable consistent execution of strategic initiatives.
                      </p>
                      <button
                        disabled
                        className="inline-flex items-center text-design4-neutral-400 text-sm cursor-not-allowed"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download →
                      </button>
                    </div>

                    <div className="bg-white border border-design4-neutral-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
                      <div className="inline-block bg-design4-green text-design4-ink rounded-full px-3 py-1 text-sm font-medium mb-4">
                        Coming Soon
                      </div>
                      <h3 className="text-lg font-semibold text-design4-ink mb-3">Skills Development Playbook</h3>
                      <p className="text-design4-neutral-600 mb-4 text-sm leading-relaxed">
                        Guide to building individual and team capabilities through structured learning and development programs.
                      </p>
                      <button
                        disabled
                        className="inline-flex items-center text-design4-neutral-400 text-sm cursor-not-allowed"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download →
                      </button>
                    </div>
                  </div>
                </section>

                {/* Deliver Playbooks */}
                <section id="deliver" className="mb-12 scroll-mt-24 bg-design4-orange/5 rounded-2xl p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <Truck className="h-6 w-6 text-design4-ink" />
                    <h2 className="text-2xl font-bold text-design4-ink">Deliver Playbooks</h2>
                  </div>
                  <p className="text-design4-neutral-600 mb-8">
                    Execution-focused playbooks to help you deliver consistent value and drive continuous improvement.
                  </p>

                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-white border border-design4-neutral-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
                      <div className="inline-block bg-design4-orange text-white rounded-full px-3 py-1 text-sm font-medium mb-4">
                        Coming Soon
                      </div>
                      <h3 className="text-lg font-semibold text-design4-ink mb-3">Operational Excellence Playbook</h3>
                      <p className="text-design4-neutral-600 mb-4 text-sm leading-relaxed">
                        Framework for aligning daily operations with strategic priorities and ensuring consistent value delivery.
                      </p>
                      <button
                        disabled
                        className="inline-flex items-center text-design4-neutral-400 text-sm cursor-not-allowed"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download →
                      </button>
                    </div>

                    <div className="bg-white border border-design4-neutral-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
                      <div className="inline-block bg-design4-orange text-white rounded-full px-3 py-1 text-sm font-medium mb-4">
                        Coming Soon
                      </div>
                      <h3 className="text-lg font-semibold text-design4-ink mb-3">Performance Monitoring Playbook</h3>
                      <p className="text-design4-neutral-600 mb-4 text-sm leading-relaxed">
                        Guide to establishing systems for monitoring performance and measuring value delivered to stakeholders.
                      </p>
                      <button
                        disabled
                        className="inline-flex items-center text-design4-neutral-400 text-sm cursor-not-allowed"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download →
                      </button>
                    </div>

                    <div className="bg-white border border-design4-neutral-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
                      <div className="inline-block bg-design4-orange text-white rounded-full px-3 py-1 text-sm font-medium mb-4">
                        Coming Soon
                      </div>
                      <h3 className="text-lg font-semibold text-design4-ink mb-3">Continuous Improvement Playbook</h3>
                      <p className="text-design4-neutral-600 mb-4 text-sm leading-relaxed">
                        Framework for driving continuous improvement through feedback loops, learning, and systematic optimization.
                      </p>
                      <button
                        disabled
                        className="inline-flex items-center text-design4-neutral-400 text-sm cursor-not-allowed"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download →
                      </button>
                    </div>
                  </div>
                </section>

              </div>
            </main>
          </SidebarInset>
        </div>
      </SidebarProvider>
      <Footer />
    </>
  )
}