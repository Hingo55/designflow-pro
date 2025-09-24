import { NextRequest, NextResponse } from 'next/server'
import { supabase, supabaseAdmin } from '@/lib/supabase'
import { openai } from '@ai-sdk/openai'
import { generateText } from 'ai'

// POST /api/models/[id]/smart-populate - Generate enhanced input data from model output
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const body = await request.json()
    const { user_id, mode } = body

    if (!user_id) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      )
    }

    // Validate mode
    const validModes = ['original', 'enhanced', 'merged']
    if (!mode || !validModes.includes(mode)) {
      return NextResponse.json(
        { error: 'Mode is required. Must be one of: ' + validModes.join(', ') },
        { status: 400 }
      )
    }

    // Get the model
    const { id } = await params
    const { data: model, error } = await supabaseAdmin
      .from('models')
      .select('*')
      .eq('id', id)
      .eq('user_id', user_id)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'Model not found' },
          { status: 404 }
        )
      }
      console.error('Database error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch model' },
        { status: 500 }
      )
    }

    let populatedData = null

    switch (mode) {
      case 'original':
        // Return original input data as-is
        populatedData = model.input_data
        break

      case 'enhanced':
        // Use AI to convert output_data back to enhanced input format
        if (!model.output_data) {
          return NextResponse.json(
            { error: 'No output data available for enhancement' },
            { status: 400 }
          )
        }

        // Convert structured outcomes model back to enhanced input text
        if (model.output_data.outcomesModel) {
          const outcomesModel = model.output_data.outcomesModel
          populatedData = {
            purposeText: outcomesModel.purpose?.description || model.input_data?.purposeText || '',
            groupsText: outcomesModel.customerGroups?.map((group: any) =>
              `${group.name} (${group.importance} Priority): ${group.description}`
            ).join('\n\n') || model.input_data?.groupsText || '',
            needsText: outcomesModel.customerNeeds?.map((need: any) =>
              `${need.description} [${need.criticality} criticality]\nAcceptance: ${need.acceptanceSignals || 'TBD'}`
            ).join('\n\n') || model.input_data?.needsText || '',
            goalsText: outcomesModel.strategicGoals?.map((goal: any) =>
              `${goal.name}: ${goal.description}\nMetric: ${goal.metric}\nTarget: ${goal.target} by ${goal.timeframe}\nOwner: ${goal.owner}`
            ).join('\n\n') || model.input_data?.goalsText || '',
            outcomesText: outcomesModel.outcomes?.map((outcome: any) =>
              `${outcome.name}: ${outcome.measure}\nBaseline: ${outcome.baseline} → Target: ${outcome.target}\nFrequency: ${outcome.frequency} | Source: ${outcome.dataSource}`
            ).join('\n\n') || model.input_data?.outcomesText || ''
          }
        } else {
          // Fallback to original inputs
          populatedData = model.input_data
        }
        break

      case 'merged':
        // Combine original input and output data intelligently
        if (!model.input_data && !model.output_data) {
          return NextResponse.json(
            { error: 'No input or output data available for merging' },
            { status: 400 }
          )
        }

        // Use AI to create enhanced versions that merge user input with AI insights
        try {
          const result = await generateText({
            model: openai('gpt-4-turbo-preview'),
            prompt: `You are helping to create enhanced input text for an outcomes model tool. Based on the original user inputs and the generated outcomes model, create improved versions of each section that merge the user's original thinking with the structured AI output.

Original User Inputs:
- Purpose: ${model.input_data?.purposeText || 'Not provided'}
- Customer Groups: ${model.input_data?.groupsText || 'Not provided'}
- Customer Needs: ${model.input_data?.needsText || 'Not provided'}
- Strategic Goals: ${model.input_data?.goalsText || 'Not provided'}
- Outcomes: ${model.input_data?.outcomesText || 'Not provided'}

Generated Outcomes Model:
${JSON.stringify(model.output_data?.outcomesModel, null, 2)}

Please create enhanced versions of each input section that:
1. Preserve the user's original voice and ideas
2. Incorporate insights from the structured outcomes model
3. Are written in natural paragraph form suitable for text areas
4. Stay within reasonable length limits (under 500 characters each)

Respond with JSON in this format:
{
  "purposeText": "enhanced purpose description",
  "groupsText": "enhanced customer groups description",
  "needsText": "enhanced customer needs description",
  "goalsText": "enhanced strategic goals description",
  "outcomesText": "enhanced outcomes description"
}`
          })

          try {
            // Clean up AI response - remove markdown code blocks if present
            let cleanedText = result.text.trim()
            if (cleanedText.startsWith('```json\n')) {
              cleanedText = cleanedText.replace(/^```json\n/, '').replace(/\n```$/, '')
            } else if (cleanedText.startsWith('```\n')) {
              cleanedText = cleanedText.replace(/^```\n/, '').replace(/\n```$/, '')
            }

            populatedData = JSON.parse(cleanedText)
          } catch (parseError) {
            console.error('Failed to parse AI-enhanced inputs:', parseError)
            // Fallback to enhanced mode logic
            if (model.output_data?.outcomesModel) {
              const outcomesModel = model.output_data.outcomesModel
              populatedData = {
                purposeText: outcomesModel.purpose?.description || model.input_data?.purposeText || '',
                groupsText: outcomesModel.customerGroups?.map((group: any) =>
                  `${group.name} (${group.importance} Priority): ${group.description}`
                ).join('\n\n') || model.input_data?.groupsText || '',
                needsText: outcomesModel.customerNeeds?.map((need: any) =>
                  `${need.description} [${need.criticality} criticality]`
                ).join('\n\n') || model.input_data?.needsText || '',
                goalsText: outcomesModel.strategicGoals?.map((goal: any) =>
                  `${goal.name}: ${goal.description}\nTarget: ${goal.target} by ${goal.timeframe}`
                ).join('\n\n') || model.input_data?.goalsText || '',
                outcomesText: outcomesModel.outcomes?.map((outcome: any) =>
                  `${outcome.name}: ${outcome.measure} (${outcome.baseline} → ${outcome.target})`
                ).join('\n\n') || model.input_data?.outcomesText || ''
              }
            } else {
              populatedData = model.input_data
            }
          }
        } catch (aiError) {
          console.error('AI merging failed:', aiError)
          // Fallback to original inputs
          populatedData = model.input_data
        }
        break
    }

    return NextResponse.json({
      populated_data: populatedData,
      mode,
      model_type: model.type,
      model_name: model.name
    })

  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}