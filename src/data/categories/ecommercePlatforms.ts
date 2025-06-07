
import { EnhancedTool } from '../types';

export const ecommercePlatformsTools: EnhancedTool[] = [
  {
    id: 'shopify-25',
    name: 'Shopify',
    category: 'E-commerce Platforms',
    subcategory: 'Online Stores',
    description: 'Shopify es una plataforma completa para crear tiendas en línea y gestionar ventas.',
    pricing: '$29/mes Basic, $79/mes Shopify',
    complexity: 'beginner',
    difficulty_level: 3,
    learning_curve: 'gentle',
    community_size: 'massive',
    integration_options: ['Payment gateways', 'Shipping APIs', 'Marketing tools'],
    tags: ['e-commerce', 'tienda online', 'ventas', 'marketing'],
    logoPlaceholder: 'photo-1506744038136-46273834b3fb',
    website: 'https://shopify.com',
    apiAvailable: true,
    freeVersion: false,
    use_case_examples: [
      'Tiendas en línea',
      'Ventas multicanal',
      'Gestión de inventario',
      'Marketing digital'
    ],
    comparison_matrix: {
      ease_of_use: 8,
      feature_richness: 9,
      pricing_value: 7,
      support_quality: 8,
      scalability: 9
    },
    similar_tools: ['bigcommerce-26', 'woocommerce-27'],
    founded_year: 2006,
    user_rating: 4.5,
    monthly_active_users: '1.7M+',
    key_features: [
      'Plantillas personalizables',
      'Integración con pagos',
      'Herramientas SEO',
      'Soporte 24/7'
    ],
    pros: [
      'Fácil de usar',
      'Gran ecosistema de apps',
      'Escalable para negocios grandes'
    ],
    cons: [
      'Costos adicionales por apps',
      'Comisiones en algunos planes',
      'Limitaciones en personalización avanzada'
    ],
    best_for: [
      'Pequeñas y medianas empresas',
      'Emprendedores',
      'Tiendas físicas que quieren vender online'
    ],
    alternatives: ['BigCommerce', 'WooCommerce', 'Magento']
  },
  {
    id: 'woocommerce-26',
    name: 'WooCommerce',
    category: 'E-commerce Platforms',
    subcategory: 'Online Stores',
    description: 'WooCommerce es un plugin de WordPress que convierte sitios web en tiendas online completas.',
    pricing: 'Gratis con WordPress, extensiones desde $29',
    complexity: 'intermediate',
    difficulty_level: 5,
    learning_curve: 'moderate',
    community_size: 'massive',
    integration_options: ['WordPress plugins', 'Payment gateways', 'Shipping providers'],
    tags: ['WordPress', 'plugin', 'flexible', 'open source'],
    logoPlaceholder: 'photo-1460925895917-afdab827c52f',
    website: 'https://woocommerce.com',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'Tiendas WordPress',
      'Productos digitales',
      'Servicios online',
      'Marketplaces'
    ],
    comparison_matrix: {
      ease_of_use: 6,
      feature_richness: 9,
      pricing_value: 9,
      support_quality: 7,
      scalability: 8
    },
    similar_tools: ['shopify-25', 'magento-27'],
    founded_year: 2011,
    user_rating: 4.2,
    monthly_active_users: '5M+',
    key_features: [
      'Integración WordPress',
      'Plugins extensos',
      'Personalización completa',
      'SEO optimizado'
    ],
    pros: [
      'Gratuito y flexible',
      'Gran comunidad',
      'Control total del sitio'
    ],
    cons: [
      'Requiere conocimientos técnicos',
      'Mantenimiento requerido',
      'Costos de hosting'
    ],
    best_for: [
      'Desarrolladores web',
      'Usuarios de WordPress',
      'Tiendas personalizadas'
    ],
    alternatives: ['Shopify', 'Magento', 'PrestaShop']
  },
  {
    id: 'stripe-27',
    name: 'Stripe',
    category: 'E-commerce Platforms',
    subcategory: 'Payment Processing',
    description: 'Stripe es una plataforma de pagos que permite a empresas aceptar pagos online de forma segura.',
    pricing: '2.9% + $0.30 por transacción exitosa',
    complexity: 'intermediate',
    difficulty_level: 6,
    learning_curve: 'moderate',
    community_size: 'large',
    integration_options: ['APIs REST', 'SDKs múltiples', 'Webhooks'],
    tags: ['pagos', 'API', 'desarrolladores', 'seguridad'],
    logoPlaceholder: 'photo-1563013544-824ae1b704d3',
    website: 'https://stripe.com',
    apiAvailable: true,
    freeVersion: false,
    use_case_examples: [
      'Pagos online',
      'Suscripciones',
      'Marketplaces',
      'Aplicaciones móviles'
    ],
    comparison_matrix: {
      ease_of_use: 7,
      feature_richness: 10,
      pricing_value: 8,
      support_quality: 9,
      scalability: 10
    },
    similar_tools: ['paypal-28', 'square-29'],
    founded_year: 2010,
    user_rating: 4.6,
    monthly_active_users: '1M+',
    key_features: [
      'API robusta',
      'Seguridad avanzada',
      'Pagos globales',
      'Dashboard completo'
    ],
    pros: [
      'Excelente para desarrolladores',
      'Muy seguro',
      'Funcionalidades avanzadas'
    ],
    cons: [
      'Curva de aprendizaje técnica',
      'Solo para pagos',
      'Tarifas por transacción'
    ],
    best_for: [
      'Desarrolladores',
      'SaaS',
      'E-commerce avanzado'
    ],
    alternatives: ['PayPal', 'Square', 'Adyen']
  }
];
