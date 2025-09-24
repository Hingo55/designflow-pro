import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { getAuthenticatedUser } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser(request)

    if (!user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    console.log('Fix Projects - Authenticated user:', user.id, user.email)

    // Update all projects with the test user ID to use the real user ID
    const { data: updatedProjects, error } = await supabaseAdmin
      .from('projects')
      .update({ user_id: user.id })
      .eq('user_id', '712bd0f0-7768-47a0-a4c6-0da60d8a4a3a') // Old test user ID
      .select()

    if (error) {
      console.error('Error updating projects:', error)
      return NextResponse.json({ error: 'Failed to update projects' }, { status: 500 })
    }

    // Also create user record if it doesn't exist
    const { data: existingUser } = await supabaseAdmin
      .from('users')
      .select('id')
      .eq('id', user.id)
      .single()

    if (!existingUser) {
      const { data: newUser, error: userError } = await supabaseAdmin
        .from('users')
        .insert([{
          id: user.id,
          email: user.email,
          name: user.email.split('@')[0]
        }])
        .select()
        .single()

      if (userError) {
        console.error('Error creating user:', userError)
      } else {
        console.log('Created user record:', newUser)
      }
    }

    return NextResponse.json({
      message: 'Projects updated successfully',
      updated_projects: updatedProjects,
      user_id: user.id
    })
  } catch (error) {
    console.error('Fix projects error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}