
import { Star } from "lucide-react";

interface ToolCardRatingProps {
  rating: number;
}

export const ToolCardRating = ({ rating }: ToolCardRatingProps) => {
  return (
    <div className="flex gap-0.5" role="img" aria-label={`Calificación: ${rating} de 5 estrellas`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-3 h-3 transition-colors duration-200 ${
            star <= Math.round(rating)
              ? 'fill-yellow-400 text-yellow-400'
              : 'text-gray-300'
          }`}
          aria-hidden="true"
        />
      ))}
    </div>
  );
};
