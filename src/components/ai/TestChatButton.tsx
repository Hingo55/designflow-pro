'use client'

import { useState } from 'react'

export default function TestChatButton() {
  const [isOpen, setIsOpen] = useState(false)

  const handleClick = () => {
    console.log('Chat button clicked!')
    setIsOpen(!isOpen)
  }

  return (
    <>
      {/* Test Chat Button */}
      <button
        onClick={handleClick}
        className="fixed bottom-6 right-6 z-50 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
        style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 9999 }}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      </button>

      {/* Simple Test Panel */}
      {isOpen && (
        <div 
          className="fixed bottom-20 right-6 z-40 w-96 bg-white rounded-lg shadow-xl border p-4"
          style={{ position: 'fixed', bottom: '80px', right: '24px', zIndex: 9998 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Design4 AI Assistant</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          </div>
          
          <div className="text-center text-gray-500 py-8">
            <div className="text-2xl mb-2">🎯</div>
            <p>Chat is working! Button click detected.</p>
            <p className="text-sm mt-2">This confirms the interface is functional.</p>
          </div>
        </div>
      )}
    </>
  )
}