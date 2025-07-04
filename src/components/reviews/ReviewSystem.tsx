import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { 
  Star, 
  ThumbsUp, 
  ThumbsDown, 
  MessageSquare, 
  Send,
  Flag,
  CheckCircle,
  Award
} from "lucide-react";

interface Review {
  id: string;
  user_id: string;
  tool_id: string;
  tool_name: string;
  rating: number;
  review_title?: string;
  review_content?: string;
  is_verified: boolean;
  helpful_count: number;
  created_at: string;
  updated_at: string;
}

interface ReviewSystemProps {
  toolId: string;
  toolName: string;
}

export const ReviewSystem = ({ toolId, toolName }: ReviewSystemProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [isWritingReview, setIsWritingReview] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 0,
    title: "",
    content: ""
  });

  // Obtener reviews de la herramienta
  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ['tool-reviews', toolId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('tool_reviews')
        .select('*')
        .eq('tool_id', toolId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Review[];
    },
  });

  // Verificar si el usuario ya escribió una review
  const { data: userReview } = useQuery({
    queryKey: ['user-review', toolId, user?.id],
    queryFn: async () => {
      if (!user) return null;

      const { data, error } = await supabase
        .from('tool_reviews')
        .select('*')
        .eq('tool_id', toolId)
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      return data;
    },
    enabled: !!user,
  });

  // Obtener votos del usuario
  const { data: userVotes = [] } = useQuery({
    queryKey: ['user-votes', user?.id],
    queryFn: async () => {
      if (!user) return [];

      const { data, error } = await supabase
        .from('review_votes')
        .select('*')
        .eq('user_id', user.id);

      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  // Crear review
  const createReviewMutation = useMutation({
    mutationFn: async (reviewData: typeof newReview) => {
      if (!user) throw new Error('Usuario no autenticado');

      const { data, error } = await supabase
        .from('tool_reviews')
        .insert({
          user_id: user.id,
          tool_id: toolId,
          tool_name: toolName,
          rating: reviewData.rating,
          review_title: reviewData.title,
          review_content: reviewData.content,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tool-reviews', toolId] });
      queryClient.invalidateQueries({ queryKey: ['user-review', toolId, user?.id] });
      setIsWritingReview(false);
      setNewReview({ rating: 0, title: "", content: "" });
      toast({
        title: "Review enviada",
        description: "Tu review ha sido publicada exitosamente",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "No se pudo enviar la review",
        variant: "destructive",
      });
    },
  });

  // Votar en review
  const voteReviewMutation = useMutation({
    mutationFn: async ({ reviewId, isHelpful }: { reviewId: string; isHelpful: boolean }) => {
      if (!user) throw new Error('Usuario no autenticado');

      // Verificar si ya votó
      const existingVote = userVotes.find(v => v.review_id === reviewId);

      if (existingVote) {
        // Actualizar voto existente
        const { error } = await supabase
          .from('review_votes')
          .update({ is_helpful: isHelpful })
          .eq('id', existingVote.id);

        if (error) throw error;
      } else {
        // Crear nuevo voto
        const { error } = await supabase
          .from('review_votes')
          .insert({
            user_id: user.id,
            review_id: reviewId,
            is_helpful: isHelpful,
          });

        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tool-reviews', toolId] });
      queryClient.invalidateQueries({ queryKey: ['user-votes', user?.id] });
    },
  });

  // Reportar review
  const reportReviewMutation = useMutation({
    mutationFn: async ({ reviewId, reason }: { reviewId: string; reason: string }) => {
      if (!user) throw new Error('Usuario no autenticado');

      const { error } = await supabase
        .from('review_reports')
        .insert({
          review_id: reviewId,
          reporter_id: user.id,
          reason: reason,
          description: `Reporte automático por ${reason}`,
        });

      if (error) throw error;
    },
    onSuccess: () => {
      toast({
        title: "Reporte enviado",
        description: "Gracias por reportar contenido inapropiado",
      });
    },
  });

  const handleSubmitReview = () => {
    if (newReview.rating === 0) {
      toast({
        title: "Error",
        description: "Por favor selecciona una calificación",
        variant: "destructive",
      });
      return;
    }

    createReviewMutation.mutate(newReview);
  };

  const renderStars = (rating: number, interactive = false, onRatingChange?: (rating: number) => void) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-5 h-5 ${
              star <= rating 
                ? 'text-yellow-500 fill-current' 
                : 'text-gray-300'
            } ${interactive ? 'cursor-pointer hover:text-yellow-400' : ''}`}
            onClick={() => interactive && onRatingChange?.(star)}
          />
        ))}
      </div>
    );
  };

  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
    : 0;

  const getUserVote = (reviewId: string) => {
    return userVotes.find(v => v.review_id === reviewId);
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            <div className="h-20 bg-gray-200 rounded"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header con estadísticas */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Reviews y Calificaciones</span>
            <div className="flex items-center gap-2">
              {renderStars(Math.round(averageRating))}
              <span className="text-sm text-gray-600">
                ({averageRating.toFixed(1)}) • {reviews.length} reviews
              </span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{averageRating.toFixed(1)}</div>
              <div className="text-sm text-gray-600">Calificación promedio</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">{reviews.length}</div>
              <div className="text-sm text-gray-600">Reviews totales</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">
                {reviews.filter(r => r.is_verified).length}
              </div>
              <div className="text-sm text-gray-600">Reviews verificadas</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Escribir review */}
      {user && !userReview && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Escribe tu review
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!isWritingReview ? (
              <Button onClick={() => setIsWritingReview(true)}>
                Escribir Review
              </Button>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Calificación</label>
                  {renderStars(newReview.rating, true, (rating) => 
                    setNewReview(prev => ({ ...prev, rating }))
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Título (opcional)</label>
                  <Input
                    placeholder="Resumen de tu experiencia"
                    value={newReview.title}
                    onChange={(e) => setNewReview(prev => ({ ...prev, title: e.target.value }))}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Review</label>
                  <Textarea
                    placeholder="Comparte tu experiencia con esta herramienta..."
                    rows={4}
                    value={newReview.content}
                    onChange={(e) => setNewReview(prev => ({ ...prev, content: e.target.value }))}
                  />
                </div>

                <div className="flex gap-2">
                  <Button 
                    onClick={handleSubmitReview}
                    disabled={createReviewMutation.isPending}
                  >
                    <Send className="w-4 h-4 mr-2" />
                    {createReviewMutation.isPending ? "Enviando..." : "Enviar Review"}
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setIsWritingReview(false)}
                  >
                    Cancelar
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Lista de reviews */}
      <div className="space-y-4">
        {reviews.map((review) => {
          const userVote = getUserVote(review.id);
          
          return (
            <Card key={review.id}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                      U
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Usuario</span>
                        {review.is_verified && (
                          <Badge className="bg-green-100 text-green-800">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Verificado
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        {renderStars(review.rating)}
                        <span className="text-sm text-gray-500">
                          {new Date(review.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => reportReviewMutation.mutate({ 
                      reviewId: review.id, 
                      reason: "contenido_inapropiado" 
                    })}
                  >
                    <Flag className="w-4 h-4" />
                  </Button>
                </div>

                {review.review_title && (
                  <h4 className="font-semibold mb-2">{review.review_title}</h4>
                )}

                {review.review_content && (
                  <p className="text-gray-700 mb-4">{review.review_content}</p>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-500">
                      ¿Te fue útil esta review?
                    </span>
                    
                    {user && (
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className={userVote?.is_helpful === true ? "text-green-600" : ""}
                          onClick={() => voteReviewMutation.mutate({ 
                            reviewId: review.id, 
                            isHelpful: true 
                          })}
                        >
                          <ThumbsUp className="w-4 h-4 mr-1" />
                          Sí
                        </Button>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          className={userVote?.is_helpful === false ? "text-red-600" : ""}
                          onClick={() => voteReviewMutation.mutate({ 
                            reviewId: review.id, 
                            isHelpful: false 
                          })}
                        >
                          <ThumbsDown className="w-4 h-4 mr-1" />
                          No
                        </Button>
                      </div>
                    )}
                  </div>

                  <Badge variant="outline">
                    {review.helpful_count} personas encontraron esto útil
                  </Badge>
                </div>
              </CardContent>
            </Card>
          );
        })}

        {reviews.length === 0 && (
          <Card>
            <CardContent className="p-6 text-center">
              <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No hay reviews aún
              </h3>
              <p className="text-gray-500">
                Sé el primero en compartir tu experiencia con esta herramienta
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};