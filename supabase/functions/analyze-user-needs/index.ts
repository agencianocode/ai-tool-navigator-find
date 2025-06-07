
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { description, answers } = await req.json()
    
    console.log('Analyzing user needs:', { description, answers });

    const openaiApiKey = Deno.env.get('OPENAI_API_KEY')
    if (!openaiApiKey) {
      throw new Error('OpenAI API key not configured')
    }

    const analysisPrompt = `Analyze the following user description and questionnaire answers to extract detailed insights about their AI tool needs.

User Description: "${description}"

Questionnaire Answers:
${Object.entries(answers).map(([key, value]) => `${key}: ${value}`).join('\n')}

Provide a JSON response with this exact structure:
{
  "detectedNeeds": ["need1", "need2", "need3"],
  "suggestedTools": ["tool1", "tool2", "tool3"],
  "complexityLevel": "beginner" | "intermediate" | "advanced",
  "estimatedTimeline": "timeline description",
  "priorityAreas": ["area1", "area2", "area3"],
  "riskFactors": ["risk1", "risk2"],
  "successMetrics": ["metric1", "metric2", "metric3"]
}

Focus on:
- Identifying specific automation, productivity, or AI needs
- Recommending appropriate tools based on skill level and budget
- Realistic timeline estimation
- Key success factors and potential challenges`

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
            content: 'You are an AI business analyst specializing in tool recommendation and needs assessment. Respond only with valid JSON.'
          },
          {
            role: 'user',
            content: analysisPrompt
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
    const analysis = JSON.parse(data.choices[0].message.content)

    console.log('User needs analysis completed:', analysis)

    return new Response(
      JSON.stringify(analysis),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )

  } catch (error) {
    console.error('Error analyzing user needs:', error)
    
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: 'Error processing user needs analysis'
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
