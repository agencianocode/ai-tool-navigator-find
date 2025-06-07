
import { EnhancedTool } from "@/data/expandedToolsDatabase";
import { CompactToolCard } from "./CompactToolCard";
import { FullToolCard } from "./FullToolCard";

interface EnhancedToolCardProps {
  tool: EnhancedTool;
  showComparison?: boolean;
  isCompact?: boolean;
}

export const EnhancedToolCard = ({ tool, showComparison = false, isCompact = false }: EnhancedToolCardProps) => {
  if (isCompact) {
    return <CompactToolCard tool={tool} showComparison={showComparison} />;
  }

  return <FullToolCard tool={tool} showComparison={showComparison} />;
};
