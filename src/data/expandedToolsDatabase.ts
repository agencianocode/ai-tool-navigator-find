import { EnhancedTool } from './types';
import {
  aiWritingContentTools,
  aiImageVideoTools,
  noCodePlatformsTools,
  websiteBuildersTools,
  designPrototypingTools,
  developmentToolsTools,
  aiProductivityAutomationTools,
  ecommercePlatformsTools,
  databaseBackendTools,
  communicationTools,
  projectManagementTools,
  marketingAnalyticsTools,
  mobileDevTools,
  aiAudioMusicTools,
  businessAutomationTools,
  aiResearchAnalysisTools,
  aiDataAnalyticsTools,
  aiTranslationLanguageTools,
  aiCybersecurityTools,
  aiEducationLearningTools,
  aiHealthWellnessTools,
  aiFinanceToolsData,
  aiGamingEntertainmentTools,
  blockchainWeb3Tools
} from './categories';

// Combine all tools from different categories
export const expandedToolsDatabase: EnhancedTool[] = [
  ...aiWritingContentTools,
  ...aiImageVideoTools,
  ...noCodePlatformsTools,
  ...websiteBuildersTools,
  ...designPrototypingTools,
  ...developmentToolsTools,
  ...aiProductivityAutomationTools,
  ...ecommercePlatformsTools,
  ...databaseBackendTools,
  ...communicationTools,
  ...projectManagementTools,
  ...marketingAnalyticsTools,
  ...mobileDevTools,
  ...aiAudioMusicTools,
  ...businessAutomationTools,
  ...aiResearchAnalysisTools,
  ...aiDataAnalyticsTools,
  ...aiTranslationLanguageTools,
  ...aiCybersecurityTools,
  ...aiEducationLearningTools,
  ...aiHealthWellnessTools,
  ...aiFinanceToolsData,
  ...aiGamingEntertainmentTools,
  ...blockchainWeb3Tools,
  // Additional productivity tools to reach 100
  {
    id: 'discord-76',
    name: 'Discord',
    category: 'Communication',
    subcategory: 'Community Chat',
    description: 'Discord es una plataforma de comunicación diseñada para comunidades, gaming y equipos.',
    pricing: 'Gratis, Nitro $9.99/mes',
    complexity: 'beginner',
    difficulty_level: 3,
    learning_curve: 'gentle',
    community_size: 'massive',
    integration_options: ['Bots', 'Webhooks', 'Spotify', 'YouTube'],
    tags: ['gaming', 'comunidades', 'voz', 'texto'],
    logoPlaceholder: 'photo-1461749280684-dccba630e2f6',
    website: 'https://discord.com',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'Comunidades gaming',
      'Equipos de desarrollo',
      'Comunidades creativas',
      'Servidores temáticos'
    ],
    comparison_matrix: {
      ease_of_use: 8,
      feature_richness: 9,
      pricing_value: 10,
      support_quality: 7,
      scalability: 9
    },
    similar_tools: ['slack-31', 'teamspeak-34'],
    founded_year: 2015,
    user_rating: 4.2,
    monthly_active_users: '150M+',
    key_features: [
      'Servidores con canales',
      'Chat de voz y texto',
      'Bots personalizables',
      'Streaming integrado'
    ],
    pros: [
      'Gratuito y potente',
      'Excelente para comunidades',
      'Muchas integraciones'
    ],
    cons: [
      'Interfaz puede ser abrumadora',
      'Orientado a gaming',
      'Moderación comunitaria'
    ],
    best_for: [
      'Comunidades online',
      'Gamers',
      'Creadores de contenido'
    ],
    alternatives: ['Slack', 'TeamSpeak', 'Guilded']
  },
  {
    id: 'loom-77',
    name: 'Loom',
    category: 'Communication',
    subcategory: 'Video Messaging',
    description: 'Loom permite grabar y compartir videos de pantalla de forma rápida para comunicación asíncrona.',
    pricing: 'Gratis hasta 25 videos, Business $8/mes',
    complexity: 'beginner',
    difficulty_level: 2,
    learning_curve: 'immediate',
    community_size: 'large',
    integration_options: ['Slack', 'Gmail', 'Notion', 'CRM systems'],
    tags: ['video', 'grabación', 'pantalla', 'async'],
    logoPlaceholder: 'photo-1587620962725-abab7fe55159',
    website: 'https://loom.com',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'Tutoriales rápidos',
      'Feedback de diseño',
      'Onboarding remoto',
      'Bug reports'
    ],
    comparison_matrix: {
      ease_of_use: 10,
      feature_richness: 7,
      pricing_value: 9,
      support_quality: 8,
      scalability: 8
    },
    similar_tools: ['vidyard-78', 'screencastify-79'],
    founded_year: 2015,
    user_rating: 4.7,
    monthly_active_users: '14M+',
    key_features: [
      'Grabación one-click',
      'Transcripciones automáticas',
      'Análisis de engagement',
      'Integraciones nativas'
    ],
    pros: [
      'Extremadamente fácil de usar',
      'Calidad de video excelente',
      'Integraciones útiles'
    ],
    cons: [
      'Límites en plan gratuito',
      'Funciones básicas de edición',
      'Almacenamiento limitado'
    ],
    best_for: [
      'Equipos remotos',
      'Customer success',
      'Documentación visual'
    ],
    alternatives: ['Vidyard', 'Screencastify', 'CloudApp']
  },
  {
    id: 'linear-78',
    name: 'Linear',
    category: 'Project Management',
    subcategory: 'Issue Tracking',
    description: 'Linear es una herramienta moderna de gestión de issues y proyectos diseñada para equipos de desarrollo.',
    pricing: 'Gratis hasta 10 miembros, Pro $8/mes',
    complexity: 'intermediate',
    difficulty_level: 4,
    learning_curve: 'gentle',
    community_size: 'medium',
    integration_options: ['GitHub', 'GitLab', 'Slack', 'Figma'],
    tags: ['desarrollo', 'issues', 'agile', 'velocidad'],
    logoPlaceholder: 'photo-1551288049-bebda4e38f71',
    website: 'https://linear.app',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'Tracking de bugs',
      'Sprint planning',
      'Roadmap de producto',
      'Gestión de releases'
    ],
    comparison_matrix: {
      ease_of_use: 9,
      feature_richness: 8,
      pricing_value: 8,
      support_quality: 9,
      scalability: 8
    },
    similar_tools: ['jira-79', 'github-issues-80'],
    founded_year: 2019,
    user_rating: 4.8,
    monthly_active_users: '500K+',
    key_features: [
      'Interfaz ultra-rápida',
      'Keyboard shortcuts',
      'Git integrations',
      'Insights automáticos'
    ],
    pros: [
      'Interfaz muy rápida',
      'Diseño elegante',
      'Excelente UX'
    ],
    cons: [
      'Enfocado en desarrollo',
      'Menos funciones que Jira',
      'Relativamente nuevo'
    ],
    best_for: [
      'Equipos de desarrollo',
      'Startups tech',
      'Product managers'
    ],
    alternatives: ['Jira', 'GitHub Issues', 'ClickUp']
  },
  {
    id: 'vercel-79',
    name: 'Vercel',
    category: 'Development Tools',
    subcategory: 'Deployment',
    description: 'Vercel es una plataforma de deployment que permite publicar aplicaciones web con cero configuración.',
    pricing: 'Gratis para hobby, Pro $20/mes',
    complexity: 'intermediate',
    difficulty_level: 3,
    learning_curve: 'gentle',
    community_size: 'large',
    integration_options: ['GitHub', 'GitLab', 'Bitbucket', 'Next.js'],
    tags: ['deployment', 'hosting', 'JAMstack', 'edge'],
    logoPlaceholder: 'photo-1618401471353-b98afee0b2eb',
    website: 'https://vercel.com',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'Deploy de apps React',
      'Sitios estáticos',
      'APIs serverless',
      'Preview deployments'
    ],
    comparison_matrix: {
      ease_of_use: 9,
      feature_richness: 8,
      pricing_value: 9,
      support_quality: 8,
      scalability: 9
    },
    similar_tools: ['netlify-80', 'aws-amplify-81'],
    founded_year: 2015,
    user_rating: 4.6,
    monthly_active_users: '2M+',
    key_features: [
      'Deploy automático',
      'Edge network global',
      'Preview deployments',
      'Analytics integrado'
    ],
    pros: [
      'Deploy extremadamente fácil',
      'Performance excelente',
      'Integración Git perfecta'
    ],
    cons: [
      'Puede ser caro para high-traffic',
      'Menos control que AWS',
      'Enfocado en JAMstack'
    ],
    best_for: [
      'Desarrolladores frontend',
      'Proyectos Next.js',
      'Aplicaciones modernas'
    ],
    alternatives: ['Netlify', 'AWS Amplify', 'GitHub Pages']
  },
  {
    id: 'clickup-80',
    name: 'ClickUp',
    category: 'Project Management',
    subcategory: 'All-in-One Workspace',
    description: 'ClickUp es una plataforma todo-en-uno que combina gestión de proyectos, documentos y colaboración.',
    pricing: 'Gratis básico, Unlimited $7/mes',
    complexity: 'intermediate',
    difficulty_level: 5,
    learning_curve: 'moderate',
    community_size: 'large',
    integration_options: ['Slack', 'Google Workspace', 'GitHub', 'Zapier'],
    tags: ['todo-en-uno', 'productividad', 'colaboración', 'flexible'],
    logoPlaceholder: 'photo-1611224923853-80b023f02d71',
    website: 'https://clickup.com',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'Gestión de proyectos complejos',
      'Documentación de equipos',
      'Time tracking',
      'Goal setting'
    ],
    comparison_matrix: {
      ease_of_use: 6,
      feature_richness: 10,
      pricing_value: 9,
      support_quality: 7,
      scalability: 9
    },
    similar_tools: ['notion-76', 'asana-34'],
    founded_year: 2017,
    user_rating: 4.3,
    monthly_active_users: '4M+',
    key_features: [
      'Múltiples vistas',
      'Docs y wikis',
      'Time tracking nativo',
      'Automatizaciones'
    ],
    pros: [
      'Increíblemente completo',
      'Muy personalizable',
      'Buen precio'
    ],
    cons: [
      'Puede ser abrumador',
      'Curva de aprendizaje',
      'Performance a veces lenta'
    ],
    best_for: [
      'Equipos que quieren todo-en-uno',
      'Gestión compleja',
      'Organizaciones en crecimiento'
    ],
    alternatives: ['Notion', 'Asana', 'Monday.com']
  },
  {
    id: 'notion-76',
    name: 'Notion',
    category: 'Productivity',
    subcategory: 'Workspace',
    description: 'Notion es una plataforma todo en uno para notas, gestión de proyectos y bases de datos.',
    pricing: 'Gratis con límites, $8/mes Personal Pro',
    complexity: 'beginner',
    difficulty_level: 3,
    learning_curve: 'gentle',
    community_size: 'massive',
    integration_options: ['Zapier', 'Slack', 'Google Drive'],
    tags: ['notas', 'gestión', 'colaboración', 'productividad'],
    logoPlaceholder: 'photo-1504384308090-c894fdcc538d',
    website: 'https://notion.so',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'Documentación',
      'Gestión de tareas',
      'Bases de datos personalizadas',
      'Colaboración en equipo'
    ],
    comparison_matrix: {
      ease_of_use: 8,
      feature_richness: 8,
      pricing_value: 9,
      support_quality: 7,
      scalability: 8
    },
    similar_tools: ['coda-30', 'evernote-50'],
    founded_year: 2013,
    user_rating: 4.5,
    monthly_active_users: '4M+',
    key_features: [
      'Páginas y bloques',
      'Bases de datos relacionales',
      'Plantillas',
      'Colaboración en tiempo real'
    ],
    pros: [
      'Flexible y personalizable',
      'Interfaz limpia',
      'Gran comunidad'
    ],
    cons: [
      'Limitaciones en plan gratuito',
      'Curva de aprendizaje para funciones avanzadas',
      'No es ideal para gestión de proyectos complejos'
    ],
    best_for: [
      'Freelancers',
      'Equipos pequeños',
      'Gestión personal'
    ],
    alternatives: ['Coda', 'Evernote', 'OneNote']
  }
];

