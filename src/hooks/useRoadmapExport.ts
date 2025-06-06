
import { useToast } from "@/hooks/use-toast";

interface RoadmapExportData {
  title: string;
  description?: string;
  phases: any[];
  tools: string[];
  createdAt: string;
}

export const useRoadmapExport = () => {
  const { toast } = useToast();

  const exportToPDF = async (roadmapData: RoadmapExportData) => {
    try {
      // Simular exportación a PDF (se puede implementar con jsPDF o similar)
      const content = generatePDFContent(roadmapData);
      
      // Crear un blob con el contenido
      const blob = new Blob([content], { type: 'text/plain' });
      
      // Crear enlace de descarga
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `roadmap-${roadmapData.title.toLowerCase().replace(/\s+/g, '-')}.txt`;
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      window.URL.revokeObjectURL(url);
      
      toast({
        title: "Éxito",
        description: "Hoja de ruta exportada exitosamente",
      });
      
      return true;
    } catch (error) {
      console.error('Error exporting roadmap:', error);
      toast({
        title: "Error",
        description: "Error al exportar la hoja de ruta",
        variant: "destructive",
      });
      return false;
    }
  };

  const shareRoadmap = async (roadmapData: RoadmapExportData) => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: `Hoja de Ruta: ${roadmapData.title}`,
          text: `Mira mi hoja de ruta de implementación IA: ${roadmapData.description}`,
          url: window.location.href,
        });
      } else {
        // Fallback: copiar al portapapeles
        const shareText = `Hoja de Ruta: ${roadmapData.title}\n${roadmapData.description}\n\nHerramientas: ${roadmapData.tools.join(', ')}\n\nCreado en: ${window.location.origin}`;
        await navigator.clipboard.writeText(shareText);
        
        toast({
          title: "Enlace copiado",
          description: "El enlace de la hoja de ruta se copió al portapapeles",
        });
      }
      
      return true;
    } catch (error) {
      console.error('Error sharing roadmap:', error);
      toast({
        title: "Error",
        description: "Error al compartir la hoja de ruta",
        variant: "destructive",
      });
      return false;
    }
  };

  const generateTemplate = (roadmapData: RoadmapExportData) => {
    try {
      const template = {
        name: `Template: ${roadmapData.title}`,
        description: roadmapData.description,
        phases: roadmapData.phases.map(phase => ({
          title: phase.title,
          duration: phase.duration,
          tasks: phase.tasks,
          tools: phase.tools,
        })),
        tools: roadmapData.tools,
        createdAt: new Date().toISOString(),
      };
      
      // Guardar template en localStorage como ejemplo
      const templates = JSON.parse(localStorage.getItem('roadmapTemplates') || '[]');
      templates.push(template);
      localStorage.setItem('roadmapTemplates', JSON.stringify(templates));
      
      toast({
        title: "Template creado",
        description: "Template guardado exitosamente",
      });
      
      return template;
    } catch (error) {
      console.error('Error creating template:', error);
      toast({
        title: "Error",
        description: "Error al crear el template",
        variant: "destructive",
      });
      return null;
    }
  };

  return {
    exportToPDF,
    shareRoadmap,
    generateTemplate,
  };
};

const generatePDFContent = (roadmapData: RoadmapExportData): string => {
  return `
HOJA DE RUTA DE IMPLEMENTACIÓN IA
================================

Título: ${roadmapData.title}
Descripción: ${roadmapData.description || 'Sin descripción'}
Creado: ${new Date(roadmapData.createdAt).toLocaleDateString('es-ES')}

HERRAMIENTAS INCLUIDAS:
${roadmapData.tools.map(tool => `• ${tool}`).join('\n')}

FASES DE IMPLEMENTACIÓN:
${roadmapData.phases.map((phase, index) => `
${index + 1}. ${phase.title} (${phase.duration})
   Tareas:
   ${phase.tasks?.map((task: string) => `   • ${task}`).join('\n') || '   Sin tareas definidas'}
   
   Herramientas:
   ${phase.tools?.map((tool: string) => `   • ${tool}`).join('\n') || '   Sin herramientas específicas'}
   
   Insights:
   ${phase.insights || 'Sin insights disponibles'}
`).join('\n')}

---
Generado por AI Tools Advisor
${window.location.origin}
  `.trim();
};
