
import Hero from "@/components/Hero";
import Navigation from "@/components/Navigation";
import Features from "@/components/Features";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <Navigation />
      <Hero />
      <Features />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default Index;
