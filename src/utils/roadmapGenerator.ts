
interface RoadmapPhase {
  id: number;
  title: string;
  duration: string;
  status: 'upcoming' | 'current' | 'completed';
  tasks: string[];
  tools: string[];
  insights: string;
  challenges: string[];
  resources: string[];
}

const DEFAULT_ROADMAP_TEMPLATE: RoadmapPhase[] = [
  {
    id: 1,
    title: "Phase 1: Foundation & Setup",
    duration: "Weeks 1-2",
    status: 'current',
    tasks: [],
    tools: [],
    insights: "",
    challenges: [],
    resources: []
  },
  {
    id: 2,
    title: "Phase 2: Core Implementation", 
    duration: "Weeks 3-6",
    status: 'upcoming',
    tasks: [],
    tools: [],
    insights: "",
    challenges: [],
    resources: []
  },
  {
    id: 3,
    title: "Phase 3: Integration & Testing",
    duration: "Weeks 7-8", 
    status: 'upcoming',
    tasks: [],
    tools: [],
    insights: "",
    challenges: [],
    resources: []
  },
  {
    id: 4,
    title: "Phase 4: Launch & Optimization",
    duration: "Weeks 9-12",
    status: 'upcoming', 
    tasks: [],
    tools: [],
    insights: "",
    challenges: [],
    resources: []
  }
];

const generateClaudePrompt = (answers: Record<string, any>, selectedTools: any[], isAlternative: boolean = false) => {
  const projectType = answers.projectType || 'general';
  const skillLevel = answers.skillLevel || 'beginner';
  const budget = answers.budgetRange || 'low';
  const timeline = answers.timeline || 'flexible';
  const toolNames = selectedTools.map(tool => tool.name).join(', ');

  return `You are an AI project management expert. Create a detailed 4-phase implementation roadmap for an AI tool project.

PROJECT CONTEXT:
- Project Type: ${projectType}
- User Skill Level: ${skillLevel}
- Budget Range: ${budget}
- Timeline Preference: ${timeline}
- Selected Tools: ${toolNames}
- Generate ${isAlternative ? 'alternative' : 'primary'} approach

REQUIREMENTS:
Generate a JSON response with 4 phases, each containing:
- tasks: Array of 4-6 specific, actionable tasks
- tools: Array of 2-4 relevant tool names from the selected tools
- insights: Single paragraph with personalized advice (2-3 sentences)
- challenges: Array of 2-3 potential obstacles
- resources: Array of 3-4 learning resources or documentation links

RESPONSE FORMAT (JSON only):
{
  "phases": [
    {
      "tasks": ["Task 1", "Task 2", ...],
      "tools": ["Tool1", "Tool2", ...],
      "insights": "Personalized insight paragraph...",
      "challenges": ["Challenge 1", "Challenge 2", ...],
      "resources": ["Resource 1", "Resource 2", ...]
    }
  ]
}

Make tasks specific to the project type and tools. Adjust complexity based on skill level. Consider budget constraints in recommendations.`;
};

