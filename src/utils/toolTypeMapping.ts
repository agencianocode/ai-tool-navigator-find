
import { Tool } from './matchingAlgorithm';

// Interface that matches what ToolActions expects
export interface AITool {
  id: string;
  name: string;
  category: string;
  description: string;
  pricing: string;
  complexity: string;
  complexityLevel: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  tags: string[];
  logoPlaceholder: string;
  website: string;
  apiAvailable: boolean;
  freeVersion: boolean;
  useCases: string[];
  projectTypes: string[];
  budgetRange: string[];
  features: string[];
  timelineTypes: string[];
  targetAudience: string[];
}

// Function to convert Tool to AITool format
export const convertToolToAITool = (tool: Tool): AITool => {
  // Map complexity to complexityLevel for backward compatibility
  const getComplexityLevel = (complexity: string): 'beginner' | 'intermediate' | 'advanced' | 'expert' => {
    switch(complexity.toLowerCase()) {
      case 'beginner': return 'beginner';
      case 'intermediate': return 'intermediate';
      case 'advanced': return 'advanced';
      case 'expert': return 'expert';
      default: return 'intermediate'; // Default fallback
    }
  };

  // Generate use cases based on category and tags
  const getUseCases = (category: string, tags: string[]): string[] => {
    const baseCases = [];
    
    switch (category) {
      case 'AI Writing & Content':
        baseCases.push('Crear contenido de marketing', 'Escribir blogs', 'Generar copys');
        break;
      case 'AI Code Assistant':
        baseCases.push('Acelerar desarrollo', 'Debugging automático', 'Completado de código');
        break;
      case 'AI Image & Video':
        baseCases.push('Crear imágenes', 'Edición visual', 'Contenido creativo');
        break;
      case 'AI Business & Sales':
        baseCases.push('Automatizar ventas', 'Análisis de leads', 'CRM inteligente');
        break;
      default:
        baseCases.push('Automatización', 'Productividad', 'Eficiencia');
    }

    // Add specific use cases based on tags
    tags.forEach(tag => {
      if (tag.includes('API') && !baseCases.includes('Integración API')) {
        baseCases.push('Integración API');
      }
      if (tag.includes('automation') && !baseCases.includes('Automatización de procesos')) {
        baseCases.push('Automatización de procesos');
      }
    });

    return baseCases.slice(0, 3); // Limit to 3 use cases
  };

  // Generate project types based on category
  const getProjectTypes = (category: string): string[] => {
    switch (category) {
      case 'AI Writing & Content':
        return ['content-creation', 'marketing', 'business'];
      case 'AI Code Assistant':
        return ['technical', 'development', 'automation'];
      case 'AI Image & Video':
        return ['creative', 'design', 'marketing'];
      case 'AI Business & Sales':
        return ['business', 'sales', 'automation'];
      case 'AI Research & Analysis':
        return ['research', 'analysis', 'academic'];
      case 'AI Productivity & Automation':
        return ['productivity', 'automation', 'business'];
      default:
        return ['general', 'productivity'];
    }
  };

  // Generate budget range based on pricing - return as array
  const getBudgetRange = (pricing: string): string[] => {
    const lowerPricing = pricing.toLowerCase();
    if (lowerPricing.includes('gratis') || lowerPricing.includes('free')) {
      return ['free'];
    }
    if (lowerPricing.includes('$1') || lowerPricing.includes('$5') || lowerPricing.includes('$10')) {
      return ['low'];
    }
    if (lowerPricing.includes('$50') || lowerPricing.includes('$100')) {
      return ['medium'];
    }
    if (lowerPricing.includes('$200') || lowerPricing.includes('$500')) {
      return ['high'];
    }
    return ['enterprise'];
  };

  // Generate features based on tags and properties
  const getFeatures = (tool: Tool): string[] => {
    const features = [];
    
    if (tool.freeVersion) features.push('Versión gratuita');
    if (tool.apiAvailable) features.push('API disponible');
    
    // Add features based on tags
    tool.tags.forEach(tag => {
      if (tag.includes('colabora')) features.push('Colaboración en equipo');
      if (tag.includes('template')) features.push('Templates predefinidos');
      if (tag.includes('analytic') || tag.includes('análisis')) features.push('Analytics avanzado');
      if (tag.includes('integra')) features.push('Integraciones múltiples');
    });

    // Add default features if none found
    if (features.length === 0) {
      features.push('Interfaz intuitiva', 'Soporte técnico');
    }

    return features.slice(0, 4); // Limit to 4 features
  };

  // Generate timeline types based on category and complexity
  const getTimelineTypes = (category: string, complexity: string): string[] => {
    const timelines = [];
    
    // Base timeline based on complexity
    switch (complexity) {
      case 'beginner':
        timelines.push('immediate', 'short-term');
        break;
      case 'intermediate':
        timelines.push('short-term', 'medium-term');
        break;
      case 'advanced':
        timelines.push('medium-term', 'long-term');
        break;
      case 'expert':
        timelines.push('long-term');
        break;
      default:
        timelines.push('short-term');
    }

    return timelines;
  };

  // Generate target audience based on category and complexity
  const getTargetAudience = (category: string, complexity: string): string[] => {
    const audiences = [];
    
    // Base audience based on category
    switch (category) {
      case 'AI Writing & Content':
        audiences.push('marketers', 'content-creators', 'writers');
        break;
      case 'AI Code Assistant':
        audiences.push('developers', 'programmers', 'tech-teams');
        break;
      case 'AI Image & Video':
        audiences.push('designers', 'content-creators', 'marketers');
        break;
      case 'AI Business & Sales':
        audiences.push('sales-teams', 'business-owners', 'entrepreneurs');
        break;
      case 'AI Research & Analysis':
        audiences.push('researchers', 'analysts', 'academics');
        break;
      case 'AI Productivity & Automation':
        audiences.push('professionals', 'teams', 'business-owners');
        break;
      default:
        audiences.push('general-users', 'professionals');
    }

    // Add complexity-based audiences
    if (complexity === 'beginner') {
      audiences.push('beginners', 'non-technical');
    } else if (complexity === 'expert') {
      audiences.push('experts', 'technical-specialists');
    }

    return audiences.slice(0, 3); // Limit to 3 audiences
  };

  return {
    id: tool.id,
    name: tool.name,
    category: tool.category,
    description: tool.description,
    pricing: tool.pricing,
    complexity: tool.complexity,
    complexityLevel: getComplexityLevel(tool.complexity),
    tags: tool.tags,
    logoPlaceholder: tool.logoPlaceholder,
    website: tool.website,
    apiAvailable: tool.apiAvailable,
    freeVersion: tool.freeVersion,
    useCases: getUseCases(tool.category, tool.tags),
    projectTypes: getProjectTypes(tool.category),
    budgetRange: getBudgetRange(tool.pricing),
    features: getFeatures(tool),
    timelineTypes: getTimelineTypes(tool.category, tool.complexity),
    targetAudience: getTargetAudience(tool.category, tool.complexity)
  };
};
