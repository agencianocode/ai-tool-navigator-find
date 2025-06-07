

export interface EnhancedTool {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  description: string;
  pricing: string;
  complexity: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  difficulty_level: number; // 1-10 scale
  learning_curve: 'steep' | 'moderate' | 'gentle' | 'immediate';
  community_size: 'small' | 'medium' | 'large' | 'massive';
  integration_options: string[];
  tags: string[];
  logoPlaceholder: string;
  website: string;
  apiAvailable: boolean;
  freeVersion: boolean;
  use_case_examples: string[];
  comparison_matrix: {
    ease_of_use: number; // 1-10
    feature_richness: number; // 1-10
    pricing_value: number; // 1-10
    support_quality: number; // 1-10
    scalability: number; // 1-10
  };
  similar_tools: string[];
  founded_year: number;
  user_rating: number; // 1-5 stars
  monthly_active_users?: string;
  key_features: string[];
  pros: string[];
  cons: string[];
  best_for: string[];
  alternatives: string[];
}

export const expandedToolsDatabase: EnhancedTool[] = [
  // ====== AI WRITING & CONTENT ======
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    category: 'AI Writing & Content',
    subcategory: 'Conversational AI',
    description: 'Chatbot conversacional de OpenAI para generar texto, responder preguntas y asistir en diversas tareas.',
    pricing: 'Gratis con límites, Plus $20/mes',
    complexity: 'beginner',
    difficulty_level: 2,
    learning_curve: 'immediate',
    community_size: 'massive',
    integration_options: ['API REST', 'Zapier', 'Custom integrations', 'Browser extensions'],
    tags: ['chatbot', 'escritura', 'conversación', 'código', 'OpenAI'],
    logoPlaceholder: 'photo-1677442136019-21780ecad995',
    website: 'https://chat.openai.com',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'Crear contenido de blog y marketing',
      'Asistencia en programación y debugging',
      'Generación de ideas creativas y brainstorming',
      'Respuestas automáticas al cliente',
      'Análisis y resumen de documentos'
    ],
    comparison_matrix: {
      ease_of_use: 9,
      feature_richness: 8,
      pricing_value: 8,
      support_quality: 7,
      scalability: 9
    },
    similar_tools: ['claude', 'jasper', 'copy-ai'],
    founded_year: 2022,
    user_rating: 4.5,
    monthly_active_users: '100M+',
    key_features: [
      'Conversación natural en múltiples idiomas',
      'Generación de código en 50+ lenguajes',
      'Análisis de documentos y datos',
      'Integración con herramientas externas'
    ],
    pros: [
      'Interfaz muy intuitiva',
      'Respuestas de alta calidad',
      'Versatilidad extrema',
      'Actualizaciones constantes'
    ],
    cons: [
      'Límites en versión gratuita',
      'Puede generar información incorrecta',
      'Depende de conexión a internet'
    ],
    best_for: [
      'Startups que necesitan contenido rápido',
      'Desarrolladores que buscan asistencia de código',
      'Profesionales de marketing',
      'Estudiantes y educadores'
    ],
    alternatives: ['Claude AI', 'Google Bard', 'Microsoft Copilot']
  },

  {
    id: 'claude',
    name: 'Claude AI',
    category: 'AI Writing & Content',
    subcategory: 'Conversational AI',
    description: 'Asistente de IA de Anthropic especializado en conversaciones largas y análisis de documentos.',
    pricing: 'Gratis con límites, Pro $20/mes',
    complexity: 'beginner',
    difficulty_level: 2,
    learning_curve: 'immediate',
    community_size: 'large',
    integration_options: ['API REST', 'Custom integrations'],
    tags: ['conversacional', 'análisis', 'documentos', 'seguro'],
    logoPlaceholder: 'photo-1677442136019-21780ecad995',
    website: 'https://claude.ai',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'Análisis detallado de documentos largos',
      'Conversaciones complejas y contextuales',
      'Revisión y edición de contenido',
      'Investigación y síntesis de información'
    ],
    comparison_matrix: {
      ease_of_use: 9,
      feature_richness: 8,
      pricing_value: 8,
      support_quality: 8,
      scalability: 8
    },
    similar_tools: ['chatgpt', 'perplexity', 'bard'],
    founded_year: 2022,
    user_rating: 4.4,
    monthly_active_users: '10M+',
    key_features: [
      'Ventana de contexto muy amplia',
      'Análisis profundo de documentos',
      'Respuestas más seguras y precisas',
      'Mejor en tareas de escritura creativa'
    ],
    pros: [
      'Excelente para documentos largos',
      'Respuestas más matizadas',
      'Enfoque en seguridad',
      'Mejor comprensión contextual'
    ],
    cons: [
      'Menos integraciones que ChatGPT',
      'Comunidad más pequeña',
      'Disponibilidad geográfica limitada'
    ],
    best_for: [
      'Profesionales que analizan documentos',
      'Escritores y editores',
      'Investigadores académicos',
      'Empresas que priorizan seguridad'
    ],
    alternatives: ['ChatGPT', 'Perplexity', 'Google Bard']
  },

  {
    id: 'jasper',
    name: 'Jasper AI',
    category: 'AI Writing & Content',
    subcategory: 'Marketing Content',
    description: 'Plataforma de escritura IA especializada en crear contenido de marketing, blogs y copys persuasivos.',
    pricing: '$49-$125/mes',
    complexity: 'intermediate',
    difficulty_level: 4,
    learning_curve: 'moderate',
    community_size: 'large',
    integration_options: ['Surfer SEO', 'Grammarly', 'Chrome Extension', 'WordPress'],
    tags: ['marketing', 'copywriting', 'blogs', 'contenido', 'SEO'],
    logoPlaceholder: 'photo-1596526131083-e8c633c948d2',
    website: 'https://jasper.ai',
    apiAvailable: true,
    freeVersion: false,
    use_case_examples: [
      'Campañas de email marketing automatizadas',
      'Contenido para redes sociales escalable',
      'Artículos de blog optimizados para SEO',
      'Copys de ventas de alta conversión'
    ],
    comparison_matrix: {
      ease_of_use: 7,
      feature_richness: 9,
      pricing_value: 6,
      support_quality: 8,
      scalability: 8
    },
    similar_tools: ['copy-ai', 'writesonic', 'rytr'],
    founded_year: 2021,
    user_rating: 4.2,
    monthly_active_users: '1M+',
    key_features: [
      '50+ templates de contenido',
      'Optimización SEO integrada',
      'Brand voice personalizable',
      'Colaboración en equipo'
    ],
    pros: [
      'Templates muy específicos',
      'Integración con herramientas SEO',
      'Calidad de contenido consistente',
      'Soporte para múltiples idiomas'
    ],
    cons: [
      'Precio elevado para freelancers',
      'Curva de aprendizaje moderada',
      'No tiene versión gratuita'
    ],
    best_for: [
      'Agencias de marketing digital',
      'Empresas con equipos de contenido',
      'E-commerce con muchos productos',
      'Bloggers profesionales'
    ],
    alternatives: ['Copy.ai', 'Writesonic', 'ContentBot']
  },

  {
    id: 'copy-ai',
    name: 'Copy.ai',
    category: 'AI Writing & Content',
    subcategory: 'Marketing Content',
    description: 'Herramienta de copywriting con IA que ayuda a crear contenido de marketing persuasivo y efectivo.',
    pricing: 'Gratis hasta 2000 palabras, Pro $49/mes',
    complexity: 'beginner',
    difficulty_level: 3,
    learning_curve: 'gentle',
    community_size: 'large',
    integration_options: ['Zapier', 'Chrome Extension', 'API'],
    tags: ['copywriting', 'marketing', 'contenido', 'automatización'],
    logoPlaceholder: 'photo-1586281380614-a1d62c273cd5',
    website: 'https://copy.ai',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'Headlines y títulos llamativos',
      'Descripciones de productos',
      'Posts para redes sociales',
      'Emails de marketing'
    ],
    comparison_matrix: {
      ease_of_use: 9,
      feature_richness: 7,
      pricing_value: 8,
      support_quality: 7,
      scalability: 7
    },
    similar_tools: ['jasper', 'writesonic', 'anyword'],
    founded_year: 2020,
    user_rating: 4.0,
    monthly_active_users: '500K+',
    key_features: [
      '90+ herramientas de copywriting',
      'Generación en múltiples idiomas',
      'Templates para diferentes industrias',
      'Colaboración en equipo'
    ],
    pros: [
      'Muy fácil de usar',
      'Plan gratuito generoso',
      'Gran variedad de templates',
      'Resultados rápidos'
    ],
    cons: [
      'Menos funciones avanzadas',
      'Calidad variable según el template',
      'Limitado para contenido largo'
    ],
    best_for: [
      'Pequeñas empresas y startups',
      'Freelancers de marketing',
      'E-commerce que necesita descripciones',
      'Social media managers'
    ],
    alternatives: ['Jasper', 'Writesonic', 'Anyword']
  },

  {
    id: 'grammarly',
    name: 'Grammarly',
    category: 'AI Writing & Content',
    subcategory: 'Writing Assistant',
    description: 'Asistente de escritura con IA que corrige gramática, mejora estilo y optimiza claridad.',
    pricing: 'Gratis básico, Premium $12/mes, Business $15/mes',
    complexity: 'beginner',
    difficulty_level: 2,
    learning_curve: 'immediate',
    community_size: 'massive',
    integration_options: ['Chrome Extension', 'Microsoft Office', 'Google Docs', 'Desktop App'],
    tags: ['gramática', 'corrección', 'estilo', 'escritura', 'productividad'],
    logoPlaceholder: 'photo-1581291518633-83b4ebd1d83e',
    website: 'https://grammarly.com',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'Corrección de emails profesionales',
      'Mejora de documentos académicos',
      'Optimización de posts en redes sociales',
      'Revisión de propuestas de negocio'
    ],
    comparison_matrix: {
      ease_of_use: 10,
      feature_richness: 8,
      pricing_value: 8,
      support_quality: 8,
      scalability: 9
    },
    similar_tools: ['hemingway-editor', 'prowritingaid', 'ginger'],
    founded_year: 2009,
    user_rating: 4.6,
    monthly_active_users: '30M+',
    key_features: [
      'Corrección gramatical en tiempo real',
      'Sugerencias de tono y estilo',
      'Detector de plagio',
      'Métricas de claridad y engagement'
    ],
    pros: [
      'Muy fácil de usar',
      'Integraciones ubicuas',
      'Correcciones precisas',
      'Versión gratuita útil'
    ],
    cons: [
      'Premium costoso para individuos',
      'Sugerencias a veces muy conservadoras',
      'Limitado para idiomas no ingleses'
    ],
    best_for: [
      'Cualquiera que escriba en inglés',
      'Estudiantes y académicos',
      'Profesionales de negocio',
      'Escritores no nativos'
    ],
    alternatives: ['ProWritingAid', 'Hemingway Editor', 'Ginger']
  },

  {
    id: 'perplexity',
    name: 'Perplexity AI',
    category: 'AI Writing & Content',
    subcategory: 'Research Assistant',
    description: 'Motor de búsqueda conversacional con IA que proporciona respuestas citadas y actualizadas.',
    pricing: 'Gratis con límites, Pro $20/mes',
    complexity: 'beginner',
    difficulty_level: 2,
    learning_curve: 'immediate',
    community_size: 'large',
    integration_options: ['API', 'Chrome Extension', 'Mobile Apps'],
    tags: ['búsqueda', 'investigación', 'citations', 'tiempo-real'],
    logoPlaceholder: 'photo-1516996087931-5ae405802f9f',
    website: 'https://perplexity.ai',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'Investigación académica con fuentes',
      'Búsqueda de información actualizada',
      'Análisis de noticias y tendencias',
      'Research para contenido de marketing'
    ],
    comparison_matrix: {
      ease_of_use: 9,
      feature_richness: 8,
      pricing_value: 9,
      support_quality: 7,
      scalability: 8
    },
    similar_tools: ['chatgpt', 'claude', 'you-com'],
    founded_year: 2022,
    user_rating: 4.3,
    monthly_active_users: '5M+',
    key_features: [
      'Búsqueda en tiempo real',
      'Citas y fuentes verificables',
      'Múltiples modelos de IA',
      'Interfaz conversacional'
    ],
    pros: [
      'Información siempre actualizada',
      'Citas confiables',
      'Interfaz limpia',
      'Buena versión gratuita'
    ],
    cons: [
      'Menos creativo que ChatGPT',
      'Limitado para tareas no de investigación',
      'Dependiente de calidad de fuentes'
    ],
    best_for: [
      'Investigadores y estudiantes',
      'Periodistas y bloggers',
      'Profesionales que necesitan datos actualizados',
      'Equipos de marketing que buscan tendencias'
    ],
    alternatives: ['ChatGPT', 'Claude', 'You.com']
  },

  {
    id: 'midjourney',
    name: 'Midjourney',
    category: 'AI Writing & Content',
    subcategory: 'AI Image Generation',
    description: 'Generador de imágenes con IA que crea arte digital de alta calidad a partir de prompts de texto.',
    pricing: 'Basic $10/mes, Standard $30/mes, Pro $60/mes',
    complexity: 'intermediate',
    difficulty_level: 4,
    learning_curve: 'moderate',
    community_size: 'massive',
    integration_options: ['Discord', 'API', 'Third-party tools'],
    tags: ['AI-art', 'imagen', 'creatividad', 'diseño', 'Discord'],
    logoPlaceholder: 'photo-1618401471353-b98afee0b2eb',
    website: 'https://midjourney.com',
    apiAvailable: true,
    freeVersion: false,
    use_case_examples: [
      'Arte conceptual para videojuegos',
      'Ilustraciones para libros y blogs',
      'Mockups y prototipos visuales',
      'Arte para redes sociales'
    ],
    comparison_matrix: {
      ease_of_use: 6,
      feature_richness: 9,
      pricing_value: 7,
      support_quality: 8,
      scalability: 8
    },
    similar_tools: ['dall-e', 'stable-diffusion', 'leonardo'],
    founded_year: 2021,
    user_rating: 4.4,
    monthly_active_users: '15M+',
    key_features: [
      'Calidad artística excepcional',
      'Estilos diversos y únicos',
      'Comunidad activa en Discord',
      'Iteraciones y variaciones'
    ],
    pros: [
      'Calidad artística superior',
      'Gran variedad de estilos',
      'Comunidad muy activa',
      'Resultados consistentes'
    ],
    cons: [
      'Requiere Discord para usar',
      'Sin versión gratuita',
      'Curva de aprendizaje para prompts'
    ],
    best_for: [
      'Artistas digitales',
      'Diseñadores creativos',
      'Agencias de publicidad',
      'Creadores de contenido visual'
    ],
    alternatives: ['DALL-E 3', 'Stable Diffusion', 'Leonardo AI']
  },

  // ====== NO-CODE PLATFORMS ======
  {
    id: 'lovable',
    name: 'Lovable',
    category: 'No-Code Platforms',
    subcategory: 'AI-Powered Development',
    description: 'Plataforma de desarrollo web impulsada por IA que permite crear aplicaciones completas conversando con la IA.',
    pricing: 'Gratis con límites, Pro $20/mes',
    complexity: 'intermediate',
    difficulty_level: 3,
    learning_curve: 'gentle',
    community_size: 'medium',
    integration_options: ['GitHub', 'Supabase', 'Vercel', 'Custom domains', 'API integraciones'],
    tags: ['AI-powered', 'no-code', 'React', 'desarrollo web', 'conversacional'],
    logoPlaceholder: 'photo-1461749280684-dccba630e2f6',
    website: 'https://lovable.dev',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'Crear MVP de startups en días',
      'Prototipos interactivos para presentaciones',
      'Aplicaciones internas de empresa',
      'Landing pages dinámicas'
    ],
    comparison_matrix: {
      ease_of_use: 9,
      feature_richness: 8,
      pricing_value: 9,
      support_quality: 8,
      scalability: 7
    },
    similar_tools: ['bubble', 'webflow', 'framer'],
    founded_year: 2024,
    user_rating: 4.7,
    monthly_active_users: '50K+',
    key_features: [
      'Desarrollo conversacional con IA',
      'Código React generado automáticamente',
      'Integración nativa con Supabase',
      'Deploy automático a producción'
    ],
    pros: [
      'Velocidad de desarrollo extrema',
      'No requiere conocimientos técnicos',
      'Código de calidad profesional',
      'Comunidad activa y soporte excelente'
    ],
    cons: [
      'Limitado a stack React/TypeScript',
      'Dependiente de IA para cambios complejos',
      'Relativamente nuevo en el mercado'
    ],
    best_for: [
      'Emprendedores sin conocimientos técnicos',
      'Equipos que necesitan MVPs rápidos',
      'Diseñadores que quieren crear funcional',
      'Startups con presupuesto limitado'
    ],
    alternatives: ['Bubble', 'Webflow', 'Framer']
  },

  {
    id: 'bubble',
    name: 'Bubble',
    category: 'No-Code Platforms',
    subcategory: 'Web App Builder',
    description: 'Plataforma visual completa para construir aplicaciones web funcionales sin programar.',
    pricing: 'Gratis básico, Personal $25/mes, Professional $115/mes',
    complexity: 'advanced',
    difficulty_level: 6,
    learning_curve: 'steep',
    community_size: 'large',
    integration_options: ['API REST', 'Zapier', 'Stripe', 'SendGrid', 'AWS S3', 'Custom plugins'],
    tags: ['visual-builder', 'web-apps', 'base-datos', 'workflows', 'responsive'],
    logoPlaceholder: 'photo-1518770660439-4636190af475',
    website: 'https://bubble.io',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'Marketplace como Airbnb o Uber',
      'SaaS completo con suscripciones',
      'Redes sociales nicho',
      'Plataformas de e-learning'
    ],
    comparison_matrix: {
      ease_of_use: 5,
      feature_richness: 10,
      pricing_value: 7,
      support_quality: 8,
      scalability: 9
    },
    similar_tools: ['webflow', 'adalo', 'flutterflow'],
    founded_year: 2012,
    user_rating: 4.1,
    monthly_active_users: '2M+',
    key_features: [
      'Base de datos visual integrada',
      'Workflows automatizados complejos',
      'Sistema de usuarios y permisos',
      'API generator automático'
    ],
    pros: [
      'Capacidades de app completa',
      'Flexibilidad extrema',
      'Escalabilidad empresarial',
      'Ecosistema de plugins robusto'
    ],
    cons: [
      'Curva de aprendizaje pronunciada',
      'Performance puede ser lenta',
      'Precios altos para proyectos grandes'
    ],
    best_for: [
      'Startups que necesitan MVP complejo',
      'Empresas que requieren soluciones custom',
      'Entrepreneurs técnicos',
      'Equipos con tiempo para aprender'
    ],
    alternatives: ['Webflow', 'Adalo', 'Glide']
  },

  {
    id: 'zapier',
    name: 'Zapier',
    category: 'No-Code Platforms',
    subcategory: 'Automation',
    description: 'Plataforma de automatización que conecta más de 5000 aplicaciones sin código.',
    pricing: 'Gratis hasta 100 tareas, Starter $19.99/mes',
    complexity: 'intermediate',
    difficulty_level: 4,
    learning_curve: 'moderate',
    community_size: 'massive',
    integration_options: ['5000+ apps', 'Webhooks', 'API REST', 'Custom integrations'],
    tags: ['automatización', 'workflows', 'integraciones', 'productividad'],
    logoPlaceholder: 'photo-1558655146-d09347e92766',
    website: 'https://zapier.com',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'Automatizar lead generation desde formularios',
      'Sincronizar datos entre CRM y email marketing',
      'Notificaciones automáticas de Slack',
      'Backup automático de archivos importantes'
    ],
    comparison_matrix: {
      ease_of_use: 8,
      feature_richness: 9,
      pricing_value: 7,
      support_quality: 8,
      scalability: 9
    },
    similar_tools: ['make', 'n8n', 'integromat'],
    founded_year: 2011,
    user_rating: 4.5,
    monthly_active_users: '4M+',
    key_features: [
      'Conecta 5000+ aplicaciones',
      'Triggers y acciones automatizadas',
      'Multi-step workflows complejos',
      'Filtros y formateo de datos'
    ],
    pros: [
      'Facilidad de uso extrema',
      'Integraciones más extensas del mercado',
      'Confiabilidad muy alta',
      'Excelente documentación'
    ],
    cons: [
      'Precios pueden escalar rápidamente',
      'Limitaciones en lógica compleja',
      'Dependiente de APIs de terceros'
    ],
    best_for: [
      'Pequeñas y medianas empresas',
      'Automatización de procesos de marketing',
      'Equipos remotos que necesitan sincronización',
      'Usuarios no técnicos'
    ],
    alternatives: ['Make (Integromat)', 'n8n', 'Microsoft Power Automate']
  },

  {
    id: 'make',
    name: 'Make (Integromat)',
    category: 'No-Code Platforms',
    subcategory: 'Automation',
    description: 'Plataforma de automatización visual con workflows complejos y lógica avanzada sin código.',
    pricing: 'Gratis hasta 1000 operaciones, Core $9/mes',
    complexity: 'intermediate',
    difficulty_level: 5,
    learning_curve: 'moderate',
    community_size: 'large',
    integration_options: ['1400+ apps', 'Webhooks', 'HTTP/API', 'FTP', 'Email'],
    tags: ['automatización', 'visual-workflows', 'integraciones', 'lógica-compleja'],
    logoPlaceholder: 'photo-1551288049-bebda4e38f71',
    website: 'https://make.com',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'Automatizaciones complejas de e-commerce',
      'Sincronización de datos entre múltiples sistemas',
      'Workflows de aprobación de contenido',
      'Automatización de reportes y analytics'
    ],
    comparison_matrix: {
      ease_of_use: 7,
      feature_richness: 10,
      pricing_value: 9,
      support_quality: 8,
      scalability: 9
    },
    similar_tools: ['zapier', 'n8n', 'power-automate'],
    founded_year: 2012,
    user_rating: 4.3,
    monthly_active_users: '500K+',
    key_features: [
      'Editor visual de workflows',
      'Lógica condicional avanzada',
      'Manejo de errores robusto',
      'Debugging visual en tiempo real'
    ],
    pros: [
      'Más potente que Zapier para lógica compleja',
      'Interfaz visual muy intuitiva',
      'Precios más competitivos',
      'Mejor manejo de arrays y datos'
    ],
    cons: [
      'Curva de aprendizaje más alta',
      'Menos integraciones que Zapier',
      'Documentación puede ser confusa'
    ],
    best_for: [
      'Equipos técnicos que necesitan automatización avanzada',
      'E-commerce con procesos complejos',
      'Agencias que manejan múltiples clientes',
      'Empresas que valoran precio vs funcionalidad'
    ],
    alternatives: ['Zapier', 'n8n', 'Microsoft Power Automate']
  },

  {
    id: 'airtable',
    name: 'Airtable',
    category: 'No-Code Platforms',
    subcategory: 'Database & Collaboration',
    description: 'Base de datos colaborativa que combina la simplicidad de una spreadsheet con el poder de una base de datos.',
    pricing: 'Gratis hasta 1,000 registros, Plus $10/mes, Pro $20/mes',
    complexity: 'intermediate',
    difficulty_level: 4,
    learning_curve: 'moderate',
    community_size: 'large',
    integration_options: ['Zapier', 'API REST', 'Slack', 'Google Workspace', 'Salesforce'],
    tags: ['base-datos', 'colaborativo', 'spreadsheet', 'workflows', 'CRM'],
    logoPlaceholder: 'photo-1460925895917-afdab827c52f',
    website: 'https://airtable.com',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'CRM para pequeñas empresas',
      'Gestión de proyectos creativos',
      'Inventario y asset management',
      'Planificación de eventos'
    ],
    comparison_matrix: {
      ease_of_use: 8,
      feature_richness: 8,
      pricing_value: 8,
      support_quality: 8,
      scalability: 7
    },
    similar_tools: ['notion', 'monday', 'smartsheet'],
    founded_year: 2012,
    user_rating: 4.6,
    monthly_active_users: '300K+ orgs',
    key_features: [
      'Vistas múltiples (Grid, Calendar, Kanban)',
      'Campos personalizados ricos',
      'Automatizaciones integradas',
      'Formularios y interfaces públicas'
    ],
    pros: [
      'Interfaz muy intuitiva',
      'Flexibilidad de uso',
      'Excelentes integraciones',
      'Plan gratuito generoso'
    ],
    cons: [
      'Limitaciones en registros',
      'Performance lenta con muchos datos',
      'Precios altos para uso intensivo'
    ],
    best_for: [
      'Equipos creativos y de marketing',
      'Pequeñas empresas que necesitan CRM',
      'Gestión de contenido y assets',
      'Proyectos colaborativos'
    ],
    alternatives: ['Notion', 'Monday.com', 'Smartsheet']
  },

  {
    id: 'n8n',
    name: 'n8n',
    category: 'No-Code Platforms',
    subcategory: 'Open Source Automation',
    description: 'Plataforma de automatización open source con nodos visuales y auto-hosting.',
    pricing: 'Open source gratis, Cloud $20/mes',
    complexity: 'advanced',
    difficulty_level: 6,
    learning_curve: 'steep',
    community_size: 'medium',
    integration_options: ['400+ nodes', 'Custom nodes', 'Webhooks', 'API REST', 'Self-hosted'],
    tags: ['open-source', 'automatización', 'self-hosted', 'workflows', 'privacidad'],
    logoPlaceholder: 'photo-1516996087931-5ae405802f9f',
    website: 'https://n8n.io',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'Automatizaciones internas de empresa',
      'Data pipelines complejos',
      'Integraciones custom entre sistemas',
      'Workflows de compliance y auditoría'
    ],
    comparison_matrix: {
      ease_of_use: 6,
      feature_richness: 9,
      pricing_value: 10,
      support_quality: 7,
      scalability: 9
    },
    similar_tools: ['zapier', 'make', 'node-red'],
    founded_year: 2019,
    user_rating: 4.2,
    monthly_active_users: '100K+',
    key_features: [
      'Completamente open source',
      'Self-hosting y control total',
      'Editor visual de nodos',
      'Extensible con código custom'
    ],
    pros: [
      'Control total de datos',
      'No vendor lock-in',
      'Muy extensible',
      'Sin límites en execuciones'
    ],
    cons: [
      'Requiere conocimientos técnicos',
      'Mantenimiento de infraestructura',
      'Menos integraciones pre-hechas'
    ],
    best_for: [
      'Empresas que priorizan privacidad',
      'Equipos técnicos avanzados',
      'Organizaciones con compliance estricto',
      'Desarrolladores que quieren control total'
    ],
    alternatives: ['Zapier', 'Make', 'NodeRED']
  },

  // ====== WEBSITE BUILDERS ======
  {
    id: 'webflow',
    name: 'Webflow',
    category: 'Website Builders',
    subcategory: 'Professional Web Design',
    description: 'Plataforma visual para diseñar, construir y lanzar sitios web responsivos sin código.',
    pricing: 'Gratis básico, Site plan $14/mes, CMS $23/mes',
    complexity: 'advanced',
    difficulty_level: 6,
    learning_curve: 'steep',
    community_size: 'large',
    integration_options: ['Zapier', 'Google Analytics', 'Mailchimp', 'CRM integrations', 'Custom code'],
    tags: ['diseño-web', 'responsive', 'CMS', 'visual-design', 'hosting'],
    logoPlaceholder: 'photo-1460925895917-afdab827c52f',
    website: 'https://webflow.com',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'Sitios web corporativos profesionales',
      'Portfolios de diseñadores y agencias',
      'Landing pages de alta conversión',
      'Blogs y sitios de contenido'
    ],
    comparison_matrix: {
      ease_of_use: 6,
      feature_richness: 9,
      pricing_value: 7,
      support_quality: 8,
      scalability: 8
    },
    similar_tools: ['framer', 'wix', 'squarespace'],
    founded_year: 2013,
    user_rating: 4.4,
    monthly_active_users: '3.5M+',
    key_features: [
      'Editor visual tipo Photoshop para web',
      'CMS integrado y personalizable',
      'Hosting rápido y CDN global',
      'SEO avanzado y clean code'
    ],
    pros: [
      'Control total sobre el diseño',
      'Código limpio y optimizado',
      'Ideal para diseñadores',
      'Hosting incluido de alta calidad'
    ],
    cons: [
      'Curva de aprendizaje muy pronunciada',
      'Precios altos para sitios complejos',
      'Requiere conocimientos de diseño'
    ],
    best_for: [
      'Diseñadores web profesionales',
      'Agencias de marketing digital',
      'Empresas que valoran diseño único',
      'Freelancers creativos'
    ],
    alternatives: ['Framer', 'Figma to Webflow', 'Editor X']
  },

  {
    id: 'framer',
    name: 'Framer',
    category: 'Website Builders',
    subcategory: 'Interactive Design',
    description: 'Herramienta de diseño y prototipado que permite crear sitios web interactivos y animados.',
    pricing: 'Gratis básico, Mini $5/mes, Basic $15/mes',
    complexity: 'intermediate',
    difficulty_level: 5,
    learning_curve: 'moderate',
    community_size: 'medium',
    integration_options: ['Figma', 'Slack', 'GitHub', 'Custom components', 'API integrations'],
    tags: ['prototyping', 'animaciones', 'interactivo', 'diseño', 'React'],
    logoPlaceholder: 'photo-1581291518633-83b4ebd1d83e',
    website: 'https://framer.com',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'Prototipos interactivos de apps',
      'Sitios web con micro-interacciones',
      'Presentaciones de productos dinámicas',
      'Landing pages animadas'
    ],
    comparison_matrix: {
      ease_of_use: 7,
      feature_richness: 8,
      pricing_value: 8,
      support_quality: 7,
      scalability: 7
    },
    similar_tools: ['webflow', 'figma', 'principle'],
    founded_year: 2014,
    user_rating: 4.3,
    monthly_active_users: '1M+',
    key_features: [
      'Animaciones avanzadas y transitions',
      'Componentes reutilizables',
      'Colaboración en tiempo real',
      'Publish directo a web'
    ],
    pros: [
      'Excelente para prototipos interactivos',
      'Animaciones muy fluidas',
      'Integración perfecta con Figma',
      'Curva de aprendizaje razonable'
    ],
    cons: [
      'Limitado para sitios complejos',
      'No es ideal para e-commerce',
      'Performance en sitios grandes'
    ],
    best_for: [
      'Diseñadores UX/UI',
      'Startups que presentan productos',
      'Agencias creativas',
      'Equipos de producto'
    ],
    alternatives: ['Webflow', 'Principle', 'ProtoPie']
  },

  {
    id: 'wordpress',
    name: 'WordPress.com',
    category: 'Website Builders',
    subcategory: 'CMS Platform',
    description: 'Plataforma de gestión de contenido líder mundial para crear sitios web, blogs y tiendas online.',
    pricing: 'Gratis básico, Personal $4/mes, Business $25/mes',
    complexity: 'intermediate',
    difficulty_level: 4,
    learning_curve: 'moderate',
    community_size: 'massive',
    integration_options: ['50,000+ plugins', 'WooCommerce', 'Elementor', 'Yoast SEO', 'Jetpack'],
    tags: ['CMS', 'blog', 'plugins', 'customizable', 'SEO'],
    logoPlaceholder: 'photo-1460925895917-afdab827c52f',
    website: 'https://wordpress.com',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'Blogs profesionales y personales',
      'Sitios web corporativos',
      'Tiendas online con WooCommerce',
      'Portales de noticias y revistas'
    ],
    comparison_matrix: {
      ease_of_use: 7,
      feature_richness: 10,
      pricing_value: 9,
      support_quality: 8,
      scalability: 10
    },
    similar_tools: ['squarespace', 'wix', 'ghost'],
    founded_year: 2003,
    user_rating: 4.2,
    monthly_active_users: '40%+ of web',
    key_features: [
      'Ecosistema masivo de plugins',
      'Temas responsive profesionales',
      'SEO optimizado nativamente',
      'Comunidad global enorme'
    ],
    pros: [
      'Flexibilidad y personalización infinita',
      'Comunidad masiva y soporte',
      'SEO excelente',
      'Escalabilidad probada'
    ],
    cons: [
      'Puede ser abrumador para principiantes',
      'Requiere mantenimiento y actualizaciones',
      'Performance variable según configuración'
    ],
    best_for: [
      'Cualquier tipo de sitio web',
      'Bloggers y creadores de contenido',
      'Empresas que necesitan escalabilidad',
      'Desarrolladores que quieren control'
    ],
    alternatives: ['Squarespace', 'Wix', 'Ghost']
  },

  {
    id: 'squarespace',
    name: 'Squarespace',
    category: 'Website Builders',
    subcategory: 'All-in-One Website Builder',
    description: 'Constructor de sitios web todo-en-uno con templates profesionales y hosting incluido.',
    pricing: 'Personal $16/mes, Business $23/mes, Commerce $27/mes',
    complexity: 'beginner',
    difficulty_level: 3,
    learning_curve: 'gentle',
    community_size: 'large',
    integration_options: ['Google Workspace', 'Mailchimp', 'Stripe', 'PayPal', 'Social media'],
    tags: ['templates', 'todo-en-uno', 'e-commerce', 'profesional', 'hosting'],
    logoPlaceholder: 'photo-1460925895917-afdab827c52f',
    website: 'https://squarespace.com',
    apiAvailable: true,
    freeVersion: false,
    use_case_examples: [
      'Portfolios creativos profesionales',
      'Tiendas online de productos artesanales',
      'Sitios web de restaurantes y servicios',
      'Blogs de estilo de vida'
    ],
    comparison_matrix: {
      ease_of_use: 9,
      feature_richness: 7,
      pricing_value: 7,
      support_quality: 9,
      scalability: 6
    },
    similar_tools: ['wix', 'webflow', 'wordpress'],
    founded_year: 2003,
    user_rating: 4.3,
    monthly_active_users: '4M+ websites',
    key_features: [
      'Templates diseñados profesionalmente',
      'E-commerce integrado',
      'Analytics y SEO incluidos',
      'Hosting y dominio incluidos'
    ],
    pros: [
      'Diseños muy estéticos',
      'Muy fácil de usar',
      'Soporte al cliente excelente',
      'Todo incluido en el precio'
    ],
    cons: [
      'Menos flexibilidad que WordPress',
      'Sin versión gratuita',
      'Limitaciones en customización'
    ],
    best_for: [
      'Creativos y artistas',
      'Pequeñas empresas locales',
      'Usuarios que valoran diseño',
      'Quienes quieren simplicidad'
    ],
    alternatives: ['Wix', 'Webflow', 'WordPress']
  },

  {
    id: 'wix',
    name: 'Wix',
    category: 'Website Builders',
    subcategory: 'Drag & Drop Builder',
    description: 'Constructor de sitios web drag-and-drop con IA integrada y amplio ecosistema de apps.',
    pricing: 'Gratis con ads, Combo $16/mes, Unlimited $22/mes',
    complexity: 'beginner',
    difficulty_level: 2,
    learning_curve: 'immediate',
    community_size: 'massive',
    integration_options: ['Wix App Market', 'Google', 'Facebook', 'Mailchimp', 'Bookings'],
    tags: ['drag-drop', 'AI-builder', 'apps', 'beginner-friendly', 'templates'],
    logoPlaceholder: 'photo-1460925895917-afdab827c52f',
    website: 'https://wix.com',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'Sitios web de pequeñas empresas',
      'Portfolios personales',
      'Tiendas online básicas',
      'Sitios de eventos y reservas'
    ],
    comparison_matrix: {
      ease_of_use: 10,
      feature_richness: 8,
      pricing_value: 8,
      support_quality: 8,
      scalability: 6
    },
    similar_tools: ['squarespace', 'weebly', 'godaddy'],
    founded_year: 2006,
    user_rating: 4.1,
    monthly_active_users: '200M+ users',
    key_features: [
      'ADI (Artificial Design Intelligence)',
      'Editor drag-and-drop completo',
      'App Market con 300+ apps',
      'Templates responsive'
    ],
    pros: [
      'Extremadamente fácil de usar',
      'IA para diseño automático',
      'Plan gratuito disponible',
      'Gran variedad de templates'
    ],
    cons: [
      'Templates no son intercambiables',
      'Código generado no es limpio',
      'Limitaciones en SEO avanzado'
    ],
    best_for: [
      'Principiantes absolutos',
      'Pequeñas empresas locales',
      'Sitios web personales',
      'Prototipado rápido'
    ],
    alternatives: ['Squarespace', 'Weebly', 'GoDaddy Website Builder']
  },

  {
    id: 'ghost',
    name: 'Ghost',
    category: 'Website Builders',
    subcategory: 'Publishing Platform',
    description: 'Plataforma de publicación moderna enfocada en blogs profesionales y newsletters.',
    pricing: 'Starter $9/mes, Creator $25/mes, Team $50/mes',
    complexity: 'intermediate',
    difficulty_level: 4,
    learning_curve: 'moderate',
    community_size: 'medium',
    integration_options: ['Zapier', 'Stripe', 'Mailgun', 'Google Analytics', 'Custom integrations'],
    tags: ['blogging', 'newsletter', 'publishing', 'membership', 'SEO'],
    logoPlaceholder: 'photo-1516996087931-5ae405802f9f',
    website: 'https://ghost.org',
    apiAvailable: true,
    freeVersion: false,
    use_case_examples: [
      'Blogs profesionales y revistas',
      'Newsletters y content subscriptions',
      'Sitios de membership',
      'Publicaciones independientes'
    ],
    comparison_matrix: {
      ease_of_use: 8,
      feature_richness: 7,
      pricing_value: 8,
      support_quality: 8,
      scalability: 8
    },
    similar_tools: ['wordpress', 'medium', 'substack'],
    founded_year: 2013,
    user_rating: 4.4,
    monthly_active_users: '1M+ sites',
    key_features: [
      'Editor moderno y minimalista',
      'Built-in newsletter functionality',
      'Membership y subscriptions',
      'SEO optimizado para contenido'
    ],
    pros: [
      'Enfocado en writing experience',
      'Performance muy rápida',
      'SEO excelente',
      'Monetización integrada'
    ],
    cons: [
      'Menos flexibilidad que WordPress',
      'Ecosistema de plugins limitado',
      'No tiene versión gratuita'
    ],
    best_for: [
      'Bloggers profesionales',
      'Publishers y periodistas',
      'Creators que monetizan contenido',
      'Empresas content-focused'
    ],
    alternatives: ['WordPress', 'Medium', 'Substack']
  },

  // ====== E-COMMERCE PLATFORMS ======
  {
    id: 'shopify',
    name: 'Shopify',
    category: 'E-commerce Platforms',
    subcategory: 'Complete E-commerce',
    description: 'Plataforma completa de comercio electrónico para crear tiendas online profesionales.',
    pricing: 'Basic $29/mes, Shopify $79/mes, Advanced $299/mes',
    complexity: 'intermediate',
    difficulty_level: 4,
    learning_curve: 'moderate',
    community_size: 'massive',
    integration_options: ['Shopify App Store', 'Zapier', 'Facebook', 'Google', 'Mailchimp', 'Klaviyo'],
    tags: ['e-commerce', 'tienda-online', 'pagos', 'inventario', 'dropshipping'],
    logoPlaceholder: 'photo-1556742049-0cfed4f6a45d',
    website: 'https://shopify.com',
    apiAvailable: true,
    freeVersion: false,
    use_case_examples: [
      'Tiendas online de productos físicos',
      'Dropshipping y fulfillment',
      'Suscripciones y productos digitales',
      'Marketplace multi-vendor'
    ],
    comparison_matrix: {
      ease_of_use: 8,
      feature_richness: 9,
      pricing_value: 7,
      support_quality: 9,
      scalability: 10
    },
    similar_tools: ['woocommerce', 'bigcommerce', 'squarespace-commerce'],
    founded_year: 2006,
    user_rating: 4.4,
    monthly_active_users: '2M+ stores',
    key_features: [
      'Hosting y seguridad incluidos',
      'Procesamiento de pagos integrado',
      'App store con 6000+ aplicaciones',
      'Temas profesionales responsivos'
    ],
    pros: [
      'Muy fácil de usar',
      'Soporte técnico excelente',
      'Escalabilidad probada',
      'Ecosistema robusto de apps'
    ],
    cons: [
      'Fees de transacción adicionales',
      'Personalización limitada sin código',
      'Costos pueden acumularse rápidamente'
    ],
    best_for: [
      'Pequeñas y medianas empresas',
      'Emprendedores sin conocimientos técnicos',
      'Negocios que planean escalar',
      'Tiendas que necesitan soporte 24/7'
    ],
    alternatives: ['WooCommerce', 'BigCommerce', 'Squarespace Commerce']
  },

  {
    id: 'woocommerce',
    name: 'WooCommerce',
    category: 'E-commerce Platforms',
    subcategory: 'WordPress E-commerce',
    description: 'Plugin de e-commerce para WordPress que transforma cualquier sitio en tienda online.',
    pricing: 'Plugin gratis, hosting y extensiones variables',
    complexity: 'intermediate',
    difficulty_level: 5,
    learning_curve: 'moderate',
    community_size: 'massive',
    integration_options: ['WordPress ecosystem', 'Payment gateways', 'Shipping providers', 'Marketing tools'],
    tags: ['WordPress', 'plugin', 'open-source', 'customizable', 'flexible'],
    logoPlaceholder: 'photo-1556742049-0cfed4f6a45d',
    website: 'https://woocommerce.com',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'Tiendas integradas en sitios WordPress',
      'E-commerce con contenido rico',
      'Tiendas con necesidades muy específicas',
      'Marketplaces y multi-vendor'
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
    user_rating: 4.3,
    monthly_active_users: '5M+ stores',
    key_features: [
      'Integración total con WordPress',
      'Personalización ilimitada',
      'Gestión completa de inventario',
      'Extensiones para todo'
    ],
    pros: [
      'Completamente gratis para empezar',
      'Flexibilidad total',
      'SEO excelente con WordPress',
      'Control completo de datos'
    ],
    cons: [
      'Requiere conocimientos técnicos',
      'Necesita hosting y mantenimiento',
      'Performance dependiente de hosting'
    ],
    best_for: [
      'Negocios que ya usan WordPress',
      'Tiendas que necesitan customización',
      'Empresas con equipo técnico',
      'Presupuestos ajustados'
    ],
    alternatives: ['Shopify', 'Magento', 'PrestaShop']
  },

  {
    id: 'bigcommerce',
    name: 'BigCommerce',
    category: 'E-commerce Platforms',
    subcategory: 'Enterprise E-commerce',
    description: 'Plataforma de e-commerce escalable con funciones avanzadas y sin fees de transacción.',
    pricing: 'Standard $29/mes, Plus $79/mes, Pro $299/mes',
    complexity: 'intermediate',
    difficulty_level: 5,
    learning_curve: 'moderate',
    community_size: 'large',
    integration_options: ['450+ integrations', 'API-first', 'Headless commerce', 'Multi-channel'],
    tags: ['enterprise', 'API-first', 'multi-channel', 'scalable', 'sin-fees'],
    logoPlaceholder: 'photo-1556742049-0cfed4f6a45d',
    website: 'https://bigcommerce.com',
    apiAvailable: true,
    freeVersion: false,
    use_case_examples: [
      'Empresas en crecimiento rápido',
      'Tiendas multi-canal (online + offline)',
      'B2B y wholesale',
      'Headless commerce implementations'
    ],
    comparison_matrix: {
      ease_of_use: 7,
      feature_richness: 9,
      pricing_value: 8,
      support_quality: 8,
      scalability: 10
    },
    similar_tools: ['shopify', 'commercetools', 'magento'],
    founded_year: 2009,
    user_rating: 4.2,
    monthly_active_users: '60K+ stores',
    key_features: [
      'Sin fees de transacción',
      'API-first architecture',
      'Multi-channel selling',
      'Advanced SEO tools'
    ],
    pros: [
      'Sin límites en ventas o bandwidth',
      'Excelente para empresas en crecimiento',
      'APIs muy robustas',
      'SEO superior'
    ],
    cons: [
      'Temas menos atractivos que Shopify',
      'Curva de aprendizaje más alta',
      'Menor ecosistema de apps'
    ],
    best_for: [
      'Empresas medianas y grandes',
      'Negocios con alto volumen',
      'Tiendas que venden en múltiples canales',
      'Desarrolladores que necesitan APIs'
    ],
    alternatives: ['Shopify Plus', 'Magento Commerce', 'CommerceTools']
  },

  {
    id: 'gumroad',
    name: 'Gumroad',
    category: 'E-commerce Platforms',
    subcategory: 'Digital Products',
    description: 'Plataforma especializada en venta de productos digitales con setup mínimo.',
    pricing: 'Gratis + 10% fee, Premium $10/mes + 3.5% fee',
    complexity: 'beginner',
    difficulty_level: 2,
    learning_curve: 'immediate',
    community_size: 'medium',
    integration_options: ['PayPal', 'Stripe', 'Email marketing', 'Analytics', 'Affiliate program'],
    tags: ['productos-digitales', 'creators', 'simple', 'affiliate', 'instant-setup'],
    logoPlaceholder: 'photo-1556742049-0cfed4f6a45d',
    website: 'https://gumroad.com',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'Venta de cursos online y ebooks',
      'Software y templates',
      'Arte digital y NFTs',
      'Música y contenido multimedia'
    ],
    comparison_matrix: {
      ease_of_use: 10,
      feature_richness: 6,
      pricing_value: 8,
      support_quality: 7,
      scalability: 6
    },
    similar_tools: ['lemonsqueezy', 'sellfy', 'payhip'],
    founded_year: 2011,
    user_rating: 4.1,
    monthly_active_users: '1M+ creators',
    key_features: [
      'Setup en minutos',
      'Affiliate program automático',
      'Checkout optimizado',
      'Analytics detallados'
    ],
    pros: [
      'Extremadamente fácil de usar',
      'Perfecto para digital products',
      'Programa de afiliados incluido',
      'Fees competitivos'
    ],
    cons: [
      'Limitado para productos físicos',
      'Personalización limitada',
      'Dependiente de su plataforma'
    ],
    best_for: [
      'Creators y artistas digitales',
      'Educadores online',
      'Desarrolladores indie',
      'Cualquiera vendiendo productos digitales'
    ],
    alternatives: ['Lemon Squeezy', 'Sellfy', 'Payhip']
  },

  // ====== DESIGN & PROTOTYPING ======
  {
    id: 'figma',
    name: 'Figma',
    category: 'Design & Prototyping',
    subcategory: 'UI/UX Design',
    description: 'Herramienta de diseño colaborativo en la nube para crear interfaces, prototipos y sistemas de diseño.',
    pricing: 'Gratis hasta 3 proyectos, Professional $12/mes, Organization $45/mes',
    complexity: 'intermediate',
    difficulty_level: 4,
    learning_curve: 'moderate',
    community_size: 'massive',
    integration_options: ['Slack', 'Jira', 'Miro', 'Principle', 'Webflow', 'Developer handoff'],
    tags: ['diseño-UI', 'prototipado', 'colaborativo', 'vectorial', 'componentes'],
    logoPlaceholder: 'photo-1541462608143-67571c6738dd',
    website: 'https://figma.com',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'Diseño de interfaces móviles y web',
      'Sistemas de diseño empresariales',
      'Prototipos interactivos de alta fidelidad',
      'Colaboración entre diseño y desarrollo'
    ],
    comparison_matrix: {
      ease_of_use: 8,
      feature_richness: 9,
      pricing_value: 9,
      support_quality: 8,
      scalability: 9
    },
    similar_tools: ['sketch', 'adobe-xd', 'invision'],
    founded_year: 2016,
    user_rating: 4.7,
    monthly_active_users: '4M+',
    key_features: [
      'Colaboración en tiempo real',
      'Componentes y design systems',
      'Prototipado interactivo',
      'Handoff automático a desarrollo'
    ],
    pros: [
      'Colaboración excepcional',
      'Funciona en cualquier dispositivo',
      'Plan gratuito muy generoso',
      'Actualizaciones constantes'
    ],
    cons: [
      'Requiere conexión a internet',
      'Performance en archivos muy grandes',
      'Curva de aprendizaje para principiantes'
    ],
    best_for: [
      'Equipos de diseño colaborativos',
      'Startups y empresas ágiles',
      'Diseñadores freelance',
      'Equipos remotos'
    ],
    alternatives: ['Sketch', 'Adobe XD', 'InVision Studio']
  },

  {
    id: 'sketch',
    name: 'Sketch',
    category: 'Design & Prototyping',
    subcategory: 'UI/UX Design',
    description: 'Herramienta de diseño vectorial para Mac especializada en diseño de interfaces digitales.',
    pricing: 'Individual $10/mes, Team $20/mes por editor',
    complexity: 'intermediate',
    difficulty_level: 4,
    learning_curve: 'moderate',
    community_size: 'large',
    integration_options: ['Sketch Cloud', 'InVision', 'Zeplin', 'Principle', 'Plugins ecosystem'],
    tags: ['Mac-only', 'vectorial', 'UI-design', 'symbols', 'plugins'],
    logoPlaceholder: 'photo-1541462608143-67571c6738dd',
    website: 'https://sketch.com',
    apiAvailable: true,
    freeVersion: false,
    use_case_examples: [
      'Diseño de apps iOS y macOS',
      'Interfaces web responsive',
      'Iconografía y sistemas visuales',
      'Wireframes y mockups'
    ],
    comparison_matrix: {
      ease_of_use: 8,
      feature_richness: 8,
      pricing_value: 7,
      support_quality: 8,
      scalability: 7
    },
    similar_tools: ['figma', 'adobe-xd', 'affinity-designer'],
    founded_year: 2010,
    user_rating: 4.5,
    monthly_active_users: '1M+',
    key_features: [
      'Diseño vectorial preciso',
      'Symbols y nested symbols',
      'Ecosistema rico de plugins',
      'Colaboración con Sketch Cloud'
    ],
    pros: [
      'Herramientas de diseño muy precisas',
      'Excelente para diseño de iconos',
      'Plugins community muy activa',
      'Performance optimizada para Mac'
    ],
    cons: [
      'Solo disponible para Mac',
      'Colaboración limitada vs Figma',
      'Sin versión gratuita'
    ],
    best_for: [
      'Diseñadores que usan Mac',
      'Equipos que priorizan herramientas nativas',
      'Diseño de apps Apple',
      'Trabajos de ilustración precisa'
    ],
    alternatives: ['Figma', 'Adobe XD', 'Affinity Designer']
  },

  {
    id: 'adobe-xd',
    name: 'Adobe XD',
    category: 'Design & Prototyping',
    subcategory: 'UI/UX Design',
    description: 'Herramienta de Adobe para diseño y prototipado de experiencias de usuario.',
    pricing: 'Gratis básico, Individual $9.99/mes, Team $22.99/mes',
    complexity: 'intermediate',
    difficulty_level: 4,
    learning_curve: 'moderate',
    community_size: 'large',
    integration_options: ['Creative Cloud', 'Photoshop', 'Illustrator', 'After Effects', 'Third-party plugins'],
    tags: ['Adobe', 'prototyping', 'Creative-Cloud', 'voice-UI', 'animations'],
    logoPlaceholder: 'photo-1541462608143-67571c6738dd',
    website: 'https://adobe.com/products/xd',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'Prototipos de apps móviles',
      'Wireframes y user flows',
      'Voice UI y conversational design',
      'Handoff a desarrolladores'
    ],
    comparison_matrix: {
      ease_of_use: 7,
      feature_richness: 8,
      pricing_value: 8,
      support_quality: 8,
      scalability: 8
    },
    similar_tools: ['figma', 'sketch', 'invision'],
    founded_year: 2016,
    user_rating: 4.2,
    monthly_active_users: '1M+',
    key_features: [
      'Prototipado avanzado con transiciones',
      'Voice prototyping',
      'Integración con Creative Cloud',
      'Auto-animate y micro-interactions'
    ],
    pros: [
      'Integración perfecta con Adobe',
      'Voice UI capabilities únicas',
      'Auto-animate muy potente',
      'Plan gratuito útil'
    ],
    cons: [
      'Menos adoption que Figma',
      'Performance variable',
      'Colaboración limitada'
    ],
    best_for: [
      'Equipos que ya usan Adobe',
      'Diseñadores que necesitan voice UI',
      'Proyectos con mucha animación',
      'Workflows Creative Cloud'
    ],
    alternatives: ['Figma', 'Sketch', 'InVision Studio']
  },

  {
    id: 'canva',
    name: 'Canva',
    category: 'Design & Prototyping',
    subcategory: 'Graphic Design',
    description: 'Plataforma de diseño gráfico simplificada con templates y herramientas drag-and-drop.',
    pricing: 'Gratis básico, Pro $12.99/mes, Team $14.99/mes por usuario',
    complexity: 'beginner',
    difficulty_level: 2,
    learning_curve: 'immediate',
    community_size: 'massive',
    integration_options: ['Social media', 'Google Drive', 'Dropbox', 'Content planner', 'Print services'],
    tags: ['graphic-design', 'templates', 'social-media', 'marketing', 'beginner-friendly'],
    logoPlaceholder: 'photo-1541462608143-67571c6738dd',
    website: 'https://canva.com',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'Posts para redes sociales',
      'Presentaciones empresariales',
      'Marketing materials y flyers',
      'Logos y branding básico'
    ],
    comparison_matrix: {
      ease_of_use: 10,
      feature_richness: 7,
      pricing_value: 9,
      support_quality: 8,
      scalability: 6
    },
    similar_tools: ['adobe-illustrator', 'piktochart', 'crello'],
    founded_year: 2012,
    user_rating: 4.6,
    monthly_active_users: '100M+',
    key_features: [
      '250,000+ templates profesionales',
      'Drag-and-drop editor',
      'Brand kit y assets',
      'Colaboración en equipo'
    ],
    pros: [
      'Extremadamente fácil de usar',
      'Templates de alta calidad',
      'Plan gratuito muy útil',
      'Perfecto para no-diseñadores'
    ],
    cons: [
      'Limitado para diseño avanzado',
      'Dependiente de templates',
      'Menos control creativo'
    ],
    best_for: [
      'Small business owners',
      'Social media managers',
      'Usuarios sin experiencia en diseño',
      'Marketing teams pequeños'
    ],
    alternatives: ['Adobe Creative Suite', 'PiktoChart', 'Crello']
  },

  // ====== DEVELOPMENT TOOLS ======
  {
    id: 'github',
    name: 'GitHub',
    category: 'Development Tools',
    subcategory: 'Version Control',
    description: 'Plataforma de desarrollo colaborativo para alojar y revisar código usando Git.',
    pricing: 'Gratis para proyectos públicos, Pro $4/mes, Team $4/usuario/mes',
    complexity: 'intermediate',
    difficulty_level: 5,
    learning_curve: 'moderate',
    community_size: 'massive',
    integration_options: ['CI/CD', 'Slack', 'Jira', 'VS Code', 'Zapier', 'Third-party apps'],
    tags: ['git', 'version-control', 'colaborativo', 'open-source', 'hosting'],
    logoPlaceholder: 'photo-1618401471353-b98afee0b2eb',
    website: 'https://github.com',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'Hosting de repositorios de código',
      'Colaboración en proyectos open source',
      'CI/CD y automatización de deployments',
      'Documentación y wikis de proyectos'
    ],
    comparison_matrix: {
      ease_of_use: 7,
      feature_richness: 10,
      pricing_value: 9,
      support_quality: 8,
      scalability: 10
    },
    similar_tools: ['gitlab', 'bitbucket', 'azure-devops'],
    founded_year: 2008,
    user_rating: 4.6,
    monthly_active_users: '100M+',
    key_features: [
      'Repositorios ilimitados públicos/privados',
      'Pull requests y code review',
      'GitHub Actions para CI/CD',
      'Issues y project management'
    ],
    pros: [
      'Estándar de la industria',
      'Comunidad masiva',
      'Integración perfecta con herramientas dev',
      'GitHub Pages gratuito'
    ],
    cons: [
      'Curva de aprendizaje para Git',
      'Interfaz puede ser abrumadora',
      'Limitaciones en plan gratuito'
    ],
    best_for: [
      'Cualquier proyecto de desarrollo',
      'Equipos de desarrollo de cualquier tamaño',
      'Proyectos open source',
      'Desarrolladores individuales'
    ],
    alternatives: ['GitLab', 'Bitbucket', 'Azure DevOps']
  },

  {
    id: 'vercel',
    name: 'Vercel',
    category: 'Development Tools',
    subcategory: 'Hosting & Deployment',
    description: 'Plataforma de deployment y hosting optimizada para aplicaciones frontend y serverless.',
    pricing: 'Gratis generoso, Pro $20/mes, Team $30/usuario/mes',
    complexity: 'intermediate',
    difficulty_level: 3,
    learning_curve: 'gentle',
    community_size: 'large',
    integration_options: ['GitHub', 'GitLab', 'Bitbucket', 'Next.js', 'React', 'Svelte'],
    tags: ['hosting', 'deployment', 'serverless', 'CDN', 'frontend'],
    logoPlaceholder: 'photo-1565106430482-8f6e74349ca1',
    website: 'https://vercel.com',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'Deploy automático de apps React/Next.js',
      'Landing pages de alta performance',
      'JAMstack sites con APIs serverless',
      'Preview deployments para testing'
    ],
    comparison_matrix: {
      ease_of_use: 9,
      feature_richness: 8,
      pricing_value: 9,
      support_quality: 8,
      scalability: 9
    },
    similar_tools: ['netlify', 'aws-amplify', 'railway'],
    founded_year: 2015,
    user_rating: 4.5,
    monthly_active_users: '1M+ developers',
    key_features: [
      'Deploy automático desde Git',
      'Edge network global',
      'Serverless functions integradas',
      'Preview deployments instantáneos'
    ],
    pros: [
      'Deploy increíblemente fácil',
      'Performance excepcional',
      'Plan gratuito muy generoso',
      'Integración perfecta con Next.js'
    ],
    cons: [
      'Optimizado principalmente para frontend',
      'Limitaciones en backend tradicional',
      'Costos pueden crecer con tráfico alto'
    ],
    best_for: [
      'Desarrolladores frontend/fullstack',
      'Proyectos Next.js y React',
      'JAMstack developers',
      'Startups que necesitan hosting rápido'
    ],
    alternatives: ['Netlify', 'AWS Amplify', 'Railway']
  },

  {
    id: 'netlify',
    name: 'Netlify',
    category: 'Development Tools',
    subcategory: 'Hosting & Deployment',
    description: 'Plataforma de hosting y deployment para sitios estáticos y aplicaciones JAMstack.',
    pricing: 'Gratis generoso, Pro $19/mes, Business $99/mes',
    complexity: 'intermediate',
    difficulty_level: 3,
    learning_curve: 'gentle',
    community_size: 'large',
    integration_options: ['Git providers', 'Build tools', 'Forms', 'Identity', 'Functions'],
    tags: ['jamstack', 'static-sites', 'forms', 'functions', 'git-based'],
    logoPlaceholder: 'photo-1565106430482-8f6e74349ca1',
    website: 'https://netlify.com',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'Sitios estáticos y blogs',
      'Landing pages con formularios',
      'Aplicaciones React/Vue/Angular',
      'Sitios de documentación'
    ],
    comparison_matrix: {
      ease_of_use: 9,
      feature_richness: 8,
      pricing_value: 9,
      support_quality: 8,
      scalability: 8
    },
    similar_tools: ['vercel', 'github-pages', 'surge'],
    founded_year: 2014,
    user_rating: 4.4,
    monthly_active_users: '1M+ sites',
    key_features: [
      'Deploy automático desde Git',
      'Forms handling sin backend',
      'Serverless functions',
      'Split testing integrado'
    ],
    pros: [
      'Muy fácil deploy desde Git',
      'Excelente para sitios estáticos',
      'Forms sin configuración',
      'Plan gratuito generoso'
    ],
    cons: [
      'Limitado para aplicaciones complejas',
      'Build times pueden ser lentos',
      'Menos optimizado para React que Vercel'
    ],
    best_for: [
      'Sitios estáticos y JAMstack',
      'Desarrolladores frontend',
      'Blogs y sitios de contenido',
      'Prototipos y demos'
    ],
    alternatives: ['Vercel', 'GitHub Pages', 'Surge.sh']
  },

  {
    id: 'railway',
    name: 'Railway',
    category: 'Development Tools',
    subcategory: 'Full-Stack Hosting',
    description: 'Plataforma de deployment simplificada para aplicaciones full-stack con bases de datos.',
    pricing: 'Developer $5/mes, Team $20/mes por usuario',
    complexity: 'intermediate',
    difficulty_level: 4,
    learning_curve: 'gentle',
    community_size: 'medium',
    integration_options: ['GitHub', 'Docker', 'PostgreSQL', 'MySQL', 'Redis'],
    tags: ['full-stack', 'databases', 'containers', 'simple-deploy', 'backend'],
    logoPlaceholder: 'photo-1565106430482-8f6e74349ca1',
    website: 'https://railway.app',
    apiAvailable: true,
    freeVersion: false,
    use_case_examples: [
      'APIs backend con bases de datos',
      'Aplicaciones Django/Rails',
      'Microservicios y containers',
      'Bots y scheduled jobs'
    ],
    comparison_matrix: {
      ease_of_use: 9,
      feature_richness: 7,
      pricing_value: 8,
      support_quality: 7,
      scalability: 8
    },
    similar_tools: ['heroku', 'render', 'digital-ocean'],
    founded_year: 2020,
    user_rating: 4.3,
    monthly_active_users: '100K+ developers',
    key_features: [
      'Deploy sin configuración',
      'Bases de datos con un click',
      'Environment variables management',
      'Automatic SSL y custom domains'
    ],
    pros: [
      'Extremadamente simple de usar',
      'Excelente para full-stack apps',
      'Pricing predecible',
      'Setup de DB instantáneo'
    ],
    cons: [
      'Menos features que AWS',
      'Comunidad más pequeña',
      'Sin plan gratuito permanente'
    ],
    best_for: [
      'Developers que quieren simplicidad',
      'Startups con full-stack apps',
      'Proyectos que necesitan DB rápida',
      'Migración desde Heroku'
    ],
    alternatives: ['Heroku', 'Render', 'DigitalOcean App Platform']
  },

  // ====== DATABASE & BACKEND ======
  {
    id: 'supabase',
    name: 'Supabase',
    category: 'Database & Backend',
    subcategory: 'Backend as a Service',
    description: 'Alternativa open source a Firebase con PostgreSQL, autenticación y APIs en tiempo real.',
    pricing: 'Gratis hasta 2 proyectos, Pro $25/proyecto/mes',
    complexity: 'intermediate',
    difficulty_level: 4,
    learning_curve: 'moderate',
    community_size: 'large',
    integration_options: ['PostgreSQL', 'Auth providers', 'Webhooks', 'Edge functions', 'Realtime'],
    tags: ['database', 'backend', 'PostgreSQL', 'auth', 'realtime', 'open-source'],
    logoPlaceholder: 'photo-1516996087931-5ae405802f9f',
    website: 'https://supabase.com',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'Apps con autenticación de usuarios',
      'Dashboards con datos en tiempo real',
      'APIs REST automáticas',
      'Chat apps y colaboración'
    ],
    comparison_matrix: {
      ease_of_use: 8,
      feature_richness: 9,
      pricing_value: 9,
      support_quality: 8,
      scalability: 8
    },
    similar_tools: ['firebase', 'aws-amplify', 'planetscale'],
    founded_year: 2020,
    user_rating: 4.6,
    monthly_active_users: '500K+ developers',
    key_features: [
      'PostgreSQL completo en la nube',
      'Autenticación social y email',
      'APIs REST y GraphQL automáticas',
      'Subscripciones en tiempo real'
    ],
    pros: [
      'Open source y transparente',
      'PostgreSQL completo (no NoSQL limitado)',
      'Muy fácil de empezar',
      'Excelente relación precio-valor'
    ],
    cons: [
      'Más nuevo que Firebase',
      'Menos integraciones third-party',
      'Documentación en evolución'
    ],
    best_for: [
      'Desarrolladores que prefieren SQL',
      'Startups conscientes de vendor lock-in',
      'Apps que necesitan funcionalidad completa de DB',
      'Proyectos que valoran open source'
    ],
    alternatives: ['Firebase', 'AWS Amplify', 'PlanetScale']
  },

  {
    id: 'firebase',
    name: 'Firebase',
    category: 'Database & Backend',
    subcategory: 'Backend as a Service',
    description: 'Plataforma de Google para desarrollo de aplicaciones con base de datos NoSQL y servicios backend.',
    pricing: 'Spark gratis, Blaze pay-as-you-go',
    complexity: 'intermediate',
    difficulty_level: 4,
    learning_curve: 'moderate',
    community_size: 'massive',
    integration_options: ['Google Cloud', 'Analytics', 'AdMob', 'ML Kit', 'Third-party services'],
    tags: ['Google', 'NoSQL', 'realtime', 'analytics', 'hosting', 'functions'],
    logoPlaceholder: 'photo-1516996087931-5ae405802f9f',
    website: 'https://firebase.google.com',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'Apps móviles con sync en tiempo real',
      'Chat applications y social apps',
      'Analytics y crash reporting',
      'Hosting de SPAs y static sites'
    ],
    comparison_matrix: {
      ease_of_use: 8,
      feature_richness: 10,
      pricing_value: 8,
      support_quality: 9,
      scalability: 10
    },
    similar_tools: ['supabase', 'aws-amplify', 'mongodb'],
    founded_year: 2011,
    user_rating: 4.4,
    monthly_active_users: '3M+ apps',
    key_features: [
      'Firestore NoSQL database',
      'Authentication providers múltiples',
      'Cloud Functions serverless',
      'Analytics y performance monitoring'
    ],
    pros: [
      'Ecosistema Google completo',
      'Escalabilidad masiva',
      'Documentación excelente',
      'Integración con Google Cloud'
    ],
    cons: [
      'Vendor lock-in con Google',
      'Pricing puede ser impredecible',
      'NoSQL puede ser limitante'
    ],
    best_for: [
      'Apps móviles (especialmente Android)',
      'Aplicaciones que necesitan analytics',
      'Startups que valoran ecosystem completo',
      'Proyectos que escalarán masivamente'
    ],
    alternatives: ['Supabase', 'AWS Amplify', 'MongoDB Atlas']
  },

  {
    id: 'planetscale',
    name: 'PlanetScale',
    category: 'Database & Backend',
    subcategory: 'Serverless Database',
    description: 'Base de datos MySQL serverless con branching como Git y escalabilidad automática.',
    pricing: 'Hobby gratis, Scaler $29/mes, Pro $39/mes',
    complexity: 'intermediate',
    difficulty_level: 5,
    learning_curve: 'moderate',
    community_size: 'medium',
    integration_options: ['Prisma', 'Drizzle', 'MySQL drivers', 'GraphQL', 'REST APIs'],
    tags: ['MySQL', 'serverless', 'branching', 'vitess', 'database-ops'],
    logoPlaceholder: 'photo-1516996087931-5ae405802f9f',
    website: 'https://planetscale.com',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'APIs con MySQL que necesitan escalar',
      'E-commerce con alta concurrencia',
      'SaaS con multi-tenancy',
      'Apps con database branching workflow'
    ],
    comparison_matrix: {
      ease_of_use: 7,
      feature_richness: 8,
      pricing_value: 8,
      support_quality: 8,
      scalability: 10
    },
    similar_tools: ['supabase', 'mysql', 'aws-rds'],
    founded_year: 2018,
    user_rating: 4.5,
    monthly_active_users: '50K+ developers',
    key_features: [
      'Database branching y merging',
      'Auto-scaling horizontal',
      'Schema migrations sin downtime',
      'Insights y query performance'
    ],
    pros: [
      'Branching revolucionario para DB',
      'Performance excepcional',
      'Escalabilidad automática',
      'Developer experience superior'
    ],
    cons: [
      'Solo MySQL (no PostgreSQL)',
      'Relativamente caro',
      'Curva de aprendizaje para branching'
    ],
    best_for: [
      'Aplicaciones MySQL de alto tráfico',
      'Equipos que valoran DB ops avanzadas',
      'E-commerce y SaaS escalables',
      'Developers que quieren Git-like workflow'
    ],
    alternatives: ['AWS RDS', 'Google Cloud SQL', 'Supabase']
  },

  // ====== COMMUNICATION ======
  {
    id: 'slack',
    name: 'Slack',
    category: 'Communication',
    subcategory: 'Team Messaging',
    description: 'Plataforma de comunicación empresarial con canales, mensajería directa e integraciones.',
    pricing: 'Gratis básico, Pro $7.25/usuario/mes, Business+ $12.50/usuario/mes',
    complexity: 'beginner',
    difficulty_level: 2,
    learning_curve: 'immediate',
    community_size: 'massive',
    integration_options: ['2000+ apps', 'Zapier', 'Google Workspace', 'Microsoft 365', 'Custom bots'],
    tags: ['comunicación', 'equipos', 'chat', 'integraciones', 'productividad'],
    logoPlaceholder: 'photo-1611224923853-80b023f02d71',
    website: 'https://slack.com',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'Comunicación de equipos remotos',
      'Canales por proyecto o departamento',
      'Integraciones con herramientas de trabajo',
      'Bots para automatización de tareas'
    ],
    comparison_matrix: {
      ease_of_use: 9,
      feature_richness: 8,
      pricing_value: 7,
      support_quality: 8,
      scalability: 9
    },
    similar_tools: ['microsoft-teams', 'discord', 'mattermost'],
    founded_year: 2013,
    user_rating: 4.3,
    monthly_active_users: '12M+',
    key_features: [
      'Canales organizados por temas',
      'Mensajería directa y grupal',
      'Llamadas de voz y video',
      'Historial de mensajes buscable'
    ],
    pros: [
      'Interfaz muy intuitiva',
      'Excelentes integraciones',
      'Búsqueda poderosa',
      'Cultura de empresa establecida'
    ],
    cons: [
      'Puede ser distractor',
      'Precios altos para equipos grandes',
      'Limitaciones en plan gratuito'
    ],
    best_for: [
      'Equipos remotos y distribuidos',
      'Startups tech-savvy',
      'Empresas que valoran integraciones',
      'Equipos creativos y ágiles'
    ],
    alternatives: ['Microsoft Teams', 'Discord', 'Google Chat']
  },

  {
    id: 'discord',
    name: 'Discord',
    category: 'Communication',
    subcategory: 'Community Platform',
    description: 'Plataforma de comunicación por voz, video y texto diseñada para crear comunidades.',
    pricing: 'Gratis, Nitro $9.99/mes, Nitro Basic $2.99/mes',
    complexity: 'beginner',
    difficulty_level: 2,
    learning_curve: 'immediate',
    community_size: 'massive',
    integration_options: ['Bots ecosystem', 'Webhooks', 'Screen sharing', 'Game integrations'],
    tags: ['gaming', 'comunidades', 'voz', 'bots', 'servidores'],
    logoPlaceholder: 'photo-1611224923853-80b023f02d71',
    website: 'https://discord.com',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'Comunidades de gaming y hobbies',
      'Equipos de desarrollo y tech',
      'Grupos de estudio y educación',
      'Eventos virtuales y meetups'
    ],
    comparison_matrix: {
      ease_of_use: 9,
      feature_richness: 8,
      pricing_value: 10,
      support_quality: 7,
      scalability: 9
    },
    similar_tools: ['slack', 'telegram', 'teamspeak'],
    founded_year: 2015,
    user_rating: 4.5,
    monthly_active_users: '150M+',
    key_features: [
      'Servidores con canales múltiples',
      'Voice channels de alta calidad',
      'Bots y automatización',
      'Screen sharing y streaming'
    ],
    pros: [
      'Completamente gratis para uso básico',
      'Excelente calidad de audio',
      'Comunidades muy activas',
      'Ecosistema de bots robusto'
    ],
    cons: [
      'Puede ser ruidoso y distractivo',
      'No ideal para comunicación empresarial',
      'Moderación de contenido variable'
    ],
    best_for: [
      'Comunidades de gaming',
      'Equipos creativos informales',
      'Educación y grupos de estudio',
      'Eventos y conferencias virtuales'
    ],
    alternatives: ['Slack', 'Telegram', 'Clubhouse']
  },

  // ====== PROJECT MANAGEMENT ======
  {
    id: 'notion',
    name: 'Notion',
    category: 'Project Management',
    subcategory: 'All-in-One Workspace',
    description: 'Workspace todo-en-uno que combina notas, bases de datos, wikis y gestión de proyectos.',
    pricing: 'Gratis individual, Plus $8/usuario/mes, Business $15/usuario/mes',
    complexity: 'intermediate',
    difficulty_level: 4,
    learning_curve: 'moderate',
    community_size: 'massive',
    integration_options: ['Slack', 'Google Calendar', 'Zapier', 'Figma', 'GitHub', 'API'],
    tags: ['productividad', 'notas', 'base-datos', 'wiki', 'colaborativo'],
    logoPlaceholder: 'photo-1586281380614-a1d62c273cd5',
    website: 'https://notion.so',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'Documentación y wikis de empresa',
      'Gestión de proyectos y roadmaps',
      'Base de conocimiento personal',
      'CRM simple y tracking de leads'
    ],
    comparison_matrix: {
      ease_of_use: 7,
      feature_richness: 10,
      pricing_value: 9,
      support_quality: 7,
      scalability: 8
    },
    similar_tools: ['obsidian', 'airtable', 'confluence'],
    founded_year: 2016,
    user_rating: 4.4,
    monthly_active_users: '20M+',
    key_features: [
      'Bloques flexibles para cualquier contenido',
      'Bases de datos relacionales',
      'Templates y galería comunitaria',
      'Colaboración en tiempo real'
    ],
    pros: [
      'Flexibilidad extrema',
      'Plan gratuito muy generoso',
      'Comunidad muy activa',
      'Constante innovación'
    ],
    cons: [
      'Curva de aprendizaje pronunciada',
      'Performance lenta con mucho contenido',
      'Puede ser abrumador para usuarios simples'
    ],
    best_for: [
      'Equipos que necesitan máxima flexibilidad',
      'Startups y empresas ágiles',
      'Knowledge workers',
      'Usuarios que aman personalizar'
    ],
    alternatives: ['Obsidian', 'Airtable', 'Confluence']
  },

  {
    id: 'trello',
    name: 'Trello',
    category: 'Project Management',
    subcategory: 'Kanban Boards',
    description: 'Herramienta visual de gestión de proyectos basada en tableros Kanban.',
    pricing: 'Gratis básico, Standard $5/usuario/mes, Premium $10/usuario/mes',
    complexity: 'beginner',
    difficulty_level: 1,
    learning_curve: 'immediate',
    community_size: 'massive',
    integration_options: ['Power-Ups', 'Slack', 'Google Drive', 'GitHub', 'Zapier'],
    tags: ['kanban', 'visual', 'simple', 'tarjetas', 'colaborativo'],
    logoPlaceholder: 'photo-1611224923853-80b023f02d71',
    website: 'https://trello.com',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'Gestión de tareas personales',
      'Proyectos pequeños de equipo',
      'Editorial calendar para contenido',
      'Organización de eventos'
    ],
    comparison_matrix: {
      ease_of_use: 10,
      feature_richness: 6,
      pricing_value: 9,
      support_quality: 8,
      scalability: 6
    },
    similar_tools: ['asana', 'monday', 'clickup'],
    founded_year: 2011,
    user_rating: 4.2,
    monthly_active_users: '50M+',
    key_features: [
      'Tableros, listas y tarjetas visuales',
      'Power-Ups para funcionalidad extra',
      'Colaboración simple en equipo',
      'Apps móviles completas'
    ],
    pros: [
      'Extremadamente fácil de usar',
      'Perfecto para equipos pequeños',
      'Plan gratuito muy útil',
      'Metáfora visual intuitiva'
    ],
    cons: [
      'Limitado para proyectos complejos',
      'Faltan funciones avanzadas de PM',
      'Escalabilidad limitada'
    ],
    best_for: [
      'Equipos pequeños y ágiles',
      'Proyectos simples y visuales',
      'Usuarios que prefieren simplicidad',
      'Gestión personal de tareas'
    ],
    alternatives: ['Asana', 'Monday.com', 'ClickUp']
  },

  {
    id: 'asana',
    name: 'Asana',
    category: 'Project Management',
    subcategory: 'Team Collaboration',
    description: 'Plataforma de gestión de proyectos y equipos con múltiples vistas y automatización.',
    pricing: 'Gratis hasta 15 usuarios, Starter $10.99/mes, Advanced $24.99/mes',
    complexity: 'intermediate',
    difficulty_level: 4,
    learning_curve: 'moderate',
    community_size: 'large',
    integration_options: ['Slack', 'Google Workspace', 'Adobe', 'Salesforce', '200+ apps'],
    tags: ['project-management', 'tasks', 'timeline', 'goals', 'portfolios'],
    logoPlaceholder: 'photo-1611224923853-80b023f02d71',
    website: 'https://asana.com',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'Gestión de proyectos complejos',
      'Coordinación entre departamentos',
      'Campaigns de marketing',
      'Product roadmaps y releases'
    ],
    comparison_matrix: {
      ease_of_use: 8,
      feature_richness: 9,
      pricing_value: 8,
      support_quality: 8,
      scalability: 9
    },
    similar_tools: ['monday', 'clickup', 'smartsheet'],
    founded_year: 2008,
    user_rating: 4.4,
    monthly_active_users: '2M+ teams',
    key_features: [
      'Múltiples vistas (List, Board, Timeline, Calendar)',
      'Goals y progress tracking',
      'Portfolios para múltiples proyectos',
      'Custom fields y automatización'
    ],
    pros: [
      'Interface limpia y intuitiva',
      'Funcionalidades robustas',
      'Excelente para equipos medianos',
      'Plan gratuito útil'
    ],
    cons: [
      'Puede ser complejo para usuarios simples',
      'Reportes limitados en planes básicos',
      'Performance lenta con muchos datos'
    ],
    best_for: [
      'Equipos de marketing y creativos',
      'Project managers profesionales',
      'Empresas medianas en crecimiento',
      'Proyectos con múltiples stakeholders'
    ],
    alternatives: ['Monday.com', 'ClickUp', 'Smartsheet']
  },

  {
    id: 'linear',
    name: 'Linear',
    category: 'Project Management',
    subcategory: 'Issue Tracking',
    description: 'Herramienta de issue tracking y project management diseñada para equipos de desarrollo.',
    pricing: 'Gratis hasta 10 usuarios, Startup $8/mes, Business $14/mes',
    complexity: 'intermediate',
    difficulty_level: 4,
    learning_curve: 'moderate',
    community_size: 'medium',
    integration_options: ['GitHub', 'GitLab', 'Slack', 'Figma', 'Sentry', 'API'],
    tags: ['issue-tracking', 'development', 'fast', 'keyboard-shortcuts', 'sprints'],
    logoPlaceholder: 'photo-1611224923853-80b023f02d71',
    website: 'https://linear.app',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'Bug tracking y feature requests',
      'Sprint planning y roadmaps',
      'Product development workflows',
      'Engineering team coordination'
    ],
    comparison_matrix: {
      ease_of_use: 9,
      feature_richness: 8,
      pricing_value: 8,
      support_quality: 8,
      scalability: 8
    },
    similar_tools: ['jira', 'github-issues', 'clickup'],
    founded_year: 2019,
    user_rating: 4.6,
    monthly_active_users: '500K+ users',
    key_features: [
      'Performance excepcional y UI moderna',
      'Keyboard shortcuts avanzados',
      'Git integrations automáticas',
      'Cycles y roadmap planning'
    ],
    pros: [
      'Extremadamente rápido y responsive',
      'Interface moderna y limpia',
      'Perfecto para desarrolladores',
      'Excelente experiencia móvil'
    ],
    cons: [
      'Menos features que Jira',
      'Enfocado principalmente en development',
      'Ecosistema de integraciones limitado'
    ],
    best_for: [
      'Equipos de desarrollo de software',
      'Startups tech-first',
      'Product teams ágiles',
      'Equipos que valoran velocidad'
    ],
    alternatives: ['Jira', 'GitHub Issues', 'ClickUp']
  },

  // ====== MARKETING & ANALYTICS ======
  {
    id: 'google-analytics',
    name: 'Google Analytics',
    category: 'Marketing & Analytics',
    subcategory: 'Web Analytics',
    description: 'Plataforma gratuita de análisis web para medir tráfico, comportamiento y conversiones.',
    pricing: 'Gratis, Analytics 360 $150K/año',
    complexity: 'intermediate',
    difficulty_level: 5,
    learning_curve: 'steep',
    community_size: 'massive',
    integration_options: ['Google Ads', 'Search Console', 'Google Tag Manager', 'Data Studio', 'Third-party tools'],
    tags: ['analytics', 'web-tracking', 'conversiones', 'audience', 'reporting'],
    logoPlaceholder: 'photo-1460925895917-afdab827c52f',
    website: 'https://analytics.google.com',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'Tracking de conversiones e-commerce',
      'Análisis de comportamiento de usuarios',
      'Optimización de funnel de ventas',
      'Reportes de ROI de marketing'
    ],
    comparison_matrix: {
      ease_of_use: 6,
      feature_richness: 10,
      pricing_value: 10,
      support_quality: 7,
      scalability: 10
    },
    similar_tools: ['mixpanel', 'amplitude', 'hotjar'],
    founded_year: 2005,
    user_rating: 4.1,
    monthly_active_users: '50M+ websites',
    key_features: [
      'Tracking completo de website/app',
      'Reportes personalizables',
      'Audiencias para remarketing',
      'Integración con Google Ads'
    ],
    pros: [
      'Completamente gratuito',
      'Estándar de la industria',
      'Integración perfecta con Google',
      'Datos ilimitados'
    ],
    cons: [
      'Interfaz compleja para principiantes',
      'Configuración puede ser técnica',
      'Privacy concerns'
    ],
    best_for: [
      'Cualquier website o app',
      'E-commerce y lead generation',
      'Equipos de marketing digital',
      'Análisis profundo de comportamiento'
    ],
    alternatives: ['Mixpanel', 'Amplitude', 'Adobe Analytics']
  },

  {
    id: 'mailchimp',
    name: 'Mailchimp',
    category: 'Marketing & Analytics',
    subcategory: 'Email Marketing',
    description: 'Plataforma de email marketing con automatización, segmentación y analytics avanzados.',
    pricing: 'Gratis hasta 2,000 contactos, Essentials $10/mes, Standard $15/mes',
    complexity: 'beginner',
    difficulty_level: 3,
    learning_curve: 'gentle',
    community_size: 'massive',
    integration_options: ['Shopify', 'WordPress', 'Zapier', 'Facebook', 'Google Analytics'],
    tags: ['email-marketing', 'automation', 'newsletters', 'segmentation', 'landing-pages'],
    logoPlaceholder: 'photo-1460925895917-afdab827c52f',
    website: 'https://mailchimp.com',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'Newsletters y comunicaciones regulares',
      'Email campaigns de e-commerce',
      'Automatización de onboarding',
      'Segmentación y personalización'
    ],
    comparison_matrix: {
      ease_of_use: 9,
      feature_richness: 8,
      pricing_value: 8,
      support_quality: 8,
      scalability: 8
    },
    similar_tools: ['convertkit', 'constantcontact', 'sendinblue'],
    founded_year: 2001,
    user_rating: 4.2,
    monthly_active_users: '13M+ users',
    key_features: [
      'Drag-and-drop email builder',
      'Automatización de marketing',
      'A/B testing integrado',
      'Segmentación avanzada'
    ],
    pros: [
      'Muy fácil de usar',
      'Plan gratuito generoso',
      'Templates profesionales',
      'Reportes detallados'
    ],
    cons: [
      'Precios escalan rápidamente',
      'Limitaciones en automatización básica',
      'Support puede ser lento'
    ],
    best_for: [
      'Pequeñas empresas y startups',
      'E-commerce y retail',
      'Content creators y bloggers',
      'Marketing teams que empiezan'
    ],
    alternatives: ['ConvertKit', 'Constant Contact', 'Sendinblue']
  },

  {
    id: 'hotjar',
    name: 'Hotjar',
    category: 'Marketing & Analytics',
    subcategory: 'User Experience Analytics',
    description: 'Plataforma de analytics de UX con heatmaps, session recordings y user feedback.',
    pricing: 'Gratis básico, Plus $32/mes, Business $80/mes',
    complexity: 'beginner',
    difficulty_level: 3,
    learning_curve: 'gentle',
    community_size: 'large',
    integration_options: ['Google Analytics', 'Zapier', 'Slack', 'HubSpot', 'Shopify'],
    tags: ['heatmaps', 'user-experience', 'recordings', 'feedback', 'conversion'],
    logoPlaceholder: 'photo-1460925895917-afdab827c52f',
    website: 'https://hotjar.com',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'Optimización de conversion rate',
      'Análisis de user experience',
      'Testing de nuevas features',
      'Identificación de friction points'
    ],
    comparison_matrix: {
      ease_of_use: 9,
      feature_richness: 7,
      pricing_value: 8,
      support_quality: 8,
      scalability: 7
    },
    similar_tools: ['fullstory', 'logrocket', 'crazy-egg'],
    founded_year: 2014,
    user_rating: 4.3,
    monthly_active_users: '500K+ websites',
    key_features: [
      'Heatmaps de clicks, scrolls y movimiento',
      'Session recordings completas',
      'Surveys y feedback widgets',
      'Conversion funnels'
    ],
    pros: [
      'Muy fácil de implementar',
      'Insights visuales poderosos',
      'Plan gratuito útil',
      'Interface intuitiva'
    ],
    cons: [
      'Limitado en plan gratuito',
      'Performance impact en algunos sites',
      'Menos features técnicas que competidores'
    ],
    best_for: [
      'UX designers y product managers',
      'E-commerce optimization',
      'Marketing teams',
      'Startups que optimizan conversión'
    ],
    alternatives: ['FullStory', 'LogRocket', 'Crazy Egg']
  },

  // ====== MOBILE DEVELOPMENT ======
  {
    id: 'flutterflow',
    name: 'FlutterFlow',
    category: 'Mobile Development',
    subcategory: 'No-Code Mobile Apps',
    description: 'Constructor visual de aplicaciones móviles que genera código Flutter nativo.',
    pricing: 'Gratis básico, Standard $30/mes, Pro $70/mes',
    complexity: 'intermediate',
    difficulty_level: 4,
    learning_curve: 'moderate',
    community_size: 'medium',
    integration_options: ['Firebase', 'Supabase', 'APIs REST', 'Payment providers', 'Push notifications'],
    tags: ['mobile-apps', 'Flutter', 'visual-builder', 'iOS', 'Android'],
    logoPlaceholder: 'photo-1516996087931-5ae405802f9f',
    website: 'https://flutterflow.io',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'Apps móviles para startups',
      'Prototipos funcionales de apps',
      'MVPs para validación de mercado',
      'Apps internas de empresa'
    ],
    comparison_matrix: {
      ease_of_use: 8,
      feature_richness: 8,
      pricing_value: 8,
      support_quality: 7,
      scalability: 8
    },
    similar_tools: ['adalo', 'glide', 'appgyver'],
    founded_year: 2020,
    user_rating: 4.3,
    monthly_active_users: '100K+',
    key_features: [
      'Constructor visual drag-and-drop',
      'Genera código Flutter real',
      'Deploy directo a App Stores',
      'Integración con backends populares'
    ],
    pros: [
      'Código Flutter nativo generado',
      'Performance superior a otras no-code',
      'Flexibilidad de personalización',
      'Comunidad activa'
    ],
    cons: [
      'Requiere conocimiento básico de Flutter',
      'Menos templates que competidores',
      'Precios pueden ser altos para individuales'
    ],
    best_for: [
      'Desarrolladores que quieren velocidad',
      'Startups que necesitan MVPs móviles',
      'Agencias que desarrollan múltiples apps',
      'Equipos que valoran performance nativa'
    ],
    alternatives: ['Adalo', 'Glide', 'Bubble (mobile)']
  }
];

// Helper arrays for filtering
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
  'Mobile Development'
];

export const subcategories = [
  'Conversational AI',
  'Marketing Content',
  'Writing Assistant',
  'Research Assistant',
  'AI Image Generation',
  'AI-Powered Development',
  'Web App Builder',
  'Automation',
  'Database & Collaboration',
  'Open Source Automation',
  'Professional Web Design',
  'Interactive Design',
  'CMS Platform',
  'All-in-One Website Builder',
  'Drag & Drop Builder',
  'Publishing Platform',
  'Complete E-commerce',
  'WordPress E-commerce',
  'Enterprise E-commerce',
  'Digital Products',
  'UI/UX Design',
  'Graphic Design',
  'Version Control',
  'Hosting & Deployment',
  'Full-Stack Hosting',
  'Backend as a Service',
  'Serverless Database',
  'Team Messaging',
  'Community Platform',
  'All-in-One Workspace',
  'Kanban Boards',
  'Team Collaboration',
  'Issue Tracking',
  'Web Analytics',
  'Email Marketing',
  'User Experience Analytics',
  'No-Code Mobile Apps'
];

export const difficultyLevels = [
  'beginner',
  'intermediate', 
  'advanced',
  'expert'
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

