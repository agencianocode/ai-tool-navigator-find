
import { AITool, aiToolsDatabase } from '@/data/aiTools';
import { QuestionnaireState } from '@/components/questionnaire/QuestionnaireContext';

export interface ToolMatch {
  tool: AITool;
  score: number;
  matchPercentage: number;
  reasons: string[];
}

export const calculateToolMatches = (answers: Record<string, any>): ToolMatch[] => {
  const toolMatches: ToolMatch[] = [];

  for (const tool of aiToolsDatabase) {
    const match = calculateToolMatch(tool, answers);
    toolMatches.push(match);
  }

  // Sort by score (descending) and return top matches
  return toolMatches
    .sort((a, b) => b.score - a.score)
    .slice(0, 15); // Return top 15 matches
};

const calculateToolMatch = (tool: AITool, answers: Record<string, any>): ToolMatch => {
  let score = 0;
  let maxScore = 0;
  const reasons: string[] = [];

  // Weight configuration
  const weights = {
    interests: 25,
    projectType: 20,
    budgetRange: 20,
    skillLevel: 15,
    technicalExpertise: 10,
    timeline: 5,
    targetAudience: 3,
    urgency: 2
  };

  // Interest matching (25 points)
  if (answers.interests && Array.isArray(answers.interests)) {
    maxScore += weights.interests;
    const interestScore = calculateInterestMatch(tool, answers.interests);
    score += interestScore * weights.interests;
    
    if (interestScore > 0.7) {
      reasons.push(`Perfect match for ${answers.interests.join(', ')} interests`);
    } else if (interestScore > 0.4) {
      reasons.push(`Good fit for your interest areas`);
    }
  }

  // Project type matching (20 points)
  if (answers.projectType) {
    maxScore += weights.projectType;
    if (tool.projectTypes.includes(answers.projectType)) {
      score += weights.projectType;
      reasons.push(`Ideal for ${answers.projectType} projects`);
    } else {
      // Partial match for related project types
      const partialMatch = getProjectTypeCompatibility(tool.projectTypes, answers.projectType);
      score += partialMatch * weights.projectType;
    }
  }

  // Budget matching (20 points)
  if (answers.budgetRange) {
    maxScore += weights.budgetRange;
    if (tool.budgetRange.includes(answers.budgetRange)) {
      score += weights.budgetRange;
      reasons.push(`Fits your ${answers.budgetRange} budget`);
    } else {
      // Penalty for budget mismatch
      const budgetPenalty = getBudgetPenalty(tool.budgetRange, answers.budgetRange);
      score += budgetPenalty * weights.budgetRange;
    }
  }

  // Skill level matching (15 points)
  if (answers.skillLevel && answers.technicalExpertise) {
    maxScore += weights.skillLevel;
    const skillMatch = calculateSkillMatch(tool.complexityLevel, answers.skillLevel, answers.technicalExpertise);
    score += skillMatch * weights.skillLevel;
    
    if (skillMatch > 0.8) {
      reasons.push(`Perfect complexity level for your skills`);
    } else if (skillMatch > 0.5) {
      reasons.push(`Good match for your technical level`);
    }
  }

  // Technical expertise matching (10 points)
  if (answers.technicalExpertise) {
    maxScore += weights.technicalExpertise;
    const techMatch = calculateTechnicalMatch(tool, answers.technicalExpertise);
    score += techMatch * weights.technicalExpertise;
  }

  // Timeline matching (5 points)
  if (answers.timeline) {
    maxScore += weights.timeline;
    if (tool.timelineTypes.includes(answers.timeline)) {
      score += weights.timeline;
      if (answers.timeline === 'immediate') {
        reasons.push(`Quick to implement and use`);
      }
    }
  }

  // Target audience matching (3 points)
  if (answers.targetAudience) {
    maxScore += weights.targetAudience;
    if (tool.targetAudience.includes(answers.targetAudience)) {
      score += weights.targetAudience;
    }
  }

  // Urgency bonus (2 points)
  if (answers.urgency) {
    maxScore += weights.urgency;
    if (answers.urgency === 'critical' && tool.timelineTypes.includes('immediate')) {
      score += weights.urgency;
      reasons.push(`Fast implementation for urgent needs`);
    }
  }

  // Calculate percentage
  const matchPercentage = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;

  // Ensure minimum reasons
  if (reasons.length === 0) {
    reasons.push(`Matches your general requirements`);
  }

  return {
    tool,
    score,
    matchPercentage: Math.min(matchPercentage, 100),
    reasons: reasons.slice(0, 3) // Limit to top 3 reasons
  };
};

