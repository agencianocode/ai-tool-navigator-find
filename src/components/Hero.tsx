
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles, Target, Zap } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        {/* Badge */}
        <Badge variant="secondary" className="mb-6 px-4 py-2 text-sm font-medium bg-white/60 backdrop-blur-sm border border-purple-200">
          <Sparkles className="w-4 h-4 mr-2 text-purple-600" />
          Encuentra las mejores herramientas IA para tu proyecto
        </Badge>

        {/* Main heading */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
          Descubre las{" "}
          <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Herramientas IA
          </span>{" "}
          perfectas para tu negocio
        </h1>

        {/* Subtitle */}
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
          Nuestro cuestionario inteligente analiza tus necesidades y te recomienda las mejores herramientas de IA, 
          creando una hoja de ruta personalizada para optimizar tu flujo de trabajo.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
            asChild
          >
            <a href="/questionnaire">
              Comenzar Evaluación
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="px-8 py-3 text-lg font-semibold border-2 border-purple-200 hover:border-purple-300 hover:bg-purple-50 transition-all duration-200"
            asChild
          >
            <a href="/tools">
              Explorar Herramientas
            </a>
          </Button>
        </div>

        {/* Feature highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-3 p-4 bg-white/40 backdrop-blur-sm rounded-lg border border-purple-100">
            <Target className="h-6 w-6 text-purple-600" />
            <span className="text-gray-700 font-medium">Recomendaciones Personalizadas</span>
          </div>
          <div className="flex items-center justify-center gap-3 p-4 bg-white/40 backdrop-blur-sm rounded-lg border border-blue-100">
            <Zap className="h-6 w-6 text-blue-600" />
            <span className="text-gray-700 font-medium">Hojas de Ruta Detalladas</span>
          </div>
          <div className="flex items-center justify-center gap-3 p-4 bg-white/40 backdrop-blur-sm rounded-lg border border-indigo-100">
            <Sparkles className="h-6 w-6 text-indigo-600" />
            <span className="text-gray-700 font-medium">Base de Datos Actualizada</span>
          </div>
        </div>
      </div>

      {/* Background decorations */}
      <div className="absolute top-1/2 left-1/4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
    </section>
  );
};

export default Hero;
