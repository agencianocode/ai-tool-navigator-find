
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, ExternalLink, Star, TrendingUp } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { expandedAiTools } from "@/data/expandedAiTools";
import { Link } from "react-router-dom";

const PersonalizedRecommendations = () => {
  const { user } = useAuth();

  const { data: recommendations } = useQuery({
    queryKey: ['personalized-recommendations', user?.id],
    queryFn: async () => {
      if (!user) return { suggestedTools: [], trendingTools: [], personalizedTips: [] };
      
      // Get user's roadmaps to understand preferences
      const { data: roadmaps } = await supabase
        .from('roadmaps')
        .select('questionnaire_answers, selected_tools')
        .eq('user_id', user.id);

      // Get user's reviews to understand used tools
      const { data: reviews } = await supabase
        .from('tool_reviews')
        .select('tool_name, rating')
        .eq('user_id', user.id);

      // Get user's favorite tools
      const { data: favorites } = await supabase
        .from('user_favorite_tools')
        .select('tool_name')
        .eq('user_id', user.id);

      const usedTools = new Set(reviews?.map(r => r.tool_name) || []);
      const favoriteTools = new Set(favorites?.map(f => f.tool_name) || []);
      
      // Extract preferences from roadmaps
      const interests = new Set<string>();
      const projectTypes = new Set<string>();
      
      roadmaps?.forEach(roadmap => {
        const answers = roadmap.questionnaire_answers as any;
        if (answers?.interests) {
          answers.interests.forEach((interest: string) => interests.add(interest));
        }
        if (answers?.projectType) {
          projectTypes.add(answers.projectType);
        }
      });

      // Find tools user hasn't tried
      const availableTools = expandedAiTools.filter(tool => !usedTools.has(tool.name));
      
      // Score tools based on user preferences
      const scoredTools = availableTools.map(tool => {
        let score = 0;
        
        // Higher score for tools matching user interests
        if (tool.categories.some(cat => interests.has(cat))) score += 3;
        
        // Higher score for tools matching project types
        const toolCategories = tool.categories.join(' ').toLowerCase();
        projectTypes.forEach(projectType => {
          if (toolCategories.includes(projectType.toLowerCase())) score += 2;
        });
        
        // Boost for trending/popular tools
        if (tool.pricing.includes('Free')) score += 1;
        if (tool.features.length > 8) score += 1; // Feature-rich tools
        
        return { ...tool, score };
      });

      // Get top suggested tools
      const suggestedTools = scoredTools
        .sort((a, b) => b.score - a.score)
        .slice(0, 6);

      // Get trending tools (most recently reviewed)
      const { data: recentReviews } = await supabase
        .from('tool_reviews')
        .select('tool_name')
        .order('created_at', { ascending: false })
        .limit(50);

      const toolCounts = recentReviews?.reduce((acc, review) => {
        acc[review.tool_name] = (acc[review.tool_name] || 0) + 1;
        return acc;
      }, {} as Record<string, number>) || {};

      const trendingTools = Object.entries(toolCounts)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 4)
        .map(([toolName]) => expandedAiTools.find(t => t.name === toolName))
        .filter(Boolean);

      // Generate personalized tips
      const personalizedTips = [];
      
      if (usedTools.size === 0) {
        personalizedTips.push({
          icon: Star,
          title: "¡Comienza escribiendo reseñas!",
          description: "Comparte tu experiencia con herramientas para obtener recomendaciones más precisas",
          action: "Explorar herramientas",
          link: "/tools"
        });
      }
      
      if (roadmaps?.length === 0) {
        personalizedTips.push({
          icon: TrendingUp,
          title: "Crea tu primera hoja de ruta",
          description: "Responde nuestro cuestionario para obtener recomendaciones personalizadas",
          action: "Crear roadmap",
          link: "/questionnaire"
        });
      }
      
      if (favoriteTools.size > 5) {
        personalizedTips.push({
          icon: Lightbulb,
          title: "Explora herramientas complementarias",
          description: "Basado en tus favoritos, hay herramientas que podrían integrarse perfectamente",
          action: "Ver recomendaciones",
          link: "/tools"
        });
      }

      return {
        suggestedTools,
        trendingTools,
        personalizedTips
      };
    },
    enabled: !!user,
  });

  if (!recommendations) return null;

  return (
    <div className="space-y-6">
      {/* Personalized Tips */}
      {recommendations.personalizedTips.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5" />
              Tips Personalizados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recommendations.personalizedTips.map((tip, index) => {
                const Icon = tip.icon;
                return (
                  <div key={index} className="flex items-start gap-3 p-4 rounded-lg border bg-gradient-to-r from-purple-50 to-blue-50">
                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{tip.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{tip.description}</p>
                      <Button variant="outline" size="sm" className="mt-2" asChild>
                        <Link to={tip.link}>
                          {tip.action}
                          <ExternalLink className="w-3 h-3 ml-1" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Suggested Tools */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5" />
            Herramientas Recomendadas Para Ti
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recommendations.suggestedTools.slice(0, 4).map((tool, index) => (
              <div key={index} className="p-4 rounded-lg border hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium">{tool.name}</h4>
                  <Badge variant="secondary" className="text-xs">
                    {tool.categories[0]}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{tool.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-green-600 font-medium">{tool.pricing}</span>
                  <Button variant="outline" size="sm" asChild>
                    <Link to={`/tool/${encodeURIComponent(tool.name)}`}>
                      Ver detalles
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Trending Tools */}
      {recommendations.trendingTools.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Herramientas en Tendencia
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {recommendations.trendingTools.map((tool, index) => (
                <div key={index} className="text-center p-4 rounded-lg border hover:shadow-md transition-shadow">
                  <h4 className="font-medium mb-1">{tool?.name}</h4>
                  <p className="text-xs text-gray-600 mb-3 line-clamp-2">{tool?.description}</p>
                  <Button variant="outline" size="sm" asChild>
                    <Link to={`/tool/${encodeURIComponent(tool?.name || '')}`}>
                      Explorar
                    </Link>
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PersonalizedRecommendations;
