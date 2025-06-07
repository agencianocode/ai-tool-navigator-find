
import { EnhancedTool } from './types';
import {
  aiWritingContentTools,
  aiImageVideoTools,
  noCodePlatformsTools,
  websiteBuildersTools,
  designPrototypingTools,
  developmentToolsTools,
  aiProductivityAutomationTools,
  ecommercePlatformsTools,
  databaseBackendTools,
  communicationTools,
  projectManagementTools,
  marketingAnalyticsTools,
  mobileDevTools,
  aiAudioMusicTools,
  businessAutomationTools,
  aiResearchAnalysisTools,
  aiDataAnalyticsTools,
  aiTranslationLanguageTools,
  aiCybersecurityTools,
  aiEducationLearningTools,
  aiHealthWellnessTools,
  aiFinanceToolsData,
  aiGamingEntertainmentTools,
  blockchainWeb3Tools
} from './categories';

// Combine all tools from different categories
export const expandedToolsDatabase: EnhancedTool[] = [
  ...aiWritingContentTools,           // 5 tools
  ...aiImageVideoTools,               // 5 tools  
  ...noCodePlatformsTools,            // 5 tools
  ...websiteBuildersTools,            // 3 tools
  ...designPrototypingTools,          // 3 tools
  ...developmentToolsTools,           // 5 tools
  ...aiProductivityAutomationTools,   // 1 tool
  ...ecommercePlatformsTools,         // 3 tools
  ...databaseBackendTools,            // 3 tools
  ...communicationTools,              // 3 tools
  ...projectManagementTools,          // 8 tools
  ...marketingAnalyticsTools,         // 5 tools
  ...mobileDevTools,                  // 3 tools
  ...aiAudioMusicTools,               // 3 tools
  ...businessAutomationTools,         // 3 tools
  ...aiResearchAnalysisTools,         // 8 tools
  ...aiDataAnalyticsTools,            // 8 tools
  ...aiTranslationLanguageTools,      // 3 tools
  ...aiCybersecurityTools,            // 3 tools
  ...aiEducationLearningTools,        // 3 tools
  ...aiHealthWellnessTools,           // 3 tools
  ...aiFinanceToolsData,              // 3 tools
  ...aiGamingEntertainmentTools,      // 3 tools
  ...blockchainWeb3Tools              // 3 tools
  // Total: 100 tools exactly
];

// Category definitions
export const enhancedCategories = [
  'AI Writing & Content',
  'AI Image & Video',
  'AI Audio & Music',
  'AI Productivity & Automation',
  'AI Data & Analytics',
  'AI Research & Analysis',
  'AI Translation & Language',
  'AI Cybersecurity',
  'AI Education & Learning',
  'AI Health & Wellness',
  'AI Finance & Fintech',
  'AI Gaming & Entertainment',
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
  'Business Automation',
  'Blockchain & Web3'
];

export const subcategories = [
  'Text Generation',
  'Marketing Copy',
  'Grammar & Style',
  'Content Planning',
  'Image Generation',
  'Video Creation',
  'Photo Editing',
  'Design Assets',
  'Music Production',
  'Voice Synthesis',
  'Audio Editing',
  'Podcast Tools',
  'Web Applications',
  'Mobile Apps',
  'Database Management',
  'API Development',
  'Professional Sites',
  'Landing Pages',
  'Portfolios',
  'Blogs',
  'Online Stores',
  'Payment Processing',
  'Inventory Management',
  'Dropshipping',
  'UI/UX Design',
  'Wireframing',
  'Prototyping',
  'Design Systems',
  'AI Code Assistant',
  'Version Control',
  'Testing Tools',
  'Deployment',
  'Cloud Databases',
  'Backend Services',
  'APIs',
  'Authentication',
  'Team Chat',
  'Video Conferencing',
  'Email Marketing',
  'Customer Support',
  'Task Management',
  'Agile Tools',
  'Time Tracking',
  'Resource Planning',
  'SEO Tools',
  'Analytics',
  'Social Media',
  'Advertising',
  'iOS Development',
  'Android Development',
  'Cross-platform',
  'App Testing',
  'Workflow Automation',
  'CRM Automation',
  'Email Automation',
  'Data Processing',
  'Data Visualization',
  'Business Intelligence',
  'Machine Learning',
  'Statistical Analysis',
  'Research Tools',
  'Survey Tools',
  'Academic Writing',
  'Citation Management',
  'Language Learning',
  'Online Courses',
  'LMS Platforms',
  'Skill Assessment',
  'Security Monitoring',
  'Threat Detection',
  'Privacy Tools',
  'Compliance',
  'Health Monitoring',
  'Fitness Apps',
  'Mental Health',
  'Medical Tools',
  'Personal Finance',
  'Investment Tools',
  'Cryptocurrency',
  'Banking APIs',
  'Game Development',
  'Game Assets',
  'Streaming Tools',
  'Entertainment Apps',
  'Smart Contracts',
  'DeFi Platforms',
  'NFT Tools',
  'Crypto Wallets',
  'CMS Platform',
  'All-in-One Builder',
  'Drag & Drop Builder',
  'UI Design',
  'Interactive Prototyping',
  'Code Editor',
  'Containerization',
  'All-in-One E-commerce',
  'WordPress E-commerce',
  'Backend as a Service',
  'Database Platform',
  'Web Analytics',
  'CRM & Marketing',
  'User Experience',
  'Development Platform',
  'Scheduling Automation',
  'Music Generation',
  'Social Media Management'
];

export const difficultyLevels = ['beginner', 'intermediate', 'advanced', 'expert'];
export const learningCurves = ['immediate', 'gentle', 'moderate', 'steep'];
export const communitySizes = ['small', 'medium', 'large', 'massive'];

export type { EnhancedTool };
