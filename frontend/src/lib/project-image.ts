const PALETTE = [
  { bg: "0f172a", text: "60a5fa" }, // slate + blue
  { bg: "1a1a2e", text: "a78bfa" }, // dark + violet
  { bg: "0c1f1a", text: "34d399" }, // dark-green + emerald
  { bg: "1e1a2e", text: "f472b6" }, // dark-purple + pink
  { bg: "1a0f0f", text: "fb923c" }, // dark-red + orange
  { bg: "0f1a2e", text: "38bdf8" }, // dark-navy + sky
]

function hashTitle(title: string): number {
  let h = 0
  for (let i = 0; i < title.length; i++) h = (h * 31 + title.charCodeAt(i)) >>> 0
  return h
}

export function projectImageUrl(project: { title: string; image_url?: string | null }): string {
  if (project.image_url) return project.image_url
  const { bg, text } = PALETTE[hashTitle(project.title) % PALETTE.length]
  const label = encodeURIComponent(project.title.substring(0, 30))
  return `https://placehold.co/800x400/${bg}/${text}?text=${label}&font=raleway`
}
