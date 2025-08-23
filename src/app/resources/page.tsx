export default function Resources() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Design4 Resources</h1>
          <p className="text-gray-600 mt-2">Tools, templates, and guides for implementing the Design4 framework</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="text-3xl mb-4">📊</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Strategy Canvas</h3>
            <p className="text-gray-600 mb-4">Visualize and align your strategic direction with organizational purpose.</p>
            <button className="text-blue-600 hover:text-blue-700 font-medium">View Template →</button>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="text-3xl mb-4">⚡</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Capability Assessment</h3>
            <p className="text-gray-600 mb-4">Evaluate your organization's execution capabilities and identify gaps.</p>
            <button className="text-blue-600 hover:text-blue-700 font-medium">Start Assessment →</button>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="text-3xl mb-4">🔧</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Operations Playbook</h3>
            <p className="text-gray-600 mb-4">Best practices for aligning daily operations with strategic objectives.</p>
            <button className="text-blue-600 hover:text-blue-700 font-medium">Download Guide →</button>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="text-3xl mb-4">📈</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Performance Metrics</h3>
            <p className="text-gray-600 mb-4">Key indicators for measuring transformation success and ROI.</p>
            <button className="text-blue-600 hover:text-blue-700 font-medium">View Metrics →</button>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="text-3xl mb-4">🎯</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Implementation Roadmap</h3>
            <p className="text-gray-600 mb-4">Step-by-step guide for rolling out Design4 principles across your organization.</p>
            <button className="text-blue-600 hover:text-blue-700 font-medium">Get Roadmap →</button>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="text-3xl mb-4">👥</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Community Forum</h3>
            <p className="text-gray-600 mb-4">Connect with other leaders implementing Design4 in their organizations.</p>
            <button className="text-blue-600 hover:text-blue-700 font-medium">Join Community →</button>
          </div>
        </div>

        <div className="mt-12 bg-white rounded-lg p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Design4 Framework Overview</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Benefits</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Connect organizational purpose to daily operations</li>
                <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Respond quickly to market changes without losing strategic coherence</li>
                <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Focus resources on activities that drive measurable outcomes</li>
                <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Build long-term competitive advantage through systematic improvement</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">What Makes Design4 Different</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center"><span className="text-blue-500 mr-2">→</span> Continuous Design Mindset: Iterate and adapt continuously</li>
                <li className="flex items-center"><span className="text-blue-500 mr-2">→</span> Integration Patterns: Prevent common strategy traps</li>
                <li className="flex items-center"><span className="text-blue-500 mr-2">→</span> Outcome-First Operations: Enable stakeholder success</li>
                <li className="flex items-center"><span className="text-blue-500 mr-2">→</span> Evidence-Based Decisions: Ground choices in data and feedback</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}