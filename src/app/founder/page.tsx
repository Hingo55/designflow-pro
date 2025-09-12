import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export default function FounderPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-design4-bg">
        {/* Hero Section */}
        <section className="bg-design4-teal">
          <div className="mx-auto max-w-design4-container px-6 py-24">
            <div className="flex flex-col lg:flex-row items-center gap-8 max-w-6xl mx-auto">
              {/* Content */}
              <div className="flex-1 text-center lg:text-left order-2 lg:order-1">
                <div className="inline-block bg-design4-gold text-design4-ink rounded-full px-4 py-2 text-sm font-medium mb-6">
                  For Founders & Innovators
                </div>
                <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                  Scale without losing focus.
                </h1>
                <p className="text-lg lg:text-xl text-white/80 max-w-3xl mx-auto lg:mx-0 mb-8">
                  Most startups lose their way as they scale. The Design4 Framework helps you build systems that grow with your vision—not against it.
                </p>
              </div>
              
              {/* Founder Graphic */}
              <div className="flex-shrink-0 order-1 lg:order-2">
                <div className="w-80 h-80 flex items-center justify-center">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 512 512"
                    className="w-64 h-64"
                    aria-label="Founder / Innovator"
                  >
                    <path 
                      fill="#E5C823"
                      d="M96 176h48c4.42 0 8-3.58 8-8s-3.58-8-8-8h-48c-4.42 0-8 3.58-8 8s3.58 8 8 8ZM360 168c0 4.42 3.58 8 8 8h48c4.42 0 8-3.58 8-8s-3.58-8-8-8h-48c-4.42 0-8 3.58-8 8ZM155.01 217.07l-41.57 24c-3.83 2.21-5.14 7.1-2.93 10.93 1.48 2.57 4.17 4 6.94 4 1.36 0 2.73-.35 3.99-1.07l41.57-24c3.83-2.21 5.14-7.1 2.93-10.93-2.21-3.83-7.1-5.14-10.93-2.93ZM353 120c1.36 0 2.73-.35 3.99-1.07l41.57-24c3.83-2.21 5.14-7.1 2.93-10.93-2.21-3.83-7.1-5.14-10.93-2.93l-41.57 24c-3.83 2.21-5.14 7.1-2.93 10.93 1.48 2.57 4.17 4 6.94 4ZM308 77.93c1.26.73 2.63 1.07 3.99 1.07 2.76 0 5.45-1.44 6.94-4l24-41.57c2.21-3.83.9-8.72-2.93-10.93-3.83-2.21-8.72-.9-10.93 2.93l-24 41.57c-2.21 3.83-.9 8.72 2.93 10.93ZM256 64c4.42 0 8-3.58 8-8V8c0-4.42-3.58-8-8-8s-8 3.58-8 8v48c0 4.42 3.58 8 8 8ZM193.07 75.01c1.48 2.57 4.17 4 6.94 4 1.36 0 2.73-.35 3.99-1.07 3.83-2.21 5.14-7.1 2.93-10.93l-24-41.57c-2.21-3.83-7.1-5.14-10.93-2.93-3.83 2.21-5.14 7.1-2.93 10.93l24 41.57ZM349 230.93l41.57 24c1.26.73 2.63 1.07 3.99 1.07 2.76 0 5.45-1.44 6.94-4 2.21-3.83.9-8.72-2.93-10.93l-41.57-24c-3.83-2.21-8.72-.9-10.93 2.93-2.21 3.83-.9 8.72 2.93 10.93ZM113.44 94.93l41.57 24c1.26.73 2.64 1.07 3.99 1.07 2.76 0 5.45-1.44 6.94-4 2.21-3.83.9-8.72-2.93-10.93l-41.57-24c-3.83-2.21-8.72-.9-10.93 2.93-2.21 3.83-.9 8.72 2.93 10.93ZM388.37 360.35l-90.31-24.08c-3.01-.8-6.21.21-8.21 2.61l-33.85 40.62-33.85-40.62c-2-2.39-5.2-3.41-8.21-2.61l-90.31 24.08c-20.98 5.59-35.63 24.67-35.63 46.38v97.27c0 4.42 3.58 8 8 8h320c4.42 0 8-3.58 8-8v-97.27c0-21.71-14.65-40.78-35.63-46.38ZM298.88 353.05l4.33 1.15-12.35 49.38-22.73-13.64 30.75-36.9ZM243.87 389.95l-22.73 13.64-12.35-49.38 4.33-1.15 30.75 36.9ZM408 496H104v-89.27c0-14.48 9.77-27.19 23.75-30.92l65.58-17.49 14.9 59.62c.61 2.46 2.36 4.48 4.7 5.45 2.34.97 5 .77 7.18-.53l35.88-21.53 35.88 21.53c1.26.76 2.69 1.14 4.12 1.14 1.04 0 2.08-.2 3.06-.61 2.34-.97 4.08-2.99 4.7-5.45l14.9-59.62 65.58 17.49c13.99 3.73 23.75 16.44 23.75 30.92v89.27ZM240 312h32c13.23 0 24-10.77 24-24v-24c0-8.15 7.27-19.59 14.96-31.71 11.74-18.48 25.04-39.42 25.04-64.29 0-44.11-35.89-80-80-80s-80 35.89-80 80c0 24.87 13.3 45.81 25.04 64.29 7.7 12.12 14.96 23.56 14.96 31.71v24c0 13.23 10.77 24 24 24ZM272 296h-32c-4.41 0-8-3.59-8-8v-16h48v16c0 4.41-3.59 8-8 8ZM214.54 223.71c-10.57-16.64-22.54-35.5-22.54-55.71 0-35.29 28.71-64 64-64s64 28.71 64 64c0 20.21-11.98 39.07-22.54 55.71-7.42 11.68-14.02 22.1-16.45 32.29h-17.01v-20.85c5.06-5.72 16-19.84 16-35.15v-24c0-4.42-3.58-8-8-8s-8 3.58-8 8v24c0 6.64-4.08 14.05-8 19.51-3.92-5.47-8-12.88-8-19.51v-24c0-4.42-3.58-8-8-8s-8 3.58-8 8v24c0 15.3 10.94 29.43 16 35.15v20.85h-17.01c-2.43-10.19-9.03-20.61-16.45-32.29Z" 
                    />
                  </svg>
                </div>
              </div>
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
                  src="/design4_logo_color.svg" 
                  alt="Design4 Framework Logo - Growth Stage Annotations" 
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
      <Footer />
    </>
  )
}