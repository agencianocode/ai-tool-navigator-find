import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ExternalLink, Heart, Plus, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { EnhancedTool } from "@/data/expandedToolsDatabase";
import { useState, useRef } from "react";

interface EnhancedToolCardProps {
  tool: EnhancedTool;
  showComparison?: boolean;
  isCompact?: boolean;
}

export const EnhancedToolCard = ({ tool, showComparison = false, isCompact = false }: EnhancedToolCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isInComparison, setIsInComparison] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5" role="img" aria-label={`Calificación: ${rating} de 5 estrellas`}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-3 h-3 transition-colors duration-200 ${
              star <= Math.round(rating)
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-gray-300'
            }`}
            aria-hidden="true"
          />
        ))}
      </div>
    );
  };

  const getDifficultyColor = (level: number) => {
    if (level <= 3) return "bg-green-100 text-green-800 border-green-200";
    if (level <= 6) return "bg-yellow-100 text-yellow-800 border-yellow-200";
    return "bg-red-100 text-red-800 border-red-200";
  };

  const getDifficultyLabel = (level: number) => {
    if (level <= 3) return "Fácil";
    if (level <= 6) return "Intermedio";
    return "Avanzado";
  };

  const getPricingDisplay = (pricing: string) => {
    const parts = pricing.split(',');
    return parts[0]?.trim() || pricing;
  };

  const handleKeyDown = (event: React.KeyboardEvent, action: () => void) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      action();
    }
  };

  const handleFavoriteToggle = () => {
    setIsFavorite(!isFavorite);
    // Add haptic feedback simulation
    if (cardRef.current) {
      cardRef.current.style.transform = 'scale(0.98)';
      setTimeout(() => {
        if (cardRef.current) {
          cardRef.current.style.transform = '';
        }
      }, 100);
    }
  };

  const handleComparisonToggle = () => {
    setIsInComparison(!isInComparison);
    // Add haptic feedback simulation
    if (cardRef.current) {
      cardRef.current.style.transform = 'scale(0.98)';
      setTimeout(() => {
        if (cardRef.current) {
          cardRef.current.style.transform = '';
        }
      }, 100);
    }
  };

  if (isCompact) {
    return (
      <Card 
        ref={cardRef}
        className={`group hover:shadow-lg transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm
          ${isHovered ? 'shadow-xl scale-[1.02]' : 'shadow-md'}
          ${isPressed ? 'scale-[0.98]' : ''}
          focus-within:ring-2 focus-within:ring-focus-ring focus-within:ring-offset-2`}
        role="article"
        aria-labelledby={`tool-${tool.id}-title`}
        aria-describedby={`tool-${tool.id}-description`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
      >
        <CardContent className="p-4 md:p-6">
          <div className="flex gap-3 md:gap-4">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-purple-100 to-blue-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:shadow-lg transition-all duration-300">
              <img
                src={`https://images.unsplash.com/${tool.logoPlaceholder}?w=64&h=64&fit=crop&crop=center`}
                alt={`Logo de ${tool.name}`}
                className="w-10 h-10 md:w-12 md:h-12 rounded-lg object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-2">
                <div className="min-w-0 flex-1">
                  <h3 
                    id={`tool-${tool.id}-title`}
                    className="font-semibold text-base md:text-lg text-high-contrast truncate group-hover:text-primary transition-colors duration-200"
                  >
                    {tool.name}
                  </h3>
                  <Badge 
                    variant="secondary" 
                    className="mt-1 text-xs border group-hover:border-primary/30 transition-colors duration-200"
                  >
                    {tool.category}
                  </Badge>
                </div>
                
                <div className="flex items-center gap-1 ml-2 flex-shrink-0">
                  {renderStars(tool.user_rating)}
                  <span className="text-sm text-medium-contrast">({tool.user_rating})</span>
                </div>
              </div>
              
              <p 
                id={`tool-${tool.id}-description`}
                className="text-medium-contrast text-sm line-clamp-2 mb-3"
              >
                {tool.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-3">
                <Badge 
                  variant="outline" 
                  className={`text-xs border transition-all duration-200 ${getDifficultyColor(tool.difficulty_level)} group-hover:scale-105`}
                  aria-label={`Nivel de dificultad: ${getDifficultyLabel(tool.difficulty_level)}, ${tool.difficulty_level} de 10`}
                >
                  {getDifficultyLabel(tool.difficulty_level)} {tool.difficulty_level}/10
                </Badge>
                <Badge 
                  variant="outline" 
                  className="text-xs border group-hover:scale-105 transition-transform duration-200"
                >
                  {getPricingDisplay(tool.pricing)}
                </Badge>
              </div>
              
              <div className="flex gap-2">
                <Link to={`/tools/${tool.id}`} className="flex-1">
                  <Button 
                    size="sm" 
                    className="w-full h-9 focus-ring hover:scale-105 active:scale-95 transition-all duration-200"
                    aria-label={`Ver detalles de ${tool.name}`}
                  >
                    Ver Detalles
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="h-9 w-9 p-0 focus-ring hover:scale-110 active:scale-95 transition-all duration-200"
                  onClick={() => window.open(tool.website, '_blank')}
                  aria-label={`Visitar sitio web de ${tool.name} (se abre en nueva ventana)`}
                >
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card 
      ref={cardRef}
      className={`group hover:shadow-xl transition-all duration-300 h-full flex flex-col border-0 bg-white/80 backdrop-blur-sm
        ${isHovered ? 'shadow-2xl scale-[1.02]' : 'shadow-lg'}
        ${isPressed ? 'scale-[0.98]' : ''}
        focus-within:ring-2 focus-within:ring-focus-ring focus-within:ring-offset-2`}
      role="article"
      aria-labelledby={`tool-${tool.id}-title`}
      aria-describedby={`tool-${tool.id}-description`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
    >
      <CardHeader className="p-4 md:p-6 pb-3 md:pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3 min-w-0 flex-1">
            <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-purple-100 to-blue-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:shadow-lg transition-all duration-300">
              <img
                src={`https://images.unsplash.com/${tool.logoPlaceholder}?w=56&h=56&fit=crop&crop=center`}
                alt={`Logo de ${tool.name}`}
                className="w-10 h-10 md:w-11 md:h-11 rounded-lg object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="min-w-0 flex-1">
              <CardTitle 
                id={`tool-${tool.id}-title`}
                className="text-base md:text-lg leading-tight mb-1 text-high-contrast group-hover:text-primary transition-colors duration-200"
              >
                {tool.name}
              </CardTitle>
              <Badge 
                variant="secondary" 
                className="text-xs border group-hover:border-primary/30 transition-colors duration-200"
              >
                {tool.category}
              </Badge>
            </div>
          </div>
          
          <div className="flex flex-col items-end gap-2 ml-2">
            <div className="flex items-center gap-1">
              {renderStars(tool.user_rating)}
              <span className="text-sm text-medium-contrast">({tool.user_rating})</span>
            </div>
            
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 focus-ring hover:scale-110 active:scale-90 transition-all duration-200"
                onClick={handleFavoriteToggle}
                onKeyDown={(e) => handleKeyDown(e, handleFavoriteToggle)}
                aria-label={isFavorite ? `Quitar ${tool.name} de favoritos` : `Agregar ${tool.name} a favoritos`}
                aria-pressed={isFavorite}
              >
                <Heart 
                  className={`h-4 w-4 transition-all duration-200 ${
                    isFavorite 
                      ? 'fill-red-500 text-red-500 scale-110' 
                      : 'text-gray-400 hover:text-red-500'
                  }`} 
                  aria-hidden="true"
                />
              </Button>
              
              {showComparison && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 focus-ring hover:scale-110 active:scale-90 transition-all duration-200"
                  onClick={handleComparisonToggle}
                  onKeyDown={(e) => handleKeyDown(e, handleComparisonToggle)}
                  aria-label={isInComparison ? `Quitar ${tool.name} de comparación` : `Agregar ${tool.name} a comparación`}
                  aria-pressed={isInComparison}
                >
                  {isInComparison ? 
                    <Check className="h-4 w-4 text-green-600 scale-110 transition-all duration-200" aria-hidden="true" /> : 
                    <Plus className="h-4 w-4 text-gray-400 hover:text-green-600 transition-colors duration-200" aria-hidden="true" />
                  }
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-4 md:p-6 pt-0 flex flex-col flex-1">
        <p 
          id={`tool-${tool.id}-description`}
          className="text-medium-contrast text-sm line-clamp-3 mb-4 flex-shrink-0"
        >
          {tool.description}
        </p>
        
        <div className="space-y-3 mb-4 flex-1">
          <div className="flex justify-between items-center text-sm">
            <span className="text-low-contrast">Complejidad:</span>
            <Badge 
              variant="outline" 
              className={`text-xs border transition-all duration-200 group-hover:scale-105 ${getDifficultyColor(tool.difficulty_level)}`}
              aria-label={`Nivel de dificultad: ${getDifficultyLabel(tool.difficulty_level)}, ${tool.difficulty_level} de 10`}
            >
              {getDifficultyLabel(tool.difficulty_level)} {tool.difficulty_level}/10
            </Badge>
          </div>
          
          <div className="flex justify-between items-center text-sm">
            <span className="text-low-contrast">Precio:</span>
            <span className="font-medium text-sm text-medium-contrast">{getPricingDisplay(tool.pricing)}</span>
          </div>
          
          <div className="flex justify-between items-center text-sm">
            <span className="text-low-contrast">Comunidad:</span>
            <span className="capitalize text-sm text-medium-contrast">{tool.community_size}</span>
          </div>
          
          {tool.freeVersion && (
            <div className="flex justify-between items-center text-sm">
              <span className="text-low-contrast">Versión gratuita:</span>
              <Badge 
                variant="outline" 
                className="text-xs bg-green-50 text-green-700 border-green-200 group-hover:scale-105 transition-transform duration-200"
              >
                Disponible
              </Badge>
            </div>
          )}
        </div>
        
        <div className="flex flex-wrap gap-1 mb-4" role="list" aria-label="Etiquetas de la herramienta">
          {tool.tags?.slice(0, 3).map((tag, idx) => (
            <Badge 
              key={idx} 
              variant="outline" 
              className="text-xs border hover:scale-105 transition-transform duration-200" 
              role="listitem"
            >
              {tag}
            </Badge>
          ))}
          {tool.tags && tool.tags.length > 3 && (
            <Badge 
              variant="outline" 
              className="text-xs border hover:scale-105 transition-transform duration-200" 
              role="listitem"
            >
              +{tool.tags.length - 3} más
            </Badge>
          )}
        </div>

        <div className="flex gap-2 mt-auto">
          <Link to={`/tools/${tool.id}`} className="flex-1">
            <Button 
              className="w-full h-10 md:h-9 focus-ring hover:scale-105 active:scale-95 transition-all duration-200" 
              size="sm"
              aria-label={`Ver detalles completos de ${tool.name}`}
            >
              Ver Detalles
            </Button>
          </Link>
          <Button 
            variant="outline" 
            size="sm"
            className="h-10 w-10 md:h-9 md:w-9 p-0 focus-ring hover:scale-110 active:scale-95 transition-all duration-200"
            onClick={() => window.open(tool.website, '_blank')}
            aria-label={`Visitar sitio web de ${tool.name} (se abre en nueva ventana)`}
          >
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
