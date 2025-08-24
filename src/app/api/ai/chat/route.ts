import { createOpenAI } from '@ai-sdk/openai'
import { streamText } from 'ai'

export const runtime = 'nodejs'
// Using nodejs runtime for proper environment variable access - env var re-added

export async function POST(req: Request) {
  try {
    // Debug all environment variables
    console.log('All environment variables:', Object.keys(process.env))
    console.log('NODE_ENV:', process.env.NODE_ENV)
    console.log('VERCEL:', process.env.VERCEL)
    
    // Get OpenAI key with multiple fallbacks
    const openaiKey = process.env.OPENAI_API_KEY || 
                      process.env['OPENAI_API_KEY'] ||
                      process.env.openai_api_key ||
                      process.env['openai_api_key']
    
    console.log('OpenAI API Key present:', !!openaiKey)
    console.log('OpenAI API Key length:', openaiKey?.length || 0)
    
    const { messages } = await req.json()
    console.log('Messages received:', messages)

    // Return detailed error if key is missing
    if (!openaiKey) {
      return Response.json({ 
        error: 'OpenAI API key not configured',
        availableEnvKeys: Object.keys(process.env).filter(k => k.toLowerCase().includes('openai')),
        timestamp: new Date().toISOString()
      }, { status: 500 })
    }

    // Create OpenAI client with explicit API key
    const openai = createOpenAI({
      apiKey: openaiKey,
    })

    const result = await streamText({
      model: openai('gpt-4-turbo-preview'),
      system: `You are a Design4 Framework AI Assistant for DesignFlow Pro. You help business leaders implement the Design4 framework that connects strategy to execution.

Core Design4 Principles:
1. Strategy: Are we doing the right things?
2. Capabilities: Are we doing things the right way?
3. Operations: Are we getting them done well?
4. Performance: Are we getting the benefits?

Key Benefits:
- Alignment: Connect organizational purpose to daily operations
- Adaptability: Respond quickly to market changes without losing strategic coherence
- Performance: Focus resources on activities that drive measurable outcomes
- Sustainability: Build long-term competitive advantage through systematic improvement

What Makes Design4 Different:
- Continuous Design Mindset: Iterate and adapt continuously rather than plan annually
- Integration Patterns: Prevent common strategy traps through systematic linkage
- Outcome-First Operations: Build service models that enable stakeholder success
- Evidence-Based Decisions: Ground choices in data and stakeholder feedback

Provide practical, actionable advice that helps users bridge the gap between strategic intent and operational execution. Focus on systematic approaches and measurable outcomes.`,
      messages,
    })

    console.log('StreamText result created successfully')
    return result.toTextStreamResponse()
  } catch (error) {
    console.error('Error in AI chat:', error)
    return new Response(JSON.stringify({ 
      error: 'Error processing request', 
      details: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}