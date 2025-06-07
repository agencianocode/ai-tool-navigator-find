
import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, Grid, List, SortAsc } from "lucide-react";
import { expandedToolsDatabase, EnhancedTool } from "@/data/expandedToolsDatabase";
import { EnhancedToolCard } from "@/components/enhanced/EnhancedToolCard";
import { CategoryFilter } from "@/components/enhanced/CategoryFilter";
import { AdvancedFilters } from "@/components/enhanced/AdvancedFilters";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const EnhancedTools = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('name');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  
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
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Explorar Herramientas AI y No-Code
          </h1>
          <p className="text-gray-600 mb-4">
            Descubre más de 500+ herramientas organizadas en categorías especializadas
          </p>
          
          {/* Stats */}
          <div className="flex gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Badge variant="outline">{expandedToolsDatabase.length} herramientas</Badge>
              <Badge variant="outline">{Object.keys(toolCounts).length} categorías</Badge>
              <Badge variant="outline">{filteredTools.length} resultados</Badge>
            </div>
          </div>
        </div>

        {/* Search and Controls */}
        <div className="mb-6 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar herramientas por nombre, descripción o tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-2">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
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
              >
                {viewMode === 'grid' ? <List className="h-4 w-4" /> : <Grid className="h-4 w-4" />}
              </Button>

              <Button
                variant="outline"
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              >
                <Filter className="mr-2 h-4 w-4" />
                Filtros
              </Button>
            </div>
          </div>
        </div>

        <div className="flex gap-6">
          {/* Sidebar */}
          <div className="w-80 space-y-6">
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

          {/* Main Content */}
          <div className="flex-1">
            {filteredTools.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <h3 className="text-lg font-semibold mb-2">No se encontraron herramientas</h3>
                  <p className="text-gray-600 mb-4">
                    Prueba ajustando los filtros o términos de búsqueda
                  </p>
                  <Button onClick={clearAllFilters}>
                    Limpiar todos los filtros
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className={
                viewMode === 'grid' 
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  : "space-y-4"
              }>
                {filteredTools.map((tool) => (
                  <EnhancedToolCard
                    key={tool.id}
                    tool={tool}
                    showComparison={true}
                    isCompact={viewMode === 'list'}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedTools;
