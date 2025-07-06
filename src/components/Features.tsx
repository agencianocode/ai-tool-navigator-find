
import { CheckCircle, ArrowRight, Star, Users, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Features = () => {
  const features = [
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Recomendaciones Inteligentes",
      description: "IA avanzada analiza tus respuestas para sugerir las herramientas perfectas"
    },
    {
      icon: <CheckCircle className="h-6 w-6" />,
      title: "Hojas de Ruta Personalizadas",
      description: "Obtén un plan paso a paso adaptado a tu proyecto y nivel de experiencia"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Base de Datos Actualizada",
      description: "Acceso a más de 500 herramientas de IA actualizadas constantemente"
    }
  ];

  const benefits = [
    "Ahorra horas de investigación",
    "Evita herramientas incorrectas para tu proyecto",
    "Obtén recomendaciones basadas en tu presupuesto",
    "Acceso a reviews y calificaciones reales",
    "Planes paso a paso fáciles de seguir"
  ];

  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Features principales */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            ¿Por qué elegir AI Tool Navigator?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            La forma más rápida y precisa de encontrar las herramientas de IA perfectas para tu proyecto
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="text-center p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition-all duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-purple-100 to-blue-100 mb-6">
                <div className="text-purple-600">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Benefits section */}
        <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-3xl p-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                Lo que obtienes con cada hoja de ruta
              </h3>
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-lg">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="text-center">
              <div className="bg-white rounded-2xl p-8 shadow-lg mb-6">
                <div className="flex items-center justify-center mb-4">
                  <Star className="h-6 w-6 text-yellow-400 fill-current" />
                  <Star className="h-6 w-6 text-yellow-400 fill-current" />
                  <Star className="h-6 w-6 text-yellow-400 fill-current" />
                  <Star className="h-6 w-6 text-yellow-400 fill-current" />
                  <Star className="h-6 w-6 text-yellow-400 fill-current" />
                </div>
                <p className="text-gray-600 italic mb-4">
                  "Increíble herramienta. Me ahorró semanas de investigación y encontré 
                  exactamente lo que necesitaba para mi startup."
                </p>
                <p className="font-semibold text-gray-900">- María García, Founder</p>
              </div>
              
              <Button asChild size="lg" className="text-lg px-8 py-6 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                <Link to="/questionnaire">
                  Empezar Ahora - Es Gratis
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
