
import { EnhancedTool } from '../types';

export const ecommercePlatformsTools: EnhancedTool[] = [
  {
    id: 'shopify-25',
    name: 'Shopify',
    category: 'E-commerce Platforms',
    subcategory: 'All-in-One E-commerce',
    description: 'Shopify es una plataforma completa de comercio electrónico que permite crear y gestionar tiendas online.',
    pricing: 'Basic $29/mes, Shopify $79/mes, Advanced $299/mes',
    complexity: 'beginner',
    difficulty_level: 3,
    learning_curve: 'gentle',
    community_size: 'massive',
    integration_options: ['Payment gateways', 'Shipping', 'Marketing tools', 'Apps'],
    tags: ['e-commerce', 'tienda online', 'pagos', 'inventario'],
    logoPlaceholder: 'photo-1556742049-0cfed4f6a45d',
    website: 'https://shopify.com',
    apiAvailable: true,
    freeVersion: false,
    use_case_examples: [
      'Tiendas online',
      'Dropshipping',
      'Ventas multicanal',
      'Subscripciones'
    ],
    comparison_matrix: {
      ease_of_use: 9,
      feature_richness: 9,
      pricing_value: 7,
      support_quality: 9,
      scalability: 9
    },
    similar_tools: ['woocommerce-26', 'bigcommerce-27'],
    founded_year: 2006,
    user_rating: 4.4,
    monthly_active_users: '2M+',
    key_features: [
      'Templates profesionales',
      'Gestión de inventario',
      'Múltiples métodos de pago',
      'Analytics integrado'
    ],
    pros: [
      'Muy fácil de usar',
      'Hosting incluido',
      'Excelente soporte'
    ],
    cons: [
      'Fees de transacción',
      'Personalización limitada',
      'Dependiente de apps'
    ],
    best_for: [
      'Pequeñas y medianas empresas',
      'Dropshippers',
      'Ventas multicanal'
    ],
    alternatives: ['WooCommerce', 'BigCommerce', 'Magento']
  },
  {
    id: 'woocommerce-26',
    name: 'WooCommerce',
    category: 'E-commerce Platforms',
    subcategory: 'WordPress E-commerce',
    description: 'WooCommerce es un plugin gratuito de WordPress que convierte sitios en tiendas online completas.',
    pricing: 'Plugin gratuito, extensiones desde $29-299',
    complexity: 'intermediate',
    difficulty_level: 5,
    learning_curve: 'moderate',
    community_size: 'massive',
    integration_options: ['WordPress', 'Payment gateways', 'Shipping', 'Marketing'],
    tags: ['WordPress', 'open source', 'flexible', 'personalizable'],
    logoPlaceholder: 'photo-1556742049-0cfed4f6a45d',
    website: 'https://woocommerce.com',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'Tiendas personalizadas',
      'B2B commerce',
      'Productos digitales',
      'Membresías'
    ],
    comparison_matrix: {
      ease_of_use: 6,
      feature_richness: 10,
      pricing_value: 9,
      support_quality: 7,
      scalability: 8
    },
    similar_tools: ['shopify-25', 'prestashop-27'],
    founded_year: 2011,
    user_rating: 4.2,
    monthly_active_users: '5M+',
    key_features: [
      'Totalmente personalizable',
      'Miles de extensiones',
      'SEO optimizado',
      'Multi-currency'
    ],
    pros: [
      'Gratuito y open source',
      'Extremadamente flexible',
      'Gran comunidad'
    ],
    cons: [
      'Requiere mantenimiento',
      'Curva de aprendizaje',
      'Necesita hosting'
    ],
    best_for: [
      'Desarrolladores',
      'Tiendas personalizadas',
      'Presupuestos ajustados'
    ],
    alternatives: ['Shopify', 'PrestaShop', 'Magento']
  },
  {
    id: 'stripe-27',
    name: 'Stripe',
    category: 'E-commerce Platforms',
    subcategory: 'Payment Processing',
    description: 'Stripe es una plataforma de pagos online que permite a empresas aceptar pagos de manera segura.',
    pricing: '2.9% + 30¢ por transacción exitosa',
    complexity: 'intermediate',
    difficulty_level: 4,
    learning_curve: 'moderate',
    community_size: 'large',
    integration_options: ['APIs', 'E-commerce platforms', 'Mobile SDKs'],
    tags: ['pagos', 'API', 'seguridad', 'global'],
    logoPlaceholder: 'photo-1556742049-0cfed4f6a45d',
    website: 'https://stripe.com',
    apiAvailable: true,
    freeVersion: false,
    use_case_examples: [
      'Pagos online',
      'Suscripciones',
      'Marketplaces',
      'Pagos móviles'
    ],
    comparison_matrix: {
      ease_of_use: 8,
      feature_richness: 9,
      pricing_value: 8,
      support_quality: 9,
      scalability: 10
    },
    similar_tools: ['paypal-28', 'square-29'],
    founded_year: 2010,
    user_rating: 4.5,
    monthly_active_users: '100K+ businesses',
    key_features: [
      'API robusta',
      'Pagos globales',
      'Fraud protection',
      'Analytics detallado'
    ],
    pros: [
      'Muy confiable',
      'Excelente documentación',
      'Soporte global'
    ],
    cons: [
      'Fees por transacción',
      'Setup técnico requerido',
      'KYC estricto'
    ],
    best_for: [
      'Startups tech',
      'SaaS companies',
      'E-commerce avanzado'
    ],
    alternatives: ['PayPal', 'Square', 'Adyen']
  }
];
