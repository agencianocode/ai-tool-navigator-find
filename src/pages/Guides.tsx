
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Clock, User, ChevronRight } from "lucide-react";

const Guides = () => {
  const guides = [
    {
      id: 1,
      title: "Guía Completa para Principiantes en IA",
      description: "Aprende los conceptos básicos de la inteligencia artificial y cómo empezar a usarla en tus proyectos.",
      category: "Principiantes",
      readTime: "15 min",
      author: "Equipo AI Tools",
      difficulty: "Básico"
    },
    {
      id: 2,
      title: "Cómo Elegir la Herramienta IA Correcta",
      description: "Una guía paso a paso para evaluar y seleccionar las mejores herramientas según tus necesidades.",
      category: "Evaluación",
      readTime: "10 min",
      author: "Equipo AI Tools",
      difficulty: "Intermedio"
    },
    {
      id: 3,
      title: "Optimización de Prompts para ChatGPT",
      description: "Técnicas avanzadas para escribir prompts efectivos y obtener mejores resultados.",
      category: "Técnicas",
      readTime: "20 min",
      author: "Equipo AI Tools",
      difficulty: "Avanzado"
    },
    {
      id: 4,
      title: "Integración de IA en Flujos de Trabajo",
      description: "Cómo incorporar herramientas de IA en tus procesos empresariales existentes.",
      category: "Integración",
      readTime: "25 min",
      author: "Equipo AI Tools",
      difficulty: "Intermedio"
    },
    {
      id: 5,
      title: "Herramientas de IA para Creativos",
      description: "Descubre las mejores herramientas para diseñadores, escritores y creadores de contenido.",
      category: "Creatividad",
      readTime: "12 min",
      author: "Equipo AI Tools",
      difficulty: "Básico"
    },
    {
      id: 6,
      title: "Análisis de Datos con IA",
      description: "Cómo usar herramientas de IA para análisis de datos y generación de insights.",
      category: "Análisis",
      readTime: "30 min",
      author: "Equipo AI Tools",
      difficulty: "Avanzado"
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Básico": return "bg-green-100 text-green-800";
      case "Intermedio": return "bg-yellow-100 text-yellow-800";
      case "Avanzado": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Guías y Tutoriales
          </h1>
          <p className="text-gray-600">
            Aprende a usar herramientas de IA de manera efectiva con nuestras guías paso a paso
          </p>
        </div>

        {/* Featured Guide */}
        <Card className="mb-8 bg-gradient-to-r from-purple-500 to-blue-600 text-white">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="h-5 w-5" />
              <Badge className="bg-white/20 text-white">Destacado</Badge>
            </div>
            <h2 className="text-2xl font-bold mb-2">
              Masterclass: De Principiante a Experto en IA
            </h2>
            <p className="mb-4 opacity-90">
              Un curso completo que te llevará desde los conceptos básicos hasta técnicas avanzadas de IA
            </p>
            <div className="flex items-center gap-4 text-sm opacity-75 mb-4">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>2 horas</span>
              </div>
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" />
                <span>Equipo AI Tools</span>
              </div>
            </div>
            <Button className="bg-white text-purple-600 hover:bg-gray-100">
              Comenzar Masterclass
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        {/* Guides Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {guides.map((guide) => (
            <Card key={guide.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <Badge variant="outline" className="mb-2">
                      {guide.category}
                    </Badge>
                    <CardTitle className="text-lg leading-tight">
                      {guide.title}
                    </CardTitle>
                  </div>
                  <Badge className={getDifficultyColor(guide.difficulty)}>
                    {guide.difficulty}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {guide.description}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{guide.readTime}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    <span>{guide.author}</span>
                  </div>
                </div>

                <Button className="w-full" variant="outline">
                  Leer Guía
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <Card className="mt-12">
          <CardContent className="pt-6 text-center">
            <BookOpen className="h-12 w-12 mx-auto mb-4 text-purple-600" />
            <h3 className="text-xl font-semibold mb-2">
              ¿No encuentras lo que buscas?
            </h3>
            <p className="text-gray-600 mb-4">
              Sugiere un tema para una nueva guía y nuestro equipo la creará
            </p>
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600">
              Sugerir Tema
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Guides;
