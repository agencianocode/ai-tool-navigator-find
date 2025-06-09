
import { EnhancedTool } from "@/data/expandedToolsDatabase";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Star, 
  ExternalLink, 
  Gift,
  CheckCircle,
  TrendingUp,
  Zap
} from "lucide-react";
import { useAnalytics } from "@/components/analytics/AnalyticsTracking";

interface CompactToolCardProps {
  tool: EnhancedTool;
  showComparison?: boolean;
  matchPercentage?: number;
  reasons?: string[];
  freeVersionDetails?: {
    available: boolean;
    limitations?: string;
    upgradeReasons?: string[];
  };
}

export const CompactToolCard = ({ 
  tool, 
  showComparison = false,
  matchPercentage,
  reasons,
  freeVersionDetails
}: CompactToolCardProps) => {
  const { trackToolView } = useAnalytics();

  const handleViewTool = () => {
    trackToolView(tool.id, tool.name);
    window.open(tool.website, '_blank');
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-3 h-3 ${
              star <= Math.round(rating)
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-orange-100 text-orange-800';
      case 'expert': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="hover:shadow-md transition-all duration-200">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          {/* Logo */}
          <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg flex items-center justify-center shrink-0">
            <img
              src={`https://images.unsplash.com/${tool.logoPlaceholder}?w=40&h=40&fit=crop&crop=center`}
              alt={tool.name}
              className="w-8 h-8 rounded-md object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(tool.name)}&background=6366f1&color=fff&size=32`;
              }}
            />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="font-semibold text-sm leading-tight">{tool.name}</h3>
                <div className="flex items-center gap-1 mt-1">
                  {renderStars(tool.user_rating)}
                  <span className="text-xs text-gray-500">({tool.user_rating})</span>
                </div>
              </div>
              {matchPercentage && (
                <Badge className={`text-xs ${matchPercentage > 80 ? 'bg-green-500' : matchPercentage > 60 ? 'bg-yellow-500' : 'bg-blue-500'} text-white`}>
                  {matchPercentage}%
                </Badge>
              )}
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-1 mb-2">
              <Badge variant="outline" className="text-xs">{tool.category}</Badge>
              <Badge className={`text-xs ${getComplexityColor(tool.complexity)}`}>
                {tool.complexity}
              </Badge>
              {freeVersionDetails?.available && (
                <Badge className="text-xs bg-green-100 text-green-800">
                  <Gift className="w-2 h-2 mr-1" />
                  Gratis
                </Badge>
              )}
              {tool.apiAvailable && (
                <Badge variant="outline" className="text-xs">
                  <Zap className="w-2 h-2 mr-1" />
                  API
                </Badge>
              )}
            </div>

            {/* Description */}
            <p className="text-xs text-gray-600 mb-2 line-clamp-2">
              {tool.description}
            </p>

            {/* Match Reasons */}
            {reasons && reasons.length > 0 && (
              <div className="mb-2 p-2 bg-purple-50 rounded text-xs">
                <div className="flex items-center gap-1 mb-1">
                  <TrendingUp className="w-3 h-3 text-purple-600" />
                  <span className="font-medium text-purple-900">Por qué te conviene:</span>
                </div>
                <div className="flex items-center gap-1 text-purple-700">
                  <CheckCircle className="w-2 h-2 text-green-500" />
                  <span>{reasons[0]}</span>
                </div>
              </div>
            )}

            {/* Price and Action */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-gray-700">{tool.pricing}</span>
              <div className="flex gap-1">
                <Button size="sm" variant="outline" className="text-xs h-7 px-2">
                  Ver
                </Button>
                <Button 
                  size="sm" 
                  className="text-xs h-7 px-2"
                  onClick={handleViewTool}
                >
                  <ExternalLink className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
