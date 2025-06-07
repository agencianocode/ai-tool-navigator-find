
import { Badge } from "@/components/ui/badge";
import { EnhancedTool } from "@/data/expandedToolsDatabase";

interface ToolCardContentProps {
  tool: EnhancedTool;
  isCompact?: boolean;
}

export const ToolCardContent = ({ tool, isCompact = false }: ToolCardContentProps) => {
  const getPricingDisplay = (pricing: string) => {
    const parts = pricing.split(',');
    return parts[0]?.trim() || pricing;
  };

  if (isCompact) {
    return (
      <div className="flex-1 min-w-0">
        <p 
          id={`tool-${tool.id}-description`}
          className="text-medium-contrast text-sm line-clamp-2 mb-3"
        >
          {tool.description}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1">
      <p 
        id={`tool-${tool.id}-description`}
        className="text-medium-contrast text-sm line-clamp-3 mb-4 flex-shrink-0"
      >
        {tool.description}
      </p>
      
      <div className="space-y-3 mb-4 flex-1">
        <div className="flex justify-between items-center text-sm">
          <span className="text-low-contrast">Precio:</span>
          <span className="font-medium text-sm text-medium-contrast">{getPricingDisplay(tool.pricing)}</span>
        </div>
        
        <div className="flex justify-between items-center text-sm">
          <span className="text-low-contrast">Comunidad:</span>
          <span className="capitalize text-sm text-medium-contrast">{tool.community_size}</span>
        </div>
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
    </div>
  );
};
