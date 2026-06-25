import { Github, Linkedin, Mail, Phone } from "lucide-react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-4 py-8 md:flex-row md:justify-between">
        <div className="flex flex-col items-center gap-2 text-sm text-muted-foreground md:items-start">
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            <a href="mailto:kainwangr@gmail.com" className="hover:text-foreground transition-colors">
              kainwangr@gmail.com
            </a>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4" />
            <span>+228 99 48 83 08</span>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Portfolio. Tous droits réservés.
        </p>
        <div className="flex items-center gap-4">
          <Link href="https://github.com/kainwangroger" target="_blank" aria-label="GitHub">
            <Github size={20} className="text-muted-foreground hover:text-foreground transition-colors" />
          </Link>
          <Link href="https://linkedin.com" target="_blank" aria-label="LinkedIn">
            <Linkedin size={20} className="text-muted-foreground hover:text-foreground transition-colors" />
          </Link>
        </div>
      </div>
    </footer>
  )
}
