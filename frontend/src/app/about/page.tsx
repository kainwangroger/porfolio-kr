import { GraduationCap, Award, Globe, Brain, Heart } from "lucide-react"

import { api } from "@/lib/api"
import { SectionTitle } from "@/components/ui/SectionTitle"

export default async function About() {
  let skills: { category: string; items: string[] }[] = []

  try {
    const all = await api.skills.list()
    const grouped: Record<string, string[]> = {}
    for (const s of all) {
      if (!grouped[s.category]) grouped[s.category] = []
      grouped[s.category].push(s.name)
    }
    skills = Object.entries(grouped).map(([category, items]) => ({ category, items }))
  } catch {
    skills = []
  }

  const experience = [
    { role: "Data Engineer", company: "Entreprise", period: "2024 - Présent", description: "Conception et maintenance de pipelines de données." },
    { role: "Data Scientist", company: "Entreprise", period: "2023 - 2024", description: "Modélisation et analyse de données." },
    { role: "Stagiaire IT", company: "Oxfam Intermon", period: "2022 - 2023", description: "Support technique et analyse de données." },
  ]

  const education = [
    { degree: "Master 2 en Intelligence Artificielle et Big Data", school: "ESGIS", period: "2024 - 2025" },
    { degree: "Master 1 en Intelligence Artificielle et Big Data", school: "ESGIS", period: "2023 - 2024" },
    { degree: "Licence en Informatique", school: "Université de N'Gaoundéré", period: "2017 - 2020" },
  ]

  const certifications = [
    "AWS Cloud Practitioner",
    "Data Engineer, Big Data and ML on Google Cloud",
    "Agile Project Management and Scrum - OpenClassrooms",
  ]

  const languages = [
    { name: "Français", level: "C1 - Excellente maîtrise" },
    { name: "Anglais", level: "A2 - Compréhension écrite et communication de base" },
    { name: "Arabe", level: "A1 - Notions élémentaires" },
  ]

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:py-20">
      <SectionTitle
        title="Parcours"
        subtitle="Qui je suis et ce que je fais"
        className="mb-12"
      />

      <div className="mb-16 grid gap-8 lg:grid-cols-2">
        <div>
          <h3 className="mb-4 text-xl font-semibold">Bio</h3>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Data engineer &amp; data scientist passionné par la donnée, je conçois des
            pipelines de données robustes et scalables avec des technologies comme
            Apache Spark, Airflow, Kafka et Docker. J&apos;aime transformer des
            datasets bruts en insights actionnables via la visualisation (Power BI,
            Tableau, Looker) et le machine learning.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Titulaire d&apos;un Master 2 en Intelligence Artificielle et Big Data à
            l&apos;ESGIS, je maîtrise Python, SQL, les frameworks Django/Flask/Spring Boot
            et les environnements cloud (AWS, Azure, GCP).
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Toujours à l&apos;affût des nouvelles technologies data, je cherche à
            constamment améliorer mes compétences et à livrer des solutions à forte
            valeur ajoutée.
          </p>
        </div>

        <div>
          <h3 className="mb-4 text-xl font-semibold">Compétences</h3>
          {skills.length === 0 ? (
            <p className="text-sm text-muted-foreground">Ajoute des compétences via l'API.</p>
          ) : (
            <div className="space-y-4">
              {skills.map((group) => (
                <div key={group.category}>
                  <h4 className="mb-2 text-sm font-medium text-primary">{group.category}</h4>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-md border border-border bg-card px-3 py-1 text-sm"
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

      <h3 className="mb-6 flex items-center gap-2 text-xl font-semibold">
        <GraduationCap className="h-5 w-5 text-primary" />
        Formation
      </h3>
      <div className="mb-16 space-y-6">
        {education.map((edu) => (
          <div key={edu.degree} className="border-l-2 border-primary pl-4">
            <h4 className="font-semibold">{edu.degree}</h4>
            <p className="text-sm text-primary">{edu.school} · {edu.period}</p>
          </div>
        ))}
      </div>

      <h3 className="mb-6 flex items-center gap-2 text-xl font-semibold">
        <Award className="h-5 w-5 text-primary" />
        Certifications
      </h3>
      <div className="mb-16 flex flex-wrap gap-3">
        {certifications.map((cert) => (
          <span
            key={cert}
            className="rounded-full border border-border bg-card px-4 py-2 text-sm"
          >
            {cert}
          </span>
        ))}
      </div>

      <h3 className="mb-6 flex items-center gap-2 text-xl font-semibold">
        <Brain className="h-5 w-5 text-primary" />
        Expérience
      </h3>
      <div className="mb-16 space-y-6">
        {experience.map((exp) => (
          <div key={exp.role} className="border-l-2 border-primary pl-4">
            <h4 className="font-semibold">{exp.role}</h4>
            <p className="text-sm text-primary">{exp.company} · {exp.period}</p>
            <p className="mt-1 text-sm text-muted-foreground">{exp.description}</p>
          </div>
        ))}
      </div>

      <h3 className="mb-6 flex items-center gap-2 text-xl font-semibold">
        <Globe className="h-5 w-5 text-primary" />
        Langues
      </h3>
      <div className="mb-16 grid gap-4 sm:grid-cols-3">
        {languages.map((lang) => (
          <div key={lang.name} className="rounded-lg border border-border bg-card p-4">
            <div className="text-sm font-semibold">{lang.name}</div>
            <div className="mt-1 text-xs text-muted-foreground">{lang.level}</div>
          </div>
        ))}
      </div>

      <h3 className="mb-6 flex items-center gap-2 text-xl font-semibold">
        <Heart className="h-5 w-5 text-primary" />
        Centres d&apos;intérêt
      </h3>
      <p className="text-sm text-muted-foreground">
        Basketball, football, musique gospel, voyages (Tchad, Cameroun, Nigeria, Bénin, Togo).
      </p>
    </div>
  )
}
