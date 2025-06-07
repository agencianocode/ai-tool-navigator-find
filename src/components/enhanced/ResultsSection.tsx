
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { CardSkeleton } from "@/components/ui/card-skeleton";
import { EnhancedToolCard } from "@/components/enhanced/EnhancedToolCard";
import { EnhancedTool } from "@/data/expandedToolsDatabase";

interface ResultsSectionProps {
  isSearching: boolean;
  filteredAndSortedTools: EnhancedTool[];
  clearAllFilters: () => void;
  viewMode: "grid" | "list";
}

export const ResultsSection = ({
  isSearching,
  filteredAndSortedTools,
  clearAllFilters,
  viewMode
}: ResultsSectionProps) => {
  return (
    <>
      {/* Results count and clear filters */}
      <div className="mb-4 flex justify-between items-center">
        <p className="text-medium-contrast text-sm md:text-base">
          {isSearching ? (
            <span className="flex items-center gap-2">
              <LoadingSpinner size="sm" />
              Buscando...
            </span>
          ) : (
            `${filteredAndSortedTools.length} herramientas encontradas`
          )}
        </p>
        
        {filteredAndSortedTools.length > 0 && !isSearching && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="text-medium-contrast hover:text-high-contrast focus-ring hover:scale-105 transition-all"
          >
            Limpiar filtros
          </Button>
        )}
      </div>

      {/* Tools Grid */}
      {isSearching ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      ) : filteredAndSortedTools.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
          {filteredAndSortedTools.map((tool, index) => (
            <div 
              key={tool.id} 
              className="animate-fade-in hover:scale-[1.02] transition-all duration-300"
              style={{ 
                animationDelay: `${index * 50}ms`,
                animationFillMode: 'both'
              }}
            >
              <EnhancedToolCard
                tool={tool}
                isCompact={viewMode === "list"}
                showComparison={true}
              />
            </div>
          ))}
        </div>
      ) : (
        <Card className="text-center py-12 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardContent>
            <div className="text-6xl mb-4 opacity-50">🔍</div>
            <h3 className="text-xl font-semibold text-high-contrast mb-2">
              No se encontraron herramientas
            </h3>
            <p className="text-medium-contrast mb-4">
              Intenta ajustar tus filtros o buscar con términos diferentes
            </p>
            <Button 
              onClick={clearAllFilters}
              className="focus-ring hover:scale-105 active:scale-95 transition-all duration-200"
            >
              Limpiar filtros
            </Button>
          </CardContent>
        </Card>
      )}
    </>
  );
};
