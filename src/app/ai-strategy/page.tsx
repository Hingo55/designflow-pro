'use client'

import { useState } from 'react'

export default function AIStrategy() {
  const [formData, setFormData] = useState({
    businessContext: '',
    currentChallenges: '',
    goals: ''
  })
  const [analysis, setAnalysis] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      const response = await fetch('/api/ai/strategy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      
      if (response.ok) {
        const result = await response.json()
        setAnalysis(result)
      } else {
        console.error('Strategy analysis failed')
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">AI Strategy Advisor</h1>
          <p className="text-gray-600 mt-2">Get AI-powered strategic recommendations aligned with the Design4 framework</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Tell us about your business</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Business Context
                </label>
                <textarea
                  value={formData.businessContext}
                  onChange={(e) => handleInputChange('businessContext', e.target.value)}
                  placeholder="Describe your industry, company size, market position, and key business model..."
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={4}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Challenges
                </label>
                <textarea
                  value={formData.currentChallenges}
                  onChange={(e) => handleInputChange('currentChallenges', e.target.value)}
                  placeholder="What strategic challenges are you facing? What gaps exist between your strategy and execution?"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={4}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Strategic Goals
                </label>
                <textarea
                  value={formData.goals}
                  onChange={(e) => handleInputChange('goals', e.target.value)}
                  placeholder="What are your key strategic objectives? What outcomes do you want to achieve?"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={4}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Analyzing...
                  </div>
                ) : (
                  'Get AI Strategy Recommendations'
                )}
              </button>
            </form>
          </div>

          {/* Results */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">AI Analysis & Recommendations</h2>
            
            {!analysis && !isLoading && (
              <div className="text-center text-gray-500 py-12">
                <div className="text-4xl mb-4">🎯</div>
                <p>Complete the form to get your personalized strategy analysis</p>
              </div>
            )}

            {analysis && (
              <div className="space-y-6">
                {/* Alignment Score */}
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-900 mb-2">Strategy Alignment Score</h3>
                  <div className="flex items-center">
                    <div className="flex-1 bg-blue-200 rounded-full h-3 mr-3">
                      <div 
                        className="bg-blue-600 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${analysis.alignmentScore}%` }}
                      ></div>
                    </div>
                    <span className="text-blue-900 font-semibold">{analysis.alignmentScore}%</span>
                  </div>
                </div>

                {/* Key Insights */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Key Insights</h3>
                  <ul className="space-y-2">
                    {analysis.keyInsights.map((insight: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <span className="text-green-500 mr-2 mt-1">💡</span>
                        <span className="text-gray-700">{insight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Recommendations */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Strategic Recommendations</h3>
                  <div className="space-y-4">
                    {analysis.recommendations.map((rec: any, index: number) => (
                      <div key={index} className="border-l-4 border-blue-500 pl-4 py-2">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-medium text-gray-900">{rec.title}</h4>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            rec.priority === 'high' ? 'bg-red-100 text-red-800' :
                            rec.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {rec.priority} priority
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm mb-2">{rec.description}</p>
                        <div className="flex text-xs text-gray-500 space-x-4">
                          <span>Timeline: {rec.timeline}</span>
                          <span>Impact: {rec.impact}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Next Steps */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Next Steps</h3>
                  <ol className="space-y-2">
                    {analysis.nextSteps.map((step: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <span className="bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-3 mt-1">
                          {index + 1}
                        </span>
                        <span className="text-gray-700">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}