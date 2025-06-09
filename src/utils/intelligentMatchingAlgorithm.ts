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
  detailedDescription?: string;
  freeVersionDetails?: {
    available: boolean;
    limitations?: string;
    upgradeReasons?: string[];
  };
}

export interface IntelligentRecommendationResult {
  recommendations: IntelligentToolMatch[];
  metadata: {
    algorithmVersion: string;
    personalizedFactors: string[];
    totalToolsAnalyzed: number;
    aiProvider?: string;
    fallbackUsed?: boolean;
    fallbackReason?: string;
  };
}

export async function generateIntelligentRecommendations(
  answers: Record<string, any>,
  userId?: string,
  tools?: EnhancedTool[]
): Promise<IntelligentRecommendationResult> {
  const startTime = Date.now();
  console.log('🚀 Starting intelligent recommendations generation...', { 
    userId, 
    toolsCount: tools?.length,
    answers: Object.keys(answers) 
  });

  try {
    // Si no se proporcionan herramientas, usar las de la base de datos expandida
    let targetTools = tools;
    if (!targetTools) {
      const { expandedToolsDatabase } = await import('@/data/expandedToolsDatabase');
      targetTools = expandedToolsDatabase;
      console.log('📊 Loaded tools database:', targetTools.length, 'tools');
    }

    // 1. Intentar obtener recomendaciones avanzadas de IA
    try {
      console.log('🤖 Attempting AI-enhanced recommendations...');
      const { data, error } = await supabase.functions.invoke('enhanced-recommendations', {
        body: { 
          userProfile: answers,
          tools: targetTools,
          userId 
        }
      });

      if (error) {
        console.warn('⚠️ AI-enhanced recommendations failed:', error);
        throw error;
      }

      if (data?.recommendations?.length > 0) {
        const processingTime = Date.now() - startTime;
        console.log('✅ AI-enhanced recommendations generated:', {
          count: data.recommendations.length,
          processingTime: `${processingTime}ms`
        });
        
        return {
          recommendations: enhanceRecommendations(data.recommendations),
          metadata: {
            algorithmVersion: '3.0-ai-enhanced',
            personalizedFactors: ['ai_analysis', 'user_profile', 'tool_compatibility'],
            totalToolsAnalyzed: targetTools.length,
            aiProvider: 'openai'
          }
        };
      }
    } catch (error) {
      console.warn('⚠️ Enhanced recommendations failed, falling back to intelligent matching:', error);
    }

    // 2. Fallback al algoritmo inteligente mejorado
    console.log('🔄 Using advanced matching fallback...');
    return await generateAdvancedMatching(answers, targetTools, userId);

  } catch (error) {
    console.error('❌ Error generating intelligent recommendations:', error);
    
    // Fallback final al algoritmo básico con mejor lógica
    const { expandedToolsDatabase } = await import('@/data/expandedToolsDatabase');
    const finalTools = tools || expandedToolsDatabase;
    console.log('🆘 Using basic matching as final fallback...');
    
    return await fallbackToBasicMatching(answers, finalTools, 'error-recovery');
  }
}

