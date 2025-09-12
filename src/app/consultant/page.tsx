'use client'

import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { useState, useEffect } from 'react'
import Lottie from 'lottie-react'

function LottieGraphic({ src, alt, className }) {
  const [animationData, setAnimationData] = useState(null)

  useEffect(() => {
    fetch(src)
      .then(response => response.json())
      .then(data => setAnimationData(data))
      .catch(error => console.error('Error loading Lottie animation:', error))
  }, [src])

  if (!animationData) {
    return <div className={className}>Loading...</div>
  }

  return <Lottie animationData={animationData} className={className} />
}

export default function ConsultantPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-design4-teal">
        {/* Hero Section */}
        <section className="bg-design4-teal">
          <div className="mx-auto max-w-design4-container px-6 py-24">
            <div className="flex flex-col lg:flex-row items-center gap-8 max-w-6xl mx-auto">
              {/* Content */}
              <div className="flex-1 text-center lg:text-left order-2 lg:order-1">
                <div className="inline-block bg-white text-design4-teal rounded-full px-4 py-2 text-sm font-medium mb-6">
                  For Consultants & Business Architects
                </div>
                <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                  Master the methodology.
                </h1>
                <p className="text-lg lg:text-xl text-white/80 max-w-3xl mx-auto lg:mx-0 mb-8">
                  Give your clients a proven framework that creates lasting transformation. The Design4 methodology helps you guide organizations from purpose to performance—building the sustainable change they'll credit you for.
                </p>
              </div>
              
              {/* Consultant Graphic */}
              <div className="flex-shrink-0 order-1 lg:order-2">
                <div className="w-80 h-80 flex items-center justify-center">
                  <LottieGraphic 
                    src="/businessman.json" 
                    alt="Consultant / Business Architect" 
                    className="w-64 h-64" 
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Consultant Challenge */}
        <section className="bg-design4-bg py-20">
          <div className="mx-auto max-w-design4-container px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-design4-ink mb-4">
                The Consultant's Dilemma
              </h2>
              <p className="text-lg text-design4-neutral-500 max-w-2xl mx-auto">
                Your clients know they need to change, but transformation projects often fail because they lack a systematic approach.
              </p>
            </div>
            
            {/* Challenge Points */}
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <article className="text-center">
                <div className="w-16 h-16 bg-design4-green/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <div className="w-8 h-8 bg-design4-green rounded-full"></div>
                </div>
                <h3 className="text-xl font-bold text-design4-ink mb-4">
                  Where to Start?
                </h3>
                <p className="text-design4-neutral-500 leading-relaxed">
                  Organizations often struggle with knowing where to begin their transformation journey.
                </p>
              </article>

              <article className="text-center">
                <div className="w-16 h-16 bg-design4-green/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <div className="w-8 h-8 bg-design4-green rounded-sm"></div>
                </div>
                <h3 className="text-xl font-bold text-design4-ink mb-4">
                  Sustaining Progress
                </h3>
                <p className="text-design4-neutral-500 leading-relaxed">
                  Initial momentum fades without systematic processes to maintain and build on change.
                </p>
              </article>

              <article className="text-center">
                <div className="w-16 h-16 bg-design4-green/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <div className="w-8 h-8 bg-design4-green rounded-full transform rotate-45"></div>
                </div>
                <h3 className="text-xl font-bold text-design4-ink mb-4">
                  Proving Value
                </h3>
                <p className="text-design4-neutral-500 leading-relaxed">
                  Without clear methodology, it's hard to demonstrate lasting impact and ROI.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* Design4 Methodology */}
        <section className="bg-design4-neutral-100 py-20">
          <div className="mx-auto max-w-design4-container px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-design4-ink mb-4">
                The Design4 Methodology for Consultants
              </h2>
              <p className="text-lg text-design4-neutral-500 max-w-2xl mx-auto">
                A proven framework that guides clients through systematic transformation with measurable results.
              </p>
            </div>

            {/* Framework Visual */}
            <div className="max-w-5xl mx-auto mb-12">
              <div className="relative">
                <img 
                  src="/design4_logo_color.svg" 
                  alt="Design4 Methodology for Consultants" 
                  className="w-full h-auto"
                />
                {/* Consultant annotations */}
                <div className="absolute top-1/4 left-1/4 bg-design4-green text-design4-ink px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                  Discovery Phase
                </div>
                <div className="absolute top-1/3 right-1/4 bg-design4-plum text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                  Design Phase
                </div>
                <div className="absolute bottom-1/3 left-1/3 bg-design4-orange text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                  Implementation
                </div>
              </div>
            </div>

            {/* Consultant Tools */}
            <div className="grid md:grid-cols-2 gap-8">
              <article className="bg-white border border-design4-neutral-100 rounded-2xl p-8">
                <div className="inline-block bg-design4-green text-design4-ink rounded-full px-3 py-1 text-sm font-medium mb-4">
                  Client Engagement
                </div>
                <h3 className="text-xl font-bold text-design4-ink mb-4">
                  Structured Assessment Tools
                </h3>
                <p className="text-design4-neutral-500 mb-4">
                  Start every engagement with comprehensive diagnostics that reveal exactly where to focus your efforts.
                </p>
                <ul className="space-y-2 text-design4-neutral-500">
                  <li>• Organization readiness assessment</li>
                  <li>• Leadership alignment evaluation</li>
                  <li>• Capability gap analysis</li>
                  <li>• Performance baseline measurement</li>
                </ul>
              </article>

              <article className="bg-white border border-design4-neutral-100 rounded-2xl p-8">
                <div className="inline-block bg-design4-green text-design4-ink rounded-full px-3 py-1 text-sm font-medium mb-4">
                  Implementation
                </div>
                <h3 className="text-xl font-bold text-design4-ink mb-4">
                  Proven Intervention Frameworks
                </h3>
                <p className="text-design4-neutral-500 mb-4">
                  Deploy time-tested methodologies that create sustainable change across all organizational levels.
                </p>
                <ul className="space-y-2 text-design4-neutral-500">
                  <li>• Purpose alignment workshops</li>
                  <li>• Strategic planning facilitation</li>
                  <li>• Capability development programs</li>
                  <li>• Performance management systems</li>
                </ul>
              </article>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-design4-green py-20">
          <div className="mx-auto max-w-design4-container px-6">
            <div className="text-center">
              <h2 className="text-3xl lg:text-4xl font-bold text-design4-ink mb-6">
                Ready to Master the Methodology?
              </h2>
              <p className="text-lg text-design4-ink/80 max-w-2xl mx-auto mb-8">
                Get access to the complete Design4 consultant toolkit—assessment templates, intervention frameworks, and implementation guides that help you deliver transformational results for every client.
              </p>
              <Link 
                href="/design4assessment"
                className="inline-block bg-design4-ink text-design4-green px-8 py-4 rounded-xl font-medium text-lg hover:transform hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-design4-gold focus:ring-offset-2 focus:ring-offset-design4-green"
              >
                Start with the Design4 Assessment
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}