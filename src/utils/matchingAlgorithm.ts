
import { expandedAiTools } from "@/data/expandedAiTools";

export interface Tool {
  id: string;
  name: string;
  category: string;
  description: string;
  pricing: string;
  complexity: string;
  tags: string[];
  logoPlaceholder: string;
  website: string;
  apiAvailable: boolean;
  freeVersion: boolean;
}

export interface ToolMatch {
  tool: Tool;
  matchPercentage: number;
  reasons: string[];
}

export const calculateToolMatches = (answers: Record<string, any>): ToolMatch[] => {
  console.log('Calculating tool matches with expanded database:', { answers });
  
  const matches: ToolMatch[] = expandedAiTools.map((tool) => {
    let score = 0;
    const reasons: string[] = [];
    const maxScore = 100;

    // Interest/Category matching (25 points)
    if (answers.interests && Array.isArray(answers.interests)) {
      const categoryMatch = getCategoryFromInterests(answers.interests);
      if (categoryMatch.includes(tool.category) || tool.category.includes(categoryMatch)) {
        score += 25;
        reasons.push(`Coincide con tu interés en ${tool.category.toLowerCase()}`);
      }
    }

    // Skill level matching (20 points)
    if (answers.skillLevel) {
      const skillMatch = getSkillMatch(answers.skillLevel, tool.complexity);
      score += skillMatch.score;
      if (skillMatch.score > 0) {
        reasons.push(skillMatch.reason);
      }
    }

    // Budget matching (25 points)
    if (answers.budgetRange) {
      const budgetMatch = getBudgetMatch(answers.budgetRange, tool.pricing, tool.freeVersion);
      score += budgetMatch.score;
      if (budgetMatch.score > 0) {
        reasons.push(budgetMatch.reason);
      }
    }

    // Project type matching (15 points)
    if (answers.projectType) {
      const projectMatch = getProjectTypeMatch(answers.projectType, tool.category, tool.tags);
      score += projectMatch.score;
      if (projectMatch.score > 0) {
        reasons.push(projectMatch.reason);
      }
    }

    // Technical expertise matching (10 points)
    if (answers.technicalExpertise) {
      const techMatch = getTechnicalMatch(answers.technicalExpertise, tool.complexity, tool.apiAvailable);
      score += techMatch.score;
      if (techMatch.score > 0) {
        reasons.push(techMatch.reason);
      }
    }

    // Timeline urgency matching (5 points)
    if (answers.urgency) {
      const urgencyMatch = getUrgencyMatch(answers.urgency, tool.complexity, tool.freeVersion);
      score += urgencyMatch.score;
      if (urgencyMatch.score > 0) {
        reasons.push(urgencyMatch.reason);
      }
    }

    // Ensure minimum reasons
    if (reasons.length === 0) {
      reasons.push(`Herramienta ${tool.category.toLowerCase()} popular y confiable`);
    }

    return {
      tool,
      matchPercentage: Math.min(Math.round(score), 100),
      reasons: reasons.slice(0, 3) // Limit to 3 most important reasons
    };
  });

  // Sort by match percentage and return top matches
  return matches
    .sort((a, b) => b.matchPercentage - a.matchPercentage)
    .slice(0, 20); // Return top 20 matches
};

const getCategoryFromInterests = (interests: string[]): string => {
  const categoryMapping: Record<string, string> = {
    'writing': 'AI Writing & Content',
    'content-creation': 'AI Writing & Content',
    'programming': 'AI Code Assistant',
    'development': 'AI Code Assistant',
    'design': 'AI Image & Video',
    'graphics': 'AI Image & Video',
    'business': 'AI Business & Sales',
    'sales': 'AI Business & Sales',
    'marketing': 'AI Business & Sales',
    'research': 'AI Research & Analysis',
    'analysis': 'AI Data & Analytics',
    'productivity': 'AI Productivity & Automation',
    'automation': 'AI Productivity & Automation',
    'audio': 'AI Audio & Voice',
    'voice': 'AI Audio & Voice',
    'translation': 'AI Translation & Language',
    'language': 'AI Translation & Language',
    'education': 'AI Education & Learning',
    'learning': 'AI Education & Learning'
  };

  for (const interest of interests) {
    if (categoryMapping[interest]) {
      return categoryMapping[interest];
    }
  }
  
  return 'AI Productivity & Automation'; // Default fallback
};

const getSkillMatch = (skillLevel: string, toolComplexity: string) => {
  const skillLevels = ['beginner', 'intermediate', 'advanced', 'expert'];
  const userLevel = skillLevels.indexOf(skillLevel);
  const toolLevel = skillLevels.indexOf(toolComplexity);
  
  if (userLevel === -1 || toolLevel === -1) {
    return { score: 5, reason: 'Nivel de complejidad neutro' };
  }
  
  const levelDiff = Math.abs(userLevel - toolLevel);
  
  if (levelDiff === 0) {
    return { score: 20, reason: `Perfecta para tu nivel ${skillLevel}` };
  } else if (levelDiff === 1) {
    return { score: 15, reason: `Adecuada para tu experiencia ${skillLevel}` };
  } else if (levelDiff === 2) {
    return { score: 8, reason: `Puede ser un desafío pero accesible` };
  } else {
    return { score: 2, reason: 'Nivel de complejidad muy diferente' };
  }
};

