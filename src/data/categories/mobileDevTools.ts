
import { EnhancedTool } from '../types';

export const mobileDevTools: EnhancedTool[] = [
  {
    id: 'react-native-40',
    name: 'React Native',
    category: 'Mobile Development',
    subcategory: 'Cross-platform',
    description: 'React Native es un framework de Facebook para crear aplicaciones móviles nativas usando React.',
    pricing: 'Gratuito y open source',
    complexity: 'advanced',
    difficulty_level: 7,
    learning_curve: 'steep',
    community_size: 'massive',
    integration_options: ['React', 'JavaScript', 'TypeScript', 'Native modules'],
    tags: ['cross-platform', 'JavaScript', 'nativo', 'Facebook'],
    logoPlaceholder: 'photo-1618401471353-b98afee0b2eb',
    website: 'https://reactnative.dev',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'Apps cross-platform',
      'MVPs rápidos',
      'Apps con UI nativa',
      'Startups móviles'
    ],
    comparison_matrix: {
      ease_of_use: 6,
      feature_richness: 9,
      pricing_value: 10,
      support_quality: 8,
      scalability: 9
    },
    similar_tools: ['flutter-41', 'xamarin-42'],
    founded_year: 2015,
    user_rating: 4.2,
    monthly_active_users: '500K+ developers',
    key_features: [
      'Hot reloading',
      'Native performance',
      'Code sharing',
      'Large ecosystem'
    ],
    pros: [
      'Desarrollo más rápido',
      'Performance nativo',
      'Gran comunidad'
    ],
    cons: [
      'Curva de aprendizaje',
      'Debugging complejo',
      'Platform-specific code'
    ],
    best_for: [
      'Desarrolladores React',
      'Apps cross-platform',
      'Equipos web'
    ],
    alternatives: ['Flutter', 'Xamarin', 'Ionic']
  },
  {
    id: 'flutter-41',
    name: 'Flutter',
    category: 'Mobile Development',
    subcategory: 'Cross-platform',
    description: 'Flutter es el framework de Google para crear aplicaciones nativas para móvil, web y desktop desde una sola base de código.',
    pricing: 'Gratuito y open source',
    complexity: 'advanced',
    difficulty_level: 7,
    learning_curve: 'steep',
    community_size: 'large',
    integration_options: ['Dart', 'Firebase', 'Native APIs', 'Platform channels'],
    tags: ['cross-platform', 'Dart', 'Google', 'performance'],
    logoPlaceholder: 'photo-1618401471353-b98afee0b2eb',
    website: 'https://flutter.dev',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'Apps multiplataforma',
      'Apps de alto rendimiento',
      'UI customizada',
      'Desktop apps'
    ],
    comparison_matrix: {
      ease_of_use: 6,
      feature_richness: 9,
      pricing_value: 10,
      support_quality: 8,
      scalability: 9
    },
    similar_tools: ['react-native-40', 'xamarin-42'],
    founded_year: 2017,
    user_rating: 4.4,
    monthly_active_users: '1M+ developers',
    key_features: [
      'Hot reload',
      'Widget system',
      'High performance',
      'Single codebase'
    ],
    pros: [
      'Excelente performance',
      'UI muy customizable',
      'Soporte multiplataforma'
    ],
    cons: [
      'Nuevo lenguaje (Dart)',
      'Tamaño de app mayor',
      'Ecosistema en crecimiento'
    ],
    best_for: [
      'Apps de alto rendimiento',
      'UI customizada',
      'Desarrollo multiplataforma'
    ],
    alternatives: ['React Native', 'Xamarin', 'Ionic']
  },
  {
    id: 'expo-42',
    name: 'Expo',
    category: 'Mobile Development',
    subcategory: 'Development Platform',
    description: 'Expo es una plataforma que simplifica el desarrollo de React Native con herramientas y servicios adicionales.',
    pricing: 'Gratis con límites, Pro $29/mes, Enterprise bajo consulta',
    complexity: 'intermediate',
    difficulty_level: 5,
    learning_curve: 'moderate',
    community_size: 'large',
    integration_options: ['React Native', 'EAS Build', 'Push notifications', 'OTA updates'],
    tags: ['React Native', 'simplificado', 'servicios', 'deployment'],
    logoPlaceholder: 'photo-1618401471353-b98afee0b2eb',
    website: 'https://expo.dev',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'Prototipado rápido',
      'Apps React Native',
      'Deployment simplificado',
      'Testing en dispositivos'
    ],
    comparison_matrix: {
      ease_of_use: 9,
      feature_richness: 7,
      pricing_value: 8,
      support_quality: 8,
      scalability: 7
    },
    similar_tools: ['react-native-40', 'ionic-43'],
    founded_year: 2015,
    user_rating: 4.3,
    monthly_active_users: '300K+ developers',
    key_features: [
      'Expo CLI',
      'EAS Build',
      'OTA updates',
      'Development client'
    ],
    pros: [
      'Muy fácil de empezar',
      'Servicios integrados',
      'Deployment simplificado'
    ],
    cons: [
      'Limitaciones vs React Native puro',
      'Vendor lock-in',
      'Tamaño de app mayor'
    ],
    best_for: [
      'Principiantes en móvil',
      'Prototipado rápido',
      'Equipos pequeños'
    ],
    alternatives: ['React Native CLI', 'Ionic', 'NativeScript']
  }
];
