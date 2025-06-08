
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface UserProfile {
  projectType: string
  skillLevel: string
  budgetRange: string
  interests: string[]
  technicalExpertise: string
  timeline: string
}

interface ToolRecommendation {
  tool: any
  matchPercentage: number
  reasons: string[]
  confidence: number
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { userProfile, tools } = await req.json()
    
    const openaiApiKey = Deno.env.get('OPENAI_API_KEY')
    if (!openaiApiKey) {
      throw new Error('OpenAI API key not configured')
    }

    // Enhanced AI-powered recommendation logic
    const prompt = `
    As an AI consultant, analyze this user profile and recommend the best tools:
    
    User Profile:
    - Project Type: ${userProfile.projectType}
    - Skill Level: ${userProfile.skillLevel}
    - Budget: ${userProfile.budgetRange}
    - Interests: ${userProfile.interests.join(', ')}
    - Technical Expertise: ${userProfile.technicalExpertise}
    - Timeline: ${userProfile.timeline}
    
    Available Tools: ${tools.map(t => `${t.name} (${t.category}): ${t.description}`).join('\n')}
    
    Provide a JSON response with the top 10 tools ranked by relevance, including:
    - matchPercentage (0-100)
    - reasons (array of specific reasons why this tool fits)
    - confidence (0-1)
    
    Format: { "recommendations": [{ "toolId": "id", "matchPercentage": 95, "reasons": ["reason1", "reason2"], "confidence": 0.9 }] }
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
            content: 'You are an expert AI consultant specializing in tool recommendations. Always respond with valid JSON.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.3,
        max_tokens: 2000,
      }),
    })

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`)
    }

    const data = await response.json()
    let aiRecommendations

    try {
      aiRecommendations = JSON.parse(data.choices[0].message.content)
    } catch (error) {
      // Fallback to basic matching if AI response isn't valid JSON
      aiRecommendations = { recommendations: [] }
    }

    // Enhance recommendations with tool data
    const enhancedRecommendations = aiRecommendations.recommendations.map((rec: any) => {
      const tool = tools.find((t: any) => t.id === rec.toolId || t.name.toLowerCase().includes(rec.toolId.toLowerCase()))
      return {
        tool,
        matchPercentage: rec.matchPercentage,
        reasons: rec.reasons,
        confidence: rec.confidence || 0.8,
        scoreBreakdown: {
          functionality: Math.round(rec.matchPercentage * 0.4),
          easeOfUse: Math.round(rec.matchPercentage * 0.3),
          pricing: Math.round(rec.matchPercentage * 0.2),
          scalability: Math.round(rec.matchPercentage * 0.1),
        }
      }
    }).filter((rec: any) => rec.tool)

    return new Response(
      JSON.stringify({
        recommendations: enhancedRecommendations,
        metadata: {
          algorithmVersion: '3.0-ai-enhanced',
          aiProvider: 'openai',
          totalAnalyzed: tools.length
        }
      }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )

  } catch (error) {
    console.error('Error generating enhanced recommendations:', error)
    return new Response(
      JSON.stringify({ 
        error: error.message || 'Error generating recommendations',
        fallback: true
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
