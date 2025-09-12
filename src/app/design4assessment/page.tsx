'use client'

import { useState } from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

interface Question {
  id: string
  text: string
  phase: 'discover' | 'define' | 'develop' | 'deliver'
}

interface Score {
  [questionId: string]: number
}

interface Results {
  discover: number
  define: number
  develop: number
  deliver: number
  overall: number
}

const questions: Question[] = [
  // DISCOVER (Purpose & Stakeholder Value)
  { id: 'discover_1', text: 'Our organization has a clear, shared understanding of why we exist beyond making money', phase: 'discover' },
  { id: 'discover_2', text: 'We regularly gather feedback from key stakeholders about the value we deliver', phase: 'discover' },
  { id: 'discover_3', text: 'Our daily decisions clearly connect to our stated purpose', phase: 'discover' },
  { id: 'discover_4', text: 'Everyone in our organization can explain how their work contributes to our mission', phase: 'discover' },
  
  // DEFINE (Strategic Clarity)
  { id: 'define_1', text: 'We have made explicit choices about where we will and won\'t compete', phase: 'define' },
  { id: 'define_2', text: 'Our leadership team agrees on our top 3-5 strategic priorities', phase: 'define' },
  { id: 'define_3', text: 'We regularly say \'no\' to good opportunities that don\'t fit our strategy', phase: 'define' },
  { id: 'define_4', text: 'Our strategy clearly differentiates us from competitors', phase: 'define' },
  
  // DEVELOP (Capability Integration)
  { id: 'develop_1', text: 'Our processes, technology, and people work together seamlessly', phase: 'develop' },
  { id: 'develop_2', text: 'We systematically build the capabilities needed for our strategy', phase: 'develop' },
  { id: 'develop_3', text: 'Information flows efficiently between departments and functions', phase: 'develop' },
  { id: 'develop_4', text: 'Our systems and processes adapt quickly when priorities change', phase: 'develop' },
  
  // DELIVER (Execution Excellence)
  { id: 'deliver_1', text: 'We consistently measure outcomes, not just activities', phase: 'deliver' },
  { id: 'deliver_2', text: 'Our teams have clear accountability for results', phase: 'deliver' },
  { id: 'deliver_3', text: 'We regularly review and adjust our approach based on performance data', phase: 'deliver' },
  { id: 'deliver_4', text: 'We abandon initiatives that aren\'t delivering expected value', phase: 'deliver' },
]

