
import { EnhancedTool } from '../types';

export const aiImageVideoTools: EnhancedTool[] = [
  {
    id: 'midjourney-6',
    name: 'Midjourney',
    category: 'AI Image & Video',
    subcategory: 'Image Generation',
    description: 'Midjourney es una herramienta de IA que genera imágenes artísticas a partir de descripciones de texto.',
    pricing: 'Basic $10/mes, Standard $30/mes, Pro $60/mes',
    complexity: 'intermediate',
    difficulty_level: 4,
    learning_curve: 'moderate',
    community_size: 'massive',
    integration_options: ['Discord', 'API (próximamente)', 'Web interface'],
    tags: ['generación de imágenes', 'arte', 'creativo', 'Discord'],
    logoPlaceholder: 'photo-1547658719-da2b51169166',
    website: 'https://midjourney.com',
    apiAvailable: false,
    freeVersion: false,
    use_case_examples: [
      'Arte conceptual',
      'Ilustraciones',
      'Diseño de personajes',
      'Inspiración visual'
    ],
    comparison_matrix: {
      ease_of_use: 7,
      feature_richness: 9,
      pricing_value: 7,
      support_quality: 6,
      scalability: 8
    },
    similar_tools: ['dall-e-7', 'stable-diffusion-8'],
    founded_year: 2021,
    user_rating: 4.3,
    monthly_active_users: '15M+',
    key_features: [
      'Calidad artística superior',
      'Estilos variados',
      'Upscaling',
      'Variations'
    ],
    pros: [
      'Calidad de imagen excepcional',
      'Comunidad activa',
      'Resultados artísticos'
    ],
    cons: [
      'Usa Discord',
      'No hay plan gratuito',
      'Curva de aprendizaje'
    ],
    best_for: [
      'Artistas digitales',
      'Diseñadores',
      'Creativos'
    ],
    alternatives: ['DALL-E', 'Stable Diffusion', 'Adobe Firefly']
  },
  {
    id: 'dall-e-7',
    name: 'DALL-E 3',
    category: 'AI Image & Video',
    subcategory: 'Image Generation',
    description: 'DALL-E 3 de OpenAI genera imágenes realistas y artísticas a partir de descripciones en lenguaje natural.',
    pricing: 'Incluido en ChatGPT Plus $20/mes',
    complexity: 'beginner',
    difficulty_level: 2,
    learning_curve: 'immediate',
    community_size: 'large',
    integration_options: ['ChatGPT', 'API OpenAI', 'Bing Image Creator'],
    tags: ['generación de imágenes', 'OpenAI', 'realista', 'fácil'],
    logoPlaceholder: 'photo-1547658719-da2b51169166',
    website: 'https://openai.com/dall-e-3',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'Imágenes para contenido',
      'Conceptos visuales',
      'Marketing materials',
      'Presentaciones'
    ],
    comparison_matrix: {
      ease_of_use: 10,
      feature_richness: 8,
      pricing_value: 8,
      support_quality: 8,
      scalability: 8
    },
    similar_tools: ['midjourney-6', 'stable-diffusion-8'],
    founded_year: 2023,
    user_rating: 4.4,
    monthly_active_users: '10M+',
    key_features: [
      'Integración con ChatGPT',
      'Comprende texto complejo',
      'Edición de imágenes',
      'Múltiples estilos'
    ],
    pros: [
      'Muy fácil de usar',
      'Integrado con ChatGPT',
      'Comprende bien el contexto'
    ],
    cons: [
      'Requiere suscripción',
      'Limitaciones de contenido',
      'Menos control artístico'
    ],
    best_for: [
      'Usuarios de ChatGPT',
      'Content creators',
      'Principiantes'
    ],
    alternatives: ['Midjourney', 'Stable Diffusion', 'Adobe Firefly']
  },
  {
    id: 'stable-diffusion-8',
    name: 'Stable Diffusion',
    category: 'AI Image & Video',
    subcategory: 'Image Generation',
    description: 'Stable Diffusion es un modelo de IA open source para generar imágenes de alta calidad.',
    pricing: 'Gratis (open source), servicios desde $10/mes',
    complexity: 'advanced',
    difficulty_level: 7,
    learning_curve: 'steep',
    community_size: 'large',
    integration_options: ['Local installation', 'Hugging Face', 'Various UIs'],
    tags: ['open source', 'local', 'personalizable', 'técnico'],
    logoPlaceholder: 'photo-1547658719-da2b51169166',
    website: 'https://stability.ai',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'Modelos personalizados',
      'Arte generativo',
      'Investigación',
      'Aplicaciones comerciales'
    ],
    comparison_matrix: {
      ease_of_use: 4,
      feature_richness: 10,
      pricing_value: 10,
      support_quality: 6,
      scalability: 9
    },
    similar_tools: ['midjourney-6', 'dall-e-7'],
    founded_year: 2022,
    user_rating: 4.1,
    monthly_active_users: '2M+',
    key_features: [
      'Completamente open source',
      'Ejecución local',
      'Modelos personalizables',
      'Sin censura'
    ],
    pros: [
      'Gratis y open source',
      'Muy personalizable',
      'Sin limitaciones de contenido'
    ],
    cons: [
      'Requiere conocimiento técnico',
      'Setup complejo',
      'Demanda recursos'
    ],
    best_for: [
      'Desarrolladores',
      'Investigadores',
      'Usuarios avanzados'
    ],
    alternatives: ['Midjourney', 'DALL-E', 'Adobe Firefly']
  },
  {
    id: 'runway-9',
    name: 'Runway',
    category: 'AI Image & Video',
    subcategory: 'Video Creation',
    description: 'Runway es una plataforma de IA para crear y editar videos con herramientas generativas avanzadas.',
    pricing: 'Gratis con límites, Standard $12/mes, Pro $28/mes',
    complexity: 'intermediate',
    difficulty_level: 5,
    learning_curve: 'moderate',
    community_size: 'medium',
    integration_options: ['Adobe Premiere', 'After Effects', 'APIs'],
    tags: ['video IA', 'edición', 'generativo', 'profesional'],
    logoPlaceholder: 'photo-1574375927938-d5a98e8ffe85',
    website: 'https://runwayml.com',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'Edición de video automática',
      'Generación de video',
      'Efectos especiales',
      'Rotoscoping'
    ],
    comparison_matrix: {
      ease_of_use: 7,
      feature_richness: 9,
      pricing_value: 7,
      support_quality: 7,
      scalability: 8
    },
    similar_tools: ['pika-labs-10', 'synthesia-11'],
    founded_year: 2018,
    user_rating: 4.2,
    monthly_active_users: '500K+',
    key_features: [
      'Text to video',
      'Video editing AI',
      'Background removal',
      'Style transfer'
    ],
    pros: [
      'Muy innovador',
      'Múltiples herramientas IA',
      'Calidad profesional'
    ],
    cons: [
      'Precio puede ser alto',
      'Curva de aprendizaje',
      'Requiere buenos prompts'
    ],
    best_for: [
      'Editores de video',
      'Content creators',
      'Productoras'
    ],
    alternatives: ['Pika Labs', 'Synthesia', 'Adobe Premiere']
  },
  {
    id: 'canva-10',
    name: 'Canva',
    category: 'AI Image & Video',
    subcategory: 'Design Assets',
    description: 'Canva es una plataforma de diseño gráfico con herramientas de IA para crear contenido visual.',
    pricing: 'Gratis con límites, Pro $12.99/mes, Teams $14.99/mes',
    complexity: 'beginner',
    difficulty_level: 2,
    learning_curve: 'immediate',
    community_size: 'massive',
    integration_options: ['Social media platforms', 'Google Drive', 'Dropbox'],
    tags: ['diseño gráfico', 'templates', 'social media', 'marketing'],
    logoPlaceholder: 'photo-1558655146-d09347e92766',
    website: 'https://canva.com',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'Posts para redes sociales',
      'Presentaciones',
      'Logos y branding',
      'Marketing materials'
    ],
    comparison_matrix: {
      ease_of_use: 10,
      feature_richness: 8,
      pricing_value: 9,
      support_quality: 8,
      scalability: 7
    },
    similar_tools: ['adobe-express-11', 'figma-19'],
    founded_year: 2013,
    user_rating: 4.7,
    monthly_active_users: '135M+',
    key_features: [
      'Miles de templates',
      'Magic Design (IA)',
      'Brand kit',
      'Colaboración en equipo'
    ],
    pros: [
      'Extremadamente fácil',
      'Gran biblioteca de assets',
      'IA integrada'
    ],
    cons: [
      'Limitado para diseño avanzado',
      'Dependiente de templates',
      'Branding en plan gratuito'
    ],
    best_for: [
      'Small businesses',
      'Social media managers',
      'Principiantes en diseño'
    ],
    alternatives: ['Adobe Express', 'Figma', 'Sketch']
  }
];