// Category definitions
export const enhancedCategories = [
  'AI Writing & Content',
  'AI Image & Video',
  'AI Audio & Music',
  'AI Productivity & Automation',
  'AI Data & Analytics',
  'AI Research & Analysis',
  'AI Translation & Language',
  'AI Cybersecurity',
  'AI Education & Learning',
  'AI Health & Wellness',
  'AI Finance & Fintech',
  'AI Gaming & Entertainment',
  'No-Code Platforms',
  'Website Builders',
  'E-commerce Platforms',
  'Design & Prototyping',
  'Development Tools',
  'Database & Backend',
  'Communication',
  'Project Management',
  'Marketing & Analytics',
  'Mobile Development',
  'Business Automation',
  'Blockchain & Web3',
  'Productivity'
];

export const subcategories = [
  'Text Generation',
  'Marketing Copy',
  'Grammar & Style',
  'Content Planning',
  'Image Generation',
  'Video Creation',
  'Photo Editing',
  'Design Assets',
  'Music Production',
  'Voice Synthesis',
  'Audio Editing',
  'Podcast Tools',
  'Web Applications',
  'Mobile Apps',
  'Database Management',
  'API Development',
  'Professional Sites',
  'Landing Pages',
  'Portfolios',
  'Blogs',
  'Online Stores',
  'Payment Processing',
  'Inventory Management',
  'Dropshipping',
  'UI/UX Design',
  'Wireframing',
  'Prototyping',
  'Design Systems',
  'AI Code Assistant',
  'Version Control',
  'Testing Tools',
  'Deployment',
  'Cloud Databases',
  'Backend Services',
  'APIs',
  'Authentication',
  'Team Chat',
  'Video Conferencing',
  'Email Marketing',
  'Customer Support',
  'Task Management',
  'Agile Tools',
  'Time Tracking',
  'Resource Planning',
  'SEO Tools',
  'Analytics',
  'Social Media',
  'Advertising',
  'iOS Development',
  'Android Development',
  'Cross-platform',
  'App Testing',
  'Workflow Automation',
  'CRM Automation',
  'Email Automation',
  'Data Processing',
  'Data Visualization',
  'Business Intelligence',
  'Machine Learning',
  'Statistical Analysis',
  'Research Tools',
  'Survey Tools',
  'Academic Writing',
  'Citation Management',
  'Language Learning',
  'Online Courses',
  'LMS Platforms',
  'Skill Assessment',
  'Security Monitoring',
  'Threat Detection',
  'Privacy Tools',
  'Compliance',
  'Health Monitoring',
  'Fitness Apps',
  'Mental Health',
  'Medical Tools',
  'Personal Finance',
  'Investment Tools',
  'Cryptocurrency',
  'Banking APIs',
  'Game Development',
  'Game Assets',
  'Streaming Tools',
  'Entertainment Apps',
  'Smart Contracts',
  'DeFi Platforms',
  'NFT Tools',
  'Crypto Wallets',
  'Workspace',
  'Note Taking',
  'Kanban Boards',
  'Work OS',
  'CRM & Marketing',
  'Community Chat',
  'Development Platform',
  'Translation',
  'Grammar Check',
  'Tutoring',
  'Course Assistance',
  'Symptom Checker',
  'Fitness Tracking',
  'Mental Health',
  'Robo-Advisor',
  'Business Finance',
  'Graphics Enhancement',
  'Music Streaming',
  'Content Moderation',
  'Crypto Wallet',
  'NFT Marketplace',
  'DeFi Exchange',
  'Video Messaging',
  'Issue Tracking',
  'All-in-One Workspace'
];

export const difficultyLevels = ['beginner', 'intermediate', 'advanced', 'expert'];
export const learningCurves = ['immediate', 'gentle', 'moderate', 'steep'];
export const communitySizes = ['small', 'medium', 'large', 'massive'];

export type { EnhancedTool };
