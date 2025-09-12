'use client'

import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { useState, useEffect } from 'react'
import Lottie from 'lottie-react'

function LottieGraphic({ src, alt, className }: { src: string, alt: string, className: string }) {
  const [animationData, setAnimationData] = useState<any>(null)

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

export default function DeliverPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-design4-orange">
      {/* Hero Section */}
      <section className="bg-design4-orange">
        <div className="mx-auto max-w-design4-container px-6 py-24">
          <div className="grid lg:grid-cols-[auto_1fr] gap-2 lg:gap-4 items-center">
            {/* Success Graphic */}
            <div className="flex justify-center lg:justify-start order-2 lg:order-1">
              <LottieGraphic
                src="/success.json"
                alt="Success Delivery Animation"
                className="w-80 h-80"
              />
            </div>
            
            {/* Content */}
            <div className="text-center lg:text-left order-1 lg:order-2 lg:max-w-2xl">
              <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                Plans are only good intentions unless they become work.
              </h1>
              <p className="text-lg lg:text-xl text-white/90 mb-8">
                The best strategies mean nothing without disciplined execution. Effective delivery means clear objectives, focused effort, and the courage to abandon what doesn't work.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link 
                  href="/resources" 
                  className="inline-block bg-white text-design4-orange px-8 py-4 rounded-xl font-medium text-lg hover:transform hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-design4-gold focus:ring-offset-2 focus:ring-offset-design4-orange"
                >
                  Get Delivery Tools
                </Link>
                <Link 
                  href="/develop" 
                  className="inline-flex items-center text-white font-medium text-lg hover:text-white/80 transition-colors"
                >
                  ← Previous: Develop
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Delivery Process */}
      <section className="bg-design4-bg">
        <div className="mx-auto max-w-design4-container px-6 py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-design4-ink mb-4">
              Value Delivery Process
            </h2>
            <p className="text-lg text-design4-neutral-500 max-w-2xl mx-auto">
              Execute your strategy effectively by delivering consistent value through systematic operational excellence.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <article className="bg-white border border-design4-neutral-100 rounded-2xl p-6 shadow-sm">
              <div className="w-12 h-12 bg-design4-orange rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-lg">1</span>
              </div>
              <h3 className="text-xl font-semibold text-design4-ink mb-3 text-center">
                Operational Alignment
              </h3>
              <p className="text-design4-neutral-500 leading-relaxed text-center">
                Align daily operations with strategic priorities to ensure consistent value delivery to stakeholders.
              </p>
            </article>

            {/* Step 2 */}
            <article className="bg-white border border-design4-neutral-100 rounded-2xl p-6 shadow-sm">
              <div className="w-12 h-12 bg-design4-orange rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-lg">2</span>
              </div>
              <h3 className="text-xl font-semibold text-design4-ink mb-3 text-center">
                Performance Monitoring
              </h3>
              <p className="text-design4-neutral-500 leading-relaxed text-center">
                Establish systems to monitor performance, track outcomes, and measure value delivered to stakeholders.
              </p>
            </article>

            {/* Step 3 */}
            <article className="bg-white border border-design4-neutral-100 rounded-2xl p-6 shadow-sm">
              <div className="w-12 h-12 bg-design4-orange rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-lg">3</span>
              </div>
              <h3 className="text-xl font-semibold text-design4-ink mb-3 text-center">
                Continuous Improvement
              </h3>
              <p className="text-design4-neutral-500 leading-relaxed text-center">
                Drive continuous improvement through feedback loops, learning, and systematic optimization.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* Delivery Tools */}
      <section className="bg-design4-neutral-100">
        <div className="mx-auto max-w-design4-container px-6 py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-design4-ink mb-4">
              Value Delivery Tools
            </h2>
            <p className="text-lg text-design4-neutral-500 max-w-2xl mx-auto">
              Practical resources to help you execute strategy and deliver consistent value to stakeholders.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Operations Dashboard */}
            <article className="bg-white border border-design4-neutral-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="inline-block bg-design4-orange text-white rounded-full px-3 py-1 text-sm font-medium mb-4">
                Dashboard
              </div>
              <h3 className="text-xl font-semibold text-design4-ink mb-3">
                Operations Performance Dashboard
              </h3>
              <p className="text-design4-neutral-500 mb-4 leading-relaxed">
                Track key performance indicators and monitor the alignment between operations and strategic objectives.
              </p>
              <Link 
                href="/dashboard" 
                className="inline-flex items-center font-medium text-design4-primary hover:text-design4-plum transition-colors"
              >
                View Dashboard →
              </Link>
            </article>

            {/* Value Delivery Framework */}
            <article className="bg-white border border-design4-neutral-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="inline-block bg-design4-orange text-white rounded-full px-3 py-1 text-sm font-medium mb-4">
                Framework
              </div>
              <h3 className="text-xl font-semibold text-design4-ink mb-3">
                Value Delivery Framework
              </h3>
              <p className="text-design4-neutral-500 mb-4 leading-relaxed">
                Systematic approach to ensure consistent value delivery across all stakeholder touchpoints.
              </p>
              <Link 
                href="/resources" 
                className="inline-flex items-center font-medium text-design4-primary hover:text-design4-plum transition-colors"
              >
                Download Framework →
              </Link>
            </article>

            {/* Improvement Process */}
            <article className="bg-white border border-design4-neutral-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="inline-block bg-design4-orange text-white rounded-full px-3 py-1 text-sm font-medium mb-4">
                Process
              </div>
              <h3 className="text-xl font-semibold text-design4-ink mb-3">
                Continuous Improvement Process
              </h3>
              <p className="text-design4-neutral-500 mb-4 leading-relaxed">
                Establish systematic processes for identifying opportunities and implementing improvements.
              </p>
              <Link 
                href="/resources" 
                className="inline-flex items-center font-medium text-design4-primary hover:text-design4-plum transition-colors"
              >
                Implement Process →
              </Link>
            </article>

            {/* AI Delivery Assistant */}
            <article className="bg-white border border-design4-neutral-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="inline-block bg-design4-orange text-white rounded-full px-3 py-1 text-sm font-medium mb-4">
                AI Assistant
              </div>
              <h3 className="text-xl font-semibold text-design4-ink mb-3">
                Delivery Optimization AI
              </h3>
              <p className="text-design4-neutral-500 mb-4 leading-relaxed">
                Get AI-powered insights on optimizing operations and improving value delivery to stakeholders.
              </p>
              <Link 
                href="/ai-strategy" 
                className="inline-flex items-center font-medium text-design4-primary hover:text-design4-plum transition-colors"
              >
                Ask the AI →
              </Link>
            </article>
          </div>
        </div>
      </section>

      {/* Key Delivery Questions */}
      <section className="bg-design4-orange">
        <div className="mx-auto max-w-design4-container px-6 py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Key Delivery Questions
            </h2>
            <p className="text-lg text-white/90 max-w-2xl mx-auto">
              Ensure excellence in execution with these fundamental delivery questions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/10 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-3">Operational Excellence</h3>
              <ul className="space-y-2 text-white/90">
                <li>• Are our operations aligned with strategic priorities?</li>
                <li>• How consistently do we deliver value?</li>
                <li>• What bottlenecks are preventing better performance?</li>
                <li>• How can we improve efficiency and quality?</li>
              </ul>
            </div>

            <div className="bg-white/10 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-3">Value & Impact</h3>
              <ul className="space-y-2 text-white/90">
                <li>• Are we delivering the value stakeholders expect?</li>
                <li>• How do we measure and track our impact?</li>
                <li>• What feedback are we getting from stakeholders?</li>
                <li>• How can we continuously improve our delivery?</li>
              </ul>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link 
              href="/discover" 
              className="inline-block bg-white text-design4-orange px-8 py-4 rounded-xl font-medium text-lg hover:transform hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-design4-gold focus:ring-offset-2 focus:ring-offset-design4-orange"
            >
              Complete the Cycle: Discover →
            </Link>
          </div>
        </div>
      </section>
      </main>
      <Footer />
    </>
  )
}