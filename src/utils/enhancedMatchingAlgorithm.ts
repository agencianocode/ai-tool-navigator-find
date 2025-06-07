
import { EnhancedTool } from '@/data/expandedToolsDatabase';

export interface EnhancedQuestionnaireAnswers {
  projectType: string[];
  timeline: string;
  budget: string;
  expertiseLevel: string;
  teamSize: string;
  industry: string;
  primaryGoals: string[];
  technicalRequirements: string[];
  integrationNeeds: string[];
  scalabilityRequirements: string;
  supportLevel: string;
  learningCurvePreference: string;
}

export interface ToolScore {
  tool: EnhancedTool;
  score: number;
  matchReasons: string[];
  compatibilityBreakdown: {
    projectTypeMatch: number;
    budgetMatch: number;
    complexityMatch: number;
    featureMatch: number;
    integrationMatch: number;
    overallFit: number;
  };
}

export class EnhancedMatchingAlgorithm {
  private calculateProjectTypeScore(tool: EnhancedTool, answers: EnhancedQuestionnaireAnswers): number {
    const toolCategories = [tool.category, tool.subcategory].map(c => c.toLowerCase());
    const userProjectTypes = answers.projectType.map(p => p.toLowerCase());
    
    // Direct category matches
    let score = 0;
    userProjectTypes.forEach(projectType => {
      if (toolCategories.some(cat => cat.includes(projectType) || projectType.includes(cat))) {
        score += 3;
      }
    });

    // Use case matches
    userProjectTypes.forEach(projectType => {
      tool.use_case_examples.forEach(useCase => {
        if (useCase.toLowerCase().includes(projectType)) {
          score += 2;
        }
      });
    });

    // Tag matches
    userProjectTypes.forEach(projectType => {
      tool.tags.forEach(tag => {
        if (tag.toLowerCase().includes(projectType) || projectType.includes(tag.toLowerCase())) {
          score += 1;
        }
      });
    });

    return Math.min(score, 10); // Cap at 10
  }

  private calculateBudgetScore(tool: EnhancedTool, answers: EnhancedQuestionnaireAnswers): number {
    const budgetMap = {
      'free': { min: 0, max: 0 },
      'low': { min: 0, max: 50 },
      'medium': { min: 25, max: 200 },
      'high': { min: 100, max: 1000 },
      'enterprise': { min: 500, max: Infinity }
    };

    const userBudget = budgetMap[answers.budget as keyof typeof budgetMap];
    if (!userBudget) return 5; // Default score

    // Extract pricing from tool.pricing string
    const pricingText = tool.pricing.toLowerCase();
    let toolPrice = 0;

    if (pricingText.includes('gratis') || pricingText.includes('free')) {
      toolPrice = 0;
    } else {
      const priceMatch = pricingText.match(/\$(\d+)/);
      if (priceMatch) {
        toolPrice = parseInt(priceMatch[1]);
      }
    }

    // Score based on budget fit
    if (toolPrice >= userBudget.min && toolPrice <= userBudget.max) {
      return 10; // Perfect fit
    } else if (toolPrice < userBudget.min) {
      return 8; // Under budget (good)
    } else if (toolPrice <= userBudget.max * 1.5) {
      return 6; // Slightly over budget
    } else {
      return 2; // Way over budget
    }
  }

  private calculateComplexityScore(tool: EnhancedTool, answers: EnhancedQuestionnaireAnswers): number {
    const expertiseMap = {
      'beginner': 1,
      'intermediate': 2,
      'advanced': 3,
      'expert': 4
    };

    const userLevel = expertiseMap[answers.expertiseLevel as keyof typeof expertiseMap] || 2;
    const toolComplexity = expertiseMap[tool.complexity] || 2;

    // Learning curve consideration
    const learningCurveScore = {
      'immediate': 4,
      'gentle': 3,
      'moderate': 2,
      'steep': 1
    };

    const preferredLearning = learningCurveScore[answers.learningCurvePreference as keyof typeof learningCurveScore] || 2;
    const toolLearning = learningCurveScore[tool.learning_curve] || 2;

    // Calculate complexity match
    const complexityDiff = Math.abs(userLevel - toolComplexity);
    const learningDiff = Math.abs(preferredLearning - toolLearning);

    let score = 10;
    score -= complexityDiff * 2; // Penalize complexity mismatch
    score -= learningDiff * 1.5; // Penalize learning curve mismatch

    return Math.max(score, 0);
  }

  private calculateFeatureScore(tool: EnhancedTool, answers: EnhancedQuestionnaireAnswers): number {
    let score = 0;

    // Technical requirements matching
    answers.technicalRequirements?.forEach(requirement => {
      if (tool.key_features.some(feature => 
        feature.toLowerCase().includes(requirement.toLowerCase()) ||
        requirement.toLowerCase().includes(feature.toLowerCase())
      )) {
        score += 2;
      }

      if (tool.tags.some(tag => 
        tag.toLowerCase().includes(requirement.toLowerCase()) ||
        requirement.toLowerCase().includes(tag.toLowerCase())
      )) {
        score += 1;
      }
    });

    // Primary goals matching
    answers.primaryGoals?.forEach(goal => {
      if (tool.best_for.some(use => 
        use.toLowerCase().includes(goal.toLowerCase()) ||
        goal.toLowerCase().includes(use.toLowerCase())
      )) {
        score += 2;
      }

      if (tool.use_case_examples.some(useCase => 
        useCase.toLowerCase().includes(goal.toLowerCase()) ||
        goal.toLowerCase().includes(useCase.toLowerCase())
      )) {
        score += 1;
      }
    });

    return Math.min(score, 10);
  }

