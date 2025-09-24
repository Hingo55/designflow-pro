import { NextRequest } from 'next/server'
import { supabase, supabaseAdmin } from '@/lib/supabase'

export interface AuthenticatedUser {
  id: string
  email: string
  user_metadata?: any
}

export async function getAuthenticatedUser(request: NextRequest): Promise<AuthenticatedUser | null> {
  try {
    // Get the Authorization header
    const authHeader = request.headers.get('Authorization')

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      // Development fallback - return test user when no auth header
      if (process.env.NODE_ENV === 'development') {
        console.log('Development mode: Using test user for authentication (no auth header)')
        return {
          id: '712bd0f0-7768-47a0-a4c6-0da60d8a4a3a',
          email: 'test@example.com'
        }
      }
      return null
    }

    const token = authHeader.replace('Bearer ', '')
    console.log('Attempting to verify token:', token.substring(0, 20) + '...')

    // Use supabaseAdmin client with service role key to verify JWT token
    const { data: { user }, error } = await supabaseAdmin.auth.getUser(token)

    if (error || !user) {
      console.log('Admin token verification failed:', error?.message || 'User not found')

      // Fallback: Try to verify token with regular client
      try {
        const { data: userData, error: userError } = await supabase.auth.getUser(token)

        if (userError || !userData?.user) {
          console.log('Regular auth method also failed:', userError?.message)

          // Development fallback
          if (process.env.NODE_ENV === 'development') {
            console.log('Development mode: Auth failed, using test user')
            return {
              id: '712bd0f0-7768-47a0-a4c6-0da60d8a4a3a',
              email: 'test@example.com'
            }
          }
          return null
        }

        console.log('Regular auth method succeeded for user:', userData.user.email)
        return {
          id: userData.user.id,
          email: userData.user.email!,
          user_metadata: userData.user.user_metadata
        }
      } catch (altError) {
        console.error('Regular auth method error:', altError)

        // Development fallback
        if (process.env.NODE_ENV === 'development') {
          console.log('Development mode: Exception in auth, using test user')
          return {
            id: '712bd0f0-7768-47a0-a4c6-0da60d8a4a3a',
            email: 'test@example.com'
          }
        }
        return null
      }
    }

    console.log('Admin auth succeeded for user:', user.email)
    return {
      id: user.id,
      email: user.email!,
      user_metadata: user.user_metadata
    }
  } catch (error) {
    console.error('Authentication error:', error)
    // Development fallback
    if (process.env.NODE_ENV === 'development') {
      console.log('Development mode: Exception in auth, using test user')
      return {
        id: '712bd0f0-7768-47a0-a4c6-0da60d8a4a3a',
        email: 'test@example.com'
      }
    }
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