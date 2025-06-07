
import { useState, useMemo, useEffect } from "react";
import { Search, Filter, SlidersHorizontal, X, RefreshCw } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { EnhancedToolCard } from "@/components/enhanced/EnhancedToolCard";
import { CategoryFilter } from "@/components/enhanced/CategoryFilter";
import { AdvancedFilters } from "@/components/enhanced/AdvancedFilters";
import { expandedToolsDatabase, EnhancedTool } from "@/data/expandedToolsDatabase";
import { useIsMobile } from "@/hooks/use-mobile";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { CardSkeleton } from "@/components/ui/card-skeleton";

const EnhancedTools = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<string | null>(null);
  const [difficultyLevel, setDifficultyLevel] = useState<string | null>(null);
  const [hasFreeTrial, setHasFreeTrial] = useState<boolean | null>(null);
  const [sortBy, setSortBy] = useState<string>("rating");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  
  // New loading states
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  // Advanced filters state
  const [advancedFilters, setAdvancedFilters] = useState({
    difficultyRange: [1, 10] as [number, number],
    learningCurve: null as string | null,
    communitySize: null as string | null,
    hasApi: null as boolean | null,
    hasFreeVersion: null as boolean | null,
    minRating: 1,
    maxPricing: 1000,
    integrationOptions: [] as string[]
  });
  
  const isMobile = useIsMobile();

  // Simulate initial loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Simulate search loading
  useEffect(() => {
    if (searchTerm) {
      setIsSearching(true);
      const timer = setTimeout(() => {
        setIsSearching(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [searchTerm]);

  const filteredAndSortedTools = useMemo(() => {
    let filtered = expandedToolsDatabase.filter((tool) => {
      const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          tool.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = !selectedCategory || tool.category === selectedCategory;
      const matchesSubcategory = !selectedSubcategory || tool.subcategory === selectedSubcategory;
      
      const matchesPrice = !priceRange || (() => {
        const price = tool.pricing.toLowerCase();
        switch (priceRange) {
          case "free": return price.includes("gratis") || price.includes("free");
          case "freemium": return price.includes("freemium");
          case "paid": return !price.includes("gratis") && !price.includes("free");
          default: return true;
        }
      })();
      
      const matchesDifficulty = !difficultyLevel || (() => {
        switch (difficultyLevel) {
          case "beginner": return tool.difficulty_level <= 3;
          case "intermediate": return tool.difficulty_level >= 4 && tool.difficulty_level <= 6;
          case "advanced": return tool.difficulty_level >= 7;
          default: return true;
        }
      })();
      
      const matchesFreeTrial = hasFreeTrial === null || tool.freeVersion === hasFreeTrial;
      
      // Advanced filters
      const matchesAdvancedDifficulty = tool.difficulty_level >= advancedFilters.difficultyRange[0] && 
                                       tool.difficulty_level <= advancedFilters.difficultyRange[1];
      const matchesLearningCurve = !advancedFilters.learningCurve || tool.learning_curve === advancedFilters.learningCurve;
      const matchesCommunitySize = !advancedFilters.communitySize || tool.community_size === advancedFilters.communitySize;
      const matchesApiFilter = advancedFilters.hasApi === null || tool.apiAvailable === advancedFilters.hasApi;
      const matchesFreeFilter = advancedFilters.hasFreeVersion === null || tool.freeVersion === advancedFilters.hasFreeVersion;
      const matchesRating = tool.user_rating >= advancedFilters.minRating;
      
      return matchesSearch && matchesCategory && matchesSubcategory && 
             matchesPrice && matchesDifficulty && matchesFreeTrial &&
             matchesAdvancedDifficulty && matchesLearningCurve && matchesCommunitySize &&
             matchesApiFilter && matchesFreeFilter && matchesRating;
    });

    // Sorting logic
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.user_rating - a.user_rating;
        case "name":
          return a.name.localeCompare(b.name);
        case "category":
          return a.category.localeCompare(b.category);
        case "difficulty":
          return a.difficulty_level - b.difficulty_level;
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchTerm, selectedCategory, selectedSubcategory, priceRange, difficultyLevel, hasFreeTrial, sortBy, advancedFilters]);

  const toolCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    expandedToolsDatabase.forEach(tool => {
      counts[tool.category] = (counts[tool.category] || 0) + 1;
    });
    return counts;
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate refresh
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsRefreshing(false);
  };

  const clearAllFilters = () => {
    setSearchTerm("");
    setSelectedCategory(null);
    setSelectedSubcategory(null);
    setPriceRange(null);
    setDifficultyLevel(null);
    setHasFreeTrial(null);
    setSortBy("rating");
    setAdvancedFilters({
      difficultyRange: [1, 10],
      learningCurve: null,
      communitySize: null,
      hasApi: null,
      hasFreeVersion: null,
      minRating: 1,
      maxPricing: 1000,
      integrationOptions: []
    });
  };

  const activeFiltersCount = [
    selectedCategory,
    selectedSubcategory,
    priceRange,
    difficultyLevel,
    hasFreeTrial
  ].filter(Boolean).length;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <div className="h-8 bg-gray-200 rounded-lg w-64 mx-auto mb-4 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded-lg w-96 mx-auto animate-pulse"></div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1">
              <div className="h-96 bg-white rounded-lg animate-pulse"></div>
            </div>
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {Array.from({ length: 9 }).map((_, i) => (
                  <CardSkeleton key={i} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-6 md:py-8">
        {/* Header with enhanced animations */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold text-high-contrast mb-4">
            Herramientas IA Avanzadas
          </h1>
          <p className="text-medium-contrast text-lg max-w-2xl mx-auto">
            Descubre las mejores herramientas de inteligencia artificial para potenciar tu trabajo
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Desktop Sidebar */}
          {!isMobile && (
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
                    onCategoryChange={setSelectedCategory}
                    onSubcategoryChange={setSelectedSubcategory}
                    toolCounts={toolCounts}
                  />
                </CardContent>
              </Card>
            </div>
          )}

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Search and Controls with enhanced feedback */}
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
                          <CategoryFilter
                            selectedCategory={selectedCategory}
                            selectedSubcategory={selectedSubcategory}
                            onCategoryChange={setSelectedCategory}
                            onSubcategoryChange={setSelectedSubcategory}
                            toolCounts={toolCounts}
                          />
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
                        <AdvancedFilters
                          filters={advancedFilters}
                          onFiltersChange={setAdvancedFilters}
                          onClearFilters={() => setAdvancedFilters({
                            difficultyRange: [1, 10],
                            learningCurve: null,
                            communitySize: null,
                            hasApi: null,
                            hasFreeVersion: null,
                            minRating: 1,
                            maxPricing: 1000,
                            integrationOptions: []
                          })}
                        />
                      </div>
                    </SheetContent>
                  </Sheet>
                </div>

                {/* Active Filters with smooth animations */}
                {activeFiltersCount > 0 && (
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
                )}
              </CardContent>
            </Card>

            {/* Results with enhanced feedback */}
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

            {/* Tools Grid with staggered animations */}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedTools;
