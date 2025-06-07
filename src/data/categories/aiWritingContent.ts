
import { EnhancedTool } from '../types';

export const aiWritingContentTools: EnhancedTool[] = [
  {
    id: 'chatgpt-1',
    name: 'ChatGPT',
    category: 'AI Writing & Content',
    subcategory: 'Text Generation',
    description: 'ChatGPT es un modelo de lenguaje de inteligencia artificial desarrollado por OpenAI que puede generar texto similar al humano basado en las indicaciones dadas.',
    pricing: 'Gratis con límites, $20/mes ChatGPT Plus',
    complexity: 'beginner',
    difficulty_level: 2,
    learning_curve: 'immediate',
    community_size: 'massive',
    integration_options: ['API REST', 'Plugin browsers', 'Aplicaciones móviles'],
    tags: ['conversación', 'escritura', 'programación', 'educación'],
    logoPlaceholder: 'photo-1677442136019-21780ecad995',
    website: 'https://chat.openai.com',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'Redacción de contenido creativo',
      'Asistencia en programación',
      'Respuestas a preguntas complejas',
      'Traducción de idiomas'
    ],
    comparison_matrix: {
      ease_of_use: 10,
      feature_richness: 9,
      pricing_value: 8,
      support_quality: 7,
      scalability: 9
    },
    similar_tools: ['claude-2', 'gemini-3'],
    founded_year: 2022,
    user_rating: 4.7,
    monthly_active_users: '100M+',
    key_features: [
      'Conversación en lenguaje natural',
      'Generación de código',
      'Análisis de documentos',
      'Múltiples idiomas'
    ],
    pros: [
      'Interfaz muy intuitiva',
      'Respuestas de alta calidad',
      'Actualizaciones constantes'
    ],
    cons: [
      'Límites en versión gratuita',
      'Puede generar información incorrecta',
      'Dependiente de conexión a internet'
    ],
    best_for: [
      'Escritores y creadores de contenido',
      'Estudiantes',
      'Desarrolladores principiantes'
    ],
    alternatives: ['Claude', 'Gemini', 'Perplexity']
  },
  {
    id: 'jasper-2',
    name: 'Jasper AI',
    category: 'AI Writing & Content',
    subcategory: 'Marketing Copy',
    description: 'Jasper AI es una plataforma de escritura con IA diseñada específicamente para marketing y creación de contenido comercial.',
    pricing: '$39/mes Creator, $99/mes Teams',
    complexity: 'intermediate',
    difficulty_level: 4,
    learning_curve: 'gentle',
    community_size: 'large',
    integration_options: ['Grammarly', 'Surfer SEO', 'Chrome Extension'],
    tags: ['marketing', 'copywriting', 'SEO', 'contenido comercial'],
    logoPlaceholder: 'photo-1516321318423-f06f85e504b3',
    website: 'https://jasper.ai',
    apiAvailable: true,
    freeVersion: false,
    use_case_examples: [
      'Emails de marketing',
      'Descripciones de productos',
      'Anuncios de redes sociales',
      'Artículos de blog SEO'
    ],
    comparison_matrix: {
      ease_of_use: 8,
      feature_richness: 9,
      pricing_value: 6,
      support_quality: 8,
      scalability: 8
    },
    similar_tools: ['copy-ai-4', 'writesonic-5'],
    founded_year: 2021,
    user_rating: 4.4,
    monthly_active_users: '500K+',
    key_features: [
      'Plantillas especializadas de marketing',
      'Optimización SEO integrada',
      'Brand voice personalizada',
      'Colaboración en equipo'
    ],
    pros: [
      'Excelente para marketing',
      'Muchas plantillas',
      'Integración con herramientas SEO'
    ],
    cons: [
      'Precio elevado',
      'Curva de aprendizaje',
      'Enfocado principalmente en inglés'
    ],
    best_for: [
      'Equipos de marketing',
      'Agencias digitales',
      'E-commerce'
    ],
    alternatives: ['Copy.ai', 'Writesonic', 'Copysmith']
  },
  {
    id: 'grammarly-3',
    name: 'Grammarly',
    category: 'AI Writing & Content',
    subcategory: 'Grammar & Style',
    description: 'Grammarly utiliza IA para mejorar la escritura mediante corrección gramatical, sugerencias de estilo y detección de plagio.',
    pricing: 'Gratis básico, $12/mes Premium',
    complexity: 'beginner',
    difficulty_level: 1,
    learning_curve: 'immediate',
    community_size: 'massive',
    integration_options: ['Microsoft Word', 'Google Docs', 'Navegadores web', 'Gmail'],
    tags: ['gramática', 'corrección', 'escritura', 'productividad'],
    logoPlaceholder: 'photo-1456324504439-367cee3b3c32',
    website: 'https://grammarly.com',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'Corrección de emails profesionales',
      'Mejora de ensayos académicos',
      'Revisión de contenido web',
      'Comunicación empresarial'
    ],
    comparison_matrix: {
      ease_of_use: 10,
      feature_richness: 7,
      pricing_value: 9,
      support_quality: 8,
      scalability: 7
    },
    similar_tools: ['hemingway-6', 'prowritingaid-7'],
    founded_year: 2009,
    user_rating: 4.6,
    monthly_active_users: '30M+',
    key_features: [
      'Corrección gramatical en tiempo real',
      'Sugerencias de estilo',
      'Detector de plagio',
      'Análisis de tono'
    ],
    pros: [
      'Muy fácil de usar',
      'Integración amplia',
      'Versión gratuita útil'
    ],
    cons: [
      'Limitado en idiomas no ingleses',
      'Sugerencias a veces incorrectas',
      'Funciones avanzadas de pago'
    ],
    best_for: [
      'Estudiantes',
      'Profesionales que escriben en inglés',
      'Bloggers'
    ],
    alternatives: ['ProWritingAid', 'Hemingway Editor', 'LanguageTool']
  }
];
