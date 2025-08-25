import Link from 'next/link'
import Navigation from '@/components/Navigation'

export default function DevelopPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-design4-green font-design4">
      {/* Hero Section */}
      <section className="bg-design4-green">
        <div className="mx-auto max-w-design4-container px-6 py-24">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-block bg-design4-ink text-design4-green rounded-full px-4 py-2 text-sm font-medium mb-6">
              Develop Phase
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold text-design4-ink leading-tight mb-6">
              Develop Your Capabilities
            </h1>
            <p className="text-lg lg:text-xl text-design4-ink/80 max-w-3xl mx-auto mb-8">
              Are we doing things the right way? Build systematic approaches and develop core capabilities that enable consistent, effective execution of your strategy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link 
                href="/resources" 
                className="inline-block bg-design4-ink text-design4-green px-8 py-4 rounded-xl font-medium text-lg hover:transform hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-design4-gold focus:ring-offset-2 focus:ring-offset-design4-green"
              >
                Get Development Tools
              </Link>
              <Link 
                href="/define" 
                className="inline-flex items-center text-design4-ink font-medium text-lg hover:text-design4-ink/80 transition-colors whitespace-nowrap"
              >
                ← Previous: Define
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Capability Development Process */}
      <section className="bg-design4-bg">
        <div className="mx-auto max-w-design4-container px-6 py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-design4-ink mb-4">
              Capability Development Process
            </h2>
            <p className="text-lg text-design4-neutral-500 max-w-2xl mx-auto">
              Build the organizational capabilities needed to execute your strategy effectively and consistently.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <article className="bg-white border border-design4-neutral-100 rounded-2xl p-6 shadow-sm">
              <div className="w-12 h-12 bg-design4-green rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-design4-ink font-bold text-lg">1</span>
              </div>
              <h3 className="text-xl font-semibold text-design4-ink mb-3 text-center">
                Capability Assessment
              </h3>
              <p className="text-design4-neutral-500 leading-relaxed text-center">
                Evaluate current capabilities and identify gaps that must be addressed to execute your strategy.
              </p>
            </article>

            {/* Step 2 */}
            <article className="bg-white border border-design4-neutral-100 rounded-2xl p-6 shadow-sm">
              <div className="w-12 h-12 bg-design4-green rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-design4-ink font-bold text-lg">2</span>
              </div>
              <h3 className="text-xl font-semibold text-design4-ink mb-3 text-center">
                Systematic Approaches
              </h3>
              <p className="text-design4-neutral-500 leading-relaxed text-center">
                Design systematic approaches, processes, and frameworks that enable consistent execution.
              </p>
            </article>

            {/* Step 3 */}
            <article className="bg-white border border-design4-neutral-100 rounded-2xl p-6 shadow-sm">
              <div className="w-12 h-12 bg-design4-green rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-design4-ink font-bold text-lg">3</span>
              </div>
              <h3 className="text-xl font-semibold text-design4-ink mb-3 text-center">
                Capability Building
              </h3>
              <p className="text-design4-neutral-500 leading-relaxed text-center">
                Implement development programs and practices that build capabilities across your organization.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* Development Tools */}
      <section className="bg-design4-neutral-100">
        <div className="mx-auto max-w-design4-container px-6 py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-design4-ink mb-4">
              Capability Development Tools
            </h2>
            <p className="text-lg text-design4-neutral-500 max-w-2xl mx-auto">
              Frameworks and resources to systematically build the capabilities your organization needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Capability Map */}
            <article className="bg-white border border-design4-neutral-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="inline-block bg-design4-green text-design4-ink rounded-full px-3 py-1 text-sm font-medium mb-4">
                Assessment
              </div>
              <h3 className="text-xl font-semibold text-design4-ink mb-3">
                Capability Assessment Matrix
              </h3>
              <p className="text-design4-neutral-500 mb-4 leading-relaxed">
                Evaluate your current capabilities and identify critical gaps that need to be addressed for strategic success.
              </p>
              <Link 
                href="/resources" 
                className="inline-flex items-center font-medium text-design4-primary hover:text-design4-plum transition-colors"
              >
                Download Assessment →
              </Link>
            </article>

            {/* Process Design */}
            <article className="bg-white border border-design4-neutral-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="inline-block bg-design4-green text-design4-ink rounded-full px-3 py-1 text-sm font-medium mb-4">
                Framework
              </div>
              <h3 className="text-xl font-semibold text-design4-ink mb-3">
                Process Design Toolkit
              </h3>
              <p className="text-design4-neutral-500 mb-4 leading-relaxed">
                Design systematic processes and workflows that enable consistent, effective execution of strategic initiatives.
              </p>
              <Link 
                href="/resources" 
                className="inline-flex items-center font-medium text-design4-primary hover:text-design4-plum transition-colors"
              >
                Try the Toolkit →
              </Link>
            </article>

            {/* Skills Development */}
            <article className="bg-white border border-design4-neutral-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="inline-block bg-design4-green text-design4-ink rounded-full px-3 py-1 text-sm font-medium mb-4">
                Program
              </div>
              <h3 className="text-xl font-semibold text-design4-ink mb-3">
                Skills Development Program
              </h3>
              <p className="text-design4-neutral-500 mb-4 leading-relaxed">
                Build individual and team capabilities through structured learning and development programs.
              </p>
              <Link 
                href="/resources" 
                className="inline-flex items-center font-medium text-design4-primary hover:text-design4-plum transition-colors"
              >
                Launch Program →
              </Link>
            </article>

            {/* AI Capability Assistant */}
            <article className="bg-white border border-design4-neutral-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="inline-block bg-design4-green text-design4-ink rounded-full px-3 py-1 text-sm font-medium mb-4">
                AI Assistant
              </div>
              <h3 className="text-xl font-semibold text-design4-ink mb-3">
                Capability Development AI
              </h3>
              <p className="text-design4-neutral-500 mb-4 leading-relaxed">
                Get personalized recommendations for building capabilities and designing systematic approaches.
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

      {/* Key Development Questions */}
      <section className="bg-design4-green">
        <div className="mx-auto max-w-design4-container px-6 py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-design4-ink mb-4">
              Key Development Questions
            </h2>
            <p className="text-lg text-design4-ink/80 max-w-2xl mx-auto">
              Guide your capability development with these essential questions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-design4-ink/10 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-design4-ink mb-3">Capability Gaps</h3>
              <ul className="space-y-2 text-design4-ink">
                <li>• What capabilities do we need to execute our strategy?</li>
                <li>• Where are our biggest capability gaps?</li>
                <li>• What systematic approaches are missing?</li>
                <li>• How do we ensure consistent execution?</li>
              </ul>
            </div>

            <div className="bg-design4-ink/10 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-design4-ink mb-3">Development Priorities</h3>
              <ul className="space-y-2 text-design4-ink">
                <li>• Which capabilities should we build first?</li>
                <li>• What processes need to be redesigned?</li>
                <li>• How can we accelerate learning and development?</li>
                <li>• What systems and tools do we need?</li>
              </ul>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link 
              href="/deliver" 
              className="inline-block bg-design4-ink text-design4-green px-8 py-4 rounded-xl font-medium text-lg hover:transform hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-design4-gold focus:ring-offset-2 focus:ring-offset-design4-green"
            >
              Next: Deliver Value →
            </Link>
          </div>
        </div>
      </section>
      </main>
    </>
  )
}