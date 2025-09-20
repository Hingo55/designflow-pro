'use client'

import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { ArrowRight, CheckCircle, Download, Clock, Users, Target, Zap } from 'lucide-react'

export default function PlaybookPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-design4-bg">
        {/* Breadcrumb */}
        <section className="bg-design4-bg border-b border-design4-neutral-100">
          <div className="mx-auto max-w-design4-container px-6 py-4">
            <nav className="flex items-center space-x-2 text-sm text-design4-neutral-500">
              <Link href="/" className="hover:text-design4-primary transition-colors">Home</Link>
              <span>/</span>
              <Link href="/resources" className="hover:text-design4-primary transition-colors">Resources</Link>
              <span>/</span>
              <span className="text-design4-ink">Playbook</span>
            </nav>
          </div>
        </section>

        {/* Hero Section */}
        <section className="bg-gradient-to-br from-design4-primary via-design4-purple to-design4-plum py-20">
          <div className="mx-auto max-w-design4-container px-6">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center bg-white/10 text-white rounded-full px-6 py-3 text-sm font-medium mb-6">
                <Target className="w-4 h-4 mr-2" />
                Design4 Implementation Playbook
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight mb-6">
                Your Complete Guide to Design4 Implementation
              </h1>
              <p className="text-lg lg:text-xl text-white/90 mb-8 leading-relaxed">
                Master the art of organizational transformation with our comprehensive playbook. Step-by-step guidance, proven frameworks, and practical tools to implement Design4 successfully.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="inline-flex items-center bg-white text-design4-primary px-8 py-4 rounded-xl font-medium text-lg hover:bg-gray-50 hover:transform hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200">
                  <Download className="w-5 h-5 mr-2" />
                  Download Complete Playbook
                </button>
                <Link
                  href="#quick-start"
                  className="inline-flex items-center text-white font-medium text-lg hover:text-white/80 transition-colors"
                >
                  Start Reading →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Start Guide */}
        <section id="quick-start" className="bg-design4-bg py-20">
          <div className="mx-auto max-w-design4-container px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-design4-ink mb-4">
                Quick Start Guide
              </h2>
              <p className="text-lg text-design4-neutral-500 max-w-2xl mx-auto">
                Get started with Design4 in your organization with these essential first steps
              </p>
            </div>

            <div className="grid lg:grid-cols-4 gap-6 mb-16">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-design4-neutral-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-design4-gold/10 rounded-xl flex items-center justify-center mb-4">
                  <span className="text-design4-gold font-bold text-lg">1</span>
                </div>
                <h3 className="text-lg font-semibold text-design4-ink mb-2">Assess Current State</h3>
                <p className="text-design4-neutral-500 text-sm mb-4">Evaluate where your organization stands across the Design4 dimensions</p>
                <Link href="/design4assessment" className="text-design4-gold font-medium text-sm hover:text-design4-gold/80 transition-colors">
                  Take Assessment →
                </Link>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-design4-neutral-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-design4-primary/10 rounded-xl flex items-center justify-center mb-4">
                  <span className="text-design4-primary font-bold text-lg">2</span>
                </div>
                <h3 className="text-lg font-semibold text-design4-ink mb-2">Form Your Team</h3>
                <p className="text-design4-neutral-500 text-sm mb-4">Assemble a cross-functional team to lead the transformation</p>
                <button className="text-design4-primary font-medium text-sm hover:text-design4-primary/80 transition-colors">
                  Team Guide →
                </button>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-design4-neutral-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-design4-green/10 rounded-xl flex items-center justify-center mb-4">
                  <span className="text-design4-green font-bold text-lg">3</span>
                </div>
                <h3 className="text-lg font-semibold text-design4-ink mb-2">Plan Your Journey</h3>
                <p className="text-design4-neutral-500 text-sm mb-4">Create a roadmap tailored to your organization's needs</p>
                <button className="text-design4-green font-medium text-sm hover:text-design4-green/80 transition-colors">
                  Planning Tool →
                </button>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-design4-neutral-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-design4-orange/10 rounded-xl flex items-center justify-center mb-4">
                  <span className="text-design4-orange font-bold text-lg">4</span>
                </div>
                <h3 className="text-lg font-semibold text-design4-ink mb-2">Start Implementing</h3>
                <p className="text-design4-neutral-500 text-sm mb-4">Begin with quick wins and build momentum</p>
                <button className="text-design4-orange font-medium text-sm hover:text-design4-orange/80 transition-colors">
                  Quick Wins →
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Playbook Sections */}
        <section className="bg-design4-neutral-100 py-20">
          <div className="mx-auto max-w-design4-container px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-design4-ink mb-4">
                Playbook Sections
              </h2>
              <p className="text-lg text-design4-neutral-500 max-w-2xl mx-auto">
                Comprehensive guidance for every phase of your Design4 implementation
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Discover Playbook */}
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-design4-neutral-100 hover:shadow-lg transition-shadow duration-200">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-design4-gold/10 rounded-2xl flex items-center justify-center mr-4">
                    <Users className="w-8 h-8 text-design4-gold" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-design4-ink">Discover Phase</h3>
                    <p className="text-design4-neutral-500">Uncover your organization's purpose</p>
                  </div>
                </div>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-sm text-design4-neutral-500">
                    <CheckCircle className="w-4 h-4 mr-2 text-design4-green" />
                    Stakeholder mapping and engagement
                  </div>
                  <div className="flex items-center text-sm text-design4-neutral-500">
                    <CheckCircle className="w-4 h-4 mr-2 text-design4-green" />
                    Purpose discovery workshops
                  </div>
                  <div className="flex items-center text-sm text-design4-neutral-500">
                    <CheckCircle className="w-4 h-4 mr-2 text-design4-green" />
                    Success metrics definition
                  </div>
                  <div className="flex items-center text-sm text-design4-neutral-500">
                    <CheckCircle className="w-4 h-4 mr-2 text-design4-green" />
                    Current state assessment
                  </div>
                </div>
                <div className="flex items-center text-sm text-design4-neutral-500 mb-6">
                  <Clock className="w-4 h-4 mr-2" />
                  Estimated timeline: 4-6 weeks
                </div>
                <Link
                  href="/discover"
                  className="inline-flex items-center text-design4-gold font-medium hover:text-design4-gold/80 transition-colors"
                >
                  View Discover Guide <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>

              {/* Define Playbook */}
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-design4-neutral-100 hover:shadow-lg transition-shadow duration-200">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-design4-purple/10 rounded-2xl flex items-center justify-center mr-4">
                    <Target className="w-8 h-8 text-design4-purple" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-design4-ink">Define Phase</h3>
                    <p className="text-design4-neutral-500">Transform purpose into strategy</p>
                  </div>
                </div>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-sm text-design4-neutral-500">
                    <CheckCircle className="w-4 h-4 mr-2 text-design4-green" />
                    Strategic priority setting
                  </div>
                  <div className="flex items-center text-sm text-design4-neutral-500">
                    <CheckCircle className="w-4 h-4 mr-2 text-design4-green" />
                    Value proposition development
                  </div>
                  <div className="flex items-center text-sm text-design4-neutral-500">
                    <CheckCircle className="w-4 h-4 mr-2 text-design4-green" />
                    Strategic roadmap creation
                  </div>
                  <div className="flex items-center text-sm text-design4-neutral-500">
                    <CheckCircle className="w-4 h-4 mr-2 text-design4-green" />
                    Resource allocation planning
                  </div>
                </div>
                <div className="flex items-center text-sm text-design4-neutral-500 mb-6">
                  <Clock className="w-4 h-4 mr-2" />
                  Estimated timeline: 6-8 weeks
                </div>
                <Link
                  href="/define"
                  className="inline-flex items-center text-design4-purple font-medium hover:text-design4-purple/80 transition-colors"
                >
                  View Define Guide <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>

              {/* Develop Playbook */}
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-design4-neutral-100 hover:shadow-lg transition-shadow duration-200">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-design4-green/10 rounded-2xl flex items-center justify-center mr-4">
                    <Zap className="w-8 h-8 text-design4-green" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-design4-ink">Develop Phase</h3>
                    <p className="text-design4-neutral-500">Build execution capabilities</p>
                  </div>
                </div>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-sm text-design4-neutral-500">
                    <CheckCircle className="w-4 h-4 mr-2 text-design4-green" />
                    Capability gap analysis
                  </div>
                  <div className="flex items-center text-sm text-design4-neutral-500">
                    <CheckCircle className="w-4 h-4 mr-2 text-design4-green" />
                    Process design and optimization
                  </div>
                  <div className="flex items-center text-sm text-design4-neutral-500">
                    <CheckCircle className="w-4 h-4 mr-2 text-design4-green" />
                    Skills development programs
                  </div>
                  <div className="flex items-center text-sm text-design4-neutral-500">
                    <CheckCircle className="w-4 h-4 mr-2 text-design4-green" />
                    Technology enablement
                  </div>
                </div>
                <div className="flex items-center text-sm text-design4-neutral-500 mb-6">
                  <Clock className="w-4 h-4 mr-2" />
                  Estimated timeline: 8-12 weeks
                </div>
                <Link
                  href="/develop"
                  className="inline-flex items-center text-design4-green font-medium hover:text-design4-green/80 transition-colors"
                >
                  View Develop Guide <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>

              {/* Deliver Playbook */}
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-design4-neutral-100 hover:shadow-lg transition-shadow duration-200">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-design4-orange/10 rounded-2xl flex items-center justify-center mr-4">
                    <Target className="w-8 h-8 text-design4-orange" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-design4-ink">Deliver Phase</h3>
                    <p className="text-design4-neutral-500">Execute and optimize value delivery</p>
                  </div>
                </div>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-sm text-design4-neutral-500">
                    <CheckCircle className="w-4 h-4 mr-2 text-design4-green" />
                    Operational alignment setup
                  </div>
                  <div className="flex items-center text-sm text-design4-neutral-500">
                    <CheckCircle className="w-4 h-4 mr-2 text-design4-green" />
                    Performance monitoring systems
                  </div>
                  <div className="flex items-center text-sm text-design4-neutral-500">
                    <CheckCircle className="w-4 h-4 mr-2 text-design4-green" />
                    Continuous improvement processes
                  </div>
                  <div className="flex items-center text-sm text-design4-neutral-500">
                    <CheckCircle className="w-4 h-4 mr-2 text-design4-green" />
                    Value measurement and reporting
                  </div>
                </div>
                <div className="flex items-center text-sm text-design4-neutral-500 mb-6">
                  <Clock className="w-4 h-4 mr-2" />
                  Estimated timeline: Ongoing
                </div>
                <Link
                  href="/deliver"
                  className="inline-flex items-center text-design4-orange font-medium hover:text-design4-orange/80 transition-colors"
                >
                  View Deliver Guide <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Implementation Resources */}
        <section className="bg-design4-bg py-20">
          <div className="mx-auto max-w-design4-container px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-design4-ink mb-4">
                Implementation Resources
              </h2>
              <p className="text-lg text-design4-neutral-500 max-w-2xl mx-auto">
                Essential tools and templates to support your Design4 implementation
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-design4-neutral-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-design4-primary/10 rounded-xl flex items-center justify-center mb-4">
                  <Download className="w-6 h-6 text-design4-primary" />
                </div>
                <h3 className="text-lg font-semibold text-design4-ink mb-2">Template Library</h3>
                <p className="text-design4-neutral-500 text-sm mb-4">Download all templates, worksheets, and canvases in one package</p>
                <button className="text-design4-primary font-medium text-sm hover:text-design4-primary/80 transition-colors">
                  Download Templates →
                </button>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-design4-neutral-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-design4-green/10 rounded-xl flex items-center justify-center mb-4">
                  <CheckCircle className="w-6 h-6 text-design4-green" />
                </div>
                <h3 className="text-lg font-semibold text-design4-ink mb-2">Checklists & Guides</h3>
                <p className="text-design4-neutral-500 text-sm mb-4">Step-by-step checklists for each phase of implementation</p>
                <button className="text-design4-green font-medium text-sm hover:text-design4-green/80 transition-colors">
                  View Checklists →
                </button>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-design4-neutral-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-design4-orange/10 rounded-xl flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-design4-orange" />
                </div>
                <h3 className="text-lg font-semibold text-design4-ink mb-2">Training Materials</h3>
                <p className="text-design4-neutral-500 text-sm mb-4">Presentations and workshop materials for team training</p>
                <button className="text-design4-orange font-medium text-sm hover:text-design4-orange/80 transition-colors">
                  Access Training →
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Get Started CTA */}
        <section className="bg-design4-primary py-20">
          <div className="mx-auto max-w-design4-container px-6">
            <div className="text-center">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                Ready to Transform Your Organization?
              </h2>
              <p className="text-lg text-white/90 max-w-2xl mx-auto mb-8">
                Start your Design4 implementation today with our comprehensive playbook and expert guidance.
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
      </main>
      <Footer />
    </>
  )
}