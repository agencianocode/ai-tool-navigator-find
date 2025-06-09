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
    const { message, conversationHistory, userContext } = await req.json()
    
    console.log('AI Chat Assistant request:', { message, hasHistory: !!conversationHistory, hasContext: !!userContext });

    const claudeApiKey = Deno.env.get('CLAUDE_API_KEY')
    if (!claudeApiKey) {
      throw new Error('Claude API key not configured')
    }

    // Build context-aware system prompt
    const systemPrompt = `Eres un asistente de IA especializado en ayudar a usuarios a encontrar e implementar las herramientas de IA y tecnologías correctas. Tienes acceso a una base de datos integral de herramientas de IA y puedes proporcionar:

1. Recomendaciones de herramientas basadas en necesidades específicas
2. Guías de implementación y roadmaps
3. Comparaciones entre diferentes herramientas
4. Mejores prácticas y consejos de integración
5. Solución de problemas y consejos de optimización

Contexto del usuario: ${userContext ? JSON.stringify(userContext) : 'Sin contexto específico'}

Siempre sé útil, conciso y proporciona consejos prácticos. Si recomiendas herramientas, explica por qué son adecuadas para el caso de uso específico del usuario. Responde siempre en español.`

    // Prepare conversation messages
    const messages = [
      {
        role: 'user',
        content: message
      }
    ]

    // Add conversation history if available (keep last 8 messages for context)
    if (conversationHistory && conversationHistory.length > 0) {
      const validHistory = conversationHistory
        .slice(-8)
        .filter(msg => msg.role && msg.content && typeof msg.content === 'string')
        .map(msg => ({
          role: msg.role === 'user' ? 'user' : 'assistant',
          content: msg.content.substring(0, 1000) // Limit message length
        }));
      
      // Insert history before the current message
      messages.unshift(...validHistory);
    }

    console.log('Sending request to Claude with', messages.length, 'messages');

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': claudeApiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 1000,
        system: systemPrompt,
        messages: messages
      })
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`Claude API error: ${response.status} - ${errorText}`)
      throw new Error(`Claude API error: ${response.status}`)
    }

    const data = await response.json()
    console.log('Claude response received successfully')
    
    if (!data.content || !data.content[0] || !data.content[0].text) {
      throw new Error('Invalid response format from Claude API')
    }

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
