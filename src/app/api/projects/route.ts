import { NextRequest, NextResponse } from 'next/server'
import { supabase, supabaseAdmin } from '@/lib/supabase'
import { getAuthenticatedUser } from '@/lib/auth'

// GET /api/projects - List all projects for authenticated user
export async function GET(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser(request)
    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    console.log('GET /api/projects - User ID:', user.id)

    const { data: projects, error } = await supabaseAdmin
      .from('projects')
      .select('*')
      .eq('user_id', user.id)
      .order('updated_at', { ascending: false })

    console.log('GET /api/projects - Query result:', { projects, error })

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch projects' },
        { status: 500 }
      )
    }

    console.log('GET /api/projects - Returning projects:', projects)
    return NextResponse.json({ projects })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST /api/projects - Create new project
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, description, phase, status } = body

    const user = await getAuthenticatedUser(request)
    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }


    // Validate required fields
    if (!name || !phase) {
      return NextResponse.json(
        { error: 'name and phase are required' },
        { status: 400 }
      )
    }

    // Validate phase value
    const validPhases = ['discover', 'define', 'develop', 'deliver']
    if (!validPhases.includes(phase)) {
      return NextResponse.json(
        { error: 'Invalid phase. Must be one of: ' + validPhases.join(', ') },
        { status: 400 }
      )
    }

    // Validate status if provided
    if (status) {
      const validStatuses = ['active', 'completed', 'archived']
      if (!validStatuses.includes(status)) {
        return NextResponse.json(
          { error: 'Invalid status. Must be one of: ' + validStatuses.join(', ') },
          { status: 400 }
        )
      }
    }

    const { data: project, error } = await supabaseAdmin
      .from('projects')
      .insert([{
        user_id: user.id,
        name,
        description: description || null,
        phase,
        status: status || 'active'
      }])
      .select()
      .single()

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: 'Failed to create project' },
        { status: 500 }
      )
    }

    return NextResponse.json({ project }, { status: 201 })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}