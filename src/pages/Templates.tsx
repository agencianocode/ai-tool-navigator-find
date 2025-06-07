
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Star, Download, Clock, DollarSign, Crown, Search, Filter } from "lucide-react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";

interface RoadmapTemplate {
  id: string;
  title: string;
  description: string;
  category: string;
  industry: string;
  difficulty_level: string;
  estimated_timeline: string;
  price: number;
  is_premium: boolean;
  is_featured: boolean;
  author_name: string;
  author_type: string;
  downloads_count: number;
  rating: number;
  reviews_count: number;
  tags: string[];
  preview_image: string;
}

const Templates = () => {
  const { user, subscriptionStatus } = useAuth();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [priceFilter, setPriceFilter] = useState("all");
  const [difficultyFilter, setDifficultyFilter] = useState("all");

  const { data: templates = [], isLoading } = useQuery({
    queryKey: ['roadmap-templates'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('roadmap_templates')
        .select('*')
        .order('is_featured', { ascending: false })
        .order('downloads_count', { ascending: false });

      if (error) throw error;
      return data as RoadmapTemplate[];
    },
  });

  const { data: userPurchases = [] } = useQuery({
    queryKey: ['user-template-purchases', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('template_purchases')
        .select('template_id')
        .eq('user_id', user.id);

      if (error) throw error;
      return data.map(p => p.template_id);
    },
    enabled: !!user,
  });

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = categoryFilter === "all" || template.category === categoryFilter;
    const matchesPrice = priceFilter === "all" || 
                        (priceFilter === "free" && template.price === 0) ||
                        (priceFilter === "paid" && template.price > 0);
    const matchesDifficulty = difficultyFilter === "all" || template.difficulty_level === difficultyFilter;

    return matchesSearch && matchesCategory && matchesPrice && matchesDifficulty;
  });

  const featuredTemplates = filteredTemplates.filter(t => t.is_featured);
  const freeTemplates = filteredTemplates.filter(t => t.price === 0);
  const premiumTemplates = filteredTemplates.filter(t => t.price > 0);

  const handlePurchase = async (template: RoadmapTemplate) => {
    if (!user) {
      toast({
        title: "Inicia sesión",
        description: "Necesitas una cuenta para comprar templates",
        variant: "destructive",
      });
      return;
    }

    if (template.price === 0) {
      // Template gratuito - agregar directamente
      try {
        const { error } = await supabase
          .from('template_purchases')
          .insert({
            user_id: user.id,
            template_id: template.id,
            purchase_price: 0,
          });

        if (error) throw error;

        toast({
          title: "¡Template agregado!",
          description: "El template gratuito se agregó a tu biblioteca",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "No se pudo agregar el template",
          variant: "destructive",
        });
      }
    } else {
      // Template de pago - procesar con Stripe
      try {
        const { data, error } = await supabase.functions.invoke('purchase-template', {
          body: { templateId: template.id }
        });

        if (error) throw error;

        if (data?.url) {
          window.open(data.url, '_blank');
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "No se pudo procesar la compra",
          variant: "destructive",
        });
      }
    }
  };

  const canAccessPremium = (template: RoadmapTemplate) => {
    if (!template.is_premium) return true;
    return subscriptionStatus.subscribed && 
           ['premium', 'enterprise'].includes(subscriptionStatus.subscription_tier || '');
  };

  const TemplateCard = ({ template }: { template: RoadmapTemplate }) => {
    const isPurchased = userPurchases.includes(template.id);
    const canAccess = canAccessPremium(template);

    return (
      <Card className={`h-full transition-all hover:shadow-lg ${template.is_featured ? 'ring-2 ring-purple-500' : ''}`}>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <CardTitle className="text-lg mb-2 line-clamp-2">{template.title}</CardTitle>
              <p className="text-sm text-gray-600 mb-3 line-clamp-3">{template.description}</p>
            </div>
            {template.is_featured && (
              <Badge className="ml-2 bg-purple-500">Destacado</Badge>
            )}
          </div>

          <div className="flex flex-wrap gap-2 mb-3">
            <Badge variant="outline">{template.category}</Badge>
            <Badge variant="outline">{template.difficulty_level}</Badge>
            {template.is_premium && (
              <Badge variant="outline" className="text-yellow-600">
                <Crown className="w-3 h-3 mr-1" />
                Premium
              </Badge>
            )}
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-current text-yellow-500" />
              <span>{template.rating.toFixed(1)} ({template.reviews_count})</span>
            </div>
            <div className="flex items-center gap-1">
              <Download className="w-4 h-4" />
              <span>{template.downloads_count}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{template.estimated_timeline}</span>
            </div>
          </div>

          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-1">
              <DollarSign className="w-4 h-4" />
              <span className="font-semibold">
                {template.price === 0 ? 'Gratuito' : `$${template.price}`}
              </span>
            </div>
            <span className="text-sm text-gray-500">por {template.author_name}</span>
          </div>
        </CardHeader>

        <CardContent>
          <div className="space-y-2">
            {isPurchased ? (
              <Button asChild className="w-full">
                <Link to={`/templates/${template.id}`}>
                  Ver Template
                </Link>
              </Button>
            ) : (
              <>
                {canAccess ? (
                  <Button 
                    onClick={() => handlePurchase(template)}
                    className="w-full"
                  >
                    {template.price === 0 ? 'Obtener Gratis' : 'Comprar Template'}
                  </Button>
                ) : (
                  <div className="space-y-2">
                    <Button disabled className="w-full">
                      <Crown className="w-4 h-4 mr-2" />
                      Requiere Premium
                    </Button>
                    <Button asChild variant="outline" className="w-full">
                      <Link to="/subscriptions">
                        Actualizar Plan
                      </Link>
                    </Button>
                  </div>
                )}
              </>
            )}
            <Button asChild variant="outline" className="w-full">
              <Link to={`/templates/${template.id}/preview`}>
                Vista Previa
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <>
      <SEO
        title="Marketplace de Templates - AI Tool Navigator"
        description="Descubre templates de roadmaps profesionales creados por expertos para acelerar tu proyecto."
        url="https://ai-tool-navigator.com/templates"
      />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Marketplace de Templates
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Acelera tu proyecto con roadmaps profesionales creados por expertos
            </p>
          </div>

          {/* Filtros */}
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar templates..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Categoría" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las categorías</SelectItem>
                  <SelectItem value="ecommerce">E-commerce</SelectItem>
                  <SelectItem value="saas">SaaS</SelectItem>
                  <SelectItem value="ai">Inteligencia Artificial</SelectItem>
                  <SelectItem value="fintech">Fintech</SelectItem>
                  <SelectItem value="marketplace">Marketplace</SelectItem>
                </SelectContent>
              </Select>

              <Select value={priceFilter} onValueChange={setPriceFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Precio" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los precios</SelectItem>
                  <SelectItem value="free">Gratuitos</SelectItem>
                  <SelectItem value="paid">De pago</SelectItem>
                </SelectContent>
              </Select>

              <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Dificultad" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los niveles</SelectItem>
                  <SelectItem value="beginner">Principiante</SelectItem>
                  <SelectItem value="intermediate">Intermedio</SelectItem>
                  <SelectItem value="advanced">Avanzado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Templates */}
          <Tabs defaultValue="featured" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="featured">Destacados</TabsTrigger>
              <TabsTrigger value="all">Todos</TabsTrigger>
              <TabsTrigger value="free">Gratuitos</TabsTrigger>
              <TabsTrigger value="premium">Premium</TabsTrigger>
            </TabsList>

            <TabsContent value="featured" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredTemplates.map((template) => (
                  <TemplateCard key={template.id} template={template} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="all" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTemplates.map((template) => (
                  <TemplateCard key={template.id} template={template} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="free" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {freeTemplates.map((template) => (
                  <TemplateCard key={template.id} template={template} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="premium" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {premiumTemplates.map((template) => (
                  <TemplateCard key={template.id} template={template} />
                ))}
              </div>
            </TabsContent>
          </Tabs>

          {filteredTemplates.length === 0 && !isLoading && (
            <div className="text-center py-12">
              <Filter className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No se encontraron templates
              </h3>
              <p className="text-gray-500">
                Intenta ajustar los filtros de búsqueda
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Templates;