export default function Design4AssessmentPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [scores, setScores] = useState<Score>({})
  const [showResults, setShowResults] = useState(false)
  const [isStarted, setIsStarted] = useState(false)

  const handleScore = (questionId: string, score: number) => {
    const newScores = { ...scores, [questionId]: score }
    setScores(newScores)
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowResults(true)
    }
  }

  const calculateResults = (): Results => {
    const phaseScores = {
      discover: 0,
      define: 0,
      develop: 0,
      deliver: 0
    }

    questions.forEach(question => {
      const score = scores[question.id] || 0
      phaseScores[question.phase] += score
    })

    return {
      discover: Math.round((phaseScores.discover / 4) * 100) / 100,
      define: Math.round((phaseScores.define / 4) * 100) / 100,
      develop: Math.round((phaseScores.develop / 4) * 100) / 100,
      deliver: Math.round((phaseScores.deliver / 4) * 100) / 100,
      overall: Math.round(((phaseScores.discover + phaseScores.define + phaseScores.develop + phaseScores.deliver) / 16) * 100) / 100
    }
  }

  const getPhaseColor = (phase: string) => {
    switch (phase) {
      case 'discover': return 'bg-design4-gold text-design4-ink'
      case 'define': return 'bg-design4-purple text-white'
      case 'develop': return 'bg-design4-green text-design4-ink'
      case 'deliver': return 'bg-design4-orange text-white'
      default: return 'bg-design4-primary text-white'
    }
  }

  const getPhaseTitle = (phase: string) => {
    switch (phase) {
      case 'discover': return 'DISCOVER: Purpose & Stakeholder Value'
      case 'define': return 'DEFINE: Strategic Clarity'
      case 'develop': return 'DEVELOP: Capability Integration'
      case 'deliver': return 'DELIVER: Execution Excellence'
      default: return ''
    }
  }

  const getScoreLabel = (score: number) => {
    if (score <= 1.5) return 'Never'
    if (score <= 2.5) return 'Rarely'
    if (score <= 3.5) return 'Sometimes'
    if (score <= 4.5) return 'Often'
    return 'Always'
  }

  if (showResults) {
    const results = calculateResults()
    const highestPhase = Object.keys(results).reduce((a, b) => 
      results[a as keyof Results] > results[b as keyof Results] ? a : b
    ) as keyof Results
    const lowestPhase = Object.keys(results).reduce((a, b) => 
      results[a as keyof Results] < results[b as keyof Results] ? a : b
    ) as keyof Results

    return (
      <>
        <Navigation />
        <main className="min-h-screen bg-design4-bg ">
          <section className="bg-design4-primary">
            <div className="mx-auto max-w-design4-container px-6 py-16">
              <div className="text-center max-w-4xl mx-auto">
                <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
                  Your Design4 Assessment Results
                </h1>
                <p className="text-lg text-white/80">
                  Overall Score: {results.overall}/5.0
                </p>
              </div>
            </div>
          </section>

          <section className="py-20">
            <div className="mx-auto max-w-design4-container px-6">
              {/* Phase Scores */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {['discover', 'define', 'develop', 'deliver'].map((phase) => (
                  <div key={phase} className="text-center">
                    <div className={`${getPhaseColor(phase)} rounded-2xl p-6 mb-4`}>
                      <h3 className="font-bold text-sm uppercase tracking-wide mb-2">
                        {phase.toUpperCase()}
                      </h3>
                      <div className="text-3xl font-bold">
                        {results[phase as keyof Results]}/5.0
                      </div>
                      <div className="text-sm opacity-75 mt-1">
                        {getScoreLabel(results[phase as keyof Results])}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Analysis */}
              <div className="bg-white border border-design4-neutral-100 rounded-2xl p-8 mb-8">
                <h3 className="text-2xl font-bold text-design4-ink mb-4">Your Organization Profile</h3>
                <p className="text-lg text-design4-neutral-600 mb-4">
                  Your organization excels at <strong className="text-design4-primary">{highestPhase.toUpperCase()}</strong> (scoring {results[highestPhase]}/5.0) 
                  but has opportunities in <strong className="text-design4-primary">{lowestPhase.toUpperCase()}</strong> (scoring {results[lowestPhase]}/5.0).
                </p>
                <p className="text-design4-neutral-600">
                  This suggests your organization has strong foundational elements but could benefit from focusing on 
                  the areas where you're seeing lower alignment and effectiveness.
                </p>
              </div>

              {/* Next Steps */}
              <div className="bg-design4-neutral-100 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-design4-ink mb-6">Recommended Next Steps</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-design4-ink mb-3">Immediate Actions</h4>
                    <ul className="space-y-2 text-design4-neutral-600">
                      <li>• Focus on improving your {lowestPhase.toUpperCase()} capabilities</li>
                      <li>• Leverage your strength in {highestPhase.toUpperCase()}</li>
                      <li>• Review specific questions where you scored 1-2</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-design4-ink mb-3">Resources</h4>
                    <ul className="space-y-2 text-design4-neutral-600">
                      <li>• Explore the /{lowestPhase} page for tools</li>
                      <li>• Download relevant templates</li>
                      <li>• Schedule a Design4 consultation</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="text-center mt-8">
                <button
                  onClick={() => {
                    setCurrentQuestion(0)
                    setScores({})
                    setShowResults(false)
                    setIsStarted(false)
                  }}
                  className="inline-block bg-design4-primary text-white px-8 py-4 rounded-xl font-medium text-lg hover:transform hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200 mr-4"
                >
                  Retake Assessment
                </button>
                <button
                  onClick={() => window.location.href = '/resources'}
                  className="inline-block bg-design4-gold text-design4-ink px-8 py-4 rounded-xl font-medium text-lg hover:transform hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200"
                >
                  Get Resources
                </button>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </>
    )
  }

  if (!isStarted) {
    return (
      <>
        <Navigation />
        <main className="min-h-screen bg-design4-bg ">
          <section className="bg-design4-primary">
            <div className="mx-auto max-w-design4-container px-6 py-24">
              <div className="text-center max-w-4xl mx-auto">
                <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                  Design4 Assessment
                </h1>
                <p className="text-lg lg:text-xl text-white/80 max-w-3xl mx-auto mb-8">
                  Discover how aligned your organization is across purpose, strategy, capabilities, and execution. 
                  Get personalized insights in just 3-5 minutes.
                </p>
                <button
                  onClick={() => setIsStarted(true)}
                  className="inline-block bg-white text-design4-primary px-8 py-4 rounded-xl font-medium text-lg hover:transform hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-design4-gold focus:ring-offset-2 focus:ring-offset-design4-primary"
                >
                  Start Assessment
                </button>
              </div>
            </div>
          </section>

          <section className="py-20">
            <div className="mx-auto max-w-design4-container px-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {['discover', 'define', 'develop', 'deliver'].map((phase) => (
                  <div key={phase} className="text-center">
                    <div className={`${getPhaseColor(phase)} rounded-2xl p-6`}>
                      <h3 className="font-bold text-lg uppercase tracking-wide mb-2">
                        {phase}
                      </h3>
                      <p className="text-sm opacity-75">
                        {getPhaseTitle(phase).split(': ')[1]}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </>
    )
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100
  const question = questions[currentQuestion]

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-design4-bg ">
        <section className="py-8">
          <div className="mx-auto max-w-design4-container px-6">
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-design4-neutral-500">
                  Question {currentQuestion + 1} of {questions.length}
                </span>
                <span className="text-sm text-design4-neutral-500">
                  {Math.round(progress)}% Complete
                </span>
              </div>
              <div className="w-full bg-design4-neutral-200 rounded-full h-2">
                <div 
                  className="bg-design4-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>

            {/* Phase Header */}
            <div className="text-center mb-8">
              <div className={`inline-block ${getPhaseColor(question.phase)} rounded-full px-4 py-2 text-sm font-medium mb-4`}>
                {getPhaseTitle(question.phase)}
              </div>
            </div>

            {/* Question */}
            <div className="max-w-4xl mx-auto">
              <div className="bg-white border border-design4-neutral-100 rounded-2xl p-8 mb-8">
                <h2 className="text-2xl lg:text-3xl font-bold text-design4-ink mb-8 text-center">
                  {question.text}
                </h2>

                {/* Rating Scale */}
                <div className="grid grid-cols-5 gap-4">
                  {[1, 2, 3, 4, 5].map((score) => (
                    <button
                      key={score}
                      onClick={() => handleScore(question.id, score)}
                      className="flex flex-col items-center p-4 border-2 border-design4-neutral-200 rounded-xl hover:border-design4-primary hover:bg-design4-primary/5 transition-all duration-200 focus:outline-none focus:border-design4-primary focus:bg-design4-primary/5"
                    >
                      <div className="text-3xl font-bold text-design4-primary mb-2">
                        {score}
                      </div>
                      <div className="text-sm text-design4-neutral-600 text-center">
                        {getScoreLabel(score)}
                      </div>
                    </button>
                  ))}
                </div>

                <div className="flex justify-between items-center mt-6 text-sm text-design4-neutral-500">
                  <span>Strongly Disagree</span>
                  <span>Strongly Agree</span>
                </div>
              </div>

              {/* Back Button */}
              {currentQuestion > 0 && (
                <div className="text-center">
                  <button
                    onClick={() => setCurrentQuestion(currentQuestion - 1)}
                    className="text-design4-primary hover:text-design4-plum transition-colors"
                  >
                    ← Previous Question
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}