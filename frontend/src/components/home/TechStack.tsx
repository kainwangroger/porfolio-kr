import { SectionTitle } from "@/components/ui/SectionTitle"
import { Skill } from "@/lib/api"
import { TechIcon } from "./TechIcon"

/**
 * Technologies maîtrisées — composant serveur.
 *
 * La section chargeait auparavant ses données en `useEffect` et renvoyait
 * `null` tant que la réponse n'était pas arrivée : le mot « Technologies »
 * n'apparaissait nulle part dans le HTML servi. Les compétences sont
 * désormais récupérées côté serveur par la page d'accueil et passées ici.
 */
export function TechStack({ skills }: { skills: Skill[] }) {
  if (skills.length === 0) return null

  return (
    <section className="mb-24">
      <SectionTitle
        as="h2"
        title="Technologies"
        subtitle="Les outils que j'utilise au quotidien"
        className="mb-12"
      />
      <ul className="flex flex-wrap gap-3">
        {skills.map((skill) => (
          <li
            key={skill.id}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium transition-colors hover:border-primary"
          >
            <TechIcon name={skill.name} />
            {skill.name}
          </li>
        ))}
      </ul>
    </section>
  )
}
