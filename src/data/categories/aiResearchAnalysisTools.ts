
import { EnhancedTool } from '../types';

export const aiResearchAnalysisTools: EnhancedTool[] = [
  {
    id: 'perplexity-49',
    name: 'Perplexity AI',
    category: 'AI Research & Analysis',
    subcategory: 'Research Tools',
    description: 'Perplexity AI es un motor de búsqueda conversacional que proporciona respuestas precisas con fuentes citadas en tiempo real.',
    pricing: 'Gratis con límites, Pro $20/mes',
    complexity: 'beginner',
    difficulty_level: 2,
    learning_curve: 'immediate',
    community_size: 'large',
    integration_options: ['API', 'Chrome Extension', 'Mobile Apps'],
    tags: ['búsqueda', 'investigación', 'IA conversacional', 'fuentes'],
    logoPlaceholder: 'photo-1451187580459-43490279c0fa',
    website: 'https://perplexity.ai',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'Investigación académica',
      'Análisis de mercado',
      'Fact-checking',
      'Búsqueda de información'
    ],
    comparison_matrix: {
      ease_of_use: 10,
      feature_richness: 8,
      pricing_value: 9,
      support_quality: 7,
      scalability: 8
    },
    similar_tools: ['you-com-50', 'bing-chat-51'],
    founded_year: 2022,
    user_rating: 4.6,
    monthly_active_users: '10M+',
    key_features: [
      'Búsqueda conversacional',
      'Fuentes citadas',
      'Respuestas en tiempo real',
      'Múltiples modelos de IA'
    ],
    pros: [
      'Respuestas muy precisas',
      'Fuentes siempre citadas',
      'Interfaz limpia y rápida'
    ],
    cons: [
      'Limitaciones en plan gratuito',
      'Dependiente de fuentes online',
      'Menos funciones creativas'
    ],
    best_for: [
      'Investigadores',
      'Estudiantes',
      'Periodistas'
    ],
    alternatives: ['You.com', 'Bing Chat', 'Google Bard']
  },
  {
    id: 'consensus-50',
    name: 'Consensus',
    category: 'AI Research & Analysis',
    subcategory: 'Academic Research',
    description: 'Consensus es un motor de búsqueda especializado en papers científicos que utiliza IA para extraer insights clave de la literatura académica.',
    pricing: 'Gratis básico, Premium $9/mes, Teams $20/mes',
    complexity: 'intermediate',
    difficulty_level: 4,
    learning_curve: 'moderate',
    community_size: 'medium',
    integration_options: ['API', 'Zotero', 'Mendeley'],
    tags: ['académico', 'papers', 'investigación científica', 'evidencia'],
    logoPlaceholder: 'photo-1532094349884-543bc11b234d',
    website: 'https://consensus.app',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'Revisión de literatura',
      'Meta-análisis',
      'Investigación médica',
      'Escritura académica'
    ],
    comparison_matrix: {
      ease_of_use: 8,
      feature_richness: 9,
      pricing_value: 8,
      support_quality: 8,
      scalability: 7
    },
    similar_tools: ['semantic-scholar-51', 'elicit-52'],
    founded_year: 2022,
    user_rating: 4.4,
    monthly_active_users: '200K+',
    key_features: [
      'Extracción de evidencia',
      'Análisis de consenso',
      'Búsqueda en papers',
      'Resúmenes automáticos'
    ],
    pros: [
      'Especializado en ciencia',
      'Evidencia de alta calidad',
      'Interfaz científica'
    ],
    cons: [
      'Limitado a contenido académico',
      'Cobertura variable por campo',
      'Requiere conocimiento científico'
    ],
    best_for: [
      'Investigadores académicos',
      'Estudiantes de posgrado',
      'Profesionales de la salud'
    ],
    alternatives: ['Semantic Scholar', 'Elicit', 'ResearchGate']
  },
  {
    id: 'elicit-51',
    name: 'Elicit',
    category: 'AI Research & Analysis',
    subcategory: 'Literature Review',
    description: 'Elicit es un asistente de investigación con IA que automatiza partes del flujo de trabajo de investigación como encontrar papers, extraer claims y resumir.',
    pricing: 'Gratis básico, Plus $10/mes, Pro $25/mes',
    complexity: 'intermediate',
    difficulty_level: 5,
    learning_curve: 'moderate',
    community_size: 'medium',
    integration_options: ['Zotero', 'Notion', 'Export formats'],
    tags: ['automatización', 'revisión de literatura', 'extracción', 'síntesis'],
    logoPlaceholder: 'photo-1507003211169-0a1dd7228f2d',
    website: 'https://elicit.org',
    apiAvailable: false,
    freeVersion: true,
    use_case_examples: [
      'Revisiones sistemáticas',
      'Extracción de datos',
      'Análisis de tendencias',
      'Mapeo de literatura'
    ],
    comparison_matrix: {
      ease_of_use: 7,
      feature_richness: 9,
      pricing_value: 9,
      support_quality: 8,
      scalability: 8
    },
    similar_tools: ['consensus-50', 'research-rabbit-52'],
    founded_year: 2021,
    user_rating: 4.3,
    monthly_active_users: '150K+',
    key_features: [
      'Automatización de workflows',
      'Extracción de datos',
      'Análisis de papers',
      'Síntesis de evidencia'
    ],
    pros: [
      'Automatiza tareas tediosas',
      'Muy útil para revisiones',
      'Interfaz bien diseñada'
    ],
    cons: [
      'Limitado a ciertos campos',
      'Curva de aprendizaje',
      'Dependiente de calidad de papers'
    ],
    best_for: [
      'Investigadores cuantitativos',
      'Meta-analistas',
      'Académicos'
    ],
    alternatives: ['Consensus', 'Research Rabbit', 'Litmaps']
  }
];
