import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { getAuthenticatedUser } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser(request)

    if (!user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    // Check if user exists in our users table
    const { data: userRecord, error: userError } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single()

    // Get projects for this user
    const { data: projects, error: projectsError } = await supabaseAdmin
      .from('projects')
      .select('*')
      .eq('user_id', user.id)

    // Get all projects to see what's in the table
    const { data: allProjects, error: allProjectsError } = await supabaseAdmin
      .from('projects')
      .select('*')
      .limit(10)

    return NextResponse.json({
      authenticated_user: user,
      user_record: userRecord || null,
      user_error: userError?.message || null,
      user_projects: projects || [],
      projects_error: projectsError?.message || null,
      all_projects_sample: allProjects || [],
      all_projects_error: allProjectsError?.message || null
    })
  } catch (error) {
    return NextResponse.json({ error: 'Debug failed', details: error }, { status: 500 })
  }
}