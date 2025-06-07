
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
  }
];
