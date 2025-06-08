
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

export type AIEngine = 'claude' | 'openai';

export const generateRoadmap = async (
  answers: Record<string, any>, 
  selectedTools: any[], 
  isAlternative: boolean = false,
  preferredEngine: AIEngine = 'openai'
): Promise<RoadmapPhase[]> => {
  console.log('Generating AI-powered roadmap with engine:', preferredEngine, { answers, selectedTools, isAlternative });
  
  try {
    // Get current session for authentication
    const { data: { session } } = await supabase.auth.getSession();
    
    // Choose function based on preferred engine with better error handling
    const functionName = preferredEngine === 'openai' ? 'generate-roadmap-openai' : 'generate-roadmap';
    
    console.log(`Calling ${functionName} function with enhanced parameters`);
    
    const { data, error } = await supabase.functions.invoke(functionName, {
      body: {
        answers,
        selectedTools,
        isAlternative,
        enhancedMode: true, // Activar modo mejorado
        includeInsights: true, // Incluir análisis adicional
        personalizeForUser: !!session?.user // Personalizar si hay usuario
      },
      headers: session ? {
        Authorization: `Bearer ${session.access_token}`
      } : {}
    });

    if (error) {
      console.error(`Error calling ${functionName} function:`, error);
      
      // Intentar con el motor alternativo si falla el preferido
      if (preferredEngine === 'openai') {
        console.log('OpenAI failed, trying Claude as fallback...');
        return generateRoadmap(answers, selectedTools, isAlternative, 'claude');
      } else {
        console.log('Claude failed, trying OpenAI as fallback...');
        return generateRoadmap(answers, selectedTools, isAlternative, 'openai');
      }
    }

    if (!data || !Array.isArray(data)) {
      console.error('Invalid data received from AI function:', data);
      throw new Error('Invalid response format from AI service');
    }

    console.log('AI roadmap generated successfully:', data.length, 'phases');
    return data;
    
  } catch (error) {
    console.error('Error generating AI roadmap:', error);
    
    // Fallback inteligente con datos más realistas
    console.log('Using enhanced fallback roadmap generator');
    return generateEnhancedMockRoadmap(answers, selectedTools);
  }
};

