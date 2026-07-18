import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Clock, Calendar } from "lucide-react"

import { api } from "@/lib/api"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  try {
    const post = await api.blog.get(slug)
    return {
      title: post.title,
      description: post.excerpt || post.title,
      openGraph: {
        title: `${post.title} | KAINWANG Roger`,
        description: post.excerpt || post.title,
      },
    }
  } catch {
    return { title: "Article introuvable" }
  }
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  let post

  try {
    post = await api.blog.get(slug)
  } catch {
    notFound()
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:py-20">
      {/* Retour */}
      <Link
        href="/blog"
        className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" />
        Retour au blog
      </Link>

      {/* Header */}
      <header className="mb-10">
        {post.tags && (
          <div className="mb-4 flex flex-wrap gap-2">
            {post.tags
              .split(",")
              .filter(Boolean)
              .map((tag: string) => (
                <span
                  key={tag.trim()}
                  className="rounded-full border border-border px-3 py-0.5 text-xs text-muted-foreground"
                >
                  {tag.trim()}
                </span>
              ))}
          </div>
        )}

        <h1 className="mb-4 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
          {post.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4" />
            <time dateTime={post.created_at}>{formatDate(post.created_at)}</time>
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" />
            {post.read_time} min de lecture
          </span>
        </div>
      </header>

      {/* Contenu */}
      <div className="prose prose-neutral dark:prose-invert max-w-none">
        {post.content ? (
          <div style={{ whiteSpace: "pre-wrap" }}>{post.content}</div>
        ) : (
          <p className="text-muted-foreground">Contenu non disponible.</p>
        )}
      </div>

      {/* Footer nav */}
      <div className="mt-12 border-t border-border pt-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          Voir tous les articles
        </Link>
      </div>
    </div>
  )
}
