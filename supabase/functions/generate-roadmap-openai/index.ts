
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
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

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { answers, selectedTools, isAlternative } = await req.json()
    
    console.log('OpenAI Roadmap Generation:', { answers, selectedTools, isAlternative });

    const openaiApiKey = Deno.env.get('OPENAI_API_KEY')
    if (!openaiApiKey) {
      console.error('OpenAI API key not found')
      throw new Error('OpenAI API key not configured')
    }

    // Build detailed prompt for OpenAI in Spanish
    const systemPrompt = `Eres un consultor de IA especializado en crear hojas de ruta detalladas y personalizadas para la adopción de herramientas de IA. Debes responder ÚNICAMENTE con un array JSON válido de exactamente 4 fases EN ESPAÑOL.

Perfil del Usuario:
- Tipo de Proyecto: ${answers.projectType || 'General'}
- Nivel de Habilidad: ${answers.skillLevel || 'Principiante'}
- Rango de Presupuesto: ${answers.budgetRange || 'Bajo'}
- Cronograma: ${answers.timeline || 'Flexible'}
- Experiencia Técnica: ${answers.technicalExpertise || 'Principiante'}
- Audiencia Objetivo: ${answers.targetAudience || 'General'}

Herramientas Seleccionadas: ${selectedTools.map(tool => tool.name || tool).join(', ') || 'Herramientas por definir'}

Crea una hoja de ruta práctica de implementación de 12 semanas dividida en 4 fases (3 semanas cada una). Cada fase debe tener esta estructura exacta:
{
  "id": number,
  "title": string,
  "duration": string,
  "status": "upcoming" | "current" | "completed",
  "tasks": string[],
  "tools": string[],
  "insights": string,
  "challenges": string[],
  "resources": string[]
}

Requisitos OBLIGATORIOS:
- TODO EN ESPAÑOL
- La fase 1 debe tener status "current", las demás "upcoming"
- Incluir 4-6 tareas específicas y accionables por fase
- Distribuir las herramientas seleccionadas lógicamente entre las fases
- Proporcionar insights personalizados basados en el perfil del usuario
- Incluir desafíos realistas y recursos útiles
- Hacer que sea práctico y alcanzable
- Si no hay herramientas específicas, recomendar herramientas populares según el tipo de proyecto

IMPORTANTE: Responde ÚNICAMENTE con el array JSON, sin formato markdown, sin bloques de código, sin texto adicional.`

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: systemPrompt
          },
          {
            role: 'user',
            content: `Genera una hoja de ruta detallada EN ESPAÑOL para implementar estas herramientas de IA: ${selectedTools.map(tool => tool.name || tool).join(', ') || 'Herramientas recomendadas para ' + (answers.projectType || 'proyecto general')}`
          }
        ],
        temperature: 0.7,
        max_tokens: 4000,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('OpenAI API error:', errorText)
      throw new Error(`OpenAI API error: ${response.status}`)
    }

    const data = await response.json()
    let responseContent = data.choices[0].message.content
    console.log('OpenAI response received:', responseContent)

    // Clean up the response - remove markdown code blocks if present
    responseContent = responseContent.trim()
    if (responseContent.startsWith('```json')) {
      responseContent = responseContent.replace(/^```json\s*/, '').replace(/\s*```$/, '')
    } else if (responseContent.startsWith('```')) {
      responseContent = responseContent.replace(/^```\s*/, '').replace(/\s*```$/, '')
    }

    let roadmapPhases: RoadmapPhase[]
    try {
      roadmapPhases = JSON.parse(responseContent)
    } catch (parseError) {
      console.error('Error parsing OpenAI response:', parseError)
      console.error('Raw response content:', responseContent)
      throw new Error('Invalid JSON response from OpenAI')
    }

    // Validate the response structure
    if (!Array.isArray(roadmapPhases) || roadmapPhases.length !== 4) {
      console.error('Invalid roadmap structure:', roadmapPhases)
      throw new Error('Invalid roadmap structure from OpenAI')
    }

    // Ensure proper structure for each phase
    const validatedPhases = roadmapPhases.map((phase, index) => ({
      id: phase.id || index + 1,
      title: phase.title || `Fase ${index + 1}`,
      duration: phase.duration || `Semanas ${index * 3 + 1}-${(index + 1) * 3}`,
      status: index === 0 ? 'current' : 'upcoming',
      tasks: Array.isArray(phase.tasks) ? phase.tasks : [],
      tools: Array.isArray(phase.tools) ? phase.tools : [],
      insights: phase.insights || '',
      challenges: Array.isArray(phase.challenges) ? phase.challenges : [],
      resources: Array.isArray(phase.resources) ? phase.resources : []
    }))

    console.log('Validated roadmap phases:', validatedPhases)

    return new Response(
      JSON.stringify(validatedPhases),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )

  } catch (error) {
    console.error('Error in generate-roadmap-openai function:', error)
    
    return new Response(
      JSON.stringify({ 
        error: error.message || 'Error generating roadmap with OpenAI',
        details: 'Check function logs for more information'
      }),
      { 
        status: 500,
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )
  }
})
