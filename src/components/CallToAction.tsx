import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, CheckCircle, Star } from "lucide-react";
const CallToAction = () => {
  return <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700">
      <div className="max-w-4xl mx-auto text-center">
        {/* Badge */}
        <Badge variant="secondary" className="mb-6 px-4 py-2 bg-white/20 text-white border-white/30">
          <Star className="w-4 h-4 mr-2" />
          Evaluación Gratuita
        </Badge>

        {/* Main CTA */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
          ¿Listo para encontrar las{" "}
          <span className="text-yellow-300">
            herramientas perfectas
          </span>{" "}
          para tu negocio?
        </h2>

        <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
          Comienza tu evaluación gratuita ahora y recibe recomendaciones personalizadas 
          en menos de 10 minutos.
        </p>

        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {["Evaluación 100% gratuita", "Recomendaciones personalizadas", "Hoja de ruta detallada"].map((benefit, index) => <div key={index} className="flex items-center justify-center text-blue-100">
              <CheckCircle className="h-5 w-5 mr-2 text-green-300" />
              <span className="font-medium">{benefit}</span>
            </div>)}
        </div>

        {/* CTA Button */}
        <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-200 transform hover:scale-105" asChild>
          <a href="/questionnaire" className="mx-0 my-0 px-[20px]">
            Comenzar Evaluación Gratuita
            <ArrowRight className="ml-2 h-5 w-5" />
          </a>
        </Button>

        <p className="text-blue-200 text-sm mt-4">
          Sin registro requerido • Resultados instantáneos • Completamente gratis
        </p>
      </div>

      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white rounded-full mix-blend-overlay filter blur-xl opacity-10"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-300 rounded-full mix-blend-overlay filter blur-xl opacity-10"></div>
      </div>
    </section>;
};
export default CallToAction;