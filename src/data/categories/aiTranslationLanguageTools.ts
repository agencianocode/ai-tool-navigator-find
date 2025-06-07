
import { EnhancedTool } from '../types';

export const aiTranslationLanguageTools: EnhancedTool[] = [
  {
    id: 'deepl-55',
    name: 'DeepL',
    category: 'AI Translation & Language',
    subcategory: 'Translation',
    description: 'DeepL es un traductor de IA que ofrece traducciones de alta calidad superando a Google Translate en precisión.',
    pricing: 'Gratis hasta 500,000 caracteres/mes, Pro $6.99/mes',
    complexity: 'beginner',
    difficulty_level: 2,
    learning_curve: 'immediate',
    community_size: 'large',
    integration_options: ['API REST', 'CAT Tools', 'Browser Extension'],
    tags: ['traducción', 'idiomas', 'precisión', 'calidad'],
    logoPlaceholder: 'photo-1451187580459-43490279c0fa',
    website: 'https://deepl.com',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'Traducción de documentos',
      'Localización de software',
      'Traducción de emails',
      'Contenido web multiidioma'
    ],
    comparison_matrix: {
      ease_of_use: 10,
      feature_richness: 8,
      pricing_value: 9,
      support_quality: 8,
      scalability: 8
    },
    similar_tools: ['google-translate-56', 'microsoft-translator-57'],
    founded_year: 2017,
    user_rating: 4.7,
    monthly_active_users: '1M+',
    key_features: [
      'Traducción neuronal',
      'Preservación de formato',
      'Detección automática de idioma',
      'Traducción de archivos'
    ],
    pros: [
      'Calidad superior a Google Translate',
      'Interfaz muy simple',
      'Preserva el formato'
    ],
    cons: [
      'Menos idiomas que Google',
      'Límites en versión gratuita',
      'Menos integraciones'
    ],
    best_for: [
      'Traductores profesionales',
      'Empresas internacionales',
      'Creadores de contenido'
    ],
    alternatives: ['Google Translate', 'Microsoft Translator', 'Amazon Translate']
  },
  {
    id: 'languagetool-56',
    name: 'LanguageTool',
    category: 'AI Translation & Language',
    subcategory: 'Grammar Check',
    description: 'LanguageTool es un corrector gramatical y de estilo multiidioma que mejora la calidad de escritura.',
    pricing: 'Gratis básico, Premium $4.92/mes',
    complexity: 'beginner',
    difficulty_level: 2,
    learning_curve: 'immediate',
    community_size: 'medium',
    integration_options: ['Browser Extensions', 'Microsoft Office', 'Google Docs'],
    tags: ['gramática', 'corrección', 'multiidioma', 'estilo'],
    logoPlaceholder: 'photo-1590736969955-71cc94901144',
    website: 'https://languagetool.org',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'Corrección de emails',
      'Revisión de documentos',
      'Escritura académica',
      'Contenido web'
    ],
    comparison_matrix: {
      ease_of_use: 9,
      feature_richness: 7,
      pricing_value: 9,
      support_quality: 7,
      scalability: 7
    },
    similar_tools: ['grammarly-3', 'prowritingaid-57'],
    founded_year: 2003,
    user_rating: 4.4,
    monthly_active_users: '500K+',
    key_features: [
      'Soporte 20+ idiomas',
      'Detección de estilo',
      'Sugerencias contextuales',
      'Open source'
    ],
    pros: [
      'Soporte multiidioma',
      'Open source',
      'Buena relación calidad-precio'
    ],
    cons: [
      'Menos funciones que Grammarly',
      'Interfaz menos pulida',
      'Limitaciones en versión gratuita'
    ],
    best_for: [
      'Usuarios multiidioma',
      'Escritores internacionales',
      'Estudiantes'
    ],
    alternatives: ['Grammarly', 'ProWritingAid', 'Ginger']
  },
  {
    id: 'google-translate-57',
    name: 'Google Translate',
    category: 'AI Translation & Language',
    subcategory: 'Translation',
    description: 'Google Translate es el servicio de traducción más utilizado del mundo con soporte para 100+ idiomas.',
    pricing: 'Gratis con límites, Cloud Translation API $20/1M caracteres',
    complexity: 'beginner',
    difficulty_level: 1,
    learning_curve: 'immediate',
    community_size: 'massive',
    integration_options: ['API Cloud', 'Mobile Apps', 'Browser Extension'],
    tags: ['traducción', 'universal', 'gratuito', 'Google'],
    logoPlaceholder: 'photo-1598488035139-bdbb2231ce04',
    website: 'https://translate.google.com',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'Traducción rápida',
      'Comunicación internacional',
      'Turismo',
      'Aprendizaje de idiomas'
    ],
    comparison_matrix: {
      ease_of_use: 10,
      feature_richness: 8,
      pricing_value: 10,
      support_quality: 7,
      scalability: 10
    },
    similar_tools: ['deepl-55', 'bing-translator-58'],
    founded_year: 2006,
    user_rating: 4.3,
    monthly_active_users: '500M+',
    key_features: [
      '100+ idiomas',
      'Traducción de imágenes',
      'Conversación en tiempo real',
      'Traducción offline'
    ],
    pros: [
      'Completamente gratuito',
      'Más idiomas disponibles',
      'Integración universal'
    ],
    cons: [
      'Calidad variable',
      'Menos preciso que DeepL',
      'Limitaciones de privacidad'
    ],
    best_for: [
      'Uso general',
      'Viajeros',
      'Estudiantes'
    ],
    alternatives: ['DeepL', 'Microsoft Translator', 'Yandex Translate']
  }
];
