import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ExternalLink, Star, Users, DollarSign, Clock } from "lucide-react";
import { expandedAiTools } from "@/data/expandedAiTools";
import { ReviewsSection } from "@/components/reviews/ReviewsSection";
import { supabase } from "@/integrations/supabase/client";

interface ToolStats {
  averageRating: number;
  totalReviews: number;
}

const ToolDetails = () => {
  const { toolId } = useParams<{ toolId: string }>();
  const [toolStats, setToolStats] = useState<ToolStats>({ averageRating: 0, totalReviews: 0 });
  
  const tool = expandedAiTools.find(t => t.id === toolId);

  useEffect(() => {
    if (toolId) {
      loadToolStats();
    }
  }, [toolId]);

  const loadToolStats = async () => {
    if (!toolId) return;

    try {
      const { data, error } = await supabase
        .from('tool_reviews')
        .select('rating')
        .eq('tool_id', toolId);

      if (error) throw error;

      if (data && data.length > 0) {
        const total = data.length;
        const sum = data.reduce((acc, review) => acc + review.rating, 0);
        const average = sum / total;

        setToolStats({
          averageRating: average,
          totalReviews: total,
        });
      }
    } catch (error) {
      console.error('Error loading tool stats:', error);
    }
  };

  if (!tool) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardContent className="pt-6 text-center">
              <h1 className="text-2xl font-bold mb-4">Herramienta no encontrada</h1>
              <p className="text-gray-600 mb-6">La herramienta que buscas no existe o ha sido eliminada.</p>
              <Link to="/">
                <Button>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Volver al Inicio
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-5 h-5 ${
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          <Link to="/results">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver a Resultados
            </Button>
          </Link>
        </div>

        {/* Tool Overview */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Tool Logo */}
              <div className="flex-shrink-0">
                <div className="w-24 h-24 bg-gradient-to-br from-purple-100 to-blue-100 rounded-xl flex items-center justify-center">
                  <img
                    src={`https://images.unsplash.com/${tool.logoPlaceholder}?w=96&h=96&fit=crop&crop=center`}
                    alt={tool.name}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                </div>
              </div>

              {/* Tool Info */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold mb-2">{tool.name}</h1>
                    <p className="text-gray-600 mb-2">{tool.category}</p>
                    <div className="flex items-center gap-4 mb-3">
                      {toolStats.totalReviews > 0 ? (
                        <>
                          {renderStars(toolStats.averageRating)}
                          <span className="text-lg font-semibold">
                            {toolStats.averageRating.toFixed(1)}
                          </span>
                          <span className="text-gray-500">
                            ({toolStats.totalReviews} reseña{toolStats.totalReviews !== 1 ? 's' : ''})
                          </span>
                        </>
                      ) : (
                        <span className="text-gray-500">Sin reseñas aún</span>
                      )}
                    </div>
                  </div>
                  <Button asChild>
                    <a href={tool.website} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Visitar Sitio
                    </a>
                  </Button>
                </div>

                <p className="text-gray-700 mb-4 text-lg">{tool.description}</p>

                {/* Key Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="text-sm text-gray-500">Precio</p>
                      <p className="font-semibold">{tool.pricing}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="text-sm text-gray-500">Complejidad</p>
                      <p className="font-semibold capitalize">{tool.complexity}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-purple-600" />
                    <div>
                      <p className="text-sm text-gray-500">API Disponible</p>
                      <p className="font-semibold">{tool.apiAvailable ? 'Sí' : 'No'}</p>
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Características:</h3>
                  <div className="flex flex-wrap gap-2">
                    {tool.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {tool.freeVersion && (
                      <Badge variant="outline" className="text-green-700 border-green-300 text-xs">
                        Versión Gratuita
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Reviews Section */}
        <ReviewsSection
          toolId={tool.id}
          toolName={tool.name}
          averageRating={toolStats.averageRating}
          totalReviews={toolStats.totalReviews}
        />
      </div>
    </div>
  );
};

export default ToolDetails;