async function generateAdvancedMatching(
  answers: Record<string, any>, 
  tools: EnhancedTool[],
  userId?: string
): Promise<IntelligentRecommendationResult> {
  
  console.log('🧠 Advanced matching analysis started...', {
    toolsCount: tools.length,
    userAnswers: Object.keys(answers)
  });

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
        tool.tags.some(tag => tag.toLowerCase().includes(interest.toLowerCase())) ||
        tool.category.toLowerCase().includes(interest.toLowerCase())
      );
      if (matchingTags.length > 0) {
        const functionalityScore = Math.min((matchingTags.length / answers.interests.length) * 40, 40);
        score += functionalityScore;
        scoreBreakdown.functionality = Math.round(functionalityScore);
        reasons.push(`Coincide perfectamente con: ${matchingTags.slice(0, 2).join(', ')}`);
      }
    }

    // Bonus por coincidencia de categoría con tipo de proyecto
    if (answers.projectType && tool.category.toLowerCase().includes(answers.projectType.toLowerCase())) {
      const categoryBonus = 10;
      score += categoryBonus;
      scoreBreakdown.functionality += categoryBonus;
      reasons.push(`Especializada en proyectos de ${answers.projectType}`);
    }

    // 2. Análisis de facilidad de uso (30% del score)
    if (answers.skillLevel) {
      const complexityMap = { 'beginner': 1, 'intermediate': 2, 'advanced': 3, 'expert': 4 };
      const userLevel = complexityMap[answers.skillLevel as keyof typeof complexityMap] || 1;
      const toolLevel = complexityMap[tool.complexity] || 1;
      
      let easeScore = 0;
      if (Math.abs(userLevel - toolLevel) === 0) {
        easeScore = 30; // Perfecta coincidencia
        reasons.push(`Perfecto para tu nivel ${answers.skillLevel}`);
      } else if (Math.abs(userLevel - toolLevel) === 1) {
        easeScore = 22; // Buena coincidencia
        reasons.push(`Excelente opción para tu experiencia`);
      } else if (userLevel > toolLevel) {
        easeScore = 18; // Puede ser muy fácil
        reasons.push('Fácil de dominar con tu experiencia');
      } else {
        easeScore = 10; // Puede ser desafiante
        reasons.push('Herramienta poderosa que expandirá tus habilidades');
      }
      
      score += easeScore;
      scoreBreakdown.easeOfUse = easeScore;
    }

    // 3. Análisis de presupuesto mejorado (20% del score)
    let pricingScore = 0;
    const freeVersionDetails = {
      available: tool.freeVersion || false,
      limitations: '',
      upgradeReasons: [] as string[]
    };

    if (answers.budgetRange === 'low') {
      if (tool.freeVersion) {
        pricingScore = 20;
        reasons.push('Versión gratuita completa disponible');
        freeVersionDetails.limitations = 'Funcionalidades básicas incluidas';
        freeVersionDetails.upgradeReasons = ['Más integraciones', 'Soporte prioritario', 'Funciones avanzadas'];
      } else if (tool.pricing && tool.pricing.toLowerCase().includes('$9') || tool.pricing.toLowerCase().includes('$10')) {
        pricingScore = 15;
        reasons.push('Precio muy accesible para tu presupuesto');
      } else {
        pricingScore = 5;
      }
    } else if (answers.budgetRange === 'medium') {
      if (tool.pricing && (tool.pricing.includes('$') || tool.pricing.toLowerCase().includes('mensual'))) {
        pricingScore = 18;
        reasons.push('Excelente relación calidad-precio');
      } else {
        pricingScore = 12;
      }
    } else if (answers.budgetRange === 'high') {
      pricingScore = 15;
      reasons.push('Herramienta premium que maximiza tu inversión');
    }
    
    score += pricingScore;
    scoreBreakdown.pricing = pricingScore;

    // 4. Análisis de escalabilidad mejorado (10% del score)
    let scalabilityScore = 0;
    if (answers.projectType === 'enterprise' || answers.timeline === 'long-term') {
      if (tool.apiAvailable) {
        scalabilityScore = 10;
        reasons.push('API robusta para integraciones empresariales');
      } else if (tool.category.includes('Enterprise') || tool.pricing.includes('Enterprise')) {
        scalabilityScore = 8;
        reasons.push('Diseñada para crecer con tu empresa');
      }
    } else if (answers.projectType === 'startup') {
      if (tool.freeVersion && tool.apiAvailable) {
        scalabilityScore = 8;
        reasons.push('Perfecta para escalar desde startup');
      }
    }
    score += scalabilityScore;
    scoreBreakdown.scalability = scalabilityScore;

    // 5. Factor de comunidad y popularidad mejorado
    let communityScore = 0;
    if (tool.user_rating && tool.user_rating > 4.5) {
      communityScore = 8;
      reasons.push(`Excelentemente valorada (${tool.user_rating}⭐)`);
    } else if (tool.user_rating && tool.user_rating > 4.0) {
      communityScore = 5;
      reasons.push(`Muy bien valorada por usuarios`);
    }
    score += communityScore;
    scoreBreakdown.community = communityScore;

    // 6. Factor personalizado mejorado para usuarios registrados
    let personalizedScore = 0;
    if (userId) {
      if (tool.category === answers.primaryFocus) {
        personalizedScore = 8;
        reasons.push('Recomendada específicamente para tu perfil');
      } else if (answers.urgency === 'high' && tool.complexity === 'beginner') {
        personalizedScore = 6;
        reasons.push('Implementación rápida para tu timeline');
      }
    }
    score += personalizedScore;
    scoreBreakdown.personalized = personalizedScore;

    // Generar descripción detallada
    const detailedDescription = generateDetailedDescription(tool, answers, reasons);

    return {
      tool,
      matchPercentage: Math.min(Math.round(score), 100),
      reasons: reasons.slice(0, 3), // Top 3 razones más relevantes
      scoreBreakdown,
      confidence: score > 70 ? 0.95 : score > 50 ? 0.85 : score > 30 ? 0.75 : 0.6,
      detailedDescription,
      freeVersionDetails
    };
  }).sort((a, b) => b.matchPercentage - a.matchPercentage);

  // Filtrar recomendaciones con score muy bajo
  const filteredRecommendations = recommendations.filter(rec => rec.matchPercentage > 15);
  
  console.log('📈 Advanced matching completed:', {
    totalAnalyzed: tools.length,
    qualityRecommendations: filteredRecommendations.length,
    topScore: filteredRecommendations[0]?.matchPercentage || 0
  });

  // Si muy pocas recomendaciones de calidad, usar fallback inteligente
  if (filteredRecommendations.length < 5) {
    console.log('⚠️ Low quality recommendations detected, applying intelligent fallback...');
    const fallbackResults = await applyIntelligentFallback(answers, tools);
    return {
      recommendations: [...filteredRecommendations, ...fallbackResults].slice(0, 20),
      metadata: {
        algorithmVersion: '2.5-advanced-with-fallback',
        personalizedFactors: ['interests', 'skill_level', 'budget', 'project_type', 'intelligent_fallback'],
        totalToolsAnalyzed: tools.length,
        fallbackUsed: true,
        fallbackReason: 'insufficient_quality_matches'
      }
    };
  }

  return {
    recommendations: filteredRecommendations.slice(0, 20),
    metadata: {
      algorithmVersion: '2.5-advanced',
      personalizedFactors: ['interests', 'skill_level', 'budget', 'project_type'],
      totalToolsAnalyzed: tools.length
    }
  };
}

