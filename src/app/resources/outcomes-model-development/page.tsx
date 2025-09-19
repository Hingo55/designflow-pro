'use client'

import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { ArrowRight, CheckCircle, Download, Clock, Users, Target, Zap, BarChart, TrendingUp, BookOpen, FileText, Layout, Lightbulb, Sparkles } from 'lucide-react'
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

export default function OutcomesModelPlaybookPage() {
  return (
    <>
      <Navigation />

      {/* Hero Section - Full Width */}
      <section id="top" className="bg-white py-20 pt-32">
        <div className="mx-auto max-w-design4-container px-6 md:pl-80">
          <div className="text-left max-w-4xl">
            <div className="inline-flex items-center bg-design4-gold text-design4-ink rounded-full px-6 py-3 text-sm font-medium mb-6">
              <Target className="w-4 h-4 mr-2" />
              Outcomes Model Development Playbook
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-design4-ink leading-tight mb-6">
              Build Outcomes That Drive Real Business Results
            </h1>
            <p className="text-lg lg:text-xl text-design4-neutral-600 mb-8 leading-relaxed">
              Ensure measurable results by developing and implementing an effective outcomes model that aligns your organizational or initiative purpose with customer needs and strategic goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="inline-flex items-center bg-design4-primary text-white px-8 py-4 rounded-xl font-medium text-lg hover:bg-design4-primary/90 hover:transform hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200">
                <Sparkles className="w-5 h-5 mr-2" />
                Outcomes Model Tool
              </button>
              <Link
                href="#purpose"
                className="inline-flex items-center text-design4-primary font-medium text-lg hover:text-design4-primary/80 transition-colors"
              >
                Start Reading →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Content with Sidebar */}
      <SidebarProvider>
        <div className="flex w-full bg-design4-bg min-h-screen">
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
                <span className="text-sm font-semibold">Playbook Contents</span>
              </button>
            </SidebarHeader>
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupLabel>Model Overview</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <a href="#purpose">
                          <Target className="h-4 w-4" />
                          <span>Purpose</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <a href="#core-components">
                          <Layout className="h-4 w-4" />
                          <span>Core Components</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>

              <SidebarGroup>
                <SidebarGroupLabel>Implementation</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <a href="#phase1">
                          <Users className="h-4 w-4" />
                          <span>Phase 1: Foundation</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <a href="#phase2">
                          <BarChart className="h-4 w-4" />
                          <span>Phase 2: Requirements</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <a href="#phase3">
                          <TrendingUp className="h-4 w-4" />
                          <span>Phase 3: Strategic Planning</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <a href="#phase4">
                          <Zap className="h-4 w-4" />
                          <span>Phase 4: Implementation</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>

              <SidebarGroup>
                <SidebarGroupLabel>Resources</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <a href="#templates">
                          <FileText className="h-4 w-4" />
                          <span>Templates & Tools</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <a href="#roles">
                          <Users className="h-4 w-4" />
                          <span>Roles & Responsibilities</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Link href="/resources">
                          <ArrowRight className="h-4 w-4" />
                          <span>All Resources</span>
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

            {/* Purpose & When to Use */}
            <section id="purpose" className="bg-design4-bg pt-5 pb-10 scroll-mt-24">
              <div className="mx-auto max-w-design4-container px-6">
                <div className="grid lg:grid-cols-3 gap-12 items-start">
                  <div>
                    <h2 className="text-2xl lg:text-3xl font-bold text-design4-ink mb-6">
                      Purpose
                    </h2>
                    <p className="text-base text-design4-neutral-600 mb-8 leading-relaxed">
                      This playbook provides a standardized approach for developing and implementing an effective outcomes model that aligns organizational purpose with customer needs and strategic goals, ensuring measurable business results.
                    </p>
                  </div>
                  <div className="lg:col-span-2 bg-white rounded-3xl p-8 shadow-sm border border-design4-neutral-100">
                    <h3 className="text-xl font-bold text-design4-ink mb-4">When to Use This Playbook</h3>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-design4-green mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-design4-neutral-600">Launching a new business initiative or strategic planning cycle</span>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-design4-green mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-design4-neutral-600">Restructuring organizational strategy or business model</span>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-design4-green mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-design4-neutral-600">Responding to significant market or customer changes</span>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-design4-green mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-design4-neutral-600">Establishing performance measurement frameworks</span>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-design4-green mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-design4-neutral-600">Aligning cross-functional teams around common objectives</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Core Framework Components */}
            <section id="core-components" className="bg-design4-neutral-100 py-12 scroll-mt-24">
              <div className="mx-auto max-w-design4-container px-6">
                <div className="text-left mb-8">
                  <h2 className="text-2xl lg:text-3xl font-bold text-design4-ink mb-3">
                    Outcome Model Components
                  </h2>
                  <p className="text-base text-design4-neutral-500 max-w-2xl">
                    Five interconnected elements that form the foundation of your outcomes model
                  </p>
                </div>

                <div className="grid lg:grid-cols-1 gap-4 max-w-4xl mx-auto">
                  {/* Purpose Statement */}
                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-design4-neutral-100">
                    <div className="flex items-start mb-4">
                      <div className="w-12 h-12 bg-design4-primary/10 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                        <Target className="w-6 h-6 text-design4-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-design4-ink mb-2">1. Purpose Statement (Driver)</h3>
                        <p className="text-sm text-design4-neutral-600 mb-2"><strong>What it is:</strong> The fundamental "why" behind your organization's existence</p>
                        <p className="text-sm text-design4-neutral-600"><strong>Role:</strong> Provides motivational foundation and strategic direction for all decisions</p>
                      </div>
                    </div>
                  </div>

                  {/* Customer Group */}
                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-design4-neutral-100">
                    <div className="flex items-start mb-4">
                      <div className="w-12 h-12 bg-design4-gold/10 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                        <Users className="w-6 h-6 text-design4-gold" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-design4-ink mb-2">2. Customer Group (Stakeholder)</h3>
                        <p className="text-sm text-design4-neutral-600 mb-2"><strong>What it is:</strong> External stakeholders who have requirements and expectations</p>
                        <p className="text-sm text-design4-neutral-600"><strong>Role:</strong> Represents the voice of the market and defines whose needs must be met</p>
                      </div>
                    </div>
                  </div>

                  {/* Customer Need */}
                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-design4-neutral-100">
                    <div className="flex items-start mb-4">
                      <div className="w-12 h-12 bg-design4-green/10 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                        <CheckCircle className="w-6 h-6 text-design4-green" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-design4-ink mb-2">3. Customer Need (Requirement)</h3>
                        <p className="text-sm text-design4-neutral-600 mb-2"><strong>What it is:</strong> Specific statements of what customers require or expect</p>
                        <p className="text-sm text-design4-neutral-600"><strong>Role:</strong> Constrains and guides architectural and strategic decisions</p>
                      </div>
                    </div>
                  </div>

                  {/* Strategic Goal */}
                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-design4-neutral-100">
                    <div className="flex items-start mb-4">
                      <div className="w-12 h-12 bg-design4-orange/10 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                        <TrendingUp className="w-6 h-6 text-design4-orange" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-design4-ink mb-2">4. Strategic Goal</h3>
                        <p className="text-sm text-design4-neutral-600 mb-2"><strong>What it is:</strong> Intended outcomes that bridge purpose and customer needs</p>
                        <p className="text-sm text-design4-neutral-600"><strong>Role:</strong> Translates abstract purpose into concrete, measurable targets</p>
                      </div>
                    </div>
                  </div>

                  {/* Outcome */}
                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-design4-neutral-100">
                    <div className="flex items-start mb-4">
                      <div className="w-12 h-12 bg-design4-plum/10 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                        <BarChart className="w-6 h-6 text-design4-plum" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-design4-ink mb-2">5. Outcome</h3>
                        <p className="text-sm text-design4-neutral-600 mb-2"><strong>What it is:</strong> Actual measurable results achieved</p>
                        <p className="text-sm text-design4-neutral-600"><strong>Role:</strong> Validates goal achievement and informs future strategy adjustments</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Phase 1: Foundation Setting */}
            <section id="phase1" className="bg-design4-bg py-10 scroll-mt-24">
              <div className="mx-auto max-w-design4-container px-6">
                <div className="text-left mb-8">
                  <h2 className="text-2xl lg:text-3xl font-bold text-design4-ink mb-3">
                    Phase 1: Foundation Setting
                  </h2>
                  <p className="text-base text-design4-neutral-500 max-w-2xl">
                    Weeks 1-2: Establish organizational purpose and identify key stakeholders
                  </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Step 1 */}
                  <div className="bg-white rounded-3xl p-8 shadow-sm border border-design4-neutral-100">
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 bg-design4-primary/10 rounded-xl flex items-center justify-center mr-4">
                        <Target className="w-6 h-6 text-design4-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-design4-ink">Step 1: Define Organizational Purpose</h3>
                        <p className="text-sm text-design4-neutral-500">Owner: Executive Leadership Team • Duration: 3-5 business days</p>
                      </div>
                    </div>
                    <div className="space-y-3 mb-6">
                      <div className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-design4-green mr-3 mt-1 flex-shrink-0" />
                        <span className="text-sm text-design4-neutral-600">Conduct leadership workshop to articulate organizational mission</span>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-design4-green mr-3 mt-1 flex-shrink-0" />
                        <span className="text-sm text-design4-neutral-600">Document core values and fundamental motivations</span>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-design4-green mr-3 mt-1 flex-shrink-0" />
                        <span className="text-sm text-design4-neutral-600">Validate purpose statement with key internal stakeholders</span>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-design4-green mr-3 mt-1 flex-shrink-0" />
                        <span className="text-sm text-design4-neutral-600">Create clear, concise purpose statement (1-2 sentences)</span>
                      </div>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="bg-white rounded-3xl p-8 shadow-sm border border-design4-neutral-100">
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 bg-design4-gold/10 rounded-xl flex items-center justify-center mr-4">
                        <Users className="w-6 h-6 text-design4-gold" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-design4-ink">Step 2: Identify Customer Groups</h3>
                        <p className="text-sm text-design4-neutral-500">Owner: Marketing/Customer Experience Team • Duration: 1-2 weeks</p>
                      </div>
                    </div>
                    <div className="space-y-3 mb-6">
                      <div className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-design4-green mr-3 mt-1 flex-shrink-0" />
                        <span className="text-sm text-design4-neutral-600">Map all external stakeholders who have requirements</span>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-design4-green mr-3 mt-1 flex-shrink-0" />
                        <span className="text-sm text-design4-neutral-600">Segment customer groups by needs, behaviors, or characteristics</span>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-design4-green mr-3 mt-1 flex-shrink-0" />
                        <span className="text-sm text-design4-neutral-600">Prioritize customer groups by strategic importance</span>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-design4-green mr-3 mt-1 flex-shrink-0" />
                        <span className="text-sm text-design4-neutral-600">Document stakeholder profiles and influence levels</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Phase 2: Requirements Gathering */}
            <section id="phase2" className="bg-design4-neutral-100 py-10 scroll-mt-24">
              <div className="mx-auto max-w-design4-container px-6">
                <div className="text-left mb-8">
                  <h2 className="text-2xl lg:text-3xl font-bold text-design4-ink mb-3">
                    Phase 2: Requirements Gathering
                  </h2>
                  <p className="text-base text-design4-neutral-500 max-w-2xl">
                    Weeks 3-4: Capture customer needs and apply organizational purpose lens
                  </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Step 3 */}
                  <div className="bg-white rounded-3xl p-8 shadow-sm border border-design4-neutral-100">
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 bg-design4-green/10 rounded-xl flex items-center justify-center mr-4">
                        <BarChart className="w-6 h-6 text-design4-green" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-design4-ink">Step 3: Capture Customer Needs</h3>
                        <p className="text-sm text-design4-neutral-500">Owner: Product/Marketing Teams • Duration: 2-3 weeks</p>
                      </div>
                    </div>
                    <div className="space-y-3 mb-6">
                      <div className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-design4-green mr-3 mt-1 flex-shrink-0" />
                        <span className="text-sm text-design4-neutral-600">Conduct customer research (surveys, interviews, focus groups)</span>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-design4-green mr-3 mt-1 flex-shrink-0" />
                        <span className="text-sm text-design4-neutral-600">Analyze existing customer feedback and support data</span>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-design4-green mr-3 mt-1 flex-shrink-0" />
                        <span className="text-sm text-design4-neutral-600">Review competitive analysis and market trends</span>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-design4-green mr-3 mt-1 flex-shrink-0" />
                        <span className="text-sm text-design4-neutral-600">Document specific, measurable customer requirements</span>
                      </div>
                    </div>
                  </div>

                  {/* Step 4 */}
                  <div className="bg-white rounded-3xl p-8 shadow-sm border border-design4-neutral-100">
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 bg-design4-orange/10 rounded-xl flex items-center justify-center mr-4">
                        <Lightbulb className="w-6 h-6 text-design4-orange" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-design4-ink">Step 4: Apply Purpose Lens</h3>
                        <p className="text-sm text-design4-neutral-500">Owner: Strategy Team • Duration: 2-3 days</p>
                      </div>
                    </div>
                    <div className="space-y-3 mb-6">
                      <div className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-design4-green mr-3 mt-1 flex-shrink-0" />
                        <span className="text-sm text-design4-neutral-600">Review all identified customer needs through purpose filter</span>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-design4-green mr-3 mt-1 flex-shrink-0" />
                        <span className="text-sm text-design4-neutral-600">Prioritize needs that align with organizational purpose</span>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-design4-green mr-3 mt-1 flex-shrink-0" />
                        <span className="text-sm text-design4-neutral-600">Interpret needs in context of organizational mission</span>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-design4-green mr-3 mt-1 flex-shrink-0" />
                        <span className="text-sm text-design4-neutral-600">Document "prioritizes and interprets" relationships</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Phase 3: Strategic Planning */}
            <section id="phase3" className="bg-design4-bg py-10 scroll-mt-24">
              <div className="mx-auto max-w-design4-container px-6">
                <div className="text-left mb-8">
                  <h2 className="text-2xl lg:text-3xl font-bold text-design4-ink mb-3">
                    Phase 3: Strategic Planning
                  </h2>
                  <p className="text-base text-design4-neutral-500 max-w-2xl">
                    Weeks 5-6: Establish strategic goals and define expected outcomes
                  </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Step 5 */}
                  <div className="bg-white rounded-3xl p-8 shadow-sm border border-design4-neutral-100">
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 bg-design4-primary/10 rounded-xl flex items-center justify-center mr-4">
                        <TrendingUp className="w-6 h-6 text-design4-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-design4-ink">Step 5: Establish Strategic Goals</h3>
                        <p className="text-sm text-design4-neutral-500">Owner: Strategy/Executive Team • Duration: 1-2 weeks</p>
                      </div>
                    </div>
                    <div className="space-y-3 mb-6">
                      <div className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-design4-green mr-3 mt-1 flex-shrink-0" />
                        <span className="text-sm text-design4-neutral-600">Translate prioritized customer needs into strategic objectives</span>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-design4-green mr-3 mt-1 flex-shrink-0" />
                        <span className="text-sm text-design4-neutral-600">Ensure goals are SMART (Specific, Measurable, Achievable, Relevant, Time-bound)</span>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-design4-green mr-3 mt-1 flex-shrink-0" />
                        <span className="text-sm text-design4-neutral-600">Validate goals align with organizational purpose</span>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-design4-green mr-3 mt-1 flex-shrink-0" />
                        <span className="text-sm text-design4-neutral-600">Set target timelines and success criteria</span>
                      </div>
                    </div>
                  </div>

                  {/* Step 6 */}
                  <div className="bg-white rounded-3xl p-8 shadow-sm border border-design4-neutral-100">
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 bg-design4-plum/10 rounded-xl flex items-center justify-center mr-4">
                        <BarChart className="w-6 h-6 text-design4-plum" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-design4-ink">Step 6: Define Expected Outcomes</h3>
                        <p className="text-sm text-design4-neutral-500">Owner: Strategy/Operations Team • Duration: 3-5 days</p>
                      </div>
                    </div>
                    <div className="space-y-3 mb-6">
                      <div className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-design4-green mr-3 mt-1 flex-shrink-0" />
                        <span className="text-sm text-design4-neutral-600">Set specific, measurable outcome targets for each strategic goal</span>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-design4-green mr-3 mt-1 flex-shrink-0" />
                        <span className="text-sm text-design4-neutral-600">Establish baseline measurements where possible</span>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-design4-green mr-3 mt-1 flex-shrink-0" />
                        <span className="text-sm text-design4-neutral-600">Define measurement methodologies and data sources</span>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-design4-green mr-3 mt-1 flex-shrink-0" />
                        <span className="text-sm text-design4-neutral-600">Set up tracking and reporting mechanisms</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Phase 4: Implementation & Monitoring */}
            <section id="phase4" className="bg-design4-neutral-100 py-10 scroll-mt-24">
              <div className="mx-auto max-w-design4-container px-6">
                <div className="text-left mb-8">
                  <h2 className="text-2xl lg:text-3xl font-bold text-design4-ink mb-3">
                    Phase 4: Implementation & Monitoring
                  </h2>
                  <p className="text-base text-design4-neutral-500 max-w-2xl">
                    Ongoing: Execute, track progress, and continuously adapt
                  </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Step 7 */}
                  <div className="bg-white rounded-3xl p-8 shadow-sm border border-design4-neutral-100">
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 bg-design4-green/10 rounded-xl flex items-center justify-center mr-4">
                        <Zap className="w-6 h-6 text-design4-green" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-design4-ink">Step 7: Execute and Track</h3>
                        <p className="text-sm text-design4-neutral-500">Owner: Cross-functional teams • Duration: Ongoing</p>
                      </div>
                    </div>
                    <div className="space-y-3 mb-6">
                      <div className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-design4-green mr-3 mt-1 flex-shrink-0" />
                        <span className="text-sm text-design4-neutral-600">Launch initiatives aligned with strategic goals</span>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-design4-green mr-3 mt-1 flex-shrink-0" />
                        <span className="text-sm text-design4-neutral-600">Collect outcome data regularly</span>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-design4-green mr-3 mt-1 flex-shrink-0" />
                        <span className="text-sm text-design4-neutral-600">Monitor progress against targets</span>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-design4-green mr-3 mt-1 flex-shrink-0" />
                        <span className="text-sm text-design4-neutral-600">Adjust tactics while maintaining strategic alignment</span>
                      </div>
                    </div>
                  </div>

                  {/* Step 8 */}
                  <div className="bg-white rounded-3xl p-8 shadow-sm border border-design4-neutral-100">
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 bg-design4-orange/10 rounded-xl flex items-center justify-center mr-4">
                        <TrendingUp className="w-6 h-6 text-design4-orange" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-design4-ink">Step 8: Review and Adapt</h3>
                        <p className="text-sm text-design4-neutral-500">Owner: Executive/Strategy Team • Duration: Quarterly reviews</p>
                      </div>
                    </div>
                    <div className="space-y-3 mb-6">
                      <div className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-design4-green mr-3 mt-1 flex-shrink-0" />
                        <span className="text-sm text-design4-neutral-600">Assess actual outcomes against targets</span>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-design4-green mr-3 mt-1 flex-shrink-0" />
                        <span className="text-sm text-design4-neutral-600">Evaluate goal achievement and strategy effectiveness</span>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-design4-green mr-3 mt-1 flex-shrink-0" />
                        <span className="text-sm text-design4-neutral-600">Review changes in customer needs or market conditions</span>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-design4-green mr-3 mt-1 flex-shrink-0" />
                        <span className="text-sm text-design4-neutral-600">Document lessons learned</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Templates and Tools */}
            <section id="templates" className="bg-design4-bg py-10 scroll-mt-24">
              <div className="mx-auto max-w-design4-container px-6">
                <div className="text-left mb-8">
                  <h2 className="text-2xl lg:text-3xl font-bold text-design4-ink mb-3">
                    Templates and Tools
                  </h2>
                  <p className="text-base text-design4-neutral-500 max-w-2xl">
                    Ready-to-use resources to support your outcomes model development
                  </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-6">
                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-design4-neutral-100 hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 bg-design4-primary/10 rounded-xl flex items-center justify-center mb-4">
                      <FileText className="w-6 h-6 text-design4-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-design4-ink mb-2">Purpose Statement Worksheet</h3>
                    <p className="text-design4-neutral-500 text-sm mb-4">Guided template to help articulate your organization's fundamental purpose</p>
                    <button className="text-design4-primary font-medium text-sm hover:text-design4-primary/80 transition-colors">
                      Download Template →
                    </button>
                  </div>

                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-design4-neutral-100 hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 bg-design4-gold/10 rounded-xl flex items-center justify-center mb-4">
                      <Users className="w-6 h-6 text-design4-gold" />
                    </div>
                    <h3 className="text-lg font-semibold text-design4-ink mb-2">Customer Group Mapping Template</h3>
                    <p className="text-design4-neutral-500 text-sm mb-4">Visual framework for identifying and segmenting key stakeholder groups</p>
                    <button className="text-design4-gold font-medium text-sm hover:text-design4-gold/80 transition-colors">
                      Download Template →
                    </button>
                  </div>

                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-design4-neutral-100 hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 bg-design4-green/10 rounded-xl flex items-center justify-center mb-4">
                      <CheckCircle className="w-6 h-6 text-design4-green" />
                    </div>
                    <h3 className="text-lg font-semibold text-design4-ink mb-2">Requirements Gathering Template</h3>
                    <p className="text-design4-neutral-500 text-sm mb-4">Structured approach to capturing and documenting customer needs</p>
                    <button className="text-design4-green font-medium text-sm hover:text-design4-green/80 transition-colors">
                      Download Template →
                    </button>
                  </div>

                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-design4-neutral-100 hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 bg-design4-orange/10 rounded-xl flex items-center justify-center mb-4">
                      <TrendingUp className="w-6 h-6 text-design4-orange" />
                    </div>
                    <h3 className="text-lg font-semibold text-design4-ink mb-2">Strategic Goal Setting Framework</h3>
                    <p className="text-design4-neutral-500 text-sm mb-4">SMART goal template with alignment validation criteria</p>
                    <button className="text-design4-orange font-medium text-sm hover:text-design4-orange/80 transition-colors">
                      Download Template →
                    </button>
                  </div>

                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-design4-neutral-100 hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 bg-design4-plum/10 rounded-xl flex items-center justify-center mb-4">
                      <BarChart className="w-6 h-6 text-design4-plum" />
                    </div>
                    <h3 className="text-lg font-semibold text-design4-ink mb-2">Outcome Measurement Template</h3>
                    <p className="text-design4-neutral-500 text-sm mb-4">Framework for defining metrics, baselines, and tracking mechanisms</p>
                    <button className="text-design4-plum font-medium text-sm hover:text-design4-plum/80 transition-colors">
                      Download Template →
                    </button>
                  </div>

                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-design4-neutral-100 hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 bg-design4-purple/10 rounded-xl flex items-center justify-center mb-4">
                      <Layout className="w-6 h-6 text-design4-purple" />
                    </div>
                    <h3 className="text-lg font-semibold text-design4-ink mb-2">Review Meeting Agenda Template</h3>
                    <p className="text-design4-neutral-500 text-sm mb-4">Structured agenda for quarterly outcomes model review sessions</p>
                    <button className="text-design4-purple font-medium text-sm hover:text-design4-purple/80 transition-colors">
                      Download Template →
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Roles and Responsibilities */}
            <section id="roles" className="bg-design4-neutral-100 py-10 scroll-mt-24">
              <div className="mx-auto max-w-design4-container px-6">
                <div className="text-left mb-8">
                  <h2 className="text-2xl lg:text-3xl font-bold text-design4-ink mb-3">
                    Roles and Responsibilities
                  </h2>
                  <p className="text-base text-design4-neutral-500 max-w-2xl">
                    Clear accountability for successful outcomes model development
                  </p>
                </div>

                <div className="bg-white rounded-3xl p-8 shadow-sm border border-design4-neutral-100 overflow-hidden">
                  <div className="grid gap-6">
                    <div className="grid lg:grid-cols-6 gap-4 py-1 border-b border-design4-neutral-100 font-semibold text-design4-ink">
                      <div className="lg:col-span-2">Role</div>
                      <div className="lg:col-span-4">Primary Responsibilities</div>
                    </div>

                    <div className="grid lg:grid-cols-6 gap-4 py-1 border-b border-design4-neutral-100">
                      <div className="lg:col-span-2 font-medium text-design4-ink">Executive Sponsor</div>
                      <div className="lg:col-span-4 text-design4-neutral-600">Overall accountability, resource allocation, strategic decisions</div>
                    </div>

                    <div className="grid lg:grid-cols-6 gap-4 py-1 border-b border-design4-neutral-100">
                      <div className="lg:col-span-2 font-medium text-design4-ink">Strategy Team</div>
                      <div className="lg:col-span-4 text-design4-neutral-600">Framework development, goal setting, performance monitoring</div>
                    </div>

                    <div className="grid lg:grid-cols-6 gap-4 py-1 border-b border-design4-neutral-100">
                      <div className="lg:col-span-2 font-medium text-design4-ink">Customer Experience Team</div>
                      <div className="lg:col-span-4 text-design4-neutral-600">Customer needs research, stakeholder management</div>
                    </div>

                    <div className="grid lg:grid-cols-6 gap-4 py-1 border-b border-design4-neutral-100">
                      <div className="lg:col-span-2 font-medium text-design4-ink">Product/Marketing Teams</div>
                      <div className="lg:col-span-4 text-design4-neutral-600">Requirements gathering, customer insight generation</div>
                    </div>

                    <div className="grid lg:grid-cols-6 gap-4 py-1 border-b border-design4-neutral-100">
                      <div className="lg:col-span-2 font-medium text-design4-ink">Operations Team</div>
                      <div className="lg:col-span-4 text-design4-neutral-600">Implementation support, data collection, reporting</div>
                    </div>

                    <div className="grid lg:grid-cols-6 gap-4 py-1">
                      <div className="lg:col-span-2 font-medium text-design4-ink">Cross-functional Teams</div>
                      <div className="lg:col-span-4 text-design4-neutral-600">Initiative execution, tactical implementation</div>
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
                    Ready to Build Your Outcomes Model?
                  </h2>
                  <p className="text-lg text-white/90 max-w-2xl mx-auto mb-8">
                    Start developing an outcomes model that drives real business results and stakeholder success.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button className="inline-flex items-center bg-white text-design4-primary px-8 py-4 rounded-xl font-medium text-lg hover:bg-gray-50 hover:transform hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200">
                      <Download className="w-5 h-5 mr-2" />
                      Download Complete Playbook
                    </button>
                    <Link
                      href="/design4assessment"
                      className="inline-flex items-center text-white font-medium text-lg hover:text-white/80 transition-colors"
                    >
                      Take Assessment First →
                    </Link>
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