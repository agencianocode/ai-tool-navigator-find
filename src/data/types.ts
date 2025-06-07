
export interface EnhancedTool {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  description: string;
  pricing: string;
  complexity: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  difficulty_level: number;
  learning_curve: 'immediate' | 'gentle' | 'moderate' | 'steep';
  community_size: 'small' | 'medium' | 'large' | 'massive';
  integration_options: string[];
  tags: string[];
  logoPlaceholder: string;
  website: string;
  apiAvailable: boolean;
  freeVersion: boolean;
  use_case_examples: string[];
  comparison_matrix: {
    ease_of_use: number;
    feature_richness: number;
    pricing_value: number;
    support_quality: number;
    scalability: number;
  };
  similar_tools: string[];
  founded_year: number;
  user_rating: number;
  monthly_active_users: string;
  key_features: string[];
  pros: string[];
  cons: string[];
  best_for: string[];
  alternatives: string[];
}
