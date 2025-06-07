
import { EnhancedTool } from '../types';

export const marketingAnalyticsTools: EnhancedTool[] = [
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
    id: 'hubspot-38',
    name: 'HubSpot',
    category: 'Marketing & Analytics',
    subcategory: 'CRM & Marketing',
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
    similar_tools: ['salesforce-39', 'pipedrive-40'],
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
    id: 'mailchimp-39',
    name: 'Mailchimp',
    category: 'Marketing & Analytics',
    subcategory: 'Email Marketing',
    description: 'Mailchimp es una plataforma de email marketing con automatización y análisis avanzados.',
    pricing: 'Gratis hasta 2,000 contactos, Essentials $10/mes',
    complexity: 'beginner',
    difficulty_level: 3,
    learning_curve: 'gentle',
    community_size: 'massive',
    integration_options: ['Shopify', 'WordPress', 'Zapier', 'Facebook'],
    tags: ['email marketing', 'automatización', 'newsletters', 'campanhas'],
    logoPlaceholder: 'photo-1596526131083-e8c633c948d2',
    website: 'https://mailchimp.com',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'Newsletters',
      'Campañas de email',
      'Automatización de marketing',
      'Segmentación de audiencias'
    ],
    comparison_matrix: {
      ease_of_use: 9,
      feature_richness: 8,
      pricing_value: 8,
      support_quality: 7,
      scalability: 8
    },
    similar_tools: ['convertkit-40', 'sendinblue-41'],
    founded_year: 2001,
    user_rating: 4.2,
    monthly_active_users: '12M+',
    key_features: [
      'Editor de emails drag & drop',
      'Automatizaciones',
      'Análisis detallados',
      'Segmentación avanzada'
    ],
    pros: [
      'Muy fácil de usar',
      'Plantillas hermosas',
      'Plan gratuito generoso'
    ],
    cons: [
      'Precios escalables',
      'Limitaciones en automatización',
      'Soporte limitado en plan gratuito'
    ],
    best_for: [
      'Pequeñas empresas',
      'E-commerce',
      'Content creators'
    ],
    alternatives: ['ConvertKit', 'Sendinblue', 'Campaign Monitor']
  }
];
