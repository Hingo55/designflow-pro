import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Design4 Resources | Design4.biz',
  description: 'Tools, templates, and guides for implementing the Design4 framework in your organization.',
}

export default function Resources() {
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


        {/* Tools & Templates */}
        <section className="bg-design4-bg py-20">
          <div className="mx-auto max-w-design4-container px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-design4-ink mb-4">
                Design4 Playbooks
              </h2>
              <p className="text-design4-neutral-500 max-w-2xl mx-auto mb-8">
                Practical resources to accelerate your Design4 implementation
              </p>

              {/* Filter Tabs */}
              <div className="flex flex-wrap justify-center gap-3">
                <button className="inline-flex items-center bg-design4-ink text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-design4-ink/90 transition-colors">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  All
                </button>
                <button className="inline-flex items-center bg-design4-neutral-100 text-design4-neutral-600 px-4 py-2 rounded-full text-sm font-medium hover:bg-design4-gold/10 hover:text-design4-gold transition-colors">
                  Discover
                </button>
                <button className="inline-flex items-center bg-design4-neutral-100 text-design4-neutral-600 px-4 py-2 rounded-full text-sm font-medium hover:bg-design4-purple/10 hover:text-design4-purple transition-colors">
                  Define
                </button>
                <button className="inline-flex items-center bg-design4-neutral-100 text-design4-neutral-600 px-4 py-2 rounded-full text-sm font-medium hover:bg-design4-green/10 hover:text-design4-green transition-colors">
                  Develop
                </button>
                <button className="inline-flex items-center bg-design4-neutral-100 text-design4-neutral-600 px-4 py-2 rounded-full text-sm font-medium hover:bg-design4-orange/10 hover:text-design4-orange transition-colors">
                  Deliver
                </button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="group bg-white rounded-2xl p-6 shadow-sm border border-design4-neutral-100 hover:shadow-lg hover:border-design4-gold/20 transition-all duration-200">
                <div className="w-12 h-12 bg-design4-gold/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-design4-gold/20 transition-colors">
                  <svg className="w-6 h-6 text-design4-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-design4-ink mb-2">Strategy Canvas</h3>
                <p className="text-design4-neutral-500 text-sm mb-4">Visualize and align your strategic direction with organizational purpose using this comprehensive template.</p>
                <button className="text-design4-gold font-medium text-sm hover:text-design4-gold/80 transition-colors">
                  View Template →
                </button>
              </div>

              <div className="group bg-white rounded-2xl p-6 shadow-sm border border-design4-neutral-100 hover:shadow-lg hover:border-design4-primary/20 transition-all duration-200">
                <div className="w-12 h-12 bg-design4-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-design4-primary/20 transition-colors">
                  <svg className="w-6 h-6 text-design4-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-design4-ink mb-2">Capability Assessment</h3>
                <p className="text-design4-neutral-500 text-sm mb-4">Evaluate your organization's execution capabilities and identify critical gaps.</p>
                <button className="text-design4-primary font-medium text-sm hover:text-design4-primary/80 transition-colors">
                  Start Assessment →
                </button>
              </div>

              <div className="group bg-white rounded-2xl p-6 shadow-sm border border-design4-neutral-100 hover:shadow-lg hover:border-design4-green/20 transition-all duration-200">
                <div className="w-12 h-12 bg-design4-green/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-design4-green/20 transition-colors">
                  <svg className="w-6 h-6 text-design4-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-design4-ink mb-2">Operations Playbook</h3>
                <p className="text-design4-neutral-500 text-sm mb-4">Best practices for aligning daily operations with strategic objectives.</p>
                <button className="text-design4-green font-medium text-sm hover:text-design4-green/80 transition-colors">
                  Download Guide →
                </button>
              </div>

              <div className="group bg-white rounded-2xl p-6 shadow-sm border border-design4-neutral-100 hover:shadow-lg hover:border-design4-orange/20 transition-all duration-200">
                <div className="w-12 h-12 bg-design4-orange/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-design4-orange/20 transition-colors">
                  <svg className="w-6 h-6 text-design4-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-design4-ink mb-2">Performance Metrics</h3>
                <p className="text-design4-neutral-500 text-sm mb-4">Key indicators for measuring transformation success and ROI.</p>
                <button className="text-design4-orange font-medium text-sm hover:text-design4-orange/80 transition-colors">
                  View Metrics →
                </button>
              </div>

              <div className="group bg-white rounded-2xl p-6 shadow-sm border border-design4-neutral-100 hover:shadow-lg hover:border-design4-primary/20 transition-all duration-200">
                <div className="w-12 h-12 bg-design4-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-design4-primary/20 transition-colors">
                  <svg className="w-6 h-6 text-design4-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-design4-ink mb-2">Implementation Roadmap</h3>
                <p className="text-design4-neutral-500 text-sm mb-4">Step-by-step guide for rolling out Design4 principles across your organization.</p>
                <button className="text-design4-primary font-medium text-sm hover:text-design4-primary/80 transition-colors">
                  Get Roadmap →
                </button>
              </div>

              <div className="group bg-white rounded-2xl p-6 shadow-sm border border-design4-neutral-100 hover:shadow-lg hover:border-design4-gold/20 transition-all duration-200">
                <div className="w-12 h-12 bg-design4-gold/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-design4-gold/20 transition-colors">
                  <svg className="w-6 h-6 text-design4-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-design4-ink mb-2">Community Forum</h3>
                <p className="text-design4-neutral-500 text-sm mb-4">Connect with other leaders implementing Design4 in their organizations.</p>
                <button className="text-design4-gold font-medium text-sm hover:text-design4-gold/80 transition-colors">
                  Join Community →
                </button>
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
      <Footer />
    </>
  )
}