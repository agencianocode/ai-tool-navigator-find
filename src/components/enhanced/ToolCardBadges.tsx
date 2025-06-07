
import { Badge } from "@/components/ui/badge";

interface ToolCardBadgesProps {
  difficultyLevel: number;
  pricing: string;
  category?: string;
  freeVersion?: boolean;
  className?: string;
}

export const ToolCardBadges = ({ 
  difficultyLevel, 
  pricing, 
  category, 
  freeVersion,
  className = ""
}: ToolCardBadgesProps) => {
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

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {category && (
        <Badge 
          variant="secondary" 
          className="text-xs border group-hover:border-primary/30 transition-colors duration-200"
        >
          {category}
        </Badge>
      )}
      <Badge 
        variant="outline" 
        className={`text-xs border transition-all duration-200 group-hover:scale-105 ${getDifficultyColor(difficultyLevel)}`}
        aria-label={`Nivel de dificultad: ${getDifficultyLabel(difficultyLevel)}, ${difficultyLevel} de 10`}
      >
        {getDifficultyLabel(difficultyLevel)} {difficultyLevel}/10
      </Badge>
      <Badge 
        variant="outline" 
        className="text-xs border group-hover:scale-105 transition-transform duration-200"
      >
        {getPricingDisplay(pricing)}
      </Badge>
      {freeVersion && (
        <Badge 
          variant="outline" 
          className="text-xs bg-green-50 text-green-700 border-green-200 group-hover:scale-105 transition-transform duration-200"
        >
          Versión gratuita
        </Badge>
      )}
    </div>
  );
};
