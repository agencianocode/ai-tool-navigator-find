
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, MessageSquare, Plus, Filter } from "lucide-react";
import { ReviewForm } from "./ReviewForm";
import { ReviewsList } from "./ReviewsList";
import { VerifiedReviewBadge } from "./VerifiedReviewBadge";
import { ReviewerReputation } from "./ReviewerReputation";
import { MultimediaReview } from "./MultimediaReview";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface EnhancedReviewsSectionProps {
  toolId: string;
  toolName: string;
  averageRating?: number;
  totalReviews?: number;
}

export const EnhancedReviewsSection = ({ 
  toolId, 
  toolName, 
  averageRating = 0, 
  totalReviews = 0 
}: EnhancedReviewsSectionProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [showForm, setShowForm] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [filterBy, setFilterBy] = useState<'all' | 'verified' | 'multimedia'>('all');

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

  // Mock data for enhanced reviews
  const sampleReviews = [
    {
      id: 1,
      rating: 5,
      title: "Perfecta para automatización de marketing",
      content: "Increíble herramienta que nos ha ahorrado 20 horas semanales...",
      reviewer: {
        name: "Ana García",
        isVerified: true,
        purchaseVerified: true,
        reputationScore: 1250,
        totalReviews: 47,
        helpfulVotes: 234,
        expertBadges: ["Marketing Digital", "Automatización"]
      },
      multimedia: {
        videoUrl: "https://example.com/video",
        images: [
          "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=200",
          "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200"
        ]
      },
      helpfulCount: 23,
      createdAt: "2024-01-10"
    },
    {
      id: 2,
      rating: 4,
      title: "Muy buena, pero tiene curva de aprendizaje",
      content: "La herramienta es potente pero necesitas tiempo para dominarla...",
      reviewer: {
        name: "Carlos Mendez",
        isVerified: true,
        purchaseVerified: false,
        reputationScore: 580,
        totalReviews: 23,
        helpfulVotes: 145,
        expertBadges: ["No-Code"]
      },
      helpfulCount: 15,
      createdAt: "2024-01-08"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Reviews Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Reseñas y Calificaciones Avanzadas
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
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-2">
              {renderStars(averageRating)}
              <span className="text-lg font-semibold">
                {averageRating > 0 ? averageRating.toFixed(1) : 'Sin calificar'}
              </span>
            </div>
            <span className="text-gray-500">
              ({totalReviews} reseña{totalReviews !== 1 ? 's' : ''})
            </span>
            <VerifiedReviewBadge isVerified={true} purchaseVerified={true} />
          </div>

          {/* Filter buttons */}
          <div className="flex gap-2">
            <Button
              variant={filterBy === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilterBy('all')}
            >
              Todas
            </Button>
            <Button
              variant={filterBy === 'verified' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilterBy('verified')}
            >
              Verificadas
            </Button>
            <Button
              variant={filterBy === 'multimedia' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilterBy('multimedia')}
            >
              Con Multimedia
            </Button>
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

      {/* Enhanced Reviews List */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Reseñas de la Comunidad</h3>
        <div className="space-y-6">
          {sampleReviews.map((review) => (
            <Card key={review.id}>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Review Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <ReviewerReputation
                        reviewerName={review.reviewer.name}
                        reputationScore={review.reviewer.reputationScore}
                        totalReviews={review.reviewer.totalReviews}
                        helpfulVotes={review.reviewer.helpfulVotes}
                        expertBadges={review.reviewer.expertBadges}
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      {renderStars(review.rating)}
                      <span className="font-medium">{review.rating}/5</span>
                    </div>
                  </div>

                  {/* Verification badges */}
                  <VerifiedReviewBadge 
                    isVerified={review.reviewer.isVerified}
                    purchaseVerified={review.reviewer.purchaseVerified}
                  />

                  {/* Review content */}
                  <div>
                    <h4 className="font-semibold mb-2">{review.title}</h4>
                    <p className="text-gray-700">{review.content}</p>
                  </div>

                  {/* Multimedia content */}
                  {review.multimedia && (
                    <MultimediaReview
                      videoUrl={review.multimedia.videoUrl}
                      images={review.multimedia.images}
                    />
                  )}

                  {/* Review actions */}
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>{review.createdAt}</span>
                      <span>{review.helpfulCount} personas encontraron esto útil</span>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Útil ({review.helpfulCount})
                      </Button>
                      <Button variant="ghost" size="sm">
                        Reportar
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
