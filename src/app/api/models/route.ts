import { NextRequest, NextResponse } from 'next/server'
import { supabase, supabaseAdmin } from '@/lib/supabase'

// GET /api/models - List all models for authenticated user
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const projectId = searchParams.get('projectId')
    const type = searchParams.get('type')

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      )
    }

    let query = supabaseAdmin
      .from('models')
      .select('*')
      .eq('user_id', userId)

    // Add optional filters
    if (projectId) {
      query = query.eq('project_id', projectId)
    }

    if (type) {
      query = query.eq('type', type)
    }

    const { data: models, error } = await query
      .order('updated_at', { ascending: false })

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch models' },
        { status: 500 }
      )
    }

    return NextResponse.json({ models })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST /api/models - Create new model
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { user_id, project_id, type, name, status, input_data, output_data } = body

    // Validate required fields
    if (!user_id || !project_id || !type || !name) {
      return NextResponse.json(
        { error: 'user_id, project_id, type, and name are required' },
        { status: 400 }
      )
    }

    // Validate status if provided
    if (status) {
      const validStatuses = ['not_started', 'in_progress', 'draft', 'published']
      if (!validStatuses.includes(status)) {
        return NextResponse.json(
          { error: 'Invalid status. Must be one of: ' + validStatuses.join(', ') },
          { status: 400 }
        )
      }
    }

    // Verify project belongs to user
    const { data: project, error: projectError } = await supabaseAdmin
      .from('projects')
      .select('id')
      .eq('id', project_id)
      .eq('user_id', user_id)
      .single()

    if (projectError || !project) {
      return NextResponse.json(
        { error: 'Project not found or access denied' },
        { status: 404 }
      )
    }

    const { data: model, error } = await supabaseAdmin
      .from('models')
      .insert([{
        user_id,
        project_id,
        type,
        name,
        status: status || 'not_started',
        input_data: input_data || null,
        output_data: output_data || null
      }])
      .select()
      .single()

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: 'Failed to create model' },
        { status: 500 }
      )
    }

    return NextResponse.json({ model }, { status: 201 })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}