// Generador de roadmap mejorado como fallback
const generateEnhancedMockRoadmap = async (
  answers: Record<string, any>, 
  selectedTools: any[]
): Promise<RoadmapPhase[]> => {
  console.log('Generating enhanced fallback roadmap with user context');
  
  // Análisis del contexto del usuario para personalización
  const userContext = {
    skillLevel: answers.skillLevel || 'beginner',
    projectType: answers.projectType || 'general',
    budgetRange: answers.budgetRange || 'low',
    timeline: answers.timeline || 'flexible',
    interests: answers.interests || [],
    targetAudience: answers.targetAudience || 'general'
  };

  const enhancedRoadmap: RoadmapPhase[] = [
    {
      id: 1,
      title: "Fase 1: Fundamentos y Configuración",
      duration: "Semanas 1-2",
      status: 'current',
      tasks: [
        "Configurar entorno de desarrollo y cuentas necesarias",
        "Instalar y configurar herramientas principales seleccionadas",
        "Crear estructura de proyecto y documentación inicial",
        "Establecer sistemas de control de versiones y respaldos",
        "Definir métricas de éxito y KPIs del proyecto",
        `Configurar ${selectedTools.slice(0, 2).map(t => t.name).join(' y ')}`
      ],
      tools: selectedTools.slice(0, 3).map(tool => tool.name),
      insights: `Como ${userContext.skillLevel}, es crucial que empieces con herramientas familiares antes de explorar tecnologías más avanzadas. Tu proyecto de tipo ${userContext.projectType} requiere una base sólida que puedas expandir gradualmente.`,
      challenges: [
        "Curva de aprendizaje de nuevas herramientas y plataformas",
        "Integración compleja entre diferentes servicios",
        "Gestión del tiempo y planificación del proyecto",
        "Configuración inicial y troubleshooting"
      ],
      resources: [
        "Documentación oficial de herramientas seleccionadas",
        "Tutoriales de configuración y guías de inicio rápido",
        "Foros de comunidad y canales de soporte",
        "Plantillas de gestión de proyectos",
        "Videos de YouTube sobre configuración inicial"
      ]
    },
    {
      id: 2,
      title: "Fase 2: Implementación del Core",
      duration: "Semanas 3-6",
      status: 'upcoming',
      tasks: [
        "Implementar funcionalidad central usando herramientas principales",
        "Configurar flujos de trabajo y pipelines de procesamiento", 
        "Establecer automatizaciones e integraciones clave",
        "Construir interfaces de usuario y flujos de experiencia",
        "Realizar pruebas básicas y solucionar problemas iniciales",
        "Optimizar rendimiento y configuraciones iniciales"
      ],
      tools: selectedTools.slice(2, 6).map(tool => tool.name),
      insights: `En esta fase, tu proyecto tomará forma real. Dado tu presupuesto ${userContext.budgetRange}, prioriza las versiones gratuitas y características esenciales. Enfócate en obtener un prototipo funcional antes de añadir funciones avanzadas.`,
      challenges: [
        "Límites de API y restricciones de uso",
        "Sincronización de datos entre herramientas",
        "Optimización del rendimiento y escalabilidad",
        "Gestión de dependencias y actualizaciones",
        "Testing y debugging de integraciones"
      ],
      resources: [
        "Documentación de APIs y guías de integración",
        "Mejores prácticas para combinaciones de herramientas",
        "Tutoriales de optimización de rendimiento",
        "Ejemplos de la comunidad y casos de uso",
        "Herramientas de monitoreo y debugging"
      ]
    },
    {
      id: 3,
      title: "Fase 3: Integración y Testing Avanzado",
      duration: "Semanas 7-9",
      status: 'upcoming',
      tasks: [
        "Conectar todas las herramientas en flujo de trabajo integral",
        "Realizar testing end-to-end y validación completa",
        "Optimizar experiencia de usuario y rendimiento",
        "Implementar manejo de errores y monitoreo",
        "Preparar estrategia de despliegue y lanzamiento",
        "Configurar analíticas y métricas de seguimiento"
      ],
      tools: selectedTools.slice(6, 9).map(tool => tool.name),
      insights: `La fase de integración requiere atención cuidadosa al flujo de datos y experiencia del usuario. Prueba exhaustivamente con escenarios del mundo real que coincidan con las necesidades de tu audiencia objetivo: ${userContext.targetAudience}.`,
      challenges: [
        "Problemas de compatibilidad entre plataformas",
        "Seguridad de datos y cumplimiento de privacidad",
        "Feedback de testing de aceptación de usuarios",
        "Gestión de versiones y rollbacks",
        "Performance bajo carga real"
      ],
      resources: [
        "Frameworks y metodologías de testing",
        "Guías de mejores prácticas de seguridad",
        "Herramientas de recolección de feedback de usuarios",
        "Checklists de preparación para despliegue",
        "Herramientas de monitoreo y alertas"
      ]
    },
    {
      id: 4,
      title: "Fase 4: Lanzamiento y Optimización Continua",
      duration: "Semanas 10-12",
      status: 'upcoming',
      tasks: [
        "Desplegar a entorno de producción",
        "Monitorear rendimiento y adopción de usuarios",
        "Recopilar feedback y analíticas de uso",
        "Implementar mejoras y nuevas características",
        "Escalar infraestructura basado en demanda",
        "Planificar roadmap de desarrollo futuro"
      ],
      tools: selectedTools.slice(-3).map(tool => tool.name),
      insights: `El lanzamiento es solo el comienzo. Basado en tu preferencia de timeline ${userContext.timeline}, planifica mejoras iterativas. Monitorea patrones de uso y mantente preparado para adaptar tu stack de herramientas conforme evolucionen las necesidades.`,
      challenges: [
        "Gestión de costos de escalamiento y recursos",
        "Tasas de onboarding y adopción de usuarios",
        "Mantenimiento de la confiabilidad del sistema",
        "Competencia y diferenciación en el mercado",
        "Evolución tecnológica y actualizaciones"
      ],
      resources: [
        "Herramientas de analíticas y monitoreo avanzado",
        "Mejores prácticas de onboarding de usuarios",
        "Guías de escalamiento y optimización",
        "Canales de feedback de la comunidad",
        "Roadmaps de tecnologías emergentes"
      ]
    }
  ];

  // Simular delay de API para mejor UX
  await new Promise(resolve => setTimeout(resolve, 2500));

  return enhancedRoadmap;
};
