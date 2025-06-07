
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { enhancedCategories, subcategories } from "@/data/expandedToolsDatabase";

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

  const CategoryButton = ({ category }: { category: string }) => (
    <Button
      variant={selectedCategory === category ? "default" : "outline"}
      size="sm"
      onClick={() => {
        if (selectedCategory === category) {
          onCategoryChange(null);
          onSubcategoryChange(null);
        } else {
          onCategoryChange(category);
          onSubcategoryChange(null);
        }
      }}
      className="justify-between w-full"
    >
      <span className="truncate">{category}</span>
      <Badge variant="secondary" className="ml-2">
        {getToolCount(category)}
      </Badge>
    </Button>
  );

  return (
    <div className="space-y-4">
      <Tabs defaultValue="main" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="main">Principales</TabsTrigger>
          <TabsTrigger value="ai">IA Especializada</TabsTrigger>
        </TabsList>
        
        <TabsContent value="main" className="space-y-2">
          <div className="grid grid-cols-1 gap-2">
            {mainCategories.map(category => (
              <CategoryButton key={category} category={category} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="ai" className="space-y-2">
          <div className="grid grid-cols-1 gap-2">
            {aiSpecificCategories.map(category => (
              <CategoryButton key={category} category={category} />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Subcategory filters */}
      {selectedCategory && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-700">Subcategorías</h4>
          <div className="flex flex-wrap gap-2">
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
                className="text-xs"
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
          size="sm"
          onClick={() => {
            onCategoryChange(null);
            onSubcategoryChange(null);
          }}
          className="w-full"
        >
          Limpiar filtros
        </Button>
      )}
    </div>
  );
};
