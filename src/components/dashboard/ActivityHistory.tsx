
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, FileText, Star, Plus } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";

const ActivityHistory = () => {
  const { user } = useAuth();

  const { data: activities = [] } = useQuery({
    queryKey: ['activity-history', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      // Fetch roadmaps
      const { data: roadmaps } = await supabase
        .from('roadmaps')
        .select('id, title, created_at, updated_at')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false })
        .limit(10);

      // Fetch reviews
      const { data: reviews } = await supabase
        .from('tool_reviews')
        .select('id, tool_name, rating, created_at')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(10);

      const activities = [];
      
      // Add roadmap activities
      roadmaps?.forEach(roadmap => {
        activities.push({
          id: `roadmap-${roadmap.id}`,
          type: 'roadmap',
          title: `Hoja de ruta: ${roadmap.title}`,
          timestamp: roadmap.updated_at,
          icon: FileText,
          color: 'bg-blue-500'
        });
      });

      // Add review activities
      reviews?.forEach(review => {
        activities.push({
          id: `review-${review.id}`,
          type: 'review',
          title: `Reseña de ${review.tool_name}`,
          subtitle: `${review.rating}/5 estrellas`,
          timestamp: review.created_at,
          icon: Star,
          color: 'bg-yellow-500'
        });
      });

      // Sort by timestamp
      return activities.sort((a, b) => 
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );
    },
    enabled: !!user,
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Historial de Actividad
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.length > 0 ? (
            activities.map((activity) => {
              const Icon = activity.icon;
              return (
                <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg border">
                  <div className={`w-8 h-8 rounded-full ${activity.color} flex items-center justify-center`}>
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm">{activity.title}</p>
                    {activity.subtitle && (
                      <p className="text-sm text-gray-600">{activity.subtitle}</p>
                    )}
                    <p className="text-xs text-gray-500">
                      {formatDistanceToNow(new Date(activity.timestamp), { 
                        addSuffix: true, 
                        locale: es 
                      })}
                    </p>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {activity.type === 'roadmap' ? 'Roadmap' : 'Reseña'}
                  </Badge>
                </div>
              );
            })
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Plus className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>No hay actividad reciente</p>
              <p className="text-sm">Crea una hoja de ruta o escribe una reseña para comenzar</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivityHistory;