async function applyIntelligentFallback(
  answers: Record<string, any>, 
  tools: EnhancedTool[]
): Promise<IntelligentToolMatch[]> {
  
  console.log('🔄 Applying intelligent fallback logic...');
  
  // Estrategia 1: Herramientas populares por categorías relacionadas
  const relatedCategories = getRelatedCategories(answers.interests || [], answers.projectType);
  const popularInCategories = tools
    .filter(tool => relatedCategories.some(cat => tool.category.toLowerCase().includes(cat.toLowerCase())))
    .filter(tool => tool.user_rating && tool.user_rating > 4.0)
    .sort((a, b) => (b.user_rating || 0) - (a.user_rating || 0))
    .slice(0, 6);

  // Estrategia 2: Herramientas para principiantes si el nivel es bajo
  const beginnerFriendly = answers.skillLevel === 'beginner' 
    ? tools.filter(tool => tool.complexity === 'beginner' && tool.freeVersion).slice(0, 4)
    : [];

  // Estrategia 3: Herramientas gratuitas si el presupuesto es bajo
  const budgetFriendly = answers.budgetRange === 'low'
    ? tools.filter(tool => tool.freeVersion).slice(0, 5)
    : [];

  const fallbackTools = [...new Set([...popularInCategories, ...beginnerFriendly, ...budgetFriendly])];
  
  console.log('📋 Fallback strategies applied:', {
    relatedCategories: popularInCategories.length,
    beginnerFriendly: beginnerFriendly.length,
    budgetFriendly: budgetFriendly.length,
    totalFallback: fallbackTools.length
  });

  return fallbackTools.map(tool => ({
    tool,
    matchPercentage: 45, // Score moderado para fallback
    reasons: [`Herramienta popular y confiable`, `Recomendada para tu perfil`],
    scoreBreakdown: {
      functionality: 20,
      easeOfUse: 15,
      pricing: 10,
      scalability: 0,
      community: 0,
      personalized: 0
    },
    confidence: 0.6,
    detailedDescription: `${tool.description} - Seleccionada como alternativa confiable basada en popularidad y compatibilidad general.`,
    freeVersionDetails: {
      available: tool.freeVersion || false,
      limitations: tool.freeVersion ? 'Funciones básicas incluidas' : 'Versión de prueba disponible',
      upgradeReasons: ['Funciones avanzadas', 'Soporte técnico', 'Integraciones adicionales']
    }
  }));
}

