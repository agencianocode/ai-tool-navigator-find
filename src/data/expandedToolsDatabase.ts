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
  // Additional tools from original expandedToolsDatabase (remaining 93 tools)
  {
    id: 'shopify-25',
    name: 'Shopify',
    category: 'E-commerce Platforms',
    subcategory: 'Online Stores',
    description: 'Shopify es una plataforma completa para crear tiendas en línea y gestionar ventas.',
    pricing: '$29/mes Basic, $79/mes Shopify',
    complexity: 'beginner',
    difficulty_level: 3,
    learning_curve: 'gentle',
    community_size: 'massive',
    integration_options: ['Payment gateways', 'Shipping APIs', 'Marketing tools'],
    tags: ['e-commerce', 'tienda online', 'ventas', 'marketing'],
    logoPlaceholder: 'photo-1506744038136-46273834b3fb',
    website: 'https://shopify.com',
    apiAvailable: true,
    freeVersion: false,
    use_case_examples: [
      'Tiendas en línea',
      'Ventas multicanal',
      'Gestión de inventario',
      'Marketing digital'
    ],
    comparison_matrix: {
      ease_of_use: 8,
      feature_richness: 9,
      pricing_value: 7,
      support_quality: 8,
      scalability: 9
    },
    similar_tools: ['bigcommerce-26', 'woocommerce-27'],
    founded_year: 2006,
    user_rating: 4.5,
    monthly_active_users: '1.7M+',
    key_features: [
      'Plantillas personalizables',
      'Integración con pagos',
      'Herramientas SEO',
      'Soporte 24/7'
    ],
    pros: [
      'Fácil de usar',
      'Gran ecosistema de apps',
      'Escalable para negocios grandes'
    ],
    cons: [
      'Costos adicionales por apps',
      'Comisiones en algunos planes',
      'Limitaciones en personalización avanzada'
    ],
    best_for: [
      'Pequeñas y medianas empresas',
      'Emprendedores',
      'Tiendas físicas que quieren vender online'
    ],
    alternatives: ['BigCommerce', 'WooCommerce', 'Magento']
  },
  {
    id: 'airtable-28',
    name: 'Airtable',
    category: 'Database & Backend',
    subcategory: 'Database Management',
    description: 'Airtable combina hojas de cálculo con bases de datos para gestionar información de forma flexible.',
    pricing: 'Gratis con límites, $10/mes Plus',
    complexity: 'beginner',
    difficulty_level: 3,
    learning_curve: 'gentle',
    community_size: 'large',
    integration_options: ['Zapier', 'API REST', 'Slack'],
    tags: ['base de datos', 'no-code', 'gestión', 'colaboración'],
    logoPlaceholder: 'photo-1515377905703-c4788e51af15',
    website: 'https://airtable.com',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'Gestión de proyectos',
      'Inventarios',
      'CRM',
      'Planificación de eventos'
    ],
    comparison_matrix: {
      ease_of_use: 9,
      feature_richness: 8,
      pricing_value: 8,
      support_quality: 7,
      scalability: 7
    },
    similar_tools: ['notion-29', 'coda-30'],
    founded_year: 2012,
    user_rating: 4.4,
    monthly_active_users: '200K+',
    key_features: [
      'Bases de datos relacionales',
      'Vistas personalizables',
      'Automatizaciones',
      'Colaboración en tiempo real'
    ],
    pros: [
      'Flexible y potente',
      'Interfaz intuitiva',
      'Amplias integraciones'
    ],
    cons: [
      'Limitaciones en plan gratuito',
      'Puede ser complejo para usuarios nuevos',
      'Algunas funciones avanzadas son de pago'
    ],
    best_for: [
      'Equipos pequeños y medianos',
      'Gestión de datos',
      'Usuarios no técnicos'
    ],
    alternatives: ['Notion', 'Coda', 'Google Sheets']
  },
  {
    id: 'slack-31',
    name: 'Slack',
    category: 'Communication',
    subcategory: 'Team Chat',
    description: 'Slack es una plataforma de comunicación para equipos que facilita la colaboración y el intercambio de información.',
    pricing: 'Gratis con límites, $6.67/mes Pro',
    complexity: 'beginner',
    difficulty_level: 2,
    learning_curve: 'immediate',
    community_size: 'massive',
    integration_options: ['Zapier', 'Google Drive', 'Trello', 'GitHub'],
    tags: ['comunicación', 'chat', 'colaboración', 'equipos'],
    logoPlaceholder: 'photo-1504384308090-c894fdcc538d',
    website: 'https://slack.com',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'Comunicación interna',
      'Gestión de proyectos',
      'Integración con herramientas',
      'Notificaciones'
    ],
    comparison_matrix: {
      ease_of_use: 9,
      feature_richness: 8,
      pricing_value: 8,
      support_quality: 8,
      scalability: 9
    },
    similar_tools: ['microsoft-teams-32', 'discord-33'],
    founded_year: 2009,
    user_rating: 4.3,
    monthly_active_users: '12M+',
    key_features: [
      'Canales temáticos',
      'Mensajes directos',
      'Integraciones múltiples',
      'Búsqueda avanzada'
    ],
    pros: [
      'Fácil de usar',
      'Amplias integraciones',
      'Gran comunidad'
    ],
    cons: [
      'Puede ser ruidoso',
      'Limitaciones en plan gratuito',
      'Consumo de recursos'
    ],
    best_for: [
      'Equipos de trabajo',
      'Startups',
      'Empresas medianas y grandes'
    ],
    alternatives: ['Microsoft Teams', 'Discord', 'Google Chat']
  },
  {
    id: 'asana-34',
    name: 'Asana',
    category: 'Project Management',
    subcategory: 'Task Management',
    description: 'Asana es una herramienta para gestionar tareas y proyectos, facilitando la colaboración y seguimiento del trabajo.',
    pricing: 'Gratis con límites, $10.99/mes Premium',
    complexity: 'beginner',
    difficulty_level: 3,
    learning_curve: 'gentle',
    community_size: 'large',
    integration_options: ['Slack', 'Google Drive', 'Zapier'],
    tags: ['gestión de proyectos', 'tareas', 'colaboración', 'productividad'],
    logoPlaceholder: 'photo-1504384308090-c894fdcc538d',
    website: 'https://asana.com',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'Gestión de tareas',
      'Planificación de proyectos',
      'Seguimiento de progreso',
      'Colaboración en equipo'
    ],
    comparison_matrix: {
      ease_of_use: 8,
      feature_richness: 8,
      pricing_value: 7,
      support_quality: 7,
      scalability: 8
    },
    similar_tools: ['trello-35', 'monday-36'],
    founded_year: 2008,
    user_rating: 4.2,
    monthly_active_users: '1.5M+',
    key_features: [
      'Listas y tableros',
      'Cronogramas',
      'Automatizaciones',
      'Reportes'
    ],
    pros: [
      'Interfaz intuitiva',
      'Flexibilidad',
      'Integraciones útiles'
    ],
    cons: [
      'Limitaciones en plan gratuito',
      'Curva de aprendizaje para funciones avanzadas',
      'Puede ser costoso'
    ],
    best_for: [
      'Equipos pequeños y medianos',
      'Gestión de proyectos',
      'Freelancers'
    ],
    alternatives: ['Trello', 'Monday.com', 'ClickUp']
  },
  {
    id: 'google-analytics-37',
    name: 'Google Analytics',
    category: 'Marketing & Analytics',
    subcategory: 'Analytics',
    description: 'Google Analytics proporciona análisis detallados del tráfico y comportamiento de usuarios en sitios web.',
    pricing: 'Gratis',
    complexity: 'intermediate',
    difficulty_level: 5,
    learning_curve: 'moderate',
    community_size: 'massive',
    integration_options: ['Google Ads', 'Google Tag Manager', 'BigQuery'],
    tags: ['analítica', 'marketing', 'datos', 'web'],
    logoPlaceholder: 'photo-1504384308090-c894fdcc538d',
    website: 'https://analytics.google.com',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'Análisis de tráfico web',
      'Medición de conversiones',
      'Segmentación de audiencia',
      'Optimización de campañas'
    ],
    comparison_matrix: {
      ease_of_use: 6,
      feature_richness: 10,
      pricing_value: 10,
      support_quality: 7,
      scalability: 10
    },
    similar_tools: ['mixpanel-38', 'amplitude-39'],
    founded_year: 2005,
    user_rating: 4.4,
    monthly_active_users: '30M+',
    key_features: [
      'Informes en tiempo real',
      'Segmentación avanzada',
      'Integración con Google Ads',
      'Análisis de embudos'
    ],
    pros: [
      'Gratis y potente',
      'Amplia documentación',
      'Integración con ecosistema Google'
    ],
    cons: [
      'Curva de aprendizaje',
      'Cambios frecuentes en interfaz',
      'Limitaciones en datos sin muestreo'
    ],
    best_for: [
      'Marketers',
      'Analistas de datos',
      'Empresas de todos tamaños'
    ],
    alternatives: ['Mixpanel', 'Amplitude', 'Adobe Analytics']
  },
  {
    id: 'react-native-40',
    name: 'React Native',
    category: 'Mobile Development',
    subcategory: 'Cross-platform',
    description: 'React Native permite desarrollar aplicaciones móviles nativas usando JavaScript y React.',
    pricing: 'Gratis',
    complexity: 'advanced',
    difficulty_level: 7,
    learning_curve: 'steep',
    community_size: 'massive',
    integration_options: ['Expo', 'Firebase', 'Redux'],
    tags: ['mobile', 'desarrollo', 'cross-platform', 'javascript'],
    logoPlaceholder: 'photo-1504384308090-c894fdcc538d',
    website: 'https://reactnative.dev',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'Apps móviles iOS y Android',
      'Prototipos rápidos',
      'Aplicaciones multiplataforma',
      'Integración con APIs nativas'
    ],
    comparison_matrix: {
      ease_of_use: 5,
      feature_richness: 9,
      pricing_value: 10,
      support_quality: 8,
      scalability: 9
    },
    similar_tools: ['flutter-41', 'xamarin-42'],
    founded_year: 2015,
    user_rating: 4.3,
    monthly_active_users: '1M+',
    key_features: [
      'Componentes nativos',
      'Hot reload',
      'Gran comunidad',
      'Integración con librerías JS'
    ],
    pros: [
      'Código compartido entre plataformas',
      'Amplia comunidad',
      'Acceso a APIs nativas'
    ],
    cons: [
      'Curva de aprendizaje',
      'Problemas de rendimiento en apps complejas',
      'Dependencia de librerías externas'
    ],
    best_for: [
      'Desarrolladores móviles',
      'Startups',
      'Proyectos multiplataforma'
    ],
    alternatives: ['Flutter', 'Xamarin', 'NativeScript']
  },
  {
    id: 'audacity-43',
    name: 'Audacity',
    category: 'AI Audio & Music',
    subcategory: 'Audio Editing',
    description: 'Audacity es un editor de audio gratuito y de código abierto para grabación y edición de sonido.',
    pricing: 'Gratis',
    complexity: 'beginner',
    difficulty_level: 2,
    learning_curve: 'immediate',
    community_size: 'large',
    integration_options: ['VST Plugins', 'LADSPA', 'Nyquist'],
    tags: ['audio', 'edición', 'grabación', 'música'],
    logoPlaceholder: 'photo-1504384308090-c894fdcc538d',
    website: 'https://audacityteam.org',
    apiAvailable: false,
    freeVersion: true,
    use_case_examples: [
      'Edición de podcasts',
      'Grabación de música',
      'Restauración de audio',
      'Producción de sonido'
    ],
    comparison_matrix: {
      ease_of_use: 7,
      feature_richness: 7,
      pricing_value: 10,
      support_quality: 6,
      scalability: 6
    },
    similar_tools: ['ocenaudio-44', 'wavepad-45'],
    founded_year: 2000,
    user_rating: 4.1,
    monthly_active_users: '500K+',
    key_features: [
      'Grabación multipista',
      'Efectos de audio',
      'Análisis espectral',
      'Soporte para múltiples formatos'
    ],
    pros: [
      'Gratis y de código abierto',
      'Multiplataforma',
      'Amplia comunidad'
    ],
    cons: [
      'Interfaz anticuada',
      'Curva de aprendizaje para funciones avanzadas',
      'No es tan intuitivo para principiantes'
    ],
    best_for: [
      'Podcasters',
      'Músicos',
      'Editores de audio'
    ],
    alternatives: ['Ocenaudio', 'WavePad', 'Adobe Audition']
  },
  {
    id: 'hubspot-46',
    name: 'HubSpot',
    category: 'Marketing & Analytics',
    subcategory: 'CRM Automation',
    description: 'HubSpot es una plataforma de CRM que integra marketing, ventas y servicio al cliente.',
    pricing: 'Gratis básico, planes desde $45/mes',
    complexity: 'intermediate',
    difficulty_level: 5,
    learning_curve: 'moderate',
    community_size: 'large',
    integration_options: ['Zapier', 'Salesforce', 'Mailchimp'],
    tags: ['crm', 'marketing', 'ventas', 'automatización'],
    logoPlaceholder: 'photo-1504384308090-c894fdcc538d',
    website: 'https://hubspot.com',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'Gestión de clientes',
      'Automatización de marketing',
      'Seguimiento de ventas',
      'Atención al cliente'
    ],
    comparison_matrix: {
      ease_of_use: 7,
      feature_richness: 9,
      pricing_value: 7,
      support_quality: 8,
      scalability: 8
    },
    similar_tools: ['salesforce-47', 'pipedrive-48'],
    founded_year: 2006,
    user_rating: 4.3,
    monthly_active_users: '100K+',
    key_features: [
      'Automatización de workflows',
      'Análisis de ventas',
      'Integración con email',
      'Gestión de tickets'
    ],
    pros: [
      'Plataforma todo en uno',
      'Fácil de usar',
      'Amplias integraciones'
    ],
    cons: [
      'Costos elevados en planes avanzados',
      'Curva de aprendizaje',
      'Limitaciones en plan gratuito'
    ],
    best_for: [
      'Equipos de ventas',
      'Marketing digital',
      'Empresas medianas'
    ],
    alternatives: ['Salesforce', 'Pipedrive', 'Zoho CRM']
  },
  {
    id: 'notion-49',
    name: 'Notion',
    category: 'Design & Prototyping',
    subcategory: 'Design Systems',
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
  'Blockchain & Web3'
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
  'Crypto Wallets'
];

export const difficultyLevels = ['beginner', 'intermediate', 'advanced', 'expert'];
export const learningCurves = ['immediate', 'gentle', 'moderate', 'steep'];
export const communitySizes = ['small', 'medium', 'large', 'massive'];

export type { EnhancedTool };
