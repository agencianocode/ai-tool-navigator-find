
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Target, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative py-24 px-6 text-center bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Encuentra las
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
              {" "}Herramientas de IA{" "}
            </span>
            Perfectas
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Responde unas preguntas simples y obtén una hoja de ruta personalizada 
            con las mejores herramientas de IA para tu proyecto.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <Button asChild size="lg" className="text-lg px-8 py-6 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
            <Link to="/questionnaire">
              Crear Mi Hoja de Ruta
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6">
            <Link to="/tools">
              Explorar Herramientas
            </Link>
          </Button>
        </div>

        {/* Features destacadas */}
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center p-6 rounded-2xl bg-white/50 backdrop-blur-sm border border-white/20">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-purple-100 to-blue-100 mb-4">
              <Sparkles className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">IA Personalizada</h3>
            <p className="text-gray-600">
              Recomendaciones inteligentes basadas en tus necesidades específicas
            </p>
          </div>
          
          <div className="text-center p-6 rounded-2xl bg-white/50 backdrop-blur-sm border border-white/20">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-green-100 to-blue-100 mb-4">
              <Target className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Totalmente Gratis</h3>
            <p className="text-gray-600">
              Acceso completo a todas las herramientas y recomendaciones sin costo
            </p>
          </div>
          
          <div className="text-center p-6 rounded-2xl bg-white/50 backdrop-blur-sm border border-white/20">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-orange-100 to-red-100 mb-4">
              <Clock className="h-8 w-8 text-orange-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">En 5 Minutos</h3>
            <p className="text-gray-600">
              Obtén tu hoja de ruta personalizada en menos de 5 minutos
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
