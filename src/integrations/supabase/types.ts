export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      budget_templates: {
        Row: {
          base_cost: number
          category: string
          cost_per_feature: number | null
          cost_per_user: number | null
          created_at: string
          description: string | null
          id: string
          name: string
        }
        Insert: {
          base_cost: number
          category: string
          cost_per_feature?: number | null
          cost_per_user?: number | null
          created_at?: string
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          base_cost?: number
          category?: string
          cost_per_feature?: number | null
          cost_per_user?: number | null
          created_at?: string
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      generated_budgets: {
        Row: {
          budget_items: Json
          created_at: string
          id: string
          monthly_cost: number
          project_details: Json | null
          project_name: string
          total_cost: number
          updated_at: string
          user_id: string | null
        }
        Insert: {
          budget_items: Json
          created_at?: string
          id?: string
          monthly_cost: number
          project_details?: Json | null
          project_name: string
          total_cost: number
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          budget_items?: Json
          created_at?: string
          id?: string
          monthly_cost?: number
          project_details?: Json | null
          project_name?: string
          total_cost?: number
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      notification_preferences: {
        Row: {
          created_at: string
          email_new_tools: boolean | null
          email_reviews: boolean | null
          email_roadmap_updates: boolean | null
          email_weekly_digest: boolean | null
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          email_new_tools?: boolean | null
          email_reviews?: boolean | null
          email_roadmap_updates?: boolean | null
          email_weekly_digest?: boolean | null
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          email_new_tools?: boolean | null
          email_reviews?: boolean | null
          email_roadmap_updates?: boolean | null
          email_weekly_digest?: boolean | null
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      notifications: {
        Row: {
          action_url: string | null
          created_at: string | null
          id: string
          message: string
          read: boolean | null
          title: string
          type: string
          user_id: string
        }
        Insert: {
          action_url?: string | null
          created_at?: string | null
          id?: string
          message: string
          read?: boolean | null
          title: string
          type?: string
          user_id: string
        }
        Update: {
          action_url?: string | null
          created_at?: string | null
          id?: string
          message?: string
          read?: boolean | null
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string | null
          full_name: string | null
          id: string
          location: string | null
          updated_at: string | null
          username: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          full_name?: string | null
          id: string
          location?: string | null
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          full_name?: string | null
          id?: string
          location?: string | null
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Relationships: []
      }
      review_reports: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          reason: string
          reporter_id: string
          review_id: string
          status: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          reason: string
          reporter_id: string
          review_id: string
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          reason?: string
          reporter_id?: string
          review_id?: string
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "review_reports_review_id_fkey"
            columns: ["review_id"]
            isOneToOne: false
            referencedRelation: "tool_reviews"
            referencedColumns: ["id"]
          },
        ]
      }
      review_votes: {
        Row: {
          created_at: string
          id: string
          is_helpful: boolean
          review_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_helpful: boolean
          review_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_helpful?: boolean
          review_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "review_votes_review_id_fkey"
            columns: ["review_id"]
            isOneToOne: false
            referencedRelation: "tool_reviews"
            referencedColumns: ["id"]
          },
        ]
      }
      roadmap_templates: {
        Row: {
          author_id: string | null
          author_name: string | null
          author_type: string | null
          category: string
          created_at: string | null
          description: string | null
          difficulty_level: string | null
          downloads_count: number | null
          estimated_timeline: string | null
          id: string
          industry: string
          is_featured: boolean | null
          is_premium: boolean | null
          preview_image: string | null
          price: number | null
          rating: number | null
          reviews_count: number | null
          tags: string[] | null
          template_data: Json
          title: string
          tools_included: Json
          updated_at: string | null
        }
        Insert: {
          author_id?: string | null
          author_name?: string | null
          author_type?: string | null
          category: string
          created_at?: string | null
          description?: string | null
          difficulty_level?: string | null
          downloads_count?: number | null
          estimated_timeline?: string | null
          id?: string
          industry: string
          is_featured?: boolean | null
          is_premium?: boolean | null
          preview_image?: string | null
          price?: number | null
          rating?: number | null
          reviews_count?: number | null
          tags?: string[] | null
          template_data: Json
          title: string
          tools_included: Json
          updated_at?: string | null
        }
        Update: {
          author_id?: string | null
          author_name?: string | null
          author_type?: string | null
          category?: string
          created_at?: string | null
          description?: string | null
          difficulty_level?: string | null
          downloads_count?: number | null
          estimated_timeline?: string | null
          id?: string
          industry?: string
          is_featured?: boolean | null
          is_premium?: boolean | null
          preview_image?: string | null
          price?: number | null
          rating?: number | null
          reviews_count?: number | null
          tags?: string[] | null
          template_data?: Json
          title?: string
          tools_included?: Json
          updated_at?: string | null
        }
        Relationships: []
      }
      roadmaps: {
        Row: {
          budget_range: string | null
          created_at: string | null
          custom_name: string | null
          description: string | null
          id: string
          is_favorite: boolean | null
          project_type: string | null
          questionnaire_answers: Json | null
          roadmap_data: Json
          selected_tools: Json | null
          skill_level: string | null
          status: string | null
          timeline: string | null
          title: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          budget_range?: string | null
          created_at?: string | null
          custom_name?: string | null
          description?: string | null
          id?: string
          is_favorite?: boolean | null
          project_type?: string | null
          questionnaire_answers?: Json | null
          roadmap_data: Json
          selected_tools?: Json | null
          skill_level?: string | null
          status?: string | null
          timeline?: string | null
          title: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          budget_range?: string | null
          created_at?: string | null
          custom_name?: string | null
          description?: string | null
          id?: string
          is_favorite?: boolean | null
          project_type?: string | null
          questionnaire_answers?: Json | null
          roadmap_data?: Json
          selected_tools?: Json | null
          skill_level?: string | null
          status?: string | null
          timeline?: string | null
          title?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      subscribers: {
        Row: {
          created_at: string
          email: string
          id: string
          stripe_customer_id: string | null
          subscribed: boolean
          subscription_end: string | null
          subscription_tier: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          stripe_customer_id?: string | null
          subscribed?: boolean
          subscription_end?: string | null
          subscription_tier?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          stripe_customer_id?: string | null
          subscribed?: boolean
          subscription_end?: string | null
          subscription_tier?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      template_purchases: {
        Row: {
          id: string
          purchase_price: number
          purchased_at: string | null
          stripe_payment_intent_id: string | null
          template_id: string
          user_id: string
        }
        Insert: {
          id?: string
          purchase_price: number
          purchased_at?: string | null
          stripe_payment_intent_id?: string | null
          template_id: string
          user_id: string
        }
        Update: {
          id?: string
          purchase_price?: number
          purchased_at?: string | null
          stripe_payment_intent_id?: string | null
          template_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "template_purchases_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "roadmap_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      template_reviews: {
        Row: {
          created_at: string | null
          helpful_count: number | null
          id: string
          is_verified: boolean | null
          rating: number
          review_content: string | null
          review_title: string | null
          template_id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          helpful_count?: number | null
          id?: string
          is_verified?: boolean | null
          rating: number
          review_content?: string | null
          review_title?: string | null
          template_id: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          helpful_count?: number | null
          id?: string
          is_verified?: boolean | null
          rating?: number
          review_content?: string | null
          review_title?: string | null
          template_id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "template_reviews_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "roadmap_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      tool_reviews: {
        Row: {
          created_at: string
          helpful_count: number | null
          id: string
          is_verified: boolean | null
          rating: number
          review_content: string | null
          review_title: string | null
          tool_id: string
          tool_name: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          helpful_count?: number | null
          id?: string
          is_verified?: boolean | null
          rating: number
          review_content?: string | null
          review_title?: string | null
          tool_id: string
          tool_name: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          helpful_count?: number | null
          id?: string
          is_verified?: boolean | null
          rating?: number
          review_content?: string | null
          review_title?: string | null
          tool_id?: string
          tool_name?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_favorite_tools: {
        Row: {
          created_at: string
          id: string
          tool_name: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          tool_name: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          tool_name?: string
          user_id?: string
        }
        Relationships: []
      }
      user_stats: {
        Row: {
          completed_roadmaps: number | null
          created_at: string
          id: string
          last_activity: string | null
          total_roadmaps: number | null
          total_tools_explored: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          completed_roadmaps?: number | null
          created_at?: string
          id?: string
          last_activity?: string | null
          total_roadmaps?: number | null
          total_tools_explored?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          completed_roadmaps?: number | null
          created_at?: string
          id?: string
          last_activity?: string | null
          total_roadmaps?: number | null
          total_tools_explored?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
