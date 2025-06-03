
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface ReviewFormProps {
  toolId: string;
  toolName: string;
  onReviewSubmitted: () => void;
}

export const ReviewForm = ({ toolId, toolName, onReviewSubmitted }: ReviewFormProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewContent, setReviewContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Error",
        description: "Debes iniciar sesión para escribir una reseña",
        variant: "destructive",
      });
      return;
    }

    if (rating === 0) {
      toast({
        title: "Error",
        description: "Por favor selecciona una calificación",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('tool_reviews')
        .insert({
          user_id: user.id,
          tool_id: toolId,
          tool_name: toolName,
          rating,
          review_title: reviewTitle.trim() || null,
          review_content: reviewContent.trim() || null,
        });

      if (error) throw error;

      toast({
        title: "Éxito",
        description: "Tu reseña ha sido enviada correctamente",
      });

      // Reset form
      setRating(0);
      setReviewTitle("");
      setReviewContent("");
      onReviewSubmitted();

    } catch (error) {
      console.error('Error submitting review:', error);
      toast({
        title: "Error",
        description: "Error al enviar la reseña",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Escribir Reseña para {toolName}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Rating Stars */}
          <div>
            <label className="block text-sm font-medium mb-2">Calificación *</label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className="focus:outline-none"
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  onClick={() => setRating(star)}
                >
                  <Star
                    className={`w-8 h-8 ${
                      star <= (hoveredRating || rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Review Title */}
          <div>
            <label className="block text-sm font-medium mb-2">Título de la reseña</label>
            <Input
              value={reviewTitle}
              onChange={(e) => setReviewTitle(e.target.value)}
              placeholder="Resume tu experiencia en pocas palabras"
              maxLength={100}
            />
          </div>

          {/* Review Content */}
          <div>
            <label className="block text-sm font-medium mb-2">Detalla tu experiencia</label>
            <Textarea
              value={reviewContent}
              onChange={(e) => setReviewContent(e.target.value)}
              placeholder="¿Qué te gustó más? ¿Qué mejorarías? Comparte tu experiencia..."
              rows={4}
              maxLength={1000}
            />
          </div>

          <Button type="submit" disabled={isSubmitting || rating === 0}>
            {isSubmitting ? "Enviando..." : "Publicar Reseña"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
