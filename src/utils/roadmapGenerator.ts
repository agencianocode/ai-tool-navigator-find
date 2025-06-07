
import { supabase } from "@/integrations/supabase/client";

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

export type AIEngine = 'claude' | 'openai';

export const generateRoadmap = async (
  answers: Record<string, any>, 
  selectedTools: any[], 
  isAlternative: boolean = false,
  preferredEngine: AIEngine = 'openai'
): Promise<RoadmapPhase[]> => {
  console.log('Generating roadmap with AI engine:', preferredEngine, { answers, selectedTools, isAlternative });
  
  try {
    // Get current session for authentication
    const { data: { session } } = await supabase.auth.getSession();
    
    // Choose function based on preferred engine
    const functionName = preferredEngine === 'openai' ? 'generate-roadmap-openai' : 'generate-roadmap';
    
    console.log(`Calling ${functionName} function`);
    
    const { data, error } = await supabase.functions.invoke(functionName, {
      body: {
        answers,
        selectedTools,
        isAlternative
      },
      headers: session ? {
        Authorization: `Bearer ${session.access_token}`
      } : {}
    });

    if (error) {
      console.error(`Error calling ${functionName} function:`, error);
      
      // If preferred engine fails, try the alternative engine
      if (preferredEngine === 'openai') {
        console.log('OpenAI failed, trying Claude as fallback...');
        return generateRoadmap(answers, selectedTools, isAlternative, 'claude');
      } else {
        console.log('Claude failed, trying OpenAI as fallback...');
        return generateRoadmap(answers, selectedTools, isAlternative, 'openai');
      }
    }

    if (!data || !Array.isArray(data)) {
      console.error('Invalid data received from function:', data);
      throw new Error('Invalid response format from AI service');
    }

    return data;
  } catch (error) {
    console.error('Error generating roadmap:', error);
    
    // Final fallback to mock data if both engines fail
    return generateMockRoadmap(answers, selectedTools);
  }
};

// Fallback mock roadmap generator
const generateMockRoadmap = async (
  answers: Record<string, any>, 
  selectedTools: any[]
): Promise<RoadmapPhase[]> => {
  console.log('Using fallback mock roadmap generator');
  
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
