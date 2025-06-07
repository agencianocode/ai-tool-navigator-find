import { EnhancedTool } from "./types";
export type { EnhancedTool } from "./types";

export const expandedToolsDatabase: EnhancedTool[] = [
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    category: 'AI Writing & Content',
    subcategory: 'Conversational AI',
    description: 'Modelo de lenguaje avanzado para generación de texto y conversación natural.',
    pricing: 'Gratis, Plus $20/mes',
    complexity: 'beginner',
    difficulty_level: 2,
    learning_curve: 'immediate',
    community_size: 'massive',
    integration_options: ['API', 'Plugins', 'Third-party apps'],
    tags: ['IA', 'conversación', 'texto', 'asistente'],
    logoPlaceholder: 'photo-1506744038136-46273834b3fb',
    website: 'https://chat.openai.com',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'Atención al cliente',
      'Generación de contenido',
      'Asistente personal',
      'Educación y tutoría'
    ],
    comparison_matrix: {
      ease_of_use: 9,
      feature_richness: 8,
      pricing_value: 9,
      support_quality: 7,
      scalability: 8
    },
    similar_tools: ['claude', 'bard', 'bing-chat'],
    founded_year: 2022,
    user_rating: 4.7,
    monthly_active_users: '100M+',
    key_features: [
      'Generación de texto natural',
      'Amplia base de conocimiento',
      'Integración con múltiples plataformas',
      'Actualizaciones frecuentes'
    ],
    pros: [
      'Muy fácil de usar',
      'Resultados coherentes',
      'Amplia comunidad',
      'API robusta'
    ],
    cons: [
      'Puede generar respuestas incorrectas',
      'Limitaciones en temas sensibles',
      'Dependencia de conexión'
    ],
    best_for: [
      'Empresas que necesitan chatbots',
      'Creadores de contenido',
      'Educadores',
      'Desarrolladores de apps'
    ],
    alternatives: ['Claude', 'Bard', 'Bing Chat']
  },
  {
    id: 'jasper',
    name: 'Jasper',
    category: 'AI Writing & Content',
    subcategory: 'Marketing Content',
    description: 'Plataforma de generación de contenido con IA para marketing y copywriting.',
    pricing: 'Starter $29/mes, Boss Mode $59/mes',
    complexity: 'intermediate',
    difficulty_level: 4,
    learning_curve: 'gentle',
    community_size: 'large',
    integration_options: ['API', 'Surfer SEO', 'Copyscape'],
    tags: ['marketing', 'copywriting', 'contenido', 'SEO'],
    logoPlaceholder: 'photo-1504384308090-c894fdcc538d',
    website: 'https://jasper.ai',
    apiAvailable: true,
    freeVersion: false,
    use_case_examples: [
      'Anuncios publicitarios',
      'Blogs optimizados',
      'Emails de marketing',
      'Descripciones de productos'
    ],
    comparison_matrix: {
      ease_of_use: 8,
      feature_richness: 9,
      pricing_value: 7,
      support_quality: 8,
      scalability: 7
    },
    similar_tools: ['copy-ai', 'writesonic', 'rytr'],
    founded_year: 2021,
    user_rating: 4.5,
    monthly_active_users: '50K+',
    key_features: [
      'Plantillas para marketing',
      'Integración SEO',
      'Generación rápida de contenido',
      'Soporte multilenguaje'
    ],
    pros: [
      'Contenido de alta calidad',
      'Fácil de usar',
      'Buena integración SEO',
      'Actualizaciones constantes'
    ],
    cons: [
      'Precio elevado',
      'Curva de aprendizaje',
      'No tiene plan gratuito'
    ],
    best_for: [
      'Marketers',
      'Agencias de publicidad',
      'Pequeñas empresas',
      'Creadores de contenido'
    ],
    alternatives: ['Copy.ai', 'Writesonic', 'Rytr']
  },
  {
    id: 'copy-ai',
    name: 'Copy.ai',
    category: 'AI Writing & Content',
    subcategory: 'Writing Assistant',
    description: 'Asistente de escritura con IA para generar ideas y textos creativos.',
    pricing: 'Gratis, Pro $35/mes',
    complexity: 'beginner',
    difficulty_level: 3,
    learning_curve: 'immediate',
    community_size: 'medium',
    integration_options: ['API', 'Chrome Extension'],
    tags: ['escritura', 'creatividad', 'marketing', 'contenido'],
    logoPlaceholder: 'photo-1515377905703-c4788e51af15',
    website: 'https://copy.ai',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'Ideas para posts',
      'Emails creativos',
      'Textos para anuncios',
      'Descripciones de productos'
    ],
    comparison_matrix: {
      ease_of_use: 9,
      feature_richness: 7,
      pricing_value: 8,
      support_quality: 7,
      scalability: 6
    },
    similar_tools: ['jasper', 'rytr', 'writesonic'],
    founded_year: 2020,
    user_rating: 4.3,
    monthly_active_users: '30K+',
    key_features: [
      'Generación rápida de ideas',
      'Plantillas variadas',
      'Interfaz intuitiva',
      'Soporte en varios idiomas'
    ],
    pros: [
      'Fácil de usar',
      'Plan gratuito disponible',
      'Buena calidad de texto',
      'Actualizaciones frecuentes'
    ],
    cons: [
      'Menos funciones avanzadas',
      'Calidad variable',
      'Comunidad pequeña'
    ],
    best_for: [
      'Freelancers',
      'Pequeñas empresas',
      'Creadores de contenido',
      'Marketing digital'
    ],
    alternatives: ['Jasper', 'Rytr', 'Writesonic']
  },
  {
    id: 'writesonic',
    name: 'Writesonic',
    category: 'AI Writing & Content',
    subcategory: 'Content Generator',
    description: 'Generador de contenido con IA para blogs, anuncios y más.',
    pricing: 'Gratis, Basic $15/mes, Professional $45/mes',
    complexity: 'intermediate',
    difficulty_level: 4,
    learning_curve: 'gentle',
    community_size: 'medium',
    integration_options: ['API', 'WordPress', 'Zapier'],
    tags: ['contenido', 'marketing', 'SEO', 'escritura'],
    logoPlaceholder: 'photo-1504384308090-c894fdcc538d',
    website: 'https://writesonic.com',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'Artículos de blog',
      'Anuncios publicitarios',
      'Descripciones de productos',
      'Emails de marketing'
    ],
    comparison_matrix: {
      ease_of_use: 8,
      feature_richness: 8,
      pricing_value: 7,
      support_quality: 7,
      scalability: 7
    },
    similar_tools: ['jasper', 'copy-ai', 'rytr'],
    founded_year: 2021,
    user_rating: 4.4,
    monthly_active_users: '40K+',
    key_features: [
      'Generación rápida',
      'Plantillas para marketing',
      'Integración con CMS',
      'Soporte multilenguaje'
    ],
    pros: [
      'Buena calidad de texto',
      'Interfaz amigable',
      'Plan gratuito',
      'Actualizaciones constantes'
    ],
    cons: [
      'Limitaciones en plan gratuito',
      'Curva de aprendizaje',
      'Algunas funciones avanzadas faltan'
    ],
    best_for: [
      'Marketers',
      'Pequeñas empresas',
      'Creadores de contenido',
      'Agencias'
    ],
    alternatives: ['Jasper', 'Copy.ai', 'Rytr']
  },
  {
    id: 'rytr',
    name: 'Rytr',
    category: 'AI Writing & Content',
    subcategory: 'Content Generator',
    description: 'Generador de contenido con IA para múltiples formatos y tonos de escritura.',
    pricing: 'Gratis hasta 10K caracteres, Unlimited $9/mes',
    complexity: 'beginner',
    difficulty_level: 2,
    learning_curve: 'immediate',
    community_size: 'medium',
    integration_options: ['API', 'Chrome Extension', 'WordPress'],
    tags: ['escritura', 'contenido', 'marketing', 'económico'],
    logoPlaceholder: 'photo-1516321318423-f06f85e504b3',
    website: 'https://rytr.me',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'Blogs posts rápidos',
      'Descripciones de productos',
      'Emails marketing',
      'Posts redes sociales'
    ],
    comparison_matrix: {
      ease_of_use: 9,
      feature_richness: 6,
      pricing_value: 10,
      support_quality: 7,
      scalability: 6
    },
    similar_tools: ['copy-ai', 'writesonic', 'anyword'],
    founded_year: 2021,
    user_rating: 4.0,
    monthly_active_users: '200K+',
    key_features: [
      '40+ casos de uso',
      '30+ idiomas',
      'Plugin de WordPress',
      'API para desarrolladores'
    ],
    pros: [
      'Muy económico',
      'Fácil de usar',
      'Buena relación calidad-precio',
      'Múltiples idiomas'
    ],
    cons: [
      'Menos funciones avanzadas',
      'Calidad variable',
      'Comunidad pequeña'
    ],
    best_for: [
      'Freelancers con presupuesto ajustado',
      'Pequeñas empresas',
      'Bloggers principiantes',
      'Contenido en múltiples idiomas'
    ],
    alternatives: ['Copy.ai', 'Writesonic', 'ContentBot']
  },
  {
    id: 'anyword',
    name: 'Anyword',
    category: 'AI Writing & Content',
    subcategory: 'Performance Marketing',
    description: 'Plataforma de copywriting predictivo que optimiza contenido para mejores conversiones.',
    pricing: 'Starter $39/mes, Data-Driven $79/mes',
    complexity: 'intermediate',
    difficulty_level: 5,
    learning_curve: 'moderate',
    community_size: 'medium',
    integration_options: ['Facebook Ads', 'Google Ads', 'Outbrain', 'API'],
    tags: ['copywriting', 'performance', 'conversiones', 'anuncios'],
    logoPlaceholder: 'photo-1551836022-deb4988cc6c0',
    website: 'https://anyword.com',
    apiAvailable: true,
    freeVersion: false,
    use_case_examples: [
      'Optimización de anuncios Facebook',
      'A/B testing de headlines',
      'Email subject lines',
      'Landing page copy'
    ],
    comparison_matrix: {
      ease_of_use: 7,
      feature_richness: 9,
      pricing_value: 7,
      support_quality: 8,
      scalability: 8
    },
    similar_tools: ['jasper', 'copy-ai', 'persado'],
    founded_year: 2013,
    user_rating: 4.3,
    monthly_active_users: '100K+',
    key_features: [
      'Predictive performance score',
      'Copy intelligence dashboard',
      'Brand voice customization',
      'Performance optimization'
    ],
    pros: [
      'Enfoque en performance',
      'Datos predictivos únicos',
      'Integraciones publicitarias',
      'ROI medible'
    ],
    cons: [
      'Precio elevado',
      'Curva de aprendizaje',
      'No tiene plan gratuito'
    ],
    best_for: [
      'Agencias de publicidad digital',
      'Equipos de growth marketing',
      'E-commerce con alto volumen',
      'Empresas data-driven'
    ],
    alternatives: ['Jasper', 'Persado', 'Phrasee']
  },
  {
    id: 'notion-ai',
    name: 'Notion AI',
    category: 'AI Writing & Content',
    subcategory: 'Productivity Writing',
    description: 'Asistente de escritura integrado en Notion para mejorar documentos y notas.',
    pricing: '$10/mes por miembro (adicional a Notion)',
    complexity: 'beginner',
    difficulty_level: 2,
    learning_curve: 'immediate',
    community_size: 'large',
    integration_options: ['Notion workspace', 'Templates', 'Databases'],
    tags: ['productividad', 'notas', 'documentos', 'colaboración'],
    logoPlaceholder: 'photo-1586281380614-a1d62c273cd5',
    website: 'https://notion.so',
    apiAvailable: false,
    freeVersion: false,
    use_case_examples: [
      'Mejorar documentos de trabajo',
      'Generar resúmenes de reuniones',
      'Crear contenido para wikis',
      'Traducir contenido'
    ],
    comparison_matrix: {
      ease_of_use: 9,
      feature_richness: 6,
      pricing_value: 8,
      support_quality: 8,
      scalability: 7
    },
    similar_tools: ['chatgpt', 'grammarly', 'writesonic'],
    founded_year: 2023,
    user_rating: 4.2,
    monthly_active_users: '20M+',
    key_features: [
      'Integración nativa con Notion',
      'Escritura colaborativa',
      'Mejora de documentos existentes',
      'Múltiples idiomas'
    ],
    pros: [
      'Perfecta integración con Notion',
      'Contexto del workspace',
      'Fácil de usar',
      'Colaboración en tiempo real'
    ],
    cons: [
      'Solo funciona en Notion',
      'Funciones limitadas vs. especialistas',
      'Requiere suscripción a Notion'
    ],
    best_for: [
      'Equipos que ya usan Notion',
      'Documentación interna',
      'Wikis corporativos',
      'Gestión de conocimiento'
    ],
    alternatives: ['ChatGPT', 'Claude', 'Grammarly']
  },
  {
    id: 'make',
    name: 'Make (Integromat)',
    category: 'No-Code Platforms',
    subcategory: 'Advanced Automation',
    description: 'Plataforma de automatización visual avanzada para workflows complejos entre aplicaciones.',
    pricing: 'Gratis hasta 1000 operaciones, Core $9/mes',
    complexity: 'advanced',
    difficulty_level: 7,
    learning_curve: 'steep',
    community_size: 'large',
    integration_options: ['1000+ apps', 'HTTP modules', 'Webhooks', 'Custom apps'],
    tags: ['automatización', 'workflows', 'visual', 'avanzado'],
    logoPlaceholder: 'photo-1558655146-d09347e92766',
    website: 'https://make.com',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'Workflows complejos multi-paso',
      'Automatización de procesos de negocio',
      'Integraciones custom entre sistemas',
      'Data pipelines automatizados'
    ],
    comparison_matrix: {
      ease_of_use: 6,
      feature_richness: 10,
      pricing_value: 8,
      support_quality: 8,
      scalability: 9
    },
    similar_tools: ['zapier', 'microsoft-power-automate', 'n8n'],
    founded_year: 2016,
    user_rating: 4.4,
    monthly_active_users: '500K+',
    key_features: [
      'Editor visual de workflows',
      'Conditional logic avanzada',
      'Error handling robusto',
      'Real-time execution monitoring'
    ],
    pros: [
      'Muy potente y flexible',
      'Workflows visuales intuitivos',
      'Manejo de errores avanzado',
      'Precio competitivo'
    ],
    cons: [
      'Curva de aprendizaje pronunciada',
      'Puede ser overwhelming para principiantes',
      'Configuración inicial compleja'
    ],
    best_for: [
      'Empresas con procesos complejos',
      'Equipos técnicos',
      'Automatización de operaciones',
      'Integraciones enterprise'
    ],
    alternatives: ['Zapier', 'Microsoft Power Automate', 'n8n']
  },
  {
    id: 'airtable',
    name: 'Airtable',
    category: 'No-Code Platforms',
    subcategory: 'Database & Workflows',
    description: 'Base de datos visual que combina la simplicidad de una hoja de cálculo con la potencia de una base de datos.',
    pricing: 'Gratis hasta 1200 registros, Plus $10/mes por usuario',
    complexity: 'intermediate',
    difficulty_level: 4,
    learning_curve: 'gentle',
    community_size: 'large',
    integration_options: ['Zapier', 'API REST', 'Slack', 'Gmail', '100+ apps'],
    tags: ['base-datos', 'colaboración', 'organización', 'CRM'],
    logoPlaceholder: 'photo-1460925895917-afdab827c52f',
    website: 'https://airtable.com',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'CRM personalizado',
      'Gestión de inventario',
      'Planificación de eventos',
      'Tracking de proyectos'
    ],
    comparison_matrix: {
      ease_of_use: 8,
      feature_richness: 8,
      pricing_value: 7,
      support_quality: 8,
      scalability: 7
    },
    similar_tools: ['notion', 'monday', 'smartsheet'],
    founded_year: 2012,
    user_rating: 4.6,
    monthly_active_users: '300K+',
    key_features: [
      'Vistas múltiples (grid, calendar, kanban)',
      'Campos personalizados avanzados',
      'Colaboración en tiempo real',
      'Automatizaciones integradas'
    ],
    pros: [
      'Muy intuitivo',
      'Flexible y potente',
      'Excelente para equipos',
      'Gran ecosistema de templates'
    ],
    cons: [
      'Limitaciones en plan gratuito',
      'Performance con muchos datos',
      'Precio alto para equipos grandes'
    ],
    best_for: [
      'Equipos que necesitan organización',
      'CRM simple pero potente',
      'Gestión de contenido',
      'Startups en crecimiento'
    ],
    alternatives: ['Notion', 'Monday.com', 'Google Sheets']
  },
  {
    id: 'retool',
    name: 'Retool',
    category: 'No-Code Platforms',
    subcategory: 'Internal Tools',
    description: 'Plataforma para construir herramientas internas y dashboards rápidamente.',
    pricing: 'Gratis hasta 5 usuarios, Team $10/mes por usuario',
    complexity: 'advanced',
    difficulty_level: 6,
    learning_curve: 'moderate',
    community_size: 'medium',
    integration_options: ['PostgreSQL', 'MySQL', 'MongoDB', 'APIs REST', 'GraphQL'],
    tags: ['herramientas-internas', 'admin-panels', 'dashboards', 'empresas'],
    logoPlaceholder: 'photo-1551836022-deb4988cc6c0',
    website: 'https://retool.com',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'Admin panels personalizados',
      'Dashboards operacionales',
      'Herramientas de soporte al cliente',
      'Interfaces para bases de datos'
    ],
    comparison_matrix: {
      ease_of_use: 7,
      feature_richness: 9,
      pricing_value: 8,
      support_quality: 8,
      scalability: 9
    },
    similar_tools: ['appsmith', 'internal', 'bubble'],
    founded_year: 2017,
    user_rating: 4.5,
    monthly_active_users: '100K+',
    key_features: [
      'Drag-and-drop interface builder',
      'Pre-built componentes',
      'Database integrations',
      'Custom JavaScript'
    ],
    pros: [
      'Muy potente para herramientas internas',
      'Integraciones extensas',
      'Desarrollo rápido',
      'Seguridad empresarial'
    ],
    cons: [
      'Enfocado solo en herramientas internas',
      'Curva de aprendizaje para no técnicos',
      'Precio puede ser alto'
    ],
    best_for: [
      'Empresas que necesitan herramientas internas',
      'Equipos de operaciones',
      'Startups con muchos datos',
      'Equipos de soporte'
    ],
    alternatives: ['Appsmith', 'Internal.io', 'Admin Bro']
  },
  {
    id: 'framer',
    name: 'Framer',
    category: 'Website Builders',
    subcategory: 'Design to Code',
    description: 'Herramienta de diseño y desarrollo web que convierte prototipos en sitios web reales.',
    pricing: 'Gratis básico, Mini $5/mes, Basic $15/mes',
    complexity: 'intermediate',
    difficulty_level: 5,
    learning_curve: 'moderate',
    community_size: 'large',
    integration_options: ['Figma', 'CMS', 'Analytics', 'Forms'],
    tags: ['diseño', 'prototipos', 'responsive', 'animaciones'],
    logoPlaceholder: 'photo-1609902726285-00668009f004',
    website: 'https://framer.com',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'Landing pages con animaciones',
      'Portfolios interactivos',
      'Prototipos funcionales',
      'Sitios web de startups'
    ],
    comparison_matrix: {
      ease_of_use: 7,
      feature_richness: 9,
      pricing_value: 8,
      support_quality: 8,
      scalability: 7
    },
    similar_tools: ['webflow', 'figma', 'bubble'],
    founded_year: 2014,
    user_rating: 4.4,
    monthly_active_users: '200K+',
    key_features: [
      'Animaciones avanzadas',
      'Componentes reutilizables',
      'CMS integrado',
      'Responsive automático'
    ],
    pros: [
      'Animaciones increíbles',
      'Transición suave de diseño a código',
      'Muy visual',
      'Comunidad activa'
    ],
    cons: [
      'Curva de aprendizaje para animaciones',
      'Limitado para e-commerce',
      'Performance con animaciones complejas'
    ],
    best_for: [
      'Diseñadores que quieren desarrollar',
      'Landing pages premium',
      'Portfolios creativos',
      'Prototipos interactivos'
    ],
    alternatives: ['Webflow', 'Figma', 'Adobe XD']
  },
  {
    id: 'squarespace',
    name: 'Squarespace',
    category: 'Website Builders',
    subcategory: 'All-in-One Platform',
    description: 'Constructor de sitios web todo-en-uno con templates premium y herramientas de marketing.',
    pricing: 'Personal $12/mes, Business $18/mes, Commerce $26/mes',
    complexity: 'beginner',
    difficulty_level: 3,
    learning_curve: 'gentle',
    community_size: 'large',
    integration_options: ['Mailchimp', 'Google Analytics', 'Social media', 'E-commerce'],
    tags: ['templates', 'blog', 'portfolio', 'e-commerce'],
    logoPlaceholder: 'photo-1460925895917-afdab827c52f',
    website: 'https://squarespace.com',
    apiAvailable: false,
    freeVersion: false,
    use_case_examples: [
      'Portfolios profesionales',
      'Blogs corporativos',
      'Tiendas online pequeñas',
      'Sitios de restaurantes'
    ],
    comparison_matrix: {
      ease_of_use: 9,
      feature_richness: 7,
      pricing_value: 7,
      support_quality: 8,
      scalability: 6
    },
    similar_tools: ['wix', 'wordpress', 'webflow'],
    founded_year: 2003,
    user_rating: 4.2,
    monthly_active_users: '4M+',
    key_features: [
      'Templates de diseño premium',
      'Editor drag-and-drop',
      'Hosting incluido',
      'SEO integrado'
    ],
    pros: [
      'Diseños muy elegantes',
      'Fácil de usar',
      'Hosting confiable',
      'Soporte 24/7'
    ],
    cons: [
      'Menos flexibilidad',
      'No tiene plan gratuito',
      'Limitado para customización avanzada'
    ],
    best_for: [
      'Creativos y artistas',
      'Pequeños negocios',
      'Portfolios profesionales',
      'Blogs elegantes'
    ],
    alternatives: ['Wix', 'WordPress.com', 'Webflow']
  },
  {
    id: 'wordpress',
    name: 'WordPress.com',
    category: 'Website Builders',
    subcategory: 'CMS Platform',
    description: 'Plataforma de gestión de contenido más popular del mundo para crear sitios web y blogs.',
    pricing: 'Gratis básico, Personal $4/mes, Premium $8/mes',
    complexity: 'intermediate',
    difficulty_level: 4,
    learning_curve: 'moderate',
    community_size: 'massive',
    integration_options: ['Miles de plugins', 'API REST', 'WooCommerce', 'Custom themes'],
    tags: ['CMS', 'blog', 'flexible', 'plugins'],
    logoPlaceholder: 'photo-1611224923853-80b023f02d71',
    website: 'https://wordpress.com',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'Blogs corporativos',
      'Sitios web de noticias',
      'Portfolios con blog',
      'Sitios institucionales'
    ],
    comparison_matrix: {
      ease_of_use: 6,
      feature_richness: 10,
      pricing_value: 9,
      support_quality: 7,
      scalability: 10
    },
    similar_tools: ['ghost', 'medium', 'squarespace'],
    founded_year: 2003,
    user_rating: 4.3,
    monthly_active_users: '450M+',
    key_features: [
      'Editor de bloques Gutenberg',
      'Miles de themes y plugins',
      'SEO avanzado',
      'Multisite capability'
    ],
    pros: [
      'Extremadamente flexible',
      'Ecosistema gigante',
      'SEO excelente',
      'Escalabilidad infinita'
    ],
    cons: [
      'Puede ser complejo para principiantes',
      'Requiere mantenimiento',
      'Performance variable'
    ],
    best_for: [
      'Bloggers serios',
      'Empresas que necesitan flexibilidad',
      'Sitios con mucho contenido',
      'Desarrolladores'
    ],
    alternatives: ['Ghost', 'Drupal', 'Joomla']
  },
  {
    id: 'woocommerce',
    name: 'WooCommerce',
    category: 'E-commerce Platforms',
    subcategory: 'WordPress E-commerce',
    description: 'Plugin de e-commerce para WordPress que transforma cualquier sitio en una tienda online.',
    pricing: 'Gratis (plugin), hosting desde $10/mes',
    complexity: 'intermediate',
    difficulty_level: 5,
    learning_curve: 'moderate',
    community_size: 'massive',
    integration_options: ['WordPress plugins', 'Payment gateways', 'Shipping', 'Analytics'],
    tags: ['WordPress', 'e-commerce', 'flexible', 'customizable'],
    logoPlaceholder: 'photo-1556742049-0cfed4f6a45d',
    website: 'https://woocommerce.com',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'Tiendas online personalizadas',
      'Marketplaces pequeños',
      'Venta de productos digitales',
      'Subscripciones y membresías'
    ],
    comparison_matrix: {
      ease_of_use: 6,
      feature_richness: 10,
      pricing_value: 9,
      support_quality: 7,
      scalability: 9
    },
    similar_tools: ['shopify', 'magento', 'prestashop'],
    founded_year: 2011,
    user_rating: 4.1,
    monthly_active_users: '5M+',
    key_features: [
      'Integración completa con WordPress',
      'Miles de extensions',
      'Gestión de inventario avanzada',
      'Múltiples métodos de pago'
    ],
    pros: [
      'Totalmente customizable',
      'Ecosistema gigante',
      'Costo inicial bajo',
      'SEO excelente'
    ],
    cons: [
      'Requiere conocimientos técnicos',
      'Costos ocultos con extensions',
      'Performance puede ser lenta'
    ],
    best_for: [
      'Tiendas que necesitan customización',
      'Empresas con desarrolladores',
      'Integración con contenido',
      'Presupuestos flexibles'
    ],
    alternatives: ['Shopify', 'Magento', 'BigCommerce']
  },
  {
    id: 'bigcommerce',
    name: 'BigCommerce',
    category: 'E-commerce Platforms',
    subcategory: 'Enterprise E-commerce',
    description: 'Plataforma de e-commerce empresarial con funciones avanzadas sin límites de transacciones.',
    pricing: 'Standard $29/mes, Plus $79/mes, Pro $399/mes',
    complexity: 'intermediate',
    difficulty_level: 5,
    learning_curve: 'moderate',
    community_size: 'medium',
    integration_options: ['APIs', 'Marketplaces', 'Payment gateways', 'ERP systems'],
    tags: ['enterprise', 'escalable', 'API-first', 'multicanal'],
    logoPlaceholder: 'photo-1556740758-90de374c12ad',
    website: 'https://bigcommerce.com',
    apiAvailable: true,
    freeVersion: false,
    use_case_examples: [
      'Tiendas enterprise escalables',
      'B2B y B2C combinados',
      'Venta multicanal',
      'Integraciones ERP complejas'
    ],
    comparison_matrix: {
      ease_of_use: 7,
      feature_richness: 9,
      pricing_value: 7,
      support_quality: 8,
      scalability: 10
    },
    similar_tools: ['shopify-plus', 'magento', 'salesforce-commerce'],
    founded_year: 2009,
    user_rating: 4.2,
    monthly_active_users: '60K+',
    key_features: [
      'Sin límites de productos o ancho de banda',
      'API-first architecture',
      'Multi-storefront capability',
      'Advanced B2B features'
    ],
    pros: [
      'Muy escalable',
      'Sin tarifas de transacción',
      'APIs robustas',
      'Funciones enterprise'
    ],
    cons: [
      'Precio alto para pequeñas tiendas',
      'Curva de aprendizaje pronunciada',
      'Menos themes que Shopify'
    ],
    best_for: [
      'Empresas en rápido crecimiento',
      'Tiendas con alto volumen',
      'Necesidades B2B complejas',
      'Integraciones múltiples'
    ],
    alternatives: ['Shopify Plus', 'Magento Commerce', 'Salesforce Commerce']
  },
  {
    id: 'prestashop',
    name: 'PrestaShop',
    category: 'E-commerce Platforms',
    subcategory: 'Open Source E-commerce',
    description: 'Plataforma de e-commerce open source flexible y gratuita para crear tiendas online.',
    pricing: 'Gratis (open source), Cloud desde $27/mes',
    complexity: 'advanced',
    difficulty_level: 6,
    learning_curve: 'steep',
    community_size: 'large',
    integration_options: ['Modules marketplace', 'APIs', 'Payment systems', 'Shipping'],
    tags: ['open-source', 'gratis', 'flexible', 'Europa'],
    logoPlaceholder: 'photo-1556740714-a8395b3bf30f',
    website: 'https://prestashop.com',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'Tiendas europeas personalizadas',
      'E-commerce con presupuesto limitado',
      'Tiendas con requerimientos específicos',
      'Proyectos de desarrollo custom'
    ],
    comparison_matrix: {
      ease_of_use: 5,
      feature_richness: 8,
      pricing_value: 10,
      support_quality: 6,
      scalability: 8
    },
    similar_tools: ['woocommerce', 'magento', 'opencart'],
    founded_year: 2007,
    user_rating: 3.9,
    monthly_active_users: '300K+',
    key_features: [
      'Completamente gratuito',
      'Marketplace de modules',
      'Multi-idioma nativo',
      'Gestión avanzada de catálogo'
    ],
    pros: [
      'Totalmente gratuito',
      'Muy customizable',
      'Fuerte en mercado europeo',
      'Comunidad activa'
    ],
    cons: [
      'Requiere conocimientos técnicos',
      'Hosting y mantenimiento propios',
      'Performance variable'
    ],
    best_for: [
      'Desarrolladores con presupuesto limitado',
      'Tiendas europeas',
      'Proyectos 100% personalizados',
      'Empresas con equipo técnico'
    ],
    alternatives: ['WooCommerce', 'Magento', 'OpenCart']
  },
  {
    id: 'canva',
    name: 'Canva',
    category: 'Design & Prototyping',
    subcategory: 'Graphic Design',
    description: 'Plataforma de diseño gráfico intuitiva con templates y herramientas de IA.',
    pricing: 'Gratis básico, Pro $12.99/mes, Teams $14.99/mes',
    complexity: 'beginner',
    difficulty_level: 2,
    learning_curve: 'immediate',
    community_size: 'massive',
    integration_options: ['Social media', 'Google Drive', 'Dropbox', 'Brand kit'],
    tags: ['diseño', 'gráficos', 'social-media', 'templates'],
    logoPlaceholder: 'photo-1609902726285-00668009f004',
    website: 'https://canva.com',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'Posts para redes sociales',
      'Presentaciones corporativas',
      'Logos y branding básico',
      'Material de marketing'
    ],
    comparison_matrix: {
      ease_of_use: 10,
      feature_richness: 7,
      pricing_value: 9,
      support_quality: 8,
      scalability: 6
    },
    similar_tools: ['adobe-express', 'figma', 'piktochart'],
    founded_year: 2013,
    user_rating: 4.7,
    monthly_active_users: '135M+',
    key_features: [
      '250K+ templates premium',
      'Magic Resize automático',
      'Colaboración en tiempo real',
      'Brand kit completo'
    ],
    pros: [
      'Extremadamente fácil de usar',
      'Templates de alta calidad',
      'IA integrada',
      'Plan gratuito generoso'
    ],
    cons: [
      'Limitado para diseño avanzado',
      'Dependiente de templates',
      'Menos control creativo'
    ],
    best_for: [
      'No diseñadores que necesitan gráficos',
      'Social media managers',
      'Pequeñas empresas',
      'Marketing rápido'
    ],
    alternatives: ['Adobe Express', 'PiktoChart', 'Crello']
  },
  {
    id: 'sketch',
    name: 'Sketch',
    category: 'Design & Prototyping',
    subcategory: 'UI/UX Design',
    description: 'Herramienta de diseño vectorial especializada en interfaces de usuario y experiencia.',
    pricing: '$9/mes por editor, $99/año',
    complexity: 'advanced',
    difficulty_level: 7,
    learning_curve: 'steep',
    community_size: 'large',
    integration_options: ['InVision', 'Principle', 'Zeplin', 'Plugins ecosystem'],
    tags: ['UI', 'UX', 'vectorial', 'interfaces', 'Mac'],
    logoPlaceholder: 'photo-1611224923853-80b023f02d71',
    website: 'https://sketch.com',
    apiAvailable: true,
    freeVersion: false,
    use_case_examples: [
      'Diseño de apps móviles',
      'Interfaces web complejas',
      'Design systems',
      'Prototipos interactivos'
    ],
    comparison_matrix: {
      ease_of_use: 6,
      feature_richness: 9,
      pricing_value: 7,
      support_quality: 8,
      scalability: 8
    },
    similar_tools: ['figma', 'adobe-xd', 'invision'],
    founded_year: 2010,
    user_rating: 4.3,
    monthly_active_users: '1M+',
    key_features: [
      'Símbolos y componentes reutilizables',
      'Plugins ecosystem robusto',
      'Colaboración en la nube',
      'Vector editing avanzado'
    ],
    pros: [
      'Pionero en UI design',
      'Ecosistema de plugins maduro',
      'Herramientas vectoriales potentes',
      'Workflow optimizado para UI'
    ],
    cons: [
      'Solo para Mac',
      'Precio elevado',
      'Colaboración limitada vs competidores'
    ],
    best_for: [
      'Diseñadores UI/UX profesionales',
      'Equipos de diseño en Mac',
      'Design systems complejos',
      'Proyectos de alta fidelidad'
    ],
    alternatives: ['Figma', 'Adobe XD', 'InVision Studio']
  },
  {
    id: 'adobe-xd',
    name: 'Adobe XD',
    category: 'Design & Prototyping',
    subcategory: 'UI/UX Design',
    description: 'Herramienta de Adobe para diseño y prototipado de experiencias digitales.',
    pricing: 'Gratis básico, Paid plan $9.99/mes',
    complexity: 'intermediate',
    difficulty_level: 5,
    learning_curve: 'moderate',
    community_size: 'large',
    integration_options: ['Creative Cloud', 'After Effects', 'Photoshop', 'Illustrator'],
    tags: ['Adobe', 'prototipos', 'UI', 'animaciones'],
    logoPlaceholder: 'photo-1609902726285-00668009f004',
    website: 'https://adobe.com/products/xd',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'Prototipos animados',
      'Diseño de apps móviles',
      'Wireframes interactivos',
      'Presentaciones de diseño'
    ],
    comparison_matrix: {
      ease_of_use: 7,
      feature_richness: 8,
      pricing_value: 8,
      support_quality: 8,
      scalability: 7
    },
    similar_tools: ['figma', 'sketch', 'invision'],
    founded_year: 2016,
    user_rating: 4.1,
    monthly_active_users: '2M+',
    key_features: [
      'Prototipado con animaciones',
      'Integración Creative Cloud',
      'Voice prototyping',
      'Colaboración en tiempo real'
    ],
    pros: [
      'Integración con Adobe',
      'Animaciones fluidas',
      'Plan gratuito funcional',
      'Auto-animate innovador'
    ],
    cons: [
      'Menos adopción que Figma',
      'Limitado comparado con Figma',
      'Ecosistema de plugins menor'
    ],
    best_for: [
      'Usuarios de Adobe Creative Suite',
      'Prototipos con animaciones',
      'Equipos que necesitan integración Adobe',
      'Diseño de interacciones complejas'
    ],
    alternatives: ['Figma', 'Sketch', 'InVision']
  },
  {
    id: 'github-copilot',
    name: 'GitHub Copilot',
    category: 'Development Tools',
    subcategory: 'AI Code Assistant',
    description: 'Asistente de código con IA que ayuda a escribir código más rápido y con menos errores.',
    pricing: '$10/mes individual, $19/mes business',
    complexity: 'intermediate',
    difficulty_level: 4,
    learning_curve: 'gentle',
    community_size: 'massive',
    integration_options: ['VS Code', 'Visual Studio', 'JetBrains', 'Neovim'],
    tags: ['IA', 'código', 'asistente', 'programación'],
    logoPlaceholder: 'photo-1461749280684-dccba630e2f6',
    website: 'https://github.com/features/copilot',
    apiAvailable: false,
    freeVersion: false,
    use_case_examples: [
      'Autocompletar funciones complejas',
      'Generar tests automáticamente',
      'Traducir código entre lenguajes',
      'Documentar código existente'
    ],
    comparison_matrix: {
      ease_of_use: 9,
      feature_richness: 8,
      pricing_value: 8,
      support_quality: 8,
      scalability: 9
    },
    similar_tools: ['tabnine', 'codewhisperer', 'replit-ghostwriter'],
    founded_year: 2021,
    user_rating: 4.5,
    monthly_active_users: '1M+',
    key_features: [
      'Autocompletado inteligente',
      'Generación de funciones completas',
      'Soporte para 40+ lenguajes',
      'Context-aware suggestions'
    ],
    pros: [
      'Incrementa productividad significativamente',
      'Muy precisas las sugerencias',
      'Integración perfecta con editores',
      'Aprende del contexto del proyecto'
    ],
    cons: [
      'Precio mensual continuo',
      'Puede generar código incorrecto',
      'Dependencia de conexión internet'
    ],
    best_for: [
      'Desarrolladores profesionales',
      'Equipos de desarrollo ágil',
      'Aprendizaje de nuevos lenguajes',
      'Proyectos con deadlines apretados'
    ],
    alternatives: ['TabNine', 'Amazon CodeWhisperer', 'Replit Ghostwriter']
  },
  {
    id: 'replit',
    name: 'Replit',
    category: 'Development Tools',
    subcategory: 'Online IDE',
    description: 'Entorno de desarrollo integrado online para programar colaborativamente en la nube.',
    pricing: 'Gratis básico, Hacker $7/mes, Pro $20/mes',
    complexity: 'beginner',
    difficulty_level: 3,
    learning_curve: 'gentle',
    community_size: 'large',
    integration_options: ['GitHub', 'Databases', 'APIs', 'Deployment'],
    tags: ['IDE', 'nube', 'colaboración', 'educación'],
    logoPlaceholder: 'photo-1516321318423-f06f85e504b3',
    website: 'https://replit.com',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'Aprender programación',
      'Proyectos colaborativos',
      'Prototipado rápido',
      'Educación en código'
    ],
    comparison_matrix: {
      ease_of_use: 9,
      feature_richness: 7,
      pricing_value: 9,
      support_quality: 7,
      scalability: 6
    },
    similar_tools: ['codepen', 'codesandbox', 'gitpod'],
    founded_year: 2016,
    user_rating: 4.4,
    monthly_active_users: '20M+',
    key_features: [
      'IDE completo en el navegador',
      'Colaboración en tiempo real',
      'Hosting automático',
      'Multiplayer coding'
    ],
    pros: [
      'Configuración cero',
      'Perfecto para educación',
      'Colaboración excelente',
      'Deployment fácil'
    ],
    cons: [
      'Performance limitada vs local',
      'Dependiente de internet',
      'Limitaciones en plan gratuito'
    ],
    best_for: [
      'Estudiantes de programación',
      'Profesores de código',
      'Prototipos rápidos',
      'Trabajo colaborativo'
    ],
    alternatives: ['CodePen', 'CodeSandbox', 'Gitpod']
  },
  {
    id: 'vercel',
    name: 'Vercel',
    category: 'Development Tools',
    subcategory: 'Deployment Platform',
    description: 'Plataforma de deployment optimizada para frontend frameworks y aplicaciones JAMstack.',
    pricing: 'Gratis hasta 100GB, Pro $20/mes',
    complexity: 'intermediate',
    difficulty_level: 4,
    learning_curve: 'gentle',
    community_size: 'large',
    integration_options: ['GitHub', 'GitLab', 'Bitbucket', 'APIs', 'Databases'],
    tags: ['deployment', 'JAMstack', 'serverless', 'performance'],
    logoPlaceholder: 'photo-1558655146-d09347e92766',
    website: 'https://vercel.com',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'Deploy de apps React/Next.js',
      'Landing pages estáticas',
      'API serverless functions',
      'Preview deployments'
    ],
    comparison_matrix: {
      ease_of_use: 9,
      feature_richness: 8,
      pricing_value: 8,
      support_quality: 8,
      scalability: 9
    },
    similar_tools: ['netlify', 'railway', 'heroku'],
    founded_year: 2015,
    user_rating: 4.6,
    monthly_active_users: '500K+',
    key_features: [
      'Zero-config deployments',
      'Preview URLs automáticos',
      'Edge network global',
      'Serverless functions integradas'
    ],
    pros: [
      'Deployment súper rápido',
      'Excelente DX (Developer Experience)',
      'Performance optimizada',
      'Integración Git perfecta'
    ],
    cons: [
      'Puede ser costoso para alto tráfico',
      'Enfocado principalmente en frontend',
      'Limitaciones en plan gratuito'
    ],
    best_for: [
      'Desarrolladores frontend',
      'Apps React/Next.js',
      'JAMstack sites',
      'Teams que necesitan preview URLs'
    ],
    alternatives: ['Netlify', 'Railway', 'Render']
  },
  {
    id: 'planetscale',
    name: 'PlanetScale',
    category: 'Database & Backend',
    subcategory: 'Serverless Database',
    description: 'Base de datos MySQL serverless con branching como Git para desarrollo moderno.',
    pricing: 'Gratis hasta 5GB, Scaler $29/mes',
    complexity: 'intermediate',
    difficulty_level: 5,
    learning_curve: 'moderate',
    community_size: 'medium',
    integration_options: ['Prisma', 'Drizzle', 'REST API', 'Connection pooling'],
    tags: ['MySQL', 'serverless', 'branching', 'escalable'],
    logoPlaceholder: 'photo-1518770660439-4636190af475',
    website: 'https://planetscale.com',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'Apps modernas con Git workflow',
      'Desarrollo con múltiples ambientes',
      'Aplicaciones que necesitan escalar',
      'Teams que usan schema branching'
    ],
    comparison_matrix: {
      ease_of_use: 7,
      feature_richness: 8,
      pricing_value: 8,
      support_quality: 8,
      scalability: 10
    },
    similar_tools: ['supabase', 'railway', 'neon'],
    founded_year: 2018,
    user_rating: 4.5,
    monthly_active_users: '100K+',
    key_features: [
      'Database branching',
      'Schema migrations seguras',
      'Horizontal scaling automático',
      'Connection pooling integrado'
    ],
    pros: [
      'Workflow como Git',
      'Escalabilidad extrema',
      'Zero-downtime migrations',
      'Excelente DX'
    ],
    cons: [
      'Solo MySQL',
      'Precio alto para grandes volúmenes',
      'Curva de aprendizaje para branching'
    ],
    best_for: [
      'Startups de alto crecimiento',
      'Teams con Git workflow',
      'Apps que necesitan escalar globalmente',
      'Desarrollo con múltiples environments'
    ],
    alternatives: ['Supabase', 'Neon', 'Railway PostgreSQL']
  },
  {
    id: 'railway',
    name: 'Railway',
    category: 'Database & Backend',
    subcategory: 'Full-Stack Platform',
    description: 'Plataforma de infraestructura que simplifica el deployment de aplicaciones y bases de datos.',
    pricing: 'Gratis $5 crédito/mes, Pro $20/mes',
    complexity: 'intermediate',
    difficulty_level: 4,
    learning_curve: 'gentle',
    community_size: 'medium',
    integration_options: ['GitHub', 'Docker', 'PostgreSQL', 'Redis', 'MongoDB'],
    tags: ['deployment', 'infraestructura', 'fullstack', 'simple'],
    logoPlaceholder: 'photo-1558655146-d09347e92766',
    website: 'https://railway.app',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'Deploy de apps fullstack',
      'Bases de datos managed',
      'APIs y microservicios',
      'Aplicaciones con múltiples servicios'
    ],
    comparison_matrix: {
      ease_of_use: 9,
      feature_richness: 7,
      pricing_value: 9,
      support_quality: 7,
      scalability: 8
    },
    similar_tools: ['render', 'heroku', 'vercel'],
    founded_year: 2020,
    user_rating: 4.4,
    monthly_active_users: '200K+',
    key_features: [
      'Deploy automático desde Git',
      'Bases de datos managed',
      'Environment variables fáciles',
      'Logs en tiempo real'
    ],
    pros: [
      'Muy fácil de usar',
      'Precio competitivo',
      'Soporte para múltiples tecnologías',
      'Excelente DX'
    ],
    cons: [
      'Relativamente nuevo',
      'Menor ecosistema que competidores',
      'Opciones de scaling limitadas'
    ],
    best_for: [
      'Desarrolladores que buscan simplicidad',
      'Startups con presupuesto ajustado',
      'Proyectos side que necesitan backend',
      'Teams pequeños'
    ],
    alternatives: ['Render', 'Heroku', 'DigitalOcean App Platform']
  },
  {
    id: 'mongodb-atlas',
    name: 'MongoDB Atlas',
    category: 'Database & Backend',
    subcategory: 'NoSQL Database',
    description: 'Base de datos NoSQL como servicio con clustering automático y herramientas integradas.',
    pricing: 'Gratis hasta 512MB, Dedicated desde $57/mes',
    complexity: 'intermediate',
    difficulty_level: 5,
    learning_curve: 'moderate',
    community_size: 'massive',
    integration_options: ['Mongoose', 'MongoDB drivers', 'Atlas Search', 'Charts'],
    tags: ['NoSQL', 'documentos', 'escalable', 'cloud'],
    logoPlaceholder: 'photo-1460925895917-afdab827c52f',
    website: 'https://mongodb.com/atlas',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'Aplicaciones con datos complejos',
      'Apps móviles y web modernas',
      'Analytics en tiempo real',
      'Content management systems'
    ],
    comparison_matrix: {
      ease_of_use: 7,
      feature_richness: 9,
      pricing_value: 7,
      support_quality: 8,
      scalability: 10
    },
    similar_tools: ['dynamodb', 'cosmosdb', 'couchbase'],
    founded_year: 2016,
    user_rating: 4.3,
    monthly_active_users: '30K+',
    key_features: [
      'Auto-scaling y clustering',
      'Atlas Search (full-text search)',
      'Real-time analytics',
      'Global clusters'
    ],
    pros: [
      'Muy escalable',
      'Flexibilidad de esquema',
      'Herramientas integradas potentes',
      'Performance excelente'
    ],
    cons: [
      'Puede ser costoso para grandes volúmenes',
      'Curva de aprendizaje NoSQL',
      'Consultas complejas vs SQL'
    ],
    best_for: [
      'Apps con datos no estructurados',
      'Aplicaciones que necesitan escalar globalmente',
      'Desarrollo ágil con esquemas flexibles',
      'Analytics en tiempo real'
    ],
    alternatives: ['DynamoDB', 'Cosmos DB', 'CouchDB']
  }
];