  private calculateIntegrationScore(tool: EnhancedTool, answers: EnhancedQuestionnaireAnswers): number {
    if (!answers.integrationNeeds || answers.integrationNeeds.length === 0) {
      return 5; // Neutral score if no integrations needed
    }

    let score = 0;
    answers.integrationNeeds.forEach(integration => {
      if (tool.integration_options.some(option => 
        option.toLowerCase().includes(integration.toLowerCase()) ||
        integration.toLowerCase().includes(option.toLowerCase())
      )) {
        score += 3;
      }
    });

    // Bonus for API availability if integrations are important
    if (tool.apiAvailable && answers.integrationNeeds.length > 0) {
      score += 2;
    }

    return Math.min(score, 10);
  }

  private calculateTimelineScore(tool: EnhancedTool, answers: EnhancedQuestionnaireAnswers): number {
    const timelineUrgency = {
      'immediate': 1,
      'weeks': 2,
      'months': 3,
      'long-term': 4
    };

    const userUrgency = timelineUrgency[answers.timeline as keyof typeof timelineUrgency] || 2;
    
    // Tools with immediate/gentle learning curves are better for urgent timelines
    if (userUrgency === 1) { // Immediate
      return tool.learning_curve === 'immediate' ? 10 : 
             tool.learning_curve === 'gentle' ? 7 : 
             tool.learning_curve === 'moderate' ? 4 : 2;
    } else if (userUrgency === 2) { // Weeks
      return tool.learning_curve === 'immediate' ? 9 : 
             tool.learning_curve === 'gentle' ? 8 : 
             tool.learning_curve === 'moderate' ? 6 : 4;
    } else { // Months or long-term
      return 8; // All tools are viable for longer timelines
    }
  }

  public findBestMatches(
    tools: EnhancedTool[], 
    answers: EnhancedQuestionnaireAnswers, 
    limit: number = 10
  ): ToolScore[] {
    const scoredTools: ToolScore[] = tools.map(tool => {
      const projectTypeScore = this.calculateProjectTypeScore(tool, answers);
      const budgetScore = this.calculateBudgetScore(tool, answers);
      const complexityScore = this.calculateComplexityScore(tool, answers);
      const featureScore = this.calculateFeatureScore(tool, answers);
      const integrationScore = this.calculateIntegrationScore(tool, answers);
      const timelineScore = this.calculateTimelineScore(tool, answers);

      // Weighted scoring
      const weights = {
        projectType: 0.25,
        budget: 0.20,
        complexity: 0.20,
        features: 0.15,
        integrations: 0.10,
        timeline: 0.10
      };

      const totalScore = 
        projectTypeScore * weights.projectType +
        budgetScore * weights.budget +
        complexityScore * weights.complexity +
        featureScore * weights.features +
        integrationScore * weights.integrations +
        timelineScore * weights.timeline;

      // Generate match reasons
      const matchReasons: string[] = [];
      if (projectTypeScore >= 7) matchReasons.push(`Perfecto para ${answers.projectType.join(', ')}`);
      if (budgetScore >= 8) matchReasons.push(`Se ajusta a tu presupuesto ${answers.budget}`);
      if (complexityScore >= 7) matchReasons.push(`Nivel de complejidad adecuado para ${answers.expertiseLevel}`);
      if (featureScore >= 6) matchReasons.push('Tiene las características que necesitas');
      if (integrationScore >= 7) matchReasons.push('Excelente compatibilidad con tus herramientas');
      if (tool.freeVersion) matchReasons.push('Disponible versión gratuita');
      if (tool.user_rating >= 4.5) matchReasons.push('Altamente valorado por usuarios');

      return {
        tool,
        score: totalScore,
        matchReasons,
        compatibilityBreakdown: {
          projectTypeMatch: projectTypeScore,
          budgetMatch: budgetScore,
          complexityMatch: complexityScore,
          featureMatch: featureScore,
          integrationMatch: integrationScore,
          overallFit: totalScore
        }
      };
    });

    // Sort by score and return top matches
    return scoredTools
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);
  }

  public findSimilarTools(tool: EnhancedTool, allTools: EnhancedTool[], limit: number = 5): EnhancedTool[] {
    // First, check if the tool has explicit similar_tools defined
    if (tool.similar_tools && tool.similar_tools.length > 0) {
      const explicitSimilar = allTools.filter(t => 
        t.id !== tool.id && tool.similar_tools.includes(t.id)
      );
      if (explicitSimilar.length > 0) {
        return explicitSimilar.slice(0, limit);
      }
    }

    // Calculate similarity based on category, subcategory, and tags
    const similarityScores = allTools
      .filter(t => t.id !== tool.id)
      .map(otherTool => {
        let score = 0;

        // Category match
        if (otherTool.category === tool.category) score += 5;
        if (otherTool.subcategory === tool.subcategory) score += 3;

        // Tag overlap
        const commonTags = otherTool.tags.filter(tag => tool.tags.includes(tag));
        score += commonTags.length;

        // Use case overlap
        const commonUseCases = otherTool.use_case_examples.filter(useCase => 
          tool.use_case_examples.some(toolUseCase => 
            useCase.toLowerCase().includes(toolUseCase.toLowerCase()) ||
            toolUseCase.toLowerCase().includes(useCase.toLowerCase())
          )
        );
        score += commonUseCases.length;

        // Similar complexity
        if (otherTool.complexity === tool.complexity) score += 2;

        // Similar pricing range
        if (Math.abs(otherTool.comparison_matrix.pricing_value - tool.comparison_matrix.pricing_value) <= 2) {
          score += 1;
        }

        return { tool: otherTool, score };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);

    return similarityScores.map(item => item.tool);
  }
}

export const enhancedMatchingAlgorithm = new EnhancedMatchingAlgorithm();
