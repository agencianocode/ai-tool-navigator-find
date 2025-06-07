
import { EnhancedTool } from '../types';

export const aiAudioMusicTools: EnhancedTool[] = [
  {
    id: 'eleven-labs-80',
    name: 'ElevenLabs',
    category: 'AI Audio & Music',
    subcategory: 'Voice Synthesis',
    description: 'ElevenLabs crea voces sintéticas realistas con IA para dubbing, audiolibros y contenido multimedia.',
    pricing: 'Gratis con límites, Starter $5/mes, Creator $22/mes',
    complexity: 'beginner',
    difficulty_level: 3,
    learning_curve: 'gentle',
    community_size: 'large',
    integration_options: ['API', 'Unity', 'Unreal Engine', 'Web interface'],
    tags: ['voice cloning', 'TTS', 'dubbing', 'audiolibros'],
    logoPlaceholder: 'photo-1493225457124-a3eb161ffa5f',
    website: 'https://elevenlabs.io',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'Clonación de voz',
      'Narración automática',
      'Dubbing de videos',
      'Asistentes virtuales'
    ],
    comparison_matrix: {
      ease_of_use: 9,
      feature_richness: 8,
      pricing_value: 8,
      support_quality: 7,
      scalability: 8
    },
    similar_tools: ['murf-81', 'speechify-82'],
    founded_year: 2022,
    user_rating: 4.5,
    monthly_active_users: '1M+',
    key_features: [
      'Voice cloning',
      'Multiple languages',
      'Real-time synthesis',
      'Emotion control'
    ],
    pros: [
      'Calidad de voz excepcional',
      'Fácil de usar',
      'API bien documentada'
    ],
    cons: [
      'Límites en plan gratuito',
      'Consideraciones éticas',
      'Puede ser caro para uso intensivo'
    ],
    best_for: [
      'Content creators',
      'Desarrolladores de juegos',
      'Productores de audiolibros'
    ],
    alternatives: ['Murf', 'Speechify', 'Amazon Polly']
  },
  {
    id: 'suno-ai-81',
    name: 'Suno AI',
    category: 'AI Audio & Music',
    subcategory: 'Music Generation',
    description: 'Suno AI genera música completa con letras a partir de simples prompts de texto.',
    pricing: 'Gratis con límites, Pro $8/mes, Premier $24/mes',
    complexity: 'beginner',
    difficulty_level: 2,
    learning_curve: 'immediate',
    community_size: 'medium',
    integration_options: ['Web interface', 'Discord bot', 'API (beta)'],
    tags: ['music generation', 'AI composition', 'lyrics', 'creative'],
    logoPlaceholder: 'photo-1493225457124-a3eb161ffa5f',
    website: 'https://suno.ai',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'Creación de canciones',
      'Música de fondo',
      'Demos musicales',
      'Contenido para videos'
    ],
    comparison_matrix: {
      ease_of_use: 10,
      feature_richness: 7,
      pricing_value: 9,
      support_quality: 6,
      scalability: 7
    },
    similar_tools: ['udio-82', 'aiva-83'],
    founded_year: 2023,
    user_rating: 4.2,
    monthly_active_users: '500K+',
    key_features: [
      'Text to music',
      'Lyric generation',
      'Multiple genres',
      'High quality output'
    ],
    pros: [
      'Muy fácil de usar',
      'Resultados impresionantes',
      'Genera letras también'
    ],
    cons: [
      'Limitado control creativo',
      'Calidad variable',
      'Derechos de autor no claros'
    ],
    best_for: [
      'Content creators',
      'Músicos para inspiración',
      'Productores de videos'
    ],
    alternatives: ['Udio', 'AIVA', 'Amper Music']
  },
  {
    id: 'adobe-audition-82',
    name: 'Adobe Audition',
    category: 'AI Audio & Music',
    subcategory: 'Audio Editing',
    description: 'Adobe Audition es un editor de audio profesional con herramientas de IA para limpieza y mejora.',
    pricing: 'Individual $22.99/mes, incluido en Creative Cloud',
    complexity: 'advanced',
    difficulty_level: 7,
    learning_curve: 'steep',
    community_size: 'large',
    integration_options: ['Adobe Creative Suite', 'Premiere Pro', 'After Effects'],
    tags: ['audio editing', 'professional', 'podcast', 'post-production'],
    logoPlaceholder: 'photo-1493225457124-a3eb161ffa5f',
    website: 'https://adobe.com/products/audition',
    apiAvailable: false,
    freeVersion: false,
    use_case_examples: [
      'Edición de podcasts',
      'Post-producción de audio',
      'Restauración de audio',
      'Mixing y mastering'
    ],
    comparison_matrix: {
      ease_of_use: 5,
      feature_richness: 10,
      pricing_value: 6,
      support_quality: 8,
      scalability: 9
    },
    similar_tools: ['pro-tools-83', 'audacity-84'],
    founded_year: 2003,
    user_rating: 4.4,
    monthly_active_users: '5M+',
    key_features: [
      'Spectral frequency display',
      'Auto-ducking',
      'Noise reduction AI',
      'Multi-track editing'
    ],
    pros: [
      'Herramientas profesionales',
      'IA para limpieza de audio',
      'Integración con Adobe'
    ],
    cons: [
      'Precio alto',
      'Curva de aprendizaje empinada',
      'Requiere suscripción'
    ],
    best_for: [
      'Audio professionals',
      'Podcasters serios',
      'Post-production studios'
    ],
    alternatives: ['Pro Tools', 'Audacity', 'Reaper']
  }
];
