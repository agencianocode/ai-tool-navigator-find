
import { EnhancedTool } from '../types';

export const developmentToolsTools: EnhancedTool[] = [
  {
    id: 'github-copilot-19',
    name: 'GitHub Copilot',
    category: 'Development Tools',
    subcategory: 'AI Code Assistant',
    description: 'GitHub Copilot es un asistente de programación con IA que sugiere código y funciones completas en tiempo real.',
    pricing: '$10/mes Individual, $19/mes Business',
    complexity: 'intermediate',
    difficulty_level: 3,
    learning_curve: 'gentle',
    community_size: 'massive',
    integration_options: ['VS Code', 'JetBrains IDEs', 'Neovim', 'GitHub'],
    tags: ['programación', 'IA', 'autocompletado', 'productividad'],
    logoPlaceholder: 'photo-1629904853893-c2c8981a1dc5',
    website: 'https://github.com/features/copilot',
    apiAvailable: true,
    freeVersion: false,
    use_case_examples: [
      'Autocompletado de código',
      'Generación de funciones',
      'Escritura de tests',
      'Documentación de código'
    ],
    comparison_matrix: {
      ease_of_use: 9,
      feature_richness: 8,
      pricing_value: 8,
      support_quality: 9,
      scalability: 9
    },
    similar_tools: ['codewhisperer-20', 'tabnine-21'],
    founded_year: 2021,
    user_rating: 4.5,
    monthly_active_users: '1M+',
    key_features: [
      'Sugerencias de código inteligentes',
      'Soporte para múltiples lenguajes',
      'Integración con IDEs populares',
      'Aprendizaje contextual'
    ],
    pros: [
      'Muy preciso',
      'Aumenta productividad',
      'Integración perfecta con GitHub'
    ],
    cons: [
      'Requiere suscripción',
      'Dependiente de conexión',
      'Puede generar código incorrecto'
    ],
    best_for: [
      'Desarrolladores profesionales',
      'Equipos de desarrollo',
      'Estudiantes de programación'
    ],
    alternatives: ['Amazon CodeWhisperer', 'Tabnine', 'Codeium']
  }
];
