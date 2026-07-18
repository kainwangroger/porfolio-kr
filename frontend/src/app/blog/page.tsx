import type { Metadata } from "next"
import Link from "next/link"

import { SectionTitle } from "@/components/ui/SectionTitle"
import { api, BlogPost } from "@/lib/api"

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Articles de KAINWANG Roger sur le Data Engineering, la Data Science, le Machine Learning et les technologies cloud.",
  openGraph: {
    title: "Blog | KAINWANG Roger",
    description:
      "Articles techniques sur le Data Engineering, ML et cloud par KAINWANG Roger.",
  },
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export default async function BlogPage() {
  let posts: BlogPost[] = []
  try {
    posts = await api.blog.list()
  } catch {
    posts = []
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:py-20">
      <SectionTitle
        title="Blog"
        subtitle="Réflexions sur la data, le ML et le cloud"
        className="mb-12"
      />

      {posts.length === 0 ? (
        <div className="flex flex-col items-center gap-4 py-20 text-center">
          <p className="text-muted-foreground">
            Aucun article publié pour le moment.
          </p>
          <p className="text-sm text-muted-foreground">
            Revenez bientôt — des articles sont en cours de rédaction.
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-primary hover:shadow-md"
            >
              <Link href={`/blog/${post.slug}`} className="block">
                <div className="mb-3 flex flex-wrap items-center gap-3">
                  {post.tags &&
                    post.tags
                      .split(",")
                      .filter(Boolean)
                      .map((tag) => (
                        <span
                          key={tag.trim()}
                          className="rounded-full border border-border px-3 py-0.5 text-xs text-muted-foreground"
                        >
                          {tag.trim()}
                        </span>
                      ))}
                  <span className="ml-auto text-xs text-muted-foreground">
                    {post.read_time} min de lecture
                  </span>
                </div>

                <h2 className="mb-2 text-xl font-semibold transition-colors group-hover:text-primary">
                  {post.title}
                </h2>

                {post.excerpt && (
                  <p className="mb-4 text-sm text-muted-foreground line-clamp-3">
                    {post.excerpt}
                  </p>
                )}

                <div className="flex items-center justify-between">
                  <time
                    className="text-xs text-muted-foreground"
                    dateTime={post.created_at}
                  >
                    {formatDate(post.created_at)}
                  </time>
                  <span className="text-sm font-medium text-primary group-hover:underline">
                    Lire l&apos;article →
                  </span>
                </div>
              </Link>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}
