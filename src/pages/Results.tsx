
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, Share2, Filter, Star, CheckCircle } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { calculateToolMatches, filterTools, ToolMatch } from "@/utils/matchingAlgorithm";
import { categories } from "@/data/aiTools";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ToolActions from "@/components/ToolActions";

const Results = () => {
  const location = useLocation();
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [filters, setFilters] = useState({
    category: '',
    priceRange: '',
    complexityLevel: ''
  });

  useEffect(() => {
    // Get answers from location state or localStorage
    const answersFromState = location.state?.answers;
    const answersFromStorage = localStorage.getItem('questionnaireAnswers');
    
    if (answersFromState) {
      setAnswers(answersFromState);
    } else if (answersFromStorage) {
      setAnswers(JSON.parse(answersFromStorage));
    }
  }, [location]);

  const allMatches = calculateToolMatches(answers);
  const filteredMatches = filterTools(allMatches, filters);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link to="/questionnaire">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver al Cuestionario
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Tus Recomendaciones de Herramientas IA
          </h1>
          <p className="text-gray-600">
            Recomendaciones personalizadas basadas en tus respuestas
          </p>
        </div>

        {/* Success Header */}
        <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200 mb-6">
          <CardContent className="pt-6">
            <div className="flex items-center justify-center text-center">
              <div>
                <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-3" />
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  ¡{filteredMatches.length} Coincidencias Perfectas Encontradas!
                </h2>
                <p className="text-gray-600">
                  Estas herramientas han sido específicamente elegidas para tus necesidades y requerimientos.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Filters */}
        <Card className="mb-6">
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

        {/* Tool Recommendations */}
        <div className="space-y-4 mb-6">
          {filteredMatches.map((match: ToolMatch, index) => (
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
                        </div>
                        <p className="text-sm text-gray-500 mb-2">{match.tool.category}</p>
                        <p className="text-gray-700 mb-3">{match.tool.description}</p>
                        <p className="text-sm font-medium text-purple-600 mb-3">{match.tool.pricing}</p>
                      </div>
                    </div>

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
                    <ToolActions tool={match.tool} answers={answers} />
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
              <Link to="/roadmap" state={{ answers, selectedTools: filteredMatches.map(match => match.tool) }}>
                <Button className="bg-gradient-to-r from-green-600 to-teal-600">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Generar Hoja de Ruta de Implementación
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
              <Link to="/questionnaire">
                <Button variant="outline">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Repetir Cuestionario
                </Button>
              </Link>
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
    </div>
  );
};

export default Results;