const getBudgetMatch = (budgetRange: string, pricing: string, freeVersion: boolean) => {
  const lowerPricing = pricing.toLowerCase();
  
  switch (budgetRange) {
    case 'free':
      if (freeVersion || lowerPricing.includes('gratis') || lowerPricing.includes('free')) {
        return { score: 25, reason: 'Disponible gratuitamente' };
      }
      return { score: 0, reason: '' };
    
    case 'low':
      if (freeVersion || lowerPricing.includes('$1') || lowerPricing.includes('$5') || 
          lowerPricing.includes('$10') || lowerPricing.includes('$20')) {
        return { score: 25, reason: 'Dentro de tu rango de presupuesto bajo' };
      }
      return { score: 10, reason: 'Precio moderado pero fuera del rango óptimo' };
    
    case 'medium':
      if (lowerPricing.includes('$') && (
          lowerPricing.includes('50') || lowerPricing.includes('100') || 
          lowerPricing.includes('200'))) {
        return { score: 25, reason: 'Precio perfecto para tu presupuesto medio' };
      }
      return { score: 15, reason: 'Precio razonable para tu presupuesto' };
    
    case 'high':
    case 'enterprise':
      return { score: 20, reason: 'Solución premium acorde a tu presupuesto' };
    
    default:
      return { score: 10, reason: 'Precio competitivo en el mercado' };
  }
};

const getProjectTypeMatch = (projectType: string, category: string, tags: string[]) => {
  const projectMappings: Record<string, string[]> = {
    'business': ['AI Business & Sales', 'AI Productivity & Automation', 'AI Data & Analytics'],
    'creative': ['AI Writing & Content', 'AI Image & Video', 'AI Audio & Voice'],
    'technical': ['AI Code Assistant', 'AI Data & Analytics', 'AI Research & Analysis'],
    'educational': ['AI Education & Learning', 'AI Research & Analysis', 'AI Writing & Content'],
    'personal': ['AI Productivity & Automation', 'AI Writing & Content', 'AI Translation & Language']
  };

  const relevantCategories = projectMappings[projectType] || [];
  
  if (relevantCategories.includes(category)) {
    return { score: 15, reason: `Ideal para proyectos de tipo ${projectType}` };
  }
  
  // Check tags for additional matches
  const projectTags = tags.some(tag => 
    tag.includes(projectType) || 
    (projectType === 'business' && (tag.includes('empresa') || tag.includes('negocio'))) ||
    (projectType === 'creative' && (tag.includes('creativ') || tag.includes('diseño')))
  );
  
  if (projectTags) {
    return { score: 10, reason: `Útil para proyectos ${projectType}` };
  }
  
  return { score: 0, reason: '' };
};

const getTechnicalMatch = (techExpertise: string, complexity: string, apiAvailable: boolean) => {
  if (techExpertise === 'expert' && apiAvailable) {
    return { score: 10, reason: 'API disponible para integración avanzada' };
  }
  
  if (techExpertise === 'beginner' && complexity === 'beginner') {
    return { score: 10, reason: 'Fácil de usar para principiantes' };
  }
  
  if (techExpertise === 'intermediate' && ['beginner', 'intermediate'].includes(complexity)) {
    return { score: 8, reason: 'Nivel técnico apropiado' };
  }
  
  return { score: 3, reason: 'Funcionalidad técnica estándar' };
};

const getUrgencyMatch = (urgency: string, complexity: string, freeVersion: boolean) => {
  if (urgency === 'immediate' && complexity === 'beginner' && freeVersion) {
    return { score: 5, reason: 'Rápido de implementar' };
  }
  
  if (urgency === 'flexible' && complexity === 'advanced') {
    return { score: 3, reason: 'Tiempo suficiente para dominar la herramienta' };
  }
  
  return { score: 1, reason: '' };
};

export const filterTools = (matches: ToolMatch[], filters: Record<string, string>): ToolMatch[] => {
  return matches.filter(match => {
    const { tool } = match;
    
    // Category filter
    if (filters.category && tool.category !== filters.category) {
      return false;
    }
    
    // Price range filter
    if (filters.priceRange) {
      const priceMatches = getBudgetMatch(filters.priceRange, tool.pricing, tool.freeVersion);
      if (priceMatches.score === 0 && filters.priceRange === 'free') {
        return false;
      }
    }
    
    // Complexity level filter
    if (filters.complexityLevel && tool.complexity !== filters.complexityLevel) {
      return false;
    }
    
    return true;
  });
};
