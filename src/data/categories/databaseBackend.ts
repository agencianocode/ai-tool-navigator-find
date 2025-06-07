
import { EnhancedTool } from '../types';

export const databaseBackendTools: EnhancedTool[] = [
  {
    id: 'supabase-28',
    name: 'Supabase',
    category: 'Database & Backend',
    subcategory: 'Backend Services',
    description: 'Supabase es una alternativa open source a Firebase que proporciona base de datos, autenticación y APIs en tiempo real.',
    pricing: 'Gratis hasta 500MB, $25/mes Pro',
    complexity: 'intermediate',
    difficulty_level: 5,
    learning_curve: 'moderate',
    community_size: 'large',
    integration_options: ['PostgreSQL', 'REST APIs', 'GraphQL', 'Realtime'],
    tags: ['backend', 'database', 'PostgreSQL', 'open source'],
    logoPlaceholder: 'photo-1518709268805-4e9042af2176',
    website: 'https://supabase.com',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'Aplicaciones web',
      'Apps móviles',
      'APIs backend',
      'Autenticación'
    ],
    comparison_matrix: {
      ease_of_use: 8,
      feature_richness: 9,
      pricing_value: 9,
      support_quality: 8,
      scalability: 8
    },
    similar_tools: ['firebase-29', 'planetscale-30'],
    founded_year: 2020,
    user_rating: 4.7,
    monthly_active_users: '200K+',
    key_features: [
      'PostgreSQL gestionado',
      'Autenticación integrada',
      'APIs automáticas',
      'Tiempo real'
    ],
    pros: [
      'Open source',
      'PostgreSQL completo',
      'Fácil de usar'
    ],
    cons: [
      'Relativamente nuevo',
      'Menos integraciones que Firebase',
      'Documentación en evolución'
    ],
    best_for: [
      'Desarrolladores web',
      'Startups',
      'Aplicaciones modernas'
    ],
    alternatives: ['Firebase', 'PlanetScale', 'Railway']
  },
  {
    id: 'airtable-29',
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
    similar_tools: ['notion-30', 'coda-31'],
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
    id: 'mongodb-30',
    name: 'MongoDB Atlas',
    category: 'Database & Backend',
    subcategory: 'Cloud Databases',
    description: 'MongoDB Atlas es una base de datos NoSQL gestionada en la nube con escalabilidad automática.',
    pricing: 'Gratis hasta 512MB, $57/mes M10',
    complexity: 'advanced',
    difficulty_level: 7,
    learning_curve: 'steep',
    community_size: 'massive',
    integration_options: ['Drivers múltiples', 'Atlas Search', 'Realm'],
    tags: ['NoSQL', 'documento', 'escalable', 'nube'],
    logoPlaceholder: 'photo-1518709268805-4e9042af2176',
    website: 'https://mongodb.com/atlas',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'Aplicaciones web',
      'APIs backend',
      'Análisis de datos',
      'IoT'
    ],
    comparison_matrix: {
      ease_of_use: 6,
      feature_richness: 9,
      pricing_value: 7,
      support_quality: 8,
      scalability: 10
    },
    similar_tools: ['firestore-31', 'dynamodb-32'],
    founded_year: 2007,
    user_rating: 4.3,
    monthly_active_users: '500K+',
    key_features: [
      'Escalabilidad automática',
      'Búsqueda integrada',
      'Seguridad avanzada',
      'Multi-nube'
    ],
    pros: [
      'Muy escalable',
      'Flexible para datos no estructurados',
      'Ecosistema robusto'
    ],
    cons: [
      'Curva de aprendizaje pronunciada',
      'Puede ser costoso',
      'Consumo de memoria'
    ],
    best_for: [
      'Aplicaciones escalables',
      'Desarrolladores experimentados',
      'Datos no estructurados'
    ],
    alternatives: ['Firestore', 'DynamoDB', 'CouchDB']
  }
];
