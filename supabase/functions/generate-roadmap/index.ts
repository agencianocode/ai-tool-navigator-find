
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { corsHeaders } from '../_shared/cors.ts';

interface RoadmapRequest {
  answers: Record<string, any>;
  selectedTools: Array<{ name: string; [key: string]: any }>;
  isAlternative?: boolean;
}

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

const generateClaudePrompt = (answers: Record<string, any>, selectedTools: any[], isAlternative: boolean = false) => {
  const projectType = answers.projectType || 'general';
  const skillLevel = answers.skillLevel || 'beginner';
  const budget = answers.budgetRange || 'low';
  const timeline = answers.timeline || 'flexible';
  const toolNames = selectedTools.map(tool => tool.name || tool).join(', ') || 'Herramientas por definir';

  return `Eres un experto en gestión de proyectos de IA. Crea una hoja de ruta detallada de implementación de 4 fases para un proyecto de herramientas de IA.

CONTEXTO DEL PROYECTO:
- Tipo de Proyecto: ${projectType}
- Nivel de Habilidad del Usuario: ${skillLevel}
- Rango de Presupuesto: ${budget}
- Preferencia de Cronograma: ${timeline}
- Herramientas Seleccionadas: ${toolNames}
- Generar enfoque ${isAlternative ? 'alternativo' : 'principal'}

REQUISITOS:
Genera una respuesta en JSON con 4 fases, cada una conteniendo:
- tasks: Array de 4-6 tareas específicas y accionables
- tools: Array de 2-4 nombres de herramientas relevantes de las herramientas seleccionadas
- insights: Un párrafo con consejos personalizados (2-3 oraciones)
- challenges: Array de 2-3 obstáculos potenciales
- resources: Array de 3-4 recursos de aprendizaje o enlaces de documentación

FORMATO DE RESPUESTA (solo JSON):
{
  "phases": [
    {
      "tasks": ["Tarea 1", "Tarea 2", ...],
      "tools": ["Herramienta1", "Herramienta2", ...],
      "insights": "Párrafo de insight personalizado...",
      "challenges": ["Desafío 1", "Desafío 2", ...],
      "resources": ["Recurso 1", "Recurso 2", ...]
    }
  ]
}

IMPORTANTE: TODO EN ESPAÑOL. Haz las tareas específicas para el tipo de proyecto y herramientas. Ajusta la complejidad basada en el nivel de habilidad. Considera las restricciones de presupuesto en las recomendaciones.`;
};

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { answers, selectedTools, isAlternative = false }: RoadmapRequest = await req.json();

    // Get Claude AI API key from secrets
    const claudeApiKey = Deno.env.get('CLAUDE_API_KEY');
    if (!claudeApiKey) {
      throw new Error('Claude API key not configured');
    }

    // Generate prompt
    const prompt = generateClaudePrompt(answers, selectedTools, isAlternative);

    // Call Claude AI API
    const claudeResponse = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': claudeApiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-3-sonnet-20240229',
        max_tokens: 4000,
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ]
      })
    });

    if (!claudeResponse.ok) {
      throw new Error(`Claude API error: ${claudeResponse.status}`);
    }

    const claudeData = await claudeResponse.json();
    const content = claudeData.content[0].text;

    // Parse the JSON response from Claude
    let parsedResponse;
    try {
      parsedResponse = JSON.parse(content);
    } catch (error) {
      throw new Error('Failed to parse Claude response as JSON');
    }

    // Transform Claude response to our roadmap format
    const roadmapPhases: RoadmapPhase[] = parsedResponse.phases.map((phase: any, index: number) => ({
      id: index + 1,
      title: `Fase ${index + 1}: ${getPhaseTitle(index)}`,
      duration: getPhaseDuration(index),
      status: index === 0 ? 'current' : 'upcoming',
      tasks: phase.tasks || [],
      tools: phase.tools || [],
      insights: phase.insights || '',
      challenges: phase.challenges || [],
      resources: phase.resources || []
    }));

    // Save to database if user is authenticated
    const authHeader = req.headers.get('Authorization');
    if (authHeader) {
      const supabaseClient = createClient(
        Deno.env.get('SUPABASE_URL') ?? '',
        Deno.env.get('SUPABASE_ANON_KEY') ?? '',
        {
          global: {
            headers: { Authorization: authHeader },
          },
        }
      );

      const { data: { user } } = await supabaseClient.auth.getUser();
      
      if (user) {
        await supabaseClient.from('roadmaps').insert({
          user_id: user.id,
          title: `Hoja de Ruta ${answers.projectType || 'IA'}`,
          project_type: answers.projectType,
          skill_level: answers.skillLevel,
          budget_range: answers.budgetRange,
          timeline: answers.timeline,
          selected_tools: selectedTools,
          questionnaire_answers: answers,
          roadmap_data: roadmapPhases
        });
      }
    }

    return new Response(JSON.stringify(roadmapPhases), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error generating roadmap:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});

function getPhaseTitle(index: number): string {
  const titles = [
    'Fundamentos y Configuración',
    'Implementación Central',
    'Integración y Pruebas',
    'Lanzamiento y Optimización'
  ];
  return titles[index] || `Fase ${index + 1}`;
}

function getPhaseDuration(index: number): string {
  const durations = [
    'Semanas 1-2',
    'Semanas 3-6',
    'Semanas 7-8',
    'Semanas 9-12'
  ];
  return durations[index] || `Semana ${index + 1}`;
}
