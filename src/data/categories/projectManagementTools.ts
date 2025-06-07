
import { EnhancedTool } from '../types';

export const projectManagementTools: EnhancedTool[] = [
  {
    id: 'asana-34',
    name: 'Asana',
    category: 'Project Management',
    subcategory: 'Task Management',
    description: 'Asana es una herramienta de gestión de proyectos que ayuda a equipos a organizar, seguir y gestionar su trabajo.',
    pricing: 'Basic gratis, Premium $10.99/mes, Business $24.99/mes',
    complexity: 'intermediate',
    difficulty_level: 4,
    learning_curve: 'moderate',
    community_size: 'large',
    integration_options: ['Slack', 'Adobe Creative Cloud', 'Salesforce', 'Microsoft Teams'],
    tags: ['gestión proyectos', 'tareas', 'colaboración', 'timeline'],
    logoPlaceholder: 'photo-1611224923853-80b023f02d71',
    website: 'https://asana.com',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'Gestión de proyectos',
      'Seguimiento de tareas',
      'Colaboración en equipo',
      'Planificación de sprints'
    ],
    comparison_matrix: {
      ease_of_use: 8,
      feature_richness: 8,
      pricing_value: 8,
      support_quality: 8,
      scalability: 8
    },
    similar_tools: ['trello-35', 'monday-36'],
    founded_year: 2008,
    user_rating: 4.4,
    monthly_active_users: '130M+',
    key_features: [
      'Múltiples vistas de proyecto',
      'Custom fields',
      'Timeline (Gantt)',
      'Portfolios'
    ],
    pros: [
      'Muy versátil',
      'Excelente para equipos',
      'Buenas integraciones'
    ],
    cons: [
      'Puede ser complejo',
      'Curva de aprendizaje',
      'Precio para funciones avanzadas'
    ],
    best_for: [
      'Equipos medianos',
      'Gestión de proyectos complejos',
      'Marketing teams'
    ],
    alternatives: ['Trello', 'Monday.com', 'ClickUp']
  },
  {
    id: 'trello-35',
    name: 'Trello',
    category: 'Project Management',
    subcategory: 'Kanban Boards',
    description: 'Trello es una herramienta de gestión visual basada en tableros Kanban para organizar proyectos y tareas.',
    pricing: 'Gratis, Standard $5/mes, Premium $10/mes',
    complexity: 'beginner',
    difficulty_level: 2,
    learning_curve: 'immediate',
    community_size: 'massive',
    integration_options: ['Slack', 'Google Drive', 'Dropbox', 'Calendar apps'],
    tags: ['kanban', 'visual', 'simple', 'colaboración'],
    logoPlaceholder: 'photo-1611224923853-80b023f02d71',
    website: 'https://trello.com',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'Gestión personal',
      'Proyectos simples',
      'Planificación de contenido',
      'Workflow visual'
    ],
    comparison_matrix: {
      ease_of_use: 10,
      feature_richness: 6,
      pricing_value: 9,
      support_quality: 7,
      scalability: 6
    },
    similar_tools: ['asana-34', 'notion-76'],
    founded_year: 2011,
    user_rating: 4.3,
    monthly_active_users: '50M+',
    key_features: [
      'Tableros Kanban',
      'Power-Ups',
      'Templates',
      'Team collaboration'
    ],
    pros: [
      'Extremadamente fácil',
      'Interfaz visual clara',
      'Excelente para principiantes'
    ],
    cons: [
      'Limitado para proyectos complejos',
      'Faltan funciones avanzadas',
      'No tiene timeline nativo'
    ],
    best_for: [
      'Pequeños equipos',
      'Gestión personal',
      'Proyectos simples'
    ],
    alternatives: ['Asana', 'Notion', 'ClickUp']
  },
  {
    id: 'monday-36',
    name: 'Monday.com',
    category: 'Project Management',
    subcategory: 'Work OS',
    description: 'Monday.com es un sistema operativo de trabajo que permite a equipos crear workflows personalizados.',
    pricing: 'Basic $8/mes, Standard $10/mes, Pro $16/mes',
    complexity: 'intermediate',
    difficulty_level: 5,
    learning_curve: 'moderate',
    community_size: 'large',
    integration_options: ['Slack', 'Microsoft', 'Google Workspace', 'Salesforce'],
    tags: ['workflows', 'personalizable', 'visual', 'automatización'],
    logoPlaceholder: 'photo-1611224923853-80b023f02d71',
    website: 'https://monday.com',
    apiAvailable: true,
    freeVersion: false,
    use_case_examples: [
      'CRM personalizado',
      'Gestión de proyectos',
      'HR workflows',
      'Marketing campaigns'
    ],
    comparison_matrix: {
      ease_of_use: 7,
      feature_richness: 9,
      pricing_value: 7,
      support_quality: 8,
      scalability: 9
    },
    similar_tools: ['asana-34', 'clickup-80'],
    founded_year: 2012,
    user_rating: 4.2,
    monthly_active_users: '180K+',
    key_features: [
      'Workflows personalizables',
      'Automatizaciones',
      'Dashboards visuales',
      'Time tracking'
    ],
    pros: [
      'Muy personalizable',
      'Interfaz colorida y atractiva',
      'Potentes automatizaciones'
    ],
    cons: [
      'Puede ser abrumador',
      'Precio relativamente alto',
      'Curva de aprendizaje'
    ],
    best_for: [
      'Equipos que necesitan personalización',
      'Empresas medianas',
      'Workflows complejos'
    ],
    alternatives: ['Asana', 'ClickUp', 'Smartsheet']
  }
];
