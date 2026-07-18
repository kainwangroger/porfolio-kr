import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"

import { ThemeProvider } from "@/components/layout/ThemeProvider"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { PageTracker } from "@/components/layout/PageTracker"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: {
    default: "KAINWANG Roger | Data Engineer & Data Scientist",
    template: "%s | KAINWANG Roger",
  },
  description:
    "Portfolio de KAINWANG Roger, Data Engineer & Data Scientist spécialisé en pipelines de données, ML et cloud (AWS, GCP, Azure). Projets, compétences et contact.",
  keywords: [
    "Data Engineer",
    "Data Scientist",
    "Python",
    "FastAPI",
    "Next.js",
    "Apache Spark",
    "PostgreSQL",
    "Machine Learning",
    "KAINWANG Roger",
    "Portfolio",
  ],
  authors: [{ name: "KAINWANG Roger" }],
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "KAINWANG Roger — Portfolio",
    title: "KAINWANG Roger | Data Engineer & Data Scientist",
    description:
      "Portfolio de KAINWANG Roger, Data Engineer & Data Scientist spécialisé en pipelines de données, ML et cloud.",
  },
  twitter: {
    card: "summary",
    title: "KAINWANG Roger | Data Engineer & Data Scientist",
    description:
      "Portfolio de KAINWANG Roger, Data Engineer & Data Scientist spécialisé en pipelines de données, ML et cloud.",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <PageTracker />
        </ThemeProvider>
      </body>
    </html>
  )
}
