
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useFavorites } from "@/hooks/useFavorites";

interface FavoriteButtonProps {
  toolName: string;
  size?: "sm" | "default" | "lg";
  variant?: "default" | "outline" | "ghost";
  showText?: boolean;
}

const FavoriteButton = ({ 
  toolName, 
  size = "sm", 
  variant = "ghost",
  showText = false 
}: FavoriteButtonProps) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const isFav = isFavorite(toolName);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(toolName);
  };

  return (
    <Button
      size={size}
      variant={variant}
      onClick={handleClick}
      className={`transition-colors ${isFav ? 'text-red-500 hover:text-red-600' : 'text-gray-400 hover:text-red-500'}`}
    >
      <Heart 
        className={`h-4 w-4 ${isFav ? 'fill-current' : ''} ${showText ? 'mr-2' : ''}`} 
      />
      {showText && (isFav ? 'Eliminar de favoritos' : 'Agregar a favoritos')}
    </Button>
  );
};

export default FavoriteButton;
