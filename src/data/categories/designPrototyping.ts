
import { EnhancedTool } from '../types';

export const designPrototypingTools: EnhancedTool[] = [
  {
    id: 'figma-19',
    name: 'Figma',
    category: 'Design & Prototyping',
    subcategory: 'UI/UX Design',
    description: 'Figma es una herramienta de diseño colaborativo basada en la web para UI/UX, prototipado y design systems.',
    pricing: 'Gratis para 3 proyectos, Professional $12/mes',
    complexity: 'intermediate',
    difficulty_level: 4,
    learning_curve: 'moderate',
    community_size: 'massive',
    integration_options: ['Slack', 'Jira', 'Zeplin', 'Adobe Creative Suite'],
    tags: ['UI/UX', 'colaborativo', 'prototipado', 'design systems'],
    logoPlaceholder: 'photo-1558655146-d09347e92766',
    website: 'https://figma.com',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'Diseño de interfaces',
      'Prototipado interactivo',
      'Design systems',
      'Colaboración de diseño'
    ],
    comparison_matrix: {
      ease_of_use: 8,
      feature_richness: 9,
      pricing_value: 9,
      support_quality: 8,
      scalability: 9
    },
    similar_tools: ['sketch-20', 'adobe-xd-21'],
    founded_year: 2012,
    user_rating: 4.7,
    monthly_active_users: '4M+',
    key_features: [
      'Colaboración en tiempo real',
      'Prototipado avanzado',
      'Auto-layout',
      'Componentes reutilizables'
    ],
    pros: [
      'Excelente colaboración',
      'Basado en web',
      'Comunidad activa'
    ],
    cons: [
      'Requiere internet',
      'Curva de aprendizaje',
      'Limitaciones offline'
    ],
    best_for: [
      'Equipos de diseño',
      'Diseñadores UI/UX',
      'Startups'
    ],
    alternatives: ['Sketch', 'Adobe XD', 'Framer']
  },
  {
    id: 'sketch-20',
    name: 'Sketch',
    category: 'Design & Prototyping',
    subcategory: 'UI Design',
    description: 'Sketch es una herramienta de diseño digital especializada en diseño de interfaces para Mac.',
    pricing: '$9/mes por editor',
    complexity: 'intermediate',
    difficulty_level: 5,
    learning_curve: 'moderate',
    community_size: 'large',
    integration_options: ['InVision', 'Zeplin', 'Abstract', 'Principle'],
    tags: ['Mac', 'UI design', 'símbolos', 'plugins'],
    logoPlaceholder: 'photo-1611224923853-80b023f02d71',
    website: 'https://sketch.com',
    apiAvailable: true,
    freeVersion: false,
    use_case_examples: [
      'Diseño de apps móviles',
      'Interfaces web',
      'Iconografía',
      'Design systems'
    ],
    comparison_matrix: {
      ease_of_use: 8,
      feature_richness: 8,
      pricing_value: 7,
      support_quality: 8,
      scalability: 8
    },
    similar_tools: ['figma-19', 'adobe-xd-21'],
    founded_year: 2010,
    user_rating: 4.4,
    monthly_active_users: '1M+',
    key_features: [
      'Símbolos reutilizables',
      'Plugins extensivos',
      'Prototyping básico',
      'Colaboración cloud'
    ],
    pros: [
      'Especializado en UI',
      'Ecosistema de plugins',
      'Rendimiento estable'
    ],
    cons: [
      'Solo disponible en Mac',
      'Colaboración limitada',
      'Precio por suscripción'
    ],
    best_for: [
      'Diseñadores de UI',
      'Usuarios de Mac',
      'Diseño de apps'
    ],
    alternatives: ['Figma', 'Adobe XD', 'Framer']
  },
  {
    id: 'framer-21',
    name: 'Framer',
    category: 'Design & Prototyping',
    subcategory: 'Interactive Prototyping',
    description: 'Framer es una herramienta de prototipado que permite crear prototipos interactivos y sitios web con código.',
    pricing: 'Gratis para 3 proyectos, Pro $20/mes',
    complexity: 'advanced',
    difficulty_level: 6,
    learning_curve: 'steep',
    community_size: 'medium',
    integration_options: ['Figma', 'Sketch', 'GitHub', 'Slack'],
    tags: ['prototipado', 'código', 'interactivo', 'animaciones'],
    logoPlaceholder: 'photo-1558655146-d09347e92766',
    website: 'https://framer.com',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'Prototipos de alta fidelidad',
      'Landing pages',
      'Animaciones complejas',
      'User testing'
    ],
    comparison_matrix: {
      ease_of_use: 6,
      feature_richness: 9,
      pricing_value: 8,
      support_quality: 7,
      scalability: 8
    },
    similar_tools: ['figma-19', 'principle-22'],
    founded_year: 2014,
    user_rating: 4.5,
    monthly_active_users: '300K+',
    key_features: [
      'Prototipos con código',
      'Animaciones avanzadas',
      'Componentes React',
      'Sitios web publicables'
    ],
    pros: [
      'Prototipos muy realistas',
      'Potente para animaciones',
      'Integración con código'
    ],
    cons: [
      'Curva de aprendizaje alta',
      'Requiere conocimiento técnico',
      'Precio elevado'
    ],
    best_for: [
      'Diseñadores avanzados',
      'Prototipos complejos',
      'Equipos técnicos'
    ],
    alternatives: ['Figma', 'Principle', 'InVision']
  }
];
