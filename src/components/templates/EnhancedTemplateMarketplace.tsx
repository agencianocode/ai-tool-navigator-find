
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Star, 
  Download, 
  Play, 
  TrendingUp, 
  Eye,
  ShoppingCart,
  Filter,
  CheckCircle,
  Clock,
  Users,
  DollarSign,
  Award,
  ExternalLink
} from "lucide-react";
import { useAnalytics } from "@/components/analytics/AnalyticsTracking";
import { realTemplates } from "@/data/realTemplates";

export const EnhancedTemplateMarketplace = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string>("featured");
  
  const { trackTemplateView, trackTemplateDownload, trackSearchQuery } = useAnalytics();

  const categories = ["Todos", "Atención al Cliente", "Marketing Digital", "Redes Sociales", "Ventas", "Recursos Humanos", "Finanzas"];
  const industries = ["Todos", "E-commerce", "SaaS", "Marketing", "B2B", "Startups", "Fintech"];
  const difficulties = ["Todos", "beginner", "intermediate", "advanced"];

  const filteredTemplates = realTemplates.filter(template => {
    const matchesSearch = template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || selectedCategory === "Todos" || template.category === selectedCategory;
    const matchesIndustry = !selectedIndustry || selectedIndustry === "Todos" || template.industry === selectedIndustry;
    const matchesDifficulty = !selectedDifficulty || selectedDifficulty === "Todos" || template.difficulty_level === selectedDifficulty;
    
    return matchesSearch && matchesCategory && matchesIndustry && matchesDifficulty;
  });

  const sortedTemplates = [...filteredTemplates].sort((a, b) => {
    switch (sortBy) {
      case "rating":
        return (b.rating || 0) - (a.rating || 0);
      case "downloads":
        return (b.downloads_count || 0) - (a.downloads_count || 0);
      case "price_low":
        return (a.price || 0) - (b.price || 0);
      case "price_high":
        return (b.price || 0) - (a.price || 0);
      default:
        return 0; // featured order
    }
  });

  useEffect(() => {
    if (searchTerm) {
      trackSearchQuery(searchTerm, filteredTemplates.length);
    }
  }, [searchTerm, filteredTemplates.length, trackSearchQuery]);

  const handleTemplateView = (template: any) => {
    trackTemplateView(template.id, template.title);
  };

  const handleTemplateDownload = (template: any) => {
    trackTemplateDownload(template.id, template.title);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner": return "bg-green-100 text-green-800";
      case "intermediate": return "bg-yellow-100 text-yellow-800";
      case "advanced": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getAuthorBadge = (authorType: string) => {
    switch (authorType) {
      case "expert": return <Badge className="bg-purple-100 text-purple-800"><Award className="w-3 h-3 mr-1" />Expert</Badge>;
      case "certified": return <Badge className="bg-blue-100 text-blue-800"><CheckCircle className="w-3 h-3 mr-1" />Certified</Badge>;
      case "verified": return <Badge className="bg-green-100 text-green-800"><CheckCircle className="w-3 h-3 mr-1" />Verified</Badge>;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Marketplace de Templates</h1>
        <p className="text-gray-600">
          Templates listos para usar que aceleran tu implementación de IA
        </p>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Buscar templates por nombre, categoría, herramientas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex gap-2">
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border rounded-md"
            >
              <option value="featured">Destacados</option>
              <option value="rating">Mejor Valorados</option>
              <option value="downloads">Más Descargados</option>
              <option value="price_low">Precio: Menor a Mayor</option>
              <option value="price_high">Precio: Mayor a Menor</option>
            </select>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <div className="flex gap-2 flex-wrap">
            <span className="text-sm font-medium text-gray-600">Categoría:</span>
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category === "Todos" ? null : category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          <div className="flex gap-2 flex-wrap">
            <span className="text-sm font-medium text-gray-600">Industria:</span>
            {industries.map(industry => (
              <Button
                key={industry}
                variant={selectedIndustry === industry ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedIndustry(industry === "Todos" ? null : industry)}
              >
                {industry}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex justify-between items-center">
        <p className="text-gray-600">
          {sortedTemplates.length} templates encontrados
        </p>
        <div className="flex gap-2">
          {difficulties.map(difficulty => (
            <Button
              key={difficulty}
              variant={selectedDifficulty === difficulty ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedDifficulty(difficulty === "Todos" ? null : difficulty)}
            >
              {difficulty === "Todos" ? "Todos" : difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
            </Button>
          ))}
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedTemplates.map((template) => (
          <Card key={template.id} className="hover:shadow-lg transition-shadow">
            <div className="relative">
              <div className="h-48 bg-gradient-to-br from-blue-100 to-purple-100 rounded-t-lg">
                {template.preview_images && template.preview_images.length > 0 && (
                  <img 
                    src={template.preview_images[0]} 
                    alt={template.title}
                    className="w-full h-full object-cover rounded-t-lg"
                  />
                )}
                <div className="absolute top-2 right-2 flex gap-2">
                  {template.demo_url && (
                    <Button size="sm" variant="secondary" className="bg-white">
                      <Play className="w-4 h-4" />
                    </Button>
                  )}
                  <Badge className="bg-white text-gray-800">
                    ${template.price}
                  </Badge>
                </div>
                <div className="absolute top-2 left-2">
                  <Badge className={getDifficultyColor(template.difficulty_level)}>
                    {template.difficulty_level}
                  </Badge>
                </div>
              </div>
            </div>
            
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg line-clamp-2">{template.title}</CardTitle>
                <div className="flex items-center gap-1 text-sm">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span>{template.rating}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <Badge variant="outline">{template.category}</Badge>
                {getAuthorBadge(template.author_type)}
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600 line-clamp-3">{template.description}</p>
              
              {/* ROI Metrics */}
              {template.roi_metrics && (
                <div className="grid grid-cols-2 gap-2 p-3 bg-green-50 rounded-lg">
                  {Object.entries(template.roi_metrics).slice(0, 2).map(([key, value]) => (
                    <div key={key} className="text-center">
                      <div className="font-bold text-green-600">{value}</div>
                      <div className="text-xs text-gray-600 capitalize">
                        {key.replace(/_/g, ' ')}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Tools */}
              <div className="space-y-2">
                <div className="text-sm font-medium">Herramientas incluidas:</div>
                <div className="flex flex-wrap gap-1">
                  {template.tools_included.slice(0, 3).map((tool, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tool}
                    </Badge>
                  ))}
                  {template.tools_included.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{template.tools_included.length - 3} más
                    </Badge>
                  )}
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <Download className="w-4 h-4" />
                    {template.downloads_count}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {template.reviews_count}
                  </span>
                </div>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {template.implementation_time}
                </span>
              </div>

              {/* Timeline and Support */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Timeline:</span>
                  <span className="font-medium">{template.estimated_timeline}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Soporte:</span>
                  <Badge variant="outline" className="text-xs">
                    {template.support_level}
                  </Badge>
                </div>
              </div>

              {/* Success Stories */}
              {template.success_stories && template.success_stories.length > 0 && (
                <div className="space-y-1">
                  <div className="text-sm font-medium text-green-600">Casos de éxito:</div>
                  <div className="text-xs text-gray-600">
                    • {template.success_stories[0]}
                  </div>
                </div>
              )}
              
              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button 
                  className="flex-1" 
                  onClick={() => {
                    handleTemplateView(template);
                    handleTemplateDownload(template);
                  }}
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Obtener Template
                </Button>
                {template.demo_url && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleTemplateView(template)}
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Stats Footer */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600">{realTemplates.length}+</div>
              <div className="text-sm text-gray-600">Templates Disponibles</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">
                {realTemplates.reduce((sum, t) => sum + (t.downloads_count || 0), 0)}+
              </div>
              <div className="text-sm text-gray-600">Descargas Totales</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">
                {(realTemplates.reduce((sum, t) => sum + (t.rating || 0), 0) / realTemplates.length).toFixed(1)}
              </div>
              <div className="text-sm text-gray-600">Rating Promedio</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-600">ROI 320%</div>
              <div className="text-sm text-gray-600">ROI Promedio</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
