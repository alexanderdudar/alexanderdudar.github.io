import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About, Skills, Experience, Education, Projects, Contact } from "@/components/Sections";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Education />
        <Projects />
        <Contact />
      </main>
    </>
  );
}
