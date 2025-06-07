
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
      'Copys de ventas de alta conversión',
      'Descripciones de productos e-commerce'
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
      'Landing pages dinámicas',
      'Dashboards personalizados con datos en tiempo real'
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
      'Plataformas de e-learning',
      'CRM personalizado para empresas'
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

  // ====== WEBSITE BUILDERS ======
  {
    id: 'webflow',
    name: 'Webflow',
    category: 'Website Builders',
    subcategory: 'Designer-Focused',
    description: 'Constructor de sitios web visual que combina diseño profesional con capacidades de desarrollo.',
    pricing: 'Gratis básico, Site $14/mes, Business $39/mes',
    complexity: 'intermediate',
    difficulty_level: 5,
    learning_curve: 'moderate',
    community_size: 'large',
    integration_options: ['Zapier', 'Mailchimp', 'Google Analytics', 'Stripe', 'Custom code'],
    tags: ['diseño-web', 'responsive', 'CMS', 'e-commerce', 'SEO'],
    logoPlaceholder: 'photo-1487014679447-9f8336841d58',
    website: 'https://webflow.com',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'Sitios web corporativos de alto diseño',
      'Portfolios de diseñadores y agencias',
      'Landing pages de conversión optimizadas',
      'Blogs con CMS personalizado',
      'E-commerce boutique con diseño único'
    ],
    comparison_matrix: {
      ease_of_use: 6,
      feature_richness: 9,
      pricing_value: 7,
      support_quality: 8,
      scalability: 8
    },
    similar_tools: ['framer', 'wordpress', 'squarespace'],
    founded_year: 2013,
    user_rating: 4.4,
    monthly_active_users: '3.5M+',
    key_features: [
      'Editor visual avanzado',
      'CMS flexible y potente',
      'Hosting optimizado incluido',
      'Animaciones y interacciones complejas'
    ],
    pros: [
      'Control total sobre el diseño',
      'Código limpio generado',
      'SEO optimization integrado',
      'Universidad Webflow para aprender'
    ],
    cons: [
      'Curva de aprendizaje moderada',
      'Precios pueden acumularse rápido',
      'Limitaciones en funcionalidad backend'
    ],
    best_for: [
      'Diseñadores web profesionales',
      'Agencias que crean sitios client',
      'Empresas que valoran diseño único',
      'Freelancers especializados en web'
    ],
    alternatives: ['Framer', 'Squarespace', 'WordPress']
  },

  {
    id: 'framer',
    name: 'Framer',
    category: 'Website Builders',
    subcategory: 'Design to Code',
    description: 'Herramienta de diseño que permite crear sitios web interactivos y publicarlos directamente.',
    pricing: 'Gratis básico, Mini $5/mes, Basic $15/mes',
    complexity: 'intermediate',
    difficulty_level: 4,
    learning_curve: 'gentle',
    community_size: 'medium',
    integration_options: ['Figma import', 'Custom code', 'Google Analytics', 'Forms', 'CMS'],
    tags: ['diseño-interactivo', 'prototyping', 'animaciones', 'responsive', 'colaboración'],
    logoPlaceholder: 'photo-1611224923853-80b023f02d71',
    website: 'https://framer.com',
    apiAvailable: false,
    freeVersion: true,
    use_case_examples: [
      'Landing pages con animaciones impactantes',
      'Portfolios interactivos de creative',
      'Sitios de producto con demos animados',
      'Presentaciones web interactivas',
      'Prototipos funcionales para testing'
    ],
    comparison_matrix: {
      ease_of_use: 8,
      feature_richness: 7,
      pricing_value: 9,
      support_quality: 7,
      scalability: 6
    },
    similar_tools: ['webflow', 'figma', 'principle'],
    founded_year: 2014,
    user_rating: 4.6,
    monthly_active_users: '1M+',
    key_features: [
      'Animaciones avanzadas sin código',
      'Importación directa desde Figma',
      'Responsive design automático',
      'Componentes reutilizables'
    ],
    pros: [
      'Interfaz muy intuitiva',
      'Animaciones de calidad profesional',
      'Precio muy competitivo',
      'Perfecto para designers'
    ],
    cons: [
      'Limitado para sitios complejos',
      'Menos opciones de CMS',
      'Dependiente de diseño visual'
    ],
    best_for: [
      'Diseñadores UI/UX',
      'Startups que necesitan landing impactante',
      'Creativos y portfolios personales',
      'Equipos de producto para prototipos'
    ],
    alternatives: ['Webflow', 'Figma', 'InVision']
  },

  // ====== E-COMMERCE PLATFORMS ======
  {
    id: 'shopify',
    name: 'Shopify',
    category: 'E-commerce Platforms',
    subcategory: 'All-in-One Store',
    description: 'Plataforma líder de e-commerce que permite crear tiendas online completas con todas las funcionalidades.',
    pricing: 'Basic $29/mes, Shopify $79/mes, Advanced $299/mes',
    complexity: 'intermediate',
    difficulty_level: 3,
    learning_curve: 'gentle',
    community_size: 'massive',
    integration_options: ['5000+ apps', 'API REST', 'Zapier', 'Klaviyo', 'Facebook', 'Google'],
    tags: ['tienda-online', 'pagos', 'inventario', 'dropshipping', 'multi-canal'],
    logoPlaceholder: 'photo-1556742049-0cfed4f6a45d',
    website: 'https://shopify.com',
    apiAvailable: true,
    freeVersion: false,
    use_case_examples: [
      'Tienda de dropshipping desde cero',
      'Marca de ropa con inventario propio',
      'Venta multi-canal (online + físico)',
      'Suscripciones y productos digitales',
      'Marketplace de múltiples vendedores'
    ],
    comparison_matrix: {
      ease_of_use: 8,
      feature_richness: 9,
      pricing_value: 7,
      support_quality: 9,
      scalability: 10
    },
    similar_tools: ['woocommerce', 'bigcommerce', 'squarespace'],
    founded_year: 2006,
    user_rating: 4.3,
    monthly_active_users: '4M+ merchants',
    key_features: [
      'Procesamiento de pagos integrado',
      'Gestión completa de inventario',
      'Themes responsive profesionales',
      'Analytics y reportes avanzados'
    ],
    pros: [
      'Muy fácil de configurar',
      'Ecosistema de apps gigante',
      'Soporte 24/7 excelente',
      'Escalabilidad comprobada'
    ],
    cons: [
      'Costos pueden acumularse rápido',
      'Comisiones por transacción',
      'Customización limitada sin código'
    ],
    best_for: [
      'Emprendedores sin experiencia técnica',
      'Marcas que necesitan escalar rápido',
      'Dropshippers y retailers',
      'Empresas que venden online y offline'
    ],
    alternatives: ['WooCommerce', 'BigCommerce', 'Squarespace Commerce']
  },

  // ====== DESIGN & PROTOTYPING ======
  {
    id: 'figma',
    name: 'Figma',
    category: 'Design & Prototyping',
    subcategory: 'UI/UX Design',
    description: 'Herramienta de diseño colaborativo basada en navegador para UI/UX, prototyping y design systems.',
    pricing: 'Gratis hasta 3 proyectos, Professional $12/mes',
    complexity: 'intermediate',
    difficulty_level: 4,
    learning_curve: 'moderate',
    community_size: 'massive',
    integration_options: ['Slack', 'Jira', 'Notion', 'Webflow', 'Framer', '1000+ plugins'],
    tags: ['diseño-UI', 'prototyping', 'colaboración', 'design-systems', 'vectorial'],
    logoPlaceholder: 'photo-1611224923853-80b023f02d71',
    website: 'https://figma.com',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'Diseño completo de apps móviles',
      'Sistemas de diseño empresariales',
      'Prototipos interactivos para testing',
      'Wireframes y user flows',
      'Colaboración entre designers y developers'
    ],
    comparison_matrix: {
      ease_of_use: 7,
      feature_richness: 10,
      pricing_value: 9,
      support_quality: 8,
      scalability: 9
    },
    similar_tools: ['sketch', 'adobe-xd', 'invision'],
    founded_year: 2016,
    user_rating: 4.7,
    monthly_active_users: '20M+',
    key_features: [
      'Colaboración en tiempo real',
      'Sistema de componentes avanzado',
      'Prototyping interactivo',
      'Versionado y comentarios'
    ],
    pros: [
      'Gratuito para uso personal',
      'Colaboración seamless',
      'Performance excelente en browser',
      'Comunidad enorme de recursos'
    ],
    cons: [
      'Requiere conexión a internet',
      'Curva de aprendizaje para principiantes',
      'Funciones avanzadas requieren plan pago'
    ],
    best_for: [
      'Equipos de diseño y producto',
      'Startups creando MVPs',
      'Freelancers UI/UX',
      'Empresas con design systems'
    ],
    alternatives: ['Sketch', 'Adobe XD', 'Penpot']
  },

  // ====== DEVELOPMENT TOOLS ======
  {
    id: 'github',
    name: 'GitHub',
    category: 'Development Tools',
    subcategory: 'Version Control',
    description: 'Plataforma de desarrollo colaborativo que usa Git para control de versiones y hosting de código.',
    pricing: 'Gratis para públicos, Pro $4/mes, Teams $4/usuario/mes',
    complexity: 'intermediate',
    difficulty_level: 5,
    learning_curve: 'moderate',
    community_size: 'massive',
    integration_options: ['CI/CD', 'Slack', 'Jira', 'VS Code', '1000+ GitHub Apps'],
    tags: ['git', 'colaboración', 'open-source', 'CI-CD', 'code-review'],
    logoPlaceholder: 'photo-1618477388954-7852f32655ec',
    website: 'https://github.com',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'Desarrollo colaborativo de software',
      'Hosting de proyectos open source',
      'CI/CD automático con GitHub Actions',
      'Portfolio de desarrollador',
      'Gestión de issues y proyecto'
    ],
    comparison_matrix: {
      ease_of_use: 6,
      feature_richness: 10,
      pricing_value: 9,
      support_quality: 8,
      scalability: 10
    },
    similar_tools: ['gitlab', 'bitbucket', 'sourcetree'],
    founded_year: 2008,
    user_rating: 4.8,
    monthly_active_users: '100M+',
    key_features: [
      'Repositorios públicos ilimitados gratuitos',
      'GitHub Actions para CI/CD',
      'Issues y project management',
      'GitHub Copilot integrado'
    ],
    pros: [
      'Estándar de la industria',
      'Comunidad open source masiva',
      'Integración perfecta con herramientas dev',
      'Funciones gratuitas muy generosas'
    ],
    cons: [
      'Curva de aprendizaje para no-técnicos',
      'Git puede ser complejo para principiantes',
      'UI puede ser abrumadora'
    ],
    best_for: [
      'Desarrolladores y equipos técnicos',
      'Proyectos open source',
      'Startups tech',
      'Estudiantes de programación'
    ],
    alternatives: ['GitLab', 'Bitbucket', 'SourceForge']
  },

  {
    id: 'vercel',
    name: 'Vercel',
    category: 'Development Tools',
    subcategory: 'Deployment & Hosting',
    description: 'Plataforma de deployment que se especializa en frontend frameworks y aplicaciones serverless.',
    pricing: 'Gratis para hobby, Pro $20/mes, Enterprise custom',
    complexity: 'beginner',
    difficulty_level: 2,
    learning_curve: 'immediate',
    community_size: 'large',
    integration_options: ['GitHub', 'GitLab', 'Bitbucket', 'Next.js', 'React', 'Vue'],
    tags: ['deployment', 'hosting', 'serverless', 'CDN', 'edge-functions'],
    logoPlaceholder: 'photo-1461749280684-dccba630e2f6',
    website: 'https://vercel.com',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'Deploy automático desde Git',
      'Landing pages de alta performance',
      'Aplicaciones React/Next.js production',
      'APIs serverless escalables',
      'Preview deployments para testing'
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
      'Global CDN automático',
      'Preview URLs para cada PR',
      'Edge Functions serverless'
    ],
    pros: [
      'Setup extremadamente fácil',
      'Performance excepcional',
      'Integración perfecta con frameworks',
      'Plan gratuito muy generoso'
    ],
    cons: [
      'Optimizado principalmente para frontend',
      'Precios pueden escalar rápido',
      'Menos control sobre servidor'
    ],
    best_for: [
      'Developers frontend',
      'Startups con apps React/Next.js',
      'Equipos que priorizan velocidad',
      'Proyectos que necesitan global CDN'
    ],
    alternatives: ['Netlify', 'Railway', 'AWS Amplify']
  },

  // ====== DATABASE & BACKEND ======
  {
    id: 'supabase',
    name: 'Supabase',
    category: 'Database & Backend',
    subcategory: 'Backend-as-a-Service',
    description: 'Alternativa open source a Firebase con PostgreSQL, auth, storage y edge functions.',
    pricing: 'Gratis hasta 500MB, Pro $25/mes, Teams $125/mes',
    complexity: 'intermediate',
    difficulty_level: 4,
    learning_curve: 'moderate',
    community_size: 'large',
    integration_options: ['REST API', 'GraphQL', 'Realtime', 'Next.js', 'React', 'Flutter'],
    tags: ['PostgreSQL', 'authentication', 'realtime', 'storage', 'edge-functions'],
    logoPlaceholder: 'photo-1518770660439-4636190af475',
    website: 'https://supabase.com',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'Backend completo para apps móviles',
      'Sistema de auth y usuarios',
      'APIs REST automáticas',
      'Chat en tiempo real',
      'Storage de archivos y imágenes'
    ],
    comparison_matrix: {
      ease_of_use: 7,
      feature_richness: 9,
      pricing_value: 9,
      support_quality: 8,
      scalability: 8
    },
    similar_tools: ['firebase', 'planetscale', 'railway'],
    founded_year: 2020,
    user_rating: 4.5,
    monthly_active_users: '100K+',
    key_features: [
      'PostgreSQL completo en la nube',
      'Authentication multi-provider',
      'Real-time subscriptions',
      'Edge Functions con Deno'
    ],
    pros: [
      'Open source y self-hosteable',
      'PostgreSQL full-featured',
      'Pricing muy competitivo',
      'Excelente developer experience'
    ],
    cons: [
      'Más complejo que Firebase para principiantes',
      'Ecosistema más pequeño',
      'Algunas features aún en beta'
    ],
    best_for: [
      'Developers que prefieren SQL',
      'Startups que quieren control',
      'Proyectos que requieren realtime',
      'Equipos que valoran open source'
    ],
    alternatives: ['Firebase', 'PlanetScale', 'Neon']
  },

  // ====== COMMUNICATION ======
  {
    id: 'slack',
    name: 'Slack',
    category: 'Communication',
    subcategory: 'Team Messaging',
    description: 'Plataforma de comunicación empresarial con canales, mensajería directa e integraciones.',
    pricing: 'Gratis básico, Pro $7.25/mes, Business+ $12.50/mes',
    complexity: 'beginner',
    difficulty_level: 2,
    learning_curve: 'immediate',
    community_size: 'massive',
    integration_options: ['5000+ apps', 'Zapier', 'Google Workspace', 'Microsoft 365', 'Custom bots'],
    tags: ['mensajería', 'equipos', 'colaboración', 'notificaciones', 'integraciones'],
    logoPlaceholder: 'photo-1611224923853-80b023f02d71',
    website: 'https://slack.com',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'Comunicación interna de equipos',
      'Coordinación de proyectos',
      'Notificaciones automáticas de sistemas',
      'Onboarding de empleados',
      'Comunidades profesionales'
    ],
    comparison_matrix: {
      ease_of_use: 9,
      feature_richness: 8,
      pricing_value: 7,
      support_quality: 8,
      scalability: 9
    },
    similar_tools: ['discord', 'microsoft-teams', 'telegram'],
    founded_year: 2013,
    user_rating: 4.2,
    monthly_active_users: '20M+',
    key_features: [
      'Canales organizados por tema',
      'Integraciones con herramientas trabajo',
      'Búsqueda avanzada en historial',
      'Llamadas de voz y video'
    ],
    pros: [
      'Interfaz muy intuitiva',
      'Ecosistema de integraciones enorme',
      'Búsqueda potente',
      'Adoption fácil en equipos'
    ],
    cons: [
      'Puede generar distracción',
      'Historial limitado en plan gratuito',
      'Precios se acumulan con equipos grandes'
    ],
    best_for: [
      'Equipos remotos y distribuidos',
      'Startups y empresas tech',
      'Proyectos que requieren coordinación',
      'Empresas con muchas herramientas'
    ],
    alternatives: ['Microsoft Teams', 'Discord', 'Telegram']
  },

  // ====== PROJECT MANAGEMENT ======
  {
    id: 'notion',
    name: 'Notion',
    category: 'Project Management',
    subcategory: 'All-in-One Workspace',
    description: 'Workspace todo-en-uno que combina notas, bases de datos, proyectos y colaboración.',
    pricing: 'Gratis personal, Plus $8/mes, Business $15/mes',
    complexity: 'intermediate',
    difficulty_level: 4,
    learning_curve: 'moderate',
    community_size: 'massive',
    integration_options: ['Slack', 'Google Drive', 'Trello', 'Figma', '100+ through Zapier'],
    tags: ['notas', 'base-datos', 'proyectos', 'wiki', 'colaboración'],
    logoPlaceholder: 'photo-1586281380614-a1d62c273cd5',
    website: 'https://notion.so',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'Wiki de empresa y documentación',
      'CRM simple para startups',
      'Planificación de contenido',
      'Base de conocimiento personal',
      'Tracking de OKRs y métricas'
    ],
    comparison_matrix: {
      ease_of_use: 6,
      feature_richness: 10,
      pricing_value: 9,
      support_quality: 7,
      scalability: 8
    },
    similar_tools: ['obsidian', 'roam-research', 'coda'],
    founded_year: 2016,
    user_rating: 4.4,
    monthly_active_users: '30M+',
    key_features: [
      'Bloques modulares flexibles',
      'Bases de datos relacionales',
      'Templates de comunidad',
      'Colaboración en tiempo real'
    ],
    pros: [
      'Flexibilidad extrema',
      'Plan gratuito muy generoso',
      'Comunidad activa con templates',
      'Muy visual y personalizable'
    ],
    cons: [
      'Curva de aprendizaje pronunciada',
      'Performance lenta con mucho contenido',
      'Puede ser abrumador para casos simples'
    ],
    best_for: [
      'Equipos que necesitan flexibilidad',
      'Startups organizando conocimiento',
      'Freelancers gestionando proyectos',
      'Estudiantes y investigadores'
    ],
    alternatives: ['Obsidian', 'Coda', 'Roam Research']
  },

  {
    id: 'linear',
    name: 'Linear',
    category: 'Project Management',
    subcategory: 'Issue Tracking',
    description: 'Herramienta moderna de gestión de issues y proyectos diseñada para equipos de desarrollo.',
    pricing: 'Gratis hasta 10 miembros, Standard $8/mes, Plus $14/mes',
    complexity: 'intermediate',
    difficulty_level: 3,
    learning_curve: 'gentle',
    community_size: 'medium',
    integration_options: ['GitHub', 'GitLab', 'Slack', 'Figma', 'Sentry', 'Zapier'],
    tags: ['issues', 'sprints', 'roadmaps', 'desarrollo', 'agile'],
    logoPlaceholder: 'photo-1460925895917-afdab827c52f',
    website: 'https://linear.app',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'Tracking de bugs y features',
      'Sprint planning y retrospectives',
      'Roadmap de producto público',
      'Coordinación entre design y dev',
      'Release planning automático'
    ],
    comparison_matrix: {
      ease_of_use: 9,
      feature_richness: 8,
      pricing_value: 8,
      support_quality: 8,
      scalability: 7
    },
    similar_tools: ['jira', 'asana', 'clickup'],
    founded_year: 2019,
    user_rating: 4.8,
    monthly_active_users: '200K+',
    key_features: [
      'Interfaz rápida y moderna',
      'Git integration automática',
      'Roadmaps públicos',
      'Shortcuts de teclado avanzados'
    ],
    pros: [
      'Muy rápido y responsive',
      'Diseño beautiful y minimal',
      'Perfecto para equipos tech',
      'Shortcuts potentes'
    ],
    cons: [
      'Menos flexible que Jira',
      'Optimizado para desarrollo software',
      'Ecosistema más limitado'
    ],
    best_for: [
      'Equipos de desarrollo ágil',
      'Startups tech que priorizan velocidad',
      'Product teams modernos',
      'Equipos que odian Jira'
    ],
    alternatives: ['Jira', 'Asana', 'ClickUp']
  },

  // ====== MARKETING & ANALYTICS ======
  {
    id: 'google-analytics',
    name: 'Google Analytics',
    category: 'Marketing & Analytics',
    subcategory: 'Web Analytics',
    description: 'Plataforma de analytics web gratuita que rastrea y reporta tráfico de sitios web.',
    pricing: 'Gratis, Analytics 360 desde $12,500/mes',
    complexity: 'intermediate',
    difficulty_level: 5,
    learning_curve: 'steep',
    community_size: 'massive',
    integration_options: ['Google Ads', 'Search Console', 'Tag Manager', 'Data Studio', '1000+ tools'],
    tags: ['analytics', 'web-tracking', 'conversiones', 'audiencias', 'reporting'],
    logoPlaceholder: 'photo-1460925895917-afdab827c52f',
    website: 'https://analytics.google.com',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'Tracking de conversiones e-commerce',
      'Análisis de comportamiento de usuarios',
      'Optimización de marketing campaigns',
      'Segmentación de audiencias',
      'Reportes automáticos ejecutivos'
    ],
    comparison_matrix: {
      ease_of_use: 5,
      feature_richness: 10,
      pricing_value: 10,
      support_quality: 6,
      scalability: 10
    },
    similar_tools: ['mixpanel', 'hotjar', 'amplitude'],
    founded_year: 2005,
    user_rating: 4.1,
    monthly_active_users: '50M+ websites',
    key_features: [
      'Tracking gratuito ilimitado',
      'Integración con Google ecosystem',
      'Machine learning insights',
      'Custom reports y dashboards'
    ],
    pros: [
      'Completamente gratuito',
      'Más features que cualquier competidor',
      'Integración perfecta con Google Ads',
      'Datos de benchmarking industry'
    ],
    cons: [
      'Interfaz compleja y abrumadora',
      'Curva de aprendizaje muy pronunciada',
      'Sampling en cuentas grandes'
    ],
    best_for: [
      'Cualquier sitio web serio',
      'E-commerce y lead generation',
      'Equipos de marketing digital',
      'Empresas que usan Google Ads'
    ],
    alternatives: ['Mixpanel', 'Adobe Analytics', 'Hotjar']
  },

  // ====== MOBILE DEVELOPMENT ======
  {
    id: 'flutterflow',
    name: 'FlutterFlow',
    category: 'Mobile Development',
    subcategory: 'No-Code App Builder',
    description: 'Constructor visual de aplicaciones móviles que genera código Flutter nativo.',
    pricing: 'Gratis básico, Standard $30/mes, Pro $70/mes',
    complexity: 'intermediate',
    difficulty_level: 4,
    learning_curve: 'moderate',
    community_size: 'medium',
    integration_options: ['Firebase', 'Supabase', 'REST APIs', 'Custom actions', 'App Store Connect'],
    tags: ['mobile-apps', 'Flutter', 'no-code', 'iOS', 'Android'],
    logoPlaceholder: 'photo-1512941937669-90a1b58e7e9c',
    website: 'https://flutterflow.io',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'Apps móviles para startups',
      'Prototipos funcionales para investors',
      'Apps internas de empresa',
      'Marketplace y e-commerce móvil',
      'Apps con backend complejo'
    ],
    comparison_matrix: {
      ease_of_use: 7,
      feature_richness: 8,
      pricing_value: 7,
      support_quality: 7,
      scalability: 8
    },
    similar_tools: ['adalo', 'glide', 'appgyver'],
    founded_year: 2020,
    user_rating: 4.3,
    monthly_active_users: '100K+',
    key_features: [
      'Código Flutter real generado',
      'Visual UI builder drag & drop',
      'Integración nativa con Firebase',
      'Deploy directo a App Stores'
    ],
    pros: [
      'Genera código real exportable',
      'Performance nativa',
      'Soporte para funciones complejas',
      'Comunidad activa'
    ],
    cons: [
      'Requiere comprensión de Flutter concepts',
      'Precios altos para equipos',
      'Limitado comparado con código nativo'
    ],
    best_for: [
      'Startups que necesitan MVP móvil',
      'Developers que conocen Flutter',
      'Equipos que requieren performance nativa',
      'Proyectos con backend complejo'
    ],
    alternatives: ['Adalo', 'Glide', 'Bubble native apps']
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
  'Blockchain & Web3',
  'AI Research & Analysis',
  'AI Productivity & Automation',
  'AI Data & Analytics',
  'AI Translation & Language',
  'AI Cybersecurity',
  'AI Education & Learning',
  'AI Health & Wellness',
  'AI Finance & Fintech',
  'AI Gaming & Entertainment'
];

export const subcategories = [
  'Conversational AI',
  'Marketing Content', 
  'AI-Powered Development',
  'Web App Builder',
  'Designer-Focused',
  'Design to Code',
  'All-in-One Store',
  'UI/UX Design',
  'Version Control',
  'Deployment & Hosting',
  'Backend-as-a-Service',
  'Team Messaging',
  'All-in-One Workspace',
  'Issue Tracking',
  'Web Analytics',
  'No-Code App Builder'
];

export const difficultyLevels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
export const learningCurves = ['immediate', 'gentle', 'moderate', 'steep'];
export const communitySizes = ['small', 'medium', 'large', 'massive'];
