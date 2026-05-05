import Hero from "./components/landing/Hero";
import Header from "./components/Header";
import About from "./components/landing/About";
import SkillsPage from "./components/landing/SkillsPage";
import Projects from "./components/landing/Projects";
import ContactSection from "./components/landing/ContactSection";

export default function Home() {
  return (
    <>
    <Header />
    <Hero />
    <About />
    <SkillsPage />
    <Projects />
    <ContactSection/>
    </>
  );
}
