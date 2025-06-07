
import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ActiveFiltersProps {
  selectedCategory: string | null;
  selectedSubcategory: string | null;
  priceRange: string | null;
  setSelectedCategory: (category: string | null) => void;
  setSelectedSubcategory: (subcategory: string | null) => void;
  setPriceRange: (priceRange: string | null) => void;
  activeFiltersCount: number;
}

export const ActiveFilters = ({
  selectedCategory,
  selectedSubcategory,
  priceRange,
  setSelectedCategory,
  setSelectedSubcategory,
  setPriceRange,
  activeFiltersCount
}: ActiveFiltersProps) => {
  if (activeFiltersCount === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 mt-4 animate-fade-in">
      {selectedCategory && (
        <Badge 
          variant="secondary" 
          className="flex items-center gap-1 hover:scale-105 transition-transform cursor-pointer"
          onClick={() => setSelectedCategory(null)}
        >
          {selectedCategory}
          <X className="h-3 w-3" />
        </Badge>
      )}
      {selectedSubcategory && (
        <Badge 
          variant="secondary" 
          className="flex items-center gap-1 hover:scale-105 transition-transform cursor-pointer"
          onClick={() => setSelectedSubcategory(null)}
        >
          {selectedSubcategory}
          <X className="h-3 w-3" />
        </Badge>
      )}
      {priceRange && (
        <Badge 
          variant="secondary" 
          className="flex items-center gap-1 hover:scale-105 transition-transform cursor-pointer"
          onClick={() => setPriceRange(null)}
        >
          {priceRange}
          <X className="h-3 w-3" />
        </Badge>
      )}
    </div>
  );
};
