
import { EnhancedTool } from '../types';

export const communicationTools: EnhancedTool[] = [
  {
    id: 'slack-31',
    name: 'Slack',
    category: 'Communication',
    subcategory: 'Team Chat',
    description: 'Slack es una plataforma de comunicación empresarial que organiza conversaciones en canales y espacios de trabajo.',
    pricing: 'Gratis con límites, Pro $7.25/mes, Business+ $12.50/mes',
    complexity: 'beginner',
    difficulty_level: 2,
    learning_curve: 'gentle',
    community_size: 'massive',
    integration_options: ['Google Workspace', 'Microsoft 365', 'Zoom', 'Jira'],
    tags: ['chat', 'equipos', 'productividad', 'integraciones'],
    logoPlaceholder: 'photo-1611224923853-80b023f02d71',
    website: 'https://slack.com',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'Comunicación de equipos',
      'Coordinación de proyectos',
      'Notificaciones automatizadas',
      'Colaboración remota'
    ],
    comparison_matrix: {
      ease_of_use: 9,
      feature_richness: 8,
      pricing_value: 7,
      support_quality: 8,
      scalability: 9
    },
    similar_tools: ['microsoft-teams-32', 'discord-76'],
    founded_year: 2013,
    user_rating: 4.3,
    monthly_active_users: '18M+',
    key_features: [
      'Canales organizados',
      'Threads de conversación',
      'Apps y bots',
      'Búsqueda avanzada'
    ],
    pros: [
      'Muy fácil de usar',
      'Excelentes integraciones',
      'Búsqueda potente'
    ],
    cons: [
      'Puede ser distractivo',
      'Precio para equipos grandes',
      'Limitaciones en plan gratuito'
    ],
    best_for: [
      'Equipos remotos',
      'Startups',
      'Comunicación empresarial'
    ],
    alternatives: ['Microsoft Teams', 'Discord', 'Mattermost']
  },
  {
    id: 'zoom-32',
    name: 'Zoom',
    category: 'Communication',
    subcategory: 'Video Conferencing',
    description: 'Zoom es una plataforma de videoconferencias que permite reuniones, webinars y comunicación por video.',
    pricing: 'Basic gratis, Pro $14.99/mes, Business $19.99/mes',
    complexity: 'beginner',
    difficulty_level: 2,
    learning_curve: 'immediate',
    community_size: 'massive',
    integration_options: ['Calendar apps', 'Slack', 'Microsoft Teams', 'Salesforce'],
    tags: ['video', 'reuniones', 'webinars', 'colaboración'],
    logoPlaceholder: 'photo-1587620962725-abab7fe55159',
    website: 'https://zoom.us',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'Reuniones de equipo',
      'Conferencias virtuales',
      'Clases online',
      'Webinars'
    ],
    comparison_matrix: {
      ease_of_use: 10,
      feature_richness: 8,
      pricing_value: 9,
      support_quality: 8,
      scalability: 10
    },
    similar_tools: ['google-meet-33', 'microsoft-teams-32'],
    founded_year: 2011,
    user_rating: 4.4,
    monthly_active_users: '300M+',
    key_features: [
      'HD video/audio',
      'Screen sharing',
      'Recording',
      'Breakout rooms'
    ],
    pros: [
      'Muy confiable',
      'Excelente calidad',
      'Fácil de usar'
    ],
    cons: [
      'Límites en plan gratuito',
      'Preocupaciones de seguridad',
      'Funciones básicas'
    ],
    best_for: [
      'Reuniones profesionales',
      'Educación online',
      'Eventos virtuales'
    ],
    alternatives: ['Google Meet', 'Microsoft Teams', 'Webex']
  },
  {
    id: 'mailchimp-33',
    name: 'Mailchimp',
    category: 'Communication',
    subcategory: 'Email Marketing',
    description: 'Mailchimp es una plataforma de marketing por email que permite crear, enviar y analizar campañas de email.',
    pricing: 'Gratis hasta 500 contactos, Essentials $13/mes',
    complexity: 'beginner',
    difficulty_level: 3,
    learning_curve: 'gentle',
    community_size: 'massive',
    integration_options: ['E-commerce platforms', 'CRM', 'Social media', 'Analytics'],
    tags: ['email marketing', 'automatización', 'analytics', 'templates'],
    logoPlaceholder: 'photo-1563013544-824ae1b704d3',
    website: 'https://mailchimp.com',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'Newsletters',
      'Campañas promocionales',
      'Email automation',
      'Landing pages'
    ],
    comparison_matrix: {
      ease_of_use: 9,
      feature_richness: 8,
      pricing_value: 8,
      support_quality: 8,
      scalability: 8
    },
    similar_tools: ['convertkit-34', 'constant-contact-35'],
    founded_year: 2001,
    user_rating: 4.2,
    monthly_active_users: '14M+',
    key_features: [
      'Drag-and-drop editor',
      'Automation workflows',
      'A/B testing',
      'Analytics detallado'
    ],
    pros: [
      'Plan gratuito generoso',
      'Interfaz intuitiva',
      'Buenas integraciones'
    ],
    cons: [
      'Precio escala rápidamente',
      'Limitaciones en automatización',
      'Soporte variable'
    ],
    best_for: [
      'Pequeñas empresas',
      'E-commerce',
      'Content creators'
    ],
    alternatives: ['ConvertKit', 'Constant Contact', 'AWeber']
  }
];
