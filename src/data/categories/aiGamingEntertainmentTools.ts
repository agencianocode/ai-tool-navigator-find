
import { EnhancedTool } from '../types';

export const aiGamingEntertainmentTools: EnhancedTool[] = [
  {
    id: 'nvidia-dlss-70',
    name: 'NVIDIA DLSS',
    category: 'AI Gaming & Entertainment',
    subcategory: 'Graphics Enhancement',
    description: 'DLSS utiliza IA para mejorar el rendimiento gráfico en videojuegos mediante técnicas de super-resolución.',
    pricing: 'Gratis (requiere GPU NVIDIA RTX)',
    complexity: 'intermediate',
    difficulty_level: 4,
    learning_curve: 'gentle',
    community_size: 'large',
    integration_options: ['Game engines', 'DirectX', 'Vulkan'],
    tags: ['gaming', 'gráficos', 'rendimiento', 'IA'],
    logoPlaceholder: 'photo-1518709268805-4e9042af2176',
    website: 'https://nvidia.com/dlss',
    apiAvailable: false,
    freeVersion: true,
    use_case_examples: [
      'Mejora de FPS en juegos',
      'Resolución 4K en tiempo real',
      'Ray tracing optimizado',
      'Gaming en VR'
    ],
    comparison_matrix: {
      ease_of_use: 8,
      feature_richness: 9,
      pricing_value: 10,
      support_quality: 8,
      scalability: 9
    },
    similar_tools: ['amd-fsr-71', 'intel-xess-72'],
    founded_year: 2018,
    user_rating: 4.6,
    monthly_active_users: '100M+',
    key_features: [
      'Super resolución con IA',
      'Mejora de rendimiento',
      'Soporte ray tracing',
      'Calidad visual mejorada'
    ],
    pros: [
      'Mejora significativa de FPS',
      'Calidad visual excelente',
      'Amplio soporte de juegos'
    ],
    cons: [
      'Requiere GPU RTX',
      'Solo NVIDIA',
      'Depende del soporte del juego'
    ],
    best_for: [
      'Gamers con GPU RTX',
      'Gaming 4K',
      'Entusiastas de ray tracing'
    ],
    alternatives: ['AMD FSR', 'Intel XeSS', 'TSR']
  },
  {
    id: 'spotify-ai-71',
    name: 'Spotify AI DJ',
    category: 'AI Gaming & Entertainment',
    subcategory: 'Music Streaming',
    description: 'Spotify utiliza IA para crear listas de reproducción personalizadas y recomendaciones musicales inteligentes.',
    pricing: 'Gratis con anuncios, Premium $9.99/mes',
    complexity: 'beginner',
    difficulty_level: 1,
    learning_curve: 'immediate',
    community_size: 'massive',
    integration_options: ['Smart speakers', 'Gaming consoles', 'Automotive'],
    tags: ['música', 'recomendaciones', 'personalización', 'streaming'],
    logoPlaceholder: 'photo-1470225620780-dba8ba36b745',
    website: 'https://spotify.com',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'Discover Weekly',
      'DJ personalizado',
      'Listas según mood',
      'Recomendaciones de podcasts'
    ],
    comparison_matrix: {
      ease_of_use: 10,
      feature_richness: 9,
      pricing_value: 9,
      support_quality: 8,
      scalability: 10
    },
    similar_tools: ['apple-music-72', 'youtube-music-73'],
    founded_year: 2006,
    user_rating: 4.4,
    monthly_active_users: '400M+',
    key_features: [
      'Recomendaciones personalizadas',
      'AI DJ con voz',
      'Análisis de gustos musicales',
      'Listas colaborativas'
    ],
    pros: [
      'Excelentes recomendaciones',
      'Interfaz intuitiva',
      'Gran catálogo musical'
    ],
    cons: [
      'Anuncios en versión gratuita',
      'Limitaciones en versión free',
      'Calidad de audio variable'
    ],
    best_for: [
      'Descubrimiento musical',
      'Uso diario',
      'Creación de ambiente'
    ],
    alternatives: ['Apple Music', 'YouTube Music', 'Amazon Music']
  },
  {
    id: 'twitch-ai-72',
    name: 'Twitch AI Moderation',
    category: 'AI Gaming & Entertainment',
    subcategory: 'Content Moderation',
    description: 'Twitch utiliza IA para moderar automáticamente chats, detectar contenido inapropiado y mejorar la experiencia de streaming.',
    pricing: 'Gratis para streamers y viewers',
    complexity: 'intermediate',
    difficulty_level: 4,
    learning_curve: 'gentle',
    community_size: 'massive',
    integration_options: ['OBS', 'Streamlabs', 'Discord bots'],
    tags: ['streaming', 'moderación', 'gaming', 'comunidad'],
    logoPlaceholder: 'photo-1461749280684-dccba630e2f6',
    website: 'https://twitch.tv',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'Moderación automática de chat',
      'Detección de spam',
      'Filtrado de contenido',
      'Análisis de audiencia'
    ],
    comparison_matrix: {
      ease_of_use: 8,
      feature_richness: 8,
      pricing_value: 10,
      support_quality: 7,
      scalability: 10
    },
    similar_tools: ['youtube-gaming-73', 'facebook-gaming-74'],
    founded_year: 2011,
    user_rating: 4.1,
    monthly_active_users: '140M+',
    key_features: [
      'Moderación automática',
      'Detección de toxicidad',
      'Analytics de stream',
      'Herramientas para streamers'
    ],
    pros: [
      'Moderación efectiva',
      'Gratuito para todos',
      'Gran comunidad'
    ],
    cons: [
      'Moderación a veces excesiva',
      'Reglas complejas',
      'Dependiente de la comunidad'
    ],
    best_for: [
      'Streamers de gaming',
      'Comunidades grandes',
      'Entretenimiento en vivo'
    ],
    alternatives: ['YouTube Gaming', 'Facebook Gaming', 'Discord Stage']
  }
];
