
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { EnhancedTool } from "@/data/expandedToolsDatabase";
import { useState, useRef } from "react";
import { ToolCardHeader } from "./ToolCardHeader";
import { ToolCardContent } from "./ToolCardContent";
import { ToolCardBadges } from "./ToolCardBadges";

interface CompactToolCardProps {
  tool: EnhancedTool;
  showComparison?: boolean;
}

export const CompactToolCard = ({ tool, showComparison = false }: CompactToolCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

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
                <ToolCardBadges 
                  category={tool.category}
                  difficultyLevel={tool.difficulty_level}
                  pricing={tool.pricing}
                  className="mt-1"
                />
              </div>
              
              <div className="flex items-center gap-1 ml-2 flex-shrink-0">
                <div className="flex gap-0.5" role="img" aria-label={`Calificación: ${tool.user_rating} de 5 estrellas`}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <div
                      key={star}
                      className={`w-3 h-3 transition-colors duration-200 ${
                        star <= Math.round(tool.user_rating)
                          ? 'bg-yellow-400'
                          : 'bg-gray-300'
                      } rounded-full`}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <span className="text-sm text-medium-contrast">({tool.user_rating})</span>
              </div>
            </div>
            
            <ToolCardContent tool={tool} isCompact={true} />
            
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
};
