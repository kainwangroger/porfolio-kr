export function projectImageUrl(project: { title: string; image_url: string | null }): string {
  if (project.image_url) return project.image_url
  const text = encodeURIComponent(project.title)
  return `https://placehold.co/800x400/1a1a2e/eaeaea?text=${text}`
}
