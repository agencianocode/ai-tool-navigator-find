
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ExternalLink, Heart, Plus, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { EnhancedTool } from "@/data/expandedToolsDatabase";
import { useState } from "react";

interface EnhancedToolCardProps {
  tool: EnhancedTool;
  showComparison?: boolean;
  isCompact?: boolean;
}

export const EnhancedToolCard = ({ tool, showComparison = false, isCompact = false }: EnhancedToolCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isInComparison, setIsInComparison] = useState(false);

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

  const getDifficultyColor = (level: number) => {
    if (level <= 3) return "bg-green-100 text-green-800";
    if (level <= 6) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  const getPricingDisplay = (pricing: string) => {
    const parts = pricing.split(',');
    return parts[0]?.trim() || pricing;
  };

  if (isCompact) {
    return (
      <Card className="hover:shadow-md transition-all duration-200 active:scale-[0.98] md:active:scale-100">
        <CardContent className="p-4 md:p-6">
          <div className="flex gap-3 md:gap-4">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-purple-100 to-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <img
                src={`https://images.unsplash.com/${tool.logoPlaceholder}?w=64&h=64&fit=crop&crop=center`}
                alt={tool.name}
                className="w-10 h-10 md:w-12 md:h-12 rounded-lg object-cover"
              />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-2">
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-base md:text-lg text-gray-900 truncate">{tool.name}</h3>
                  <Badge variant="secondary" className="mt-1 text-xs">
                    {tool.category}
                  </Badge>
                </div>
                
                <div className="flex items-center gap-1 ml-2 flex-shrink-0">
                  {renderStars(tool.user_rating)}
                  <span className="text-sm text-gray-600">({tool.user_rating})</span>
                </div>
              </div>
              
              <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                {tool.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-3">
                <Badge variant="outline" className={`text-xs ${getDifficultyColor(tool.difficulty_level)}`}>
                  Nivel {tool.difficulty_level}/10
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {getPricingDisplay(tool.pricing)}
                </Badge>
              </div>
              
              <div className="flex gap-2">
                <Link to={`/tools/${tool.id}`} className="flex-1">
                  <Button size="sm" className="w-full h-9">
                    Ver Detalles
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="h-9 w-9 p-0"
                  onClick={() => window.open(tool.website, '_blank')}
                >
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="hover:shadow-lg transition-all duration-200 active:scale-[0.98] md:active:scale-100 h-full flex flex-col">
      <CardHeader className="p-4 md:p-6 pb-3 md:pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3 min-w-0 flex-1">
            <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-purple-100 to-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <img
                src={`https://images.unsplash.com/${tool.logoPlaceholder}?w=56&h=56&fit=crop&crop=center`}
                alt={tool.name}
                className="w-10 h-10 md:w-11 md:h-11 rounded-lg object-cover"
              />
            </div>
            <div className="min-w-0 flex-1">
              <CardTitle className="text-base md:text-lg leading-tight mb-1">{tool.name}</CardTitle>
              <Badge variant="secondary" className="text-xs">
                {tool.category}
              </Badge>
            </div>
          </div>
          
          <div className="flex flex-col items-end gap-2 ml-2">
            <div className="flex items-center gap-1">
              {renderStars(tool.user_rating)}
              <span className="text-sm text-gray-600">({tool.user_rating})</span>
            </div>
            
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => setIsFavorite(!isFavorite)}
              >
                <Heart className={`h-4 w-4 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
              </Button>
              
              {showComparison && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => setIsInComparison(!isInComparison)}
                >
                  {isInComparison ? 
                    <Check className="h-4 w-4 text-green-600" /> : 
                    <Plus className="h-4 w-4 text-gray-400" />
                  }
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-4 md:p-6 pt-0 flex flex-col flex-1">
        <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-shrink-0">
          {tool.description}
        </p>
        
        <div className="space-y-3 mb-4 flex-1">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500">Complejidad:</span>
            <Badge variant="outline" className={`text-xs ${getDifficultyColor(tool.difficulty_level)}`}>
              Nivel {tool.difficulty_level}/10
            </Badge>
          </div>
          
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500">Precio:</span>
            <span className="font-medium text-sm">{getPricingDisplay(tool.pricing)}</span>
          </div>
          
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500">Comunidad:</span>
            <span className="capitalize text-sm">{tool.community_size}</span>
          </div>
          
          {tool.freeVersion && (
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-500">Versión gratuita:</span>
              <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                Disponible
              </Badge>
            </div>
          )}
        </div>
        
        <div className="flex flex-wrap gap-1 mb-4">
          {tool.tags?.slice(0, 3).map((tag, idx) => (
            <Badge key={idx} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
          {tool.tags && tool.tags.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{tool.tags.length - 3} más
            </Badge>
          )}
        </div>

        <div className="flex gap-2 mt-auto">
          <Link to={`/tools/${tool.id}`} className="flex-1">
            <Button className="w-full h-10 md:h-9" size="sm">
              Ver Detalles
            </Button>
          </Link>
          <Button 
            variant="outline" 
            size="sm"
            className="h-10 w-10 md:h-9 md:w-9 p-0"
            onClick={() => window.open(tool.website, '_blank')}
          >
            <ExternalLink className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
