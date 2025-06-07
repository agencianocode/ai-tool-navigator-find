
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { enhancedCategories, subcategories } from "@/data/expandedToolsDatabase";
import { useIsMobile } from "@/hooks/use-mobile";
import { useRef, useEffect } from "react";

interface CategoryFilterProps {
  selectedCategory: string | null;
  selectedSubcategory: string | null;
  onCategoryChange: (category: string | null) => void;
  onSubcategoryChange: (subcategory: string | null) => void;
  toolCounts?: Record<string, number>;
}

export const CategoryFilter = ({
  selectedCategory,
  selectedSubcategory,
  onCategoryChange,
  onSubcategoryChange,
  toolCounts = {}
}: CategoryFilterProps) => {
  const isMobile = useIsMobile();
  const selectedCategoryRef = useRef<HTMLButtonElement>(null);
  
  const mainCategories = [
    'AI Writing & Content',
    'No-Code Platforms',
    'Website Builders',
    'E-commerce Platforms',
    'Design & Prototyping',
    'Development Tools',
    'Database & Backend',
    'Communication',
    'Project Management',
    'Marketing & Analytics',
    'Mobile Development'
  ];

  const aiSpecificCategories = [
    'AI Image & Video',
    'AI Audio & Music',
    'Business Automation',
    'AI Research & Analysis',
    'AI Productivity & Automation',
    'AI Data & Analytics',
    'AI Translation & Language',
    'AI Cybersecurity',
    'AI Education & Learning',
    'AI Health & Wellness',
    'AI Finance & Fintech',
    'AI Gaming & Entertainment',
    'Blockchain & Web3'
  ];

  const getToolCount = (category: string) => {
    return toolCounts[category] || 0;
  };

  // Focus management for keyboard navigation
  useEffect(() => {
    if (selectedCategory && selectedCategoryRef.current) {
      selectedCategoryRef.current.focus();
    }
  }, [selectedCategory]);

  const handleKeyDown = (event: React.KeyboardEvent, category: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      if (selectedCategory === category) {
        onCategoryChange(null);
        onSubcategoryChange(null);
      } else {
        onCategoryChange(category);
        onSubcategoryChange(null);
      }
    }
  };

  const handleSubcategoryKeyDown = (event: React.KeyboardEvent, subcategory: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      if (selectedSubcategory === subcategory) {
        onSubcategoryChange(null);
      } else {
        onSubcategoryChange(subcategory);
      }
    }
  };

  const CategoryButton = ({ category }: { category: string }) => (
    <Button
      ref={selectedCategory === category ? selectedCategoryRef : null}
      variant={selectedCategory === category ? "default" : "outline"}
      size={isMobile ? "default" : "sm"}
      onClick={() => {
        if (selectedCategory === category) {
          onCategoryChange(null);
          onSubcategoryChange(null);
        } else {
          onCategoryChange(category);
          onSubcategoryChange(null);
        }
      }}
      onKeyDown={(e) => handleKeyDown(e, category)}
      className={`justify-between w-full ${isMobile ? 'h-11 text-sm' : 'h-9'} transition-colors focus-ring`}
      aria-pressed={selectedCategory === category}
      aria-describedby={`count-${category.replace(/\s+/g, '-').toLowerCase()}`}
    >
      <span className="truncate text-left">{category}</span>
      <Badge 
        variant="secondary" 
        className={`ml-2 ${isMobile ? 'text-xs px-2' : 'text-xs'} border`}
        id={`count-${category.replace(/\s+/g, '-').toLowerCase()}`}
        aria-label={`${getToolCount(category)} herramientas disponibles`}
      >
        {getToolCount(category)}
      </Badge>
    </Button>
  );

  return (
    <div className="space-y-4 md:space-y-6" role="region" aria-label="Filtros de categorías">
      <Tabs defaultValue="main" className="w-full">
        <TabsList 
          className={`grid w-full grid-cols-2 ${isMobile ? 'h-11' : ''}`}
          role="tablist"
          aria-label="Tipos de categorías"
        >
          <TabsTrigger 
            value="main" 
            className={`${isMobile ? 'text-sm' : ''} focus-ring`}
            role="tab"
            aria-controls="main-categories"
          >
            Principales
          </TabsTrigger>
          <TabsTrigger 
            value="ai" 
            className={`${isMobile ? 'text-sm' : ''} focus-ring`}
            role="tab"
            aria-controls="ai-categories"
          >
            IA Especializada
          </TabsTrigger>
        </TabsList>
        
        <TabsContent 
          value="main" 
          className="space-y-2 mt-4"
          role="tabpanel"
          id="main-categories"
          aria-label="Categorías principales"
        >
          <div className="grid grid-cols-1 gap-2" role="group" aria-label="Lista de categorías principales">
            {mainCategories.map(category => (
              <CategoryButton key={category} category={category} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent 
          value="ai" 
          className="space-y-2 mt-4"
          role="tabpanel"
          id="ai-categories"
          aria-label="Categorías de IA especializada"
        >
          <div className="grid grid-cols-1 gap-2" role="group" aria-label="Lista de categorías de IA especializada">
            {aiSpecificCategories.map(category => (
              <CategoryButton key={category} category={category} />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Subcategory filters */}
      {selectedCategory && (
        <div className="space-y-3" role="region" aria-label="Filtros de subcategorías">
          <h4 className={`font-medium text-high-contrast ${isMobile ? 'text-sm' : 'text-sm'}`}>
            Subcategorías
          </h4>
          <div 
            className="flex flex-wrap gap-2"
            role="group" 
            aria-label={`Subcategorías para ${selectedCategory}`}
          >
            {subcategories.map(subcategory => (
              <Button
                key={subcategory}
                variant={selectedSubcategory === subcategory ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  if (selectedSubcategory === subcategory) {
                    onSubcategoryChange(null);
                  } else {
                    onSubcategoryChange(subcategory);
                  }
                }}
                onKeyDown={(e) => handleSubcategoryKeyDown(e, subcategory)}
                className={`text-xs transition-colors focus-ring ${isMobile ? 'h-9 px-3' : 'h-8'}`}
                aria-pressed={selectedSubcategory === subcategory}
                aria-label={`Filtrar por subcategoría: ${subcategory}`}
              >
                {subcategory}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Clear filters */}
      {(selectedCategory || selectedSubcategory) && (
        <Button
          variant="ghost"
          size={isMobile ? "default" : "sm"}
          onClick={() => {
            onCategoryChange(null);
            onSubcategoryChange(null);
          }}
          className={`w-full text-medium-contrast hover:text-high-contrast focus-ring ${isMobile ? 'h-11' : ''}`}
          aria-label="Limpiar todos los filtros aplicados"
        >
          Limpiar filtros
        </Button>
      )}
    </div>
  );
};
