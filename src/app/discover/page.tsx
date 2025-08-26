import Link from 'next/link'
import Navigation from '@/components/Navigation'

export default function DiscoverPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-design4-gold font-design4">
      {/* Hero Section */}
      <section className="bg-design4-gold">
        <div className="mx-auto max-w-design4-container px-6 py-24">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-block bg-design4-ink text-design4-gold rounded-full px-4 py-2 text-sm font-medium mb-6">
              Discover Phase
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold text-design4-ink leading-tight mb-6">
              When purpose leads, performance follows.
            </h1>
            <p className="text-lg lg:text-xl text-design4-ink/80 max-w-3xl mx-auto mb-8">
              Great leaders know their WHY. But the best leaders build organizations where everyone knows it too—and acts on it every single day.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/resources" 
                className="inline-block bg-design4-ink text-design4-gold px-8 py-4 rounded-xl font-medium text-lg hover:transform hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-design4-plum focus:ring-offset-2 focus:ring-offset-design4-gold"
              >
                Get Discovery Tools
              </Link>
              <Link 
                href="/" 
                className="inline-flex items-center text-design4-ink font-medium text-lg hover:text-design4-ink/80 transition-colors"
              >
                ← Back to Framework
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Discovery Process */}
      <section className="bg-design4-bg">
        <div className="mx-auto max-w-design4-container px-6 py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-design4-ink mb-4">
              The Discovery Process
            </h2>
            <p className="text-lg text-design4-neutral-500 max-w-2xl mx-auto">
              Uncover your organization's core purpose and measure what matters through systematic discovery methods.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <article className="bg-white border border-design4-neutral-100 rounded-2xl p-6 shadow-sm">
              <div className="w-12 h-12 bg-design4-gold rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-design4-ink font-bold text-lg">1</span>
              </div>
              <h3 className="text-xl font-semibold text-design4-ink mb-3 text-center">
                Stakeholder Insights
              </h3>
              <p className="text-design4-neutral-500 leading-relaxed text-center">
                Gather perspectives from key stakeholders to understand what success looks like from different viewpoints.
              </p>
            </article>

            {/* Step 2 */}
            <article className="bg-white border border-design4-neutral-100 rounded-2xl p-6 shadow-sm">
              <div className="w-12 h-12 bg-design4-gold rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-design4-ink font-bold text-lg">2</span>
              </div>
              <h3 className="text-xl font-semibold text-design4-ink mb-3 text-center">
                Purpose Alignment
              </h3>
              <p className="text-design4-neutral-500 leading-relaxed text-center">
                Define your organization's core purpose and ensure it aligns with stakeholder expectations and market reality.
              </p>
            </article>

            {/* Step 3 */}
            <article className="bg-white border border-design4-neutral-100 rounded-2xl p-6 shadow-sm">
              <div className="w-12 h-12 bg-design4-gold rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-design4-ink font-bold text-lg">3</span>
              </div>
              <h3 className="text-xl font-semibold text-design4-ink mb-3 text-center">
                Success Metrics
              </h3>
              <p className="text-design4-neutral-500 leading-relaxed text-center">
                Establish clear, measurable outcomes that will indicate whether you're achieving the benefits you seek.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* Discovery Tools */}
      <section className="bg-design4-neutral-100">
        <div className="mx-auto max-w-design4-container px-6 py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-design4-ink mb-4">
              Discovery Tools & Templates
            </h2>
            <p className="text-lg text-design4-neutral-500 max-w-2xl mx-auto">
              Practical resources to guide your organization through the discovery phase.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Stakeholder Mapping */}
            <article className="bg-white border border-design4-neutral-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="inline-block bg-design4-gold text-design4-ink rounded-full px-3 py-1 text-sm font-medium mb-4">
                Template
              </div>
              <h3 className="text-xl font-semibold text-design4-ink mb-3">
                Stakeholder Mapping Canvas
              </h3>
              <p className="text-design4-neutral-500 mb-4 leading-relaxed">
                Identify and prioritize key stakeholders, understand their needs, and map their influence on your organization's success.
              </p>
              <Link 
                href="/resources" 
                className="inline-flex items-center font-medium text-design4-primary hover:text-design4-plum transition-colors"
              >
                Download Template →
              </Link>
            </article>

            {/* Purpose Workshop */}
            <article className="bg-white border border-design4-neutral-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="inline-block bg-design4-gold text-design4-ink rounded-full px-3 py-1 text-sm font-medium mb-4">
                Workshop
              </div>
              <h3 className="text-xl font-semibold text-design4-ink mb-3">
                Purpose Discovery Workshop
              </h3>
              <p className="text-design4-neutral-500 mb-4 leading-relaxed">
                Facilitate a structured session to uncover your organization's authentic purpose and align leadership vision.
              </p>
              <Link 
                href="/resources" 
                className="inline-flex items-center font-medium text-design4-primary hover:text-design4-plum transition-colors"
              >
                Run the Workshop →
              </Link>
            </article>

            {/* Impact Measurement */}
            <article className="bg-white border border-design4-neutral-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="inline-block bg-design4-gold text-design4-ink rounded-full px-3 py-1 text-sm font-medium mb-4">
                Framework
              </div>
              <h3 className="text-xl font-semibold text-design4-ink mb-3">
                Impact Measurement Framework
              </h3>
              <p className="text-design4-neutral-500 mb-4 leading-relaxed">
                Define success metrics and establish baseline measurements to track progress toward your organizational purpose.
              </p>
              <Link 
                href="/resources" 
                className="inline-flex items-center font-medium text-design4-primary hover:text-design4-plum transition-colors"
              >
                Try the Framework →
              </Link>
            </article>

            {/* AI Discovery Assistant */}
            <article className="bg-white border border-design4-neutral-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="inline-block bg-design4-gold text-design4-ink rounded-full px-3 py-1 text-sm font-medium mb-4">
                AI Assistant
              </div>
              <h3 className="text-xl font-semibold text-design4-ink mb-3">
                Purpose Discovery AI
              </h3>
              <p className="text-design4-neutral-500 mb-4 leading-relaxed">
                Get personalized guidance on discovering and refining your organizational purpose through AI-powered insights.
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

      {/* Key Questions */}
      <section className="bg-design4-gold">
        <div className="mx-auto max-w-design4-container px-6 py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-design4-ink mb-4">
              Key Discovery Questions
            </h2>
            <p className="text-lg text-design4-ink/80 max-w-2xl mx-auto">
              Start your discovery journey by exploring these fundamental questions with your team.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-design4-ink/10 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-design4-ink mb-3">Purpose & Impact</h3>
              <ul className="space-y-2 text-design4-ink">
                <li>• What positive impact do we want to create in the world?</li>
                <li>• How do we measure success beyond financial metrics?</li>
                <li>• What would our stakeholders miss if we disappeared?</li>
                <li>• What legacy do we want to build?</li>
              </ul>
            </div>

            <div className="bg-design4-ink/10 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-design4-ink mb-3">Stakeholder Value</h3>
              <ul className="space-y-2 text-design4-ink">
                <li>• Who are our most critical stakeholders?</li>
                <li>• What benefits do we currently provide?</li>
                <li>• Where are we falling short of expectations?</li>
                <li>• How can we better enable their success?</li>
              </ul>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link 
              href="/define" 
              className="inline-block bg-design4-ink text-design4-gold px-8 py-4 rounded-xl font-medium text-lg hover:transform hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-design4-plum focus:ring-offset-2 focus:ring-offset-design4-gold"
            >
              Next: Define Strategy →
            </Link>
          </div>
        </div>
      </section>
      </main>
    </>
  )
}