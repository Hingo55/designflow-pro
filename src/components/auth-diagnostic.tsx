'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export default function AuthDiagnostic() {
  const [authData, setAuthData] = useState<any>(null)

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session }, error } = await supabase.auth.getSession()

      const diagnostic = {
        timestamp: new Date().toISOString(),
        session: !!session,
        user: !!session?.user,
        userId: session?.user?.id,
        userEmail: session?.user?.email,
        accessToken: !!session?.access_token,
        tokenLength: session?.access_token?.length,
        error: error?.message,
        supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'Present' : 'Missing',
        supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Present' : 'Missing'
      }

      setAuthData(diagnostic)
      console.log('AUTH DIAGNOSTIC:', diagnostic)
    }

    checkAuth()
  }, [])

  return (
    <div className="fixed bottom-4 right-4 p-4 bg-red-50 border border-red-200 rounded max-w-sm text-xs">
      <h3 className="font-bold text-red-800 mb-2">Auth Diagnostic</h3>
      {authData ? (
        <pre className="text-red-700 overflow-auto">
          {JSON.stringify(authData, null, 2)}
        </pre>
      ) : (
        <p className="text-red-600">Loading...</p>
      )}
    </div>
  )
}