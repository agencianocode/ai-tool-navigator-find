
import { EnhancedTool } from '../types';

export const designPrototypingTools: EnhancedTool[] = [
  {
    id: 'figma-16',
    name: 'Figma',
    category: 'Design & Prototyping',
    subcategory: 'UI/UX Design',
    description: 'Figma es una herramienta de diseño colaborativo basada en la web para crear interfaces de usuario y prototipos.',
    pricing: 'Gratis para equipos pequeños, $12/mes Professional',
    complexity: 'intermediate',
    difficulty_level: 4,
    learning_curve: 'gentle',
    community_size: 'massive',
    integration_options: ['Slack', 'Notion', 'Jira', 'Zeplin'],
    tags: ['diseño UI', 'prototipado', 'colaboración', 'wireframes'],
    logoPlaceholder: 'photo-1611224923853-80b023f02d71',
    website: 'https://figma.com',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'Diseño de interfaces móviles',
      'Prototipos interactivos',
      'Sistemas de diseño',
      'Wireframes'
    ],
    comparison_matrix: {
      ease_of_use: 8,
      feature_richness: 9,
      pricing_value: 9,
      support_quality: 9,
      scalability: 9
    },
    similar_tools: ['sketch-17', 'adobe-xd-18'],
    founded_year: 2016,
    user_rating: 4.7,
    monthly_active_users: '4M+',
    key_features: [
      'Colaboración en tiempo real',
      'Prototipos interactivos',
      'Componentes reutilizables',
      'Design systems'
    ],
    pros: [
      'Colaboración excelente',
      'Basado en web',
      'Versión gratuita generosa'
    ],
    cons: [
      'Requiere conexión a internet',
      'Puede ser lento con archivos grandes',
      'Funciones avanzadas de pago'
    ],
    best_for: [
      'Equipos de diseño',
      'Startups',
      'Diseñadores freelance'
    ],
    alternatives: ['Sketch', 'Adobe XD', 'Framer']
  }
];
