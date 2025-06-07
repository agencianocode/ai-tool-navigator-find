
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IntelligentChatbot } from "@/components/ai/IntelligentChatbot";
import { DocumentationAnalyzer } from "@/components/ai/DocumentationAnalyzer";
import { InteractiveDemo } from "@/components/ar-vr/InteractiveDemo";
import { SEO } from "@/components/SEO";
import { 
  Brain, 
  Sparkles, 
  Eye, 
  Zap, 
  Rocket,
  Cpu,
  Globe,
  HeadphonesIcon
} from "lucide-react";

const EmergingTech = () => {
  const [selectedDemo, setSelectedDemo] = useState<{
    toolName: string;
    demoType: 'interface-tour' | 'architecture-3d' | 'workflow-demo';
  }>({
    toolName: 'Figma',
    demoType: 'interface-tour'
  });

  const aiFeatures = [
    {
      icon: Brain,
      title: "Chatbot Inteligente",
      description: "Asistente IA que responde sobre cualquier herramienta",
      capabilities: ["Recomendaciones personalizadas", "Análisis comparativo", "Generación de roadmaps"]
    },
    {
      icon: Sparkles,
      title: "Análisis Automático",
      description: "IA que analiza documentación y extrae insights",
      capabilities: ["Extracción de características", "Evaluación de complejidad", "Sugerencias de uso"]
    },
    {
      icon: Zap,
      title: "Generación de Roadmaps",
      description: "Creación automática de planes de implementación",
      capabilities: ["Análisis de necesidades", "Planificación temporal", "Optimización de recursos"]
    }
  ];

  const vrArFeatures = [
    {
      icon: Eye,
      title: "Demos Interactivos",
      description: "Experiencias inmersivas de herramientas",
      capabilities: ["Tours guiados", "Interacción en tiempo real", "Múltiples ángulos de vista"]
    },
    {
      icon: Globe,
      title: "Tours Virtuales",
      description: "Navegación 3D por interfaces de herramientas",
      capabilities: ["Exploración libre", "Puntos de interés", "Información contextual"]
    },
    {
      icon: Cpu,
      title: "Visualización 3D",
      description: "Arquitecturas de soluciones en 3D",
      capabilities: ["Modelos interactivos", "Animaciones de flujo", "Perspectivas múltiples"]
    }
  ];

  const demoOptions = [
    { toolName: 'Figma', demoType: 'interface-tour' as const, description: 'Tour por la interface de diseño' },
    { toolName: 'Notion', demoType: 'workflow-demo' as const, description: 'Demo de flujo de trabajo' },
    { toolName: 'OpenAI API', demoType: 'architecture-3d' as const, description: 'Arquitectura del sistema' },
    { toolName: 'Zapier', demoType: 'workflow-demo' as const, description: 'Automatización paso a paso' }
  ];

  return (
    <>
      <SEO
        title="Tecnologías Emergentes - AI Tool Navigator"
        description="Explora las últimas tecnologías: IA generativa integrada, realidad aumentada, demos interactivos y análisis automático de herramientas."
        url="https://ai-tool-navigator.com/emerging-tech"
      />
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Rocket className="w-8 h-8 text-purple-600" />
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Tecnologías Emergentes
              </h1>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experimenta el futuro de la selección de herramientas con IA generativa, 
              realidad aumentada y demos interactivos
            </p>
          </div>

          <Tabs defaultValue="ai-generativa" className="space-y-8">
            <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
              <TabsTrigger value="ai-generativa" className="flex items-center gap-2">
                <Brain className="w-4 h-4" />
                IA Generativa
              </TabsTrigger>
              <TabsTrigger value="ar-vr" className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                AR/VR
              </TabsTrigger>
            </TabsList>

            {/* IA Generativa Tab */}
            <TabsContent value="ai-generativa" className="space-y-8">
              {/* Features Overview */}
              <div className="grid md:grid-cols-3 gap-6">
                {aiFeatures.map((feature, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <feature.icon className="w-6 h-6 text-purple-600" />
                        {feature.title}
                      </CardTitle>
                      <p className="text-gray-600">{feature.description}</p>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {feature.capabilities.map((capability, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm">
                            <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                            {capability}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Documentation Analyzer */}
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl font-bold mb-2">Analizador de Documentación IA</h2>
                  <p className="text-gray-600">
                    Analiza automáticamente cualquier documentación de herramienta para obtener insights profundos
                  </p>
                </div>
                <DocumentationAnalyzer />
              </div>

              {/* Live AI Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="w-6 h-6 text-yellow-500" />
                    Estadísticas de IA en Tiempo Real
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-blue-600">1,247</div>
                      <div className="text-sm text-gray-600">Consultas IA Hoy</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-600">98.7%</div>
                      <div className="text-sm text-gray-600">Precisión</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-purple-600">342</div>
                      <div className="text-sm text-gray-600">Roadmaps Generados</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-orange-600">1.2s</div>
                      <div className="text-sm text-gray-600">Tiempo Promedio</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* AR/VR Tab */}
            <TabsContent value="ar-vr" className="space-y-8">
              {/* Features Overview */}
              <div className="grid md:grid-cols-3 gap-6">
                {vrArFeatures.map((feature, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <feature.icon className="w-6 h-6 text-blue-600" />
                        {feature.title}
                      </CardTitle>
                      <p className="text-gray-600">{feature.description}</p>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {feature.capabilities.map((capability, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm">
                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                            {capability}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Demo Selection */}
              <div className="space-y-4">
                <div className="text-center">
                  <h2 className="text-2xl font-bold mb-2">Demos Interactivos</h2>
                  <p className="text-gray-600">
                    Selecciona una herramienta para experimentar su demo interactivo
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-2 justify-center">
                  {demoOptions.map((option, index) => (
                    <Button
                      key={index}
                      variant={
                        selectedDemo.toolName === option.toolName && 
                        selectedDemo.demoType === option.demoType 
                          ? "default" : "outline"
                      }
                      onClick={() => setSelectedDemo(option)}
                      className="flex flex-col h-auto p-3"
                    >
                      <div className="font-semibold">{option.toolName}</div>
                      <div className="text-xs opacity-75">{option.description}</div>
                    </Button>
                  ))}
                </div>
              </div>

              {/* Interactive Demo */}
              <InteractiveDemo
                toolName={selectedDemo.toolName}
                demoType={selectedDemo.demoType}
              />

              {/* VR/AR Requirements */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <HeadphonesIcon className="w-6 h-6 text-purple-600" />
                    Requisitos para Experiencia Completa
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <Badge className="mb-2">Recomendado</Badge>
                      <h4 className="font-semibold">VR Headset</h4>
                      <p className="text-sm text-gray-600">Oculus Quest, HTC Vive</p>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <Badge variant="secondary" className="mb-2">Mínimo</Badge>
                      <h4 className="font-semibold">Smartphone</h4>
                      <p className="text-sm text-gray-600">iOS/Android con giroscopio</p>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <Badge variant="outline" className="mb-2">Opcional</Badge>
                      <h4 className="font-semibold">Controladores</h4>
                      <p className="text-sm text-gray-600">Para interacción mejorada</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Floating Chatbot */}
        <IntelligentChatbot />
      </div>
    </>
  );
};

export default EmergingTech;
