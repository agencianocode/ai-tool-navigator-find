
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, TrendingUp, Target, Brain, Zap } from "lucide-react";
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

      if (data?.questionnaire_answers && typeof data.questionnaire_answers === 'object') {
        return data.questionnaire_answers as Record<string, any>;
      }
      return null;
    },
    enabled: !!user,
  });

  // Generar recomendaciones inteligentes con IA
  const { data: recommendations, isLoading, error } = useQuery({
    queryKey: ['ai-personalized-recommendations', user?.id, lastAnswers],
    queryFn: () => {
      if (!lastAnswers) return null;
      return generateIntelligentRecommendations(lastAnswers, user?.id);
    },
    enabled: !!lastAnswers && !!user,
    staleTime: 5 * 60 * 1000, // 5 minutos
    retry: 2
  });

  if (!user || !lastAnswers) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-purple-600" />
            Recomendaciones Inteligentes
            <Badge variant="secondary" className="bg-gradient-to-r from-purple-100 to-blue-100">
              <Sparkles className="w-3 h-3 mr-1" />
              IA
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6">
            <Target className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p className="text-gray-500 mb-4">
              Completa el cuestionario para obtener recomendaciones personalizadas con IA
            </p>
            <Link to="/questionnaire">
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                <Brain className="w-4 h-4 mr-2" />
                Comenzar Cuestionario
              </Button>
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
            <Brain className="h-5 w-5 text-purple-600" />
            Recomendaciones Inteligentes
            <Badge variant="secondary" className="bg-gradient-to-r from-purple-100 to-blue-100">
              <Sparkles className="w-3 h-3 mr-1 animate-pulse" />
              Procesando...
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6">
            <div className="relative">
              <Brain className="h-12 w-12 mx-auto mb-4 text-purple-300 animate-pulse" />
              <Zap className="h-6 w-6 absolute top-0 right-1/2 translate-x-6 text-yellow-400 animate-bounce" />
            </div>
            <p className="text-gray-600 font-medium">Analizando con IA...</p>
            <p className="text-sm text-gray-500 mt-1">Generando recomendaciones personalizadas</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error || !recommendations) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-purple-600" />
            Recomendaciones Inteligentes
            <Badge variant="destructive" className="text-xs">
              Error
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6">
            <Target className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p className="text-gray-500 mb-4">No se pudieron generar recomendaciones</p>
            <Link to="/questionnaire">
              <Button variant="outline" size="sm">
                Reintentar Cuestionario
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    );
  }

  const topRecommendations = recommendations.recommendations?.slice(0, 3) || [];
  const isAIEnhanced = recommendations.metadata?.algorithmVersion?.includes('ai-enhanced');

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-purple-600" />
          Recomendaciones Inteligentes
          <div className="flex gap-1">
            <Badge variant="secondary" className={`text-xs ${isAIEnhanced ? 'bg-gradient-to-r from-purple-100 to-blue-100' : 'bg-gray-100'}`}>
              <Sparkles className="w-3 h-3 mr-1" />
              {isAIEnhanced ? 'IA Pro' : 'Algoritmo'}
            </Badge>
            {recommendations.metadata?.aiProvider && (
              <Badge variant="outline" className="text-xs">
                {recommendations.metadata.aiProvider.toUpperCase()}
              </Badge>
            )}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {topRecommendations.length > 0 ? (
          <div className="space-y-4">
            {topRecommendations.map((recommendation, index) => (
              <div key={recommendation.tool.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-gray-900">{recommendation.tool.name}</h4>
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant={recommendation.matchPercentage > 80 ? "default" : "outline"} 
                      className={`text-xs ${recommendation.matchPercentage > 80 ? 'bg-green-500' : ''}`}
                    >
                      {recommendation.matchPercentage}% match
                    </Badge>
                    {index === 0 && (
                      <Badge className="text-xs bg-gradient-to-r from-yellow-500 to-orange-500">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        Top Pick
                      </Badge>
                    )}
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 mb-2 line-clamp-2">{recommendation.tool.description}</p>
                
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline" className="text-xs">{recommendation.tool.category}</Badge>
                  <Badge variant="outline" className="text-xs text-green-600">{recommendation.tool.pricing}</Badge>
                </div>
                
                {recommendation.reasons.length > 0 && (
                  <div className="text-xs text-purple-600 bg-purple-50 p-2 rounded">
                    <strong>¿Por qué te lo recomendamos?</strong> {recommendation.reasons[0]}
                  </div>
                )}
                
                {/* Mostrar scoreBreakdown para recomendaciones de alta confianza */}
                {recommendation.confidence > 0.8 && (
                  <div className="mt-2 flex gap-1 text-xs">
                    {recommendation.scoreBreakdown.functionality > 20 && (
                      <Badge variant="secondary" className="bg-blue-100 text-blue-700">Funcionalidad</Badge>
                    )}
                    {recommendation.scoreBreakdown.easeOfUse > 15 && (
                      <Badge variant="secondary" className="bg-green-100 text-green-700">Fácil uso</Badge>
                    )}
                    {recommendation.scoreBreakdown.pricing > 10 && (
                      <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">Precio</Badge>
                    )}
                  </div>
                )}
              </div>
            ))}
            
            <div className="text-center mt-4">
              <Link to="/questionnaire">
                <Button variant="outline" size="sm" className="mr-2">
                  Ver Todas las Recomendaciones
                </Button>
              </Link>
              <Link to="/tools">
                <Button size="sm" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                  Explorar Herramientas
                </Button>
              </Link>
            </div>
            
            {/* Metadata de debug para usuarios avanzados */}
            <div className="text-xs text-gray-400 mt-4 p-2 bg-gray-50 rounded">
              Algoritmo: {recommendations.metadata.algorithmVersion} | 
              Herramientas analizadas: {recommendations.metadata.totalToolsAnalyzed} |
              Factores: {recommendations.metadata.personalizedFactors.join(', ')}
            </div>
          </div>
        ) : (
          <div className="text-center py-6">
            <Sparkles className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p className="text-gray-500">No se encontraron recomendaciones</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PersonalizedRecommendations;
