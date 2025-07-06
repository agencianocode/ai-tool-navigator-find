
import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Star, ExternalLink } from "lucide-react";
import { expandedToolsDatabase } from "@/data/expandedToolsDatabase";
import { enhancedCategories } from "@/data/expandedToolsDatabase";
import Navigation from "@/components/Navigation";
import { SEO } from "@/components/SEO";

const Tools = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredTools = useMemo(() => {
    return expandedToolsDatabase.filter(tool => {
      const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           tool.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = !selectedCategory || tool.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    expandedToolsDatabase.forEach(tool => {
      counts[tool.category] = (counts[tool.category] || 0) + 1;
    });
    return counts;
  }, []);

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-3 h-3 ${
              star <= Math.round(rating)
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <>
      <SEO
        title="Herramientas IA - AI Tool Navigator"
        description="Explora las mejores herramientas de inteligencia artificial y no-code para tu proyecto."
        url="https://ai-tool-navigator.com/tools"
      />
      <Navigation />
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Herramientas de IA
            </h1>
            <p className="text-gray-600 mb-4">
              Descubre más de {expandedToolsDatabase.length} herramientas de inteligencia artificial
            </p>
            
            <div className="flex gap-4 text-sm text-gray-600">
              <Badge variant="outline">{expandedToolsDatabase.length} herramientas</Badge>
              <Badge variant="outline">{filteredTools.length} mostradas</Badge>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Buscar herramientas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Category filters */}
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                onClick={() => setSelectedCategory(null)}
                className={!selectedCategory ? "bg-purple-100" : ""}
              >
                Todas
              </Button>
              {enhancedCategories.slice(0, 6).map(category => (
                <Button
                  key={category}
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedCategory(category === selectedCategory ? null : category)}
                  className={selectedCategory === category ? "bg-purple-100" : ""}
                >
                  {category}
                  <Badge variant="secondary" className="ml-2">
                    {categoryCounts[category] || 0}
                  </Badge>
                </Button>
              ))}
            </div>
          </div>

          {/* Tools Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTools.map((tool) => (
              <Card key={tool.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-blue-100 rounded-xl flex items-center justify-center">
                        <img
                          src={`https://images.unsplash.com/${tool.logoPlaceholder}?w=48&h=48&fit=crop&crop=center`}
                          alt={tool.name}
                          className="w-10 h-10 rounded-lg object-cover"
                        />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{tool.name}</CardTitle>
                        <Badge variant="secondary" className="mt-1">
                          {tool.category}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {renderStars(tool.user_rating)}
                      <span className="text-sm text-gray-600 ml-1">({tool.user_rating})</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {tool.description}
                  </p>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Precio:</span>
                      <span className="font-medium">{tool.pricing.split(',')[0]}</span>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Complejidad:</span>
                      <Badge variant="outline" className="capitalize">
                        {tool.complexity}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {tool.tags?.slice(0, 2).map((tag, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {tool.tags && tool.tags.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{tool.tags.length - 2}
                      </Badge>
                    )}
                  </div>

                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => window.open(tool.website, '_blank')}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Ver Herramienta
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredTools.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">
                No se encontraron herramientas
              </p>
              <Button onClick={() => {
                setSearchTerm("");
                setSelectedCategory(null);
              }}>
                Limpiar filtros
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Tools;
