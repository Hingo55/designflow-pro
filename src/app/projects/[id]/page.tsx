import ProjectDetailClient from '@/components/ProjectDetailClient'

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params
  return <ProjectDetailClient id={resolvedParams.id} />
}