const calculateInterestMatch = (tool: AITool, userInterests: string[]): number => {
  const interestCategoryMap: Record<string, string[]> = {
    'content-creation': ['Content Creation', 'AI Audio', 'Email Marketing'],
    'business-automation': ['Business Automation', 'Project Management', 'Productivity'],
    'data-analysis': ['Data Management', 'AI Platform', 'Business Automation'],
    'design-creative': ['Design & Creative', 'AI Image Generation', 'AI Video'],
    'development': ['Development', 'No-Code Development', 'AI Platform'],
    'education': ['Productivity', 'Communication', 'Content Creation'],
    'research': ['AI Platform', 'Data Management', 'Content Creation'],
    'customer-service': ['Communication', 'Forms & Surveys', 'Business Automation']
  };

  let matchScore = 0;
  let totalInterests = userInterests.length;

  for (const interest of userInterests) {
    const relevantCategories = interestCategoryMap[interest] || [];
    if (relevantCategories.includes(tool.category)) {
      matchScore += 1;
    }
  }

  return totalInterests > 0 ? matchScore / totalInterests : 0;
};

const getProjectTypeCompatibility = (toolTypes: string[], userType: string): number => {
  const compatibilityMap: Record<string, string[]> = {
    'business': ['technical', 'creative'],
    'creative': ['business'],
    'technical': ['business'],
    'educational': ['personal', 'creative'],
    'personal': ['educational', 'creative']
  };

  const compatibleTypes = compatibilityMap[userType] || [];
  
  for (const compatibleType of compatibleTypes) {
    if (toolTypes.includes(compatibleType)) {
      return 0.6; // Partial compatibility
    }
  }
  
  return 0;
};

const getBudgetPenalty = (toolBudget: string[], userBudget: string): number => {
  const budgetOrder = ['free', 'low', 'medium', 'high', 'enterprise'];
  const userIndex = budgetOrder.indexOf(userBudget);
  
  // Find the lowest budget tier for the tool
  let toolLowestIndex = budgetOrder.length;
  for (const budget of toolBudget) {
    const index = budgetOrder.indexOf(budget);
    if (index !== -1 && index < toolLowestIndex) {
      toolLowestIndex = index;
    }
  }

  // Calculate penalty based on budget gap
  if (toolLowestIndex <= userIndex) {
    return 1; // No penalty if tool fits budget
  } else {
    const gap = toolLowestIndex - userIndex;
    return Math.max(0, 1 - (gap * 0.3)); // Reduce score by 30% per budget tier gap
  }
};

const calculateSkillMatch = (toolComplexity: string, skillLevel: string, techExpertise: string): number => {
  const complexityOrder = ['beginner', 'intermediate', 'advanced', 'expert'];
  const skillOrder = ['beginner', 'intermediate', 'advanced', 'expert'];
  const techOrder = ['no-code', 'low-code', 'some-coding', 'technical', 'developer'];

  const toolIndex = complexityOrder.indexOf(toolComplexity);
  const skillIndex = skillOrder.indexOf(skillLevel);
  
  // Convert technical expertise to skill level
  let techSkillIndex = 0;
  switch (techExpertise) {
    case 'no-code': techSkillIndex = 0; break;
    case 'low-code': techSkillIndex = 1; break;
    case 'some-coding': techSkillIndex = 2; break;
    case 'technical': techSkillIndex = 3; break;
    case 'developer': techSkillIndex = 3; break;
  }

  // Use the higher of the two skill indicators
  const effectiveSkillIndex = Math.max(skillIndex, techSkillIndex);

  // Perfect match
  if (toolIndex === effectiveSkillIndex) {
    return 1;
  }

  // Tool is simpler than user skill - still good
  if (toolIndex < effectiveSkillIndex) {
    return 0.8;
  }

  // Tool is more complex - penalize based on gap
  const gap = toolIndex - effectiveSkillIndex;
  return Math.max(0, 1 - (gap * 0.4));
};

const calculateTechnicalMatch = (tool: AITool, techExpertise: string): number => {
  // Bonus for tools that match technical preference
  if (techExpertise === 'no-code' && tool.tags.includes('no-code')) {
    return 1;
  }
  if (techExpertise === 'developer' && tool.tags.includes('api')) {
    return 1;
  }
  if (techExpertise === 'technical' && (tool.tags.includes('integration') || tool.tags.includes('customizable'))) {
    return 1;
  }
  
  return 0.5; // Neutral score if no specific match
};

export const filterTools = (
  matches: ToolMatch[],
  filters: {
    category?: string;
    priceRange?: string;
    complexityLevel?: string;
  }
): ToolMatch[] => {
  return matches.filter(match => {
    const { tool } = match;

    if (filters.category && tool.category !== filters.category) {
      return false;
    }

    if (filters.priceRange && !tool.budgetRange.includes(filters.priceRange)) {
      return false;
    }

    if (filters.complexityLevel && tool.complexityLevel !== filters.complexityLevel) {
      return false;
    }

    return true;
  });
};
