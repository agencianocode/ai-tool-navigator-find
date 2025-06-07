
import { EnhancedTool } from '../types';

export const businessAutomationTools: EnhancedTool[] = [
  {
    id: 'zapier-automation-77',
    name: 'Zapier',
    category: 'Business Automation',
    subcategory: 'Workflow Automation',
    description: 'Zapier conecta aplicaciones y automatiza flujos de trabajo sin necesidad de programación.',
    pricing: 'Gratis con límites, $19.99/mes Starter',
    complexity: 'beginner',
    difficulty_level: 3,
    learning_curve: 'gentle',
    community_size: 'massive',
    integration_options: ['5000+ aplicaciones', 'Webhooks', 'API REST'],
    tags: ['automatización', 'integración', 'flujos de trabajo', 'productividad'],
    logoPlaceholder: 'photo-1518709268805-4e9042af2176',
    website: 'https://zapier.com',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'Automatización de emails',
      'Sincronización de datos',
      'Notificaciones automáticas',
      'Generación de reportes'
    ],
    comparison_matrix: {
      ease_of_use: 9,
      feature_richness: 9,
      pricing_value: 7,
      support_quality: 8,
      scalability: 9
    },
    similar_tools: ['make-78', 'microsoft-power-automate-79'],
    founded_year: 2011,
    user_rating: 4.4,
    monthly_active_users: '5M+',
    key_features: [
      'Miles de integraciones',
      'Editor visual de flujos',
      'Triggers automáticos',
      'Filtros y condiciones'
    ],
    pros: [
      'Muy fácil de usar',
      'Muchas integraciones',
      'Comunidad activa'
    ],
    cons: [
      'Puede ser caro para uso intensivo',
      'Límites en plan gratuito',
      'Dependiente de APIs externas'
    ],
    best_for: [
      'Pequeñas empresas',
      'Freelancers',
      'Equipos de marketing'
    ],
    alternatives: ['Make', 'Microsoft Power Automate', 'IFTTT']
  },
  {
    id: 'monday-78',
    name: 'Monday.com',
    category: 'Business Automation',
    subcategory: 'Project Management',
    description: 'Monday.com es una plataforma de gestión de trabajo que automatiza procesos empresariales.',
    pricing: 'Basic $8/usuario/mes, Standard $10/usuario/mes, Pro $16/usuario/mes',
    complexity: 'intermediate',
    difficulty_level: 4,
    learning_curve: 'moderate',
    community_size: 'large',
    integration_options: ['Slack', 'Google Workspace', 'Microsoft Teams', 'Zapier'],
    tags: ['project management', 'workflow', 'team collaboration', 'automation'],
    logoPlaceholder: 'photo-1611224923853-80b023f02d71',
    website: 'https://monday.com',
    apiAvailable: true,
    freeVersion: false,
    use_case_examples: [
      'Gestión de proyectos',
      'Tracking de tareas',
      'Automatización de workflows',
      'Reportes automáticos'
    ],
    comparison_matrix: {
      ease_of_use: 8,
      feature_richness: 9,
      pricing_value: 7,
      support_quality: 8,
      scalability: 9
    },
    similar_tools: ['asana-79', 'trello-80'],
    founded_year: 2012,
    user_rating: 4.6,
    monthly_active_users: '152K+ teams',
    key_features: [
      'Visual project boards',
      'Automation recipes',
      'Time tracking',
      'Custom dashboards'
    ],
    pros: [
      'Muy visual e intuitivo',
      'Automatización potente',
      'Excelente para equipos'
    ],
    cons: [
      'Precio puede ser alto',
      'Curva de aprendizaje',
      'No hay plan gratuito'
    ],
    best_for: [
      'Equipos medianos y grandes',
      'Gestión de proyectos',
      'Empresas que necesitan automatización'
    ],
    alternatives: ['Asana', 'Trello', 'ClickUp']
  },
  {
    id: 'calendly-79',
    name: 'Calendly',
    category: 'Business Automation',
    subcategory: 'Scheduling Automation',
    description: 'Calendly automatiza la programación de reuniones eliminando emails de ida y vuelta.',
    pricing: 'Gratis con límites, Essentials $8/mes, Professional $12/mes',
    complexity: 'beginner',
    difficulty_level: 2,
    learning_curve: 'immediate',
    community_size: 'large',
    integration_options: ['Google Calendar', 'Outlook', 'Zoom', 'Salesforce'],
    tags: ['scheduling', 'calendario', 'automatización', 'reuniones'],
    logoPlaceholder: 'photo-1611224923853-80b023f02d71',
    website: 'https://calendly.com',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'Programar reuniones',
      'Consultas de ventas',
      'Entrevistas',
      'Sesiones de coaching'
    ],
    comparison_matrix: {
      ease_of_use: 10,
      feature_richness: 7,
      pricing_value: 9,
      support_quality: 8,
      scalability: 8
    },
    similar_tools: ['acuity-scheduling-80', 'doodle-81'],
    founded_year: 2013,
    user_rating: 4.7,
    monthly_active_users: '10M+',
    key_features: [
      'Link de programación',
      'Disponibilidad personalizada',
      'Integración con calendarios',
      'Recordatorios automáticos'
    ],
    pros: [
      'Extremadamente fácil',
      'Ahorra mucho tiempo',
      'Integración perfecta'
    ],
    cons: [
      'Funciones limitadas gratis',
      'Personalización limitada',
      'Dependiente de calendarios externos'
    ],
    best_for: [
      'Profesionales de ventas',
      'Consultores',
      'Cualquiera que programe reuniones'
    ],
    alternatives: ['Acuity Scheduling', 'Doodle', 'When2meet']
  }
];