async function fallbackToBasicMatching(
  answers: Record<string, any>, 
  tools: EnhancedTool[],
  fallbackReason: string = 'general-fallback'
): Promise<IntelligentRecommendationResult> {
  
  console.log('🆘 Basic matching fallback initiated:', { fallbackReason, toolsCount: tools.length });
  
  // Algoritmo básico pero mejorado
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
        reasons.push(`Relacionada con: ${matchingTags.slice(0, 2).join(', ')}`);
      }
    }

    // Matching por complejidad
    if (answers.skillLevel) {
      const complexityMap = { 'beginner': 1, 'intermediate': 2, 'advanced': 3, 'expert': 4 };
      const userLevel = complexityMap[answers.skillLevel as keyof typeof complexityMap] || 1;
      const toolLevel = complexityMap[tool.complexity] || 1;
      
      if (Math.abs(userLevel - toolLevel) <= 1) {
        score += 25;
        reasons.push(`Apropiada para nivel ${answers.skillLevel}`);
      }
    }

    // Matching por presupuesto
    if (answers.budgetRange === 'low' && tool.freeVersion) {
      score += 15;
      reasons.push('Tiene versión gratuita');
    }

    // Boost para herramientas populares si score es bajo
    if (score < 30 && tool.user_rating && tool.user_rating > 4.0) {
      score += 20;
      reasons.push('Herramienta popular y confiable');
    }

    return {
      tool,
      matchPercentage: Math.min(Math.round(score), 100),
      reasons: reasons.length > 0 ? reasons : ['Opción recomendada'],
      scoreBreakdown: {
        functionality: Math.round(score * 0.6),
        easeOfUse: Math.round(score * 0.3),
        pricing: Math.round(score * 0.1),
        scalability: 0,
        community: 0,
        personalized: 0
      },
      confidence: 0.5, // Menor confianza para el algoritmo básico
      detailedDescription: tool.description,
      freeVersionDetails: {
        available: tool.freeVersion || false,
        limitations: 'Información limitada disponible',
        upgradeReasons: ['Funciones premium']
      }
    };
  }).sort((a, b) => b.matchPercentage - a.matchPercentage);

  // Asegurar al menos 10 recomendaciones usando herramientas populares
  const minRecommendations = 10;
  const topMatches = basicMatches.slice(0, 8);
  
  if (topMatches.length < minRecommendations) {
    const popularTools = tools
      .filter(tool => tool.user_rating && tool.user_rating > 4.0)
      .filter(tool => !topMatches.some(match => match.tool.id === tool.id))
      .slice(0, minRecommendations - topMatches.length)
      .map(tool => ({
        tool,
        matchPercentage: 35,
        reasons: ['Herramienta popular', 'Recomendación general'],
        scoreBreakdown: {
          functionality: 20,
          easeOfUse: 10,
          pricing: 5,
          scalability: 0,
          community: 0,
          personalized: 0
        },
        confidence: 0.4,
        detailedDescription: tool.description,
        freeVersionDetails: {
          available: tool.freeVersion || false,
          limitations: 'Consultar detalles específicos',
          upgradeReasons: ['Funciones avanzadas']
        }
      }));
    
    topMatches.push(...popularTools);
  }

  console.log('✅ Basic matching completed:', {
    totalRecommendations: topMatches.length,
    fallbackReason
  });

  return {
    recommendations: topMatches.slice(0, 15),
    metadata: {
      algorithmVersion: '1.0-basic-enhanced',
      personalizedFactors: ['basic_matching', 'popularity_boost'],
      totalToolsAnalyzed: tools.length,
      fallbackUsed: true,
      fallbackReason
    }
  };
}

function generateDetailedDescription(
  tool: EnhancedTool, 
  answers: Record<string, any>, 
  reasons: string[]
): string {
  const baseDescription = tool.description;
  const useCase = answers.projectType ? ` Ideal para proyectos de ${answers.projectType}.` : '';
  const skillLevel = answers.skillLevel ? ` Perfecta para usuarios de nivel ${answers.skillLevel}.` : '';
  const mainReason = reasons.length > 0 ? ` ${reasons[0]}.` : '';
  
  return `${baseDescription}${useCase}${skillLevel}${mainReason}`;
}

function getRelatedCategories(interests: string[], projectType?: string): string[] {
  const categoryMap: Record<string, string[]> = {
    'marketing': ['Marketing', 'Social Media', 'Content', 'Email'],
    'automation': ['Automation', 'Workflow', 'Integration', 'Productivity'],
    'customer': ['Customer', 'Support', 'CRM', 'Communication'],
    'design': ['Design', 'Creative', 'Visual', 'Prototyping'],
    'development': ['Development', 'Code', 'Programming', 'API'],
    'analytics': ['Analytics', 'Data', 'Reporting', 'Intelligence'],
    'ecommerce': ['E-commerce', 'Sales', 'Store', 'Payment']
  };

  const allInterests = [...interests];
  if (projectType) allInterests.push(projectType);

  const relatedCategories = new Set<string>();
  
  allInterests.forEach(interest => {
    Object.entries(categoryMap).forEach(([key, categories]) => {
      if (interest.toLowerCase().includes(key) || categories.some(cat => 
        interest.toLowerCase().includes(cat.toLowerCase())
      )) {
        categories.forEach(cat => relatedCategories.add(cat));
      }
    });
  });

  return Array.from(relatedCategories);
}

function enhanceRecommendations(recommendations: IntelligentToolMatch[]): IntelligentToolMatch[] {
  return recommendations.map(rec => ({
    ...rec,
    detailedDescription: rec.detailedDescription || generateDetailedDescription(rec.tool, {}, rec.reasons),
    freeVersionDetails: rec.freeVersionDetails || {
      available: rec.tool.freeVersion || false,
      limitations: rec.tool.freeVersion ? 'Funciones básicas incluidas' : 'Versión de prueba limitada',
      upgradeReasons: ['Funciones avanzadas', 'Soporte prioritario', 'Integraciones premium']
    }
  }));
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
    explanations.push('Recomendada basada en tu perfil');
  }

  return explanations.join('. ') || 'Herramienta recomendada para tu perfil';
}
