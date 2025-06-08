
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { message, conversationHistory, userContext } = await req.json()
    
    const claudeApiKey = Deno.env.get('CLAUDE_API_KEY')
    if (!claudeApiKey) {
      throw new Error('Claude API key not configured')
    }

    // Build context-aware system prompt
    const systemPrompt = `You are an AI assistant specialized in helping users find and implement the right AI tools and technologies. You have access to a comprehensive database of AI tools and can provide:

1. Tool recommendations based on specific needs
2. Implementation guidance and roadmaps
3. Comparisons between different tools
4. Best practices and integration advice
5. Troubleshooting and optimization tips

User Context: ${userContext ? JSON.stringify(userContext) : 'No specific context'}

Always be helpful, concise, and provide actionable advice. If recommending tools, explain why they're suitable for the user's specific use case.`

    // Prepare conversation messages
    const messages = [
      {
        role: 'user',
        content: message
      }
    ]

    // Add conversation history if available
    if (conversationHistory && conversationHistory.length > 0) {
      messages.unshift(...conversationHistory.slice(-10)) // Keep last 10 messages for context
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': claudeApiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-3-sonnet-20240229',
        max_tokens: 1000,
        system: systemPrompt,
        messages: messages
      })
    })

    if (!response.ok) {
      throw new Error(`Claude API error: ${response.status}`)
    }

    const data = await response.json()
    const assistantMessage = data.content[0].text

    // Analyze response for tool suggestions or actions
    const toolMentions = extractToolMentions(assistantMessage)
    const suggestedActions = extractSuggestedActions(assistantMessage)

    return new Response(
      JSON.stringify({
        message: assistantMessage,
        toolSuggestions: toolMentions,
        suggestedActions: suggestedActions,
        timestamp: new Date().toISOString()
      }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )

  } catch (error) {
    console.error('Error in AI chat assistant:', error)
    return new Response(
      JSON.stringify({ 
        error: error.message || 'Error processing chat message',
        message: 'Lo siento, hubo un error al procesar tu mensaje. Por favor, intenta de nuevo.'
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

function extractToolMentions(text: string): string[] {
  // Simple tool extraction - could be enhanced with NLP
  const toolPatterns = [
    /\b(ChatGPT|GPT-4|OpenAI)\b/gi,
    /\b(Claude|Anthropic)\b/gi,
    /\b(Midjourney|DALL-E|Stable Diffusion)\b/gi,
    /\b(Notion|Airtable|Monday)\b/gi,
    /\b(Zapier|Make|IFTTT)\b/gi,
    /\b(Figma|Sketch|Adobe)\b/gi,
  ]
  
  const mentions = []
  for (const pattern of toolPatterns) {
    const matches = text.match(pattern)
    if (matches) {
      mentions.push(...matches)
    }
  }
  
  return [...new Set(mentions)] // Remove duplicates
}

function extractSuggestedActions(text: string): string[] {
  const actions = []
  
  if (text.toLowerCase().includes('roadmap') || text.toLowerCase().includes('plan')) {
    actions.push('generate_roadmap')
  }
  
  if (text.toLowerCase().includes('compare') || text.toLowerCase().includes('comparison')) {
    actions.push('compare_tools')
  }
  
  if (text.toLowerCase().includes('recommendation') || text.toLowerCase().includes('suggest')) {
    actions.push('get_recommendations')
  }
  
  return actions
}
