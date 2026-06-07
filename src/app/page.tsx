import PageReveal from "@/components/PageReveal";
import CustomCursor from "@/components/CustomCursor";
import GrainOverlay from "@/components/GrainOverlay";
import ScrollProgress from "@/components/ScrollProgress";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Films from "@/components/Films";
import Showreel from "@/components/Showreel";
import About from "@/components/About";
import Work from "@/components/Work";
import Skills from "@/components/Skills";
import Journalism from "@/components/Journalism";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <PageReveal />
      <CustomCursor />
      <GrainOverlay />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <Films />
        <Showreel />
        <About />
        <Work />
        <Skills />
        <Journalism />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
