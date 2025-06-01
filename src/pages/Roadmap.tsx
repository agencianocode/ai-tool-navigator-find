
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, RefreshCw, Loader2, Clock, CheckCircle, AlertTriangle } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";
import { generateRoadmap } from "@/utils/roadmapGenerator";
import { useToast } from "@/hooks/use-toast";

interface RoadmapPhase {
  id: number;
  title: string;
  duration: string;
  status: 'upcoming' | 'current' | 'completed';
  tasks: string[];
  tools: string[];
  insights: string;
  challenges: string[];
  resources: string[];
}

const Roadmap = () => {
  const location = useLocation();
  const { toast } = useToast();
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [selectedTools, setSelectedTools] = useState<any[]>([]);
  const [roadmap, setRoadmap] = useState<RoadmapPhase[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [expandedPhases, setExpandedPhases] = useState<number[]>([1]);

  useEffect(() => {
    // Get data from location state or localStorage
    const answersFromState = location.state?.answers;
    const toolsFromState = location.state?.selectedTools;
    const answersFromStorage = localStorage.getItem('questionnaireAnswers');
    const toolsFromStorage = localStorage.getItem('selectedTools');
    
    if (answersFromState) {
      setAnswers(answersFromState);
    } else if (answersFromStorage) {
      setAnswers(JSON.parse(answersFromStorage));
    }

    if (toolsFromState) {
      setSelectedTools(toolsFromState);
    } else if (toolsFromStorage) {
      setSelectedTools(JSON.parse(toolsFromStorage));
    }
  }, [location]);

  useEffect(() => {
    if (Object.keys(answers).length > 0 && selectedTools.length > 0) {
      generateInitialRoadmap();
    }
  }, [answers, selectedTools]);

  const generateInitialRoadmap = async () => {
    setIsGenerating(true);
    try {
      const generatedRoadmap = await generateRoadmap(answers, selectedTools);
      setRoadmap(generatedRoadmap);
    } catch (error) {
      console.error('Error generando hoja de ruta:', error);
      toast({
        title: "Error",
        description: "Error al generar la hoja de ruta. Por favor intenta de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRegenerateRoadmap = async () => {
    setIsGenerating(true);
    try {
      const generatedRoadmap = await generateRoadmap(answers, selectedTools, true);
      setRoadmap(generatedRoadmap);
      toast({
        title: "Éxito",
        description: "¡Hoja de ruta alternativa generada exitosamente!",
      });
    } catch (error) {
      console.error('Error regenerando hoja de ruta:', error);
      toast({
        title: "Error",
        description: "Error al generar hoja de ruta alternativa. Por favor intenta de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const togglePhase = (phaseId: number) => {
    setExpandedPhases(prev => 
      prev.includes(phaseId) 
        ? prev.filter(id => id !== phaseId)
        : [...prev, phaseId]
    );
  };

  const getPhaseIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-6 w-6 text-green-500" />;
      case 'current':
        return <Clock className="h-6 w-6 text-blue-500" />;
      default:
        return <div className="h-6 w-6 rounded-full border-2 border-gray-300" />;
    }
  };

  const getPhaseColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'border-green-500 bg-green-50';
      case 'current':
        return 'border-blue-500 bg-blue-50';
      default:
        return 'border-gray-300 bg-gray-50';
    }
  };

  if (isGenerating && roadmap.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <Card className="w-full max-w-md">
              <CardContent className="pt-6">
                <div className="text-center">
                  <Loader2 className="h-16 w-16 text-purple-600 mx-auto mb-4 animate-spin" />
                  <h2 className="text-xl font-bold text-gray-900 mb-2">
                    Generando Tu Hoja de Ruta Personalizada
                  </h2>
                  <p className="text-gray-600">
                    Nuestra IA está analizando tus respuestas y creando un plan de implementación personalizado...
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link to="/results">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver a Resultados
            </Button>
          </Link>
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Tu Hoja de Ruta Personalizada de Implementación IA
              </h1>
              <p className="text-gray-600">
                Un plan paso a paso de 12 semanas adaptado a tu proyecto y herramientas seleccionadas
              </p>
            </div>
            <div className="flex gap-2">
              <Button 
                onClick={handleRegenerateRoadmap}
                disabled={isGenerating}
                variant="outline"
              >
                {isGenerating ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <RefreshCw className="mr-2 h-4 w-4" />
                )}
                Generar Plan Alternativo
              </Button>
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600">
                <Download className="mr-2 h-4 w-4" />
                Exportar Hoja de Ruta
              </Button>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="space-y-6">
          {roadmap.map((phase, index) => (
            <div key={phase.id} className="relative">
              {/* Timeline Line */}
              {index !== roadmap.length - 1 && (
                <div className="absolute left-6 top-16 w-0.5 h-full bg-gray-300 z-0"></div>
              )}
              
              <Card className={`relative z-10 ${getPhaseColor(phase.status)} border-l-4`}>
                <Collapsible 
                  open={expandedPhases.includes(phase.id)} 
                  onOpenChange={() => togglePhase(phase.id)}
                >
                  <CollapsibleTrigger asChild>
                    <CardHeader className="cursor-pointer hover:bg-white/50 transition-colors">
                      <div className="flex items-center gap-4">
                        {getPhaseIcon(phase.status)}
                        <div className="flex-1">
                          <CardTitle className="flex items-center justify-between">
                            <span>{phase.title}</span>
                            <Badge variant="outline">{phase.duration}</Badge>
                          </CardTitle>
                          <p className="text-sm text-gray-600 mt-1">
                            Haz clic para expandir detalles y ver insights generados por IA
                          </p>
                        </div>
                      </div>
                    </CardHeader>
                  </CollapsibleTrigger>
                  
                  <CollapsibleContent>
                    <CardContent className="pt-0">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Tasks */}
                        <div>
                          <h4 className="text-sm font-semibold text-gray-900 mb-3">Tareas Clave</h4>
                          <ul className="space-y-2">
                            {phase.tasks.map((task, idx) => (
                              <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                                <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                                {task}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Tools */}
                        <div>
                          <h4 className="text-sm font-semibold text-gray-900 mb-3">Herramientas a Implementar</h4>
                          <div className="flex flex-wrap gap-2">
                            {phase.tools.map((tool, idx) => (
                              <Badge key={idx} variant="secondary">{tool}</Badge>
                            ))}
                          </div>
                        </div>

                        {/* AI Insights */}
                        <div className="lg:col-span-2">
                          <h4 className="text-sm font-semibold text-gray-900 mb-3">Insights Generados por IA</h4>
                          <p className="text-sm text-gray-700 bg-white/70 p-3 rounded-lg border">
                            {phase.insights}
                          </p>
                        </div>

                        {/* Challenges */}
                        <div>
                          <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                            <AlertTriangle className="h-4 w-4 text-yellow-500" />
                            Desafíos Potenciales
                          </h4>
                          <ul className="space-y-1">
                            {phase.challenges.map((challenge, idx) => (
                              <li key={idx} className="text-sm text-gray-700">• {challenge}</li>
                            ))}
                          </ul>
                        </div>

                        {/* Resources */}
                        <div>
                          <h4 className="text-sm font-semibold text-gray-900 mb-3">Recursos Recomendados</h4>
                          <ul className="space-y-1">
                            {phase.resources.map((resource, idx) => (
                              <li key={idx} className="text-sm text-blue-600 hover:underline cursor-pointer">
                                • {resource}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </CollapsibleContent>
                </Collapsible>
              </Card>
            </div>
          ))}
        </div>

        {/* Footer Actions */}
        <Card className="mt-8">
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">¿Listo para comenzar?</h3>
              <p className="text-gray-600 mb-4">
                Esta hoja de ruta está personalizada basada en tus respuestas. Ajústala según sea necesario para tus requerimientos específicos.
              </p>
              <div className="flex justify-center gap-4">
                <Link to="/results">
                  <Button variant="outline">Ver Detalles de Herramientas</Button>
                </Link>
                <Link to="/questionnaire">
                  <Button variant="outline">Repetir Evaluación</Button>
                </Link>
                <Link to="/">
                  <Button variant="ghost">Volver al Inicio</Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Roadmap;
