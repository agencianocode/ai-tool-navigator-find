
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, TrendingUp, Target } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { generateIntelligentRecommendations } from "@/utils/intelligentMatchingAlgorithm";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const PersonalizedRecommendations = () => {
  const { user } = useAuth();

  // Obtener las últimas respuestas del cuestionario del usuario
  const { data: lastAnswers } = useQuery({
    queryKey: ['last-questionnaire-answers', user?.id],
    queryFn: async () => {
      if (!user) return null;
      
      const { data } = await supabase
        .from('roadmaps')
        .select('questionnaire_answers')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      // Verificar que questionnaire_answers sea un objeto válido
      if (data?.questionnaire_answers && typeof data.questionnaire_answers === 'object') {
        return data.questionnaire_answers as Record<string, any>;
      }
      return null;
    },
    enabled: !!user,
  });

  // Generar recomendaciones inteligentes
  const { data: recommendations, isLoading } = useQuery({
    queryKey: ['personalized-recommendations', user?.id, lastAnswers],
    queryFn: () => {
      if (!lastAnswers) return null;
      return generateIntelligentRecommendations(lastAnswers, user?.id);
    },
    enabled: !!lastAnswers && !!user,
  });

  if (!user || !lastAnswers) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            Recomendaciones Personalizadas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6">
            <Target className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p className="text-gray-500 mb-4">
              Completa el cuestionario para obtener recomendaciones personalizadas
            </p>
            <Link to="/questionnaire">
              <Button>Comenzar Cuestionario</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            Recomendaciones Personalizadas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6">
            <div className="animate-pulse">
              <Sparkles className="h-12 w-12 mx-auto mb-4 text-purple-300" />
              <p className="text-gray-500">Generando recomendaciones con IA...</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const topRecommendations = recommendations?.recommendations?.slice(0, 3) || [];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5" />
          Recomendaciones Personalizadas
          {recommendations?.metadata?.algorithmVersion === '2.0' && (
            <Badge variant="secondary" className="ml-2">
              IA v2.0
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {topRecommendations.length > 0 ? (
          <div className="space-y-4">
            {topRecommendations.map((recommendation, index) => (
              <div key={recommendation.tool.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold">{recommendation.tool.name}</h4>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {recommendation.matchPercentage}% match
                    </Badge>
                    {index === 0 && (
                      <Badge className="text-xs bg-yellow-500">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        Top Pick
                      </Badge>
                    )}
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-2">{recommendation.tool.description}</p>
                <p className="text-xs text-purple-600 mb-2">{recommendation.tool.pricing}</p>
                {recommendation.reasons.length > 0 && (
                  <div className="text-xs text-gray-500">
                    <strong>Por qué te recomendamos esto:</strong> {recommendation.reasons[0]}
                  </div>
                )}
              </div>
            ))}
            <div className="text-center mt-4">
              <Link to="/questionnaire">
                <Button variant="outline" size="sm">
                  Ver Todas las Recomendaciones
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="text-center py-6">
            <Sparkles className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p className="text-gray-500">No se pudieron generar recomendaciones en este momento</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PersonalizedRecommendations;
