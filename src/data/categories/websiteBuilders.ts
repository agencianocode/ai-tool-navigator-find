
import { EnhancedTool } from '../types';

export const websiteBuildersTools: EnhancedTool[] = [
  {
    id: 'wordpress-16',
    name: 'WordPress',
    category: 'Website Builders',
    subcategory: 'CMS Platform',
    description: 'WordPress es el sistema de gestión de contenidos más popular del mundo, potenciando más del 40% de la web.',
    pricing: 'Gratis con WordPress.org, WordPress.com desde $4/mes',
    complexity: 'intermediate',
    difficulty_level: 5,
    learning_curve: 'moderate',
    community_size: 'massive',
    integration_options: ['Plugins', 'WooCommerce', 'APIs', 'Third-party services'],
    tags: ['CMS', 'blogging', 'flexible', 'plugins'],
    logoPlaceholder: 'photo-1611224923853-80b023f02d71',
    website: 'https://wordpress.org',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'Blogs personales',
      'Sitios corporativos',
      'Tiendas online',
      'Portafolios'
    ],
    comparison_matrix: {
      ease_of_use: 7,
      feature_richness: 10,
      pricing_value: 9,
      support_quality: 8,
      scalability: 9
    },
    similar_tools: ['webflow-12', 'squarespace-17'],
    founded_year: 2003,
    user_rating: 4.4,
    monthly_active_users: '500M+',
    key_features: [
      'Miles de plugins',
      'Temas personalizables',
      'SEO optimizado',
      'E-commerce ready'
    ],
    pros: [
      'Extremadamente flexible',
      'Gran comunidad',
      'Miles de plugins'
    ],
    cons: [
      'Requiere mantenimiento',
      'Puede ser complejo',
      'Necesita hosting'
    ],
    best_for: [
      'Bloggers',
      'Desarrolladores',
      'Empresas medianas'
    ],
    alternatives: ['Webflow', 'Squarespace', 'Wix']
  },
  {
    id: 'squarespace-17',
    name: 'Squarespace',
    category: 'Website Builders',
    subcategory: 'All-in-One Builder',
    description: 'Squarespace es una plataforma todo-en-uno para crear sitios web hermosos con diseños profesionales.',
    pricing: 'Personal $12/mes, Business $18/mes',
    complexity: 'beginner',
    difficulty_level: 3,
    learning_curve: 'gentle',
    community_size: 'large',
    integration_options: ['Social media', 'Google Workspace', 'Mailchimp'],
    tags: ['diseño', 'todo-en-uno', 'profesional', 'templates'],
    logoPlaceholder: 'photo-1460925895917-afdab827c52f',
    website: 'https://squarespace.com',
    apiAvailable: true,
    freeVersion: false,
    use_case_examples: [
      'Portafolios creativos',
      'Sitios de restaurantes',
      'Tiendas boutique',
      'Sitios corporativos'
    ],
    comparison_matrix: {
      ease_of_use: 9,
      feature_richness: 7,
      pricing_value: 7,
      support_quality: 8,
      scalability: 7
    },
    similar_tools: ['wix-18', 'webflow-12'],
    founded_year: 2003,
    user_rating: 4.3,
    monthly_active_users: '5M+',
    key_features: [
      'Templates profesionales',
      'Editor visual',
      'E-commerce integrado',
      'Analytics incluido'
    ],
    pros: [
      'Diseños muy hermosos',
      'Fácil de usar',
      'Hosting incluido'
    ],
    cons: [
      'Menos personalización',
      'No hay plan gratuito',
      'Limitado en funcionalidad'
    ],
    best_for: [
      'Creativos',
      'Pequeños negocios',
      'Portafolios profesionales'
    ],
    alternatives: ['Wix', 'Webflow', 'WordPress']
  },
  {
    id: 'wix-18',
    name: 'Wix',
    category: 'Website Builders',
    subcategory: 'Drag & Drop Builder',
    description: 'Wix es una plataforma de creación de sitios web con editor drag-and-drop y inteligencia artificial.',
    pricing: 'Gratis con anuncios, Combo $14/mes',
    complexity: 'beginner',
    difficulty_level: 2,
    learning_curve: 'immediate',
    community_size: 'massive',
    integration_options: ['App Market', 'Google Ads', 'Facebook Pixel'],
    tags: ['drag-drop', 'IA', 'fácil', 'plantillas'],
    logoPlaceholder: 'photo-1563013544-824ae1b704d3',
    website: 'https://wix.com',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'Sitios personales',
      'Pequeños negocios',
      'Eventos',
      'Portafolios simples'
    ],
    comparison_matrix: {
      ease_of_use: 10,
      feature_richness: 8,
      pricing_value: 8,
      support_quality: 7,
      scalability: 6
    },
    similar_tools: ['squarespace-17', 'webflow-12'],
    founded_year: 2006,
    user_rating: 4.2,
    monthly_active_users: '200M+',
    key_features: [
      'Editor ADI (IA)',
      'App Market',
      'Templates variados',
      'SEO Wiz'
    ],
    pros: [
      'Muy fácil de usar',
      'Plan gratuito disponible',
      'Muchas apps'
    ],
    cons: [
      'Templates pueden ser rígidos',
      'Ads en plan gratuito',
      'Menos profesional'
    ],
    best_for: [
      'Principiantes',
      'Sitios simples',
      'Pruebas rápidas'
    ],
    alternatives: ['Squarespace', 'Webflow', 'WordPress']
  }
];
