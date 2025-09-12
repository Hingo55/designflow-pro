import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export default function ProjectOperationsPage() {
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
                <div className="inline-block bg-white text-design4-orange rounded-full px-4 py-2 text-sm font-medium mb-6">
                  For Project & Operations Leaders
                </div>
                <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                  Bridge strategy and execution.
                </h1>
                <p className="text-lg lg:text-xl text-white/80 max-w-3xl mx-auto lg:mx-0 mb-8">
                  Turn strategic plans into operational reality. The Design4 Framework connects high-level strategy with day-to-day execution, ensuring what gets planned actually gets done.
                </p>
              </div>
              
              {/* Project Operations Graphic */}
              <div className="flex-shrink-0 order-1 lg:order-2">
                <div className="w-80 h-80 flex items-center justify-center">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 512 512"
                    className="w-64 h-64"
                    aria-label="Project & Operations Leader"
                  >
                    <path 
                      fill="#E5C823"
                      d="m444.075,164.494l-23.037-4.542-16.379-39.534,13.081-19.505c4.37-6.519,3.547-14.946-2.003-20.495l-35.004-35.004c-5.548-5.548-13.978-6.371-20.494-2l-19.505,13.08-39.533-16.379-4.542-23.037c-1.518-7.7-8.059-13.078-15.907-13.078h-49.504c-7.848,0-14.389,5.377-15.907,13.077l-4.543,23.038-39.533,16.379-19.505-13.08c-6.521-4.371-14.946-3.545-20.494,2.001l-35.004,35.003c-5.551,5.55-6.373,13.978-2.001,20.495l13.079,19.505-16.379,39.534-23.035,4.542c-7.7,1.518-13.078,8.059-13.078,15.907v49.504c0,7.848,5.377,14.39,13.076,15.908l23.037,4.542,16.379,39.534-13.079,19.505c-4.372,6.518-3.549,14.946,2,20.495l12.786,12.786c-.142,1.362-.269,2.765-.381,4.218-.004.05-.007.101-.01.152-2.443,44.38-1.301,85.251.14,119.379.985,23.314,20.035,41.577,43.37,41.577h207.667c23.336,0,42.386-18.263,43.371-41.578,1.439-34.136,2.582-75.014.14-119.378-.003-.051-.006-.102-.01-.152-.112-1.454-.239-2.856-.381-4.219l12.784-12.785c5.551-5.55,6.374-13.978,2.002-20.496l-13.08-19.504,16.379-39.534,23.037-4.542c7.7-1.518,13.077-8.06,13.077-15.908v-49.504c0-7.848-5.378-14.389-13.077-15.907Zm-54.859,301.338c-.666,15.795-13.573,28.168-29.383,28.168h-11.41v-105.23c0-3.866-3.134-7-7-7s-7,3.134-7,7v105.23h-156.847v-105.23c0-3.866-3.134-7-7-7s-7,3.134-7,7v105.23h-11.41c-15.81,0-28.716-12.373-29.382-28.168-1.426-33.771-2.559-74.191-.153-117.941,1.676-21.677,6.226-28.031,18.178-35.039,10.06-5.899,27.919-10.743,46.823-15.579l44.139-10.856c1.34-.33,2.662-.623,3.977-.9l-18.933,136.042c-.247,1.773.195,3.574,1.235,5.032l32.253,45.181c1.313,1.84,3.436,2.933,5.697,2.933s4.384-1.093,5.697-2.933l32.253-45.181c1.04-1.458,1.482-3.258,1.235-5.032l-18.934-136.042c1.315.277,2.637.571,3.978.901l44.075,10.84c18.968,4.853,36.827,9.697,46.888,15.595,11.951,7.007,16.501,13.361,18.177,35.039,2.404,43.734,1.272,84.162-.153,117.941Zm-66.378-183.352l-35.374-8.701c7.811-5.036,14.892-11.953,20.799-20.511,17.689-25.629,20.928-60.898,7.875-85.769-11.105-21.16-32.463-32.813-60.138-32.813s-49.032,11.653-60.138,32.813c-13.053,24.871-9.814,60.14,7.875,85.769,5.908,8.559,12.988,15.476,20.797,20.511l-35.372,8.701c-22.524-19.468-35.376-47.454-35.376-77.328,0-56.361,45.853-102.213,102.213-102.213s102.214,45.853,102.214,102.213c0,29.874-12.853,57.86-35.375,77.327Zm-66.168-13.167c-.45-.003-.9-.003-1.349,0-15.307-.226-29.513-8.716-40.062-23.998-14.856-21.527-17.737-50.852-7-71.309,8.693-16.564,25.202-25.319,47.741-25.319s39.048,8.755,47.741,25.319c10.737,20.458,7.859,49.782-7,71.309-10.548,15.281-24.75,23.77-40.072,23.997Zm-1.572,14.007c.277.004.554.014.833.014.041,0,.084,0,.123,0,.28,0,.56-.01.84-.014,1.645.016,3.291.069,4.943.175l19.099,137.231-24.936,34.93-24.936-34.93,19.098-137.231c1.649-.106,3.293-.159,4.936-.175Zm188.054-53.415c0,1.106-.7,1.958-1.784,2.172l-26.716,5.267c-2.298.453-4.217,2.025-5.113,4.188l-19.249,46.461c-.896,2.164-.651,4.633.653,6.578l15.169,22.618c.616.918.509,2.016-.274,2.798l-6.076,6.076c-3.637-11.426-10.128-18.628-21.489-25.289-9.433-5.531-23.644-9.964-39.367-14.177,21.307-21.642,33.306-50.663,33.306-81.446,0-64.08-52.134-116.213-116.214-116.213s-116.213,52.133-116.213,116.213c0,30.782,11.999,59.802,33.306,81.445-15.702,4.206-29.926,8.642-39.365,14.177-11.361,6.661-17.853,13.864-21.49,25.29l-6.077-6.077c-.781-.781-.889-1.879-.272-2.797l15.168-22.619c1.305-1.945,1.55-4.414.653-6.578l-19.249-46.461c-.896-2.164-2.815-3.735-5.112-4.188l-26.715-5.267c-1.085-.214-1.785-1.066-1.785-2.172v-49.504c0-1.105.701-1.958,1.786-2.171l26.714-5.267c2.297-.453,4.216-2.025,5.112-4.188l19.249-46.461c.896-2.164.651-4.632-.653-6.578l-15.169-22.621c-.615-.917-.508-2.015.273-2.796l35.004-35.003c.782-.782,1.881-.889,2.799-.274l22.618,15.168c1.944,1.305,4.415,1.55,6.577.653l46.462-19.249c2.163-.896,3.735-2.815,4.188-5.113l5.268-26.715c.214-1.085,1.067-1.786,2.173-1.786h49.504c1.105,0,1.958.7,2.172,1.785l5.268,26.716c.452,2.298,2.024,4.216,4.188,5.113l46.461,19.249c2.161.896,4.632.651,6.577-.653l22.618-15.167c.919-.616,2.018-.508,2.799.273l35.004,35.004c.781.781.889,1.88.273,2.798l-15.169,22.618c-1.305,1.945-1.55,4.414-.653,6.578l19.249,46.461c.896,2.164,2.815,3.735,5.112,4.188l26.716,5.267c1.084.214,1.785,1.066,1.785,2.171v49.504Z" 
                    />
                  </svg>
                </div>
              </div>
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
      <Footer />
    </>
  )
}