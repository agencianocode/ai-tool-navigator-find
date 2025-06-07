
import { EnhancedTool } from '../types';

export const aiCybersecurityTools: EnhancedTool[] = [
  {
    id: 'darktrace-58',
    name: 'Darktrace',
    category: 'AI Cybersecurity',
    subcategory: 'Threat Detection',
    description: 'Darktrace utiliza IA para detectar y responder automáticamente a amenazas cibernéticas en tiempo real.',
    pricing: 'Precio bajo consulta (enterprise)',
    complexity: 'expert',
    difficulty_level: 9,
    learning_curve: 'steep',
    community_size: 'medium',
    integration_options: ['SIEM', 'Cloud platforms', 'Network infrastructure'],
    tags: ['seguridad', 'amenazas', 'tiempo real', 'enterprise'],
    logoPlaceholder: 'photo-1563013544-824ae1b704d3',
    website: 'https://darktrace.com',
    apiAvailable: true,
    freeVersion: false,
    use_case_examples: [
      'Detección de malware',
      'Prevención de ataques',
      'Análisis de comportamiento',
      'Respuesta automática'
    ],
    comparison_matrix: {
      ease_of_use: 4,
      feature_richness: 10,
      pricing_value: 5,
      support_quality: 9,
      scalability: 10
    },
    similar_tools: ['crowdstrike-59', 'sentinel-one-60'],
    founded_year: 2013,
    user_rating: 4.1,
    monthly_active_users: '50K+',
    key_features: [
      'IA de autodefensa',
      'Detección de anomalías',
      'Respuesta automática',
      'Visualización de amenazas'
    ],
    pros: [
      'Detección muy avanzada',
      'Respuesta automática',
      'Sin reglas predefinidas'
    ],
    cons: [
      'Muy caro',
      'Complejo de implementar',
      'Requiere expertise'
    ],
    best_for: [
      'Grandes empresas',
      'Infraestructura crítica',
      'Organizaciones financieras'
    ],
    alternatives: ['CrowdStrike', 'SentinelOne', 'Cylance']
  },
  {
    id: 'crowdstrike-59',
    name: 'CrowdStrike Falcon',
    category: 'AI Cybersecurity',
    subcategory: 'Endpoint Protection',
    description: 'CrowdStrike Falcon es una plataforma de seguridad endpoint que utiliza IA para prevenir y detectar malware.',
    pricing: 'Precio bajo consulta (enterprise)',
    complexity: 'advanced',
    difficulty_level: 8,
    learning_curve: 'steep',
    community_size: 'large',
    integration_options: ['SIEM platforms', 'Cloud services', 'Threat intelligence'],
    tags: ['endpoint', 'malware', 'prevención', 'detección'],
    logoPlaceholder: 'photo-1507003211169-0a1dd7228f2d',
    website: 'https://crowdstrike.com',
    apiAvailable: true,
    freeVersion: false,
    use_case_examples: [
      'Protección de endpoints',
      'Hunting de amenazas',
      'Análisis forense',
      'Intelligence de amenazas'
    ],
    comparison_matrix: {
      ease_of_use: 5,
      feature_richness: 9,
      pricing_value: 6,
      support_quality: 8,
      scalability: 9
    },
    similar_tools: ['darktrace-58', 'carbon-black-60'],
    founded_year: 2011,
    user_rating: 4.4,
    monthly_active_users: '100K+',
    key_features: [
      'Protección basada en IA',
      'Threat hunting',
      'Análisis de comportamiento',
      'Cloud native'
    ],
    pros: [
      'Excelente detección',
      'Bajo impacto en rendimiento',
      'Threat intelligence robusto'
    ],
    cons: [
      'Precio elevado',
      'Curva de aprendizaje',
      'Requiere expertise'
    ],
    best_for: [
      'Empresas medianas y grandes',
      'Equipos de seguridad',
      'Industrias reguladas'
    ],
    alternatives: ['Darktrace', 'Carbon Black', 'Symantec']
  },
  {
    id: 'zscaler-60',
    name: 'Zscaler',
    category: 'AI Cybersecurity',
    subcategory: 'Cloud Security',
    description: 'Zscaler ofrece seguridad en la nube con IA para proteger usuarios, aplicaciones y datos en cualquier lugar.',
    pricing: 'Precio bajo consulta (enterprise)',
    complexity: 'advanced',
    difficulty_level: 7,
    learning_curve: 'moderate',
    community_size: 'large',
    integration_options: ['Identity providers', 'SIEM', 'Cloud platforms'],
    tags: ['nube', 'zero trust', 'acceso seguro', 'SASE'],
    logoPlaceholder: 'photo-1515377905703-c4788e51af15',
    website: 'https://zscaler.com',
    apiAvailable: true,
    freeVersion: false,
    use_case_examples: [
      'Acceso seguro a aplicaciones',
      'Protección de tráfico web',
      'Seguridad para trabajo remoto',
      'Prevención de amenazas'
    ],
    comparison_matrix: {
      ease_of_use: 6,
      feature_richness: 9,
      pricing_value: 6,
      support_quality: 8,
      scalability: 10
    },
    similar_tools: ['palo-alto-prisma-61', 'netskope-62'],
    founded_year: 2008,
    user_rating: 4.2,
    monthly_active_users: '200K+',
    key_features: [
      'Zero Trust Network Access',
      'Cloud Security Posture',
      'Threat intelligence',
      'Data Loss Prevention'
    ],
    pros: [
      'Arquitectura cloud-native',
      'Escalabilidad global',
      'Seguridad integral'
    ],
    cons: [
      'Implementación compleja',
      'Precio elevado',
      'Curva de aprendizaje'
    ],
    best_for: [
      'Empresas distribuidas',
      'Organizaciones cloud-first',
      'Trabajo remoto'
    ],
    alternatives: ['Palo Alto Prisma', 'Netskope', 'Forcepoint']
  }
];
