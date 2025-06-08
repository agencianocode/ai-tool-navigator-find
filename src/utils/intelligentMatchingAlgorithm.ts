
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
    aiProvider?: string;
  };
}

export async function generateIntelligentRecommendations(
  answers: Record<string, any>,
  userId?: string,
  tools?: EnhancedTool[]
): Promise<IntelligentRecommendationResult> {
  try {
    console.log('Generating intelligent recommendations with AI...', { userId, toolsCount: tools?.length });

    // Si no se proporcionan herramientas, usar las de la base de datos expandida
    let targetTools = tools;
    if (!targetTools) {
      const { expandedToolsDatabase } = await import('@/data/expandedToolsDatabase');
      targetTools = expandedToolsDatabase;
    }

    // 1. Intentar obtener recomendaciones avanzadas de IA
    try {
      const { data, error } = await supabase.functions.invoke('enhanced-recommendations', {
        body: { 
          userProfile: answers,
          tools: targetTools,
          userId 
        }
      });

      if (error) throw error;

      if (data?.recommendations?.length > 0) {
        console.log('AI-enhanced recommendations generated:', data.recommendations?.length);
        return {
          recommendations: data.recommendations,
          metadata: {
            algorithmVersion: '3.0-ai-enhanced',
            personalizedFactors: ['ai_analysis', 'user_profile', 'tool_compatibility'],
            totalToolsAnalyzed: targetTools.length,
            aiProvider: 'openai'
          }
        };
      }
    } catch (error) {
      console.warn('Enhanced recommendations failed, falling back to intelligent matching:', error);
    }

    // 2. Fallback al algoritmo inteligente mejorado
    return await generateAdvancedMatching(answers, targetTools, userId);

  } catch (error) {
    console.error('Error generating intelligent recommendations:', error);
    
    // Fallback final al algoritmo básico
    return await fallbackToBasicMatching(answers, targetTools || []);
  }
}

async function generateAdvancedMatching(
  answers: Record<string, any>, 
  tools: EnhancedTool[],
  userId?: string
): Promise<IntelligentRecommendationResult> {
  
  const recommendations = tools.map(tool => {
    let score = 0;
    const reasons = [];
    const scoreBreakdown = {
      functionality: 0,
      easeOfUse: 0,
      pricing: 0,
      scalability: 0,
      community: 0,
      personalized: 0
    };

    // 1. Análisis de funcionalidad (40% del score)
    if (answers.interests && tool.tags) {
      const matchingTags = answers.interests.filter((interest: string) => 
        tool.tags.some(tag => tag.toLowerCase().includes(interest.toLowerCase()))
      );
      if (matchingTags.length > 0) {
        const functionalityScore = (matchingTags.length / answers.interests.length) * 40;
        score += functionalityScore;
        scoreBreakdown.functionality = Math.round(functionalityScore);
        reasons.push(`Coincide con tus intereses: ${matchingTags.join(', ')}`);
      }
    }

    // 2. Análisis de facilidad de uso (30% del score)
    if (answers.skillLevel) {
      const complexityMap = { 'beginner': 1, 'intermediate': 2, 'advanced': 3, 'expert': 4 };
      const userLevel = complexityMap[answers.skillLevel as keyof typeof complexityMap] || 1;
      const toolLevel = complexityMap[tool.complexity] || 1;
      
      let easeScore = 0;
      if (Math.abs(userLevel - toolLevel) === 0) {
        easeScore = 30; // Perfecta coincidencia
        reasons.push(`Perfecto para tu nivel: ${answers.skillLevel}`);
      } else if (Math.abs(userLevel - toolLevel) === 1) {
        easeScore = 20; // Buena coincidencia
        reasons.push(`Apropiado para tu nivel: ${answers.skillLevel}`);
      } else if (userLevel > toolLevel) {
        easeScore = 15; // Puede ser muy fácil
        reasons.push('Herramienta fácil de dominar para tu experiencia');
      }
      
      score += easeScore;
      scoreBreakdown.easeOfUse = easeScore;
    }

    // 3. Análisis de presupuesto (20% del score)
    let pricingScore = 0;
    if (answers.budgetRange === 'low' && tool.freeVersion) {
      pricingScore = 20;
      reasons.push('Tiene versión gratuita disponible');
    } else if (answers.budgetRange === 'medium' && tool.pricing.includes('$')) {
      pricingScore = 15;
      reasons.push('Precio accesible para tu presupuesto');
    } else if (answers.budgetRange === 'high') {
      pricingScore = 10;
      reasons.push('Herramienta premium que se ajusta a tu presupuesto');
    }
    score += pricingScore;
    scoreBreakdown.pricing = pricingScore;

    // 4. Análisis de escalabilidad (10% del score)
    if (answers.projectType === 'enterprise' && tool.category.includes('Enterprise')) {
      const scalabilityScore = 10;
      score += scalabilityScore;
      scoreBreakdown.scalability = scalabilityScore;
      reasons.push('Diseñada para proyectos empresariales');
    } else if (answers.projectType === 'startup' && tool.tags?.includes('startup')) {
      const scalabilityScore = 8;
      score += scalabilityScore;
      scoreBreakdown.scalability = scalabilityScore;
      reasons.push('Ideal para startups y crecimiento rápido');
    }

    // 5. Factor de comunidad y popularidad
    if (tool.rating && tool.rating > 4.5) {
      const communityScore = 5;
      score += communityScore;
      scoreBreakdown.community = communityScore;
      reasons.push('Altamente valorada por la comunidad');
    }

    // 6. Factor personalizado para usuarios registrados
    if (userId && tool.category === answers.primaryFocus) {
      const personalizedScore = 5;
      score += personalizedScore;
      scoreBreakdown.personalized = personalizedScore;
      reasons.push('Recomendada basada en tu perfil');
    }

    return {
      tool,
      matchPercentage: Math.min(Math.round(score), 100),
      reasons: reasons.slice(0, 3), // Máximo 3 razones principales
      scoreBreakdown,
      confidence: score > 70 ? 0.9 : score > 50 ? 0.8 : 0.7
    };
  }).sort((a, b) => b.matchPercentage - a.matchPercentage);

  return {
    recommendations: recommendations.slice(0, 20), // Top 20 recomendaciones
    metadata: {
      algorithmVersion: '2.5-advanced',
      personalizedFactors: ['interests', 'skill_level', 'budget', 'project_type'],
      totalToolsAnalyzed: tools.length
    }
  };
}

