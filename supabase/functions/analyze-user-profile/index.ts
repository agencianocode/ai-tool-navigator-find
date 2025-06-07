
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface UserProfile {
  interests: string[]
  skillLevel: string
  projectType: string
  targetAudience: string
  budgetRange: string
  timeline: string
  technicalExpertise: string
  projectScale: string
  urgency: string
}

interface SemanticAnalysis {
  primaryInterests: string[]
  secondaryInterests: string[]
  complexityPreference: number
  budgetSensitivity: number
  timePreference: number
  technicalComfort: number
  projectScope: string
  userPersona: string
  recommendationWeights: {
    functionality: number
    ease_of_use: number
    pricing: number
    scalability: number
    community: number
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { answers, userId } = await req.json()
    
    console.log('Analyzing user profile:', { answers, userId });

    const openaiApiKey = Deno.env.get('OPENAI_API_KEY')
    if (!openaiApiKey) {
      throw new Error('OpenAI API key not configured')
    }

    // Crear prompt para análisis semántico
    const analysisPrompt = `
Analiza este perfil de usuario y genera un análisis semántico detallado:

Respuestas del usuario:
- Intereses: ${JSON.stringify(answers.interests)}
- Nivel de habilidad: ${answers.skillLevel}
- Tipo de proyecto: ${answers.projectType}
- Audiencia objetivo: ${answers.targetAudience}
- Presupuesto: ${answers.budgetRange}
- Timeline: ${answers.timeline}
- Experiencia técnica: ${answers.technicalExpertise}
- Escala del proyecto: ${answers.projectScale}
- Urgencia: ${answers.urgency}

Genera un análisis que incluya:
1. Intereses primarios y secundarios inferidos
2. Preferencia de complejidad (0-1)
3. Sensibilidad al presupuesto (0-1)
4. Preferencia temporal (0-1, donde 1 = urgente)
5. Comodidad técnica (0-1)
6. Alcance del proyecto
7. Persona del usuario
8. Pesos de recomendación para diferentes factores

Responde SOLO con un JSON válido en este formato:
{
  "primaryInterests": ["interesse1", "interesse2"],
  "secondaryInterests": ["interesse3", "interesse4"],
  "complexityPreference": 0.7,
  "budgetSensitivity": 0.5,
  "timePreference": 0.8,
  "technicalComfort": 0.6,
  "projectScope": "medium",
  "userPersona": "descripción breve",
  "recommendationWeights": {
    "functionality": 0.3,
    "ease_of_use": 0.25,
    "pricing": 0.2,
    "scalability": 0.15,
    "community": 0.1
  }
}
`

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
            content: 'Eres un experto en análisis de perfiles de usuario para recomendaciones de herramientas de IA. Analiza las respuestas del usuario y genera insights semánticos precisos.'
          },
          {
            role: 'user',
            content: analysisPrompt
          }
        ],
        temperature: 0.3,
        max_tokens: 1000,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('OpenAI API error:', errorText)
      throw new Error(`OpenAI API error: ${response.status}`)
    }

    const data = await response.json()
    console.log('OpenAI response received')

    let semanticAnalysis: SemanticAnalysis
    try {
      semanticAnalysis = JSON.parse(data.choices[0].message.content)
    } catch (parseError) {
      console.error('Error parsing OpenAI response:', parseError)
      throw new Error('Invalid JSON response from OpenAI')
    }

    // Guardar análisis en la base de datos si hay userId
    if (userId) {
      const supabaseUrl = Deno.env.get('SUPABASE_URL')!
      const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
      const supabase = createClient(supabaseUrl, supabaseKey)

      const { error: insertError } = await supabase
        .from('user_semantic_profiles')
        .upsert({
          user_id: userId,
          semantic_analysis: semanticAnalysis,
          raw_answers: answers,
          updated_at: new Date().toISOString()
        })

      if (insertError) {
        console.error('Error saving semantic profile:', insertError)
      }
    }

    console.log('Semantic analysis completed:', semanticAnalysis)

    return new Response(
      JSON.stringify(semanticAnalysis),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )

  } catch (error) {
    console.error('Error in analyze-user-profile function:', error)
    
    return new Response(
      JSON.stringify({ 
        error: error.message || 'Error analyzing user profile',
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
