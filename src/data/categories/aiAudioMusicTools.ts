
import { EnhancedTool } from '../types';

export const aiAudioMusicTools: EnhancedTool[] = [
  {
    id: 'elevenlabs-43',
    name: 'ElevenLabs',
    category: 'AI Audio & Music',
    subcategory: 'Voice Synthesis',
    description: 'ElevenLabs es una plataforma de síntesis de voz AI que crea voces realistas para podcasts, audiolibros y contenido multimedia.',
    pricing: 'Gratis hasta 10,000 caracteres/mes, Starter $5/mes',
    complexity: 'beginner',
    difficulty_level: 3,
    learning_curve: 'gentle',
    community_size: 'large',
    integration_options: ['API REST', 'Python SDK', 'JavaScript SDK'],
    tags: ['voz sintética', 'audio', 'podcasts', 'narración'],
    logoPlaceholder: 'photo-1493225457124-a3eb161ffa5f',
    website: 'https://elevenlabs.io',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'Voiceovers para videos',
      'Audiolibros',
      'Podcasts',
      'Asistentes virtuales'
    ],
    comparison_matrix: {
      ease_of_use: 9,
      feature_richness: 8,
      pricing_value: 8,
      support_quality: 8,
      scalability: 8
    },
    similar_tools: ['murf-44', 'speechify-45'],
    founded_year: 2022,
    user_rating: 4.6,
    monthly_active_users: '1M+',
    key_features: [
      'Clonación de voz',
      'Múltiples idiomas',
      'API robusta',
      'Calidad profesional'
    ],
    pros: [
      'Calidad de voz excepcional',
      'Fácil de usar',
      'API bien documentada'
    ],
    cons: [
      'Límites en plan gratuito',
      'Costos pueden escalar',
      'Requiere contenido ético'
    ],
    best_for: [
      'Creadores de contenido',
      'Desarrolladores',
      'Empresas de media'
    ],
    alternatives: ['Murf', 'Speechify', 'Descript']
  },
  {
    id: 'murf-44',
    name: 'Murf AI',
    category: 'AI Audio & Music',
    subcategory: 'Voice Generation',
    description: 'Murf AI es un generador de voces con IA que permite crear voiceovers profesionales con más de 120 voces en 20 idiomas.',
    pricing: 'Gratis con límites, Basic $23/mes, Pro $52/mes',
    complexity: 'beginner',
    difficulty_level: 2,
    learning_curve: 'immediate',
    community_size: 'medium',
    integration_options: ['Web app', 'API', 'Integraciones de terceros'],
    tags: ['voiceover', 'presentaciones', 'e-learning', 'marketing'],
    logoPlaceholder: 'photo-1590736969955-71cc94901144',
    website: 'https://murf.ai',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'Presentaciones corporativas',
      'Cursos online',
      'Anuncios publicitarios',
      'Videos explicativos'
    ],
    comparison_matrix: {
      ease_of_use: 9,
      feature_richness: 7,
      pricing_value: 7,
      support_quality: 7,
      scalability: 8
    },
    similar_tools: ['elevenlabs-43', 'wellsaid-45'],
    founded_year: 2020,
    user_rating: 4.3,
    monthly_active_users: '500K+',
    key_features: [
      '120+ voces AI',
      '20 idiomas',
      'Editor de audio',
      'Sincronización labial'
    ],
    pros: [
      'Gran variedad de voces',
      'Interfaz intuitiva',
      'Múltiples idiomas'
    ],
    cons: [
      'Calidad variable entre voces',
      'Limitaciones en plan gratuito',
      'Menos personalización que competidores'
    ],
    best_for: [
      'Educadores',
      'Marketers',
      'Creadores de contenido'
    ],
    alternatives: ['ElevenLabs', 'WellSaid', 'Speechify']
  },
  {
    id: 'descript-45',
    name: 'Descript',
    category: 'AI Audio & Music',
    subcategory: 'Audio Editing',
    description: 'Descript es un editor de audio y video que permite editar mediante texto, con funciones de transcripción automática y clonación de voz.',
    pricing: 'Gratis con límites, Creator $12/mes, Pro $24/mes',
    complexity: 'intermediate',
    difficulty_level: 4,
    learning_curve: 'moderate',
    community_size: 'large',
    integration_options: ['Zapier', 'Frame.io', 'YouTube', 'Vimeo'],
    tags: ['edición', 'transcripción', 'podcasts', 'video'],
    logoPlaceholder: 'photo-1598488035139-bdbb2231ce04',
    website: 'https://descript.com',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'Edición de podcasts',
      'Transcripción automática',
      'Videos corporativos',
      'Contenido educativo'
    ],
    comparison_matrix: {
      ease_of_use: 8,
      feature_richness: 9,
      pricing_value: 8,
      support_quality: 8,
      scalability: 8
    },
    similar_tools: ['audacity-46', 'hindenburg-47'],
    founded_year: 2017,
    user_rating: 4.4,
    monthly_active_users: '300K+',
    key_features: [
      'Edición basada en texto',
      'Overdub (clonación de voz)',
      'Transcripción automática',
      'Colaboración en tiempo real'
    ],
    pros: [
      'Revoluciona la edición de audio',
      'Transcripción muy precisa',
      'Interfaz innovadora'
    ],
    cons: [
      'Curva de aprendizaje inicial',
      'Limitaciones en plan gratuito',
      'Consumo de recursos alto'
    ],
    best_for: [
      'Podcasters',
      'Creadores de video',
      'Periodistas'
    ],
    alternatives: ['Audacity', 'Hindenburg', 'Adobe Audition']
  }
];
