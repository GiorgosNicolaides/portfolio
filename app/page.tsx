import Hero from '@/components/home/Hero'
import About from '@/components/home/About'
import Roadmap from '@/components/home/Roadmap'
import Skills from '@/components/home/Skills'
import FeaturedProjects from '@/components/home/FeaturedProjects'
import Experience from '@/components/home/Experience'
import Contact from '@/components/home/Contact'

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Roadmap />
      <Skills />
      <FeaturedProjects />
      <Experience />
      <Contact />
    </>
  )
}
