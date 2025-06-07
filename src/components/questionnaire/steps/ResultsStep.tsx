import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Download, Share2, RefreshCw, Filter, Star, ExternalLink, Zap, Brain, Target } from "lucide-react";
import { useQuestionnaire } from "../QuestionnaireContext";
import { Link } from "react-router-dom";
import { useState, useMemo } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import ToolActions from "@/components/ToolActions";
import { convertToolToAITool } from "@/utils/toolTypeMapping";
import { useQuery } from "@tanstack/react-query";
import { generateIntelligentRecommendations } from "@/utils/intelligentMatchingAlgorithm";
import { useAuth } from "@/contexts/AuthContext";

const ResultsStep = () => {
  const { state } = useQuestionnaire();
  const { answers } = state;
  const { user } = useAuth();

  const [filters, setFilters] = useState({
    category: '',
    priceRange: '',
    complexityLevel: ''
  });

  const [selectedAiEngine, setSelectedAiEngine] = useState<'claude' | 'openai'>('claude');

  // Obtener recomendaciones inteligentes
  const { data: intelligentResult, isLoading } = useQuery({
    queryKey: ['intelligent-recommendations', answers, user?.id],
    queryFn: () => generateIntelligentRecommendations(answers, user?.id),
    staleTime: 5 * 60 * 1000, // 5 minutos
  });

  // Aplicar filtros a las recomendaciones
  const filteredMatches = useMemo(() => {
    if (!intelligentResult?.recommendations) return [];
    
    return intelligentResult.recommendations.filter(match => {
      if (filters.category && match.tool.category !== filters.category) return false;
      if (filters.complexityLevel && match.tool.complexity !== filters.complexityLevel) return false;
      if (filters.priceRange) {
        const pricing = match.tool.pricing.toLowerCase();
        switch (filters.priceRange) {
          case 'free':
            return pricing.includes('gratis') || pricing.includes('free');
          case 'low':
            return pricing.includes('$') && !pricing.includes('$100');
          case 'medium':
            return pricing.includes('$100') || pricing.includes('$50');
          case 'high':
            return pricing.includes('$200') || pricing.includes('$500');
          case 'enterprise':
            return pricing.includes('enterprise') || pricing.includes('$1000');
          default:
            return true;
        }
      }
      return true;
    });
  }, [intelligentResult?.recommendations, filters]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value === 'all' ? '' : value
    }));
  };

  const getMatchBadgeColor = (percentage: number) => {
    if (percentage >= 90) return 'bg-green-500';
    if (percentage >= 80) return 'bg-blue-500';
    if (percentage >= 70) return 'bg-yellow-500';
    return 'bg-gray-500';
  };

  const getScoreBreakdownBadges = (scoreBreakdown: any) => {
    const badges = [];
    if (scoreBreakdown.functionality > 70) badges.push({ label: 'Funcionalidad', value: scoreBreakdown.functionality, color: 'blue' });
    if (scoreBreakdown.personalized > 15) badges.push({ label: 'Personalizado', value: scoreBreakdown.personalized, color: 'purple' });
    if (scoreBreakdown.easeOfUse > 80) badges.push({ label: 'Fácil de usar', value: scoreBreakdown.easeOfUse, color: 'green' });
    return badges.slice(0, 2); // Mostrar máximo 2 badges
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-center py-8">
            <div className="flex items-center gap-3">
              <Brain className="h-6 w-6 animate-pulse text-purple-600" />
              <span>Generando recomendaciones inteligentes con IA...</span>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const categories = [...new Set(intelligentResult?.recommendations?.map(r => r.tool.category) || [])];

  return (
    <div className="space-y-6">
      {/* Success Header with AI Enhancement */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardContent className="pt-6">
          <div className="flex items-center justify-center text-center">
            <div>
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                ¡Tus Recomendaciones de Herramientas IA Están Listas!
              </h2>
              <p className="text-gray-600 mb-4">
                Encontramos {filteredMatches.length} herramientas perfectas usando nuestro algoritmo inteligente.
              </p>
              <div className="flex items-center justify-center gap-2">
                <Badge variant="secondary" className="text-sm">
                  <Target className="w-3 h-3 mr-1" />
                  100+ herramientas analizadas
                </Badge>
                {intelligentResult?.metadata?.algorithmVersion === '2.0' && (
                  <Badge variant="secondary" className="text-sm bg-purple-100 text-purple-700">
                    <Brain className="w-3 h-3 mr-1" />
                    IA Avanzada v2.0
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Algorithm Info */}
      {intelligentResult?.metadata && (
        <Card className="border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-purple-600" />
              Análisis Inteligente Aplicado
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {intelligentResult.metadata.algorithmVersion}
                </div>
                <div className="text-sm text-gray-600">Versión del Algoritmo</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {intelligentResult.metadata.personalizedFactors.length}
                </div>
                <div className="text-sm text-gray-600">Factores Personalizados</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {intelligentResult.metadata.totalToolsAnalyzed}
                </div>
                <div className="text-sm text-gray-600">Herramientas Analizadas</div>
              </div>
            </div>
            
            {intelligentResult.metadata.personalizedFactors.includes('semantic_analysis') && (
              <div className="mt-4 p-3 bg-white rounded-lg border border-purple-200">
                <div className="flex items-center gap-2 text-sm text-purple-700">
                  <Zap className="w-4 h-4" />
                  <strong>Análisis semántico activado:</strong> Tus respuestas han sido analizadas con IA para generar recomendaciones más precisas.
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* AI Engine Selector */}
      <Card className="border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-purple-600" />
            Elige tu Motor de IA para la Hoja de Ruta
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-4">
            <div className="flex-1">
              <Select value={selectedAiEngine} onValueChange={(value: 'claude' | 'openai') => setSelectedAiEngine(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona el motor de IA" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="claude">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      Claude AI (Anthropic) - Recomendado
                    </div>
                  </SelectItem>
                  <SelectItem value="openai">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      OpenAI GPT-4 - Alternativo
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="text-sm text-gray-600">
            <p className="mb-2">
              <strong>Claude AI:</strong> Especializado en análisis detallado y recomendaciones estratégicas.
            </p>
            <p>
              <strong>OpenAI GPT-4:</strong> Excelente para creatividad e innovación en la planificación.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filtrar Resultados
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Categoría</label>
              <Select value={filters.category || 'all'} onValueChange={(value) => handleFilterChange('category', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Todas las Categorías" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las Categorías</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Rango de Precio</label>
              <Select value={filters.priceRange || 'all'} onValueChange={(value) => handleFilterChange('priceRange', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Todos los Precios" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los Precios</SelectItem>
                  <SelectItem value="free">Gratis</SelectItem>
                  <SelectItem value="low">$1-50/mes</SelectItem>
                  <SelectItem value="medium">$50-200/mes</SelectItem>
                  <SelectItem value="high">$200-500/mes</SelectItem>
                  <SelectItem value="enterprise">$500+/mes</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Complejidad</label>
              <Select value={filters.complexityLevel || 'all'} onValueChange={(value) => handleFilterChange('complexityLevel', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Todos los Niveles" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los Niveles</SelectItem>
                  <SelectItem value="beginner">Principiante</SelectItem>
                  <SelectItem value="intermediate">Intermedio</SelectItem>
                  <SelectItem value="advanced">Avanzado</SelectItem>
                  <SelectItem value="expert">Experto</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Tool Recommendations */}
      <div className="space-y-4">
        {filteredMatches.map((match, index) => (
          <Card key={match.tool.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Tool Logo/Image */}
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg flex items-center justify-center">
                    <img
                      src={`https://images.unsplash.com/${match.tool.logoPlaceholder}?w=64&h=64&fit=crop&crop=center`}
                      alt={match.tool.name}
                      className="w-12 h-12 rounded object-cover"
                    />
                  </div>
                </div>

                {/* Tool Info */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-semibold">{match.tool.name}</h3>
                        <span className={`${getMatchBadgeColor(match.matchPercentage)} text-white text-xs font-medium px-2.5 py-0.5 rounded-full`}>
                          {match.matchPercentage}% coincidencia
                        </span>
                        {index < 3 && (
                          <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1">
                            <Star className="w-3 h-3" />
                            Mejor Opción
                          </span>
                        )}
                        {match.tool.freeVersion && (
                          <Badge variant="outline" className="text-green-600 border-green-600">
                            Gratis
                          </Badge>
                        )}
                        {match.tool.apiAvailable && (
                          <Badge variant="outline" className="text-blue-600 border-blue-600">
                            API
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 mb-2">{match.tool.category}</p>
                      <p className="text-gray-700 mb-3">{match.tool.description}</p>
                      <p className="text-sm font-medium text-purple-600 mb-3">{match.tool.pricing}</p>
                    </div>
                  </div>

                  {/* AI Score Breakdown */}
                  {match.scoreBreakdown && (
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-900 mb-2">Análisis IA:</h4>
                      <div className="flex flex-wrap gap-2">
                        {getScoreBreakdownBadges(match.scoreBreakdown).map((badge, idx) => (
                          <Badge key={idx} variant="outline" className={`text-xs ${
                            badge.color === 'purple' ? 'text-purple-600 border-purple-300' :
                            badge.color === 'blue' ? 'text-blue-600 border-blue-300' :
                            'text-green-600 border-green-300'
                          }`}>
                            {badge.label}: {badge.value}%
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Why Recommended */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Por qué recomendamos esto:</h4>
                    <ul className="space-y-1">
                      {match.reasons.map((reason, idx) => (
                        <li key={idx} className="text-sm text-gray-600 flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          {reason}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tags */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {match.tool.tags.slice(0, 4).map((tag) => (
                        <span key={tag} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-md">
                          {tag}
                        </span>
                      ))}
                      {match.tool.tags.length > 4 && (
                        <span className="text-xs text-gray-500">+{match.tool.tags.length - 4} más</span>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <ToolActions tool={convertToolToAITool(match.tool)} answers={answers} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredMatches.length === 0 && (
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-gray-500">No hay herramientas que coincidan con tus filtros actuales. Intenta ajustar tus criterios.</p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Actions */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/roadmap" state={{ 
              answers, 
              selectedTools: filteredMatches.map(match => match.tool),
              preferredEngine: selectedAiEngine
            }}>
              <Button className="bg-gradient-to-r from-green-600 to-teal-600">
                <ExternalLink className="mr-2 h-4 w-4" />
                Generar Hoja de Ruta con {selectedAiEngine === 'claude' ? 'Claude AI' : 'OpenAI GPT-4'}
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600">
                <Zap className="mr-2 h-4 w-4" />
                Ver Dashboard
              </Button>
            </Link>
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600">
              <Download className="mr-2 h-4 w-4" />
              Descargar Reporte
            </Button>
            <Button variant="outline">
              <Share2 className="mr-2 h-4 w-4" />
              Compartir Resultados
            </Button>
            <Button variant="outline">
              <RefreshCw className="mr-2 h-4 w-4" />
              Repetir Cuestionario
            </Button>
          </div>
          <div className="text-center mt-4">
            <Link to="/">
              <Button variant="ghost">
                Volver al Inicio
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResultsStep;
