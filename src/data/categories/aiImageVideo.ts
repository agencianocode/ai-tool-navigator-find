
import { EnhancedTool } from '../types';

export const aiImageVideoTools: EnhancedTool[] = [
  {
    id: 'midjourney-8',
    name: 'Midjourney',
    category: 'AI Image & Video',
    subcategory: 'Image Generation',
    description: 'Midjourney es una herramienta de IA que genera imágenes artísticas de alta calidad a partir de descripciones de texto.',
    pricing: '$10/mes Basic, $30/mes Standard',
    complexity: 'intermediate',
    difficulty_level: 5,
    learning_curve: 'moderate',
    community_size: 'large',
    integration_options: ['Discord Bot', 'API Beta'],
    tags: ['arte', 'diseño', 'ilustración', 'creatividad'],
    logoPlaceholder: 'photo-1547036967-23d11aacaee0',
    website: 'https://midjourney.com',
    apiAvailable: true,
    freeVersion: false,
    use_case_examples: [
      'Ilustraciones para artículos',
      'Conceptos de diseño',
      'Arte digital',
      'Mockups creativos'
    ],
    comparison_matrix: {
      ease_of_use: 6,
      feature_richness: 9,
      pricing_value: 7,
      support_quality: 7,
      scalability: 8
    },
    similar_tools: ['dall-e-9', 'stable-diffusion-10'],
    founded_year: 2022,
    user_rating: 4.5,
    monthly_active_users: '15M+',
    key_features: [
      'Generación de imágenes artísticas',
      'Estilos personalizables',
      'Alta resolución',
      'Interfaz Discord'
    ],
    pros: [
      'Calidad artística excepcional',
      'Comunidad activa',
      'Estilos únicos'
    ],
    cons: [
      'Solo funciona en Discord',
      'Sin versión gratuita',
      'Curva de aprendizaje'
    ],
    best_for: [
      'Artistas digitales',
      'Diseñadores gráficos',
      'Creadores de contenido'
    ],
    alternatives: ['DALL-E', 'Stable Diffusion', 'Leonardo AI']
  },
  {
    id: 'dall-e-9',
    name: 'DALL-E 3',
    category: 'AI Image & Video',
    subcategory: 'Image Generation',
    description: 'DALL-E 3 de OpenAI genera imágenes realistas y artísticas a partir de descripciones en lenguaje natural.',
    pricing: 'Incluido en ChatGPT Plus $20/mes, API $0.04-0.12/imagen',
    complexity: 'beginner',
    difficulty_level: 3,
    learning_curve: 'gentle',
    community_size: 'massive',
    integration_options: ['ChatGPT', 'OpenAI API', 'Microsoft Designer'],
    tags: ['generación', 'realista', 'OpenAI', 'texto a imagen'],
    logoPlaceholder: 'photo-1677442136019-21780ecad995',
    website: 'https://openai.com/dall-e-3',
    apiAvailable: true,
    freeVersion: false,
    use_case_examples: [
      'Ilustraciones de productos',
      'Contenido para redes sociales',
      'Conceptos visuales',
      'Arte personalizado'
    ],
    comparison_matrix: {
      ease_of_use: 9,
      feature_richness: 8,
      pricing_value: 7,
      support_quality: 8,
      scalability: 8
    },
    similar_tools: ['midjourney-8', 'leonardo-ai-10'],
    founded_year: 2021,
    user_rating: 4.4,
    monthly_active_users: '20M+',
    key_features: [
      'Integración con ChatGPT',
      'Interpretación natural',
      'Imágenes realistas',
      'Seguridad integrada'
    ],
    pros: [
      'Muy fácil de usar',
      'Integrado con ChatGPT',
      'Resultados consistentes'
    ],
    cons: [
      'Requiere suscripción',
      'Limitaciones de contenido',
      'Menos control artístico'
    ],
    best_for: [
      'Usuarios de ChatGPT',
      'Contenido comercial',
      'Principiantes'
    ],
    alternatives: ['Midjourney', 'Leonardo AI', 'Firefly']
  },
  {
    id: 'leonardo-ai-10',
    name: 'Leonardo AI',
    category: 'AI Image & Video',
    subcategory: 'Image Generation',
    description: 'Leonardo AI se especializa en generación de imágenes para gaming, arte conceptual y assets creativos.',
    pricing: 'Gratis hasta 150 tokens/día, $10/mes Apprentice',
    complexity: 'intermediate',
    difficulty_level: 4,
    learning_curve: 'moderate',
    community_size: 'medium',
    integration_options: ['API', 'Plugins', 'Web interface'],
    tags: ['gaming', 'arte conceptual', 'assets', 'creatividad'],
    logoPlaceholder: 'photo-1618005182384-a83a8bd57fbe',
    website: 'https://leonardo.ai',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'Arte conceptual para juegos',
      'Assets para videojuegos',
      'Ilustraciones fantasy',
      'Diseño de personajes'
    ],
    comparison_matrix: {
      ease_of_use: 7,
      feature_richness: 8,
      pricing_value: 8,
      support_quality: 7,
      scalability: 7
    },
    similar_tools: ['midjourney-8', 'dall-e-9'],
    founded_year: 2022,
    user_rating: 4.3,
    monthly_active_users: '5M+',
    key_features: [
      'Modelos especializados',
      'Control de generación',
      'Fine-tuning',
      'Múltiples estilos'
    ],
    pros: [
      'Especializado en gaming',
      'Plan gratuito generoso',
      'Control avanzado'
    ],
    cons: [
      'Interfaz más compleja',
      'Menos conocido',
      'Comunidad más pequeña'
    ],
    best_for: [
      'Desarrolladores de juegos',
      'Artistas conceptuales',
      'Diseñadores creativos'
    ],
    alternatives: ['Midjourney', 'DALL-E', 'Stable Diffusion']
  },
  {
    id: 'runway-ml-11',
    name: 'Runway ML',
    category: 'AI Image & Video',
    subcategory: 'Video Creation',
    description: 'Runway ML es una plataforma de IA que permite crear y editar videos con herramientas de machine learning.',
    pricing: 'Gratis básico, $12/mes Standard',
    complexity: 'advanced',
    difficulty_level: 6,
    learning_curve: 'steep',
    community_size: 'medium',
    integration_options: ['Adobe Premiere', 'After Effects', 'API'],
    tags: ['video', 'edición', 'machine learning', 'creativo'],
    logoPlaceholder: 'photo-1536240478700-b869070f9279',
    website: 'https://runwayml.com',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'Generación de video desde texto',
      'Edición automática',
      'Efectos visuales',
      'Animación de imágenes'
    ],
    comparison_matrix: {
      ease_of_use: 6,
      feature_richness: 9,
      pricing_value: 7,
      support_quality: 7,
      scalability: 8
    },
    similar_tools: ['synthesia-12', 'pictory-13'],
    founded_year: 2018,
    user_rating: 4.2,
    monthly_active_users: '1M+',
    key_features: [
      'Generación de video AI',
      'Green screen automático',
      'Inpainting de video',
      'Múltiples herramientas ML'
    ],
    pros: [
      'Tecnología muy avanzada',
      'Múltiples herramientas',
      'Resultados impresionantes'
    ],
    cons: [
      'Curva de aprendizaje pronunciada',
      'Requiere poder de cómputo',
      'Puede ser costoso'
    ],
    best_for: [
      'Editores profesionales',
      'Creadores de contenido avanzados',
      'Estudios creativos'
    ],
    alternatives: ['Synthesia', 'Pictory', 'Luma AI']
  },
  {
    id: 'canva-ai-12',
    name: 'Canva AI',
    category: 'AI Image & Video',
    subcategory: 'Design Assets',
    description: 'Canva integra herramientas de IA para generar imágenes, textos y diseños automáticamente.',
    pricing: 'Gratis básico, Pro $12.99/mes',
    complexity: 'beginner',
    difficulty_level: 2,
    learning_curve: 'immediate',
    community_size: 'massive',
    integration_options: ['Canva Apps', 'Social media platforms', 'Cloud storage'],
    tags: ['diseño', 'plantillas', 'redes sociales', 'marketing'],
    logoPlaceholder: 'photo-1611224923853-80b023f02d71',
    website: 'https://canva.com',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'Posts para redes sociales',
      'Presentaciones',
      'Logos y branding',
      'Material de marketing'
    ],
    comparison_matrix: {
      ease_of_use: 10,
      feature_richness: 7,
      pricing_value: 9,
      support_quality: 8,
      scalability: 8
    },
    similar_tools: ['adobe-express-13', 'figma-16'],
    founded_year: 2013,
    user_rating: 4.6,
    monthly_active_users: '130M+',
    key_features: [
      'Magic Design',
      'Text to Image',
      'Background Remover',
      'Plantillas inteligentes'
    ],
    pros: [
      'Extremadamente fácil',
      'Miles de plantillas',
      'AI integrada naturalmente'
    ],
    cons: [
      'Limitaciones en personalización',
      'Dependiente de plantillas',
      'Algunas funciones requieren Pro'
    ],
    best_for: [
      'No-diseñadores',
      'Marketing digital',
      'Contenido rápido'
    ],
    alternatives: ['Adobe Express', 'Figma', 'Piktochart']
  }
];
