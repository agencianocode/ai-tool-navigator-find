
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, ExternalLink, Users, DollarSign, Zap, CheckCircle, XCircle } from "lucide-react";
import { EnhancedTool } from "@/data/expandedToolsDatabase";
import { Link } from "react-router-dom";

interface EnhancedToolCardProps {
  tool: EnhancedTool;
  matchScore?: number;
  matchReasons?: string[];
  showComparison?: boolean;
  isCompact?: boolean;
}

export const EnhancedToolCard = ({ 
  tool, 
  matchScore, 
  matchReasons = [],
  showComparison = false,
  isCompact = false 
}: EnhancedToolCardProps) => {
  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-3 h-3 ${
              star <= rating
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  const getDifficultyColor = (level: number) => {
    if (level <= 3) return 'bg-green-100 text-green-800';
    if (level <= 6) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const getCommunitySize = (size: string) => {
    const sizeMap = {
      'small': { label: 'Pequeña', color: 'bg-gray-100 text-gray-800' },
      'medium': { label: 'Mediana', color: 'bg-blue-100 text-blue-800' },
      'large': { label: 'Grande', color: 'bg-purple-100 text-purple-800' },
      'massive': { label: 'Masiva', color: 'bg-green-100 text-green-800' },
    };
    return sizeMap[size as keyof typeof sizeMap] || sizeMap.medium;
  };

  if (isCompact) {
    return (
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <img
                src={`https://images.unsplash.com/${tool.logoPlaceholder}?w=40&h=40&fit=crop&crop=center`}
                alt={tool.name}
                className="w-8 h-8 rounded object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm truncate">{tool.name}</h3>
              <p className="text-xs text-gray-600 mb-1">{tool.subcategory}</p>
              <div className="flex items-center gap-2 mb-2">
                {renderStars(tool.user_rating)}
                <span className="text-xs text-gray-500">({tool.user_rating})</span>
              </div>
              <div className="flex gap-1 flex-wrap">
                <Badge variant="outline" className="text-xs px-1 py-0">
                  {tool.complexity}
                </Badge>
                {tool.freeVersion && (
                  <Badge variant="outline" className="text-xs px-1 py-0 text-green-700 border-green-300">
                    Gratis
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="hover:shadow-lg transition-shadow h-full">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-blue-100 rounded-xl flex items-center justify-center">
              <img
                src={`https://images.unsplash.com/${tool.logoPlaceholder}?w=48&h=48&fit=crop&crop=center`}
                alt={tool.name}
                className="w-10 h-10 rounded-lg object-cover"
              />
            </div>
            <div className="flex-1">
              <CardTitle className="text-lg">{tool.name}</CardTitle>
              <p className="text-sm text-gray-600">{tool.subcategory}</p>
              <Badge variant="secondary" className="mt-1 text-xs">
                {tool.category}
              </Badge>
            </div>
          </div>
          {matchScore && (
            <div className="text-right">
              <div className="text-lg font-bold text-green-600">
                {Math.round(matchScore * 10)}%
              </div>
              <div className="text-xs text-gray-500">match</div>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">
          {tool.description}
        </p>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 text-yellow-500" />
            <span>{tool.user_rating}/5</span>
            {renderStars(tool.user_rating)}
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-3 h-3 text-blue-500" />
            <span>{getCommunitySize(tool.community_size).label}</span>
          </div>
          <div className="flex items-center gap-1">
            <DollarSign className="w-3 h-3 text-green-500" />
            <span className="truncate">{tool.pricing.split(',')[0]}</span>
          </div>
          <div className="flex items-center gap-1">
            <Zap className="w-3 h-3 text-purple-500" />
            <span>Nivel {tool.difficulty_level}/10</span>
          </div>
        </div>

        {/* Match Reasons */}
        {matchReasons.length > 0 && (
          <div className="space-y-1">
            <h4 className="text-xs font-medium text-gray-700">¿Por qué es ideal?</h4>
            <div className="space-y-1">
              {matchReasons.slice(0, 2).map((reason, index) => (
                <div key={index} className="flex items-start gap-1">
                  <CheckCircle className="w-3 h-3 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-xs text-gray-600">{reason}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Comparison Matrix */}
        {showComparison && (
          <div className="space-y-2">
            <h4 className="text-xs font-medium text-gray-700">Evaluación</h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex justify-between">
                <span>Facilidad:</span>
                <span className="font-medium">{tool.comparison_matrix.ease_of_use}/10</span>
              </div>
              <div className="flex justify-between">
                <span>Funciones:</span>
                <span className="font-medium">{tool.comparison_matrix.feature_richness}/10</span>
              </div>
              <div className="flex justify-between">
                <span>Precio:</span>
                <span className="font-medium">{tool.comparison_matrix.pricing_value}/10</span>
              </div>
              <div className="flex justify-between">
                <span>Soporte:</span>
                <span className="font-medium">{tool.comparison_matrix.support_quality}/10</span>
              </div>
            </div>
          </div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {tool.tags.slice(0, 3).map((tag, index) => (
            <Badge key={index} variant="outline" className="text-xs px-2 py-0.5">
              {tag}
            </Badge>
          ))}
          {tool.tags.length > 3 && (
            <Badge variant="outline" className="text-xs px-2 py-0.5">
              +{tool.tags.length - 3}
            </Badge>
          )}
        </div>

        {/* Features highlights */}
        <div className="space-y-1">
          <h4 className="text-xs font-medium text-gray-700">Características clave</h4>
          <div className="space-y-1">
            {tool.key_features.slice(0, 2).map((feature, index) => (
              <div key={index} className="flex items-start gap-1">
                <div className="w-1 h-1 bg-blue-500 rounded-full mt-1.5 flex-shrink-0"></div>
                <span className="text-xs text-gray-600">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-2 pt-2">
          <Link to={`/tool/${tool.id}`} className="flex-1">
            <Button size="sm" className="w-full">
              Ver Detalles
            </Button>
          </Link>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => window.open(tool.website, '_blank')}
          >
            <ExternalLink className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
