import { Github, Linkedin, Mail } from "lucide-react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-4 py-8 md:flex-row md:justify-between">
        <div className="flex flex-col items-center gap-1 text-sm text-muted-foreground md:items-start">
          <span className="font-medium text-foreground">KAINWANG Roger</span>
          <div className="flex items-center gap-2">
            <Mail className="h-3.5 w-3.5" />
            <a
              href="mailto:kainwangr@gmail.com"
              className="transition-colors hover:text-foreground"
            >
              kainwangr@gmail.com
            </a>
          </div>
        </div>

        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} KAINWANG Roger. Tous droits réservés.
        </p>

        <div className="flex items-center gap-4">
          <Link
            href="/contact"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Contact
          </Link>
          <a
            href="https://github.com/kainwangroger"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <Github size={20} className="text-muted-foreground transition-colors hover:text-foreground" />
          </a>
          <a
            href="https://linkedin.com/in/kainwangroger"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <Linkedin size={20} className="text-muted-foreground transition-colors hover:text-foreground" />
          </a>
        </div>
      </div>
    </footer>
  )
}