export const generateRoadmap = async (
  answers: Record<string, any>, 
  selectedTools: any[], 
  isAlternative: boolean = false
): Promise<RoadmapPhase[]> => {
  // For now, return a mock roadmap since we don't have Claude AI integration
  // This will be replaced with actual API call when Claude integration is available
  console.log('Generating roadmap for:', { answers, selectedTools, isAlternative });
  
  const mockRoadmap: RoadmapPhase[] = [
    {
      id: 1,
      title: "Phase 1: Foundation & Setup",
      duration: "Weeks 1-2",
      status: 'current',
      tasks: [
        "Set up development environment and necessary accounts",
        "Install and configure primary tools",
        "Create project structure and documentation",
        "Establish version control and backup systems",
        "Define project requirements and success metrics"
      ],
      tools: selectedTools.slice(0, 2).map(tool => tool.name),
      insights: `Based on your ${answers.skillLevel || 'beginner'} experience level and ${answers.projectType || 'general'} project type, focus on getting familiar with the core tools first. This foundation phase is critical for smooth implementation later.`,
      challenges: [
        "Learning curve for new tools and platforms",
        "Integration complexity between different services",
        "Time allocation and project planning"
      ],
      resources: [
        "Official documentation for selected tools",
        "Setup tutorials and quickstart guides",
        "Community forums and support channels",
        "Project management templates"
      ]
    },
    {
      id: 2,
      title: "Phase 2: Core Implementation",
      duration: "Weeks 3-6",
      status: 'upcoming',
      tasks: [
        "Implement core functionality using primary tools",
        "Set up data workflows and processing pipelines", 
        "Configure automation and integrations",
        "Build user interface and experience flows",
        "Test basic functionality and fix initial issues"
      ],
      tools: selectedTools.slice(2, 5).map(tool => tool.name),
      insights: `This is where your project takes shape. Given your ${answers.budgetRange || 'low'} budget preference, prioritize free tiers and essential features. Focus on getting a working prototype before adding advanced features.`,
      challenges: [
        "API rate limits and usage restrictions",
        "Data synchronization between tools",
        "Performance optimization needs"
      ],
      resources: [
        "API documentation and integration guides",
        "Best practices for tool combinations",
        "Performance optimization tutorials",
        "Community examples and use cases"
      ]
    },
    {
      id: 3,
      title: "Phase 3: Integration & Testing",
      duration: "Weeks 7-8",
      status: 'upcoming',
      tasks: [
        "Connect all tools in comprehensive workflow",
        "Perform end-to-end testing and validation",
        "Optimize performance and user experience",
        "Implement error handling and monitoring",
        "Prepare deployment and launch strategy"
      ],
      tools: selectedTools.slice(5, 7).map(tool => tool.name),
      insights: `Integration phase requires careful attention to data flow and user experience. Test thoroughly with real-world scenarios that match your ${answers.targetAudience || 'general'} target audience needs.`,
      challenges: [
        "Cross-platform compatibility issues",
        "Data security and privacy compliance",
        "User acceptance testing feedback"
      ],
      resources: [
        "Testing frameworks and methodologies",
        "Security best practices guides",
        "User feedback collection tools",
        "Deployment preparation checklists"
      ]
    },
    {
      id: 4,
      title: "Phase 4: Launch & Optimization",
      duration: "Weeks 9-12",
      status: 'upcoming',
      tasks: [
        "Deploy to production environment",
        "Monitor performance and user adoption",
        "Gather feedback and usage analytics",
        "Implement improvements and new features",
        "Scale infrastructure based on demand"
      ],
      tools: selectedTools.slice(-2).map(tool => tool.name),
      insights: `Launch is just the beginning. Based on your ${answers.timeline || 'flexible'} timeline preference, plan for iterative improvements. Monitor usage patterns and be ready to adapt your tool stack as needs evolve.`,
      challenges: [
        "Scaling costs and resource management",
        "User onboarding and adoption rates",
        "Maintaining system reliability"
      ],
      resources: [
        "Analytics and monitoring tools",
        "User onboarding best practices",
        "Scaling and optimization guides",
        "Community feedback channels"
      ]
    }
  ];

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  return mockRoadmap;
};

// Future implementation with Claude AI API
const generateRoadmapWithClaude = async (
  answers: Record<string, any>,
  selectedTools: any[],
  isAlternative: boolean = false
): Promise<RoadmapPhase[]> => {
  try {
    const prompt = generateClaudePrompt(answers, selectedTools, isAlternative);
    
    // This would be the actual Claude API call
    // const response = await fetch('/api/claude', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ prompt })
    // });
    // const data = await response.json();
    
    // For now, return template with placeholder content
    return DEFAULT_ROADMAP_TEMPLATE.map((phase, index) => ({
      ...phase,
      tasks: [`AI-generated task ${index + 1}`, `AI-generated task ${index + 2}`],
      tools: selectedTools.slice(0, 2).map(tool => tool.name),
      insights: `AI-generated insights for ${phase.title}`,
      challenges: [`AI-generated challenge ${index + 1}`],
      resources: [`AI-generated resource ${index + 1}`]
    }));
  } catch (error) {
    console.error('Error generating roadmap with Claude:', error);
    throw error;
  }
};
