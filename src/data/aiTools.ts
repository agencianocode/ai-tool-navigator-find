
export interface AITool {
  id: string;
  name: string;
  category: string;
  description: string;
  pricing: string;
  complexityLevel: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  useCases: string[];
  tags: string[];
  projectTypes: string[];
  budgetRange: string[];
  timelineTypes: string[];
  targetAudience: string[];
  website?: string;
  logoPlaceholder: string;
}

export const aiToolsDatabase: AITool[] = [
  // Content Creation & Marketing
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    category: 'Content Creation',
    description: 'AI-powered conversational assistant for writing, coding, analysis, and creative tasks',
    pricing: 'Free tier, $20/month for Plus',
    complexityLevel: 'beginner',
    useCases: ['Content writing', 'Code assistance', 'Research', 'Creative brainstorming'],
    tags: ['ai-assistant', 'writing', 'coding', 'conversation'],
    projectTypes: ['business', 'creative', 'technical', 'educational', 'personal'],
    budgetRange: ['free', 'low'],
    timelineTypes: ['immediate', 'weeks', 'months', 'flexible'],
    targetAudience: ['personal', 'small-team', 'company', 'public', 'students'],
    logoPlaceholder: 'photo-1488590528505-98d2b5aba04b'
  },
  {
    id: 'claude',
    name: 'Claude AI',
    category: 'Content Creation',
    description: 'Advanced AI assistant for analysis, writing, math, coding, and creative tasks',
    pricing: 'Free tier, $20/month for Pro',
    complexityLevel: 'beginner',
    useCases: ['Document analysis', 'Complex reasoning', 'Content creation', 'Code review'],
    tags: ['ai-assistant', 'analysis', 'writing', 'reasoning'],
    projectTypes: ['business', 'creative', 'technical', 'educational'],
    budgetRange: ['free', 'low'],
    timelineTypes: ['immediate', 'weeks', 'months'],
    targetAudience: ['personal', 'small-team', 'company', 'students'],
    logoPlaceholder: 'photo-1461749280684-dccba630e2f6'
  },
  {
    id: 'midjourney',
    name: 'Midjourney',
    category: 'AI Image Generation',
    description: 'Create stunning, artistic images from text prompts using advanced AI',
    pricing: 'Starts at $10/month',
    complexityLevel: 'intermediate',
    useCases: ['Digital art', 'Marketing visuals', 'Concept art', 'Social media content'],
    tags: ['image-generation', 'art', 'design', 'creative'],
    projectTypes: ['creative', 'business'],
    budgetRange: ['low', 'medium'],
    timelineTypes: ['immediate', 'weeks'],
    targetAudience: ['personal', 'small-team', 'public'],
    logoPlaceholder: 'photo-1518770660439-4636190af475'
  },
  {
    id: 'stable-diffusion',
    name: 'Stable Diffusion',
    category: 'AI Image Generation',
    description: 'Open-source AI model for generating images from text descriptions',
    pricing: 'Free (self-hosted), cloud services vary',
    complexityLevel: 'advanced',
    useCases: ['Custom image generation', 'Art creation', 'Product mockups'],
    tags: ['open-source', 'image-generation', 'customizable'],
    projectTypes: ['creative', 'technical'],
    budgetRange: ['free', 'low'],
    timelineTypes: ['weeks', 'months'],
    targetAudience: ['personal', 'small-team'],
    logoPlaceholder: 'photo-1486312338219-ce68d2c6f44d'
  },
  {
    id: 'canva',
    name: 'Canva',
    category: 'Design & Creative',
    description: 'User-friendly design platform with AI-powered features for creating graphics',
    pricing: 'Free tier, $15/month for Pro',
    complexityLevel: 'beginner',
    useCases: ['Social media graphics', 'Presentations', 'Marketing materials'],
    tags: ['design', 'templates', 'user-friendly', 'collaboration'],
    projectTypes: ['business', 'creative', 'personal'],
    budgetRange: ['free', 'low'],
    timelineTypes: ['immediate', 'weeks'],
    targetAudience: ['personal', 'small-team', 'company', 'public'],
    logoPlaceholder: 'photo-1531297484001-80022131f5a1'
  },

  // Business Automation
  {
    id: 'zapier',
    name: 'Zapier',
    category: 'Business Automation',
    description: 'Connect and automate workflows between 5000+ apps without coding',
    pricing: 'Free tier, starts at $19.99/month',
    complexityLevel: 'intermediate',
    useCases: ['Workflow automation', 'Data synchronization', 'Task automation'],
    tags: ['automation', 'integration', 'workflow', 'no-code'],
    projectTypes: ['business', 'personal'],
    budgetRange: ['free', 'low', 'medium'],
    timelineTypes: ['weeks', 'months'],
    targetAudience: ['personal', 'small-team', 'company'],
    logoPlaceholder: 'photo-1488590528505-98d2b5aba04b'
  },
  {
    id: 'make',
    name: 'Make.com',
    category: 'Business Automation',
    description: 'Visual platform for designing, building, and automating workflows',
    pricing: 'Free tier, starts at $9/month',
    complexityLevel: 'intermediate',
    useCases: ['Complex automation', 'Data processing', 'API integrations'],
    tags: ['automation', 'visual-builder', 'integration'],
    projectTypes: ['business', 'technical'],
    budgetRange: ['free', 'low', 'medium'],
    timelineTypes: ['weeks', 'months'],
    targetAudience: ['small-team', 'company'],
    logoPlaceholder: 'photo-1461749280684-dccba630e2f6'
  },
  {
    id: 'airtable',
    name: 'Airtable',
    category: 'Data Management',
    description: 'Flexible database platform that combines spreadsheet and database functionality',
    pricing: 'Free tier, starts at $10/month',
    complexityLevel: 'intermediate',
    useCases: ['Project management', 'CRM', 'Content planning', 'Team collaboration'],
    tags: ['database', 'spreadsheet', 'collaboration', 'project-management'],
    projectTypes: ['business', 'creative', 'personal'],
    budgetRange: ['free', 'low', 'medium'],
    timelineTypes: ['immediate', 'weeks'],
    targetAudience: ['personal', 'small-team', 'company'],
    logoPlaceholder: 'photo-1518770660439-4636190af475'
  },

  // Development Tools
  {
    id: 'github-copilot',
    name: 'GitHub Copilot',
    category: 'Development',
    description: 'AI pair programmer that helps write code faster with intelligent suggestions',
    pricing: '$10/month for individuals',
    complexityLevel: 'intermediate',
    useCases: ['Code completion', 'Function generation', 'Documentation'],
    tags: ['coding', 'ai-assistant', 'productivity', 'development'],
    projectTypes: ['technical'],
    budgetRange: ['low'],
    timelineTypes: ['immediate', 'weeks', 'months'],
    targetAudience: ['personal', 'small-team', 'company'],
    logoPlaceholder: 'photo-1486312338219-ce68d2c6f44d'
  },
  {
    id: 'bubble',
    name: 'Bubble',
    category: 'No-Code Development',
    description: 'Visual web development platform for building apps without coding',
    pricing: 'Free tier, starts at $25/month',
    complexityLevel: 'intermediate',
    useCases: ['Web app development', 'MVP creation', 'Startup prototyping'],
    tags: ['no-code', 'web-development', 'visual-builder'],
    projectTypes: ['business', 'technical'],
    budgetRange: ['free', 'low', 'medium'],
    timelineTypes: ['weeks', 'months'],
    targetAudience: ['personal', 'small-team', 'company'],
    logoPlaceholder: 'photo-1531297484001-80022131f5a1'
  },
  {
    id: 'webflow',
    name: 'Webflow',
    category: 'No-Code Development',
    description: 'Visual web design platform for creating responsive websites without coding',
    pricing: 'Free tier, starts at $12/month',
    complexityLevel: 'intermediate',
    useCases: ['Website design', 'Landing pages', 'Portfolio sites'],
    tags: ['web-design', 'no-code', 'responsive', 'cms'],
    projectTypes: ['business', 'creative'],
    budgetRange: ['free', 'low', 'medium'],
    timelineTypes: ['weeks', 'months'],
    targetAudience: ['personal', 'small-team', 'company', 'public'],
    logoPlaceholder: 'photo-1488590528505-98d2b5aba04b'
  },

  // Design Tools
  {
    id: 'figma',
    name: 'Figma',
    category: 'Design & Creative',
    description: 'Collaborative design platform for UI/UX design and prototyping',
    pricing: 'Free tier, starts at $12/month',
    complexityLevel: 'intermediate',
    useCases: ['UI design', 'Prototyping', 'Design systems', 'Team collaboration'],
    tags: ['design', 'collaboration', 'prototyping', 'ui-ux'],
    projectTypes: ['creative', 'technical', 'business'],
    budgetRange: ['free', 'low', 'medium'],
    timelineTypes: ['immediate', 'weeks', 'months'],
    targetAudience: ['personal', 'small-team', 'company'],
    logoPlaceholder: 'photo-1461749280684-dccba630e2f6'
  },
  {
    id: 'framer',
    name: 'Framer',
    category: 'Design & Creative',
    description: 'Design and publish websites with advanced animations and interactions',
    pricing: 'Free tier, starts at $5/month',
    complexityLevel: 'intermediate',
    useCases: ['Interactive websites', 'Portfolio sites', 'Landing pages'],
    tags: ['web-design', 'animations', 'interactive', 'publishing'],
    projectTypes: ['creative', 'business'],
    budgetRange: ['free', 'low'],
    timelineTypes: ['weeks', 'months'],
    targetAudience: ['personal', 'small-team', 'public'],
    logoPlaceholder: 'photo-1518770660439-4636190af475'
  },

  // Productivity Tools
  {
    id: 'notion',
    name: 'Notion AI',
    category: 'Productivity',
    description: 'All-in-one workspace with AI-powered writing and organization features',
    pricing: 'Free tier, AI add-on $8/month',
    complexityLevel: 'beginner',
    useCases: ['Note-taking', 'Project management', 'Knowledge base', 'Documentation'],
    tags: ['productivity', 'organization', 'collaboration', 'ai-writing'],
    projectTypes: ['business', 'educational', 'personal'],
    budgetRange: ['free', 'low'],
    timelineTypes: ['immediate', 'weeks', 'months'],
    targetAudience: ['personal', 'small-team', 'company', 'students'],
    logoPlaceholder: 'photo-1486312338219-ce68d2c6f44d'
  },
  {
    id: 'linear',
    name: 'Linear',
    category: 'Project Management',
    description: 'Modern issue tracking and project management tool for software teams',
    pricing: 'Free tier, starts at $8/month',
    complexityLevel: 'intermediate',
    useCases: ['Issue tracking', 'Sprint planning', 'Product roadmaps'],
    tags: ['project-management', 'issue-tracking', 'agile', 'development'],
    projectTypes: ['technical', 'business'],
    budgetRange: ['free', 'low'],
    timelineTypes: ['immediate', 'weeks', 'months'],
    targetAudience: ['small-team', 'company'],
    logoPlaceholder: 'photo-1531297484001-80022131f5a1'
  },

  // Communication Tools
  {
    id: 'slack',
    name: 'Slack',
    category: 'Communication',
    description: 'Team collaboration platform with messaging, file sharing, and integrations',
    pricing: 'Free tier, starts at $7.25/month',
    complexityLevel: 'beginner',
    useCases: ['Team communication', 'Project collaboration', 'File sharing'],
    tags: ['communication', 'collaboration', 'messaging', 'integration'],
    projectTypes: ['business', 'technical', 'creative'],
    budgetRange: ['free', 'low'],
    timelineTypes: ['immediate'],
    targetAudience: ['small-team', 'company'],
    logoPlaceholder: 'photo-1488590528505-98d2b5aba04b'
  },
  {
    id: 'discord',
    name: 'Discord',
    category: 'Communication',
    description: 'Voice, video, and text communication platform for communities',
    pricing: 'Free, Nitro $9.99/month',
    complexityLevel: 'beginner',
    useCases: ['Community building', 'Team communication', 'Voice chat'],
    tags: ['communication', 'community', 'voice-chat', 'gaming'],
    projectTypes: ['creative', 'educational', 'personal'],
    budgetRange: ['free', 'low'],
    timelineTypes: ['immediate'],
    targetAudience: ['personal', 'small-team', 'public', 'students'],
    logoPlaceholder: 'photo-1461749280684-dccba630e2f6'
  },

  // AI Video & Audio
  {
    id: 'runwayml',
    name: 'RunwayML',
    category: 'AI Video',
    description: 'AI-powered video editing and generation platform for creators',
    pricing: 'Free tier, starts at $12/month',
    complexityLevel: 'intermediate',
    useCases: ['Video editing', 'AI video generation', 'Motion graphics'],
    tags: ['video-editing', 'ai-generation', 'creative', 'motion-graphics'],
    projectTypes: ['creative'],
    budgetRange: ['free', 'low', 'medium'],
    timelineTypes: ['weeks', 'months'],
    targetAudience: ['personal', 'small-team', 'public'],
    logoPlaceholder: 'photo-1518770660439-4636190af475'
  },
  {
    id: 'luma-ai',
    name: 'Luma AI',
    category: 'AI Video',
    description: 'Create realistic 3D models and scenes from photos using AI',
    pricing: 'Free tier, paid plans available',
    complexityLevel: 'intermediate',
    useCases: ['3D modeling', 'Virtual environments', 'Product visualization'],
    tags: ['3d-modeling', 'ai-generation', 'photogrammetry'],
    projectTypes: ['creative', 'business'],
    budgetRange: ['free', 'low', 'medium'],
    timelineTypes: ['weeks', 'months'],
    targetAudience: ['personal', 'small-team', 'company'],
    logoPlaceholder: 'photo-1486312338219-ce68d2c6f44d'
  },
  {
    id: 'elevenlabs',
    name: 'ElevenLabs',
    category: 'AI Audio',
    description: 'AI voice synthesis and cloning for realistic speech generation',
    pricing: 'Free tier, starts at $5/month',
    complexityLevel: 'beginner',
    useCases: ['Voiceovers', 'Audiobooks', 'Podcasts', 'Voice cloning'],
    tags: ['voice-synthesis', 'audio', 'text-to-speech', 'voice-cloning'],
    projectTypes: ['creative', 'business'],
    budgetRange: ['free', 'low'],
    timelineTypes: ['immediate', 'weeks'],
    targetAudience: ['personal', 'small-team', 'public'],
    logoPlaceholder: 'photo-1531297484001-80022131f5a1'
  },

  // Marketing & Sales
  {
    id: 'mailchimp',
    name: 'Mailchimp',
    category: 'Email Marketing',
    description: 'Email marketing platform with automation and analytics',
    pricing: 'Free tier, starts at $10/month',
    complexityLevel: 'beginner',
    useCases: ['Email campaigns', 'Newsletter automation', 'Customer segmentation'],
    tags: ['email-marketing', 'automation', 'analytics', 'crm'],
    projectTypes: ['business'],
    budgetRange: ['free', 'low', 'medium'],
    timelineTypes: ['immediate', 'weeks'],
    targetAudience: ['small-team', 'company', 'public'],
    logoPlaceholder: 'photo-1488590528505-98d2b5aba04b'
  },
  {
    id: 'convertkit',
    name: 'ConvertKit',
    category: 'Email Marketing',
    description: 'Email marketing platform designed for creators and online businesses',
    pricing: 'Free tier, starts at $9/month',
    complexityLevel: 'beginner',
    useCases: ['Creator newsletters', 'Course marketing', 'Subscriber management'],
    tags: ['email-marketing', 'creator-focused', 'automation'],
    projectTypes: ['creative', 'business'],
    budgetRange: ['free', 'low'],
    timelineTypes: ['immediate', 'weeks'],
    targetAudience: ['personal', 'small-team', 'public'],
    logoPlaceholder: 'photo-1461749280684-dccba630e2f6'
  },
  {
    id: 'calendly',
    name: 'Calendly',
    category: 'Scheduling',
    description: 'Automated scheduling platform for meetings and appointments',
    pricing: 'Free tier, starts at $8/month',
    complexityLevel: 'beginner',
    useCases: ['Meeting scheduling', 'Appointment booking', 'Calendar integration'],
    tags: ['scheduling', 'automation', 'calendar', 'booking'],
    projectTypes: ['business', 'personal'],
    budgetRange: ['free', 'low'],
    timelineTypes: ['immediate'],
    targetAudience: ['personal', 'small-team', 'company'],
    logoPlaceholder: 'photo-1518770660439-4636190af475'
  },
  {
    id: 'typeform',
    name: 'Typeform',
    category: 'Forms & Surveys',
    description: 'Interactive form and survey builder with beautiful designs',
    pricing: 'Free tier, starts at $25/month',
    complexityLevel: 'beginner',
    useCases: ['Customer surveys', 'Lead generation', 'Event registration'],
    tags: ['forms', 'surveys', 'interactive', 'lead-generation'],
    projectTypes: ['business', 'creative'],
    budgetRange: ['free', 'low', 'medium'],
    timelineTypes: ['immediate', 'weeks'],
    targetAudience: ['small-team', 'company', 'public'],
    logoPlaceholder: 'photo-1486312338219-ce68d2c6f44d'
  },

  // AI-Specific Tools
  {
    id: 'replicate',
    name: 'Replicate',
    category: 'AI Platform',
    description: 'Run machine learning models in the cloud with simple API',
    pricing: 'Pay-per-use, starts at $0.0002/sec',
    complexityLevel: 'advanced',
    useCases: ['AI model deployment', 'Image processing', 'API integration'],
    tags: ['machine-learning', 'api', 'cloud', 'model-deployment'],
    projectTypes: ['technical'],
    budgetRange: ['low', 'medium'],
    timelineTypes: ['weeks', 'months'],
    targetAudience: ['small-team', 'company'],
    logoPlaceholder: 'photo-1531297484001-80022131f5a1'
  },
  {
    id: 'huggingface',
    name: 'Hugging Face',
    category: 'AI Platform',
    description: 'Open-source platform for machine learning models and datasets',
    pricing: 'Free tier, Pro starts at $9/month',
    complexityLevel: 'advanced',
    useCases: ['Model hosting', 'AI research', 'Custom model training'],
    tags: ['open-source', 'machine-learning', 'models', 'research'],
    projectTypes: ['technical', 'educational'],
    budgetRange: ['free', 'low'],
    timelineTypes: ['weeks', 'months'],
    targetAudience: ['personal', 'small-team', 'students'],
    logoPlaceholder: 'photo-1488590528505-98d2b5aba04b'
  },

  // Additional Business Tools
  {
    id: 'stripe',
    name: 'Stripe',
    category: 'Payments',
    description: 'Online payment processing platform for businesses',
    pricing: '2.9% + 30¢ per transaction',
    complexityLevel: 'intermediate',
    useCases: ['Payment processing', 'Subscription billing', 'E-commerce'],
    tags: ['payments', 'e-commerce', 'subscriptions', 'api'],
    projectTypes: ['business'],
    budgetRange: ['low', 'medium'],
    timelineTypes: ['weeks', 'months'],
    targetAudience: ['small-team', 'company'],
    logoPlaceholder: 'photo-1461749280684-dccba630e2f6'
  },
  {
    id: 'shopify',
    name: 'Shopify',
    category: 'E-commerce',
    description: 'Complete e-commerce platform for online stores',
    pricing: 'Starts at $29/month',
    complexityLevel: 'beginner',
    useCases: ['Online store', 'Product management', 'Inventory tracking'],
    tags: ['e-commerce', 'online-store', 'inventory', 'payments'],
    projectTypes: ['business'],
    budgetRange: ['low', 'medium'],
    timelineTypes: ['weeks', 'months'],
    targetAudience: ['small-team', 'company', 'public'],
    logoPlaceholder: 'photo-1518770660439-4636190af475'
  }
];

export const categories = [
  'Content Creation',
  'Business Automation',
  'Design & Creative',
  'Development',
  'No-Code Development',
  'Productivity',
  'Communication',
  'AI Image Generation',
  'AI Video',
  'AI Audio',
  'Email Marketing',
  'Project Management',
  'Data Management',
  'AI Platform',
  'Forms & Surveys',
  'Scheduling',
  'Payments',
  'E-commerce'
];
