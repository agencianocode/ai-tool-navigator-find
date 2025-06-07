
import Hero from "@/components/Hero";
import Navigation from "@/components/Navigation";
import Features from "@/components/Features";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";

const Home = () => {
  return (
    <>
      <SEO
        title="AI Tool Navigator - Encuentra las Mejores Herramientas de IA"
        description="Descubre y compara las mejores herramientas de inteligencia artificial para tu proyecto. Generador de hojas de ruta personalizado, reviews y análisis detallados."
        keywords={["inteligencia artificial", "herramientas IA", "tecnología", "automatización", "productividad", "ChatGPT", "generador hojas de ruta"]}
        url="https://ai-tool-navigator.com"
      />
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
        <Navigation />
        <Hero />
        <Features />
        <CallToAction />
        <Footer />
      </div>
    </>
  );
};

export default Home;
