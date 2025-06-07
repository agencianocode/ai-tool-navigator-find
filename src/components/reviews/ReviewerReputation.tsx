
import { Star, Award, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ReviewerReputationProps {
  reviewerName: string;
  reputationScore: number;
  totalReviews: number;
  helpfulVotes: number;
  expertBadges?: string[];
}

export const ReviewerReputation = ({ 
  reviewerName, 
  reputationScore, 
  totalReviews, 
  helpfulVotes,
  expertBadges = []
}: ReviewerReputationProps) => {
  const getReputationLevel = (score: number) => {
    if (score >= 1000) return { level: "Experto", color: "text-purple-600", icon: Award };
    if (score >= 500) return { level: "Avanzado", color: "text-blue-600", icon: TrendingUp };
    if (score >= 100) return { level: "Intermedio", color: "text-green-600", icon: Star };
    return { level: "Nuevo", color: "text-gray-600", icon: Star };
  };

  const reputation = getReputationLevel(reputationScore);
  const ReputationIcon = reputation.icon;

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <span className="font-medium">{reviewerName}</span>
        <div className={`flex items-center gap-1 ${reputation.color}`}>
          <ReputationIcon className="w-4 h-4" />
          <span className="text-sm font-medium">{reputation.level}</span>
        </div>
      </div>
      
      <div className="flex items-center gap-4 text-sm text-gray-600">
        <span>{totalReviews} reseñas</span>
        <span>{helpfulVotes} votos útiles</span>
        <span>Puntuación: {reputationScore}</span>
      </div>

      {expertBadges.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {expertBadges.map((badge) => (
            <Badge key={badge} variant="secondary" className="text-xs">
              {badge}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};
