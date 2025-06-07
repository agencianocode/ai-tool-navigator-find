
import { EnhancedTool } from '../types';

export const noCodePlatformsTools: EnhancedTool[] = [
  {
    id: 'webflow-12',
    name: 'Webflow',
    category: 'No-Code Platforms',
    subcategory: 'Web Applications',
    description: 'Webflow es una plataforma de diseño web visual que permite crear sitios responsivos sin programar.',
    pricing: 'Gratis con límites, Basic $14/mes, CMS $23/mes',
    complexity: 'intermediate',
    difficulty_level: 5,
    learning_curve: 'moderate',
    community_size: 'large',
    integration_options: ['Zapier', 'Google Analytics', 'Mailchimp', 'Shopify'],
    tags: ['diseño web', 'visual', 'CMS', 'responsivo'],
    logoPlaceholder: 'photo-1460925895917-afdab827c52f',
    website: 'https://webflow.com',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'Sitios web corporativos',
      'Landing pages',
      'Portafolios',
      'Blogs'
    ],
    comparison_matrix: {
      ease_of_use: 7,
      feature_richness: 9,
      pricing_value: 7,
      support_quality: 8,
      scalability: 8
    },
    similar_tools: ['bubble-13', 'framer-21'],
    founded_year: 2013,
    user_rating: 4.4,
    monthly_active_users: '3.5M+',
    key_features: [
      'Editor visual avanzado',
      'CMS integrado',
      'Animaciones CSS',
      'Hosting incluido'
    ],
    pros: [
      'Control de diseño total',
      'Código limpio generado',
      'SEO optimizado'
    ],
    cons: [
      'Curva de aprendizaje empinada',
      'Precio puede ser alto',
      'Requiere conocimiento de diseño'
    ],
    best_for: [
      'Diseñadores',
      'Agencias',
      'Sitios complejos'
    ],
    alternatives: ['Bubble', 'Framer', 'WordPress']
  },
  {
    id: 'bubble-13',
    name: 'Bubble',
    category: 'No-Code Platforms',
    subcategory: 'Web Applications',
    description: 'Bubble permite crear aplicaciones web completas sin código, con base de datos y lógica incluida.',
    pricing: 'Gratis con límites, Starter $29/mes, Growth $119/mes',
    complexity: 'advanced',
    difficulty_level: 6,
    learning_curve: 'steep',
    community_size: 'medium',
    integration_options: ['APIs', 'Plugins', 'Zapier', 'Stripe'],
    tags: ['aplicaciones web', 'base de datos', 'lógica', 'startup'],
    logoPlaceholder: 'photo-1460925895917-afdab827c52f',
    website: 'https://bubble.io',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'SaaS applications',
      'Marketplaces',
      'Social networks',
      'Internal tools'
    ],
    comparison_matrix: {
      ease_of_use: 6,
      feature_richness: 10,
      pricing_value: 8,
      support_quality: 7,
      scalability: 8
    },
    similar_tools: ['webflow-12', 'adalo-14'],
    founded_year: 2012,
    user_rating: 4.1,
    monthly_active_users: '500K+',
    key_features: [
      'Visual programming',
      'Database management',
      'User authentication',
      'API integrations'
    ],
    pros: [
      'Muy potente',
      'Apps complejas posibles',
      'Base de datos incluida'
    ],
    cons: [
      'Curva de aprendizaje alta',
      'Performance limitations',
      'Vendor lock-in'
    ],
    best_for: [
      'Fundadores de startups',
      'MVPs complejos',
      'Apps con lógica'
    ],
    alternatives: ['Webflow', 'Adalo', 'FlutterFlow']
  },
  {
    id: 'airtable-14',
    name: 'Airtable',
    category: 'No-Code Platforms',
    subcategory: 'Database Management',
    description: 'Airtable combina la simplicidad de una hoja de cálculo con la potencia de una base de datos.',
    pricing: 'Gratis con límites, Plus $10/mes, Pro $20/mes',
    complexity: 'beginner',
    difficulty_level: 3,
    learning_curve: 'gentle',
    community_size: 'large',
    integration_options: ['Zapier', 'Slack', 'Google Calendar', 'Mailchimp'],
    tags: ['base de datos', 'colaboración', 'organización', 'productividad'],
    logoPlaceholder: 'photo-1460925895917-afdab827c52f',
    website: 'https://airtable.com',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'Gestión de proyectos',
      'CRM simple',
      'Inventario',
      'Planificación de eventos'
    ],
    comparison_matrix: {
      ease_of_use: 9,
      feature_richness: 8,
      pricing_value: 8,
      support_quality: 8,
      scalability: 7
    },
    similar_tools: ['notion-15', 'monday-16'],
    founded_year: 2012,
    user_rating: 4.6,
    monthly_active_users: '300K+',
    key_features: [
      'Interface like spreadsheet',
      'Multiple views',
      'Automation',
      'Collaboration tools'
    ],
    pros: [
      'Muy intuitivo',
      'Excelente para equipos',
      'Múltiples vistas'
    ],
    cons: [
      'Limitaciones como DB',
      'Precio escala rápido',
      'No muy técnico'
    ],
    best_for: [
      'Equipos pequeños',
      'Gestión de contenido',
      'Organización simple'
    ],
    alternatives: ['Notion', 'Monday.com', 'Google Sheets']
  },
  {
    id: 'zapier-15',
    name: 'Zapier',
    category: 'No-Code Platforms',
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
    similar_tools: ['make-16', 'microsoft-power-automate-17'],
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
    id: 'glide-16',
    name: 'Glide',
    category: 'No-Code Platforms',
    subcategory: 'Mobile Apps',
    description: 'Glide permite crear aplicaciones móviles desde Google Sheets sin programación.',
    pricing: 'Gratis con límites, Pro $25/mes, Business $100/mes',
    complexity: 'beginner',
    difficulty_level: 2,
    learning_curve: 'immediate',
    community_size: 'medium',
    integration_options: ['Google Sheets', 'Airtable', 'REST APIs'],
    tags: ['app móvil', 'Google Sheets', 'rápido', 'simple'],
    logoPlaceholder: 'photo-1618401471353-b98afee0b2eb',
    website: 'https://glideapps.com',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'Apps internas',
      'Directorios',
      'Catálogos de productos',
      'Apps de eventos'
    ],
    comparison_matrix: {
      ease_of_use: 10,
      feature_richness: 6,
      pricing_value: 9,
      support_quality: 7,
      scalability: 6
    },
    similar_tools: ['adalo-17', 'thunkable-18'],
    founded_year: 2018,
    user_rating: 4.3,
    monthly_active_users: '100K+',
    key_features: [
      'Desde Google Sheets',
      'Apps nativas',
      'Actualizaciones en tiempo real',
      'Templates incluidos'
    ],
    pros: [
      'Extremadamente fácil',
      'Muy rápido de crear',
      'Gratis para empezar'
    ],
    cons: [
      'Funcionalidad limitada',
      'Dependiente de Sheets',
      'Customización limitada'
    ],
    best_for: [
      'Prototipos rápidos',
      'Apps simples',
      'Principiantes'
    ],
    alternatives: ['Adalo', 'Thunkable', 'FlutterFlow']
  }
];
