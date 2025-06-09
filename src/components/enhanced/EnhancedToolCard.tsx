
import { EnhancedTool } from "@/data/expandedToolsDatabase";
import { CompactToolCard } from "./CompactToolCard";
import { FullToolCard } from "./FullToolCard";

interface EnhancedToolCardProps {
  tool: EnhancedTool;
  showComparison?: boolean;
  isCompact?: boolean;
  matchPercentage?: number;
  reasons?: string[];
  freeVersionDetails?: {
    available: boolean;
    limitations?: string;
    upgradeReasons?: string[];
  };
  detailedDescription?: string;
}

export const EnhancedToolCard = ({ 
  tool, 
  showComparison = false, 
  isCompact = false,
  matchPercentage,
  reasons,
  freeVersionDetails,
  detailedDescription
}: EnhancedToolCardProps) => {
  if (isCompact) {
    return (
      <CompactToolCard 
        tool={tool} 
        showComparison={showComparison}
        matchPercentage={matchPercentage}
        reasons={reasons}
        freeVersionDetails={freeVersionDetails}
      />
    );
  }

  return (
    <FullToolCard 
      tool={tool} 
      showComparison={showComparison}
      matchPercentage={matchPercentage}
      reasons={reasons}
      freeVersionDetails={freeVersionDetails}
      detailedDescription={detailedDescription}
    />
  );
};
