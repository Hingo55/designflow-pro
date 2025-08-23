import { openai } from '@ai-sdk/openai'
import { generateObject } from 'ai'
import { z } from 'zod'

export const runtime = 'edge'

const strategySchema = z.object({
  recommendations: z.array(z.object({
    title: z.string(),
    description: z.string(),
    priority: z.enum(['high', 'medium', 'low']),
    timeline: z.string(),
    impact: z.string()
  })),
  alignmentScore: z.number().min(0).max(100),
  keyInsights: z.array(z.string()),
  nextSteps: z.array(z.string())
})

export async function POST(req: Request) {
  try {
    const { businessContext, currentChallenges, goals } = await req.json()

    const result = await generateObject({
      model: openai('gpt-4-turbo-preview'),
      schema: strategySchema,
      prompt: `As a Design4 Framework strategist, analyze this business context and provide strategic recommendations:

Business Context: ${businessContext}
Current Challenges: ${currentChallenges}
Goals: ${goals}

Focus on the Design4 principle: "Are we doing the right things?" (Strategy)

Provide specific, actionable recommendations that:
1. Align organizational purpose with strategic direction
2. Address the gap between strategic intent and operational execution
3. Enable quick adaptation to market changes
4. Focus on measurable outcomes

Rate the current strategy alignment score (0-100) and provide key insights and next steps.`
    })

    return Response.json(result.object)
  } catch (error) {
    console.error('Error in strategy AI:', error)
    return new Response('Error processing strategy request', { status: 500 })
  }
}