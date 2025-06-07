
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
    const { tools } = await req.json()
    
    console.log('Generating embeddings for tools:', tools?.length);

    const openaiApiKey = Deno.env.get('OPENAI_API_KEY')
    if (!openaiApiKey) {
      throw new Error('OpenAI API key not configured')
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseKey)

    const toolEmbeddings = []

    for (const tool of tools) {
      // Crear texto representativo de la herramienta
      const toolText = `${tool.name} ${tool.category} ${tool.subcategory} ${tool.description} ${tool.tags.join(' ')} ${tool.key_features?.join(' ') || ''}`

      try {
        const embeddingResponse = await fetch('https://api.openai.com/v1/embeddings', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${openaiApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'text-embedding-3-small',
            input: toolText,
            encoding_format: 'float'
          }),
        })

        if (!embeddingResponse.ok) {
          console.error(`Failed to generate embedding for ${tool.name}`)
          continue
        }

        const embeddingData = await embeddingResponse.json()
        const embedding = embeddingData.data[0].embedding

        toolEmbeddings.push({
          tool_id: tool.id,
          tool_name: tool.name,
          embedding: embedding,
          updated_at: new Date().toISOString()
        })

        // Pausa pequeña para evitar rate limiting
        await new Promise(resolve => setTimeout(resolve, 100))

      } catch (error) {
        console.error(`Error generating embedding for ${tool.name}:`, error)
        continue
      }
    }

    // Guardar embeddings en la base de datos
    if (toolEmbeddings.length > 0) {
      const { error: insertError } = await supabase
        .from('tool_embeddings')
        .upsert(toolEmbeddings)

      if (insertError) {
        console.error('Error saving tool embeddings:', insertError)
        throw insertError
      }
    }

    console.log(`Generated ${toolEmbeddings.length} embeddings successfully`)

    return new Response(
      JSON.stringify({ 
        success: true, 
        embeddingsGenerated: toolEmbeddings.length 
      }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )

  } catch (error) {
    console.error('Error in generate-tool-embeddings function:', error)
    
    return new Response(
      JSON.stringify({ 
        error: error.message || 'Error generating tool embeddings',
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
