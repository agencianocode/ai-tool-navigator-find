
import { EnhancedTool } from '../types';

export const marketingAnalyticsTools: EnhancedTool[] = [
  {
    id: 'google-analytics-37',
    name: 'Google Analytics',
    category: 'Marketing & Analytics',
    subcategory: 'Web Analytics',
    description: 'Google Analytics es la plataforma líder de análisis web que proporciona insights detallados sobre el tráfico del sitio.',
    pricing: 'Gratis, Analytics 360 bajo consulta',
    complexity: 'intermediate',
    difficulty_level: 5,
    learning_curve: 'moderate',
    community_size: 'massive',
    integration_options: ['Google Ads', 'Search Console', 'Tag Manager', 'Data Studio'],
    tags: ['analytics', 'web', 'gratis', 'informes'],
    logoPlaceholder: 'photo-1460925895917-afdab827c52f',
    website: 'https://analytics.google.com',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'Análisis de tráfico web',
      'Conversiones e-commerce',
      'Behavior analysis',
      'Attribution modeling'
    ],
    comparison_matrix: {
      ease_of_use: 6,
      feature_richness: 10,
      pricing_value: 10,
      support_quality: 7,
      scalability: 10
    },
    similar_tools: ['adobe-analytics-38', 'hotjar-39'],
    founded_year: 2005,
    user_rating: 4.3,
    monthly_active_users: '50M+',
    key_features: [
      'Real-time reporting',
      'Custom dimensions',
      'Goal tracking',
      'Audience insights'
    ],
    pros: [
      'Completamente gratuito',
      'Muy completo',
      'Integración con Google'
    ],
    cons: [
      'Curva de aprendizaje empinada',
      'Interfaz compleja',
      'Privacy concerns'
    ],
    best_for: [
      'Todos los sitios web',
      'E-commerce',
      'Digital marketers'
    ],
    alternatives: ['Adobe Analytics', 'Hotjar', 'Mixpanel']
  },
  {
    id: 'hubspot-38',
    name: 'HubSpot',
    category: 'Marketing & Analytics',
    subcategory: 'CRM & Marketing',
    description: 'HubSpot es una plataforma integral de CRM, marketing, ventas y servicio al cliente con herramientas gratuitas.',
    pricing: 'Gratis con límites, Starter $45/mes, Professional $800/mes',
    complexity: 'intermediate',
    difficulty_level: 4,
    learning_curve: 'moderate',
    community_size: 'large',
    integration_options: ['Salesforce', 'WordPress', 'Shopify', 'Slack'],
    tags: ['CRM', 'marketing automation', 'inbound', 'lead generation'],
    logoPlaceholder: 'photo-1560472354-b33ff0c44a43',
    website: 'https://hubspot.com',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'Lead nurturing',
      'Email marketing',
      'Sales pipeline',
      'Customer service'
    ],
    comparison_matrix: {
      ease_of_use: 8,
      feature_richness: 9,
      pricing_value: 7,
      support_quality: 9,
      scalability: 8
    },
    similar_tools: ['salesforce-39', 'pipedrive-40'],
    founded_year: 2006,
    user_rating: 4.4,
    monthly_active_users: '135K+',
    key_features: [
      'CRM gratuito',
      'Marketing automation',
      'Landing pages',
      'Analytics dashboard'
    ],
    pros: [
      'Plan gratuito robusto',
      'All-in-one platform',
      'Excelente onboarding'
    ],
    cons: [
      'Precio escala rápidamente',
      'Puede ser complejo',
      'Limitaciones en integraciones'
    ],
    best_for: [
      'Pequeñas y medianas empresas',
      'Inbound marketing',
      'Sales teams'
    ],
    alternatives: ['Salesforce', 'Pipedrive', 'ActiveCampaign']
  },
  {
    id: 'hotjar-39',
    name: 'Hotjar',
    category: 'Marketing & Analytics',
    subcategory: 'User Experience',
    description: 'Hotjar es una herramienta de análisis de comportamiento que muestra cómo los usuarios interactúan con tu sitio web.',
    pricing: 'Gratis hasta 35 sesiones/día, Plus $32/mes',
    complexity: 'beginner',
    difficulty_level: 3,
    learning_curve: 'gentle',
    community_size: 'large',
    integration_options: ['Google Analytics', 'Slack', 'Zapier', 'Segment'],
    tags: ['heatmaps', 'user behavior', 'recordings', 'feedback'],
    logoPlaceholder: 'photo-1551288049-bebda4e38f71',
    website: 'https://hotjar.com',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'Heatmaps de páginas',
      'Session recordings',
      'User feedback',
      'Conversion optimization'
    ],
    comparison_matrix: {
      ease_of_use: 9,
      feature_richness: 7,
      pricing_value: 8,
      support_quality: 8,
      scalability: 7
    },
    similar_tools: ['fullstory-40', 'logrocket-41'],
    founded_year: 2014,
    user_rating: 4.3,
    monthly_active_users: '600K+',
    key_features: [
      'Heatmaps visuales',
      'Session recordings',
      'Feedback polls',
      'Form analytics'
    ],
    pros: [
      'Muy fácil de implementar',
      'Insights visuales claros',
      'Plan gratuito útil'
    ],
    cons: [
      'Limitado en plan gratuito',
      'No es real-time',
      'Privacy concerns'
    ],
    best_for: [
      'UX designers',
      'Conversion optimization',
      'E-commerce sites'
    ],
    alternatives: ['FullStory', 'LogRocket', 'Crazy Egg']
  }
];
