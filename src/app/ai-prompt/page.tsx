import Navigation from '@/components/Navigation'

export default function AIPromptPage() {
  const systemPrompt = `You are a Design4 Framework AI Assistant for DesignFlow Pro. You help business leaders implement the Design4 framework that connects strategy to execution.

Core Design4 Principles:
1. Strategy: Are we doing the right things?
2. Capabilities: Are we doing things the right way?
3. Operations: Are we getting them done well?
4. Performance: Are we getting the benefits?

Key Benefits:
- Alignment: Connect organizational purpose to daily operations
- Adaptability: Respond quickly to market changes without losing strategic coherence
- Performance: Focus resources on activities that drive measurable outcomes
- Sustainability: Build long-term competitive advantage through systematic improvement

What Makes Design4 Different:
- Continuous Design Mindset: Iterate and adapt continuously rather than plan annually
- Integration Patterns: Prevent common strategy traps through systematic linkage
- Outcome-First Operations: Build service models that enable stakeholder success
- Evidence-Based Decisions: Ground choices in data and stakeholder feedback

Provide practical, actionable advice that helps users bridge the gap between strategic intent and operational execution. Focus on systematic approaches and measurable outcomes.`

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">AI System Prompt</h1>
            <p className="text-lg text-gray-600 mb-6">
              This is the exact system prompt that powers the Design4 AI Assistant. 
              It's sent to GPT-4 with every conversation to provide context about the Design4 framework.
            </p>
          </div>

          <div className="bg-gray-900 rounded-lg p-6 mb-8">
            <div className="flex items-center mb-4">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <span className="ml-4 text-gray-400 text-sm font-mono">system-prompt.txt</span>
            </div>
            <pre className="text-green-400 font-mono text-sm whitespace-pre-wrap overflow-x-auto">
              {systemPrompt}
            </pre>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-400 p-6 mb-8">
            <div className="flex">
              <div className="ml-3">
                <h3 className="text-lg font-medium text-blue-900 mb-2">How This Works</h3>
                <div className="text-blue-700 space-y-3">
                  <p>
                    <strong>Prompt Engineering:</strong> Instead of training a custom AI model, we use a technique called "prompt engineering" 
                    to give GPT-4 specific knowledge about the Design4 framework.
                  </p>
                  <p>
                    <strong>Context Injection:</strong> This system prompt is sent with every chat message, providing the AI with 
                    detailed context about Design4 principles, benefits, and approaches.
                  </p>
                  <p>
                    <strong>Real-time Updates:</strong> Changes to this prompt take effect immediately without retraining any models, 
                    making it easy to refine the AI's knowledge and responses.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Technical Implementation</h3>
              <ul className="text-gray-700 space-y-2 text-sm">
                <li>• OpenAI GPT-4 Turbo model</li>
                <li>• Streaming responses for real-time chat</li>
                <li>• Next.js API routes for backend</li>
                <li>• React-based chat interface</li>
                <li>• Vercel deployment</li>
              </ul>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Features</h3>
              <ul className="text-gray-700 space-y-2 text-sm">
                <li>• Framework-specific expertise</li>
                <li>• Actionable business advice</li>
                <li>• Strategic to operational guidance</li>
                <li>• Real-time conversational interface</li>
                <li>• Persistent chat history</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-gray-600 text-sm">
              Want to try the AI assistant? 
              <span className="ml-2">
                <a href="/" className="text-blue-600 hover:text-blue-700 font-medium">
                  Go to homepage and click the chat button →
                </a>
              </span>
            </p>
          </div>
        </div>
      </div>
      </div>
    </>
  )
}