import Link from 'next/link'
import Navigation from '@/components/Navigation'

export default function FounderPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-design4-bg">
        {/* Hero Section */}
        <section className="bg-design4-primary">
          <div className="mx-auto max-w-design4-container px-6 py-24">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-block bg-design4-gold text-design4-ink rounded-full px-4 py-2 text-sm font-medium mb-6">
                For Founders & Innovators
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                Scale without losing focus.
              </h1>
              <p className="text-lg lg:text-xl text-white/90 max-w-3xl mx-auto mb-8">
                Most startups lose their way as they scale. The Design4 Framework helps you build systems that grow with your vision—not against it.
              </p>
            </div>
          </div>
        </section>

        {/* 3-Minute Video Section */}
        <section className="bg-design4-bg py-20">
          <div className="mx-auto max-w-design4-container px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-design4-ink mb-4">
                Why Most Startups Fail at Scale
              </h2>
              <p className="text-lg text-design4-neutral-500 max-w-2xl mx-auto">
                Watch this 3-minute deep-dive into the scaling challenges that derail even successful founders.
              </p>
            </div>
            
            {/* Video Placeholder */}
            <div className="max-w-4xl mx-auto">
              <div className="aspect-video bg-design4-neutral-100 rounded-2xl flex items-center justify-center border-2 border-design4-neutral-200">
                <div className="text-center">
                  <div className="w-20 h-20 bg-design4-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="w-0 h-0 border-l-8 border-l-white border-t-6 border-t-transparent border-b-6 border-b-transparent ml-1"></div>
                  </div>
                  <p className="text-design4-neutral-500 font-medium">3-minute founder-focused video</p>
                  <p className="text-sm text-design4-neutral-400">Click to play</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Visual Framework Section */}
        <section className="bg-design4-neutral-100 py-20">
          <div className="mx-auto max-w-design4-container px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-design4-ink mb-4">
                The Design4 Framework for Growth
              </h2>
              <p className="text-lg text-design4-neutral-500 max-w-2xl mx-auto">
                Four integrated stages that keep your startup aligned from seed to scale.
              </p>
            </div>

            {/* Framework Visual */}
            <div className="max-w-5xl mx-auto mb-12">
              <div className="relative">
                <img 
                  src="/design4gears.png" 
                  alt="Design4 Framework Gears - Growth Stage Annotations" 
                  className="w-full h-auto"
                />
                {/* Growth stage annotations */}
                <div className="absolute top-1/4 left-1/4 bg-design4-gold text-design4-ink px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                  Seed Stage
                </div>
                <div className="absolute top-1/3 right-1/4 bg-design4-green text-design4-ink px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                  Series A
                </div>
                <div className="absolute bottom-1/3 left-1/3 bg-design4-orange text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                  Scale-up
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Founder Benefits Section */}
        <section className="bg-design4-bg py-20">
          <div className="mx-auto max-w-design4-container px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-design4-ink mb-4">
                Built for Founders Who Want to Scale Smart
              </h2>
              <p className="text-lg text-design4-neutral-500 max-w-2xl mx-auto">
                The Design4 Framework addresses the specific challenges that come with rapid growth.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {/* Benefit 1 */}
              <article className="text-center">
                <div className="w-16 h-16 bg-design4-gold rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <div className="w-8 h-8 bg-design4-ink rounded-full flex items-center justify-center">
                    <div className="w-4 h-4 bg-design4-gold rounded-sm"></div>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-design4-ink mb-4">
                  Build systems that scale with you
                </h3>
                <p className="text-design4-neutral-500 leading-relaxed">
                  Create operational frameworks that grow stronger as your team and customer base expands, not more complex.
                </p>
              </article>

              {/* Benefit 2 */}
              <article className="text-center">
                <div className="w-16 h-16 bg-design4-plum rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                    <div className="w-4 h-4 bg-design4-plum rounded-full"></div>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-design4-ink mb-4">
                  Maintain your vision while growing
                </h3>
                <p className="text-design4-neutral-500 leading-relaxed">
                  Keep your core mission and values intact even as you add layers of management and process.
                </p>
              </article>

              {/* Benefit 3 */}
              <article className="text-center">
                <div className="w-16 h-16 bg-design4-orange rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                    <div className="w-4 h-4 bg-design4-orange rounded-sm transform rotate-45"></div>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-design4-ink mb-4">
                  Avoid the typical scaling disasters
                </h3>
                <p className="text-design4-neutral-500 leading-relaxed">
                  Sidestep the common pitfalls that derail high-growth companies: misaligned teams, scattered strategy, broken processes.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-design4-primary py-20">
          <div className="mx-auto max-w-design4-container px-6">
            <div className="text-center">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                Ready to Scale Without Losing Focus?
              </h2>
              <p className="text-lg text-white/90 max-w-2xl mx-auto mb-8">
                Take our assessment to discover where your growth systems need attention—and get a personalized roadmap for scaling smart.
              </p>
              <Link 
                href="/design4assessment"
                className="inline-block bg-design4-gold text-design4-ink px-8 py-4 rounded-xl font-medium text-lg hover:transform hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-design4-primary"
              >
                Discover where your growth systems need attention
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}