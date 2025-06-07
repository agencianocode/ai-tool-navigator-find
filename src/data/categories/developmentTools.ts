
import { EnhancedTool } from '../types';

export const developmentToolsTools: EnhancedTool[] = [
  {
    id: 'github-copilot-22',
    name: 'GitHub Copilot',
    category: 'Development Tools',
    subcategory: 'AI Code Assistant',
    description: 'GitHub Copilot es un asistente de código con IA que sugiere líneas completas y funciones mientras programas.',
    pricing: '$10/mes individual, $19/mes business',
    complexity: 'intermediate',
    difficulty_level: 3,
    learning_curve: 'gentle',
    community_size: 'massive',
    integration_options: ['VS Code', 'JetBrains IDEs', 'Neovim', 'Visual Studio'],
    tags: ['IA', 'autocompletado', 'productividad', 'GitHub'],
    logoPlaceholder: 'photo-1618401471353-b98afee0b2eb',
    website: 'https://github.com/features/copilot',
    apiAvailable: true,
    freeVersion: false,
    use_case_examples: [
      'Autocompletado de código',
      'Generación de funciones',
      'Documentación automática',
      'Refactoring asistido'
    ],
    comparison_matrix: {
      ease_of_use: 9,
      feature_richness: 8,
      pricing_value: 8,
      support_quality: 8,
      scalability: 9
    },
    similar_tools: ['tabnine-23', 'codeium-24'],
    founded_year: 2021,
    user_rating: 4.5,
    monthly_active_users: '1M+',
    key_features: [
      'Sugerencias contextuales',
      'Múltiples lenguajes',
      'Integración IDE',
      'Chat para explicaciones'
    ],
    pros: [
      'Muy preciso y útil',
      'Acelera desarrollo',
      'Integración perfecta'
    ],
    cons: [
      'Requiere suscripción',
      'Puede generar código incorrecto',
      'Dependencia de IA'
    ],
    best_for: [
      'Desarrolladores profesionales',
      'Equipos de desarrollo',
      'Programación diaria'
    ],
    alternatives: ['TabNine', 'Codeium', 'Amazon CodeWhisperer']
  },
  {
    id: 'vscode-23',
    name: 'Visual Studio Code',
    category: 'Development Tools',
    subcategory: 'Code Editor',
    description: 'VS Code es un editor de código fuente ligero pero potente con soporte para múltiples lenguajes y extensiones.',
    pricing: 'Gratuito y open source',
    complexity: 'beginner',
    difficulty_level: 3,
    learning_curve: 'gentle',
    community_size: 'massive',
    integration_options: ['GitHub', 'Azure', 'Docker', 'Miles de extensiones'],
    tags: ['editor', 'open source', 'extensiones', 'Microsoft'],
    logoPlaceholder: 'photo-1618401471353-b98afee0b2eb',
    website: 'https://code.visualstudio.com',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'Desarrollo web',
      'Programación Python',
      'Desarrollo móvil',
      'Scripts y automatización'
    ],
    comparison_matrix: {
      ease_of_use: 9,
      feature_richness: 9,
      pricing_value: 10,
      support_quality: 9,
      scalability: 9
    },
    similar_tools: ['sublime-text-24', 'atom-25'],
    founded_year: 2015,
    user_rating: 4.8,
    monthly_active_users: '15M+',
    key_features: [
      'IntelliSense',
      'Debugging integrado',
      'Control de versiones',
      'Terminal integrado'
    ],
    pros: [
      'Completamente gratuito',
      'Muy extensible',
      'Excelente rendimiento'
    ],
    cons: [
      'Puede consumir RAM',
      'Muchas extensiones pueden ralentizar',
      'Configuración inicial compleja'
    ],
    best_for: [
      'Todos los desarrolladores',
      'Principiantes',
      'Proyectos de cualquier tamaño'
    ],
    alternatives: ['Sublime Text', 'Atom', 'WebStorm']
  },
  {
    id: 'docker-24',
    name: 'Docker',
    category: 'Development Tools',
    subcategory: 'Containerization',
    description: 'Docker es una plataforma que utiliza contenedores para empaquetar aplicaciones y sus dependencias.',
    pricing: 'Docker Desktop gratis para uso personal, Pro $5/mes',
    complexity: 'advanced',
    difficulty_level: 7,
    learning_curve: 'steep',
    community_size: 'massive',
    integration_options: ['Kubernetes', 'CI/CD pipelines', 'Cloud platforms'],
    tags: ['contenedores', 'DevOps', 'microservicios', 'deployment'],
    logoPlaceholder: 'photo-1618401471353-b98afee0b2eb',
    website: 'https://docker.com',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'Desarrollo local consistente',
      'Microservicios',
      'CI/CD pipelines',
      'Deployment en cloud'
    ],
    comparison_matrix: {
      ease_of_use: 5,
      feature_richness: 10,
      pricing_value: 9,
      support_quality: 8,
      scalability: 10
    },
    similar_tools: ['kubernetes-25', 'podman-26'],
    founded_year: 2013,
    user_rating: 4.6,
    monthly_active_users: '20M+',
    key_features: [
      'Contenedores ligeros',
      'Docker Compose',
      'Registry integrado',
      'Multi-platform'
    ],
    pros: [
      'Estándar de la industria',
      'Portable y consistente',
      'Gran ecosistema'
    ],
    cons: [
      'Curva de aprendizaje empinada',
      'Puede ser complejo',
      'Overhead en algunos casos'
    ],
    best_for: [
      'DevOps engineers',
      'Desarrollo de microservicios',
      'Equipos medianos/grandes'
    ],
    alternatives: ['Kubernetes', 'Podman', 'LXC']
  }
];
