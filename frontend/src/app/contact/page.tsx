"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Send, Mail, Linkedin, Github, CheckCircle } from "lucide-react"

import { api } from "@/lib/api"
import { SectionTitle } from "@/components/ui/SectionTitle"

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
    } catch (err: any) {
      setStatus("error")
      setErrorMsg(err.message || "Une erreur est survenue. Réessayez.")
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

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:py-20">
      <SectionTitle
        title="Contact"
        subtitle="Parlons de votre prochain projet data"
        className="mb-12"
      />

      <div className="grid gap-12 lg:grid-cols-2">
        {/* Formulaire */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {status === "success" ? (
            <div className="flex flex-col items-center gap-4 rounded-xl border border-border bg-card p-10 text-center">
              <CheckCircle className="h-12 w-12 text-green-500" />
              <h3 className="text-lg font-semibold">Message envoyé !</h3>
              <p className="text-sm text-muted-foreground">
                Merci pour votre message. Je vous répondrai dans les plus brefs délais.
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="mt-2 text-sm text-primary hover:underline"
              >
                Envoyer un autre message
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="space-y-5 rounded-xl border border-border bg-card p-8"
            >
              <div>
                <label
                  htmlFor="name"
                  className="mb-1.5 block text-sm font-medium"
                >
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
                  className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm transition-colors focus:border-primary focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-1.5 block text-sm font-medium"
                >
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
                  className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm transition-colors focus:border-primary focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-1.5 block text-sm font-medium"
                >
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
                  className="w-full resize-none rounded-lg border border-border bg-background px-4 py-2.5 text-sm transition-colors focus:border-primary focus:outline-none"
                />
              </div>

              {status === "error" && (
                <p className="text-sm text-red-500">{errorMsg}</p>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
              >
                <Send className="h-4 w-4" />
                {status === "loading" ? "Envoi en cours..." : "Envoyer le message"}
              </button>
            </form>
          )}
        </motion.div>

        {/* Liens de contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-6"
        >
          <div>
            <h3 className="mb-2 text-lg font-semibold">Autres moyens de me contacter</h3>
            <p className="text-sm text-muted-foreground">
              N&apos;hésitez pas à me contacter directement via l&apos;un de ces canaux.
              Je réponds généralement sous 24h.
            </p>
          </div>

          <div className="space-y-4">
            {links.map(({ icon: Icon, label, value, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="flex items-center gap-4 rounded-lg border border-border bg-card p-4 transition-all hover:border-primary hover:shadow-sm"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm font-medium">{label}</div>
                  <div className="text-xs text-muted-foreground">{value}</div>
                </div>
              </a>
            ))}
          </div>

          <div className="rounded-lg border border-border bg-card p-5">
            <h4 className="mb-2 text-sm font-semibold">Disponibilité</h4>
            <p className="text-sm text-muted-foreground">
              Ouvert aux opportunités freelance et CDI en Data Engineering,
              Data Science et MLOps.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
