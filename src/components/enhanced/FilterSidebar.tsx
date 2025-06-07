
import { RefreshCw } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CategoryFilter } from "@/components/enhanced/CategoryFilter";

interface FilterSidebarProps {
  isRefreshing: boolean;
  handleRefresh: () => void;
  selectedCategory: string | null;
  selectedSubcategory: string | null;
  onCategoryChange: (category: string | null) => void;
  onSubcategoryChange: (subcategory: string | null) => void;
  toolCounts: Record<string, number>;
}

export const FilterSidebar = ({
  isRefreshing,
  handleRefresh,
  selectedCategory,
  selectedSubcategory,
  onCategoryChange,
  onSubcategoryChange,
  toolCounts
}: FilterSidebarProps) => {
  return (
    <div className="lg:w-80 flex-shrink-0">
      <Card className="sticky top-6 shadow-lg border-0 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-high-contrast">Filtros</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="focus-ring hover:scale-105 transition-transform"
              aria-label="Actualizar herramientas"
            >
              <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            </Button>
          </div>
          <CategoryFilter
            selectedCategory={selectedCategory}
            selectedSubcategory={selectedSubcategory}
            onCategoryChange={onCategoryChange}
            onSubcategoryChange={onSubcategoryChange}
            toolCounts={toolCounts}
          />
        </CardContent>
      </Card>
    </div>
  );
};
