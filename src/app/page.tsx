import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Welcome to <span className="text-blue-600">DesignFlow Pro</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            The complete framework connecting why, how, and what to build businesses that outpace change. 
            Align organizational purpose with daily operations through systematic Design4 principles.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">🎯 Strategy</h3>
            <p className="text-gray-600 mb-4">Are we doing the right things?</p>
            <p className="text-sm text-gray-500">Connect organizational purpose to strategic direction</p>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">⚡ Capabilities</h3>
            <p className="text-gray-600 mb-4">Are we doing things the right way?</p>
            <p className="text-sm text-gray-500">Build systematic approaches to execution</p>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">🔧 Operations</h3>
            <p className="text-gray-600 mb-4">Are we getting them done well?</p>
            <p className="text-sm text-gray-500">Align daily operations with strategic intent</p>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">📊 Performance</h3>
            <p className="text-gray-600 mb-4">Are we getting the benefits?</p>
            <p className="text-sm text-gray-500">Measure outcomes and continuous improvement</p>
          </div>
        </div>

        <div className="text-center">
          <div className="bg-white rounded-lg p-8 shadow-md max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Transform Your Business Strategy?</h2>
            <p className="text-gray-600 mb-6">
              Join professionals who are bridging the gap between strategic planning and operational execution.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/dashboard" 
                className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition-colors font-medium"
              >
                Explore Dashboard
              </Link>
              <Link 
                href="/resources" 
                className="border border-gray-300 text-gray-700 px-8 py-3 rounded-md hover:bg-gray-50 transition-colors font-medium"
              >
                View Resources
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center text-gray-500">
          <p>Built with the 5 Day Sprint Framework by Omar Choudhry</p>
          <p className="text-sm mt-2">Empowering business leaders to design for sustainable growth</p>
        </div>
      </div>
    </main>
  )
}