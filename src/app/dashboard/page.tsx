import Footer from '@/components/Footer'

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Design4 Dashboard</h1>
          <p className="text-gray-600 mt-2">Monitor your business transformation progress</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Strategy Alignment</h3>
            <p className="text-2xl font-bold text-blue-600">85%</p>
            <p className="text-xs text-gray-500 mt-1">↗️ +12% from last month</p>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Capability Maturity</h3>
            <p className="text-2xl font-bold text-green-600">78%</p>
            <p className="text-xs text-gray-500 mt-1">↗️ +8% from last month</p>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Operational Excellence</h3>
            <p className="text-2xl font-bold text-purple-600">92%</p>
            <p className="text-xs text-gray-500 mt-1">↗️ +5% from last month</p>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Performance Impact</h3>
            <p className="text-2xl font-bold text-orange-600">67%</p>
            <p className="text-xs text-gray-500 mt-1">↗️ +15% from last month</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Framework Implementation Progress</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Strategic Clarity</span>
                  <span className="text-gray-900">85%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Execution Capabilities</span>
                  <span className="text-gray-900">78%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '78%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Operational Integration</span>
                  <span className="text-gray-900">92%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-600 h-2 rounded-full" style={{ width: '92%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Value Realization</span>
                  <span className="text-gray-900">67%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-orange-600 h-2 rounded-full" style={{ width: '67%' }}></div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Next Actions</h3>
            <div className="space-y-3">
              <div className="p-3 bg-blue-50 rounded-md">
                <p className="text-sm font-medium text-blue-900">Review quarterly strategy alignment</p>
                <p className="text-xs text-blue-600 mt-1">Due in 3 days</p>
              </div>
              
              <div className="p-3 bg-green-50 rounded-md">
                <p className="text-sm font-medium text-green-900">Update capability assessment</p>
                <p className="text-xs text-green-600 mt-1">Due in 1 week</p>
              </div>
              
              <div className="p-3 bg-orange-50 rounded-md">
                <p className="text-sm font-medium text-orange-900">Conduct performance review</p>
                <p className="text-xs text-orange-600 mt-1">Due in 2 weeks</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}