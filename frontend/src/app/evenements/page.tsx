import type { Metadata } from "next"
import { CalendarDays, ExternalLink, MapPin } from "lucide-react"

import { SectionTitle } from "@/components/ui/SectionTitle"
import { EventGallery } from "@/components/events/EventGallery"
import { api, eventImages, PortfolioEvent } from "@/lib/api"

/**
 * Régénération toutes les heures, comme les autres pages publiques.
 */
export const revalidate = 3600

export const metadata: Metadata = {
  title: "Événements",
  description:
    "Hackathons, conférences et rencontres auxquels KAINWANG Roger a participé : HSIL Hackathon de la Harvard T.H. Chan School of Public Health à Accra, et autres événements data et IA.",
  openGraph: {
    title: "Événements | KAINWANG Roger",
    description:
      "Hackathons, conférences et rencontres data & IA auxquels KAINWANG Roger a participé.",
  },
}

export default async function EventsPage() {
  // Une panne remonte à `error.tsx` : « aucun événement » ne doit décrire
  // qu'une liste réellement vide.
  const events: PortfolioEvent[] = await api.events.list()

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:py-20">
      <SectionTitle
        title="Événements"
        subtitle="Hackathons, conférences et rencontres autour de la data et de l'IA"
        className="mb-12"
      />

      {events.length === 0 ? (
        <p className="text-center text-muted-foreground">Aucun événement pour le moment.</p>
      ) : (
        <div className="space-y-16">
          {events.map((event) => (
            <EventEntry key={event.slug} event={event} />
          ))}
        </div>
      )}
    </div>
  )
}

function EventEntry({ event }: { event: PortfolioEvent }) {
  const images = eventImages(event)
  const paragraphs = event.description.split(/\n{2,}/).filter(Boolean)

  return (
    <article className="border-t border-border pt-8 first:border-t-0 first:pt-0">
      <header className="mb-6">
        {(event.period || event.location) && (
          <div className="mb-3 flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-muted-foreground">
            {event.period && (
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays className="h-4 w-4" />
                {event.period}
              </span>
            )}
            {event.location && (
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-4 w-4" />
                {event.location}
              </span>
            )}
          </div>
        )}

        <h2 className="text-2xl font-bold tracking-tight text-balance sm:text-3xl">
          {event.title}
        </h2>

        {event.organizer && (
          <p className="mt-1.5 text-sm font-semibold text-primary">{event.organizer}</p>
        )}

        {event.role && (
          <p className="mt-3 inline-block rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
            {event.role}
          </p>
        )}
      </header>

      {paragraphs.length > 0 && (
        <div className="mb-6 max-w-3xl space-y-4 text-muted-foreground">
          {paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 40)} className="leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      )}

      {event.link_url && (
        <a
          href={event.link_url}
          target="_blank"
          rel="noopener noreferrer"
          className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
        >
          <ExternalLink className="h-4 w-4" />
          En savoir plus
        </a>
      )}

      <EventGallery images={images} title={event.title} />
    </article>
  )
}
