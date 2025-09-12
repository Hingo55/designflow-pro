import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Design4 Framework Whitepaper | Design4.biz',
  description: 'An in-depth guide to connecting strategy to execution with the Design4 framework. Read online or download as PDF.',
}

export default function WhitepaperPage() {
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
              <Link href="/resources" className="hover:text-design4-primary transition-colors">Resources</Link>
              <span>/</span>
              <span className="text-design4-ink">Whitepaper</span>
            </nav>
          </div>
        </section>

        {/* Header Section */}
        <section className="bg-design4-bg py-16">
          <div className="mx-auto max-w-design4-container px-6">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center bg-design4-gold/10 text-design4-ink rounded-full px-4 py-2 text-sm font-medium mb-6">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Design4 Framework Whitepaper
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-design4-ink leading-tight mb-6">
                The Complete Framework for Aligned Business Design
              </h1>
              <p className="text-lg text-design4-neutral-500 mb-8 leading-relaxed">
                Master the art of business design with the Design4 framework. Keep purpose, strategy, capabilities, and operations continuously aligned to deliver outcomes that matter.
              </p>
              
              {/* Action Cards */}
              <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                <Link
                  href="/whitepapers/design4-whitepaper.html"
                  className="group bg-white border border-design4-neutral-100 rounded-2xl p-6 hover:shadow-lg hover:border-design4-primary/20 transition-all duration-200"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-12 h-12 bg-design4-primary/10 rounded-xl flex items-center justify-center group-hover:bg-design4-primary/20 transition-colors">
                      <svg className="w-6 h-6 text-design4-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </div>
                    <svg className="w-5 h-5 text-design4-neutral-400 group-hover:text-design4-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-design4-ink mb-2">Read Online</h3>
                  <p className="text-design4-neutral-500 text-sm">Browse the complete whitepaper in your browser</p>
                </Link>

                <Link
                  href="/whitepapers/design4-whitepaper.pdf"
                  className="group bg-white border border-design4-neutral-100 rounded-2xl p-6 hover:shadow-lg hover:border-design4-gold/20 transition-all duration-200"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-12 h-12 bg-design4-gold/10 rounded-xl flex items-center justify-center group-hover:bg-design4-gold/20 transition-colors">
                      <svg className="w-6 h-6 text-design4-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <svg className="w-5 h-5 text-design4-neutral-400 group-hover:text-design4-gold transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-design4-ink mb-2">Download PDF</h3>
                  <p className="text-design4-neutral-500 text-sm">Save a copy to share with your team</p>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Overview Grid */}
        <section className="bg-design4-neutral-100 py-20">
          <div className="mx-auto max-w-design4-container px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-design4-ink mb-4">
                What's Inside
              </h2>
              <p className="text-design4-neutral-500 max-w-2xl mx-auto">
                A comprehensive guide covering everything you need to implement the Design4 framework in your organization
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-design4-neutral-100">
                <div className="w-12 h-12 bg-design4-gold/10 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-design4-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-design4-ink mb-2">Framework Overview</h3>
                <p className="text-design4-neutral-500 text-sm">Four interconnected phases that align purpose, strategy, capabilities, and operations</p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-design4-neutral-100">
                <div className="w-12 h-12 bg-design4-primary/10 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-design4-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-design4-ink mb-2">Implementation Guide</h3>
                <p className="text-design4-neutral-500 text-sm">90-day launch plan with practical steps and measurable milestones</p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-design4-neutral-100">
                <div className="w-12 h-12 bg-design4-green/10 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-design4-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-design4-ink mb-2">Best Practices</h3>
                <p className="text-design4-neutral-500 text-sm">Proven patterns and common pitfalls to avoid during transformation</p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-design4-neutral-100">
                <div className="w-12 h-12 bg-design4-orange/10 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-design4-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-design4-ink mb-2">Quick Wins</h3>
                <p className="text-design4-neutral-500 text-sm">Immediate actions you can take to start seeing results in weeks</p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-design4-primary mb-2">4</div>
                <div className="text-design4-neutral-500 text-sm">Interconnected Phases</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-design4-primary mb-2">90</div>
                <div className="text-design4-neutral-500 text-sm">Days to First Results</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-design4-primary mb-2">40+</div>
                <div className="text-design4-neutral-500 text-sm">Pages of Content</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-design4-primary mb-2">15+</div>
                <div className="text-design4-neutral-500 text-sm">Tools & Templates</div>
              </div>
            </div>
          </div>
        </section>

        {/* Embedded Viewer */}
        <section className="bg-design4-bg py-20">
          <div className="mx-auto max-w-design4-container px-6">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-design4-ink mb-4">
                  Read the Complete Whitepaper
                </h2>
                <p className="text-design4-neutral-500 max-w-2xl mx-auto">
                  Browse the full whitepaper below, or download the PDF for offline reading and sharing with your team
                </p>
              </div>

              <div className="bg-white rounded-3xl overflow-hidden shadow-lg border border-design4-neutral-100 mb-8">
                <div className="bg-design4-neutral-100 px-6 py-4 border-b border-design4-neutral-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="flex space-x-1.5">
                        <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                      </div>
                      <span className="text-design4-neutral-500 text-sm font-medium">Design4 Framework Whitepaper</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Link
                        href="/whitepapers/design4-whitepaper.pdf"
                        className="text-design4-neutral-500 hover:text-design4-primary transition-colors"
                        title="Download PDF"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
                <iframe
                  src="/whitepapers/design4-whitepaper.html"
                  title="Design4 Whitepaper"
                  className="w-full"
                  style={{ height: '80vh', minHeight: '600px' }}
                />
              </div>
              
              <div className="text-center">
                <Link
                  href="/whitepapers/design4-whitepaper.pdf"
                  className="inline-flex items-center bg-design4-primary text-white px-8 py-4 rounded-2xl font-medium text-lg hover:bg-design4-plum/90 hover:transform hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-design4-gold focus:ring-offset-2"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download PDF
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Related Resources */}
        <section className="bg-design4-neutral-100 py-20">
          <div className="mx-auto max-w-design4-container px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-design4-ink mb-4">
                What's Next?
              </h2>
              <p className="text-design4-neutral-500 max-w-2xl mx-auto">
                Ready to put the Design4 framework into practice? Here are your next steps
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Link 
                href="/design4assessment"
                className="group bg-white rounded-2xl p-6 shadow-sm border border-design4-neutral-100 hover:shadow-lg hover:border-design4-primary/20 transition-all duration-200"
              >
                <div className="w-12 h-12 bg-design4-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-design4-primary/20 transition-colors">
                  <svg className="w-6 h-6 text-design4-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-design4-ink mb-2">Take the Assessment</h3>
                <p className="text-design4-neutral-500 text-sm mb-4">Discover where your organization stands and get personalized recommendations</p>
                <div className="flex items-center text-design4-primary font-medium text-sm group-hover:text-design4-plum transition-colors">
                  Start Assessment
                  <svg className="w-4 h-4 ml-1 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>

              <Link 
                href="/resources"
                className="group bg-white rounded-2xl p-6 shadow-sm border border-design4-neutral-100 hover:shadow-lg hover:border-design4-gold/20 transition-all duration-200"
              >
                <div className="w-12 h-12 bg-design4-gold/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-design4-gold/20 transition-colors">
                  <svg className="w-6 h-6 text-design4-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-design4-ink mb-2">Explore Tools</h3>
                <p className="text-design4-neutral-500 text-sm mb-4">Access templates, canvases, and implementation guides</p>
                <div className="flex items-center text-design4-gold font-medium text-sm group-hover:text-design4-orange transition-colors">
                  View Resources
                  <svg className="w-4 h-4 ml-1 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>

              <Link 
                href="/ai-strategy"
                className="group bg-white rounded-2xl p-6 shadow-sm border border-design4-neutral-100 hover:shadow-lg hover:border-design4-green/20 transition-all duration-200"
              >
                <div className="w-12 h-12 bg-design4-green/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-design4-green/20 transition-colors">
                  <svg className="w-6 h-6 text-design4-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-design4-ink mb-2">Get AI Guidance</h3>
                <p className="text-design4-neutral-500 text-sm mb-4">Chat with our AI assistant for personalized implementation advice</p>
                <div className="flex items-center text-design4-green font-medium text-sm group-hover:text-design4-orange transition-colors">
                  Try Assistant
                  <svg className="w-4 h-4 ml-1 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
