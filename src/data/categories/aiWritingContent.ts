
import { EnhancedTool } from '../types';

export const aiWritingContentTools: EnhancedTool[] = [
  {
    id: 'chatgpt-1',
    name: 'ChatGPT',
    category: 'AI Writing & Content',
    subcategory: 'Text Generation',
    description: 'ChatGPT es un modelo de lenguaje avanzado que puede generar texto, responder preguntas y asistir en diversas tareas de escritura.',
    pricing: 'Gratis con límites, Plus $20/mes',
    complexity: 'beginner',
    difficulty_level: 2,
    learning_curve: 'gentle',
    community_size: 'massive',
    integration_options: ['API', 'Plugins', 'Browser Extension'],
    tags: ['conversación', 'escritura', 'asistente', 'contenido'],
    logoPlaceholder: 'photo-1677442136019-21780ecad995',
    website: 'https://chat.openai.com',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'Generación de contenido',
      'Respuestas a preguntas',
      'Asistencia en escritura',
      'Brainstorming'
    ],
    comparison_matrix: {
      ease_of_use: 10,
      feature_richness: 9,
      pricing_value: 8,
      support_quality: 8,
      scalability: 9
    },
    similar_tools: ['claude-2', 'bard-3'],
    founded_year: 2022,
    user_rating: 4.6,
    monthly_active_users: '100M+',
    key_features: [
      'Conversación natural',
      'Múltiples idiomas',
      'Generación de código',
      'Análisis de datos'
    ],
    pros: [
      'Muy fácil de usar',
      'Respuestas precisas',
      'Amplio conocimiento'
    ],
    cons: [
      'Límites en versión gratuita',
      'Puede generar información incorrecta',
      'Dependiente de conexión'
    ],
    best_for: [
      'Escritores',
      'Estudiantes',
      'Profesionales'
    ],
    alternatives: ['Claude', 'Bard', 'Bing Chat']
  },
  {
    id: 'jasper-2',
    name: 'Jasper',
    category: 'AI Writing & Content',
    subcategory: 'Marketing Copy',
    description: 'Jasper es una plataforma de IA especializada en crear contenido de marketing y copy persuasivo.',
    pricing: 'Creator $39/mes, Teams $99/mes',
    complexity: 'intermediate',
    difficulty_level: 4,
    learning_curve: 'moderate',
    community_size: 'large',
    integration_options: ['Chrome Extension', 'API', 'Zapier'],
    tags: ['marketing', 'copy', 'contenido', 'publicidad'],
    logoPlaceholder: 'photo-1560472354-b33ff0c44a43',
    website: 'https://jasper.ai',
    apiAvailable: true,
    freeVersion: false,
    use_case_examples: [
      'Copy publicitario',
      'Posts redes sociales',
      'Emails marketing',
      'Landing pages'
    ],
    comparison_matrix: {
      ease_of_use: 8,
      feature_richness: 9,
      pricing_value: 6,
      support_quality: 9,
      scalability: 8
    },
    similar_tools: ['copy-ai-3', 'writesonic-4'],
    founded_year: 2021,
    user_rating: 4.4,
    monthly_active_users: '1M+',
    key_features: [
      'Plantillas especializadas',
      'Brand voice',
      'Plagiarism checker',
      'SEO optimization'
    ],
    pros: [
      'Excelente para marketing',
      'Plantillas profesionales',
      'Buen soporte'
    ],
    cons: [
      'Precio elevado',
      'No hay plan gratuito',
      'Curva de aprendizaje'
    ],
    best_for: [
      'Marketers',
      'Agencias',
      'Empresas medianas'
    ],
    alternatives: ['Copy.ai', 'Writesonic', 'Anyword']
  },
  {
    id: 'grammarly-3',
    name: 'Grammarly',
    category: 'AI Writing & Content',
    subcategory: 'Grammar & Style',
    description: 'Grammarly es un asistente de escritura con IA que corrige gramática, ortografía y mejora el estilo.',
    pricing: 'Gratis básico, Premium $12/mes',
    complexity: 'beginner',
    difficulty_level: 2,
    learning_curve: 'immediate',
    community_size: 'massive',
    integration_options: ['Browser Extension', 'Microsoft Office', 'Google Docs'],
    tags: ['gramática', 'corrección', 'estilo', 'escritura'],
    logoPlaceholder: 'photo-1455390582262-044cdead277a',
    website: 'https://grammarly.com',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'Corrección de emails',
      'Revisión de documentos',
      'Mejora de escritura',
      'Detección de plagio'
    ],
    comparison_matrix: {
      ease_of_use: 10,
      feature_richness: 8,
      pricing_value: 8,
      support_quality: 8,
      scalability: 9
    },
    similar_tools: ['languagetool-4', 'prowritingaid-5'],
    founded_year: 2009,
    user_rating: 4.5,
    monthly_active_users: '30M+',
    key_features: [
      'Corrección en tiempo real',
      'Sugerencias de estilo',
      'Detector de plagio',
      'Análisis de tono'
    ],
    pros: [
      'Muy fácil de usar',
      'Integración universal',
      'Correcciones precisas'
    ],
    cons: [
      'Limitaciones en versión gratuita',
      'Enfocado en inglés',
      'Sugerencias a veces incorrectas'
    ],
    best_for: [
      'Estudiantes',
      'Profesionales',
      'Escritores'
    ],
    alternatives: ['LanguageTool', 'ProWritingAid', 'Ginger']
  },
  {
    id: 'notion-ai-4',
    name: 'Notion AI',
    category: 'AI Writing & Content',
    subcategory: 'Content Planning',
    description: 'Notion AI integra inteligencia artificial directamente en Notion para ayudar con escritura y organización.',
    pricing: '$10/mes adicional a plan Notion',
    complexity: 'beginner',
    difficulty_level: 3,
    learning_curve: 'gentle',
    community_size: 'large',
    integration_options: ['Notion workspace', 'Templates'],
    tags: ['productividad', 'organización', 'escritura', 'notas'],
    logoPlaceholder: 'photo-1504384308090-c894fdcc538d',
    website: 'https://notion.so/ai',
    apiAvailable: false,
    freeVersion: false,
    use_case_examples: [
      'Generación de contenido',
      'Resúmenes automáticos',
      'Lluvia de ideas',
      'Mejora de texto'
    ],
    comparison_matrix: {
      ease_of_use: 9,
      feature_richness: 7,
      pricing_value: 8,
      support_quality: 8,
      scalability: 8
    },
    similar_tools: ['chatgpt-1', 'jasper-2'],
    founded_year: 2023,
    user_rating: 4.2,
    monthly_active_users: '4M+',
    key_features: [
      'Integración nativa Notion',
      'Generación de contenido',
      'Mejora de escritura',
      'Automatización de tareas'
    ],
    pros: [
      'Integrado en Notion',
      'Workflow sin interrupciones',
      'Fácil de usar'
    ],
    cons: [
      'Solo funciona en Notion',
      'Funciones limitadas',
      'Costo adicional'
    ],
    best_for: [
      'Usuarios de Notion',
      'Equipos colaborativos',
      'Gestión de conocimiento'
    ],
    alternatives: ['ChatGPT', 'Jasper', 'Copy.ai']
  },
  {
    id: 'copy-ai-5',
    name: 'Copy.ai',
    category: 'AI Writing & Content',
    subcategory: 'Marketing Copy',
    description: 'Copy.ai es una plataforma que utiliza IA para generar copy de marketing, emails y contenido publicitario.',
    pricing: 'Gratis hasta 2,000 palabras/mes, Pro $36/mes',
    complexity: 'beginner',
    difficulty_level: 3,
    learning_curve: 'gentle',
    community_size: 'large',
    integration_options: ['Chrome Extension', 'API', 'Zapier'],
    tags: ['copy', 'marketing', 'publicidad', 'contenido'],
    logoPlaceholder: 'photo-1562577309-2592ab84b1bc',
    website: 'https://copy.ai',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'Anuncios publicitarios',
      'Emails de ventas',
      'Contenido para redes sociales',
      'Descripciones de productos'
    ],
    comparison_matrix: {
      ease_of_use: 9,
      feature_richness: 8,
      pricing_value: 8,
      support_quality: 7,
      scalability: 8
    },
    similar_tools: ['jasper-2', 'writesonic-6'],
    founded_year: 2020,
    user_rating: 4.3,
    monthly_active_users: '1M+',
    key_features: [
      'Templates variados',
      'Editor intuitivo',
      'Múltiples variaciones',
      'Análisis de rendimiento'
    ],
    pros: [
      'Plan gratuito disponible',
      'Fácil de usar',
      'Buenos templates'
    ],
    cons: [
      'Limitaciones en plan gratuito',
      'Calidad variable',
      'Menos funciones que competidores'
    ],
    best_for: [
      'Pequeñas empresas',
      'Freelancers',
      'Startups'
    ],
    alternatives: ['Jasper', 'Writesonic', 'Anyword']
  }
];
