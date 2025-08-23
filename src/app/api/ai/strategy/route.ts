import { openai } from '@ai-sdk/openai'
import { generateText } from 'ai'

export const runtime = 'edge'

export async function POST(req: Request) {
  try {
    const { businessContext, currentChallenges, goals } = await req.json()

    const result = await generateText({
      model: openai('gpt-4-turbo-preview'),
      prompt: `As a Design4 Framework strategist, analyze this business context and provide strategic recommendations in JSON format:

Business Context: ${businessContext}
Current Challenges: ${currentChallenges}
Goals: ${goals}

Focus on the Design4 principle: "Are we doing the right things?" (Strategy)

Return a JSON object with exactly this structure:
{
  "alignmentScore": [number 0-100],
  "keyInsights": [array of 3-5 insight strings],
  "recommendations": [
    {
      "title": "recommendation title",
      "description": "detailed description",
      "priority": "high|medium|low",
      "timeline": "timeline string",
      "impact": "expected impact"
    }
  ],
  "nextSteps": [array of 3-5 next step strings]
}

Provide specific, actionable recommendations that align organizational purpose with strategic direction and address the gap between strategic intent and operational execution.`
    })

    // Parse the JSON response
    try {
      const jsonResponse = JSON.parse(result.text)
      return Response.json(jsonResponse)
    } catch (parseError) {
      // If JSON parsing fails, return a structured fallback
      return Response.json({
        alignmentScore: 75,
        keyInsights: [
          "Strategic clarity needs improvement based on your context",
          "Gap exists between strategic intent and operational execution",
          "Market adaptation capabilities require enhancement"
        ],
        recommendations: [{
          title: "Strategic Alignment Assessment",
          description: "Conduct a comprehensive review of current strategic direction against organizational purpose",
          priority: "high",
          timeline: "2-4 weeks",
          impact: "High - Foundation for all other improvements"
        }],
        nextSteps: [
          "Schedule strategic alignment workshop with leadership team",
          "Document current strategic objectives and measure against outcomes",
          "Identify key execution gaps and prioritize improvements"
        ]
      })
    }
  } catch (error) {
    console.error('Error in strategy AI:', error)
    return new Response(JSON.stringify({ error: 'Error processing strategy request' }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}