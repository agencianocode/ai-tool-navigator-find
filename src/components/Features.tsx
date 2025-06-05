
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Target, 
  MapPin, 
  BarChart3, 
  Users, 
  Shield,
  Clock,
  Star,
  CheckCircle
} from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Search,
      title: "Análisis Inteligente",
      description: "Nuestro algoritmo analiza tus respuestas para identificar las herramientas IA más adecuadas para tu proyecto específico.",
      color: "text-purple-600 bg-purple-100"
    },
    {
      icon: Target,
      title: "Recomendaciones Precisas",
      description: "Obtén sugerencias personalizadas basadas en tu industria, presupuesto, nivel técnico y objetivos comerciales.",
      color: "text-blue-600 bg-blue-100"
    },
    {
      icon: MapPin,
      title: "Hoja de Ruta Detallada",
      description: "Recibe un plan paso a paso para implementar las herramientas IA en tu flujo de trabajo con cronogramas realistas.",
      color: "text-indigo-600 bg-indigo-100"
    },
    {
      icon: BarChart3,
      title: "Métricas de ROI",
      description: "Comprende el retorno de inversión potencial y los beneficios esperados de cada herramienta recomendada.",
      color: "text-green-600 bg-green-100"
    },
    {
      icon: Users,
      title: "Casos de Uso Reales",
      description: "Explora ejemplos prácticos y casos de éxito de empresas similares que ya implementaron estas soluciones.",
      color: "text-orange-600 bg-orange-100"
    },
    {
      icon: Shield,
      title: "Evaluación de Seguridad",
      description: "Información detallada sobre privacidad, seguridad y cumplimiento normativo de cada herramienta.",
      color: "text-red-600 bg-red-100"
    }
  ];

  const steps = [
    {
      number: "01",
      title: "Completa el Cuestionario",
      description: "Responde preguntas sobre tu negocio, objetivos y recursos disponibles."
    },
    {
      number: "02", 
      title: "Análisis Personalizado",
      description: "Nuestro sistema analiza tus respuestas y compara con nuestra base de datos."
    },
    {
      number: "03",
      title: "Recibe tu Hoja de Ruta",
      description: "Obtén recomendaciones específicas con plan de implementación detallado."
    },
    {
      number: "04",
      title: "Implementa y Optimiza",
      description: "Sigue el plan paso a paso y ajusta según los resultados obtenidos."
    }
  ];

  return (
    <section id="caracteristicas" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 px-4 py-2">
            Características Principales
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Todo lo que necesitas para encontrar las{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
              herramientas perfectas
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Nuestro sistema combina tecnología avanzada con experiencia humana para ofrecerte 
            las recomendaciones más precisas del mercado.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <div className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center mb-4`}>
                  <feature.icon className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* How it Works */}
        <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8 lg:p-12">
          <div className="text-center mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              ¿Cómo Funciona?
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Nuestro proceso simple y efectivo te guía desde la evaluación inicial 
              hasta la implementación exitosa.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-4">
                    {step.number}
                  </div>
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-purple-200 to-blue-200"></div>
                  )}
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  {step.title}
                </h4>
                <p className="text-gray-600 text-sm">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-16">
          {[
            { number: "500+", label: "Herramientas IA" },
            { number: "50+", label: "Categorías" },
            { number: "95%", label: "Precisión" },
            { number: "24/7", label: "Actualizaciones" }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
