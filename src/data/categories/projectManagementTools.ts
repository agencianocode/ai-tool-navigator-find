
import { EnhancedTool } from '../types';

export const projectManagementTools: EnhancedTool[] = [
  {
    id: 'asana-34',
    name: 'Asana',
    category: 'Project Management',
    subcategory: 'Task Management',
    description: 'Asana es una herramienta para gestionar tareas y proyectos, facilitando la colaboración y seguimiento del trabajo.',
    pricing: 'Gratis con límites, $10.99/mes Premium',
    complexity: 'beginner',
    difficulty_level: 3,
    learning_curve: 'gentle',
    community_size: 'large',
    integration_options: ['Slack', 'Google Drive', 'Zapier'],
    tags: ['gestión de proyectos', 'tareas', 'colaboración', 'productividad'],
    logoPlaceholder: 'photo-1504384308090-c894fdcc538d',
    website: 'https://asana.com',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'Gestión de tareas',
      'Planificación de proyectos',
      'Seguimiento de progreso',
      'Colaboración en equipo'
    ],
    comparison_matrix: {
      ease_of_use: 8,
      feature_richness: 8,
      pricing_value: 7,
      support_quality: 7,
      scalability: 8
    },
    similar_tools: ['trello-35', 'monday-36'],
    founded_year: 2008,
    user_rating: 4.2,
    monthly_active_users: '1.5M+',
    key_features: [
      'Listas y tableros',
      'Cronogramas',
      'Automatizaciones',
      'Reportes'
    ],
    pros: [
      'Interfaz intuitiva',
      'Flexibilidad',
      'Integraciones útiles'
    ],
    cons: [
      'Limitaciones en plan gratuito',
      'Curva de aprendizaje para funciones avanzadas',
      'Puede ser costoso'
    ],
    best_for: [
      'Equipos pequeños y medianos',
      'Gestión de proyectos',
      'Freelancers'
    ],
    alternatives: ['Trello', 'Monday.com', 'ClickUp']
  },
  {
    id: 'trello-35',
    name: 'Trello',
    category: 'Project Management',
    subcategory: 'Kanban Boards',
    description: 'Trello utiliza tableros Kanban para organizar proyectos y tareas de manera visual e intuitiva.',
    pricing: 'Gratis, Standard $5/mes, Premium $10/mes',
    complexity: 'beginner',
    difficulty_level: 2,
    learning_curve: 'immediate',
    community_size: 'large',
    integration_options: ['Power-Ups', 'Zapier', 'Google Drive', 'Slack'],
    tags: ['kanban', 'visual', 'simple', 'colaboración'],
    logoPlaceholder: 'photo-1611224923853-80b023f02d71',
    website: 'https://trello.com',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'Gestión de tareas personales',
      'Proyectos pequeños',
      'Planificación de contenido',
      'Seguimiento de bugs'
    ],
    comparison_matrix: {
      ease_of_use: 10,
      feature_richness: 6,
      pricing_value: 9,
      support_quality: 7,
      scalability: 6
    },
    similar_tools: ['asana-34', 'notion-36'],
    founded_year: 2011,
    user_rating: 4.4,
    monthly_active_users: '50M+',
    key_features: [
      'Tableros Kanban',
      'Tarjetas personalizables',
      'Power-Ups',
      'Colaboración simple'
    ],
    pros: [
      'Extremadamente fácil de usar',
      'Interfaz visual clara',
      'Gratuito para equipos pequeños'
    ],
    cons: [
      'Limitado para proyectos complejos',
      'Pocas funciones avanzadas',
      'Power-Ups pueden ser costosos'
    ],
    best_for: [
      'Equipos pequeños',
      'Gestión personal',
      'Proyectos simples'
    ],
    alternatives: ['Asana', 'Notion', 'Monday.com']
  },
  {
    id: 'monday-36',
    name: 'Monday.com',
    category: 'Project Management',
    subcategory: 'Work OS',
    description: 'Monday.com es una plataforma de gestión de trabajo que combina proyectos, CRM y automatizaciones.',
    pricing: 'Basic $8/mes, Standard $10/mes, Pro $16/mes',
    complexity: 'intermediate',
    difficulty_level: 4,
    learning_curve: 'moderate',
    community_size: 'large',
    integration_options: ['Zapier', 'Slack', 'Google Workspace', 'Microsoft'],
    tags: ['work OS', 'automatización', 'CRM', 'dashboards'],
    logoPlaceholder: 'photo-1563013544-824ae1b704d3',
    website: 'https://monday.com',
    apiAvailable: true,
    freeVersion: false,
    use_case_examples: [
      'Gestión de proyectos',
      'CRM y ventas',
      'Operaciones',
      'Marketing campaigns'
    ],
    comparison_matrix: {
      ease_of_use: 7,
      feature_richness: 9,
      pricing_value: 6,
      support_quality: 8,
      scalability: 9
    },
    similar_tools: ['asana-34', 'clickup-37'],
    founded_year: 2012,
    user_rating: 4.6,
    monthly_active_users: '180K+',
    key_features: [
      'Tableros personalizables',
      'Automatizaciones',
      'Dashboards',
      'Integraciones múltiples'
    ],
    pros: [
      'Muy visual y personalizable',
      'Potentes automatizaciones',
      'Excelente para equipos grandes'
    ],
    cons: [
      'Precio elevado',
      'Puede ser complejo inicialmente',
      'No hay plan gratuito'
    ],
    best_for: [
      'Empresas medianas y grandes',
      'Equipos multifuncionales',
      'Procesos complejos'
    ],
    alternatives: ['Asana', 'ClickUp', 'Smartsheet']
  }
];
