export const runtime = 'edge'

export async function GET() {
  try {
    const hasOpenAI = !!process.env.OPENAI_API_KEY
    const keyLength = process.env.OPENAI_API_KEY?.length || 0
    
    return Response.json({
      status: 'ok',
      hasOpenAI,
      keyLength,
      timestamp: new Date().toISOString(),
      runtime: 'edge'
    })
  } catch (error) {
    return Response.json({
      status: 'error',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    })
  }
}