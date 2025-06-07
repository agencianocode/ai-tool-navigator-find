
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, ExternalLink, Star, TrendingUp, Brain, Zap } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { generateIntelligentRecommendations, findSimilarTools } from "@/utils/intelligentMatchingAlgorithm";

const PersonalizedRecommendations = () => {
  const { user } = useAuth();

  const { data: recommendations, isLoading } = useQuery({
    queryKey: ['intelligent-recommendations', user?.id],
    queryFn: async () => {
      if (!user) return { suggestedTools: [], trendingTools: [], personalizedTips: [], metadata: null };
      
      // Obtener respuestas del cuestionario más reciente del usuario
      const { data: roadmaps } = await supabase
        .from('roadmaps')
        .select('questionnaire_answers')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1);

      const latestAnswers = roadmaps?.[0]?.questionnaire_answers || {};

      // Generar recomendaciones inteligentes
      const intelligentResult = await generateIntelligentRecommendations(
        latestAnswers,
        user.id
      );

      // Obtener herramientas favoritas para recomendaciones similares
      const { data: favorites } = await supabase
        .from('user_favorite_tools')
        .select('tool_name')
        .eq('user_id', user.id)
        .limit(3);

      // Encontrar herramientas similares a las favoritas
      let similarToFavorites = [];
      if (favorites && favorites.length > 0) {
        const { expandedToolsDatabase } = await import('@/data/expandedToolsDatabase');
        const favoriteTool = expandedToolsDatabase.find(t => t.name === favorites[0].tool_name);
        if (favoriteTool) {
          similarToFavorites = await findSimilarTools(favoriteTool.id, 3);
        }
      }

      // Obtener herramientas en tendencia
      const { data: recentReviews } = await supabase
        .from('tool_reviews')
        .select('tool_name')
        .order('created_at', { ascending: false })
        .limit(50);

      const toolCounts = recentReviews?.reduce((acc, review) => {
        acc[review.tool_name] = (acc[review.tool_name] || 0) + 1;
        return acc;
      }, {} as Record<string, number>) || {};

      const { expandedToolsDatabase } = await import('@/data/expandedToolsDatabase');
      const trendingTools = Object.entries(toolCounts)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 4)
        .map(([toolName]) => expandedToolsDatabase.find(t => t.name === toolName))
        .filter(Boolean);

      // Generar tips personalizados
      const personalizedTips = [];
      
      if (intelligentResult.metadata.personalizedFactors.includes('semantic_analysis')) {
        personalizedTips.push({
          icon: Brain,
          title: "¡Recomendaciones mejoradas con IA!",
          description: "Estamos usando análisis semántico avanzado para personalizar tus recomendaciones",
          action: "Ver análisis",
          link: "/dashboard"
        });
      }
      
      if (favorites?.length === 0) {
        personalizedTips.push({
          icon: Star,
          title: "Marca tus herramientas favoritas",
          description: "Ayúdanos a entender mejor tus preferencias marcando herramientas como favoritas",
          action: "Explorar herramientas",
          link: "/tools"
        });
      }
      
      if (similarToFavorites.length > 0) {
        personalizedTips.push({
          icon: Lightbulb,
          title: "Herramientas similares a tus favoritas",
          description: `Encontramos ${similarToFavorites.length} herramientas similares a las que ya usas`,
          action: "Ver similares",
          link: "/tools"
        });
      }

      return {
        suggestedTools: intelligentResult.recommendations.slice(0, 6),
        trendingTools,
        personalizedTips,
        similarToFavorites,
        metadata: intelligentResult.metadata
      };
    },
    enabled: !!user,
  });

  if (!recommendations) return null;

  return (
    <div className="space-y-6">
      {/* AI Enhancement Banner */}
      {recommendations.metadata?.algorithmVersion === '2.0' && (
        <Card className="border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <Brain className="h-8 w-8 text-purple-600" />
              <div>
                <h3 className="font-semibold text-purple-900">Recomendaciones mejoradas con IA</h3>
                <p className="text-sm text-purple-700">
                  Usando análisis semántico y machine learning para recomendaciones más precisas
                </p>
              </div>
              <Badge variant="secondary" className="ml-auto">
                <Zap className="w-3 h-3 mr-1" />
                v2.0
              </Badge>
            </div>
          </CardContent>
        </Card>
      )}

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

      {/* Suggested Tools with Intelligence */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5" />
            Herramientas Recomendadas Para Ti
            {recommendations.metadata?.algorithmVersion === '2.0' && (
              <Badge variant="outline" className="text-xs">
                <Brain className="w-3 h-3 mr-1" />
                IA Avanzada
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recommendations.suggestedTools.slice(0, 4).map((match, index) => (
              <div key={index} className="p-4 rounded-lg border hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium">{match.tool.name}</h4>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      {match.tool.category}
                    </Badge>
                    <Badge 
                      variant={match.matchPercentage >= 90 ? "default" : "outline"} 
                      className="text-xs"
                    >
                      {match.matchPercentage}%
                    </Badge>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{match.tool.description}</p>
                
                {/* Score Breakdown */}
                {match.scoreBreakdown && (
                  <div className="mb-3">
                    <div className="flex flex-wrap gap-1 text-xs">
                      {match.scoreBreakdown.functionality > 50 && (
                        <Badge variant="outline" className="text-xs">
                          Funcionalidad: {match.scoreBreakdown.functionality}%
                        </Badge>
                      )}
                      {match.scoreBreakdown.personalized > 0 && (
                        <Badge variant="outline" className="text-xs text-purple-600">
                          Personalizado: +{match.scoreBreakdown.personalized}%
                        </Badge>
                      )}
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <span className="text-xs text-green-600 font-medium">{match.tool.pricing}</span>
                  <Button variant="outline" size="sm" asChild>
                    <Link to={`/tool/${encodeURIComponent(match.tool.name)}`}>
                      Ver detalles
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Similar to Favorites */}
      {recommendations.similarToFavorites && recommendations.similarToFavorites.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5" />
              Similar a tus Favoritas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {recommendations.similarToFavorites.map((tool, index) => (
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
