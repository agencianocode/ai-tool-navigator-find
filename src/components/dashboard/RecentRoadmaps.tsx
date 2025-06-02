
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  Heart, 
  Download, 
  Edit3, 
  Trash2, 
  Copy,
  ExternalLink
} from "lucide-react";
import { Link } from "react-router-dom";

interface Roadmap {
  id: string;
  title: string;
  custom_name: string | null;
  description: string | null;
  project_type: string | null;
  status: string;
  is_favorite: boolean;
  created_at: string;
  updated_at: string;
}

interface RecentRoadmapsProps {
  roadmaps: Roadmap[];
  onDelete: (id: string) => void;
  onToggleFavorite: (id: string) => void;
}

const RecentRoadmaps = ({ roadmaps, onDelete, onToggleFavorite }: RecentRoadmapsProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'active': return 'bg-blue-100 text-blue-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Completada';
      case 'active': return 'Activa';
      case 'paused': return 'Pausada';
      case 'archived': return 'Archivada';
      default: return 'Desconocido';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Hojas de Ruta Recientes
        </CardTitle>
      </CardHeader>
      <CardContent>
        {roadmaps.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-gray-500 mb-4">
              <Calendar className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>No tienes hojas de ruta aún</p>
            </div>
            <Link to="/questionnaire">
              <Button>Crear Primera Hoja de Ruta</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {roadmaps.map((roadmap) => (
              <div key={roadmap.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">
                      {roadmap.custom_name || roadmap.title}
                    </h3>
                    {roadmap.description && (
                      <p className="text-sm text-gray-600 mt-1">{roadmap.description}</p>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onToggleFavorite(roadmap.id)}
                    className="ml-2"
                  >
                    <Heart 
                      className={`h-4 w-4 ${roadmap.is_favorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} 
                    />
                  </Button>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <Badge className={getStatusColor(roadmap.status)}>
                    {getStatusText(roadmap.status)}
                  </Badge>
                  {roadmap.project_type && (
                    <Badge variant="outline">{roadmap.project_type}</Badge>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    Actualizada: {formatDate(roadmap.updated_at)}
                  </span>
                  <div className="flex items-center gap-1">
                    <Link to={`/roadmap`} state={{ roadmapId: roadmap.id }}>
                      <Button variant="ghost" size="sm">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Edit3 className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => onDelete(roadmap.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentRoadmaps;
