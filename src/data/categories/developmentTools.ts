
import { EnhancedTool } from '../types';

export const developmentToolsTools: EnhancedTool[] = [
  {
    id: 'github-copilot-22',
    name: 'GitHub Copilot',
    category: 'Development Tools',
    subcategory: 'AI Code Assistant',
    description: 'GitHub Copilot es un asistente de programación con IA que sugiere código en tiempo real.',
    pricing: 'Individual $10/mes, Business $19/usuario/mes',
    complexity: 'intermediate',
    difficulty_level: 4,
    learning_curve: 'gentle',
    community_size: 'massive',
    integration_options: ['VS Code', 'JetBrains IDEs', 'Neovim', 'GitHub'],
    tags: ['IA', 'autocompletado', 'programación', 'GitHub'],
    logoPlaceholder: 'photo-1617042375876-a13e36732a04',
    website: 'https://github.com/features/copilot',
    apiAvailable: true,
    freeVersion: false,
    use_case_examples: [
      'Autocompletado de código',
      'Generación de funciones',
      'Comentarios a código',
      'Tests automáticos'
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
      'Chat de código'
    ],
    pros: [
      'Muy preciso',
      'Integración perfecta',
      'Soporte múltiples lenguajes'
    ],
    cons: [
      'Requiere suscripción',
      'Preocupaciones de licencia',
      'Dependiente de conexión'
    ],
    best_for: [
      'Desarrolladores profesionales',
      'Equipos de desarrollo',
      'Proyectos complejos'
    ],
    alternatives: ['TabNine', 'Codeium', 'Amazon CodeWhisperer']
  },
  {
    id: 'vercel-23',
    name: 'Vercel',
    category: 'Development Tools',
    subcategory: 'Deployment',
    description: 'Vercel es una plataforma de deployment que optimiza aplicaciones web con edge computing.',
    pricing: 'Hobby gratis, Pro $20/mes, Enterprise personalizado',
    complexity: 'intermediate',
    difficulty_level: 3,
    learning_curve: 'gentle',
    community_size: 'large',
    integration_options: ['GitHub', 'GitLab', 'Bitbucket', 'Next.js'],
    tags: ['deployment', 'edge computing', 'Next.js', 'performance'],
    logoPlaceholder: 'photo-1617042375876-a13e36732a04',
    website: 'https://vercel.com',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'Deploy de React apps',
      'Static sites',
      'Serverless functions',
      'Edge computing'
    ],
    comparison_matrix: {
      ease_of_use: 9,
      feature_richness: 8,
      pricing_value: 8,
      support_quality: 8,
      scalability: 9
    },
    similar_tools: ['netlify-24', 'railway-25'],
    founded_year: 2015,
    user_rating: 4.6,
    monthly_active_users: '500K+',
    key_features: [
      'Deploy automático',
      'Edge functions',
      'Analytics integrado',
      'Preview deployments'
    ],
    pros: [
      'Muy rápido',
      'Excelente DX',
      'Edge computing'
    ],
    cons: [
      'Precio escala rápido',
      'Optimizado para Next.js',
      'Vendor lock-in'
    ],
    best_for: [
      'Frontend developers',
      'Next.js projects',
      'JAMstack sites'
    ],
    alternatives: ['Netlify', 'Railway', 'Heroku']
  },
  {
    id: 'docker-24',
    name: 'Docker',
    category: 'Development Tools',
    subcategory: 'Containerization',
    description: 'Docker permite containerizar aplicaciones para un deployment consistente en cualquier entorno.',
    pricing: 'Personal gratis, Pro $5/mes, Team $7/usuario/mes',
    complexity: 'advanced',
    difficulty_level: 7,
    learning_curve: 'steep',
    community_size: 'massive',
    integration_options: ['Kubernetes', 'CI/CD pipelines', 'Cloud providers'],
    tags: ['containers', 'DevOps', 'deployment', 'infraestructura'],
    logoPlaceholder: 'photo-1617042375876-a13e36732a04',
    website: 'https://docker.com',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'Containerización de apps',
      'Microservicios',
      'CI/CD pipelines',
      'Development environments'
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
    user_rating: 4.4,
    monthly_active_users: '13M+',
    key_features: [
      'Containerización',
      'Image registry',
      'Orchestration',
      'Multi-platform'
    ],
    pros: [
      'Estándar de la industria',
      'Portable',
      'Ecosistema maduro'
    ],
    cons: [
      'Curva de aprendizaje alta',
      'Overhead de recursos',
      'Complejidad para simples apps'
    ],
    best_for: [
      'DevOps engineers',
      'Microservicios',
      'Enterprise applications'
    ],
    alternatives: ['Kubernetes', 'Podman', 'LXC']
  },
  {
    id: 'vscode-25',
    name: 'Visual Studio Code',
    category: 'Development Tools',
    subcategory: 'Code Editor',
    description: 'VS Code es un editor de código gratuito y extensible desarrollado por Microsoft.',
    pricing: 'Completamente gratuito',
    complexity: 'beginner',
    difficulty_level: 2,
    learning_curve: 'gentle',
    community_size: 'massive',
    integration_options: ['Git', 'Extensions marketplace', 'Debuggers', 'Terminals'],
    tags: ['editor', 'gratuito', 'extensible', 'Microsoft'],
    logoPlaceholder: 'photo-1617042375876-a13e36732a04',
    website: 'https://code.visualstudio.com',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'Desarrollo web',
      'Python programming',
      'Mobile development',
      'Data science'
    ],
    comparison_matrix: {
      ease_of_use: 9,
      feature_richness: 9,
      pricing_value: 10,
      support_quality: 9,
      scalability: 9
    },
    similar_tools: ['jetbrains-ides-26', 'sublime-text-27'],
    founded_year: 2015,
    user_rating: 4.8,
    monthly_active_users: '15M+',
    key_features: [
      'IntelliSense',
      'Debugging integrado',
      'Git integration',
      'Extensions marketplace'
    ],
    pros: [
      'Completamente gratis',
      'Muy extensible',
      'Excelente performance'
    ],
    cons: [
      'Puede ser lento con proyectos grandes',
      'Muchas extensiones necesarias',
      'Consumo de memoria'
    ],
    best_for: [
      'Todos los desarrolladores',
      'Proyectos web',
      'Principiantes'
    ],
    alternatives: ['JetBrains IDEs', 'Sublime Text', 'Atom']
  },
  {
    id: 'postman-26',
    name: 'Postman',
    category: 'Development Tools',
    subcategory: 'API Development',
    description: 'Postman es una plataforma colaborativa para el desarrollo y testing de APIs.',
    pricing: 'Gratis con límites, Basic $12/mes, Professional $29/mes',
    complexity: 'intermediate',
    difficulty_level: 4,
    learning_curve: 'moderate',
    community_size: 'large',
    integration_options: ['CI/CD pipelines', 'Newman', 'Swagger', 'GitHub'],
    tags: ['API', 'testing', 'documentación', 'colaboración'],
    logoPlaceholder: 'photo-1617042375876-a13e36732a04',
    website: 'https://postman.com',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'API testing',
      'Documentación de APIs',
      'Mock servers',
      'Monitoring de APIs'
    ],
    comparison_matrix: {
      ease_of_use: 8,
      feature_richness: 9,
      pricing_value: 8,
      support_quality: 8,
      scalability: 8
    },
    similar_tools: ['insomnia-27', 'thunder-client-28'],
    founded_year: 2012,
    user_rating: 4.5,
    monthly_active_users: '20M+',
    key_features: [
      'Request builder',
      'Automated testing',
      'API documentation',
      'Team collaboration'
    ],
    pros: [
      'Muy completo',
      'Excelente para equipos',
      'Documentación automática'
    ],
    cons: [
      'Puede ser complejo',
      'Límites en plan gratuito',
      'Interface a veces lenta'
    ],
    best_for: [
      'API developers',
      'QA engineers',
      'Backend teams'
    ],
    alternatives: ['Insomnia', 'Thunder Client', 'curl']
  }
];
