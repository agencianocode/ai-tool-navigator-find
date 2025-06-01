
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { corsHeaders } from '../_shared/cors.ts';

interface RoadmapRequest {
  answers: Record<string, any>;
  selectedTools: Array<{ name: string; [key: string]: any }>;
  isAlternative?: boolean;
}

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

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { answers, selectedTools, isAlternative = false }: RoadmapRequest = await req.json();

    // Get Claude AI API key from secrets
    const claudeApiKey = Deno.env.get('CLAUDE_API_KEY');
    if (!claudeApiKey) {
      throw new Error('Claude API key not configured');
    }

    // Generate prompt
    const prompt = generateClaudePrompt(answers, selectedTools, isAlternative);

    // Call Claude AI API
    const claudeResponse = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': claudeApiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-3-sonnet-20240229',
        max_tokens: 4000,
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ]
      })
    });

    if (!claudeResponse.ok) {
      throw new Error(`Claude API error: ${claudeResponse.status}`);
    }

    const claudeData = await claudeResponse.json();
    const content = claudeData.content[0].text;

    // Parse the JSON response from Claude
    let parsedResponse;
    try {
      parsedResponse = JSON.parse(content);
    } catch (error) {
      throw new Error('Failed to parse Claude response as JSON');
    }

    // Transform Claude response to our roadmap format
    const roadmapPhases: RoadmapPhase[] = parsedResponse.phases.map((phase: any, index: number) => ({
      id: index + 1,
      title: `Phase ${index + 1}: ${getPhaseTitle(index)}`,
      duration: getPhaseDuration(index),
      status: index === 0 ? 'current' : 'upcoming',
      tasks: phase.tasks || [],
      tools: phase.tools || [],
      insights: phase.insights || '',
      challenges: phase.challenges || [],
      resources: phase.resources || []
    }));

    // Save to database if user is authenticated
    const authHeader = req.headers.get('Authorization');
    if (authHeader) {
      const supabaseClient = createClient(
        Deno.env.get('SUPABASE_URL') ?? '',
        Deno.env.get('SUPABASE_ANON_KEY') ?? '',
        {
          global: {
            headers: { Authorization: authHeader },
          },
        }
      );

      const { data: { user } } = await supabaseClient.auth.getUser();
      
      if (user) {
        await supabaseClient.from('roadmaps').insert({
          user_id: user.id,
          title: `${answers.projectType || 'AI'} Project Roadmap`,
          project_type: answers.projectType,
          skill_level: answers.skillLevel,
          budget_range: answers.budgetRange,
          timeline: answers.timeline,
          selected_tools: selectedTools,
          questionnaire_answers: answers,
          roadmap_data: roadmapPhases
        });
      }
    }

    return new Response(JSON.stringify(roadmapPhases), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error generating roadmap:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});

function getPhaseTitle(index: number): string {
  const titles = [
    'Foundation & Setup',
    'Core Implementation',
    'Integration & Testing',
    'Launch & Optimization'
  ];
  return titles[index] || `Phase ${index + 1}`;
}

function getPhaseDuration(index: number): string {
  const durations = [
    'Weeks 1-2',
    'Weeks 3-6',
    'Weeks 7-8',
    'Weeks 9-12'
  ];
  return durations[index] || `Week ${index + 1}`;
}
