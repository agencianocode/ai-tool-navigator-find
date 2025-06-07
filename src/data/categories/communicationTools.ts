
import { EnhancedTool } from '../types';

export const communicationTools: EnhancedTool[] = [
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
    id: 'zoom-32',
    name: 'Zoom',
    category: 'Communication',
    subcategory: 'Video Conferencing',
    description: 'Zoom es una plataforma de videoconferencias que permite reuniones virtuales, webinars y colaboración remota.',
    pricing: 'Gratis hasta 40 min, $14.99/mes Pro',
    complexity: 'beginner',
    difficulty_level: 2,
    learning_curve: 'immediate',
    community_size: 'massive',
    integration_options: ['Calendario', 'Slack', 'Salesforce', 'HubSpot'],
    tags: ['videoconferencias', 'reuniones', 'webinars', 'remoto'],
    logoPlaceholder: 'photo-1587620962725-abab7fe55159',
    website: 'https://zoom.us',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'Reuniones de equipo',
      'Webinars',
      'Educación online',
      'Consultas virtuales'
    ],
    comparison_matrix: {
      ease_of_use: 10,
      feature_richness: 8,
      pricing_value: 9,
      support_quality: 8,
      scalability: 9
    },
    similar_tools: ['teams-33', 'meet-34'],
    founded_year: 2011,
    user_rating: 4.4,
    monthly_active_users: '300M+',
    key_features: [
      'HD video y audio',
      'Grabación de reuniones',
      'Compartir pantalla',
      'Salas de espera'
    ],
    pros: [
      'Muy fácil de usar',
      'Excelente calidad',
      'Funciones avanzadas'
    ],
    cons: [
      'Limitaciones en plan gratuito',
      'Preocupaciones de seguridad pasadas',
      'Puede consumir mucho ancho de banda'
    ],
    best_for: [
      'Empresas de todos tamaños',
      'Educación',
      'Trabajo remoto'
    ],
    alternatives: ['Microsoft Teams', 'Google Meet', 'WebEx']
  },
  {
    id: 'discord-33',
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
  }
];
