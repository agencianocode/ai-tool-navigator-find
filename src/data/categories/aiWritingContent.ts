
import { EnhancedTool } from '../types';

export const aiWritingContentTools: EnhancedTool[] = [
  {
    id: 'chatgpt-1',
    name: 'ChatGPT',
    category: 'AI Writing & Content',
    subcategory: 'Text Generation',
    description: 'ChatGPT es un modelo de lenguaje desarrollado por OpenAI que puede generar texto coherente y útil para múltiples propósitos.',
    pricing: 'Gratis con límites, Plus $20/mes',
    complexity: 'beginner',
    difficulty_level: 2,
    learning_curve: 'immediate',
    community_size: 'massive',
    integration_options: ['API', 'Plugin ecosystem', 'Browser extension'],
    tags: ['conversacional', 'texto', 'creativo', 'productividad'],
    logoPlaceholder: 'photo-1677442136019-21780ecad995',
    website: 'https://chat.openai.com',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'Escritura creativa',
      'Asistencia con código',
      'Resúmenes de texto',
      'Brainstorming de ideas'
    ],
    comparison_matrix: {
      ease_of_use: 10,
      feature_richness: 9,
      pricing_value: 8,
      support_quality: 7,
      scalability: 9
    },
    similar_tools: ['claude-2', 'google-bard-3'],
    founded_year: 2022,
    user_rating: 4.5,
    monthly_active_users: '100M+',
    key_features: [
      'Conversaciones naturales',
      'Múltiples idiomas',
      'Razonamiento complejo',
      'Plugins disponibles'
    ],
    pros: [
      'Muy fácil de usar',
      'Respuestas de alta calidad',
      'Amplio conocimiento'
    ],
    cons: [
      'Información hasta 2023',
      'Puede generar información incorrecta',
      'Límites en plan gratuito'
    ],
    best_for: [
      'Escritores',
      'Estudiantes',
      'Profesionales'
    ],
    alternatives: ['Claude', 'Google Bard', 'Perplexity']
  },
  {
    id: 'claude-2',
    name: 'Claude',
    category: 'AI Writing & Content',
    subcategory: 'Text Generation',
    description: 'Claude es un asistente de IA de Anthropic enfocado en ser útil, inofensivo y honesto en sus respuestas.',
    pricing: 'Gratis con límites, Pro $20/mes',
    complexity: 'beginner',
    difficulty_level: 2,
    learning_curve: 'immediate',
    community_size: 'large',
    integration_options: ['API', 'Slack', 'Web interface'],
    tags: ['seguro', 'ético', 'análisis', 'escritura'],
    logoPlaceholder: 'photo-1677442136019-21780ecad995',
    website: 'https://claude.ai',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'Análisis de documentos',
      'Escritura técnica',
      'Investigación',
      'Edición de textos'
    ],
    comparison_matrix: {
      ease_of_use: 9,
      feature_richness: 8,
      pricing_value: 8,
      support_quality: 8,
      scalability: 8
    },
    similar_tools: ['chatgpt-1', 'google-bard-3'],
    founded_year: 2022,
    user_rating: 4.4,
    monthly_active_users: '10M+',
    key_features: [
      'Análisis de documentos largos',
      'Respuestas seguras',
      'Razonamiento ético',
      'Comprensión contextual'
    ],
    pros: [
      'Muy seguro y ético',
      'Excelente para análisis',
      'Maneja documentos largos'
    ],
    cons: [
      'Menos conocido',
      'Puede ser muy cauteloso',
      'Menos plugins'
    ],
    best_for: [
      'Investigadores',
      'Análisis de datos',
      'Escritura profesional'
    ],
    alternatives: ['ChatGPT', 'Google Bard', 'Perplexity']
  },
  {
    id: 'jasper-3',
    name: 'Jasper',
    category: 'AI Writing & Content',
    subcategory: 'Marketing Copy',
    description: 'Jasper es una plataforma de IA especializada en marketing y copywriting para empresas.',
    pricing: 'Creator $49/mes, Teams $125/mes',
    complexity: 'intermediate',
    difficulty_level: 4,
    learning_curve: 'moderate',
    community_size: 'medium',
    integration_options: ['Surfer SEO', 'Grammarly', 'Plagiarism checker'],
    tags: ['marketing', 'copywriting', 'empresarial', 'SEO'],
    logoPlaceholder: 'photo-1611224923853-80b023f02d71',
    website: 'https://jasper.ai',
    apiAvailable: true,
    freeVersion: false,
    use_case_examples: [
      'Copy publicitario',
      'Content marketing',
      'Emails de ventas',
      'Posts para redes sociales'
    ],
    comparison_matrix: {
      ease_of_use: 8,
      feature_richness: 9,
      pricing_value: 6,
      support_quality: 8,
      scalability: 9
    },
    similar_tools: ['copy-ai-4', 'writesonic-5'],
    founded_year: 2021,
    user_rating: 4.2,
    monthly_active_users: '100K+',
    key_features: [
      'Templates de marketing',
      'Brand voice',
      'SEO optimization',
      'Team collaboration'
    ],
    pros: [
      'Especializado en marketing',
      'Templates profesionales',
      'Integración SEO'
    ],
    cons: [
      'Precio elevado',
      'No tiene plan gratuito',
      'Curva de aprendizaje'
    ],
    best_for: [
      'Equipos de marketing',
      'Agencias',
      'E-commerce'
    ],
    alternatives: ['Copy.ai', 'Writesonic', 'ChatGPT']
  },
  {
    id: 'grammarly-4',
    name: 'Grammarly',
    category: 'AI Writing & Content',
    subcategory: 'Grammar & Style',
    description: 'Grammarly es un asistente de escritura que mejora gramática, estilo y claridad en tiempo real.',
    pricing: 'Gratis con límites, Premium $12/mes',
    complexity: 'beginner',
    difficulty_level: 1,
    learning_curve: 'immediate',
    community_size: 'massive',
    integration_options: ['Browser extension', 'Microsoft Office', 'Google Docs'],
    tags: ['gramática', 'corrección', 'estilo', 'productividad'],
    logoPlaceholder: 'photo-1456513080510-7bf3a84b82f8',
    website: 'https://grammarly.com',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'Corrección de emails',
      'Escritura académica',
      'Documentos profesionales',
      'Posts en redes sociales'
    ],
    comparison_matrix: {
      ease_of_use: 10,
      feature_richness: 8,
      pricing_value: 9,
      support_quality: 8,
      scalability: 8
    },
    similar_tools: ['hemingway-editor-5', 'prowritingaid-6'],
    founded_year: 2009,
    user_rating: 4.6,
    monthly_active_users: '30M+',
    key_features: [
      'Corrección en tiempo real',
      'Sugerencias de estilo',
      'Detector de plagio',
      'Tone detection'
    ],
    pros: [
      'Muy fácil de usar',
      'Integración universal',
      'Corrección instantánea'
    ],
    cons: [
      'A veces demasiado estricto',
      'Funciones limitadas gratis',
      'Dependiente de internet'
    ],
    best_for: [
      'Estudiantes',
      'Profesionales',
      'Escritores no nativos'
    ],
    alternatives: ['Hemingway Editor', 'ProWritingAid', 'LanguageTool']
  },
  {
    id: 'notion-ai-5',
    name: 'Notion AI',
    category: 'AI Writing & Content',
    subcategory: 'Content Planning',
    description: 'Notion AI integra capacidades de inteligencia artificial directamente en el workspace de Notion.',
    pricing: '$10/mes adicional a Notion',
    complexity: 'intermediate',
    difficulty_level: 3,
    learning_curve: 'gentle',
    community_size: 'large',
    integration_options: ['Notion workspace', 'Templates', 'Databases'],
    tags: ['workspace', 'organización', 'productividad', 'colaboración'],
    logoPlaceholder: 'photo-1611224923853-80b023f02d71',
    website: 'https://notion.so/ai',
    apiAvailable: true,
    freeVersion: false,
    use_case_examples: [
      'Resúmenes de reuniones',
      'Planificación de contenido',
      'Escritura colaborativa',
      'Brainstorming de proyectos'
    ],
    comparison_matrix: {
      ease_of_use: 8,
      feature_richness: 7,
      pricing_value: 7,
      support_quality: 8,
      scalability: 8
    },
    similar_tools: ['chatgpt-1', 'obsidian-6'],
    founded_year: 2023,
    user_rating: 4.3,
    monthly_active_users: '5M+',
    key_features: [
      'IA integrada en Notion',
      'Generación de contenido',
      'Resúmenes automáticos',
      'Traducción'
    ],
    pros: [
      'Integrado en workflow',
      'Fácil de usar',
      'Colaboración en equipo'
    ],
    cons: [
      'Requiere Notion',
      'Costo adicional',
      'Funciones limitadas'
    ],
    best_for: [
      'Usuarios de Notion',
      'Equipos colaborativos',
      'Gestión de contenido'
    ],
    alternatives: ['ChatGPT', 'Claude', 'Obsidian']
  }
];
