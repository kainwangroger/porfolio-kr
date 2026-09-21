import type { Metadata } from "next"
import { GraduationCap, Award, Globe, Heart, Briefcase, Trophy } from "lucide-react"

import { api } from "@/lib/api"
import { SectionTitle } from "@/components/ui/SectionTitle"

/**
 * Régénération toutes les heures. Le contenu bouge rarement ; sans cela chaque
 * visite frappait l'API, y compris pendant le réveil d'un backend en veille.
 */
export const revalidate = 3600


export const metadata: Metadata = {
  title: "Parcours",
  description:
    "Découvrez le parcours de KAINWANG Roger : formations, certifications, expériences professionnelles chez Togo AI Lab & Oxfam, et compétences en Data Engineering et Data Science.",
  openGraph: {
    title: "Parcours | KAINWANG Roger",
    description:
      "Formation, certifications et expériences de KAINWANG Roger — Data Engineer & Data Scientist.",
  },
}

export default async function About() {
  // Le parcours ne dépend pas de l'API : si les compétences ne remontent pas,
  // la section s'efface au lieu de faire tomber toute la page.
  const skillsResult = await api.skills.list().catch(() => null)

  const grouped: Record<string, string[]> = {}
  for (const s of skillsResult ?? []) {
    if (!grouped[s.category]) grouped[s.category] = []
    grouped[s.category].push(s.name)
  }
  const skills = Object.entries(grouped).map(([category, items]) => ({ category, items }))

  const experience = [
    {
      role: "Stagiaire Data Engineer",
      company: "Togo AI Lab",
      period: "Février 2026 – Juillet 2026",
      bullets: [
        "Conception et maintenance de pipelines de données Big Data (Apache Spark, PySpark, Kafka, Airflow).",
        "Développement de solutions data-driven pour des projets gouvernementaux à fort impact sociétal.",
        "Collaboration avec des partenaires internationaux.",
        "Intégration et traitement de données massives à des fins d'aide à la décision publique.",
      ],
    },
    {
      role: "Stagiaire IT",
      company: "Oxfam Intermon",
      period: "Septembre 2022 – Mars 2023",
      bullets: [
        "Support technique et maintenance des systèmes d'information.",
        "Analyse et traitement de données pour le suivi des programmes humanitaires.",
      ],
    },
  ]

  const majorProjects = [
    {
      title: "Harvard HSIL Global Health Systems Hackathon",
      subtitle: "Accra, Ghana · Avril 2026 (Team Togo AI Lab)",
      description:
        "Détection précoce de l'anémie par intelligence artificielle via un simple scan de la paume de la main avec un smartphone. Solution visant à réduire les coûts de diagnostic et améliorer l'accès aux soins dans les zones sous-médicalisées.",
    },
    {
      title: "Portfolio Personnel — Application Web Full Stack",
      subtitle: "2026",
      description:
        "Développement d'un portfolio web moderne avec Next.js 16 (frontend), API FastAPI (backend), backoffice d'administration et déploiement conteneurisé avec Docker.",
    },
  ]

  const education = [
    { degree: "Master 2 en Intelligence Artificielle et Big Data", school: "ESGIS, Lomé", period: "2024 – 2025" },
    { degree: "Master 1 en Intelligence Artificielle et Big Data", school: "ESGIS, Lomé", period: "2023 – 2024" },
    { degree: "Licence en Informatique", school: "Université de N'Gaoundéré, Cameroun", period: "2017 – 2020" },
    { degree: "Baccalauréat série E", school: "Lycée d'Enseignement Technique Industriel de N'Djamena", period: "2016 – 2017" },
  ]

  const certifications = [
    "AWS Cloud Practitioner — Amazon Web Services",
    "Data Engineer, Big Data and ML on Google Cloud — Google Cloud",
    "Agile Project Management and Scrum — OpenClassrooms",
  ]

  const interests = [
    { label: "Sports", value: "Basketball, Football" },
    { label: "Musique", value: "Gospel" },
    { label: "Voyages", value: "Tchad, Cameroun, Nigeria, Bénin, Togo, Ghana" },
    { label: "Permis", value: "Catégorie B" },
  ]

  const languages = [
    { name: "Français", level: "C1 — Courant / Excellente maîtrise" },
    { name: "Anglais", level: "A2 — Élémentaire / Communication de base" },
    { name: "Arabe", level: "A1 — Notions" },
  ]

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:py-20">
      <SectionTitle
        title="Parcours & Expérience"
        subtitle="Découvrez mon historique professionnel, mes formations et mes réalisations"
        className="mb-12"
      />

      {/* Profil & Compétences — empilés : le profil se lit d'abord, les
          compétences profitent ensuite de toute la largeur. */}
      <div className="mb-16 space-y-12">
        <div>
          <h2 className="mb-4 text-xl font-semibold text-foreground">Profil Professionnel</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Data Engineer titulaire d&apos;un Master 2 en Intelligence Artificielle et Big Data (ESGIS), spécialisé dans la
            conception de pipelines de données robustes et scalables, l&apos;analyse de données et le Machine Learning.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Passionné par la transformation de données brutes en insights actionnables pour accompagner la prise de décision.
            Passé par <strong className="text-foreground">Togo AI Lab</strong>, où j&apos;ai conçu et orchestré des pipelines de données pour des projets d&apos;envergure nationale et internationale.
          </p>
        </div>

        <div>
          <h2 className="mb-4 text-xl font-semibold text-foreground">Compétences clés</h2>
          {skills.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              La liste des compétences est momentanément indisponible.
            </p>
          ) : (
            <div className="space-y-4">
              {skills.map((group) => (
                <div key={group.category}>
                  <h3 className="mb-2 text-sm font-medium text-primary">{group.category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-md border border-border bg-card px-3 py-1 text-sm shadow-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Expérience Professionnelle */}
      <h2 className="mb-6 flex items-center gap-2 text-xl font-semibold text-foreground">
        <Briefcase className="h-5 w-5 text-primary" />
        Expériences Professionnelles
      </h2>
      <div className="mb-16 space-y-8">
        {experience.map((exp) => (
          <div key={exp.company + exp.role} className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
              <div>
                <h3 className="text-lg font-bold text-foreground">{exp.role}</h3>
                <p className="text-sm font-semibold text-primary">{exp.company}</p>
              </div>
              <span className="mt-1 sm:mt-0 text-xs font-medium text-muted-foreground rounded-full bg-muted px-3 py-1 self-start sm:self-auto">
                {exp.period}
              </span>
            </div>
            <ul className="space-y-1.5 list-disc list-inside text-sm text-muted-foreground">
              {exp.bullets.map((bullet, idx) => (
                <li key={idx} className="leading-relaxed">
                  {bullet}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Projets Marquants du CV */}
      <h2 className="mb-6 flex items-center gap-2 text-xl font-semibold text-foreground">
        <Trophy className="h-5 w-5 text-primary" />
        Projets Marquants &amp; Hackathons
      </h2>
      <div className="mb-16 grid gap-6 md:grid-cols-2">
        {majorProjects.map((p) => (
          <div key={p.title} className="rounded-xl border border-border bg-card p-6 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-foreground mb-1">{p.title}</h3>
              <p className="text-xs text-primary font-medium mb-3">{p.subtitle}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{p.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Formation */}
      <h2 className="mb-6 flex items-center gap-2 text-xl font-semibold text-foreground">
        <GraduationCap className="h-5 w-5 text-primary" />
        Formation
      </h2>
      <div className="mb-16 space-y-4">
        {education.map((edu) => (
          <div key={edu.degree + edu.school} className="rounded-lg border border-border bg-card p-4 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <h3 className="font-semibold text-foreground">{edu.degree}</h3>
              <p className="text-sm text-primary">{edu.school}</p>
            </div>
            <span className="text-xs font-medium text-muted-foreground">{edu.period}</span>
          </div>
        ))}
      </div>

      {/* Certifications */}
      <h2 className="mb-6 flex items-center gap-2 text-xl font-semibold text-foreground">
        <Award className="h-5 w-5 text-primary" />
        Certifications
      </h2>
      <div className="mb-16 flex flex-wrap gap-3">
        {certifications.map((cert) => (
          <div
            key={cert}
            className="rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-medium shadow-sm flex items-center gap-2"
          >
            <span className="h-2 w-2 rounded-full bg-primary" />
            {cert}
          </div>
        ))}
      </div>

      {/* Langues & Centres d'intérêt — empilés, comme le reste de la page */}
      <div className="space-y-12">
        <div>
          <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold text-foreground">
            <Globe className="h-5 w-5 text-primary" />
            Langues
          </h2>
          {/* En pleine largeur, une pile de cartes paraîtrait étirée : les
              langues passent côte à côte à partir de sm. */}
          <div className="grid gap-3 sm:grid-cols-3">
            {languages.map((lang) => (
              <div
                key={lang.name}
                className="rounded-lg border border-border bg-card p-4 shadow-sm"
              >
                <div className="text-sm font-bold text-foreground">{lang.name}</div>
                <div className="mt-1 text-xs text-muted-foreground">{lang.level}</div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold text-foreground">
            <Heart className="h-5 w-5 text-primary" />
            Centres d&apos;intérêt
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {interests.map((item) => (
              <div
                key={item.label}
                className="rounded-lg border border-border bg-card p-4 shadow-sm"
              >
                <div className="text-sm font-bold text-foreground">{item.label}</div>
                <div className="mt-1 text-xs text-muted-foreground">{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
