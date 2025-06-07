
import { EnhancedTool } from '../types';

export const mobileDevTools: EnhancedTool[] = [
  {
    id: 'react-native-40',
    name: 'React Native',
    category: 'Mobile Development',
    subcategory: 'Cross-platform',
    description: 'React Native permite desarrollar aplicaciones móviles nativas usando JavaScript y React.',
    pricing: 'Gratis',
    complexity: 'advanced',
    difficulty_level: 7,
    learning_curve: 'steep',
    community_size: 'massive',
    integration_options: ['Expo', 'Firebase', 'Redux'],
    tags: ['mobile', 'desarrollo', 'cross-platform', 'javascript'],
    logoPlaceholder: 'photo-1504384308090-c894fdcc538d',
    website: 'https://reactnative.dev',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'Apps móviles iOS y Android',
      'Prototipos rápidos',
      'Aplicaciones multiplataforma',
      'Integración con APIs nativas'
    ],
    comparison_matrix: {
      ease_of_use: 5,
      feature_richness: 9,
      pricing_value: 10,
      support_quality: 8,
      scalability: 9
    },
    similar_tools: ['flutter-41', 'xamarin-42'],
    founded_year: 2015,
    user_rating: 4.3,
    monthly_active_users: '1M+',
    key_features: [
      'Componentes nativos',
      'Hot reload',
      'Gran comunidad',
      'Integración con librerías JS'
    ],
    pros: [
      'Código compartido entre plataformas',
      'Amplia comunidad',
      'Acceso a APIs nativas'
    ],
    cons: [
      'Curva de aprendizaje',
      'Problemas de rendimiento en apps complejas',
      'Dependencia de librerías externas'
    ],
    best_for: [
      'Desarrolladores móviles',
      'Startups',
      'Proyectos multiplataforma'
    ],
    alternatives: ['Flutter', 'Xamarin', 'NativeScript']
  },
  {
    id: 'flutter-41',
    name: 'Flutter',
    category: 'Mobile Development',
    subcategory: 'Cross-platform',
    description: 'Flutter es el framework de Google para crear aplicaciones nativas para móvil, web y desktop.',
    pricing: 'Gratis',
    complexity: 'intermediate',
    difficulty_level: 6,
    learning_curve: 'moderate',
    community_size: 'large',
    integration_options: ['Firebase', 'Platform channels', 'Pub packages'],
    tags: ['mobile', 'Dart', 'Google', 'multiplataforma'],
    logoPlaceholder: 'photo-1553484771-371a605b060b',
    website: 'https://flutter.dev',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'Apps móviles nativas',
      'Aplicaciones web',
      'Apps de desktop',
      'Prototipos rápidos'
    ],
    comparison_matrix: {
      ease_of_use: 7,
      feature_richness: 9,
      pricing_value: 10,
      support_quality: 9,
      scalability: 9
    },
    similar_tools: ['react-native-40', 'ionic-42'],
    founded_year: 2017,
    user_rating: 4.5,
    monthly_active_users: '500K+',
    key_features: [
      'Rendimiento nativo',
      'Hot reload',
      'Widget rico',
      'Soporte multiplataforma'
    ],
    pros: [
      'Excelente rendimiento',
      'Una sola codebase',
      'Soporte oficial de Google'
    ],
    cons: [
      'Lenguaje Dart menos popular',
      'Aplicaciones pueden ser grandes',
      'Ecosistema más pequeño'
    ],
    best_for: [
      'Nuevos proyectos móviles',
      'Equipos que buscan rendimiento',
      'Desarrolladores que aprenden Dart'
    ],
    alternatives: ['React Native', 'Ionic', 'Xamarin']
  },
  {
    id: 'expo-42',
    name: 'Expo',
    category: 'Mobile Development',
    subcategory: 'Development Platform',
    description: 'Expo es una plataforma que simplifica el desarrollo de apps React Native con herramientas y servicios.',
    pricing: 'Gratis, Production $99/mes',
    complexity: 'intermediate',
    difficulty_level: 4,
    learning_curve: 'gentle',
    community_size: 'large',
    integration_options: ['React Native', 'EAS Build', 'Over-the-air updates'],
    tags: ['React Native', 'desarrollo', 'herramientas', 'deployment'],
    logoPlaceholder: 'photo-1581291518857-4e27b48ff24e',
    website: 'https://expo.dev',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'Prototipado rápido',
      'Apps React Native',
      'Desarrollo sin Xcode/Android Studio',
      'Actualizaciones OTA'
    ],
    comparison_matrix: {
      ease_of_use: 9,
      feature_richness: 7,
      pricing_value: 8,
      support_quality: 8,
      scalability: 7
    },
    similar_tools: ['react-native-cli-43', 'ionic-44'],
    founded_year: 2015,
    user_rating: 4.2,
    monthly_active_users: '200K+',
    key_features: [
      'Desarrollo sin configuración',
      'Expo Go app para testing',
      'EAS Build y Submit',
      'Over-the-air updates'
    ],
    pros: [
      'Configuración cero',
      'Excelente para prototipado',
      'Actualizaciones OTA'
    ],
    cons: [
      'Limitaciones en módulos nativos',
      'Tamaño de app mayor',
      'Dependencia del ecosistema Expo'
    ],
    best_for: [
      'Desarrolladores principiantes',
      'Prototipado rápido',
      'Apps simples a medianas'
    ],
    alternatives: ['React Native CLI', 'Ionic', 'Cordova']
  }
];
