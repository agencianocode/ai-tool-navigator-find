
import { EnhancedTool } from '@/data/types';
import { supabase } from '@/integrations/supabase/client';

export interface IntelligentToolMatch {
  tool: EnhancedTool;
  matchPercentage: number;
  reasons: string[];
  scoreBreakdown: {
    functionality: number;
    easeOfUse: number;
    pricing: number;
    scalability: number;
    community: number;
    personalized: number;
  };
  confidence: number;
}

export interface IntelligentRecommendationResult {
  recommendations: IntelligentToolMatch[];
  metadata: {
    algorithmVersion: string;
    personalizedFactors: string[];
    totalToolsAnalyzed: number;
  };
}

export async function generateIntelligentRecommendations(
  answers: Record<string, any>,
  userId?: string,
  tools?: EnhancedTool[]
): Promise<IntelligentRecommendationResult> {
  try {
    console.log('Generating intelligent recommendations...', { userId, toolsCount: tools?.length });

    // Si no se proporcionan herramientas, usar las de la base de datos expandida
    let targetTools = tools;
    if (!targetTools) {
      const { expandedToolsDatabase } = await import('@/data/expandedToolsDatabase');
      targetTools = expandedToolsDatabase;
    }

    // 1. Generar análisis semántico del usuario (si está autenticado)
    let semanticProfile = null;
    if (userId) {
      try {
        const { data, error } = await supabase.functions.invoke('analyze-user-profile', {
          body: { answers, userId }
        });

        if (error) throw error;
        semanticProfile = data;
        console.log('Semantic profile generated:', semanticProfile);
      } catch (error) {
        console.warn('Failed to generate semantic profile, using fallback:', error);
      }
    }

    // 2. Obtener recomendaciones inteligentes
    const { data, error } = await supabase.functions.invoke('intelligent-recommendations', {
      body: { 
        answers, 
        userId, 
        tools: targetTools,
        semanticProfile 
      }
    });

    if (error) {
      console.error('Error from intelligent-recommendations function:', error);
      throw error;
    }

    console.log('Intelligent recommendations generated:', data.recommendations?.length);
    return data;

  } catch (error) {
    console.error('Error generating intelligent recommendations:', error);
    
    // Fallback al algoritmo básico si falla el inteligente
    console.log('Falling back to basic matching algorithm...');
    return await fallbackToBasicMatching(answers, targetTools || []);
  }
}

async function fallbackToBasicMatching(
  answers: Record<string, any>, 
  tools: EnhancedTool[]
): Promise<IntelligentRecommendationResult> {
  // Algoritmo básico de matching como fallback
  const basicMatches = tools.map(tool => {
    let score = 0;
    const reasons = [];

    // Matching básico por intereses
    if (answers.interests && tool.tags) {
      const matchingTags = answers.interests.filter((interest: string) => 
        tool.tags.some(tag => tag.toLowerCase().includes(interest.toLowerCase()))
      );
      if (matchingTags.length > 0) {
        score += (matchingTags.length / answers.interests.length) * 40;
        reasons.push(`Coincide con tus intereses: ${matchingTags.join(', ')}`);
      }
    }

    // Matching por complejidad
    if (answers.skillLevel) {
      const complexityMap = { 'beginner': 1, 'intermediate': 2, 'advanced': 3, 'expert': 4 };
      const userLevel = complexityMap[answers.skillLevel as keyof typeof complexityMap] || 1;
      const toolLevel = complexityMap[tool.complexity] || 1;
      
      if (Math.abs(userLevel - toolLevel) <= 1) {
        score += 30;
        reasons.push(`Apropiado para tu nivel: ${answers.skillLevel}`);
      }
    }

    // Matching por presupuesto
    if (answers.budgetRange === 'low' && tool.freeVersion) {
      score += 20;
      reasons.push('Tiene versión gratuita');
    }

    return {
      tool,
      matchPercentage: Math.min(Math.round(score), 100),
      reasons,
      scoreBreakdown: {
        functionality: Math.round(score * 0.4),
        easeOfUse: Math.round(score * 0.3),
        pricing: Math.round(score * 0.15),
        scalability: Math.round(score * 0.1),
        community: Math.round(score * 0.05),
        personalized: 0
      },
      confidence: 0.7 // Menor confianza para el algoritmo básico
    };
  }).sort((a, b) => b.matchPercentage - a.matchPercentage);

  return {
    recommendations: basicMatches,
    metadata: {
      algorithmVersion: '1.0-fallback',
      personalizedFactors: ['basic_matching'],
      totalToolsAnalyzed: tools.length
    }
  };
}

export async function findSimilarTools(
  toolId: string, 
  limit: number = 5
): Promise<EnhancedTool[]> {
  try {
    // Buscar herramientas similares usando embeddings
    const { data, error } = await supabase.functions.invoke('find-similar-tools', {
      body: { toolId, limit }
    });

    if (error) throw error;
    return data.similarTools || [];

  } catch (error) {
    console.error('Error finding similar tools:', error);
    
    // Fallback: buscar por categoría
    const { expandedToolsDatabase } = await import('@/data/expandedToolsDatabase');
    const targetTool = expandedToolsDatabase.find(t => t.id === toolId);
    
    if (!targetTool) return [];
    
    return expandedToolsDatabase
      .filter(tool => 
        tool.id !== toolId && 
        tool.category === targetTool.category
      )
      .slice(0, limit);
  }
}

export async function updateUserFeedback(
  userId: string,
  toolId: string,
  feedbackType: 'like' | 'dislike' | 'use' | 'save',
  metadata?: Record<string, any>
): Promise<void> {
  try {
    // Como la tabla user_feedback no existe, usar user_favorite_tools para 'save'
    if (feedbackType === 'save') {
      const { error } = await supabase
        .from('user_favorite_tools')
        .upsert({
          user_id: userId,
          tool_name: toolId, // Usando tool_name en lugar de tool_id
          created_at: new Date().toISOString()
        });

      if (error) throw error;
    }
    
    console.log('User feedback recorded:', { userId, toolId, feedbackType });
    
  } catch (error) {
    console.error('Error recording user feedback:', error);
  }
}

export function getRecommendationExplanation(match: IntelligentToolMatch): string {
  const { scoreBreakdown } = match;
  const explanations = [];

  if (scoreBreakdown.functionality > 70) {
    explanations.push('Coincide perfectamente con tus intereses y necesidades');
  }
  
  if (scoreBreakdown.easeOfUse > 80) {
    explanations.push('Muy fácil de usar para tu nivel de experiencia');
  }
  
  if (scoreBreakdown.pricing > 80) {
    explanations.push('Se ajusta perfectamente a tu presupuesto');
  }
  
  if (scoreBreakdown.personalized > 15) {
    explanations.push('Recomendado basado en tu historial de preferencias');
  }

  return explanations.join('. ') || 'Herramienta recomendada para tu perfil';
}
