import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, ThumbsUp, ThumbsDown, Calendar } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { es } from "date-fns/locale";

interface Review {
  id: string;
  user_id: string;
  rating: number;
  review_title: string | null;
  review_content: string | null;
  helpful_count: number;
  created_at: string;
  profiles: {
    full_name: string | null;
  } | null;
}

interface ReviewVote {
  review_id: string;
  is_helpful: boolean;
}

interface ReviewsListProps {
  toolId: string;
  refreshTrigger?: number;
}

export const ReviewsList = ({ toolId, refreshTrigger }: ReviewsListProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [userVotes, setUserVotes] = useState<ReviewVote[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadReviews = async () => {
    try {
      const { data: reviewsData, error } = await supabase
        .from('tool_reviews')
        .select(`
          *,
          profiles(full_name)
        `)
        .eq('tool_id', toolId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Filter out reviews with profile errors and set default values
      const validReviews = reviewsData?.map(review => ({
        ...review,
        profiles: review.profiles && typeof review.profiles === 'object' && 'full_name' in review.profiles
          ? review.profiles as { full_name: string | null }
          : null
      })) || [];
      
      setReviews(validReviews);

      // Load user votes if logged in
      if (user && validReviews.length > 0) {
        const { data: votesData, error: votesError } = await supabase
          .from('review_votes')
          .select('review_id, is_helpful')
          .eq('user_id', user.id)
          .in('review_id', validReviews.map(r => r.id));

        if (votesError) throw votesError;
        setUserVotes(votesData || []);
      }

    } catch (error) {
      console.error('Error loading reviews:', error);
      toast({
        title: "Error",
        description: "Error al cargar las reseñas",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadReviews();
  }, [toolId, user, refreshTrigger]);

  const handleVote = async (reviewId: string, isHelpful: boolean) => {
    if (!user) {
      toast({
        title: "Error",
        description: "Debes iniciar sesión para votar",
        variant: "destructive",
      });
      return;
    }

    try {
      const existingVote = userVotes.find(v => v.review_id === reviewId);

      if (existingVote) {
        if (existingVote.is_helpful === isHelpful) {
          // Remove vote if clicking the same button
          const { error } = await supabase
            .from('review_votes')
            .delete()
            .eq('user_id', user.id)
            .eq('review_id', reviewId);

          if (error) throw error;
          setUserVotes(prev => prev.filter(v => v.review_id !== reviewId));
        } else {
          // Update vote
          const { error } = await supabase
            .from('review_votes')
            .update({ is_helpful: isHelpful })
            .eq('user_id', user.id)
            .eq('review_id', reviewId);

          if (error) throw error;
          setUserVotes(prev => 
            prev.map(v => 
              v.review_id === reviewId 
                ? { ...v, is_helpful: isHelpful }
                : v
            )
          );
        }
      } else {
        // Create new vote
        const { error } = await supabase
          .from('review_votes')
          .insert({
            user_id: user.id,
            review_id: reviewId,
            is_helpful: isHelpful,
          });

        if (error) throw error;
        setUserVotes(prev => [...prev, { review_id: reviewId, is_helpful: isHelpful }]);
      }

      // Refresh reviews to update counts
      await loadReviews();

    } catch (error) {
      console.error('Error voting on review:', error);
      toast({
        title: "Error",
        description: "Error al votar en la reseña",
        variant: "destructive",
      });
    }
  };

  const getUserVote = (reviewId: string) => {
    return userVotes.find(v => v.review_id === reviewId);
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="pt-6">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6 text-center">
          <p className="text-gray-500">No hay reseñas aún. ¡Sé el primero en escribir una!</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => {
        const userVote = getUserVote(review.id);
        const profileName = review.profiles?.full_name ?? 'Usuario anónimo';
        
        return (
          <Card key={review.id}>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    {renderStars(review.rating)}
                    <span className="text-sm text-gray-500">
                      por {profileName}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <Calendar className="w-3 h-3" />
                    {format(new Date(review.created_at), "d 'de' MMMM, yyyy", { locale: es })}
                  </div>
                </div>
              </div>

              {review.review_title && (
                <h4 className="font-semibold mb-2">{review.review_title}</h4>
              )}

              {review.review_content && (
                <p className="text-gray-700 mb-4">{review.review_content}</p>
              )}

              <div className="flex items-center gap-4 text-sm">
                <span className="text-gray-500">¿Fue útil esta reseña?</span>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleVote(review.id, true)}
                    className={`h-8 ${
                      userVote?.is_helpful === true
                        ? 'bg-green-100 text-green-700'
                        : ''
                    }`}
                  >
                    <ThumbsUp className="w-4 h-4 mr-1" />
                    Sí
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleVote(review.id, false)}
                    className={`h-8 ${
                      userVote?.is_helpful === false
                        ? 'bg-red-100 text-red-700'
                        : ''
                    }`}
                  >
                    <ThumbsDown className="w-4 h-4 mr-1" />
                    No
                  </Button>
                </div>
                {review.helpful_count > 0 && (
                  <span className="text-gray-500">
                    {review.helpful_count} persona{review.helpful_count !== 1 ? 's' : ''} encontró esto útil
                  </span>
                )}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
