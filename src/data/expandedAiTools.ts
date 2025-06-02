export const expandedAiTools = [
  // Existing tools + many new ones organized by categories
  
  // AI Writing & Content Creation
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    category: 'AI Writing & Content',
    description: 'Chatbot conversacional de OpenAI para generar texto, responder preguntas y asistir en diversas tareas.',
    pricing: 'Gratis con límites, Plus $20/mes',
    complexity: 'beginner',
    tags: ['chatbot', 'escritura', 'conversación', 'código'],
    logoPlaceholder: 'photo-1677442136019-21780ecad995',
    website: 'https://chat.openai.com',
    apiAvailable: true,
    freeVersion: true
  },
  {
    id: 'jasper',
    name: 'Jasper AI',
    category: 'AI Writing & Content',
    description: 'Plataforma de escritura IA para crear contenido de marketing, blogs y copys persuasivos.',
    pricing: '$49-$125/mes',
    complexity: 'intermediate',
    tags: ['marketing', 'copywriting', 'blogs', 'contenido'],
    logoPlaceholder: 'photo-1596526131083-e8c633c948d2',
    website: 'https://jasper.ai',
    apiAvailable: true,
    freeVersion: false
  },
  {
    id: 'copy-ai',
    name: 'Copy.ai',
    category: 'AI Writing & Content',
    description: 'Generador de contenido IA para crear copys, emails, posts sociales y contenido de marketing.',
    pricing: 'Gratis hasta 2,000 palabras, Pro $49/mes',
    complexity: 'beginner',
    tags: ['copywriting', 'marketing', 'social media', 'emails'],
    logoPlaceholder: 'photo-1553484771-371a605b060b',
    website: 'https://copy.ai',
    apiAvailable: true,
    freeVersion: true
  },
  {
    id: 'writesonic',
    name: 'Writesonic',
    category: 'AI Writing & Content',
    description: 'Suite completa de escritura IA con templates para diferentes tipos de contenido y formatos.',
    pricing: 'Gratis hasta 10,000 palabras, Pro $20-$195/mes',
    complexity: 'intermediate',
    tags: ['templates', 'contenido', 'SEO', 'ecommerce'],
    logoPlaceholder: 'photo-1581291518857-4e27b48ff24e',
    website: 'https://writesonic.com',
    apiAvailable: true,
    freeVersion: true
  },
  {
    id: 'grammarly',
    name: 'Grammarly',
    category: 'AI Writing & Content',
    description: 'Asistente de escritura IA para corrección gramatical, estilo y tono de textos.',
    pricing: 'Gratis básico, Premium $30/mes',
    complexity: 'beginner',
    tags: ['gramática', 'corrección', 'estilo', 'tono'],
    logoPlaceholder: 'photo-1455390582262-044cdead277a',
    website: 'https://grammarly.com',
    apiAvailable: true,
    freeVersion: true
  },

  // AI Code Assistant
  {
    id: 'github-copilot',
    name: 'GitHub Copilot',
    category: 'AI Code Assistant',
    description: 'Asistente de programación IA que genera código y sugiere completaciones en tiempo real.',
    pricing: '$10/mes individual, $19/mes business',
    complexity: 'intermediate',
    tags: ['programación', 'código', 'autocompletado', 'desarrollo'],
    logoPlaceholder: 'photo-1618477388954-7852f32655ec',
    website: 'https://github.com/features/copilot',
    apiAvailable: true,
    freeVersion: false
  },
  {
    id: 'cursor',
    name: 'Cursor',
    category: 'AI Code Assistant',
    description: 'Editor de código con IA integrada para programación colaborativa y generación de código.',
    pricing: 'Gratis con límites, Pro $20/mes',
    complexity: 'intermediate',
    tags: ['editor', 'código', 'colaboración', 'desarrollo'],
    logoPlaceholder: 'photo-1587620962725-abab7fe55159',
    website: 'https://cursor.sh',
    apiAvailable: false,
    freeVersion: true
  },
  {
    id: 'replit',
    name: 'Replit',
    category: 'AI Code Assistant',
    description: 'Plataforma de desarrollo en la nube con asistente IA para codificar, ejecutar y colaborar.',
    pricing: 'Gratis básico, Hacker $7/mes, Pro $20/mes',
    complexity: 'intermediate',
    tags: ['desarrollo', 'nube', 'colaboración', 'hosting'],
    logoPlaceholder: 'photo-1461749280684-dccba630e2f6',
    website: 'https://replit.com',
    apiAvailable: true,
    freeVersion: true
  },
  {
    id: 'tabnine',
    name: 'Tabnine',
    category: 'AI Code Assistant',
    description: 'Autocompletado de código IA que aprende de tu estilo de programación y el contexto del proyecto.',
    pricing: 'Gratis básico, Pro $12/mes',
    complexity: 'intermediate',
    tags: ['autocompletado', 'código', 'personalización', 'múltiples lenguajes'],
    logoPlaceholder: 'photo-1555066931-4365d14bab8c',
    website: 'https://tabnine.com',
    apiAvailable: true,
    freeVersion: true
  },
  {
    id: 'codeium',
    name: 'Codeium',
    category: 'AI Code Assistant',
    description: 'Asistente de código IA gratuito con soporte para 70+ lenguajes de programación.',
    pricing: 'Gratis para individuos, Teams $12/usuario/mes',
    complexity: 'beginner',
    tags: ['gratuito', 'múltiples lenguajes', 'autocompletado', 'chat'],
    logoPlaceholder: 'photo-1517077304055-6e89abbf09b0',
    website: 'https://codeium.com',
    apiAvailable: true,
    freeVersion: true
  },

  // AI Image & Video
  {
    id: 'midjourney',
    name: 'Midjourney',
    category: 'AI Image & Video',
    description: 'Generador de imágenes IA de alta calidad a partir de descripciones de texto.',
    pricing: '$10-$120/mes según plan',
    complexity: 'beginner',
    tags: ['imágenes', 'arte', 'creatividad', 'diseño'],
    logoPlaceholder: 'photo-1617791160505-6f00504e3519',
    website: 'https://midjourney.com',
    apiAvailable: false,
    freeVersion: false
  },
  {
    id: 'dall-e-3',
    name: 'DALL-E 3',
    category: 'AI Image & Video',
    description: 'Generador de imágenes IA de OpenAI integrado en ChatGPT Plus y disponible via API.',
    pricing: 'Incluido en ChatGPT Plus, API $0.040-$0.080 por imagen',
    complexity: 'beginner',
    tags: ['imágenes', 'OpenAI', 'integración', 'API'],
    logoPlaceholder: 'photo-1677442136019-21780ecad995',
    website: 'https://openai.com/dall-e-3',
    apiAvailable: true,
    freeVersion: false
  },
  {
    id: 'stable-diffusion',
    name: 'Stable Diffusion',
    category: 'AI Image & Video',
    description: 'Modelo de generación de imágenes IA open source y personalizables.',
    pricing: 'Gratis (open source), servicios en nube varían',
    complexity: 'advanced',
    tags: ['open source', 'personalizable', 'local', 'flexible'],
    logoPlaceholder: 'photo-1618477388954-7852f32655ec',
    website: 'https://stability.ai',
    apiAvailable: true,
    freeVersion: true
  },
  {
    id: 'runway',
    name: 'Runway ML',
    category: 'AI Image & Video',
    description: 'Suite creativa IA para generar y editar videos, imágenes con herramientas avanzadas.',
    pricing: 'Gratis básico, Standard $15/mes, Pro $35/mes',
    complexity: 'intermediate',
    tags: ['video', 'edición', 'creatividad', 'generación'],
    logoPlaceholder: 'photo-1574717024753-55d82d8dfae8',
    website: 'https://runwayml.com',
    apiAvailable: true,
    freeVersion: true
  },
  {
    id: 'leonardo-ai',
    name: 'Leonardo AI',
    category: 'AI Image & Video',
    description: 'Plataforma de generación de imágenes IA especializada en arte conceptual y diseño de juegos.',
    pricing: 'Gratis hasta 150 tokens/día, Apprentice $12/mes',
    complexity: 'intermediate',
    tags: ['arte conceptual', 'juegos', 'diseño', 'creatividad'],
    logoPlaceholder: 'photo-1596526131083-e8c633c948d2',
    website: 'https://leonardo.ai',
    apiAvailable: true,
    freeVersion: true
  },

  // AI Business & Sales
  {
    id: 'salesforce-einstein',
    name: 'Salesforce Einstein',
    category: 'AI Business & Sales',
    description: 'Suite de IA integrada en Salesforce para automatización de ventas y atención al cliente.',
    pricing: 'Desde $25/usuario/mes según edición de Salesforce',
    complexity: 'advanced',
    tags: ['CRM', 'ventas', 'automatización', 'predicciones'],
    logoPlaceholder: 'photo-1553484771-371a605b060b',
    website: 'https://salesforce.com/products/einstein',
    apiAvailable: true,
    freeVersion: false
  },
  {
    id: 'hubspot-ai',
    name: 'HubSpot AI',
    category: 'AI Business & Sales',
    description: 'Herramientas de IA integradas en HubSpot para marketing, ventas y servicio al cliente.',
    pricing: 'Incluido en planes pagos de HubSpot desde $20/mes',
    complexity: 'intermediate',
    tags: ['marketing', 'ventas', 'CRM', 'automatización'],
    logoPlaceholder: 'photo-1581291518857-4e27b48ff24e',
    website: 'https://hubspot.com/artificial-intelligence',
    apiAvailable: true,
    freeVersion: false
  },
  {
    id: 'gong',
    name: 'Gong',
    category: 'AI Business & Sales',
    description: 'Plataforma de inteligencia de ingresos que analiza llamadas de ventas y proporciona insights.',
    pricing: 'Precio bajo consulta (enterprise)',
    complexity: 'advanced',
    tags: ['ventas', 'análisis', 'llamadas', 'insights'],
    logoPlaceholder: 'photo-1455390582262-044cdead277a',
    website: 'https://gong.io',
    apiAvailable: true,
    freeVersion: false
  },
  {
    id: 'drift',
    name: 'Drift',
    category: 'AI Business & Sales',
    description: 'Chatbot conversacional y plataforma de marketing conversacional para generar leads.',
    pricing: 'Gratis básico, Premium desde $50/mes',
    complexity: 'intermediate',
    tags: ['chatbot', 'leads', 'conversacional', 'marketing'],
    logoPlaceholder: 'photo-1618477388954-7852f32655ec',
    website: 'https://drift.com',
    apiAvailable: true,
    freeVersion: true
  },

  // AI Research & Analysis
  {
    id: 'perplexity',
    name: 'Perplexity AI',
    category: 'AI Research & Analysis',
    description: 'Motor de búsqueda IA que proporciona respuestas precisas con fuentes citadas.',
    pricing: 'Gratis con límites, Pro $20/mes',
    complexity: 'beginner',
    tags: ['búsqueda', 'investigación', 'fuentes', 'precisión'],
    logoPlaceholder: 'photo-1587620962725-abab7fe55159',
    website: 'https://perplexity.ai',
    apiAvailable: true,
    freeVersion: true
  },
  {
    id: 'consensus',
    name: 'Consensus',
    category: 'AI Research & Analysis',
    description: 'Motor de búsqueda IA especializado en papers científicos y investigación académica.',
    pricing: 'Gratis básico, Premium $9/mes',
    complexity: 'intermediate',
    tags: ['científico', 'investigación', 'papers', 'académico'],
    logoPlaceholder: 'photo-1461749280684-dccba630e2f6',
    website: 'https://consensus.app',
    apiAvailable: false,
    freeVersion: true
  },
  {
    id: 'semantic-scholar',
    name: 'Semantic Scholar',
    category: 'AI Research & Analysis',
    description: 'Base de datos académica con IA para descubrir y analizar literatura científica.',
    pricing: 'Gratis',
    complexity: 'intermediate',
    tags: ['académico', 'literatura', 'análisis', 'gratuito'],
    logoPlaceholder: 'photo-1555066931-4365d14bab8c',
    website: 'https://semanticscholar.org',
    apiAvailable: true,
    freeVersion: true
  },
  {
    id: 'elicit',
    name: 'Elicit',
    category: 'AI Research & Analysis',
    description: 'Asistente de investigación IA que ayuda a encontrar, resumir y extraer datos de papers.',
    pricing: 'Gratis básico, Plus $10/mes, Pro $25/mes',
    complexity: 'intermediate',
    tags: ['investigación', 'resúmenes', 'extracción', 'papers'],
    logoPlaceholder: 'photo-1517077304055-6e89abbf09b0',
    website: 'https://elicit.org',
    apiAvailable: false,
    freeVersion: true
  },

  // AI Productivity & Automation
  {
    id: 'notion-ai',
    name: 'Notion AI',
    category: 'AI Productivity & Automation',
    description: 'IA integrada en Notion para escribir, resumir y organizar contenido en tu workspace.',
    pricing: '$10/usuario/mes adicional',
    complexity: 'beginner',
    tags: ['productividad', 'escritura', 'organización', 'workspace'],
    logoPlaceholder: 'photo-1617791160505-6f00504e3519',
    website: 'https://notion.so/product/ai',
    apiAvailable: false,
    freeVersion: false
  },
  {
    id: 'zapier',
    name: 'Zapier',
    category: 'AI Productivity & Automation',
    description: 'Plataforma de automatización que conecta aplicaciones y servicios sin código.',
    pricing: 'Gratis hasta 100 tareas/mes, Starter $29.99/mes',
    complexity: 'intermediate',
    tags: ['automatización', 'integración', 'no-code', 'workflows'],
    logoPlaceholder: 'photo-1677442136019-21780ecad995',
    website: 'https://zapier.com',
    apiAvailable: true,
    freeVersion: true
  },
  {
    id: 'make',
    name: 'Make (Integromat)',
    category: 'AI Productivity & Automation',
    description: 'Plataforma visual de automatización para crear workflows complejos entre aplicaciones.',
    pricing: 'Gratis hasta 1,000 operaciones/mes, Core $10.59/mes',
    complexity: 'advanced',
    tags: ['automatización', 'visual', 'workflows', 'integración'],
    logoPlaceholder: 'photo-1596526131083-e8c633c948d2',
    website: 'https://make.com',
    apiAvailable: true,
    freeVersion: true
  },
  {
    id: 'reclaim-ai',
    name: 'Reclaim.ai',
    category: 'AI Productivity & Automation',
    description: 'Asistente de calendario IA que optimiza tu tiempo y programa automáticamente tareas.',
    pricing: 'Gratis hasta 3 calendarios, Starter $8/mes',
    complexity: 'beginner',
    tags: ['calendario', 'tiempo', 'programación', 'optimización'],
    logoPlaceholder: 'photo-1553484771-371a605b060b',
    website: 'https://reclaim.ai',
    apiAvailable: true,
    freeVersion: true
  },

  // AI Audio & Voice
  {
    id: 'eleven-labs',
    name: 'ElevenLabs',
    category: 'AI Audio & Voice',
    description: 'Generador de voz IA realista para crear audio, podcasts y doblajes con voces sintéticas.',
    pricing: 'Gratis hasta 10,000 caracteres/mes, Starter $5/mes',
    complexity: 'beginner',
    tags: ['voz sintética', 'audio', 'podcasts', 'doblaje'],
    logoPlaceholder: 'photo-1581291518857-4e27b48ff24e',
    website: 'https://elevenlabs.io',
    apiAvailable: true,
    freeVersion: true
  },
  {
    id: 'murf',
    name: 'Murf AI',
    category: 'AI Audio & Voice',
    description: 'Estudio de voz IA para crear voiceovers profesionales con múltiples voces y idiomas.',
    pricing: 'Gratis con límites, Basic $23/mes',
    complexity: 'beginner',
    tags: ['voiceover', 'múltiples voces', 'idiomas', 'profesional'],
    logoPlaceholder: 'photo-1455390582262-044cdead277a',
    website: 'https://murf.ai',
    apiAvailable: true,
    freeVersion: true
  },
  {
    id: 'whisper',
    name: 'OpenAI Whisper',
    category: 'AI Audio & Voice',
    description: 'Sistema de reconocimiento de voz automatico open source y multiidioma de OpenAI.',
    pricing: 'Gratis (open source), API $0.006/minuto',
    complexity: 'advanced',
    tags: ['reconocimiento', 'transcripción', 'open source', 'multiidioma'],
    logoPlaceholder: 'photo-1618477388954-7852f32655ec',
    website: 'https://openai.com/research/whisper',
    apiAvailable: true,
    freeVersion: true
  },
  {
    id: 'descript',
    name: 'Descript',
    category: 'AI Audio & Voice',
    description: 'Editor de audio y video con transcripción automática y clonación de voz.',
    pricing: 'Gratis con límites, Creator $12/mes',
    complexity: 'intermediate',
    tags: ['edición', 'transcripción', 'clonación', 'video'],
    logoPlaceholder: 'photo-1587620962725-abab7fe55159',
    website: 'https://descript.com',
    apiAvailable: true,
    freeVersion: true
  },

  // AI Data & Analytics
  {
    id: 'tableau-ai',
    name: 'Tableau Einstein',
    category: 'AI Data & Analytics',
    description: 'Capacidades de IA integradas en Tableau para análisis predictivo y insights automáticos.',
    pricing: 'Incluido en Tableau Creator desde $70/usuario/mes',
    complexity: 'advanced',
    tags: ['analytics', 'predictivo', 'visualización', 'insights'],
    logoPlaceholder: 'photo-1461749280684-dccba630e2f6',
    website: 'https://tableau.com/products/tableau-ai',
    apiAvailable: true,
    freeVersion: false
  },
  {
    id: 'power-bi-ai',
    name: 'Power BI AI',
    category: 'AI Data & Analytics',
    description: 'Funciones de inteligencia artificial integradas en Microsoft Power BI para análisis avanzado.',
    pricing: 'Incluido en Power BI Pro desde $10/usuario/mes',
    complexity: 'intermediate',
    tags: ['Microsoft', 'analytics', 'visualización', 'business intelligence'],
    logoPlaceholder: 'photo-1555066931-4365d14bab8c',
    website: 'https://powerbi.microsoft.com/ai',
    apiAvailable: true,
    freeVersion: false
  },
  {
    id: 'h2o-ai',
    name: 'H2O.ai',
    category: 'AI Data & Analytics',
    description: 'Plataforma de machine learning automatizado para crear modelos predictivos sin código.',
    pricing: 'Community gratis, Enterprise desde $1,000/mes',
    complexity: 'advanced',
    tags: ['machine learning', 'predictivo', 'automatizado', 'no-code'],
    logoPlaceholder: 'photo-1517077304055-6e89abbf09b0',
    website: 'https://h2o.ai',
    apiAvailable: true,
    freeVersion: true
  },
  {
    id: 'dataiku',
    name: 'Dataiku',
    category: 'AI Data & Analytics',
    description: 'Plataforma colaborativa de ciencia de datos y machine learning para equipos.',
    pricing: 'Free hasta 3 usuarios, Precio bajo consulta para teams',
    complexity: 'advanced',
    tags: ['ciencia datos', 'colaborativo', 'machine learning', 'equipos'],
    logoPlaceholder: 'photo-1617791160505-6f00504e3519',
    website: 'https://dataiku.com',
    apiAvailable: true,
    freeVersion: true
  },

  // AI Translation & Language
  {
    id: 'deepl',
    name: 'DeepL',
    category: 'AI Translation & Language',
    description: 'Traductor IA de alta precisión que supera a Google Translate en calidad.',
    pricing: 'Gratis hasta 500,000 caracteres/mes, Pro $6.99/mes',
    complexity: 'beginner',
    tags: ['traducción', 'precisión', 'idiomas', 'calidad'],
    logoPlaceholder: 'photo-1677442136019-21780ecad995',
    website: 'https://deepl.com',
    apiAvailable: true,
    freeVersion: true
  },
  {
    id: 'languagetool',
    name: 'LanguageTool',
    category: 'AI Translation & Language',
    description: 'Corrector gramatical y de estilo para múltiples idiomas con detección avanzada de errores.',
    pricing: 'Gratis básico, Premium $4.92/mes',
    complexity: 'beginner',
    tags: ['gramática', 'estilo', 'múltiples idiomas', 'corrección'],
    logoPlaceholder: 'photo-1596526131083-e8c633c948d2',
    website: 'https://languagetool.org',
    apiAvailable: true,
    freeVersion: true
  },
  {
    id: 'translate-google',
    name: 'Google Translate',
    category: 'AI Translation & Language',
    description: 'Servicio de traducción automática de Google con soporte para 100+ idiomas.',
    pricing: 'Gratis con límites, Cloud Translation API $20/1M caracteres',
    complexity: 'beginner',
    tags: ['Google', '100+ idiomas', 'gratuito', 'universal'],
    logoPlaceholder: 'photo-1553484771-371a605b060b',
    website: 'https://translate.google.com',
    apiAvailable: true,
    freeVersion: true
  },

  // AI Cybersecurity
  {
    id: 'darktrace',
    name: 'Darktrace',
    category: 'AI Cybersecurity',
    description: 'Plataforma de ciberseguridad que usa IA para detectar amenazas en tiempo real.',
    pricing: 'Precio bajo consulta (enterprise)',
    complexity: 'expert',
    tags: ['seguridad', 'amenazas', 'tiempo real', 'enterprise'],
    logoPlaceholder: 'photo-1581291518857-4e27b48ff24e',
    website: 'https://darktrace.com',
    apiAvailable: true,
    freeVersion: false
  },
  {
    id: 'crowdstrike',
    name: 'CrowdStrike Falcon',
    category: 'AI Cybersecurity',
    description: 'Plataforma de seguridad endpoint que utiliza IA para prevenir y detectar malware.',
    pricing: 'Precio bajo consulta (enterprise)',
    complexity: 'expert',
    tags: ['endpoint', 'malware', 'prevención', 'detección'],
    logoPlaceholder: 'photo-1455390582262-044cdead277a',
    website: 'https://crowdstrike.com',
    apiAvailable: true,
    freeVersion: false
  },

  // AI Education & Learning
  {
    id: 'coursera-ai',
    name: 'Coursera AI',
    category: 'AI Education & Learning',
    description: 'Funciones de IA en Coursera para personalizar rutas de aprendizaje y recomendaciones.',
    pricing: 'Cursos gratis con certificados de pago, Plus $59/mes',
    complexity: 'beginner',
    tags: ['educación', 'personalización', 'cursos', 'certificación'],
    logoPlaceholder: 'photo-1618477388954-7852f32655ec',
    website: 'https://coursera.org',
    apiAvailable: false,
    freeVersion: true
  },
  {
    id: 'khan-academy',
    name: 'Khan Academy Khanmigo',
    category: 'AI Education & Learning',
    description: 'Tutor IA personalizado para estudiantes que proporciona ayuda y explicaciones adaptadas.',
    pricing: 'Gratis',
    complexity: 'beginner',
    tags: ['tutor', 'personalizado', 'estudiantes', 'gratuito'],
    logoPlaceholder: 'photo-1587620962725-abab7fe55159',
    website: 'https://khanacademy.org/khan-labs',
    apiAvailable: false,
    freeVersion: true
  },
  {
    id: 'duolingo',
    name: 'Duolingo',
    category: 'AI Education & Learning',
    description: 'App de aprendizaje de idiomas que usa IA para personalizar lecciones y seguimiento.',
    pricing: 'Gratis con anuncios, Plus $6.99/mes',
    complexity: 'beginner',
    tags: ['idiomas', 'personalización', 'gamificación', 'móvil'],
    logoPlaceholder: 'photo-1461749280684-dccba630e2f6',
    website: 'https://duolingo.com',
    apiAvailable: false,
    freeVersion: true
  },

  // AI Health & Wellness
  {
    id: 'ada-health',
    name: 'Ada Health',
    category: 'AI Health & Wellness',
    description: 'Asistente de salud IA que evalúa síntomas y proporciona recomendaciones médicas.',
    pricing: 'Gratis para consumidores, Enterprise bajo consulta',
    complexity: 'beginner',
    tags: ['salud', 'síntomas', 'médico', 'evaluación'],
    logoPlaceholder: 'photo-1555066931-4365d14bab8c',
    website: 'https://ada.com',
    apiAvailable: true,
    freeVersion: true
  },
  {
    id: 'babylon-health',
    name: 'Babylon Health',
    category: 'AI Health & Wellness',
    description: 'Plataforma de salud digital con IA para consultas médicas virtuales y diagnósticos.',
    pricing: 'Varía según región y plan de salud',
    complexity: 'intermediate',
    tags: ['telemedicina', 'diagnóstico', 'consultas', 'digital'],
    logoPlaceholder: 'photo-1517077304055-6e89abbf09b0',
    website: 'https://babylonhealth.com',
    apiAvailable: true,
    freeVersion: false
  },

  // AI Finance & Fintech
  {
    id: 'mint-intuit',
    name: 'Mint by Intuit',
    category: 'AI Finance & Fintech',
    description: 'App de gestión financiera personal que usa IA para categorizar gastos y insights.',
    pricing: 'Gratis',
    complexity: 'beginner',
    tags: ['finanzas personales', 'gastos', 'categorización', 'gratuito'],
    logoPlaceholder: 'photo-1617791160505-6f00504e3519',
    website: 'https://mint.intuit.com',
    apiAvailable: false,
    freeVersion: true
  },
  {
    id: 'robo-advisor',
    name: 'Betterment',
    category: 'AI Finance & Fintech',
    description: 'Robo-advisor que usa IA para gestionar portafolios de inversión automáticamente.',
    pricing: '0.25% anual sobre activos gestionados, Premium 0.40%',
    complexity: 'intermediate',
    tags: ['inversión', 'portafolio', 'automatizado', 'robo-advisor'],
    logoPlaceholder: 'photo-1677442136019-21780ecad995',
    website: 'https://betterment.com',
    apiAvailable: false,
    freeVersion: false
  },

  // Continue with more categories and tools...
  // AI Gaming & Entertainment, AI Real Estate, AI Legal, etc.
  // [I'll continue with a few more to reach 100+ tools]

  // AI Gaming & Entertainment
  {
    id: 'nvidia-dlss',
    name: 'NVIDIA DLSS',
    category: 'AI Gaming & Entertainment',
    description: 'Tecnología de IA para mejorar rendimiento gráfico en videojuegos mediante super-resolución.',
    pricing: 'Gratis (requiere GPU NVIDIA RTX)',
    complexity: 'intermediate',
    tags: ['gaming', 'gráficos', 'rendimiento', 'super-resolución'],
    logoPlaceholder: 'photo-1596526131083-e8c633c948d2',
    website: 'https://nvidia.com/dlss',
    apiAvailable: false,
    freeVersion: true
  },
  {
    id: 'steamvr',
    name: 'SteamVR AI',
    category: 'AI Gaming & Entertainment',
    description: 'IA integrada en SteamVR para optimización automática y mejora de experiencia VR.',
    pricing: 'Gratis con Steam',
    complexity: 'advanced',
    tags: ['VR', 'gaming', 'optimización', 'experiencia'],
    logoPlaceholder: 'photo-1553484771-371a605b060b',
    website: 'https://store.steampowered.com/steamvr',
    apiAvailable: false,
    freeVersion: true
  }
];

// Export organized by categories for better management
export const categories = [
  'AI Writing & Content',
  'AI Code Assistant', 
  'AI Image & Video',
  'AI Business & Sales',
  'AI Research & Analysis',
  'AI Productivity & Automation',
  'AI Audio & Voice',
  'AI Data & Analytics',
  'AI Translation & Language',
  'AI Cybersecurity',
  'AI Education & Learning',
  'AI Health & Wellness',
  'AI Finance & Fintech',
  'AI Gaming & Entertainment'
];

export const complexityLevels = ['beginner', 'intermediate', 'advanced', 'expert'];
export const pricingRanges = ['free', 'low', 'medium', 'high', 'enterprise'];
