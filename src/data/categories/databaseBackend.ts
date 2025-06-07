
import { EnhancedTool } from '../types';

export const databaseBackendTools: EnhancedTool[] = [
  {
    id: 'supabase-28',
    name: 'Supabase',
    category: 'Database & Backend',
    subcategory: 'Backend as a Service',
    description: 'Supabase es una alternativa open source a Firebase que proporciona base de datos, autenticación y APIs en tiempo real.',
    pricing: 'Gratis hasta 2 proyectos, Pro $25/mes',
    complexity: 'intermediate',
    difficulty_level: 4,
    learning_curve: 'moderate',
    community_size: 'large',
    integration_options: ['PostgreSQL', 'Next.js', 'React', 'Vue', 'Flutter'],
    tags: ['PostgreSQL', 'open source', 'tiempo real', 'autenticación'],
    logoPlaceholder: 'photo-1518709268805-4e9042af2176',
    website: 'https://supabase.com',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'Apps web y móviles',
      'APIs REST',
      'Chat en tiempo real',
      'Autenticación de usuarios'
    ],
    comparison_matrix: {
      ease_of_use: 8,
      feature_richness: 8,
      pricing_value: 9,
      support_quality: 8,
      scalability: 8
    },
    similar_tools: ['firebase-29', 'planetscale-30'],
    founded_year: 2020,
    user_rating: 4.6,
    monthly_active_users: '500K+',
    key_features: [
      'PostgreSQL completo',
      'Auth incorporado',
      'APIs auto-generadas',
      'Storage de archivos'
    ],
    pros: [
      'Open source',
      'PostgreSQL real',
      'Excelente DX'
    ],
    cons: [
      'Relativamente nuevo',
      'Menos maduro que Firebase',
      'Documentación en crecimiento'
    ],
    best_for: [
      'Desarrolladores que prefieren SQL',
      'Proyectos open source',
      'Apps que necesitan PostgreSQL'
    ],
    alternatives: ['Firebase', 'PlanetScale', 'Railway']
  },
  {
    id: 'firebase-29',
    name: 'Firebase',
    category: 'Database & Backend',
    subcategory: 'Backend as a Service',
    description: 'Firebase es una plataforma de desarrollo de Google que proporciona backend, base de datos y hosting.',
    pricing: 'Spark gratis, Blaze pay-as-you-go',
    complexity: 'beginner',
    difficulty_level: 3,
    learning_curve: 'gentle',
    community_size: 'massive',
    integration_options: ['Google Cloud', 'Android', 'iOS', 'Web', 'Unity'],
    tags: ['Google', 'NoSQL', 'tiempo real', 'móvil'],
    logoPlaceholder: 'photo-1518709268805-4e9042af2176',
    website: 'https://firebase.google.com',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'Apps móviles',
      'Apps web en tiempo real',
      'Autenticación social',
      'Push notifications'
    ],
    comparison_matrix: {
      ease_of_use: 9,
      feature_richness: 9,
      pricing_value: 8,
      support_quality: 9,
      scalability: 9
    },
    similar_tools: ['supabase-28', 'aws-amplify-30'],
    founded_year: 2011,
    user_rating: 4.4,
    monthly_active_users: '2M+',
    key_features: [
      'Firestore database',
      'Authentication',
      'Cloud functions',
      'Analytics'
    ],
    pros: [
      'Muy fácil de usar',
      'Excelente para móviles',
      'Escalabilidad automática'
    ],
    cons: [
      'Vendor lock-in',
      'NoSQL puede ser limitante',
      'Precios pueden escalar'
    ],
    best_for: [
      'Desarrollo móvil',
      'Prototipos rápidos',
      'Apps en tiempo real'
    ],
    alternatives: ['Supabase', 'AWS Amplify', 'PocketBase']
  },
  {
    id: 'planetscale-30',
    name: 'PlanetScale',
    category: 'Database & Backend',
    subcategory: 'Database Platform',
    description: 'PlanetScale es una plataforma de base de datos MySQL serverless con branching como Git.',
    pricing: 'Hobby gratis, Scaler $29/mes',
    complexity: 'intermediate',
    difficulty_level: 5,
    learning_curve: 'moderate',
    community_size: 'medium',
    integration_options: ['Prisma', 'Next.js', 'Vercel', 'MySQL'],
    tags: ['MySQL', 'serverless', 'branching', 'escalable'],
    logoPlaceholder: 'photo-1518709268805-4e9042af2176',
    website: 'https://planetscale.com',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'Apps web escalables',
      'Desarrollo colaborativo',
      'Migraciones seguras',
      'APIs de alto rendimiento'
    ],
    comparison_matrix: {
      ease_of_use: 7,
      feature_richness: 8,
      pricing_value: 8,
      support_quality: 8,
      scalability: 10
    },
    similar_tools: ['supabase-28', 'railway-31'],
    founded_year: 2018,
    user_rating: 4.5,
    monthly_active_users: '100K+',
    key_features: [
      'Database branching',
      'Zero-downtime migrations',
      'Automatic scaling',
      'Connection pooling'
    ],
    pros: [
      'Branching innovador',
      'Excelente rendimiento',
      'Sin downtime'
    ],
    cons: [
      'Solo MySQL',
      'Precio puede ser alto',
      'Curva de aprendizaje'
    ],
    best_for: [
      'Aplicaciones MySQL',
      'Equipos colaborativos',
      'Apps de alto tráfico'
    ],
    alternatives: ['Supabase', 'Railway', 'Neon']
  }
];
