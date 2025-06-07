
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface ToolScore {
  toolId: string
  toolName: string
  totalScore: number
  functionalityScore: number
  easeOfUseScore: number
  pricingScore: number
  scalabilityScore: number
  communityScore: number
  semanticSimilarity: number
  personalizedBoost: number
  reasons: string[]
}

function calculateCosineSimilarity(vecA: number[], vecB: number[]): number {
  const dotProduct = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0)
  const magnitudeA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0))
  const magnitudeB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0))
  return dotProduct / (magnitudeA * magnitudeB)
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { answers, userId, tools } = await req.json()
    
    console.log('Generating intelligent recommendations for user:', userId);

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseKey)

    // 1. Obtener análisis semántico del usuario
    let semanticProfile = null
    if (userId) {
      const { data: profileData } = await supabase
        .from('user_semantic_profiles')
        .select('semantic_analysis')
        .eq('user_id', userId)
        .single()
      
      semanticProfile = profileData?.semantic_analysis
    }

    // 2. Obtener historial de preferencias del usuario
    let userHistory = null
    if (userId) {
      const { data: historyData } = await supabase
        .from('user_favorite_tools')
        .select('tool_name')
        .eq('user_id', userId)

      const { data: reviewsData } = await supabase
        .from('tool_reviews')
        .select('tool_name, rating')
        .eq('user_id', userId)

      userHistory = {
        favorites: historyData?.map(f => f.tool_name) || [],
        reviews: reviewsData || []
      }
    }

    // 3. Obtener embeddings de herramientas si están disponibles
    const { data: embeddingsData } = await supabase
      .from('tool_embeddings')
      .select('tool_id, tool_name, embedding')

    const toolEmbeddings = new Map()
    embeddingsData?.forEach(item => {
      toolEmbeddings.set(item.tool_id, item.embedding)
    })

    // 4. Calcular scores multidimensionales para cada herramienta
    const toolScores: ToolScore[] = []

    for (const tool of tools) {
      const score: ToolScore = {
        toolId: tool.id,
        toolName: tool.name,
        totalScore: 0,
        functionalityScore: 0,
        easeOfUseScore: 0,
        pricingScore: 0,
        scalabilityScore: 0,
        communityScore: 0,
        semanticSimilarity: 0,
        personalizedBoost: 0,
        reasons: []
      }

      // Score de funcionalidad (basado en matching de intereses)
      if (answers.interests && tool.tags) {
        const matchingTags = answers.interests.filter(interest => 
          tool.tags.some(tag => tag.toLowerCase().includes(interest.toLowerCase())) ||
          tool.category.toLowerCase().includes(interest.toLowerCase())
        )
        score.functionalityScore = Math.min(matchingTags.length / answers.interests.length, 1) * 100
        if (matchingTags.length > 0) {
          score.reasons.push(`Coincide con tus intereses: ${matchingTags.join(', ')}`)
        }
      }

      // Score de facilidad de uso
      const complexityMapping = { 'beginner': 100, 'intermediate': 75, 'advanced': 50, 'expert': 25 }
      const userComplexityPreference = answers.skillLevel || 'beginner'
      score.easeOfUseScore = complexityMapping[tool.complexity] || 50
      
      if (tool.complexity === userComplexityPreference) {
        score.reasons.push(`Perfecto para tu nivel: ${userComplexityPreference}`)
      }

      // Score de precio
      const budgetMapping = {
        'low': tool.pricing.toLowerCase().includes('gratis') || tool.pricing.toLowerCase().includes('free') ? 100 : 30,
        'medium': 70,
        'high': 90,
        'enterprise': 100
      }
      score.pricingScore = budgetMapping[answers.budgetRange] || 50

      if (tool.freeVersion && answers.budgetRange === 'low') {
        score.reasons.push('Tiene versión gratuita')
      }

      // Score de escalabilidad
      score.scalabilityScore = tool.apiAvailable ? 80 : 40
      if (answers.projectScale === 'large' && tool.apiAvailable) {
        score.reasons.push('Tiene API para integración')
      }

      // Score de comunidad (basado en madurez y popularidad)
      const yearsSinceFoundation = new Date().getFullYear() - (tool.founded_year || 2020)
      score.communityScore = Math.min(yearsSinceFoundation * 10 + 30, 100)

      // Boost personalizado basado en historial
      if (userHistory) {
        // Boost si ha marcado herramientas similares como favoritas
        const similarFavorites = userHistory.favorites.filter(fav => 
          tools.find(t => t.name === fav && t.category === tool.category)
        )
        if (similarFavorites.length > 0) {
          score.personalizedBoost += 20
          score.reasons.push('Similar a tus herramientas favoritas')
        }

        // Boost basado en ratings altos en categoría similar
        const highRatedInCategory = userHistory.reviews.filter(r => 
          r.rating >= 4 && tools.find(t => t.name === r.tool_name && t.category === tool.category)
        )
        if (highRatedInCategory.length > 0) {
          score.personalizedBoost += 15
          score.reasons.push('Categoría que has valorado positivamente')
        }
      }

      // Similitud semántica usando embeddings (si disponibles)
      if (toolEmbeddings.has(tool.id) && semanticProfile) {
        // Crear embedding del perfil de usuario (simplificado)
        const userInterests = semanticProfile.primaryInterests.concat(semanticProfile.secondaryInterests)
        // Por simplicidad, usamos un cálculo básico aquí
        // En producción, generarías un embedding real del perfil del usuario
        score.semanticSimilarity = Math.random() * 30 // Placeholder
      }

      // Calcular score total usando pesos del perfil semántico
      const weights = semanticProfile?.recommendationWeights || {
        functionality: 0.3,
        ease_of_use: 0.25,
        pricing: 0.2,
        scalability: 0.15,
        community: 0.1
      }

      score.totalScore = 
        score.functionalityScore * weights.functionality +
        score.easeOfUseScore * weights.ease_of_use +
        score.pricingScore * weights.pricing +
        score.scalabilityScore * weights.scalability +
        score.communityScore * weights.community +
        score.semanticSimilarity +
        score.personalizedBoost

      toolScores.push(score)
    }

    // 5. Ordenar por score total y obtener top recomendaciones
    const topRecommendations = toolScores
      .sort((a, b) => b.totalScore - a.totalScore)
      .slice(0, 20)
      .map(score => {
        const tool = tools.find(t => t.id === score.toolId)
        return {
          tool,
          matchPercentage: Math.min(Math.round(score.totalScore), 100),
          reasons: score.reasons,
          scoreBreakdown: {
            functionality: Math.round(score.functionalityScore),
            easeOfUse: Math.round(score.easeOfUseScore),
            pricing: Math.round(score.pricingScore),
            scalability: Math.round(score.scalabilityScore),
            community: Math.round(score.communityScore),
            personalized: Math.round(score.personalizedBoost)
          }
        }
      })

    // 6. Registrar feedback implícito para ML futuro
    if (userId) {
      const { error: feedbackError } = await supabase
        .from('recommendation_feedback')
        .insert({
          user_id: userId,
          session_id: crypto.randomUUID(),
          recommended_tools: topRecommendations.map(r => r.tool.id),
          algorithm_version: '2.0',
          created_at: new Date().toISOString()
        })

      if (feedbackError) {
        console.error('Error saving recommendation feedback:', feedbackError)
      }
    }

    console.log(`Generated ${topRecommendations.length} intelligent recommendations`)

    return new Response(
      JSON.stringify({
        recommendations: topRecommendations,
        metadata: {
          algorithmVersion: '2.0',
          personalizedFactors: semanticProfile ? ['semantic_analysis', 'user_history'] : ['basic_matching'],
          totalToolsAnalyzed: tools.length
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
    console.error('Error in intelligent-recommendations function:', error)
    
    return new Response(
      JSON.stringify({ 
        error: error.message || 'Error generating intelligent recommendations',
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
