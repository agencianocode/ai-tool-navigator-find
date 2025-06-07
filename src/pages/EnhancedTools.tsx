
import { useState, useMemo, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, Grid, List, SortAsc, X } from "lucide-react";
import { expandedToolsDatabase, EnhancedTool } from "@/data/expandedToolsDatabase";
import { EnhancedToolCard } from "@/components/enhanced/EnhancedToolCard";
import { CategoryFilter } from "@/components/enhanced/CategoryFilter";
import { AdvancedFilters } from "@/components/enhanced/AdvancedFilters";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";

const EnhancedTools = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('name');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const isMobile = useIsMobile();
  
  // Refs for focus management
  const searchInputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const skipToContentRef = useRef<HTMLAnchorElement>(null);
  
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

  const filteredTools = useMemo(() => {
    let filtered = expandedToolsDatabase.filter(tool => {
      // Search filter
      const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           tool.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      // Category filters
      const matchesCategory = !selectedCategory || tool.category === selectedCategory;
      const matchesSubcategory = !selectedSubcategory || tool.subcategory === selectedSubcategory;
      
      // Advanced filters
      const matchesDifficulty = tool.difficulty_level >= advancedFilters.difficultyRange[0] && 
                               tool.difficulty_level <= advancedFilters.difficultyRange[1];
      
      const matchesLearningCurve = !advancedFilters.learningCurve || 
                                  tool.learning_curve === advancedFilters.learningCurve;
      
      const matchesCommunitySize = !advancedFilters.communitySize || 
                                  tool.community_size === advancedFilters.communitySize;
      
      const matchesApi = advancedFilters.hasApi === null || tool.apiAvailable === advancedFilters.hasApi;
      const matchesFree = advancedFilters.hasFreeVersion === null || tool.freeVersion === advancedFilters.hasFreeVersion;
      const matchesRating = tool.user_rating >= advancedFilters.minRating;
      
      const matchesIntegrations = advancedFilters.integrationOptions.length === 0 ||
                                 advancedFilters.integrationOptions.some(integration =>
                                   tool.integration_options.some(option =>
                                     option.toLowerCase().includes(integration.toLowerCase())
                                   )
                                 );

      return matchesSearch && matchesCategory && matchesSubcategory && 
             matchesDifficulty && matchesLearningCurve && matchesCommunitySize &&
             matchesApi && matchesFree && matchesRating && matchesIntegrations;
    });

    // Sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'rating':
          return b.user_rating - a.user_rating;
        case 'difficulty':
          return a.difficulty_level - b.difficulty_level;
        case 'founded':
          return b.founded_year - a.founded_year;
        case 'popularity':
          return b.monthly_active_users?.localeCompare(a.monthly_active_users || '') || 0;
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchTerm, selectedCategory, selectedSubcategory, advancedFilters, sortBy]);

  const toolCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    expandedToolsDatabase.forEach(tool => {
      counts[tool.category] = (counts[tool.category] || 0) + 1;
    });
    return counts;
  }, []);

  const clearAllFilters = () => {
    setSearchTerm("");
    setSelectedCategory(null);
    setSelectedSubcategory(null);
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
    // Focus back to search input after clearing
    setTimeout(() => searchInputRef.current?.focus(), 100);
  };

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Alt + S to focus search
      if (event.altKey && event.key === 's') {
        event.preventDefault();
        searchInputRef.current?.focus();
      }
      // Alt + R to focus results
      if (event.altKey && event.key === 'r') {
        event.preventDefault();
        resultsRef.current?.focus();
      }
      // Alt + C to clear filters
      if (event.altKey && event.key === 'c') {
        event.preventDefault();
        clearAllFilters();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const FiltersContent = () => (
    <div className="space-y-6">
      <CategoryFilter
        selectedCategory={selectedCategory}
        selectedSubcategory={selectedSubcategory}
        onCategoryChange={setSelectedCategory}
        onSubcategoryChange={setSelectedSubcategory}
        toolCounts={toolCounts}
      />

      {showAdvancedFilters && (
        <AdvancedFilters
          filters={advancedFilters}
          onFiltersChange={setAdvancedFilters}
          onClearFilters={clearAllFilters}
        />
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 py-4 md:py-8">
      {/* Skip to content link for screen readers */}
      <a
        ref={skipToContentRef}
        href="#main-content"
        className="skip-to-content focus-ring"
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            resultsRef.current?.focus();
          }
        }}
      >
        Saltar al contenido principal
      </a>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-high-contrast mb-2">
            Explorar Herramientas AI y No-Code
          </h1>
          <p className="text-sm md:text-base text-medium-contrast mb-4">
            Descubre más de 500+ herramientas organizadas en categorías especializadas
          </p>
          
          {/* Stats */}
          <div className="flex flex-wrap gap-2 md:gap-6 text-sm text-medium-contrast" role="group" aria-label="Estadísticas de herramientas">
            <Badge variant="outline" className="border">{expandedToolsDatabase.length} herramientas</Badge>
            <Badge variant="outline" className="border">{Object.keys(toolCounts).length} categorías</Badge>
            <Badge variant="outline" className="border">{filteredTools.length} resultados</Badge>
          </div>

          {/* Keyboard shortcuts help */}
          <div className="mt-4 text-xs text-low-contrast">
            <p>Atajos de teclado: Alt+S (buscar), Alt+R (resultados), Alt+C (limpiar filtros)</p>
          </div>
        </header>

        {/* Search and Controls */}
        <div className="mb-6 space-y-4" role="search" aria-label="Controles de búsqueda y filtros">
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" aria-hidden="true" />
              <Input
                ref={searchInputRef}
                placeholder="Buscar herramientas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-11 md:h-10 focus-ring"
                aria-label="Buscar herramientas por nombre, descripción o características"
                aria-describedby="search-help"
              />
              <div id="search-help" className="sr-only">
                Escriba palabras clave para buscar entre {expandedToolsDatabase.length} herramientas disponibles
              </div>
            </div>
            
            <div className="flex gap-2">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger 
                  className="w-36 md:w-48 h-11 md:h-10 focus-ring"
                  aria-label="Ordenar resultados por"
                >
                  <SelectValue placeholder="Ordenar por..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Nombre A-Z</SelectItem>
                  <SelectItem value="rating">Mejor Calificados</SelectItem>
                  <SelectItem value="difficulty">Más Fáciles</SelectItem>
                  <SelectItem value="founded">Más Recientes</SelectItem>
                  <SelectItem value="popularity">Más Populares</SelectItem>
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                size="icon"
                onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                className="h-11 w-11 md:h-10 md:w-10 focus-ring"
                aria-label={`Cambiar a vista ${viewMode === 'grid' ? 'de lista' : 'de cuadrícula'}`}
                aria-pressed={viewMode === 'list'}
              >
                {viewMode === 'grid' ? <List className="h-4 w-4" aria-hidden="true" /> : <Grid className="h-4 w-4" aria-hidden="true" />}
              </Button>

              {/* Mobile Filters Button */}
              {isMobile ? (
                <Sheet open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
                  <SheetTrigger asChild>
                    <Button 
                      variant="outline" 
                      className="h-11 md:h-10 focus-ring"
                      aria-label="Abrir panel de filtros"
                    >
                      <Filter className="mr-2 h-4 w-4" aria-hidden="true" />
                      Filtros
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                    <SheetHeader>
                      <SheetTitle>Filtros de Herramientas</SheetTitle>
                    </SheetHeader>
                    <div className="mt-6">
                      <div className="mb-4">
                        <Button
                          variant="outline"
                          onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                          className="w-full focus-ring"
                          aria-expanded={showAdvancedFilters}
                          aria-controls="advanced-filters"
                        >
                          <Filter className="mr-2 h-4 w-4" aria-hidden="true" />
                          Filtros Avanzados
                        </Button>
                      </div>
                      <div id="advanced-filters">
                        <FiltersContent />
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              ) : (
                <Button
                  variant="outline"
                  onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                  className="h-11 md:h-10 focus-ring"
                  aria-expanded={showAdvancedFilters}
                  aria-controls="desktop-advanced-filters"
                >
                  <Filter className="mr-2 h-4 w-4" aria-hidden="true" />
                  Filtros
                </Button>
              )}
            </div>
          </div>
        </div>

        <div className="flex gap-6">
          {/* Desktop Sidebar */}
          {!isMobile && (
            <aside 
              className="w-80 space-y-6"
              role="complementary"
              aria-label="Filtros de herramientas"
            >
              <div id="desktop-advanced-filters">
                <FiltersContent />
              </div>
            </aside>
          )}

          {/* Main Content */}
          <main 
            id="main-content"
            className="flex-1"
            role="main"
            aria-label="Resultados de herramientas"
          >
            <div
              ref={resultsRef}
              tabIndex={-1}
              className="focus:outline-none"
              aria-live="polite"
              aria-label={`Mostrando ${filteredTools.length} de ${expandedToolsDatabase.length} herramientas`}
            >
              {filteredTools.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <h3 className="text-lg font-semibold mb-2 text-high-contrast">No se encontraron herramientas</h3>
                    <p className="text-medium-contrast mb-4">
                      Prueba ajustando los filtros o términos de búsqueda
                    </p>
                    <Button 
                      onClick={clearAllFilters}
                      className="focus-ring"
                      aria-label="Limpiar todos los filtros y mostrar todas las herramientas"
                    >
                      Limpiar todos los filtros
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div 
                  className={
                    viewMode === 'grid' 
                      ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6"
                      : "space-y-3 md:space-y-4"
                  }
                  role="list"
                  aria-label={`Lista de ${filteredTools.length} herramientas encontradas`}
                >
                  {filteredTools.map((tool) => (
                    <div key={tool.id} role="listitem">
                      <EnhancedToolCard
                        tool={tool}
                        showComparison={true}
                        isCompact={viewMode === 'list'}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default EnhancedTools;
