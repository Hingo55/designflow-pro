import Link from 'next/link'
import Navigation from '@/components/Navigation'

export default function TransformationLeaderPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-design4-bg">
        {/* Hero Section */}
        <section className="bg-design4-plum">
          <div className="mx-auto max-w-design4-container px-6 py-24">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-block bg-design4-gold text-design4-ink rounded-full px-4 py-2 text-sm font-medium mb-6">
                For Transformation Leaders
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                Align your leadership team.
              </h1>
              <p className="text-lg lg:text-xl text-white/90 max-w-3xl mx-auto mb-8">
                Stop the cycle of competing priorities and siloed departments. The Design4 Framework creates leadership alignment that drives sustainable performance at every level of your organization.
              </p>
            </div>
          </div>
        </section>

        {/* Leadership Alignment Framework */}
        <section className="bg-design4-bg py-20">
          <div className="mx-auto max-w-design4-container px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-design4-ink mb-4">
                The Leadership Alignment Challenge
              </h2>
              <p className="text-lg text-design4-neutral-500 max-w-2xl mx-auto">
                Most leadership teams struggle with the same fundamental issues that prevent effective transformation.
              </p>
            </div>
            
            {/* Challenge Points */}
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <article className="text-center">
                <div className="w-16 h-16 bg-design4-plum/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <div className="w-8 h-8 bg-design4-plum rounded-full"></div>
                </div>
                <h3 className="text-xl font-bold text-design4-ink mb-4">
                  Purpose Gets Lost
                </h3>
                <p className="text-design4-neutral-500 leading-relaxed">
                  Quarterly pressures override long-term vision, leaving teams unclear about what truly matters.
                </p>
              </article>

              <article className="text-center">
                <div className="w-16 h-16 bg-design4-plum/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <div className="w-8 h-8 bg-design4-plum rounded-sm"></div>
                </div>
                <h3 className="text-xl font-bold text-design4-ink mb-4">
                  Priorities Multiply
                </h3>
                <p className="text-design4-neutral-500 leading-relaxed">
                  Without focus, everything becomes urgent and important, diluting impact across the organization.
                </p>
              </article>

              <article className="text-center">
                <div className="w-16 h-16 bg-design4-plum/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <div className="w-8 h-8 bg-design4-plum rounded-full transform rotate-45"></div>
                </div>
                <h3 className="text-xl font-bold text-design4-ink mb-4">
                  Departments Silo
                </h3>
                <p className="text-design4-neutral-500 leading-relaxed">
                  Teams optimize for their own metrics instead of shared outcomes, creating internal competition.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* Design4 Solution */}
        <section className="bg-design4-neutral-100 py-20">
          <div className="mx-auto max-w-design4-container px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-design4-ink mb-4">
                The Design4 Leadership Alignment Process
              </h2>
              <p className="text-lg text-design4-neutral-500 max-w-2xl mx-auto">
                Transform your leadership team into a unified force for organizational change.
              </p>
            </div>

            {/* Framework Visual */}
            <div className="max-w-5xl mx-auto mb-12">
              <div className="relative">
                <img 
                  src="/design4gears.png" 
                  alt="Design4 Framework for Leadership Teams" 
                  className="w-full h-auto"
                />
                {/* Leadership annotations */}
                <div className="absolute top-1/4 left-1/4 bg-design4-plum text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                  Shared Purpose
                </div>
                <div className="absolute top-1/3 right-1/4 bg-design4-gold text-design4-ink px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                  Strategic Focus
                </div>
                <div className="absolute bottom-1/3 left-1/3 bg-design4-green text-design4-ink px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                  Aligned Systems
                </div>
              </div>
            </div>

            {/* Leadership Benefits */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <article className="bg-white border border-design4-neutral-100 rounded-2xl p-6 text-center">
                <h3 className="font-bold text-design4-ink mb-3">
                  Clear Direction
                </h3>
                <p className="text-design4-neutral-500 text-sm">
                  Everyone knows what success looks like and how their work contributes.
                </p>
              </article>

              <article className="bg-white border border-design4-neutral-100 rounded-2xl p-6 text-center">
                <h3 className="font-bold text-design4-ink mb-3">
                  Focused Priorities
                </h3>
                <p className="text-design4-neutral-500 text-sm">
                  Leadership team says no to good ideas that don't serve the mission.
                </p>
              </article>

              <article className="bg-white border border-design4-neutral-100 rounded-2xl p-6 text-center">
                <h3 className="font-bold text-design4-ink mb-3">
                  Cross-Functional Flow
                </h3>
                <p className="text-design4-neutral-500 text-sm">
                  Departments collaborate naturally toward shared outcomes.
                </p>
              </article>

              <article className="bg-white border border-design4-neutral-100 rounded-2xl p-6 text-center">
                <h3 className="font-bold text-design4-ink mb-3">
                  Sustainable Performance
                </h3>
                <p className="text-design4-neutral-500 text-sm">
                  Results improve consistently without burning out your people.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-design4-plum py-20">
          <div className="mx-auto max-w-design4-container px-6">
            <div className="text-center">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                Ready to Align Your Leadership Team?
              </h2>
              <p className="text-lg text-white/90 max-w-2xl mx-auto mb-8">
                Take our assessment to identify where your leadership alignment needs attention—and get a roadmap for creating the focused, unified team your organization needs.
              </p>
              <Link 
                href="/design4assessment"
                className="inline-block bg-design4-gold text-design4-ink px-8 py-4 rounded-xl font-medium text-lg hover:transform hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-design4-plum"
              >
                Discover where your leadership alignment needs attention
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}