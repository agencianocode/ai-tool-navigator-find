
import { Button } from "@/components/ui/button";
import { ExternalLink, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AITool } from "@/data/aiTools";
import { useToast } from "@/hooks/use-toast";

interface ToolActionsProps {
  tool: AITool;
  answers?: Record<string, any>;
  size?: "sm" | "default" | "lg";
  variant?: "default" | "outline";
}

const ToolActions = ({ tool, answers, size = "sm", variant = "outline" }: ToolActionsProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLearnMore = () => {
    // Simular navegación a la página de la herramienta
    window.open(`https://www.google.com/search?q=${encodeURIComponent(tool.name)} AI tool`, '_blank');
    toast({
      title: "Abriendo información",
      description: `Redirigiendo a información sobre ${tool.name}`,
    });
  };

  const handleAddToRoadmap = () => {
    // Navegar a la página de roadmap con la herramienta seleccionada
    const roadmapData = {
      answers: answers || {},
      selectedTools: [tool],
      preselectedTool: tool
    };
    
    navigate('/roadmap', { state: roadmapData });
    
    toast({
      title: "Herramienta agregada",
      description: `${tool.name} ha sido agregada a tu hoja de ruta`,
    });
  };

  return (
    <div className="flex flex-wrap gap-2">
      <Button 
        size={size} 
        className="bg-gradient-to-r from-purple-600 to-blue-600"
        onClick={handleLearnMore}
      >
        <ExternalLink className="mr-2 h-4 w-4" />
        Saber Más
      </Button>
      <Button 
        size={size} 
        variant={variant}
        onClick={handleAddToRoadmap}
      >
        <Plus className="mr-2 h-4 w-4" />
        Agregar a Hoja de Ruta
      </Button>
    </div>
  );
};

export default ToolActions;
