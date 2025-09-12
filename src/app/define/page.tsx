'use client'

import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { useState, useEffect } from 'react'
import Lottie from 'lottie-react'

function LottieGraphic({ src, alt, className }: { src: string, alt: string, className: string }) {
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

export default function DefinePage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-design4-bg">
      {/* Hero Section */}
      <section className="bg-design4-purple">
        <div className="mx-auto max-w-design4-container px-6 py-24">
          <div className="grid lg:grid-cols-[auto_1fr] gap-2 lg:gap-4 items-center">
            {/* Strategy Graphic */}
            <div className="flex justify-center lg:justify-start order-2 lg:order-1">
              <LottieGraphic
                src="/strategy.json"
                alt="Strategy Definition Animation"
                className="w-80 h-80"
              />
            </div>
            
            {/* Content */}
            <div className="text-center lg:text-left order-1 lg:order-2 lg:max-w-3xl">
              <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                Strategy is choice. Choose where you'll win.
              </h1>
              <p className="text-lg lg:text-xl text-white/80 mb-8">
                Most organizations try to be everything to everyone. Real strategy means deciding where to play, how to win, and what you won't do.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link 
                  href="/resources" 
                  className="inline-block bg-white text-design4-purple px-8 py-4 rounded-xl font-medium text-lg hover:transform hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-design4-gold focus:ring-offset-2 focus:ring-offset-design4-purple"
                >
                  Get Strategy Tools
                </Link>
                <Link 
                  href="/discover" 
                  className="inline-flex items-center text-white font-medium text-lg hover:text-white/80 transition-colors"
                >
                  ← Previous: Discover
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Strategy Definition Process */}
      <section className="bg-design4-bg">
        <div className="mx-auto max-w-design4-container px-6 py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-design4-ink mb-4">
              Strategic Definition Process
            </h2>
            <p className="text-lg text-design4-neutral-500 max-w-2xl mx-auto">
              Transform your organizational purpose into clear strategic direction through systematic definition methods.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <article className="bg-white border border-design4-neutral-100 rounded-2xl p-6 shadow-sm">
              <div className="w-12 h-12 bg-design4-purple rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-lg">1</span>
              </div>
              <h3 className="text-xl font-semibold text-design4-ink mb-3 text-center">
                Strategic Priorities
              </h3>
              <p className="text-design4-neutral-500 leading-relaxed text-center">
                Define clear strategic priorities that align with your purpose and address key stakeholder needs.
              </p>
            </article>

            {/* Step 2 */}
            <article className="bg-white border border-design4-neutral-100 rounded-2xl p-6 shadow-sm">
              <div className="w-12 h-12 bg-design4-purple rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-lg">2</span>
              </div>
              <h3 className="text-xl font-semibold text-design4-ink mb-3 text-center">
                Value Proposition
              </h3>
              <p className="text-design4-neutral-500 leading-relaxed text-center">
                Craft compelling value propositions that clearly articulate how you create value for each stakeholder group.
              </p>
            </article>

            {/* Step 3 */}
            <article className="bg-white border border-design4-neutral-100 rounded-2xl p-6 shadow-sm">
              <div className="w-12 h-12 bg-design4-purple rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-lg">3</span>
              </div>
              <h3 className="text-xl font-semibold text-design4-ink mb-3 text-center">
                Strategic Roadmap
              </h3>
              <p className="text-design4-neutral-500 leading-relaxed text-center">
                Create a clear roadmap that sequences initiatives and establishes accountability for strategic execution.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* Strategy Tools */}
      <section className="bg-design4-neutral-100">
        <div className="mx-auto max-w-design4-container px-6 py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-design4-ink mb-4">
              Strategy Definition Tools
            </h2>
            <p className="text-lg text-design4-neutral-500 max-w-2xl mx-auto">
              Practical frameworks to help you define and communicate clear strategic direction.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Strategy Canvas */}
            <article className="bg-white border border-design4-neutral-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="inline-block bg-design4-purple text-white rounded-full px-3 py-1 text-sm font-medium mb-4">
                Canvas
              </div>
              <h3 className="text-xl font-semibold text-design4-ink mb-3">
                Strategy Definition Canvas
              </h3>
              <p className="text-design4-neutral-500 mb-4 leading-relaxed">
                Visualize your strategic priorities, value propositions, and key initiatives on a single collaborative canvas.
              </p>
              <Link 
                href="/resources" 
                className="inline-flex items-center font-medium text-design4-primary hover:text-design4-purple transition-colors"
              >
                Download Canvas →
              </Link>
            </article>

            {/* Value Proposition Workshop */}
            <article className="bg-white border border-design4-neutral-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="inline-block bg-design4-purple text-white rounded-full px-3 py-1 text-sm font-medium mb-4">
                Workshop
              </div>
              <h3 className="text-xl font-semibold text-design4-ink mb-3">
                Value Proposition Workshop
              </h3>
              <p className="text-design4-neutral-500 mb-4 leading-relaxed">
                Facilitate sessions to define compelling value propositions that resonate with your target stakeholders.
              </p>
              <Link 
                href="/resources" 
                className="inline-flex items-center font-medium text-design4-primary hover:text-design4-purple transition-colors"
              >
                Run the Workshop →
              </Link>
            </article>

            {/* Strategic Planning */}
            <article className="bg-white border border-design4-neutral-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="inline-block bg-design4-purple text-white rounded-full px-3 py-1 text-sm font-medium mb-4">
                Framework
              </div>
              <h3 className="text-xl font-semibold text-design4-ink mb-3">
                Strategic Roadmap Builder
              </h3>
              <p className="text-design4-neutral-500 mb-4 leading-relaxed">
                Create clear, actionable roadmaps that sequence strategic initiatives and establish accountability.
              </p>
              <Link 
                href="/resources" 
                className="inline-flex items-center font-medium text-design4-primary hover:text-design4-purple transition-colors"
              >
                Build Your Roadmap →
              </Link>
            </article>

            {/* AI Strategy Assistant */}
            <article className="bg-white border border-design4-neutral-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="inline-block bg-design4-purple text-white rounded-full px-3 py-1 text-sm font-medium mb-4">
                AI Assistant
              </div>
              <h3 className="text-xl font-semibold text-design4-ink mb-3">
                Strategy Definition AI
              </h3>
              <p className="text-design4-neutral-500 mb-4 leading-relaxed">
                Get AI-powered guidance on defining strategic priorities and crafting compelling value propositions.
              </p>
              <Link 
                href="/ai-strategy" 
                className="inline-flex items-center font-medium text-design4-primary hover:text-design4-purple transition-colors"
              >
                Ask the AI →
              </Link>
            </article>
          </div>
        </div>
      </section>

      {/* Key Strategic Questions */}
      <section className="bg-design4-purple">
        <div className="mx-auto max-w-design4-container px-6 py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Key Strategic Questions
            </h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Guide your strategic definition process with these fundamental questions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/10 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-3">Strategic Direction</h3>
              <ul className="space-y-2 text-white/90">
                <li>• What are our 3-5 most important strategic priorities?</li>
                <li>• How do these priorities connect to our purpose?</li>
                <li>• What trade-offs are we willing to make?</li>
                <li>• How will we know we're making progress?</li>
              </ul>
            </div>

            <div className="bg-white/10 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-3">Value Creation</h3>
              <ul className="space-y-2 text-white/90">
                <li>• What unique value do we provide?</li>
                <li>• How do we solve stakeholder problems?</li>
                <li>• What makes us different from alternatives?</li>
                <li>• How can we strengthen our competitive advantage?</li>
              </ul>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link 
              href="/develop" 
              className="inline-block bg-white text-design4-purple px-8 py-4 rounded-xl font-medium text-lg hover:transform hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-design4-gold focus:ring-offset-2 focus:ring-offset-design4-purple"
            >
              Next: Develop Capabilities →
            </Link>
          </div>
        </div>
      </section>
      </main>
      <Footer />
    </>
  )
}