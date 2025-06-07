
import { EnhancedTool } from '../types';

export const blockchainWeb3Tools: EnhancedTool[] = [
  {
    id: 'metamask-73',
    name: 'MetaMask',
    category: 'Blockchain & Web3',
    subcategory: 'Crypto Wallet',
    description: 'MetaMask es una wallet de criptomonedas y puerta de entrada al ecosistema Web3 y aplicaciones descentralizadas.',
    pricing: 'Gratis',
    complexity: 'intermediate',
    difficulty_level: 5,
    learning_curve: 'moderate',
    community_size: 'massive',
    integration_options: ['DApps', 'DeFi protocols', 'NFT marketplaces'],
    tags: ['wallet', 'Web3', 'ethereum', 'DeFi'],
    logoPlaceholder: 'photo-1639762681485-074b7f938ba0',
    website: 'https://metamask.io',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'Interacción con DApps',
      'Trading de tokens',
      'Compra/venta de NFTs',
      'Staking de criptomonedas'
    ],
    comparison_matrix: {
      ease_of_use: 6,
      feature_richness: 9,
      pricing_value: 10,
      support_quality: 7,
      scalability: 9
    },
    similar_tools: ['coinbase-wallet-74', 'trust-wallet-75'],
    founded_year: 2016,
    user_rating: 4.2,
    monthly_active_users: '30M+',
    key_features: [
      'Soporte multi-chain',
      'Integración con DApps',
      'Swaps descentralizados',
      'Gestión de NFTs'
    ],
    pros: [
      'Líder en el mercado',
      'Amplia compatibilidad',
      'Comunidad grande'
    ],
    cons: [
      'Curva de aprendizaje',
      'Fees de red variables',
      'Riesgos de seguridad'
    ],
    best_for: [
      'Usuarios de DeFi',
      'Coleccionistas de NFTs',
      'Desarrolladores Web3'
    ],
    alternatives: ['Coinbase Wallet', 'Trust Wallet', 'Rainbow']
  },
  {
    id: 'opensea-74',
    name: 'OpenSea',
    category: 'Blockchain & Web3',
    subcategory: 'NFT Marketplace',
    description: 'OpenSea es el marketplace de NFTs más grande del mundo para comprar, vender y crear tokens no fungibles.',
    pricing: 'Gratis para crear, 2.5% comisión por venta',
    complexity: 'intermediate',
    difficulty_level: 4,
    learning_curve: 'moderate',
    community_size: 'massive',
    integration_options: ['Ethereum', 'Polygon', 'Solana', 'Various wallets'],
    tags: ['NFT', 'marketplace', 'coleccionables', 'arte digital'],
    logoPlaceholder: 'photo-1634973357973-f2ed2657db3c',
    website: 'https://opensea.io',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'Compra de NFTs',
      'Venta de arte digital',
      'Trading de coleccionables',
      'Creación de colecciones'
    ],
    comparison_matrix: {
      ease_of_use: 7,
      feature_richness: 9,
      pricing_value: 8,
      support_quality: 6,
      scalability: 9
    },
    similar_tools: ['magic-eden-75', 'rarible-76'],
    founded_year: 2017,
    user_rating: 3.8,
    monthly_active_users: '1M+',
    key_features: [
      'Marketplace multi-chain',
      'Herramientas de creación',
      'Analytics de colecciones',
      'Subastas automáticas'
    ],
    pros: [
      'Mayor marketplace de NFTs',
      'Amplia variedad',
      'Soporte multi-blockchain'
    ],
    cons: [
      'Fees elevados',
      'Interfaz compleja',
      'Problemas de escalabilidad'
    ],
    best_for: [
      'Coleccionistas de NFTs',
      'Artistas digitales',
      'Inversores en NFTs'
    ],
    alternatives: ['Magic Eden', 'Rarible', 'Foundation']
  },
  {
    id: 'uniswap-75',
    name: 'Uniswap',
    category: 'Blockchain & Web3',
    subcategory: 'DeFi Exchange',
    description: 'Uniswap es un exchange descentralizado (DEX) que permite intercambiar tokens ERC-20 sin intermediarios.',
    pricing: 'Gratis de usar, fees de red aplicables',
    complexity: 'advanced',
    difficulty_level: 7,
    learning_curve: 'steep',
    community_size: 'large',
    integration_options: ['Ethereum', 'Layer 2s', 'Wallet integrations'],
    tags: ['DeFi', 'DEX', 'trading', 'liquidez'],
    logoPlaceholder: 'photo-1621761191319-c6fb62004040',
    website: 'https://uniswap.org',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'Trading de tokens',
      'Provisión de liquidez',
      'Yield farming',
      'Arbitraje'
    ],
    comparison_matrix: {
      ease_of_use: 5,
      feature_richness: 9,
      pricing_value: 8,
      support_quality: 7,
      scalability: 8
    },
    similar_tools: ['sushiswap-76', 'pancakeswap-77'],
    founded_year: 2018,
    user_rating: 4.3,
    monthly_active_users: '500K+',
    key_features: [
      'AMM sin orden book',
      'Pools de liquidez',
      'Governance token',
      'Múltiples versiones'
    ],
    pros: [
      'Pionero en DeFi',
      'Alta liquidez',
      'Descentralizado'
    ],
    cons: [
      'Fees de gas altos',
      'Complejidad técnica',
      'Riesgo de impermanent loss'
    ],
    best_for: [
      'Traders experimentados',
      'Proveedores de liquidez',
      'Entusiastas de DeFi'
    ],
    alternatives: ['SushiSwap', 'PancakeSwap', '1inch']
  }
];
