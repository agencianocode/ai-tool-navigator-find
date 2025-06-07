
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, RefreshCw, Loader2, Clock, CheckCircle, AlertTriangle } from "lucide-react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";
import { generateRoadmap } from "@/utils/roadmapGenerator";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

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

interface RoadmapData {
  id: string;
  title: string;
  description?: string;
  project_type?: string;
  skill_level?: string;
  budget_range?: string;
  timeline?: string;
  roadmap_data: RoadmapPhase[];
  selected_tools: any[];
  questionnaire_answers: any;
  custom_name?: string;
  status: string;
  created_at: string;
  updated_at: string;
}

const Roadmap = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const { user } = useAuth();
  
  const [roadmapData, setRoadmapData] = useState<RoadmapData | null>(null);
  const [roadmap, setRoadmap] = useState<RoadmapPhase[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedPhases, setExpandedPhases] = useState<number[]>([1]);

  useEffect(() => {
    const loadRoadmap = async () => {
      // Primero intentar obtener desde URL params
      const roadmapId = searchParams.get('id') || location.state?.roadmapId;
      
      if (roadmapId && user) {
        console.log('Loading roadmap with ID:', roadmapId);
        try {
          const { data, error } = await supabase
            .from('roadmaps')
            .select('*')
            .eq('id', roadmapId)
            .eq('user_id', user.id)
            .single();

          if (error) {
            console.error('Error loading roadmap:', error);
            toast({
              title: "Error",
              description: "No se pudo cargar la hoja de ruta",
              variant: "destructive",
            });
          } else if (data) {
            console.log('Roadmap loaded:', data);
            
            // Convertir los datos de Supabase al formato local
            const convertedRoadmapData: RoadmapData = {
              id: data.id,
              title: data.title,
              description: data.description || undefined,
              project_type: data.project_type || undefined,
              skill_level: data.skill_level || undefined,
              budget_range: data.budget_range || undefined,
              timeline: data.timeline || undefined,
              roadmap_data: Array.isArray(data.roadmap_data) ? data.roadmap_data as RoadmapPhase[] : [],
              selected_tools: Array.isArray(data.selected_tools) ? data.selected_tools : [],
              questionnaire_answers: data.questionnaire_answers || {},
              custom_name: data.custom_name || undefined,
              status: data.status || 'active',
              created_at: data.created_at || '',
              updated_at: data.updated_at || ''
            };
            
            setRoadmapData(convertedRoadmapData);
            setRoadmap(convertedRoadmapData.roadmap_data);
          }
        } catch (error) {
          console.error('Error loading roadmap:', error);
        }
      } else {
        // Fallback a datos del localStorage
        const answersFromStorage = localStorage.getItem('questionnaireAnswers');
        const toolsFromStorage = localStorage.getItem('selectedTools');
        
        if (answersFromStorage && toolsFromStorage) {
          const answers = JSON.parse(answersFromStorage);
          const selectedTools = JSON.parse(toolsFromStorage);
          await generateInitialRoadmap(answers, selectedTools);
        }
      }
      
      setIsLoading(false);
    };

    loadRoadmap();
  }, [searchParams, location.state, user]);

  const generateInitialRoadmap = async (answers: any, selectedTools: any[]) => {
    setIsGenerating(true);
    try {
      const generatedRoadmap = await generateRoadmap(answers, selectedTools, false, 'openai');
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
    if (!roadmapData) return;
    
    setIsGenerating(true);
    try {
      const generatedRoadmap = await generateRoadmap(
        roadmapData.questionnaire_answers, 
        roadmapData.selected_tools, 
        true, 
        'openai'
      );
      
      // Actualizar en la base de datos
      const { error } = await supabase
        .from('roadmaps')
        .update({ 
          roadmap_data: generatedRoadmap as any,
          updated_at: new Date().toISOString()
        })
        .eq('id', roadmapData.id)
        .eq('user_id', user?.id);

      if (error) {
        throw error;
      }

      setRoadmap(generatedRoadmap);
      toast({
        title: "Éxito",
        description: "¡Hoja de ruta alternativa generada exitosamente con OpenAI!",
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <Card className="w-full max-w-md">
              <CardContent className="pt-6">
                <div className="text-center">
                  <Loader2 className="h-16 w-16 text-purple-600 mx-auto mb-4 animate-spin" />
                  <h2 className="text-xl font-bold text-gray-900 mb-2">
                    Cargando Hoja de Ruta
                  </h2>
                  <p className="text-gray-600">
                    Recuperando tu hoja de ruta personalizada...
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

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
                    Generando Tu Hoja de Ruta Personalizada con IA
                  </h2>
                  <p className="text-gray-600">
                    OpenAI está analizando tus respuestas y creando un plan de implementación personalizado...
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
          <Link to="/dashboard">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver al Dashboard
            </Button>
          </Link>
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {roadmapData?.custom_name || roadmapData?.title || 'Tu Hoja de Ruta Personalizada de Implementación IA'}
              </h1>
              <p className="text-gray-600">
                {roadmapData?.description || 'Un plan paso a paso de 12 semanas generado con OpenAI y adaptado a tu proyecto'}
              </p>
              {roadmapData && (
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="outline">{roadmapData.project_type}</Badge>
                  <Badge variant="outline">{roadmapData.skill_level}</Badge>
                  <Badge variant="outline">{roadmapData.status}</Badge>
                </div>
              )}
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
                            Haz clic para expandir detalles y ver insights generados por OpenAI
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
                          <h4 className="text-sm font-semibold text-gray-900 mb-3">Insights Generados por OpenAI</h4>
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
                Esta hoja de ruta está personalizada basada en tus respuestas usando OpenAI. Ajústala según sea necesario para tus requerimientos específicos.
              </p>
              <div className="flex justify-center gap-4">
                <Link to="/dashboard">
                  <Button variant="outline">Volver al Dashboard</Button>
                </Link>
                <Link to="/questionnaire">
                  <Button variant="outline">Crear Nueva Hoja de Ruta</Button>
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
