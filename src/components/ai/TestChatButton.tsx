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
        className="fixed bottom-6 right-6 z-50 bg-design4-primary text-white p-4 rounded-full transition-all duration-200 hover:bg-design4-plum/90 hover:transform hover:-translate-y-1"
        style={{
          position: 'fixed',
          bottom: '24px', 
          right: '24px',
          zIndex: 9999,
          boxShadow: '0 0 0 4px rgba(255, 255, 255, 0.9), 0 8px 25px rgba(95, 39, 98, 0.3), 0 4px 15px rgba(0, 0, 0, 0.15)',
          filter: 'drop-shadow(0 2px 8px rgba(255, 255, 255, 0.8))'
        }}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      </button>

      {/* Simple Test Panel */}
      {isOpen && (
        <div 
          className="fixed bottom-20 right-6 z-40 w-96 bg-white rounded-2xl border border-design4-neutral-100 p-4"
          style={{
            position: 'fixed',
            bottom: '80px',
            right: '24px',
            zIndex: 9998,
            boxShadow: '0 0 0 1px rgba(255, 255, 255, 0.9), 0 20px 40px rgba(95, 39, 98, 0.15), 0 8px 32px rgba(0, 0, 0, 0.12)',
            filter: 'drop-shadow(0 4px 12px rgba(255, 255, 255, 0.6))'
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-design4-ink">Design4 Assistant</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-design4-neutral-500 hover:text-design4-ink transition-colors"
            >
              ×
            </button>
          </div>
          
          <div className="text-center text-design4-neutral-500 py-8">
            <div className="text-2xl mb-2">🎯</div>
            <p>Chat is working! Button click detected.</p>
            <p className="text-sm mt-2">This confirms the interface is functional.</p>
          </div>
        </div>
      )}
    </>
  )
}