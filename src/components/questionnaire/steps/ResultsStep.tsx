
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useUserActivities } from "@/hooks/useUserActivities";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Sparkles, CheckCircle, ArrowRight, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useQuestionnaire } from "../QuestionnaireContext";
import { generateRoadmap } from "@/utils/roadmapGenerator";
import { supabase } from "@/integrations/supabase/client";
import { 
  aiWritingContentTools, 
  aiImageVideoTools, 
  noCodePlatformsTools, 
  websiteBuildersTools, 
  designPrototypingTools, 
  developmentToolsTools, 
  aiProductivityAutomationTools, 
  ecommercePlatformsTools, 
  databaseBackendTools 
} from "@/data/categories";

const ResultsStep = () => {
  const { state } = useQuestionnaire();
  const { answers } = state;
  const { user } = useAuth();
  const { logActivity } = useUserActivities();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [customName, setCustomName] = useState("");
  const [generatedRoadmap, setGeneratedRoadmap] = useState(null);

  const getRecommendedTools = () => {
    const { interests, skillLevel, projectType, budgetRange } = answers;

    // Combine all tools from different categories
    let allTools = [
      ...aiWritingContentTools,
      ...aiImageVideoTools,
      ...noCodePlatformsTools,
      ...websiteBuildersTools,
      ...designPrototypingTools,
      ...developmentToolsTools,
      ...aiProductivityAutomationTools,
      ...ecommercePlatformsTools,
      ...databaseBackendTools
    ];

    let filteredTools = allTools;

    // Filter by interests
    if (interests && interests.length > 0) {
      filteredTools = filteredTools.filter(tool =>
        interests.some((interest: string) => 
          tool.tags.some(tag => tag.toLowerCase().includes(interest.toLowerCase())) ||
          tool.category.toLowerCase().includes(interest.toLowerCase()) ||
          tool.description.toLowerCase().includes(interest.toLowerCase())
        )
      );
    }

    // Filter by project type
    if (projectType) {
      const projectTypeFiltered = filteredTools.filter(tool =>
        tool.use_case_examples.some(example =>
          example.toLowerCase().includes(projectType.toLowerCase())
        ) ||
        tool.category.toLowerCase().includes(projectType.toLowerCase()) ||
        tool.description.toLowerCase().includes(projectType.toLowerCase())
      );
      
      if (projectTypeFiltered.length > 0) {
        filteredTools = projectTypeFiltered;
      }
    }

    // Filter by budget
    if (budgetRange === 'low') {
      const budgetFiltered = filteredTools.filter(tool => tool.freeVersion);
      if (budgetFiltered.length > 0) {
        filteredTools = budgetFiltered;
      }
    }

    // Filter by skill level
    if (skillLevel) {
      const skillFiltered = filteredTools.filter(tool => 
        tool.complexity === skillLevel || 
        (skillLevel === 'beginner' && tool.complexity === 'intermediate')
      );
      
      if (skillFiltered.length > 0) {
        filteredTools = skillFiltered;
      }
    }

    // If no tools match, return popular general tools
    if (filteredTools.length === 0) {
      filteredTools = allTools.filter(tool => tool.freeVersion).slice(0, 8);
    }

    // Return top 8 tools
    return filteredTools.slice(0, 8);
  };

  const handleGenerateRoadmap = async (isAlternative = false) => {
    if (!user) {
      toast({
        title: "Autenticación requerida",
        description: "Debes iniciar sesión para generar una hoja de ruta.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    try {
      const selectedTools = getRecommendedTools();
      console.log('Selected tools for roadmap:', selectedTools);
      
      const roadmapData = await generateRoadmap(answers, selectedTools, isAlternative);
      
      if (!roadmapData) {
        throw new Error('No se pudo generar la hoja de ruta');
      }

      // Convertir roadmapData y selectedTools a JSON compatible
      const roadmapDataJson = JSON.parse(JSON.stringify(roadmapData));
      const selectedToolsJson = JSON.parse(JSON.stringify(selectedTools));

      // Guardar la hoja de ruta en la base de datos
      const { data: savedRoadmap, error } = await supabase
        .from('roadmaps')
        .insert({
          user_id: user.id,
          title: customName || `${answers.projectType || 'General'} - ${new Date().toLocaleDateString()}`,
          description: `Hoja de ruta generada para proyecto ${answers.projectType || 'general'} con nivel ${answers.skillLevel || 'principiante'}`,
          project_type: answers.projectType,
          skill_level: answers.skillLevel,
          budget_range: answers.budgetRange,
          timeline: answers.timeline,
          questionnaire_answers: answers,
          roadmap_data: roadmapDataJson,
          selected_tools: selectedToolsJson,
          custom_name: customName
        })
        .select()
        .single();

      if (error) throw error;

      // Registrar la actividad del cuestionario completado
      await logActivity({
        activity_type: 'questionnaire_completed',
        activity_title: `Cuestionario completado: ${answers.projectType || 'General'}`,
        activity_description: `Generó una hoja de ruta para proyecto ${answers.projectType || 'general'} con ${selectedTools.length} herramientas recomendadas`,
        related_id: savedRoadmap.id,
        metadata: {
          answers,
          tools_count: selectedTools.length,
          is_alternative: isAlternative
        }
      });

      setGeneratedRoadmap(savedRoadmap);
      
      toast({
        title: "¡Hoja de ruta generada!",
        description: "Tu hoja de ruta personalizada ha sido creada exitosamente.",
      });

      // Navegar a la hoja de ruta generada después de un breve delay
      setTimeout(() => {
        navigate(`/roadmap?id=${savedRoadmap.id}`);
      }, 1500);

    } catch (error) {
      console.error('Error generating roadmap:', error);
      toast({
        title: "Error al generar hoja de ruta",
        description: "Hubo un problema al generar tu hoja de ruta. Por favor, inténtalo de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const recommendedTools = getRecommendedTools();

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-yellow-500" />
          ¡Resultados del Cuestionario!
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {user ? (
          <>
            <div className="rounded-md bg-green-500/15 p-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <p className="text-sm font-medium">
                  ¡Cuestionario completado! Hemos encontrado {recommendedTools.length} herramientas perfectas para ti:
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recommendedTools.map((tool) => (
                <div key={tool.id} className="border rounded-md p-3 hover:bg-gray-50">
                  <h3 className="text-sm font-semibold mb-1">{tool.name}</h3>
                  <Badge variant="secondary" className="mb-2">{tool.category}</Badge>
                  <p className="text-xs text-gray-600 mb-2">{tool.description.substring(0, 80)}...</p>
                  {tool.freeVersion && (
                    <Badge variant="outline" className="text-xs">
                      Versión Gratuita
                    </Badge>
                  )}
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <Label htmlFor="roadmap-name">Nombre de la Hoja de Ruta (Opcional)</Label>
              <Input
                id="roadmap-name"
                placeholder="Ej: Mi Proyecto de Automatización"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
              />
            </div>

            <Button
              className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-700 hover:to-blue-700"
              onClick={() => handleGenerateRoadmap()}
              disabled={isGenerating}
            >
              {isGenerating ? (
                <>
                  Generando Hoja de Ruta con IA...
                  <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                </>
              ) : (
                <>
                  Generar Hoja de Ruta Personalizada
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </>
        ) : (
          <div className="text-center py-8">
            <p className="text-lg font-semibold text-gray-700 mb-4">
              ¿Listo para descubrir las herramientas de IA perfectas para ti?
            </p>
            <p className="text-gray-500 mb-4">
              Inicia sesión para guardar tus resultados y generar una hoja de ruta personalizada.
            </p>
            <Button asChild>
              <a href="/auth">Inicia Sesión para Continuar</a>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ResultsStep;
