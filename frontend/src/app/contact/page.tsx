"use client"

import { useState } from "react"
import { Send, Mail, Linkedin, Github, CheckCircle } from "lucide-react"

import { api } from "@/lib/api"
import { errorMessage } from "@/lib/utils"

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" })
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMsg, setErrorMsg] = useState("")

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")
    setErrorMsg("")
    try {
      await api.contact(form)
      setStatus("success")
      setForm({ name: "", email: "", message: "" })
    } catch (err) {
      setStatus("error")
      setErrorMsg(errorMessage(err, "Une erreur est survenue. Réessayez."))
    }
  }

  const links = [
    {
      icon: Mail,
      label: "Email",
      value: "kainwangr@gmail.com",
      href: "mailto:kainwangr@gmail.com",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "linkedin.com/in/kainwangroger",
      href: "https://linkedin.com/in/kainwangroger",
    },
    {
      icon: Github,
      label: "GitHub",
      value: "github.com/kainwangroger",
      href: "https://github.com/kainwangroger",
    },
  ]


  const fieldClass =
    "w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm transition-colors focus:border-primary focus:outline-none"

  /**
   * Les deux colonnes sont placées explicitement sur trois rangées — titres,
   * sous-titres, contenus. Chaque rangée prend la hauteur du plus grand de ses
   * deux éléments, si bien que les titres restent au même niveau et les cartes
   * démarrent à la même hauteur, quelle que soit la longueur des textes.
   * L'ordre du DOM reste celui de la lecture mobile, où tout s'empile.
   */
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:py-20">
      <div className="grid gap-x-12 gap-y-4 lg:grid-cols-2">
        {/* Colonne 1 — titre */}
        <h1 className="text-3xl font-bold tracking-tight text-balance lg:col-start-1 lg:row-start-1 lg:self-end">
          Contact
        </h1>
        <p className="text-lg text-muted-foreground lg:col-start-1 lg:row-start-2">
          Parlons de votre prochain projet data
        </p>

        {/* Colonne 1 — formulaire */}
        <div className="mt-4 lg:col-start-1 lg:row-start-3 lg:mt-6">
          {status === "success" ? (
            <div className="flex h-full flex-col items-center justify-center gap-4 rounded-xl border border-border bg-card p-8 text-center">
              <CheckCircle className="h-12 w-12 text-green-500" />
              <h2 className="text-lg font-semibold">Message envoyé !</h2>
              <p className="text-sm text-muted-foreground">
                Merci pour votre message. Je vous répondrai dans les plus brefs délais.
              </p>
              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="mt-2 text-sm text-primary hover:underline"
              >
                Envoyer un autre message
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex h-full flex-col gap-5 rounded-xl border border-border bg-card p-6"
            >
              <div>
                <label htmlFor="name" className="mb-1.5 block text-sm font-semibold">
                  Nom complet
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="KAINWANG Roger"
                  className={fieldClass}
                />
              </div>

              <div>
                <label htmlFor="email" className="mb-1.5 block text-sm font-semibold">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="vous@exemple.com"
                  className={fieldClass}
                />
              </div>

              {/* Le champ message absorbe la hauteur restante : les deux
                  colonnes se terminent ainsi exactement au même niveau. */}
              <div className="flex flex-1 flex-col">
                <label htmlFor="message" className="mb-1.5 block text-sm font-semibold">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Décrivez votre projet ou votre demande..."
                  className={`${fieldClass} min-h-32 flex-1 resize-none`}
                />
              </div>

              {status === "error" && (
                <p role="alert" className="text-sm text-red-500">
                  {errorMsg}
                </p>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
              >
                <Send className="h-4 w-4" />
                {status === "loading" ? "Envoi en cours..." : "Envoyer le message"}
              </button>
            </form>
          )}
        </div>

        {/* Colonne 2 — titre */}
        <h2 className="mt-10 text-3xl font-bold tracking-tight text-balance lg:col-start-2 lg:row-start-1 lg:mt-0 lg:self-end">
          Autres moyens de me contacter
        </h2>
        <p className="text-lg text-muted-foreground lg:col-start-2 lg:row-start-2">
          Je réponds généralement sous 24h.
        </p>

        {/* Colonne 2 — canaux */}
        <div className="mt-4 flex flex-col gap-4 lg:col-start-2 lg:row-start-3 lg:mt-6">
          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="mb-1.5 text-sm font-semibold">Disponibilité</h3>
            <p className="text-sm text-muted-foreground">
              Ouvert aux opportunités freelance et CDI en Data Engineering, Data Science et
              MLOps.
            </p>
          </div>

          {links.map(({ icon: Icon, label, value, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="flex flex-1 items-center gap-4 rounded-xl border border-border bg-card p-6 transition-all hover:border-primary hover:shadow-sm"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Icon className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <div className="text-sm font-semibold">{label}</div>
                <div className="truncate text-sm text-muted-foreground">{value}</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
