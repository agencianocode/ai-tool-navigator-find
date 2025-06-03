
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, MessageSquare, Plus } from "lucide-react";
import { ReviewForm } from "./ReviewForm";
import { ReviewsList } from "./ReviewsList";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface ReviewsSectionProps {
  toolId: string;
  toolName: string;
  averageRating?: number;
  totalReviews?: number;
}

export const ReviewsSection = ({ 
  toolId, 
  toolName, 
  averageRating = 0, 
  totalReviews = 0 
}: ReviewsSectionProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [showForm, setShowForm] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleReviewSubmitted = () => {
    setShowForm(false);
    setRefreshTrigger(prev => prev + 1);
  };

  const handleWriteReview = () => {
    if (!user) {
      toast({
        title: "Error",
        description: "Debes iniciar sesión para escribir una reseña",
        variant: "destructive",
      });
      return;
    }
    setShowForm(true);
  };

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
    <div className="space-y-6">
      {/* Reviews Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Reseñas y Calificaciones
            </CardTitle>
            {!showForm && (
              <Button onClick={handleWriteReview} className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Escribir Reseña
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              {renderStars(averageRating)}
              <span className="text-lg font-semibold">
                {averageRating > 0 ? averageRating.toFixed(1) : 'Sin calificar'}
              </span>
            </div>
            <span className="text-gray-500">
              ({totalReviews} reseña{totalReviews !== 1 ? 's' : ''})
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Review Form */}
      {showForm && (
        <ReviewForm
          toolId={toolId}
          toolName={toolName}
          onReviewSubmitted={handleReviewSubmitted}
        />
      )}

      {/* Reviews List */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Todas las Reseñas</h3>
        <ReviewsList toolId={toolId} refreshTrigger={refreshTrigger} />
      </div>
    </div>
  );
};
