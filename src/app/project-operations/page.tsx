import Link from 'next/link'
import Navigation from '@/components/Navigation'

export default function ProjectOperationsPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-design4-bg">
        {/* Hero Section */}
        <section className="bg-design4-orange">
          <div className="mx-auto max-w-design4-container px-6 py-24">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-block bg-white text-design4-orange rounded-full px-4 py-2 text-sm font-medium mb-6">
                For Project & Operations Leaders
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                Bridge strategy and execution.
              </h1>
              <p className="text-lg lg:text-xl text-white/90 max-w-3xl mx-auto mb-8">
                Turn strategic plans into operational reality. The Design4 Framework connects high-level strategy with day-to-day execution, ensuring what gets planned actually gets done.
              </p>
            </div>
          </div>
        </section>

        {/* Execution Gap Challenge */}
        <section className="bg-design4-bg py-20">
          <div className="mx-auto max-w-design4-container px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-design4-ink mb-4">
                The Strategy-Execution Gap
              </h2>
              <p className="text-lg text-design4-neutral-500 max-w-2xl mx-auto">
                You're responsible for making strategy work, but most strategic plans fail at the execution level.
              </p>
            </div>
            
            {/* Challenge Points */}
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <article className="text-center">
                <div className="w-16 h-16 bg-design4-orange/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <div className="w-8 h-8 bg-design4-orange rounded-full"></div>
                </div>
                <h3 className="text-xl font-bold text-design4-ink mb-4">
                  Disconnected Processes
                </h3>
                <p className="text-design4-neutral-500 leading-relaxed">
                  Operational processes don't connect to strategic objectives, creating inefficiency and confusion.
                </p>
              </article>

              <article className="text-center">
                <div className="w-16 h-16 bg-design4-orange/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <div className="w-8 h-8 bg-design4-orange rounded-sm"></div>
                </div>
                <h3 className="text-xl font-bold text-design4-ink mb-4">
                  Misaligned Capabilities
                </h3>
                <p className="text-design4-neutral-500 leading-relaxed">
                  Teams lack the skills, tools, or authority needed to execute strategic initiatives effectively.
                </p>
              </article>

              <article className="text-center">
                <div className="w-16 h-16 bg-design4-orange/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <div className="w-8 h-8 bg-design4-orange rounded-full transform rotate-45"></div>
                </div>
                <h3 className="text-xl font-bold text-design4-ink mb-4">
                  Wrong Metrics
                </h3>
                <p className="text-design4-neutral-500 leading-relaxed">
                  Performance measures focus on activities rather than outcomes, missing the strategic mark.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* Bridge Framework */}
        <section className="bg-design4-neutral-100 py-20">
          <div className="mx-auto max-w-design4-container px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-design4-ink mb-4">
                The Design4 Bridge Framework
              </h2>
              <p className="text-lg text-design4-neutral-500 max-w-2xl mx-auto">
                Systematically connect strategic intent with operational execution through proven methods.
              </p>
            </div>

            {/* Framework Visual */}
            <div className="max-w-5xl mx-auto mb-12">
              <div className="relative">
                <img 
                  src="/design4_logo_color.svg" 
                  alt="Design4 Bridge Framework for Operations" 
                  className="w-full h-auto"
                />
                {/* Operations annotations */}
                <div className="absolute top-1/4 left-1/4 bg-design4-orange text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                  Strategic Link
                </div>
                <div className="absolute top-1/3 right-1/4 bg-design4-green text-design4-ink px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                  Process Design
                </div>
                <div className="absolute bottom-1/3 left-1/3 bg-design4-plum text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                  Performance Tracking
                </div>
              </div>
            </div>

            {/* Bridge Components */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <article className="bg-white border border-design4-neutral-100 rounded-2xl p-6 text-center">
                <div className="w-12 h-12 bg-design4-orange rounded-xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-lg">1</span>
                </div>
                <h3 className="font-bold text-design4-ink mb-3">
                  Strategy Translation
                </h3>
                <p className="text-design4-neutral-500 text-sm">
                  Convert high-level objectives into specific, actionable operational requirements.
                </p>
              </article>

              <article className="bg-white border border-design4-neutral-100 rounded-2xl p-6 text-center">
                <div className="w-12 h-12 bg-design4-orange rounded-xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-lg">2</span>
                </div>
                <h3 className="font-bold text-design4-ink mb-3">
                  Process Integration
                </h3>
                <p className="text-design4-neutral-500 text-sm">
                  Design workflows that naturally support strategic priorities and outcomes.
                </p>
              </article>

              <article className="bg-white border border-design4-neutral-100 rounded-2xl p-6 text-center">
                <div className="w-12 h-12 bg-design4-orange rounded-xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-lg">3</span>
                </div>
                <h3 className="font-bold text-design4-ink mb-3">
                  Capability Alignment
                </h3>
                <p className="text-design4-neutral-500 text-sm">
                  Ensure teams have the skills, tools, and authority to execute effectively.
                </p>
              </article>

              <article className="bg-white border border-design4-neutral-100 rounded-2xl p-6 text-center">
                <div className="w-12 h-12 bg-design4-orange rounded-xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-lg">4</span>
                </div>
                <h3 className="font-bold text-design4-ink mb-3">
                  Outcome Measurement
                </h3>
                <p className="text-design4-neutral-500 text-sm">
                  Track performance metrics that directly connect to strategic success.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* Results Section */}
        <section className="bg-design4-bg py-20">
          <div className="mx-auto max-w-design4-container px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-design4-ink mb-4">
                What You Get With Design4
              </h2>
              <p className="text-lg text-design4-neutral-500 max-w-2xl mx-auto">
                Transform from the person who manages projects to the leader who delivers strategic results.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <article className="text-center">
                <div className="w-16 h-16 bg-design4-orange rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                    <div className="w-4 h-4 bg-design4-orange rounded-sm"></div>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-design4-ink mb-4">
                  Clear Line of Sight
                </h3>
                <p className="text-design4-neutral-500 leading-relaxed">
                  Every operational activity connects directly to strategic outcomes, eliminating wasted effort.
                </p>
              </article>

              <article className="text-center">
                <div className="w-16 h-16 bg-design4-orange rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                    <div className="w-4 h-4 bg-design4-orange rounded-full"></div>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-design4-ink mb-4">
                  Predictable Execution
                </h3>
                <p className="text-design4-neutral-500 leading-relaxed">
                  Systematic processes ensure consistent delivery regardless of changing priorities.
                </p>
              </article>

              <article className="text-center">
                <div className="w-16 h-16 bg-design4-orange rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                    <div className="w-4 h-4 bg-design4-orange rounded-sm transform rotate-45"></div>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-design4-ink mb-4">
                  Strategic Impact
                </h3>
                <p className="text-design4-neutral-500 leading-relaxed">
                  Your operational improvements drive measurable business results and strategic success.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-design4-orange py-20">
          <div className="mx-auto max-w-design4-container px-6">
            <div className="text-center">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                Ready to Bridge Strategy and Execution?
              </h2>
              <p className="text-lg text-white/90 max-w-2xl mx-auto mb-8">
                Take our assessment to identify where your strategy-execution bridge needs strengthening—and get a roadmap for ensuring what gets planned actually gets done.
              </p>
              <Link 
                href="/design4assessment"
                className="inline-block bg-white text-design4-orange px-8 py-4 rounded-xl font-medium text-lg hover:transform hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-design4-gold focus:ring-offset-2 focus:ring-offset-design4-orange"
              >
                Discover where your execution bridge needs attention
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}