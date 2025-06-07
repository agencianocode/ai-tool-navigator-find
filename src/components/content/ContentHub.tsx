
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  BookOpen, 
  Play, 
  Users, 
  Clock, 
  Star, 
  Search,
  Filter,
  TrendingUp,
  BarChart3
} from "lucide-react";

export const ContentHub = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Mock data
  const tutorials = [
    {
      id: 1,
      title: "Automatización de Email Marketing con ChatGPT",
      description: "Aprende a crear campañas automáticas personalizadas",
      duration: "45 min",
      difficulty: "Intermedio",
      views: 2547,
      rating: 4.8,
      category: "IA Generativa",
      type: "tutorial",
      thumbnail: "automation-email"
    },
    {
      id: 2,
      title: "ROI de 300% con Herramientas No-Code",
      description: "Caso de estudio: startup que creció sin programar",
      duration: "32 min",
      difficulty: "Principiante",
      views: 1823,
      rating: 4.9,
      category: "Casos de Uso",
      type: "case-study",
      metrics: { roi: "300%", timeToMarket: "3 semanas", teamSize: 2 }
    },
    {
      id: 3,
      title: "Zapier vs Make vs n8n: Comparación Completa",
      description: "Análisis detallado con métricas reales de rendimiento",
      duration: "28 min",
      difficulty: "Avanzado",
      views: 3421,
      rating: 4.7,
      category: "Comparaciones",
      type: "comparison"
    }
  ];

  const webinars = [
    {
      id: 1,
      title: "IA en el Futuro del Trabajo Remoto",
      speaker: "Dr. Elena Martínez",
      expertise: "Investigadora en IA",
      date: "2024-01-20",
      time: "19:00",
      registrations: 847,
      description: "Explora cómo la IA transformará el trabajo remoto en los próximos 5 años"
    },
    {
      id: 2,
      title: "De Zero a Hero: Construir SaaS sin Código",
      speaker: "Miguel Ángel Torres",
      expertise: "Fundador NoCode Masters",
      date: "2024-01-25",
      time: "18:30",
      registrations: 623,
      description: "Caso real: cómo construir un SaaS rentable usando solo herramientas no-code"
    }
  ];

  const categories = ["Todos", "IA Generativa", "No-Code", "Automatización", "Casos de Uso", "Comparaciones"];

  const filteredContent = tutorials.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || selectedCategory === "Todos" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Centro de Contenido</h1>
        <p className="text-gray-600">
          Tutoriales, casos de uso y recursos para dominar las herramientas de IA
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Buscar tutoriales, casos de uso..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex gap-2 flex-wrap">
          {categories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category === "Todos" ? null : category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Featured Webinars */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
          <Users className="w-6 h-6" />
          Próximos Webinars
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {webinars.map((webinar) => (
            <Card key={webinar.id} className="border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50">
              <CardHeader>
                <CardTitle className="text-lg">{webinar.title}</CardTitle>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span>{webinar.speaker}</span>
                  <Badge variant="secondary">{webinar.expertise}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-700">{webinar.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm">
                    <span>{webinar.date} - {webinar.time}</span>
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {webinar.registrations}
                    </span>
                  </div>
                  <Button size="sm">Registrarse Gratis</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Content Grid */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
          <BookOpen className="w-6 h-6" />
          Contenido Destacado
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredContent.map((item) => (
            <Card key={item.id} className="hover:shadow-lg transition-shadow">
              <div className="relative">
                <div className="h-48 bg-gradient-to-br from-blue-100 to-purple-100 rounded-t-lg flex items-center justify-center">
                  <Play className="w-12 h-12 text-white bg-black bg-opacity-50 rounded-full p-3" />
                </div>
                <Badge 
                  variant="secondary" 
                  className="absolute top-2 right-2 bg-white"
                >
                  {item.type === 'tutorial' ? 'Tutorial' : 
                   item.type === 'case-study' ? 'Caso de Uso' : 'Comparación'}
                </Badge>
              </div>
              
              <CardHeader>
                <CardTitle className="text-lg line-clamp-2">{item.title}</CardTitle>
                <Badge variant="outline" className="w-fit">
                  {item.category}
                </Badge>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
                
                {/* Metrics for case studies */}
                {item.type === 'case-study' && 'metrics' in item && (
                  <div className="grid grid-cols-2 gap-2 p-3 bg-green-50 rounded-lg">
                    <div className="text-center">
                      <div className="font-bold text-green-600">{item.metrics.roi}</div>
                      <div className="text-xs text-gray-600">ROI</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-blue-600">{item.metrics.timeToMarket}</div>
                      <div className="text-xs text-gray-600">Time to Market</div>
                    </div>
                  </div>
                )}
                
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {item.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500" />
                      {item.rating}
                    </span>
                  </div>
                  <span className="text-gray-500">{item.views} views</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <Badge 
                    variant={item.difficulty === 'Principiante' ? 'outline' : 
                            item.difficulty === 'Intermedio' ? 'secondary' : 'default'}
                  >
                    {item.difficulty}
                  </Badge>
                  <Button size="sm">Ver Contenido</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Stats */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600">240+</div>
              <div className="text-sm text-gray-600">Tutoriales</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">89k</div>
              <div className="text-sm text-gray-600">Estudiantes</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">156</div>
              <div className="text-sm text-gray-600">Casos de Uso</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-600">4.8/5</div>
              <div className="text-sm text-gray-600">Rating Promedio</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
