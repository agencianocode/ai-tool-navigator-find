
import { EnhancedTool } from '../types';

export const blockchainWeb3Tools: EnhancedTool[] = [
  {
    id: 'metamask-73',
    name: 'MetaMask',
    category: 'Blockchain & Web3',
    subcategory: 'Crypto Wallet',
    description: 'MetaMask es la wallet de criptomonedas más popular que permite interactuar con aplicaciones descentralizadas (dApps).',
    pricing: 'Gratuito, fees de red variables',
    complexity: 'intermediate',
    difficulty_level: 4,
    learning_curve: 'moderate',
    community_size: 'massive',
    integration_options: ['Ethereum', 'BSC', 'Polygon', 'dApps'],
    tags: ['wallet', 'Ethereum', 'DeFi', 'browser extension'],
    logoPlaceholder: 'photo-1640161704729-cbe966a08476',
    website: 'https://metamask.io',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'Almacenar ETH y tokens',
      'Interactuar con DeFi',
      'NFT trading',
      'dApp authentication'
    ],
    comparison_matrix: {
      ease_of_use: 7,
      feature_richness: 8,
      pricing_value: 9,
      support_quality: 7,
      scalability: 8
    },
    similar_tools: ['coinbase-wallet-74', 'trust-wallet-75'],
    founded_year: 2016,
    user_rating: 4.2,
    monthly_active_users: '30M+',
    key_features: [
      'Multi-chain support',
      'dApp browser',
      'Token swaps',
      'Hardware wallet support'
    ],
    pros: [
      'Más popular y confiable',
      'Amplio soporte dApp',
      'Múltiples redes'
    ],
    cons: [
      'Fees de red altos',
      'Curva de aprendizaje',
      'Target de hackers'
    ],
    best_for: [
      'Usuarios DeFi',
      'NFT collectors',
      'Desarrolladores Web3'
    ],
    alternatives: ['Coinbase Wallet', 'Trust Wallet', 'Rainbow']
  },
  {
    id: 'opensea-74',
    name: 'OpenSea',
    category: 'Blockchain & Web3',
    subcategory: 'NFT Marketplace',
    description: 'OpenSea es el marketplace de NFTs más grande del mundo donde puedes comprar, vender y descubrir activos digitales únicos.',
    pricing: '2.5% fee por transacción',
    complexity: 'intermediate',
    difficulty_level: 4,
    learning_curve: 'moderate',
    community_size: 'massive',
    integration_options: ['Ethereum', 'Polygon', 'Klaytn', 'Solana'],
    tags: ['NFT', 'marketplace', 'arte digital', 'coleccionables'],
    logoPlaceholder: 'photo-1640161704729-cbe966a08476',
    website: 'https://opensea.io',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'Comprar/vender NFTs',
      'Crear colecciones',
      'Descubrir arte digital',
      'Trading de coleccionables'
    ],
    comparison_matrix: {
      ease_of_use: 8,
      feature_richness: 9,
      pricing_value: 7,
      support_quality: 6,
      scalability: 9
    },
    similar_tools: ['blur-75', 'superrare-76'],
    founded_year: 2017,
    user_rating: 3.8,
    monthly_active_users: '1M+',
    key_features: [
      'Marketplace completo',
      'Multi-chain support',
      'Collection analytics',
      'Bulk operations'
    ],
    pros: [
      'Mayor marketplace NFT',
      'Amplia selección',
      'Múltiples blockchains'
    ],
    cons: [
      'Fees altos',
      'Competencia de bots',
      'UI puede ser confusa'
    ],
    best_for: [
      'Collectores NFT',
      'Artistas digitales',
      'Inversores cripto'
    ],
    alternatives: ['Blur', 'SuperRare', 'Foundation']
  },
  {
    id: 'uniswap-75',
    name: 'Uniswap',
    category: 'Blockchain & Web3',
    subcategory: 'DeFi Exchange',
    description: 'Uniswap es un protocolo de intercambio descentralizado (DEX) que permite hacer swap de tokens ERC-20 sin intermediarios.',
    pricing: '0.3% fee por swap + gas fees',
    complexity: 'advanced',
    difficulty_level: 6,
    learning_curve: 'steep',
    community_size: 'large',
    integration_options: ['Ethereum', 'Polygon', 'Arbitrum', 'Optimism'],
    tags: ['DEX', 'DeFi', 'swap', 'liquidez'],
    logoPlaceholder: 'photo-1640161704729-cbe966a08476',
    website: 'https://uniswap.org',
    apiAvailable: true,
    freeVersion: true,
    use_case_examples: [
      'Token swapping',
      'Liquidity providing',
      'Yield farming',
      'Token discovery'
    ],
    comparison_matrix: {
      ease_of_use: 6,
      feature_richness: 9,
      pricing_value: 8,
      support_quality: 7,
      scalability: 8
    },
    similar_tools: ['1inch-76', 'sushiswap-77'],
    founded_year: 2018,
    user_rating: 4.1,
    monthly_active_users: '200K+',
    key_features: [
      'Automated Market Maker',
      'Liquidity pools',
      'Multi-chain support',
      'Protocol governance'
    ],
    pros: [
      'Protocolo más seguro',
      'Alta liquidez',
      'Open source'
    ],
    cons: [
      'Gas fees altos',
      'Slippage en trades grandes',
      'Complejidad para principiantes'
    ],
    best_for: [
      'DeFi power users',
      'Liquidity providers',
      'Token traders'
    ],
    alternatives: ['1inch', 'SushiSwap', 'PancakeSwap']
  }
];
