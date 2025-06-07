
import { EnhancedTool } from '../types';

export const businessAutomationTools: EnhancedTool[] = [
  {
    id: 'make-46',
    name: 'Make (Integromat)',
    category: 'Business Automation',
    subcategory: 'Workflow Automation',
    description: 'Make es una plataforma de automatización visual que permite crear flujos de trabajo complejos entre aplicaciones sin código.',
    pricing: 'Gratis hasta 1,000 operaciones/mes, Core $9/mes',
    complexity: 'intermediate',
    difficulty_level: 5,
    learning_curve: 'moderate',
    community_size: 'large',
    integration_options: ['1000+ aplicaciones', 'Webhooks', 'API REST', 'HTTP'],
    tags: ['automatización', 'integración', 'workflows', 'visual'],
    logoPlaceholder: 'photo-1551288049-bebda4e38f71',
    website: 'https://make.com',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'Automatización de ventas',
      'Sincronización de datos',
      'Procesos de marketing',
      'Gestión de inventario'
    ],
    comparison_matrix: {
      ease_of_use: 7,
      feature_richness: 9,
      pricing_value: 8,
      support_quality: 8,
      scalability: 9
    },
    similar_tools: ['zapier-22', 'power-automate-47'],
    founded_year: 2012,
    user_rating: 4.5,
    monthly_active_users: '500K+',
    key_features: [
      'Editor visual de flujos',
      'Ejecución en tiempo real',
      'Manejo de errores avanzado',
      'Transformación de datos'
    ],
    pros: [
      'Muy potente y flexible',
      'Interfaz visual clara',
      'Excelente para flujos complejos'
    ],
    cons: [
      'Curva de aprendizaje pronunciada',
      'Puede ser costoso para uso intensivo',
      'Interfaz puede ser abrumadora'
    ],
    best_for: [
      'Empresas medianas',
      'Automatización compleja',
      'Equipos técnicos'
    ],
    alternatives: ['Zapier', 'Microsoft Power Automate', 'n8n']
  },
  {
    id: 'calendly-47',
    name: 'Calendly',
    category: 'Business Automation',
    subcategory: 'Scheduling',
    description: 'Calendly automatiza la programación de reuniones y citas, eliminando el intercambio de emails para coordinar horarios.',
    pricing: 'Gratis básico, Essentials $8/mes, Professional $12/mes',
    complexity: 'beginner',
    difficulty_level: 2,
    learning_curve: 'immediate',
    community_size: 'massive',
    integration_options: ['Zoom', 'Google Calendar', 'Outlook', 'Salesforce'],
    tags: ['programación', 'reuniones', 'calendario', 'productividad'],
    logoPlaceholder: 'photo-1506905925346-21bda4d32df4',
    website: 'https://calendly.com',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'Reuniones de ventas',
      'Consultas médicas',
      'Entrevistas de trabajo',
      'Sesiones de coaching'
    ],
    comparison_matrix: {
      ease_of_use: 10,
      feature_richness: 8,
      pricing_value: 8,
      support_quality: 8,
      scalability: 8
    },
    similar_tools: ['acuity-48', 'booksy-49'],
    founded_year: 2013,
    user_rating: 4.7,
    monthly_active_users: '10M+',
    key_features: [
      'Programación automática',
      'Múltiples tipos de eventos',
      'Integraciones de video',
      'Recordatorios automáticos'
    ],
    pros: [
      'Extremadamente fácil de usar',
      'Elimina el back-and-forth',
      'Excelentes integraciones'
    ],
    cons: [
      'Limitaciones en plan gratuito',
      'Funciones avanzadas de pago',
      'Personalización limitada'
    ],
    best_for: [
      'Profesionales que programan reuniones',
      'Equipos de ventas',
      'Consultores'
    ],
    alternatives: ['Acuity Scheduling', 'YouCanBookMe', 'Booksy']
  },
  {
    id: 'typeform-48',
    name: 'Typeform',
    category: 'Business Automation',
    subcategory: 'Data Collection',
    description: 'Typeform crea formularios interactivos y encuestas que mejoran la experiencia del usuario y aumentan las tasas de respuesta.',
    pricing: 'Gratis hasta 100 respuestas/mes, Basic $25/mes',
    complexity: 'beginner',
    difficulty_level: 3,
    learning_curve: 'gentle',
    community_size: 'large',
    integration_options: ['Zapier', 'Google Sheets', 'Mailchimp', 'Slack'],
    tags: ['formularios', 'encuestas', 'interactivo', 'conversacional'],
    logoPlaceholder: 'photo-1460925895917-afdab827c52f',
    website: 'https://typeform.com',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'Encuestas de satisfacción',
      'Formularios de contacto',
      'Cuestionarios de leads',
      'Evaluaciones de empleados'
    ],
    comparison_matrix: {
      ease_of_use: 9,
      feature_richness: 7,
      pricing_value: 6,
      support_quality: 7,
      scalability: 7
    },
    similar_tools: ['google-forms-49', 'jotform-50'],
    founded_year: 2012,
    user_rating: 4.4,
    monthly_active_users: '500K+',
    key_features: [
      'Formularios conversacionales',
      'Lógica condicional',
      'Diseños personalizables',
      'Análisis en tiempo real'
    ],
    pros: [
      'Interfaz muy atractiva',
      'Alta tasa de conversión',
      'Experiencia móvil excelente'
    ],
    cons: [
      'Precio elevado para funciones básicas',
      'Limitaciones en plan gratuito',
      'Menos funciones que competidores'
    ],
    best_for: [
      'Marketing y ventas',
      'Investigación de mercado',
      'Recolección de feedback'
    ],
    alternatives: ['Google Forms', 'JotForm', 'SurveyMonkey']
  }
];
