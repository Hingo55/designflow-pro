interface PostCTAProps {
  postCTA?: {
    title: string
    description: string
    buttonText: string
    buttonLink: string
  }
  personas?: string[]
  className?: string
}

// Persona-specific CTA fallbacks - conversion-focused actions
const PERSONA_CTAS = {
  'Founder': {
    title: 'Ready to Scale Your Vision?',
    description: 'Book a focused strategy session to align your vision with executable plans.',
    buttonText: 'Book a Strategy Sprint',
    buttonLink: '/services/strategy-sprint'
  },
  'Transformation Leader': {
    title: 'Assess Your Current Alignment',
    description: 'Discover gaps between your strategy and execution with our comprehensive audit.',
    buttonText: 'Run the Alignment Audit',
    buttonLink: '/assessment/leaders'
  },
  'Consultant': {
    title: 'Enhance Your Practice',
    description: 'Access our complete toolkit of frameworks, templates, and methodologies.',
    buttonText: 'Download the Toolkit',
    buttonLink: '/toolkit'
  },
  'Project Operations': {
    title: 'Streamline Your Operations',
    description: 'Get proven templates that connect strategic objectives to daily operations.',
    buttonText: 'Grab the Runbook Template',
    buttonLink: '/templates/runbooks'
  }
}

const DEFAULT_CTA = {
  title: 'Transform Your Business',
  description: 'Ready to implement the Design4 framework? Start your transformation journey today.',
  buttonText: 'Get Started',
  buttonLink: '/dashboard'
}

export function PostCTA({ postCTA, personas, className = '' }: PostCTAProps) {
  // Use post-specific CTA if available
  if (postCTA) {
    return (
      <div className={`my-12 p-8 bg-gradient-to-r from-design4-primary to-design4-primary/80 rounded-2xl text-white ${className}`}>
        <div className="text-center max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold mb-3">{postCTA.title}</h3>
          <p className="text-design4-primary-50 mb-6 leading-relaxed">
            {postCTA.description}
          </p>
          <a 
            href={postCTA.buttonLink}
            className="inline-flex items-center gap-2 bg-white text-design4-primary px-8 py-4 rounded-xl font-semibold hover:bg-design4-neutral-50 hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
          >
            {postCTA.buttonText}
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    )
  }

  // Use persona-specific fallback
  const primaryPersona = personas?.[0]
  const cta = (primaryPersona && PERSONA_CTAS[primaryPersona as keyof typeof PERSONA_CTAS]) || DEFAULT_CTA

  return (
    <div className={`my-12 p-8 bg-gradient-to-r from-design4-gold/20 to-design4-primary/10 rounded-2xl border border-design4-neutral-200 ${className}`}>
      <div className="text-center max-w-2xl mx-auto">
        <h3 className="text-2xl font-bold text-design4-ink mb-3">{cta.title}</h3>
        <p className="text-design4-neutral-600 mb-6 leading-relaxed">
          {cta.description}
        </p>
        <a 
          href={cta.buttonLink}
          className="inline-flex items-center gap-2 bg-design4-primary text-white px-8 py-4 rounded-xl font-semibold hover:bg-design4-primary/90 hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
        >
          {cta.buttonText}
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </div>
    </div>
  )
}