export const enhancedCategories = [
  'AI Writing & Content',
  'No-Code Platforms', 
  'Website Builders',
  'E-commerce Platforms',
  'Design & Prototyping',
  'Development Tools',
  'Database & Backend',
  'Communication',
  'Project Management', 
  'Marketing & Analytics',
  'Mobile Development',
  'AI Image & Video',
  'AI Audio & Music',
  'Business Automation',
  'AI Research & Analysis',
  'AI Productivity & Automation',
  'AI Data & Analytics',
  'AI Translation & Language',
  'AI Cybersecurity',
  'AI Education & Learning',
  'AI Health & Wellness',
  'AI Finance & Fintech',
  'AI Gaming & Entertainment',
  'Blockchain & Web3'
];

export const subcategories = [
  'Conversational AI',
  'Marketing Content',
  'Writing Assistant',
  'Content Generator',
  'Performance Marketing',
  'Productivity Writing',
  'AI-Powered Development',
  'Web App Builder',
  'Automation',
  'Advanced Automation',
  'Database & Workflows',
  'Internal Tools',
  'Design to Code',
  'All-in-One Platform',
  'CMS Platform',
  'WordPress E-commerce',
  'Enterprise E-commerce',
  'Open Source E-commerce',
  'Graphic Design',
  'UI/UX Design',
  'AI Code Assistant',
  'Online IDE',
  'Deployment Platform',
  'Serverless Database',
  'Full-Stack Platform',
  'NoSQL Database'
];

export const difficultyLevels = [
  { value: 1, label: 'Muy Fácil' },
  { value: 2, label: 'Fácil' },
  { value: 3, label: 'Principiante' },
  { value: 4, label: 'Intermedio Bajo' },
  { value: 5, label: 'Intermedio' },
  { value: 6, label: 'Intermedio Alto' },
  { value: 7, label: 'Avanzado' },
  { value: 8, label: 'Muy Avanzado' },
  { value: 9, label: 'Experto' },
  { value: 10, label: 'Muy Difícil' }
];

export const learningCurves = [
  'immediate',
  'gentle', 
  'moderate',
  'steep'
];

export const communitySizes = [
  'small',
  'medium',
  'large',
  'massive'
];
