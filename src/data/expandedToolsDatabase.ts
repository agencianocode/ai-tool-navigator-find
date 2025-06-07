
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
  'AI-Powered Development',
  'Web App Builder',
  'Automation',
  'Professional Web Design',
  'Interactive Design',
  'Complete E-commerce',
  'UI/UX Design',
  'Version Control',
  'Hosting & Deployment',
  'Backend as a Service',
  'Team Messaging',
  'All-in-One Workspace',
  'Kanban Boards',
  'Web Analytics',
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
