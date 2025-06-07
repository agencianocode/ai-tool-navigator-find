
import { Badge } from "@/components/ui/badge";
import { CheckCircle } from "lucide-react";

interface VerifiedReviewBadgeProps {
  isVerified: boolean;
  purchaseVerified?: boolean;
}

export const VerifiedReviewBadge = ({ isVerified, purchaseVerified }: VerifiedReviewBadgeProps) => {
  if (!isVerified) return null;

  return (
    <div className="flex items-center gap-2">
      <Badge variant="outline" className="text-green-700 border-green-300">
        <CheckCircle className="w-3 h-3 mr-1" />
        Usuario Verificado
      </Badge>
      {purchaseVerified && (
        <Badge variant="outline" className="text-blue-700 border-blue-300">
          Compra Verificada
        </Badge>
      )}
    </div>
  );
};
