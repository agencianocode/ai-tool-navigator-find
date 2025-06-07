
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  MessageSquare, 
  Users, 
  Calendar, 
  BookOpen, 
  Play, 
  Award,
  TrendingUp,
  Clock
} from "lucide-react";

export const CommunityHub = () => {
  const [activeTab, setActiveTab] = useState("forum");

  // Mock data - replace with real data from your backend
  const forumCategories = [
    {
      id: 1,
      name: "IA Generativa",
      description: "Discusiones sobre ChatGPT, Claude, y otras IAs",
      posts: 1247,
      lastActivity: "hace 2 minutos",
      trending: true
    },
    {
      id: 2,
      name: "No-Code/Low-Code",
      description: "Herramientas sin programación",
      posts: 856,
      lastActivity: "hace 15 minutos"
    },
    {
      id: 3,
      name: "Automatización",
      description: "Zapier, Make, y workflows",
      posts: 634,
      lastActivity: "hace 1 hora"
    },
    {
      id: 4,
      name: "Casos de Uso",
      description: "Comparte tus implementaciones exitosas",
      posts: 923,
      lastActivity: "hace 30 minutos"
    }
  ];

  const mentors = [
    {
      id: 1,
      name: "Ana García",
      expertise: ["IA Generativa", "Automatización"],
      rating: 4.9,
      sessions: 127,
      available: true
    },
    {
      id: 2,
      name: "Carlos Ruiz",
      expertise: ["No-Code", "E-commerce"],
      rating: 4.8,
      sessions: 93,
      available: false
    },
    {
      id: 3,
      name: "María López",
      expertise: ["Marketing Digital", "Analytics"],
      rating: 4.9,
      sessions: 156,
      available: true
    }
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: "Webinar: IA en Marketing Digital",
      date: "2024-01-15",
      time: "19:00",
      attendees: 234,
      speaker: "Ana García"
    },
    {
      id: 2,
      title: "Workshop: Automatización con Zapier",
      date: "2024-01-18",
      time: "18:30",
      attendees: 156,
      speaker: "Carlos Ruiz"
    },
    {
      id: 3,
      title: "Mesa Redonda: Futuro del No-Code",
      date: "2024-01-22",
      time: "20:00",
      attendees: 89,
      speaker: "Panel de Expertos"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Centro de Comunidad</h1>
        <p className="text-gray-600">
          Conecta, aprende y comparte con otros profesionales de IA y tecnología
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="forum" className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            Foro
          </TabsTrigger>
          <TabsTrigger value="mentors" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Mentores
          </TabsTrigger>
          <TabsTrigger value="events" className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Eventos
          </TabsTrigger>
        </TabsList>

        <TabsContent value="forum" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Categorías del Foro</h2>
            <Button>Crear Nueva Discusión</Button>
          </div>
          
          <div className="grid gap-4">
            {forumCategories.map((category) => (
              <Card key={category.id} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold">{category.name}</h3>
                        {category.trending && (
                          <Badge variant="outline" className="text-orange-600 border-orange-300">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            Trending
                          </Badge>
                        )}
                      </div>
                      <p className="text-gray-600 text-sm mb-2">{category.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>{category.posts} publicaciones</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {category.lastActivity}
                        </span>
                      </div>
                    </div>
                    <MessageSquare className="w-8 h-8 text-gray-400" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="mentors" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Mentores Expertos</h2>
            <Button variant="outline">Convertirse en Mentor</Button>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mentors.map((mentor) => (
              <Card key={mentor.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{mentor.name}</CardTitle>
                    <div className={`w-3 h-3 rounded-full ${mentor.available ? 'bg-green-500' : 'bg-gray-400'}`} />
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-1">
                    {mentor.expertise.map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1">
                      <Award className="w-4 h-4 text-yellow-500" />
                      <span>{mentor.rating}/5</span>
                    </div>
                    <span>{mentor.sessions} sesiones</span>
                  </div>
                  
                  <Button 
                    className="w-full" 
                    disabled={!mentor.available}
                    variant={mentor.available ? "default" : "outline"}
                  >
                    {mentor.available ? "Reservar Sesión" : "No Disponible"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="events" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Próximos Eventos</h2>
            <Button variant="outline">Proponer Evento</Button>
          </div>
          
          <div className="space-y-4">
            {upcomingEvents.map((event) => (
              <Card key={event.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold mb-2">{event.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {event.date} a las {event.time}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {event.attendees} asistentes
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">Presentado por: {event.speaker}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">Ver Detalles</Button>
                      <Button size="sm">Registrarse</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
