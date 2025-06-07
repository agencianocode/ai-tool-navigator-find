
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { EnhancedTool } from "@/data/expandedToolsDatabase";
import { useState, useRef } from "react";
import { ToolCardHeader } from "./ToolCardHeader";
import { ToolCardContent } from "./ToolCardContent";

interface FullToolCardProps {
  tool: EnhancedTool;
  showComparison?: boolean;
}

export const FullToolCard = ({ tool, showComparison = false }: FullToolCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

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
        <ToolCardHeader
          id={tool.id}
          name={tool.name}
          category={tool.category}
          rating={tool.user_rating}
          logoPlaceholder={tool.logoPlaceholder}
          difficultyLevel={tool.difficulty_level}
          pricing={tool.pricing}
          showComparison={showComparison}
        />
      </CardHeader>
      
      <CardContent className="p-4 md:p-6 pt-0 flex flex-col flex-1">
        <ToolCardContent tool={tool} />

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
