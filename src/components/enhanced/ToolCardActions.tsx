
import { Button } from "@/components/ui/button";
import { Heart, Plus, Check } from "lucide-react";
import { useState, useRef } from "react";

interface ToolCardActionsProps {
  toolName: string;
  showComparison?: boolean;
  className?: string;
}

export const ToolCardActions = ({ toolName, showComparison = false, className = "" }: ToolCardActionsProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isInComparison, setIsInComparison] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

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

  return (
    <div ref={cardRef} className={`flex gap-1 ${className}`}>
      <Button
        variant="ghost"
        size="sm"
        className="h-8 w-8 p-0 focus-ring hover:scale-110 active:scale-90 transition-all duration-200"
        onClick={handleFavoriteToggle}
        onKeyDown={(e) => handleKeyDown(e, handleFavoriteToggle)}
        aria-label={isFavorite ? `Quitar ${toolName} de favoritos` : `Agregar ${toolName} a favoritos`}
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
          aria-label={isInComparison ? `Quitar ${toolName} de comparación` : `Agregar ${toolName} a comparación`}
          aria-pressed={isInComparison}
        >
          {isInComparison ? 
            <Check className="h-4 w-4 text-green-600 scale-110 transition-all duration-200" aria-hidden="true" /> : 
            <Plus className="h-4 w-4 text-gray-400 hover:text-green-600 transition-colors duration-200" aria-hidden="true" />
          }
        </Button>
      )}
    </div>
  );
};
