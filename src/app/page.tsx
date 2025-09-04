'use client'

import Link from 'next/link'
import Navigation from '@/components/Navigation'
import PersonaSelector from '@/components/PersonaSelector'
import { useState } from 'react'
import { Compass } from 'lucide-react'
import { usePersona } from '@/hooks/usePersona'

export default function Home() {
  const [isPersonaSelectorOpen, setIsPersonaSelectorOpen] = useState(false)
  const { selectedPersona, handlePersonaSelect } = usePersona()

  const getHeroText = () => {
    switch (selectedPersona) {
      case 'founder-innovator':
        return "Most startups lose their way as they scale—vision gets diluted, strategy gets scattered, and systems break under growth pressure. The Design4 Framework helps you build a business that scales without losing what made you successful in the first place."
      case 'transformation-leader':
        return "Most organizations struggle to execute strategy effectively—purpose gets lost in quarterly pressures, priorities multiply without focus, and departments work in silos. The Design4 Framework aligns your leadership team around what matters most, creating sustainable performance at every level."
      case 'consultant-architect':
        return "Most organizations know they need to change but struggle with where to start and how to sustain progress. The Design4 Framework gives you a proven methodology to guide clients from purpose to performance—creating lasting transformation they'll credit you for."
      case 'project-operations':
        return "Most organizations have great strategies that fail in execution—processes don't connect, capabilities aren't aligned, and performance metrics miss the mark. The Design4 Framework bridges strategy and operations, ensuring what gets planned actually gets done."
      default:
        return "Most businesses struggle to stay aligned as they grow and change. The Design4 Framework keeps your outcomes, strategy, capabilities, and operations working together—no matter what comes next."
    }
  }

  const getButtonConfig = () => {
    switch (selectedPersona) {
      case 'founder-innovator':
        return {
          text: "Scale without losing focus",
          href: "/founder"
        }
      case 'transformation-leader':
        return {
          text: "Align your leadership team",
          href: "/transformation-leader"
        }
      case 'consultant-architect':
        return {
          text: "Master the methodology",
          href: "/consultant"
        }
      case 'project-operations':
        return {
          text: "Bridge strategy and execution",
          href: "/project-operations"
        }
      default:
        return {
          text: "Get the Framework",
          href: "/resources"
        }
    }
  }
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-design4-bg">
      {/* Persona Selector Trigger - Top Banner */}
      <section className="bg-design4-bg border-b border-design4-neutral-100">
        <div className="mx-auto max-w-design4-container px-6 py-4">
          <div className="text-center">
            <div className={`relative inline-block ${selectedPersona ? 'p-0.5' : 'p-1 overflow-hidden animate-border-chase'} rounded-xl`} style={selectedPersona ? {} : {
              background: `linear-gradient(90deg, 
                transparent 0%, 
                transparent 20%, 
                #5F2762 25%, 
                #E5C823 30%, 
                #5F2762 35%, 
                transparent 40%, 
                transparent 100%)`,
              backgroundSize: '400% 100%'
            }}>
              <button
                onClick={() => setIsPersonaSelectorOpen(true)}
                className={`relative inline-flex items-center gap-2 bg-design4-gold text-design4-ink px-6 py-2 rounded-lg font-medium text-sm hover:bg-design4-gold/90 hover:scale-105 transition-all duration-200 focus:outline-none ${selectedPersona ? 'border-2 border-design4-primary/30' : ''}`}
              >
                <Compass className="w-4 h-4" />
                Discover how to use the Design4 Framework to accelerate your business success
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="bg-design4-bg">
        <div className="mx-auto max-w-design4-container px-6 py-24">
          <div className="flex flex-col lg:flex-row items-center gap-8 max-w-6xl mx-auto">
            {/* Content */}
            <div className="flex-1 text-center lg:text-left order-2 lg:order-1">
              <h1 className="text-5xl lg:text-6xl font-bold text-design4-ink leading-tight mb-6">
                Design business that works. And keeps working.
              </h1>
              <p className="text-lg lg:text-xl text-design4-neutral-500 mb-8">
                {getHeroText()}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <div className={`${selectedPersona ? 'relative inline-block p-1 rounded-xl overflow-hidden animate-border-chase' : 'inline-block'}`} style={selectedPersona ? {
                  background: `linear-gradient(90deg, 
                    transparent 0%, 
                    transparent 20%, 
                    #5F2762 25%, 
                    #E5C823 30%, 
                    #5F2762 35%, 
                    transparent 40%, 
                    transparent 100%)`,
                  backgroundSize: '400% 100%'
                } : {}}>
                  <Link 
                    href={getButtonConfig().href}
                    className="inline-block bg-design4-primary text-white px-8 py-4 rounded-xl font-medium text-lg hover:transform hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-design4-gold focus:ring-offset-2"
                  >
                    {getButtonConfig().text}
                  </Link>
                </div>
                <Link 
                  href={`/ai-strategy${selectedPersona ? `?persona=${selectedPersona}` : ''}`} 
                  className="inline-flex items-center text-design4-primary font-medium text-lg hover:text-design4-plum transition-colors"
                >
                  Try the AI Assistant →
                </Link>
              </div>
            </div>

            {/* Design4 Logo Graphic */}
            <div className="flex-shrink-0 order-1 lg:order-2">
              <img 
                src="/design4gears.svg" 
                alt="Design4 Framework Gears - Discover, Define, Develop, Deliver" 
                className="w-80 h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Design4 Phases Cards */}
      <section className="bg-design4-neutral-100">
        <div className="mx-auto max-w-design4-container px-6 py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-design4-ink mb-4">
              Four Principles That Connect Strategy to Execution
            </h2>
            <p className="text-lg text-design4-neutral-500 max-w-2xl mx-auto">
              The Design4 framework helps organizations bridge the gap between strategic intent and operational reality.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Discover Card - First position */}
            <Link href="/discover">
              <article className="bg-white border border-design4-neutral-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer">
                <div className="inline-block bg-design4-gold text-design4-ink rounded-full px-3 py-1 text-sm font-medium mb-4">
                  Discover
                </div>
                <h3 className="text-xl font-semibold text-design4-ink mb-3">
                  Purpose
                </h3>
                <p className="text-design4-neutral-500 mb-4 leading-relaxed">
                  Are we getting the benefits?
                </p>
                <p className="text-sm text-design4-neutral-500">
                  Measure outcomes and drive continuous improvement through delivery focus.
                </p>
              </article>
            </Link>

            {/* Define Card - Second position */}
            <Link href="/define">
              <article className="bg-white border border-design4-neutral-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer">
                <div className="inline-block bg-design4-plum text-white rounded-full px-3 py-1 text-sm font-medium mb-4">
                  Define
                </div>
                <h3 className="text-xl font-semibold text-design4-ink mb-3">
                  Strategy
                </h3>
                <p className="text-design4-neutral-500 mb-4 leading-relaxed">
                  Are we doing the right things?
                </p>
                <p className="text-sm text-design4-neutral-500">
                  Connect organizational purpose to strategic direction through systematic discovery.
                </p>
              </article>
            </Link>

            {/* Develop Card - Third position */}
            <Link href="/develop">
              <article className="bg-white border border-design4-neutral-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer">
                <div className="inline-block bg-design4-green text-design4-ink rounded-full px-3 py-1 text-sm font-medium mb-4">
                  Develop
                </div>
                <h3 className="text-xl font-semibold text-design4-ink mb-3">
                  Capabilities
                </h3>
                <p className="text-design4-neutral-500 mb-4 leading-relaxed">
                  Are we doing things the right way?
                </p>
                <p className="text-sm text-design4-neutral-500">
                  Build systematic approaches and define core capabilities for execution.
                </p>
              </article>
            </Link>

            {/* Deliver Card - Fourth position */}
            <Link href="/deliver">
              <article className="bg-white border border-design4-neutral-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer">
                <div className="inline-block bg-design4-orange text-white rounded-full px-3 py-1 text-sm font-medium mb-4">
                  Deliver
                </div>
                <h3 className="text-xl font-semibold text-design4-ink mb-3">
                  Value
                </h3>
                <p className="text-design4-neutral-500 mb-4 leading-relaxed">
                  Are we getting them done well?
                </p>
                <p className="text-sm text-design4-neutral-500">
                  Align daily operations with strategic intent through continuous development.
                </p>
              </article>
            </Link>
          </div>
        </div>
      </section>

      {/* Tools & Resources */}
      <section className="bg-design4-bg">
        <div className="mx-auto max-w-design4-container px-6 py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-design4-ink mb-4">
              Tools That Turn Strategy Into Action
            </h2>
            <p className="text-lg text-design4-neutral-500 max-w-2xl mx-auto">
              Practical resources designed to help you implement the Design4 framework in your organization.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* AI Strategy Advisor */}
            <article className="bg-white border border-design4-neutral-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="inline-block bg-design4-gold text-design4-ink rounded-full px-3 py-1 text-sm font-medium mb-4">
                AI Advisor
              </div>
              <h3 className="text-xl font-semibold text-design4-ink mb-3">
                Strategy Assistant
              </h3>
              <p className="text-design4-neutral-500 mb-4 leading-relaxed">
                Get personalized guidance on implementing Design4 principles in your organization.
              </p>
              <Link 
                href={`/ai-strategy${selectedPersona ? `?persona=${selectedPersona}` : ''}`}
                className="inline-flex items-center font-medium text-design4-primary hover:text-design4-plum transition-colors"
              >
                Try the AI Advisor →
              </Link>
            </article>

            {/* Resources Library */}
            <article className="bg-white border border-design4-neutral-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="inline-block bg-design4-green text-design4-ink rounded-full px-3 py-1 text-sm font-medium mb-4">
                Library
              </div>
              <h3 className="text-xl font-semibold text-design4-ink mb-3">
                Templates & Guides
              </h3>
              <p className="text-design4-neutral-500 mb-4 leading-relaxed">
                Access frameworks, templates, and step-by-step guides for each Design4 phase.
              </p>
              <Link 
                href="/resources" 
                className="inline-flex items-center font-medium text-design4-primary hover:text-design4-plum transition-colors"
              >
                Explore Resources →
              </Link>
            </article>

            {/* Dashboard */}
            <article className="bg-white border border-design4-neutral-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="inline-block bg-design4-orange text-white rounded-full px-3 py-1 text-sm font-medium mb-4">
                Analytics
              </div>
              <h3 className="text-xl font-semibold text-design4-ink mb-3">
                Progress Dashboard
              </h3>
              <p className="text-design4-neutral-500 mb-4 leading-relaxed">
                Track your organization's progress through the Design4 transformation journey.
              </p>
              <Link 
                href="/dashboard" 
                className="inline-flex items-center font-medium text-design4-primary hover:text-design4-plum transition-colors"
              >
                View Dashboard →
              </Link>
            </article>
          </div>
        </div>
      </section>

      {/* What Makes Design4 Different */}
      <section className="bg-design4-primary">
        <div className="mx-auto max-w-design4-container px-6 py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              What Makes Design4 Different
            </h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Move beyond traditional planning approaches with a framework built for continuous adaptation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <div className="w-6 h-6 bg-white rounded-full"></div>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Continuous Design</h3>
              <p className="text-white/80 text-sm">Iterate and adapt continuously rather than plan annually</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <div className="w-6 h-6 bg-white rounded-full"></div>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Integration Patterns</h3>
              <p className="text-white/80 text-sm">Prevent strategy traps through systematic linkage</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <div className="w-6 h-6 bg-white rounded-full"></div>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Outcome-First</h3>
              <p className="text-white/80 text-sm">Build service models that enable stakeholder success</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <div className="w-6 h-6 bg-white rounded-full"></div>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Evidence-Based</h3>
              <p className="text-white/80 text-sm">Ground choices in data and stakeholder feedback</p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link 
              href="/resources" 
              className="inline-block bg-white text-design4-primary px-8 py-4 rounded-xl font-medium text-lg hover:transform hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-design4-gold focus:ring-offset-2 focus:ring-offset-design4-primary"
            >
              Get the Framework
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-design4-bg border-t border-design4-neutral-100">
        <div className="mx-auto max-w-design4-container px-6 py-12">
          <div className="text-center">
            <p className="text-design4-neutral-500">
              Design.biz
            </p>
            <p className="text-sm text-design4-neutral-500 mt-2">
              Empowering business leaders to design for sustainable growth
            </p>
          </div>
        </div>
      </footer>
      </main>

      {/* Persona Selector Popup */}
      <PersonaSelector 
        isOpen={isPersonaSelectorOpen}
        onClose={() => setIsPersonaSelectorOpen(false)}
        onPersonaSelect={handlePersonaSelect}
      />
    </>
  )
}