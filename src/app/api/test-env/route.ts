export const runtime = 'nodejs'

export async function GET() {
  return Response.json({
    hasOpenAI: !!process.env.OPENAI_API_KEY,
    keyLength: process.env.OPENAI_API_KEY?.length || 0,
    keyStart: process.env.OPENAI_API_KEY?.substring(0, 10) || 'missing',
    nodeEnv: process.env.NODE_ENV,
    vercelEnv: process.env.VERCEL_ENV,
    allEnvKeys: Object.keys(process.env).filter(k => k.includes('OPENAI')),
    timestamp: new Date().toISOString()
  })
}