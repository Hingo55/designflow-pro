import { NextRequest } from 'next/server'
import { supabase, supabaseAdmin } from '@/lib/supabase'

export interface AuthenticatedUser {
  id: string
  email: string
  user_metadata?: any
}

export async function getAuthenticatedUser(request: NextRequest): Promise<AuthenticatedUser | null> {
  try {
    const authHeader = request.headers.get('Authorization')

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null
    }

    const token = authHeader.replace('Bearer ', '')
    const { data: { user }, error } = await supabaseAdmin.auth.getUser(token)

    if (error || !user) {
      return null
    }

    return {
      id: user.id,
      email: user.email!,
      user_metadata: user.user_metadata
    }
  } catch (error) {
    console.error('Authentication error:', error)
    return null
  }
}

export async function requireAuth(request: NextRequest): Promise<AuthenticatedUser> {
  const user = await getAuthenticatedUser(request)

  if (!user) {
    throw new Error('Authentication required')
  }

  return user
}

// For development/testing - creates or gets a user by email
export async function getOrCreateTestUser(email: string, name: string): Promise<AuthenticatedUser> {
  try {
    // Try to get existing user
    const { data: existingUser, error: fetchError } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single()

    if (existingUser && !fetchError) {
      return {
        id: existingUser.id,
        email: existingUser.email
      }
    }

    // Create new user if doesn't exist
    const { data: newUser, error: createError } = await supabase
      .from('users')
      .insert([{ email, name }])
      .select()
      .single()

    if (createError) {
      throw createError
    }

    return {
      id: newUser.id,
      email: newUser.email
    }
  } catch (error) {
    console.error('Error in getOrCreateTestUser:', error)
    throw error
  }
}