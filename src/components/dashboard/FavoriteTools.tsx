
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FavoriteToolsProps {
  favoriteTools: string[];
}

const FavoriteTools = ({ favoriteTools }: FavoriteToolsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Star className="h-5 w-5" />
          Herramientas Favoritas
        </CardTitle>
      </CardHeader>
      <CardContent>
        {favoriteTools.length === 0 ? (
          <div className="text-center py-4">
            <Star className="h-8 w-8 mx-auto mb-2 text-gray-300" />
            <p className="text-sm text-gray-500">
              Marca herramientas como favoritas para verlas aquí
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {favoriteTools.slice(0, 5).map((tool, index) => (
              <div key={index} className="flex items-center justify-between p-2 rounded border">
                <span className="text-sm font-medium">{tool}</span>
                <Button variant="ghost" size="sm">
                  <ExternalLink className="h-3 w-3" />
                </Button>
              </div>
            ))}
            {favoriteTools.length > 5 && (
              <p className="text-xs text-gray-500 text-center mt-2">
                +{favoriteTools.length - 5} más...
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FavoriteTools;