async function fallbackToBasicMatching(
  answers: Record<string, any>, 
  tools: EnhancedTool[]
): Promise<IntelligentRecommendationResult> {
  // Algoritmo básico como último recurso
  const basicMatches = tools.map(tool => {
    let score = 0;
    const reasons = [];

    // Matching básico por intereses
    if (answers.interests && tool.tags) {
      const matchingTags = answers.interests.filter((interest: string) => 
        tool.tags.some(tag => tag.toLowerCase().includes(interest.toLowerCase()))
      );
      if (matchingTags.length > 0) {
        score += (matchingTags.length / answers.interests.length) * 60;
        reasons.push(`Coincide con: ${matchingTags.join(', ')}`);
      }
    }

    // Matching por complejidad
    if (answers.skillLevel) {
      const complexityMap = { 'beginner': 1, 'intermediate': 2, 'advanced': 3, 'expert': 4 };
      const userLevel = complexityMap[answers.skillLevel as keyof typeof complexityMap] || 1;
      const toolLevel = complexityMap[tool.complexity] || 1;
      
      if (Math.abs(userLevel - toolLevel) <= 1) {
        score += 30;
        reasons.push(`Apropiado para ${answers.skillLevel}`);
      }
    }

    // Matching por presupuesto
    if (answers.budgetRange === 'low' && tool.freeVersion) {
      score += 10;
      reasons.push('Versión gratuita disponible');
    }

    return {
      tool,
      matchPercentage: Math.min(Math.round(score), 100),
      reasons,
      scoreBreakdown: {
        functionality: Math.round(score * 0.6),
        easeOfUse: Math.round(score * 0.3),
        pricing: Math.round(score * 0.1),
        scalability: 0,
        community: 0,
        personalized: 0
      },
      confidence: 0.6 // Menor confianza para el algoritmo básico
    };
  }).sort((a, b) => b.matchPercentage - a.matchPercentage);

  return {
    recommendations: basicMatches.slice(0, 15),
    metadata: {
      algorithmVersion: '1.0-basic',
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
    const { expandedToolsDatabase } = await import('@/data/expandedToolsDatabase');
    const targetTool = expandedToolsDatabase.find(t => t.id === toolId);
    
    if (!targetTool) return [];
    
    // Buscar herramientas similares por categoría y tags
    return expandedToolsDatabase
      .filter(tool => 
        tool.id !== toolId && 
        (tool.category === targetTool.category ||
         tool.tags.some(tag => targetTool.tags.includes(tag)))
      )
      .slice(0, limit);
      
  } catch (error) {
    console.error('Error finding similar tools:', error);
    return [];
  }
}

export async function updateUserFeedback(
  userId: string,
  toolId: string,
  feedbackType: 'like' | 'dislike' | 'use' | 'save',
  metadata?: Record<string, any>
): Promise<void> {
  try {
    if (feedbackType === 'save') {
      const { error } = await supabase
        .from('user_favorite_tools')
        .upsert({
          user_id: userId,
          tool_name: toolId,
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

  if (scoreBreakdown.functionality > 25) {
    explanations.push('Coincide perfectamente con tus intereses');
  }
  
  if (scoreBreakdown.easeOfUse > 20) {
    explanations.push('Muy fácil de usar para tu nivel');
  }
  
  if (scoreBreakdown.pricing > 15) {
    explanations.push('Se ajusta a tu presupuesto');
  }
  
  if (scoreBreakdown.personalized > 0) {
    explanations.push('Recomendado basado en tu perfil');
  }

  return explanations.join('. ') || 'Herramienta recomendada para tu perfil';
}
