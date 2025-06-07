
import { EnhancedTool } from '../types';

export const aiFinanceToolsData: EnhancedTool[] = [
  {
    id: 'mint-67',
    name: 'Mint by Intuit',
    category: 'AI Finance & Fintech',
    subcategory: 'Personal Finance',
    description: 'Mint utiliza IA para categorizar gastos automáticamente y proporcionar insights financieros personalizados.',
    pricing: 'Gratis',
    complexity: 'beginner',
    difficulty_level: 2,
    learning_curve: 'gentle',
    community_size: 'large',
    integration_options: ['Bank accounts', 'Credit cards', 'Investment accounts'],
    tags: ['finanzas personales', 'presupuesto', 'gastos', 'gratuito'],
    logoPlaceholder: 'photo-1515377905703-c4788e51af15',
    website: 'https://mint.intuit.com',
    apiAvailable: false,
    freeVersion: true,
    use_case_examples: [
      'Seguimiento de gastos',
      'Creación de presupuestos',
      'Monitoreo de puntaje crediticio',
      'Alertas financieras'
    ],
    comparison_matrix: {
      ease_of_use: 9,
      feature_richness: 7,
      pricing_value: 10,
      support_quality: 7,
      scalability: 7
    },
    similar_tools: ['ynab-68', 'personal-capital-69'],
    founded_year: 2006,
    user_rating: 4.1,
    monthly_active_users: '20M+',
    key_features: [
      'Categorización automática',
      'Seguimiento de presupuesto',
      'Alertas de facturas',
      'Score crediticio gratuito'
    ],
    pros: [
      'Completamente gratuito',
      'Conecta con bancos',
      'Categorización automática'
    ],
    cons: [
      'Anuncios frecuentes',
      'Limitado en inversiones',
      'Solo disponible en ciertos países'
    ],
    best_for: [
      'Gestión básica de finanzas',
      'Usuarios principiantes',
      'Seguimiento de gastos'
    ],
    alternatives: ['YNAB', 'Personal Capital', 'PocketGuard']
  },
  {
    id: 'betterment-68',
    name: 'Betterment',
    category: 'AI Finance & Fintech',
    subcategory: 'Robo-Advisor',
    description: 'Betterment es un robo-advisor que utiliza IA para gestionar portafolios de inversión automáticamente.',
    pricing: '0.25% anual sobre activos, Premium 0.40%',
    complexity: 'intermediate',
    difficulty_level: 4,
    learning_curve: 'gentle',
    community_size: 'medium',
    integration_options: ['Bank accounts', 'Retirement accounts', 'Tax software'],
    tags: ['inversión', 'robo-advisor', 'portafolio', 'automatizado'],
    logoPlaceholder: 'photo-1563013544-824ae1b704d3',
    website: 'https://betterment.com',
    apiAvailable: false,
    freeVersion: false,
    use_case_examples: [
      'Inversión automatizada',
      'Planificación de retiro',
      'Rebalanceo de portafolio',
      'Optimización fiscal'
    ],
    comparison_matrix: {
      ease_of_use: 9,
      feature_richness: 8,
      pricing_value: 8,
      support_quality: 8,
      scalability: 8
    },
    similar_tools: ['wealthfront-69', 'schwab-intelligent-70'],
    founded_year: 2008,
    user_rating: 4.3,
    monthly_active_users: '500K+',
    key_features: [
      'Gestión automatizada',
      'Rebalanceo automático',
      'Optimización fiscal',
      'Planificación de metas'
    ],
    pros: [
      'Muy fácil de usar',
      'Fees competitivos',
      'Gestión profesional'
    ],
    cons: [
      'Limitada personalización',
      'No permite acciones individuales',
      'Mínimo de inversión'
    ],
    best_for: [
      'Inversores principiantes',
      'Gestión pasiva',
      'Planificación de retiro'
    ],
    alternatives: ['Wealthfront', 'Schwab Intelligent', 'Vanguard Advisor']
  },
  {
    id: 'quickbooks-ai-69',
    name: 'QuickBooks AI',
    category: 'AI Finance & Fintech',
    subcategory: 'Business Finance',
    description: 'QuickBooks integra IA para automatizar contabilidad, categorización de gastos y predicciones financieras.',
    pricing: 'Simple Start $15/mes, Essentials $30/mes',
    complexity: 'intermediate',
    difficulty_level: 5,
    learning_curve: 'moderate',
    community_size: 'massive',
    integration_options: ['Banks', 'PayPal', 'Square', 'E-commerce platforms'],
    tags: ['contabilidad', 'pequeñas empresas', 'automatización', 'impuestos'],
    logoPlaceholder: 'photo-1460925895917-afdab827c52f',
    website: 'https://quickbooks.intuit.com',
    apiAvailable: true,
    freeVersion: false,
    use_case_examples: [
      'Contabilidad empresarial',
      'Facturación automática',
      'Seguimiento de gastos',
      'Preparación de impuestos'
    ],
    comparison_matrix: {
      ease_of_use: 7,
      feature_richness: 9,
      pricing_value: 7,
      support_quality: 8,
      scalability: 9
    },
    similar_tools: ['xero-70', 'freshbooks-71'],
    founded_year: 1983,
    user_rating: 4.2,
    monthly_active_users: '7M+',
    key_features: [
      'Categorización automática',
      'Predicciones de flujo de caja',
      'Facturación inteligente',
      'Integración bancaria'
    ],
    pros: [
      'Muy completo',
      'Amplia integración',
      'Soporte para impuestos'
    ],
    cons: [
      'Curva de aprendizaje',
      'Precio puede escalar',
      'Complejidad para usuarios básicos'
    ],
    best_for: [
      'Pequeñas y medianas empresas',
      'Freelancers',
      'Contadores'
    ],
    alternatives: ['Xero', 'FreshBooks', 'Wave Accounting']
  }
];
