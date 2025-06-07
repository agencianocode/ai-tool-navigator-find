
import { EnhancedTool } from '../types';

export const noCodePlatformsTools: EnhancedTool[] = [
  {
    id: 'bubble-11',
    name: 'Bubble',
    category: 'No-Code Platforms',
    subcategory: 'Web Applications',
    description: 'Bubble es una plataforma no-code que permite crear aplicaciones web completas sin necesidad de programar.',
    pricing: 'Gratis con límites, $29/mes Personal',
    complexity: 'intermediate',
    difficulty_level: 6,
    learning_curve: 'moderate',
    community_size: 'large',
    integration_options: ['API REST', 'Zapier', 'Stripe', 'Google APIs'],
    tags: ['no-code', 'aplicaciones web', 'startup', 'prototipado'],
    logoPlaceholder: 'photo-1460925895917-afdab827c52f',
    website: 'https://bubble.io',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'Aplicaciones SaaS',
      'Marketplaces',
      'Redes sociales',
      'Herramientas internas'
    ],
    comparison_matrix: {
      ease_of_use: 6,
      feature_richness: 9,
      pricing_value: 8,
      support_quality: 8,
      scalability: 9
    },
    similar_tools: ['webflow-12', 'adalo-13'],
    founded_year: 2012,
    user_rating: 4.3,
    monthly_active_users: '3M+',
    key_features: [
      'Editor visual drag & drop',
      'Base de datos integrada',
      'Workflows complejos',
      'Responsive design'
    ],
    pros: [
      'Muy potente y flexible',
      'Comunidad grande',
      'Muchas integraciones'
    ],
    cons: [
      'Curva de aprendizaje pronunciada',
      'Puede ser lento',
      'Pricing escalable'
    ],
    best_for: [
      'Startups',
      'Desarrolladores ciudadanos',
      'Prototipado rápido'
    ],
    alternatives: ['Webflow', 'Adalo', 'Glide']
  },
  {
    id: 'adalo-12',
    name: 'Adalo',
    category: 'No-Code Platforms',
    subcategory: 'Mobile Apps',
    description: 'Adalo permite crear aplicaciones móviles nativas sin código, con diseño drag-and-drop.',
    pricing: 'Gratis básico, $45/mes Pro',
    complexity: 'beginner',
    difficulty_level: 4,
    learning_curve: 'gentle',
    community_size: 'medium',
    integration_options: ['APIs externas', 'Zapier', 'Stripe'],
    tags: ['mobile', 'no-code', 'apps', 'nativo'],
    logoPlaceholder: 'photo-1512941937669-90a1b58e7e9c',
    website: 'https://adalo.com',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'Apps de directorio',
      'Apps de marketplace',
      'Apps de comunidad',
      'Apps de productividad'
    ],
    comparison_matrix: {
      ease_of_use: 8,
      feature_richness: 7,
      pricing_value: 7,
      support_quality: 7,
      scalability: 6
    },
    similar_tools: ['glide-13', 'flutterflow-14'],
    founded_year: 2018,
    user_rating: 4.1,
    monthly_active_users: '500K+',
    key_features: [
      'Apps nativas iOS/Android',
      'Base de datos visual',
      'Componentes pre-construidos',
      'Notificaciones push'
    ],
    pros: [
      'Fácil creación de apps móviles',
      'Apps nativas reales',
      'Buena documentación'
    ],
    cons: [
      'Limitaciones en personalización',
      'Performance puede ser lenta',
      'Costos pueden escalar'
    ],
    best_for: [
      'Creadores de apps móviles',
      'Pequeños negocios',
      'MVPs rápidos'
    ],
    alternatives: ['Glide', 'FlutterFlow', 'AppGyver']
  },
  {
    id: 'glide-13',
    name: 'Glide',
    category: 'No-Code Platforms',
    subcategory: 'Mobile Apps',
    description: 'Glide convierte hojas de Google Sheets en aplicaciones móviles hermosas en minutos.',
    pricing: 'Gratis básico, $25/mes Pro',
    complexity: 'beginner',
    difficulty_level: 2,
    learning_curve: 'immediate',
    community_size: 'medium',
    integration_options: ['Google Sheets', 'Airtable', 'APIs'],
    tags: ['Google Sheets', 'PWA', 'simple', 'rápido'],
    logoPlaceholder: 'photo-1563013544-824ae1b704d3',
    website: 'https://glideapps.com',
    apiAvailable: false,
    freeVersion: true,
    use_case_examples: [
      'Apps de inventario',
      'Directorios',
      'Apps de eventos',
      'Catálogos de productos'
    ],
    comparison_matrix: {
      ease_of_use: 10,
      feature_richness: 6,
      pricing_value: 9,
      support_quality: 7,
      scalability: 6
    },
    similar_tools: ['adalo-12', 'appsheet-14'],
    founded_year: 2018,
    user_rating: 4.4,
    monthly_active_users: '1M+',
    key_features: [
      'Basado en hojas de cálculo',
      'PWA responsive',
      'Actualizaciones en tiempo real',
      'Componentes inteligentes'
    ],
    pros: [
      'Extremadamente fácil',
      'Configuración casi instantánea',
      'Gratuito para uso básico'
    ],
    cons: [
      'Limitado a PWAs',
      'Dependiente de Google Sheets',
      'Funcionalidad básica'
    ],
    best_for: [
      'Prototipos rápidos',
      'Apps simples de datos',
      'No-coders principiantes'
    ],
    alternatives: ['Adalo', 'AppSheet', 'Bubble']
  },
  {
    id: 'zapier-interfaces-14',
    name: 'Zapier Interfaces',
    category: 'No-Code Platforms',
    subcategory: 'Web Applications',
    description: 'Zapier Interfaces permite crear aplicaciones web personalizadas conectadas a automatizaciones.',
    pricing: 'Incluido en planes Zapier desde $19.99/mes',
    complexity: 'intermediate',
    difficulty_level: 5,
    learning_curve: 'moderate',
    community_size: 'large',
    integration_options: ['5000+ apps via Zapier', 'Webhooks', 'APIs'],
    tags: ['automatización', 'interfaces', 'workflows', 'conectividad'],
    logoPlaceholder: 'photo-1518709268805-4e9042af2176',
    website: 'https://zapier.com/interfaces',
    apiAvailable: true,
    freeVersion: false,
    use_case_examples: [
      'Dashboards personalizados',
      'Formularios avanzados',
      'Apps de aprobación',
      'Herramientas internas'
    ],
    comparison_matrix: {
      ease_of_use: 7,
      feature_richness: 8,
      pricing_value: 7,
      support_quality: 8,
      scalability: 8
    },
    similar_tools: ['bubble-11', 'retool-15'],
    founded_year: 2023,
    user_rating: 4.2,
    monthly_active_users: '500K+',
    key_features: [
      'Integración con Zapier',
      'Editor drag-and-drop',
      'Conectividad masiva',
      'Automatizaciones nativas'
    ],
    pros: [
      'Potente integración',
      'Fácil de usar',
      'Conectividad sin igual'
    ],
    cons: [
      'Requiere plan Zapier',
      'Relativamente nuevo',
      'Limitado comparado con Bubble'
    ],
    best_for: [
      'Usuarios de Zapier',
      'Automatización + UI',
      'Herramientas internas'
    ],
    alternatives: ['Bubble', 'Retool', 'Airtable']
  },
  {
    id: 'retool-15',
    name: 'Retool',
    category: 'No-Code Platforms',
    subcategory: 'Web Applications',
    description: 'Retool es una plataforma para construir herramientas internas rápidamente con componentes pre-construidos.',
    pricing: 'Gratis hasta 5 usuarios, $10/usuario/mes Team',
    complexity: 'intermediate',
    difficulty_level: 6,
    learning_curve: 'moderate',
    community_size: 'large',
    integration_options: ['Bases de datos', 'APIs REST', 'GraphQL', 'Webhooks'],
    tags: ['herramientas internas', 'admin panels', 'dashboards', 'APIs'],
    logoPlaceholder: 'photo-1460925895917-afdab827c52f',
    website: 'https://retool.com',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'Admin panels',
      'Dashboards de operaciones',
      'Herramientas de soporte',
      'CRMs internos'
    ],
    comparison_matrix: {
      ease_of_use: 7,
      feature_richness: 9,
      pricing_value: 8,
      support_quality: 9,
      scalability: 9
    },
    similar_tools: ['bubble-11', 'appsmith-16'],
    founded_year: 2017,
    user_rating: 4.5,
    monthly_active_users: '200K+',
    key_features: [
      'Componentes ricos',
      'Conectividad de datos',
      'JavaScript personalizado',
      'Control granular'
    ],
    pros: [
      'Muy potente',
      'Excelente para herramientas internas',
      'Gran flexibilidad'
    ],
    cons: [
      'Curva de aprendizaje',
      'Enfocado en herramientas internas',
      'Puede ser complejo'
    ],
    best_for: [
      'Equipos técnicos',
      'Herramientas internas',
      'Empresas medianas-grandes'
    ],
    alternatives: ['Bubble', 'Appsmith', 'OutSystems']
  }
];
