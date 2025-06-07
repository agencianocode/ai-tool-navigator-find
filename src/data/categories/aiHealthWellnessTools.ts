
import { EnhancedTool } from '../types';

export const aiHealthWellnessTools: EnhancedTool[] = [
  {
    id: 'ada-health-64',
    name: 'Ada Health',
    category: 'AI Health & Wellness',
    subcategory: 'Symptom Checker',
    description: 'Ada Health es un asistente de salud con IA que evalúa síntomas y proporciona recomendaciones médicas.',
    pricing: 'Gratis para consumidores, Enterprise bajo consulta',
    complexity: 'beginner',
    difficulty_level: 2,
    learning_curve: 'immediate',
    community_size: 'medium',
    integration_options: ['Healthcare providers', 'Telemedicine platforms'],
    tags: ['salud', 'síntomas', 'diagnóstico', 'médico'],
    logoPlaceholder: 'photo-1590736969955-71cc94901144',
    website: 'https://ada.com',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'Evaluación de síntomas',
      'Triaje médico',
      'Educación en salud',
      'Seguimiento de condiciones'
    ],
    comparison_matrix: {
      ease_of_use: 9,
      feature_richness: 7,
      pricing_value: 9,
      support_quality: 7,
      scalability: 8
    },
    similar_tools: ['babylon-health-65', 'your-md-66'],
    founded_year: 2011,
    user_rating: 4.3,
    monthly_active_users: '10M+',
    key_features: [
      'Evaluación de síntomas por IA',
      'Base de conocimiento médico',
      'Recomendaciones personalizadas',
      'Múltiples idiomas'
    ],
    pros: [
      'Gratis y accesible',
      'Interfaz muy intuitiva',
      'Respaldado por médicos'
    ],
    cons: [
      'No reemplaza consulta médica',
      'Limitado en diagnósticos complejos',
      'Requiere internet'
    ],
    best_for: [
      'Evaluación inicial de síntomas',
      'Educación en salud',
      'Triaje básico'
    ],
    alternatives: ['Babylon Health', 'K Health', 'WebMD']
  },
  {
    id: 'fitbit-sense-65',
    name: 'Fitbit Sense AI',
    category: 'AI Health & Wellness',
    subcategory: 'Fitness Tracking',
    description: 'Fitbit Sense utiliza IA para analizar patrones de salud y proporcionar insights personalizados de bienestar.',
    pricing: 'Dispositivo $299, Premium $9.99/mes',
    complexity: 'beginner',
    difficulty_level: 2,
    learning_curve: 'gentle',
    community_size: 'large',
    integration_options: ['Google Health', 'Smartphone apps', 'Health records'],
    tags: ['fitness', 'seguimiento', 'bienestar', 'wearable'],
    logoPlaceholder: 'photo-1598488035139-bdbb2231ce04',
    website: 'https://fitbit.com/sense',
    apiAvailable: true,
    freeVersion: false,
    use_case_examples: [
      'Seguimiento de actividad',
      'Monitoreo del sueño',
      'Gestión del estrés',
      'Seguimiento de salud cardiaca'
    ],
    comparison_matrix: {
      ease_of_use: 9,
      feature_richness: 8,
      pricing_value: 7,
      support_quality: 8,
      scalability: 8
    },
    similar_tools: ['apple-watch-66', 'garmin-venu-67'],
    founded_year: 2007,
    user_rating: 4.2,
    monthly_active_users: '30M+',
    key_features: [
      'Monitoreo continuo de salud',
      'Análisis de patrones',
      'Alertas inteligentes',
      'Coach personalizado'
    ],
    pros: [
      'Monitoreo integral',
      'Insights personalizados',
      'Buena duración de batería'
    ],
    cons: [
      'Requiere suscripción premium',
      'Precio del dispositivo',
      'Precisión variable'
    ],
    best_for: [
      'Entusiastas del fitness',
      'Monitoreo de salud',
      'Gestión del bienestar'
    ],
    alternatives: ['Apple Watch', 'Garmin', 'Samsung Galaxy Watch']
  },
  {
    id: 'headspace-66',
    name: 'Headspace AI',
    category: 'AI Health & Wellness',
    subcategory: 'Mental Health',
    description: 'Headspace incorpora IA para personalizar sesiones de meditación y mindfulness según el estado emocional.',
    pricing: 'Gratis básico, Premium $12.99/mes',
    complexity: 'beginner',
    difficulty_level: 1,
    learning_curve: 'immediate',
    community_size: 'large',
    integration_options: ['Wearable devices', 'Calendar apps', 'Health platforms'],
    tags: ['meditación', 'mindfulness', 'salud mental', 'bienestar'],
    logoPlaceholder: 'photo-1507003211169-0a1dd7228f2d',
    website: 'https://headspace.com',
    apiAvailable: false,
    freeVersion: true,
    use_case_examples: [
      'Meditación guiada',
      'Manejo del estrés',
      'Mejora del sueño',
      'Ejercicios de mindfulness'
    ],
    comparison_matrix: {
      ease_of_use: 10,
      feature_richness: 8,
      pricing_value: 8,
      support_quality: 8,
      scalability: 8
    },
    similar_tools: ['calm-67', 'insight-timer-68'],
    founded_year: 2010,
    user_rating: 4.5,
    monthly_active_users: '5M+',
    key_features: [
      'Meditaciones personalizadas',
      'Seguimiento del progreso',
      'Contenido especializado',
      'Recordatorios inteligentes'
    ],
    pros: [
      'Contenido de alta calidad',
      'Interfaz hermosa',
      'Personalización efectiva'
    ],
    cons: [
      'Contenido premium costoso',
      'Limitado en versión gratuita',
      'Principalmente en inglés'
    ],
    best_for: [
      'Principiantes en meditación',
      'Manejo del estrés',
      'Mejora del sueño'
    ],
    alternatives: ['Calm', 'Insight Timer', 'Ten Percent Happier']
  }
];
