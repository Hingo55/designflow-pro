import { openai } from '@ai-sdk/openai'
import { generateObject } from 'ai'
import { z } from 'zod'

export const runtime = 'edge'

const assessmentSchema = z.object({
  overallScore: z.number().min(0).max(100),
  categoryScores: z.object({
    strategy: z.number().min(0).max(100),
    capabilities: z.number().min(0).max(100),
    operations: z.number().min(0).max(100),
    performance: z.number().min(0).max(100)
  }),
  strengths: z.array(z.string()),
  gaps: z.array(z.object({
    category: z.string(),
    description: z.string(),
    impact: z.enum(['high', 'medium', 'low']),
    recommendation: z.string()
  })),
  roadmap: z.array(z.object({
    phase: z.string(),
    timeline: z.string(),
    objectives: z.array(z.string()),
    priority: z.enum(['high', 'medium', 'low'])
  }))
})

export async function POST(req: Request) {
  try {
    const { responses } = await req.json()

    const result = await generateObject({
      model: openai('gpt-4-turbo-preview'),
      schema: assessmentSchema,
      prompt: `As a Design4 Framework expert, analyze these assessment responses and provide a comprehensive capability assessment:

Assessment Responses: ${JSON.stringify(responses)}

Evaluate across the four Design4 dimensions:
1. Strategy (Are we doing the right things?)
2. Capabilities (Are we doing things the right way?)
3. Operations (Are we getting them done well?)
4. Performance (Are we getting the benefits?)

Provide:
- Overall maturity score (0-100)
- Individual scores for each category
- Key strengths to build upon
- Critical gaps that need addressing
- Prioritized roadmap for improvement

Focus on bridging the gap between strategic intent and operational execution.`
    })

    return Response.json(result.object)
  } catch (error) {
    console.error('Error in assessment AI:', error)
    return new Response('Error processing assessment', { status: 500 })
  }
}