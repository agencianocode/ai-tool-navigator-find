
import { useState, useMemo, useEffect } from "react";
import { expandedToolsDatabase, EnhancedTool } from "@/data/expandedToolsDatabase";
import { useIsMobile } from "@/hooks/use-mobile";
import { CategoryFilter } from "@/components/enhanced/CategoryFilter";
import { AdvancedFilters } from "@/components/enhanced/AdvancedFilters";
import { EnhancedToolsHeader } from "@/components/enhanced/EnhancedToolsHeader";
import { SearchControls } from "@/components/enhanced/SearchControls";
import { FilterSidebar } from "@/components/enhanced/FilterSidebar";
import { ActiveFilters } from "@/components/enhanced/ActiveFilters";
import { ResultsSection } from "@/components/enhanced/ResultsSection";
import { InitialLoadingState } from "@/components/enhanced/LoadingStates";

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
  
  // Loading states
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
    return <InitialLoadingState />;
  }

  const mobileFilterContent = (
    <CategoryFilter
      selectedCategory={selectedCategory}
      selectedSubcategory={selectedSubcategory}
      onCategoryChange={setSelectedCategory}
      onSubcategoryChange={setSelectedSubcategory}
      toolCounts={toolCounts}
    />
  );

  const advancedFilterContent = (
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
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-6 md:py-8">
        <EnhancedToolsHeader isLoading={isLoading} />

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Desktop Sidebar */}
          {!isMobile && (
            <FilterSidebar
              isRefreshing={isRefreshing}
              handleRefresh={handleRefresh}
              selectedCategory={selectedCategory}
              selectedSubcategory={selectedSubcategory}
              onCategoryChange={setSelectedCategory}
              onSubcategoryChange={setSelectedSubcategory}
              toolCounts={toolCounts}
            />
          )}

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            <SearchControls
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              isSearching={isSearching}
              isRefreshing={isRefreshing}
              handleRefresh={handleRefresh}
              activeFiltersCount={activeFiltersCount}
              isFilterOpen={isFilterOpen}
              setIsFilterOpen={setIsFilterOpen}
              isAdvancedOpen={isAdvancedOpen}
              setIsAdvancedOpen={setIsAdvancedOpen}
              clearAllFilters={clearAllFilters}
              mobileFilterContent={mobileFilterContent}
              advancedFilterContent={advancedFilterContent}
            />

            <ActiveFilters
              selectedCategory={selectedCategory}
              selectedSubcategory={selectedSubcategory}
              priceRange={priceRange}
              setSelectedCategory={setSelectedCategory}
              setSelectedSubcategory={setSelectedSubcategory}
              setPriceRange={setPriceRange}
              activeFiltersCount={activeFiltersCount}
            />

            <ResultsSection
              isSearching={isSearching}
              filteredAndSortedTools={filteredAndSortedTools}
              clearAllFilters={clearAllFilters}
              viewMode={viewMode}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedTools;
