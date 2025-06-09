
import { EnhancedTool } from "@/data/expandedToolsDatabase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Star, 
  ExternalLink, 
  Heart,
  Zap,
  Gift,
  CheckCircle,
  Info,
  TrendingUp
} from "lucide-react";
import { useState } from "react";
import { useAnalytics } from "@/components/analytics/AnalyticsTracking";

interface FullToolCardProps {
  tool: EnhancedTool;
  showComparison?: boolean;
  matchPercentage?: number;
  reasons?: string[];
  freeVersionDetails?: {
    available: boolean;
    limitations?: string;
    upgradeReasons?: string[];
  };
  detailedDescription?: string;
}

export const FullToolCard = ({ 
  tool, 
  showComparison = false,
  matchPercentage,
  reasons,
  freeVersionDetails,
  detailedDescription
}: FullToolCardProps) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const { trackToolView, trackToolFavorite } = useAnalytics();

  const handleFavorite = () => {
    setIsFavorited(!isFavorited);
    trackToolFavorite(tool.id, tool.name, isFavorited ? 'remove' : 'add');
  };

  const handleViewTool = () => {
    trackToolView(tool.id, tool.name);
    window.open(tool.website, '_blank');
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-3 h-3 ${
              star <= Math.round(rating)
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-orange-100 text-orange-800';
      case 'expert': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="hover:shadow-lg transition-all duration-300 group">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3 flex-1">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-blue-100 rounded-xl flex items-center justify-center shrink-0">
              <img
                src={`https://images.unsplash.com/${tool.logoPlaceholder}?w=48&h=48&fit=crop&crop=center`}
                alt={tool.name}
                className="w-10 h-10 rounded-lg object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(tool.name)}&background=6366f1&color=fff&size=40`;
                }}
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg leading-tight">{tool.name}</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleFavorite}
                  className="shrink-0 ml-2"
                >
                  <Heart 
                    className={`w-4 h-4 ${isFavorited ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} 
                  />
                </Button>
              </div>
              
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="secondary">{tool.category}</Badge>
                <Badge className={getComplexityColor(tool.complexity)}>
                  {tool.complexity}
                </Badge>
                {freeVersionDetails?.available && (
                  <Badge className="bg-green-100 text-green-800">
                    <Gift className="w-3 h-3 mr-1" />
                    Gratis
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Match Percentage para recomendaciones */}
        {matchPercentage && (
          <div className="mt-3 p-3 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-purple-600" />
                <span className="font-medium text-purple-900">Compatibilidad</span>
              </div>
              <Badge className={`${matchPercentage > 80 ? 'bg-green-500' : matchPercentage > 60 ? 'bg-yellow-500' : 'bg-blue-500'} text-white`}>
                {matchPercentage}%
              </Badge>
            </div>
            {reasons && reasons.length > 0 && (
              <div className="space-y-1">
                {reasons.slice(0, 2).map((reason, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm text-purple-700">
                    <CheckCircle className="w-3 h-3 text-green-500" />
                    <span>{reason}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Rating */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {renderStars(tool.user_rating)}
            <span className="text-sm text-gray-600">({tool.user_rating})</span>
          </div>
          <div className="text-sm text-gray-500">
            {tool.founded_year && `Desde ${tool.founded_year}`}
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm line-clamp-3">
          {detailedDescription || tool.description}
        </p>

        {/* Free Version Details */}
        {freeVersionDetails?.available && (
          <div className="p-3 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center gap-2 mb-2">
              <Gift className="w-4 h-4 text-green-600" />
              <span className="font-medium text-green-800">Versión Gratuita Disponible</span>
            </div>
            {freeVersionDetails.limitations && (
              <p className="text-sm text-green-700 mb-2">{freeVersionDetails.limitations}</p>
            )}
            {freeVersionDetails.upgradeReasons && freeVersionDetails.upgradeReasons.length > 0 && (
              <div className="text-xs text-green-600">
                <span className="font-medium">Ventajas premium:</span> {freeVersionDetails.upgradeReasons.slice(0, 2).join(', ')}
              </div>
            )}
          </div>
        )}
        
        {/* Key Features */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Complejidad:</span>
            <Badge variant="outline" className="capitalize">
              {tool.complexity}
            </Badge>
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Precio:</span>
            <span className="font-medium">{tool.pricing}</span>
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Comunidad:</span>
            <span className="capitalize">{tool.community_size}</span>
          </div>

          {tool.apiAvailable && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">API:</span>
              <div className="flex items-center gap-1">
                <Zap className="w-3 h-3 text-blue-500" />
                <span className="text-blue-600 font-medium">Disponible</span>
              </div>
            </div>
          )}
        </div>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {tool.tags?.slice(0, 4).map((tag, idx) => (
            <Badge key={idx} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
          {tool.tags && tool.tags.length > 4 && (
            <Badge variant="outline" className="text-xs">
              +{tool.tags.length - 4} más
            </Badge>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <Button 
            className="flex-1" 
            onClick={handleViewTool}
          >
            Ver Herramienta
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => window.open(tool.website, '_blank')}
          >
            <ExternalLink className="h-4 w-4" />
          </Button>
          {showComparison && (
            <Button variant="outline" size="sm">
              <Info className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
