
import { EnhancedTool } from '../types';

export const aiDataAnalyticsTools: EnhancedTool[] = [
  {
    id: 'tableau-52',
    name: 'Tableau',
    category: 'AI Data & Analytics',
    subcategory: 'Data Visualization',
    description: 'Tableau es una plataforma líder de visualización de datos que ahora incorpora IA para análisis predictivo y insights automáticos.',
    pricing: 'Tableau Public gratis, Creator $70/mes',
    complexity: 'intermediate',
    difficulty_level: 6,
    learning_curve: 'moderate',
    community_size: 'massive',
    integration_options: ['Salesforce', 'AWS', 'Google Cloud', 'Microsoft'],
    tags: ['visualización', 'business intelligence', 'dashboards', 'análisis'],
    logoPlaceholder: 'photo-1551288049-bebda4e38f71',
    website: 'https://tableau.com',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'Dashboards ejecutivos',
      'Análisis de ventas',
      'Reportes financieros',
      'KPIs operacionales'
    ],
    comparison_matrix: {
      ease_of_use: 6,
      feature_richness: 10,
      pricing_value: 6,
      support_quality: 9,
      scalability: 10
    },
    similar_tools: ['power-bi-53', 'qlik-54'],
    founded_year: 2003,
    user_rating: 4.4,
    monthly_active_users: '1M+',
    key_features: [
      'Visualizaciones interactivas',
      'Conexión a múltiples fuentes',
      'IA para insights automáticos',
      'Colaboración empresarial'
    ],
    pros: [
      'Muy potente y flexible',
      'Excelente para visualizaciones complejas',
      'Gran comunidad'
    ],
    cons: [
      'Precio elevado',
      'Curva de aprendizaje pronunciada',
      'Puede ser excesivo para uso básico'
    ],
    best_for: [
      'Analistas de datos',
      'Empresas grandes',
      'Visualizaciones complejas'
    ],
    alternatives: ['Power BI', 'Qlik Sense', 'Looker']
  },
  {
    id: 'power-bi-53',
    name: 'Microsoft Power BI',
    category: 'AI Data & Analytics',
    subcategory: 'Business Intelligence',
    description: 'Power BI es la plataforma de business intelligence de Microsoft que integra capacidades de IA para análisis y predicciones.',
    pricing: 'Power BI Desktop gratis, Pro $10/usuario/mes',
    complexity: 'intermediate',
    difficulty_level: 5,
    learning_curve: 'moderate',
    community_size: 'massive',
    integration_options: ['Office 365', 'Azure', 'SQL Server', 'SharePoint'],
    tags: ['Microsoft', 'BI', 'análisis', 'integración'],
    logoPlaceholder: 'photo-1460925895917-afdab827c52f',
    website: 'https://powerbi.microsoft.com',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'Reportes corporativos',
      'Análisis de rendimiento',
      'Dashboards departamentales',
      'Predicciones de negocio'
    ],
    comparison_matrix: {
      ease_of_use: 7,
      feature_richness: 9,
      pricing_value: 8,
      support_quality: 8,
      scalability: 9
    },
    similar_tools: ['tableau-52', 'google-analytics-37'],
    founded_year: 2011,
    user_rating: 4.3,
    monthly_active_users: '5M+',
    key_features: [
      'Integración con ecosistema Microsoft',
      'IA y machine learning',
      'Dashboards en tiempo real',
      'Acceso móvil'
    ],
    pros: [
      'Excelente integración con Microsoft',
      'Precio competitivo',
      'Actualizaciones frecuentes'
    ],
    cons: [
      'Limitado fuera del ecosistema Microsoft',
      'Menos flexible que Tableau',
      'Curva de aprendizaje'
    ],
    best_for: [
      'Empresas Microsoft',
      'Analistas de negocio',
      'Departamentos corporativos'
    ],
    alternatives: ['Tableau', 'Qlik Sense', 'Google Data Studio']
  },
  {
    id: 'databricks-54',
    name: 'Databricks',
    category: 'AI Data & Analytics',
    subcategory: 'Machine Learning',
    description: 'Databricks es una plataforma unificada de analytics que combina data engineering, machine learning y analytics colaborativo.',
    pricing: 'Desde $0.15/DBU según uso, Community Edition gratis',
    complexity: 'advanced',
    difficulty_level: 8,
    learning_curve: 'steep',
    community_size: 'large',
    integration_options: ['AWS', 'Azure', 'Google Cloud', 'Apache Spark'],
    tags: ['machine learning', 'big data', 'colaborativo', 'nube'],
    logoPlaceholder: 'photo-1518709268805-4e9042af2176',
    website: 'https://databricks.com',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'Modelos de machine learning',
      'Procesamiento de big data',
      'Analytics en tiempo real',
      'Data lakes'
    ],
    comparison_matrix: {
      ease_of_use: 5,
      feature_richness: 10,
      pricing_value: 7,
      support_quality: 8,
      scalability: 10
    },
    similar_tools: ['snowflake-55', 'google-cloud-ai-56'],
    founded_year: 2013,
    user_rating: 4.5,
    monthly_active_users: '200K+',
    key_features: [
      'Notebooks colaborativos',
      'MLflow integrado',
      'Auto-scaling',
      'Multi-cloud'
    ],
    pros: [
      'Muy potente para ML',
      'Colaboración excelente',
      'Escalabilidad automática'
    ],
    cons: [
      'Muy complejo para principiantes',
      'Costoso para uso intensivo',
      'Requiere conocimientos técnicos'
    ],
    best_for: [
      'Data scientists',
      'Empresas con big data',
      'Equipos de ML'
    ],
    alternatives: ['Snowflake', 'Google Cloud AI', 'Amazon SageMaker']
  }
];
