import { cn } from "@/lib/utils"

interface SectionTitleProps {
  title: string
  subtitle?: string
  className?: string
  /**
   * Niveau du titre. Chaque page doit porter un `h1` unique — c'est ce que
   * lisent les moteurs de recherche et ce sur quoi s'appuie la navigation par
   * titres des lecteurs d'écran. Les titres de sections internes prennent `h2`.
   */
  as?: "h1" | "h2"
}

export function SectionTitle({
  title,
  subtitle,
  className,
  as: Heading = "h1",
}: SectionTitleProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <Heading className="text-3xl font-bold tracking-tight text-balance sm:text-4xl">
        {title}
      </Heading>
      {subtitle && <p className="max-w-2xl text-lg text-muted-foreground">{subtitle}</p>}
    </div>
  )
}
