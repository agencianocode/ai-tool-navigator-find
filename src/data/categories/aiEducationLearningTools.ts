
import { EnhancedTool } from '../types';

export const aiEducationLearningTools: EnhancedTool[] = [
  {
    id: 'khan-academy-61',
    name: 'Khan Academy Khanmigo',
    category: 'AI Education & Learning',
    subcategory: 'Tutoring',
    description: 'Khanmigo es un tutor de IA personalizado de Khan Academy que ayuda a estudiantes con explicaciones adaptadas.',
    pricing: 'Gratis',
    complexity: 'beginner',
    difficulty_level: 2,
    learning_curve: 'immediate',
    community_size: 'large',
    integration_options: ['Khan Academy platform', 'Google Classroom'],
    tags: ['tutor', 'personalizado', 'educación', 'gratuito'],
    logoPlaceholder: 'photo-1532094349884-543bc11b234d',
    website: 'https://khanacademy.org/khan-labs',
    apiAvailable: false,
    freeVersion: true,
    use_case_examples: [
      'Ayuda con matemáticas',
      'Explicaciones personalizadas',
      'Práctica adaptativa',
      'Feedback inmediato'
    ],
    comparison_matrix: {
      ease_of_use: 10,
      feature_richness: 7,
      pricing_value: 10,
      support_quality: 8,
      scalability: 9
    },
    similar_tools: ['duolingo-62', 'coursera-coach-63'],
    founded_year: 2023,
    user_rating: 4.5,
    monthly_active_users: '2M+',
    key_features: [
      'Tutorías personalizadas',
      'Explicaciones paso a paso',
      'Práctica adaptativa',
      'Soporte multiidioma'
    ],
    pros: [
      'Completamente gratuito',
      'Muy fácil de usar',
      'Contenido de calidad'
    ],
    cons: [
      'Limitado a contenido de Khan Academy',
      'Funciones básicas de IA',
      'No hay certificaciones'
    ],
    best_for: [
      'Estudiantes K-12',
      'Aprendizaje autodirigido',
      'Refuerzo académico'
    ],
    alternatives: ['Duolingo', 'Coursera', 'Brilliant']
  },
  {
    id: 'duolingo-62',
    name: 'Duolingo',
    category: 'AI Education & Learning',
    subcategory: 'Language Learning',
    description: 'Duolingo utiliza IA para personalizar lecciones de idiomas y adaptar el aprendizaje al ritmo del usuario.',
    pricing: 'Gratis con anuncios, Plus $6.99/mes',
    complexity: 'beginner',
    difficulty_level: 1,
    learning_curve: 'immediate',
    community_size: 'massive',
    integration_options: ['Mobile apps', 'Web platform', 'Classroom tools'],
    tags: ['idiomas', 'gamificación', 'móvil', 'personalización'],
    logoPlaceholder: 'photo-1493225457124-a3eb161ffa5f',
    website: 'https://duolingo.com',
    apiAvailable: false,
    freeVersion: true,
    use_case_examples: [
      'Aprendizaje de idiomas',
      'Práctica diaria',
      'Gamificación educativa',
      'Seguimiento de progreso'
    ],
    comparison_matrix: {
      ease_of_use: 10,
      feature_richness: 8,
      pricing_value: 9,
      support_quality: 7,
      scalability: 9
    },
    similar_tools: ['babbel-63', 'rosetta-stone-64'],
    founded_year: 2011,
    user_rating: 4.6,
    monthly_active_users: '50M+',
    key_features: [
      'Lecciones adaptativas',
      'Gamificación',
      '40+ idiomas',
      'Seguimiento de racha'
    ],
    pros: [
      'Muy adictivo y divertido',
      'Gratuito con buenas funciones',
      'Excelente para principiantes'
    ],
    cons: [
      'Limitado para niveles avanzados',
      'Enfoque repetitivo',
      'Menos conversación real'
    ],
    best_for: [
      'Principiantes en idiomas',
      'Aprendizaje casual',
      'Estudiantes jóvenes'
    ],
    alternatives: ['Babbel', 'Rosetta Stone', 'Memrise']
  },
  {
    id: 'coursera-ai-63',
    name: 'Coursera AI Coach',
    category: 'AI Education & Learning',
    subcategory: 'Course Assistance',
    description: 'Coursera integra IA para personalizar rutas de aprendizaje y proporcionar recomendaciones de cursos.',
    pricing: 'Cursos gratis disponibles, Plus $59/mes',
    complexity: 'intermediate',
    difficulty_level: 3,
    learning_curve: 'gentle',
    community_size: 'massive',
    integration_options: ['University partnerships', 'Corporate learning'],
    tags: ['cursos', 'certificación', 'universidades', 'profesional'],
    logoPlaceholder: 'photo-1451187580459-43490279c0fa',
    website: 'https://coursera.org',
    apiAvailable: false,
    freeVersion: true,
    use_case_examples: [
      'Desarrollo profesional',
      'Certificaciones universitarias',
      'Upskilling técnico',
      'Cambio de carrera'
    ],
    comparison_matrix: {
      ease_of_use: 8,
      feature_richness: 9,
      pricing_value: 7,
      support_quality: 8,
      scalability: 10
    },
    similar_tools: ['udacity-64', 'edx-65'],
    founded_year: 2012,
    user_rating: 4.4,
    monthly_active_users: '10M+',
    key_features: [
      'Cursos universitarios',
      'Certificados profesionales',
      'Rutas de aprendizaje',
      'Proyectos prácticos'
    ],
    pros: [
      'Contenido de alta calidad',
      'Certificados reconocidos',
      'Flexibilidad de horarios'
    ],
    cons: [
      'Certificados de pago',
      'Puede ser caro',
      'Requiere autodisciplina'
    ],
    best_for: [
      'Profesionales',
      'Estudiantes universitarios',
      'Desarrollo de carrera'
    ],
    alternatives: ['Udacity', 'edX', 'Pluralsight']
  }
];
