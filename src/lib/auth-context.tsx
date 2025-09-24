'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'

interface AuthContextType {
  user: User | null
  session: Session | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error: any }>
  signUp: (email: string, password: string, name: string) => Promise<{ error: any }>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session and validate it
    const initializeAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession()

        if (error) {
          console.error('Auth session error:', error)
          setSession(null)
          setUser(null)
          setLoading(false)
          return
        }

        // If we have a session, validate it's still valid
        if (session) {
          const { data: { user }, error: userError } = await supabase.auth.getUser()

          if (userError || !user) {
            // Session is invalid, clear it
            console.warn('Invalid session detected, clearing auth state')
            await supabase.auth.signOut()
            setSession(null)
            setUser(null)
          } else {
            // Session is valid
            setSession(session)
            setUser(user)
          }
        } else {
          // No session
          setSession(null)
          setUser(null)
        }
      } catch (error) {
        console.error('Auth initialization error:', error)
        setSession(null)
        setUser(null)
      }

      setLoading(false)
    }

    initializeAuth()

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state change:', event, session?.user?.email || 'no user')

      if (event === 'SIGNED_OUT' || !session) {
        setSession(null)
        setUser(null)
      } else if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        setSession(session)
        setUser(session.user)
      }

      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])


  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      // If there's an error, make sure session state is cleared
      if (error) {
        setSession(null)
        setUser(null)
        return { error }
      }

      // Update session state on successful sign in
      if (data.session) {
        setSession(data.session)
        setUser(data.session.user)
      }

      return { error: null }
    } catch (err) {
      // Handle network or other errors
      setSession(null)
      setUser(null)
      return { error: { message: 'Network error. Please try again.' } }
    }
  }

  const signUp = async (email: string, password: string, name: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: name
        }
      }
    })
    return { error }
  }

  const signOut = async () => {
    try {
      // Clear local state immediately
      setSession(null)
      setUser(null)

      // Sign out from Supabase
      const { error } = await supabase.auth.signOut()

      if (error) {
        console.error('Sign out error:', error)
      }
    } catch (error) {
      console.error('Sign out error:', error)
    }
  }

  const value = {
    user,
    session,
    loading,
    signIn,
    signUp,
    signOut,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}