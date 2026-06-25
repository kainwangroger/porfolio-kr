import { FeaturedProjects } from "@/components/home/FeaturedProjects"
import { Hero } from "@/components/home/Hero"
import { TechStack } from "@/components/home/TechStack"

export default function Home() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:py-20">
      <Hero />
      <FeaturedProjects />
      <TechStack />
    </div>
  )
}
