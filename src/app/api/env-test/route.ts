export const runtime = 'nodejs'

export async function GET() {
  try {
    const allEnvKeys = Object.keys(process.env)
    const openaiKeys = allEnvKeys.filter(key => 
      key.toLowerCase().includes('openai') || 
      key.toLowerCase().includes('api') ||
      key.toLowerCase().includes('key')
    )
    
    return Response.json({
      totalEnvVars: allEnvKeys.length,
      allKeys: allEnvKeys.slice(0, 20), // First 20 keys only
      openaiRelatedKeys: openaiKeys,
      hasOpenAI: !!process.env.OPENAI_API_KEY,
      nodeEnv: process.env.NODE_ENV,
      vercelEnv: process.env.VERCEL_ENV,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    return Response.json({
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}