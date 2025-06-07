
import { Search, Filter, SlidersHorizontal, RefreshCw } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useIsMobile } from "@/hooks/use-mobile";

interface SearchControlsProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  isSearching: boolean;
  isRefreshing: boolean;
  handleRefresh: () => void;
  activeFiltersCount: number;
  isFilterOpen: boolean;
  setIsFilterOpen: (open: boolean) => void;
  isAdvancedOpen: boolean;
  setIsAdvancedOpen: (open: boolean) => void;
  clearAllFilters: () => void;
  mobileFilterContent: React.ReactNode;
  advancedFilterContent: React.ReactNode;
}

export const SearchControls = ({
  searchTerm,
  setSearchTerm,
  isSearching,
  isRefreshing,
  handleRefresh,
  activeFiltersCount,
  isFilterOpen,
  setIsFilterOpen,
  isAdvancedOpen,
  setIsAdvancedOpen,
  clearAllFilters,
  mobileFilterContent,
  advancedFilterContent
}: SearchControlsProps) => {
  const isMobile = useIsMobile();

  return (
    <Card className="mb-6 shadow-lg border-0 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
      <CardContent className="p-4 md:p-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search with loading indicator */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Buscar herramientas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-10 h-11 md:h-10 focus-ring transition-all duration-200"
              aria-label="Buscar herramientas"
            />
            {isSearching && (
              <LoadingSpinner 
                size="sm" 
                className="absolute right-3 top-1/2 transform -translate-y-1/2" 
              />
            )}
          </div>

          {/* Mobile Filter Button with badge */}
          {isMobile && (
            <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <SheetTrigger asChild>
                <Button 
                  variant="outline" 
                  className="relative h-11 focus-ring hover:scale-105 active:scale-95 transition-all duration-200"
                  aria-label={`Abrir filtros ${activeFiltersCount > 0 ? `(${activeFiltersCount} activos)` : ''}`}
                >
                  <Filter className="mr-2 h-4 w-4" />
                  Filtros
                  {activeFiltersCount > 0 && (
                    <Badge 
                      variant="destructive" 
                      className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs animate-pulse"
                    >
                      {activeFiltersCount}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 p-0">
                <SheetHeader className="p-6 border-b">
                  <SheetTitle className="flex items-center justify-between">
                    Filtros
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearAllFilters}
                      className="text-sm focus-ring hover:scale-105 transition-transform"
                    >
                      Limpiar todo
                    </Button>
                  </SheetTitle>
                </SheetHeader>
                <div className="p-6">
                  {mobileFilterContent}
                </div>
              </SheetContent>
            </Sheet>
          )}

          {/* Advanced Filters */}
          <Sheet open={isAdvancedOpen} onOpenChange={setIsAdvancedOpen}>
            <SheetTrigger asChild>
              <Button 
                variant="outline" 
                className="h-11 md:h-10 focus-ring hover:scale-105 active:scale-95 transition-all duration-200"
                aria-label="Filtros avanzados"
              >
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                {!isMobile && "Avanzado"}
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Filtros Avanzados</SheetTitle>
              </SheetHeader>
              <div className="mt-6">
                {advancedFilterContent}
              </div>
            </SheetContent>
          </Sheet>

          {/* Refresh Button */}
          {!isMobile && (
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
          )}
        </div>
      </CardContent>
    </Card>
  );
};
