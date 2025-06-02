
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

    // Build detailed prompt for OpenAI
    const systemPrompt = `You are an AI consultant specializing in creating detailed, personalized implementation roadmaps for AI tool adoption. You must respond with a valid JSON array of exactly 4 phases, each containing the specified structure.

User Profile:
- Project Type: ${answers.projectType || 'General'}
- Skill Level: ${answers.skillLevel || 'Beginner'}
- Budget Range: ${answers.budgetRange || 'Low'}
- Timeline: ${answers.timeline || 'Flexible'}
- Technical Expertise: ${answers.technicalExpertise || 'Beginner'}
- Target Audience: ${answers.targetAudience || 'General'}

Selected Tools: ${selectedTools.map(tool => tool.name).join(', ')}

Create a practical 12-week implementation roadmap divided into 4 phases (3 weeks each). Each phase must have this exact structure:
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

Requirements:
- Phase 1 status should be "current", others "upcoming"
- Include 4-6 specific, actionable tasks per phase
- Distribute selected tools across phases logically
- Provide personalized insights based on user profile
- Include realistic challenges and helpful resources
- Make it practical and achievable

Respond with ONLY the JSON array, no additional text.`

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
            content: `Generate a detailed roadmap for implementing these AI tools: ${selectedTools.map(tool => tool.name).join(', ')}`
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
    console.log('OpenAI response received:', data.choices?.[0]?.message?.content)

    let roadmapPhases: RoadmapPhase[]
    try {
      roadmapPhases = JSON.parse(data.choices[0].message.content)
    } catch (parseError) {
      console.error('Error parsing OpenAI response:', parseError)
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
      title: phase.title || `Phase ${index + 1}`,
      duration: phase.duration || `Weeks ${index * 3 + 1}-${(index + 1) * 3}`,
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
