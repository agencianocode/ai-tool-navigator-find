
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Calendar, 
  User, 
  Clock, 
  Eye, 
  Heart,
  TrendingUp,
  BookOpen,
  Star
} from "lucide-react";
import { blogPosts } from "@/data/realTemplates";
import { useAnalytics } from "@/components/analytics/AnalyticsTracking";

export const BlogSection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const { trackEvent } = useAnalytics();

  const categories = ["Todos", "IA Generativa", "No-Code", "Automatización", "ROI y Métricas", "Casos de Estudio"];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || selectedCategory === "Todos" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPosts = filteredPosts.filter(post => post.is_featured);
  const regularPosts = filteredPosts.filter(post => !post.is_featured);

  const handlePostClick = (post: any) => {
    trackEvent({
      event_type: 'content_interaction',
      event_name: 'blog_post_clicked',
      event_data: { 
        post_id: post.id, 
        post_title: post.title,
        category: post.category 
      }
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Blog de IA y Automatización</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Insights, casos de estudio y guías prácticas para dominar las herramientas de IA en tu negocio
        </p>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Buscar artículos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        <div className="flex gap-2 flex-wrap">
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

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section>
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <Star className="w-6 h-6 text-yellow-500" />
            Artículos Destacados
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {featuredPosts.map((post) => (
              <Card key={post.id} className="hover:shadow-lg transition-shadow overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-blue-100 to-purple-100">
                  {post.featured_image && (
                    <img 
                      src={post.featured_image} 
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline">{post.category}</Badge>
                    <Badge className="bg-yellow-100 text-yellow-800">
                      <Star className="w-3 h-3 mr-1" />
                      Destacado
                    </Badge>
                  </div>
                  <CardTitle className="text-xl line-clamp-2 hover:text-blue-600 cursor-pointer">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <p className="text-gray-600 line-clamp-3">{post.excerpt}</p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {post.author_name}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {formatDate(post.published_at)}
                      </span>
                    </div>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {post.read_time} min
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        {post.views_count?.toLocaleString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <Heart className="w-4 h-4" />
                        {post.likes_count}
                      </span>
                    </div>
                    <Button onClick={() => handlePostClick(post)}>
                      Leer Artículo
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Regular Posts */}
      <section>
        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
          <BookOpen className="w-6 h-6" />
          Todos los Artículos
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {regularPosts.map((post) => (
            <Card key={post.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline">{post.category}</Badge>
                  <span className="text-sm text-gray-500">
                    {post.read_time} min
                  </span>
                </div>
                <CardTitle className="text-lg line-clamp-2 hover:text-blue-600 cursor-pointer">
                  {post.title}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-gray-600 line-clamp-4">{post.excerpt}</p>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {post.tags?.slice(0, 3).map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    {post.author_name}
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {post.views_count?.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Heart className="w-4 h-4" />
                      {post.likes_count}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    {formatDate(post.published_at)}
                  </span>
                  <Button size="sm" onClick={() => handlePostClick(post)}>
                    Leer Más
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Newsletter Signup */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardContent className="p-8 text-center space-y-4">
          <h3 className="text-2xl font-bold">¿Te gustó el contenido?</h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Suscríbete a nuestro newsletter semanal y recibe los mejores insights sobre IA, 
            automatización y casos de estudio directamente en tu inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input placeholder="Tu email profesional" className="flex-1" />
            <Button>Suscribirse Gratis</Button>
          </div>
          <p className="text-xs text-gray-500">
            Más de 15,000 profesionales ya reciben nuestros insights semanales
          </p>
        </CardContent>
      </Card>

      {/* Blog Stats */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600">{blogPosts.length}+</div>
              <div className="text-sm text-gray-600">Artículos Publicados</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">
                {blogPosts.reduce((sum, post) => sum + (post.views_count || 0), 0).toLocaleString()}+
              </div>
              <div className="text-sm text-gray-600">Lecturas Totales</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">15,000+</div>
              <div className="text-sm text-gray-600">Suscriptores</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-600">4.8/5</div>
              <div className="text-sm text-gray-600">Rating Contenido</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
