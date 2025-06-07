
import { CardTitle } from "@/components/ui/card";
import { ToolCardRating } from "./ToolCardRating";
import { ToolCardBadges } from "./ToolCardBadges";
import { ToolCardActions } from "./ToolCardActions";

interface ToolCardHeaderProps {
  id: string;
  name: string;
  category: string;
  rating: number;
  logoPlaceholder: string;
  difficultyLevel: number;
  pricing: string;
  showComparison?: boolean;
  isCompact?: boolean;
}

export const ToolCardHeader = ({
  id,
  name,
  category,
  rating,
  logoPlaceholder,
  difficultyLevel,
  pricing,
  showComparison = false,
  isCompact = false
}: ToolCardHeaderProps) => {
  const logoSize = isCompact ? "w-12 h-12 md:w-16 md:h-16" : "w-12 h-12 md:w-14 md:h-14";
  const logoImageSize = isCompact ? "w-10 h-10 md:w-12 md:h-12" : "w-10 h-10 md:w-11 md:h-11";

  return (
    <div className="flex items-start justify-between">
      <div className="flex items-start gap-3 min-w-0 flex-1">
        <div className={`${logoSize} bg-gradient-to-br from-purple-100 to-blue-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:shadow-lg transition-all duration-300`}>
          <img
            src={`https://images.unsplash.com/${logoPlaceholder}?w=56&h=56&fit=crop&crop=center`}
            alt={`Logo de ${name}`}
            className={`${logoImageSize} rounded-lg object-cover group-hover:scale-110 transition-transform duration-300`}
          />
        </div>
        <div className="min-w-0 flex-1">
          <CardTitle 
            id={`tool-${id}-title`}
            className="text-base md:text-lg leading-tight mb-1 text-high-contrast group-hover:text-primary transition-colors duration-200"
          >
            {name}
          </CardTitle>
          <ToolCardBadges 
            category={category}
            difficultyLevel={difficultyLevel}
            pricing={pricing}
            className={isCompact ? "mt-1" : ""}
          />
        </div>
      </div>
      
      <div className="flex flex-col items-end gap-2 ml-2">
        <div className="flex items-center gap-1">
          <ToolCardRating rating={rating} />
          <span className="text-sm text-medium-contrast">({rating})</span>
        </div>
        
        <ToolCardActions 
          toolName={name}
          showComparison={showComparison}
        />
      </div>
    </div>
  );
};
