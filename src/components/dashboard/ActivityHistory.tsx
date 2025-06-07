
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, FileText, Star, Plus, CheckCircle, Search, Eye } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";
import { Link } from "react-router-dom";

const ActivityHistory = () => {
  const { user } = useAuth();

  const { data: activities = [] } = useQuery({
    queryKey: ['activity-history', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      console.log('Fetching activities for user:', user.id);
      
      // Fetch user activities from the new table
      const { data: userActivities, error: activitiesError } = await supabase
        .from('user_activities')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(20);

      if (activitiesError) {
        console.error('Error fetching user activities:', activitiesError);
      }

      // Fetch legacy roadmaps for backward compatibility
      const { data: roadmaps, error: roadmapsError } = await supabase
        .from('roadmaps')
        .select('id, title, created_at, updated_at')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false })
        .limit(10);

      if (roadmapsError) {
        console.error('Error fetching roadmaps:', roadmapsError);
      }

      // Fetch reviews
      const { data: reviews, error: reviewsError } = await supabase
        .from('tool_reviews')
        .select('id, tool_name, rating, created_at')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(10);

      if (reviewsError) {
        console.error('Error fetching reviews:', reviewsError);
      }

      const activities = [];
      
      // Add user activities
      userActivities?.forEach(activity => {
        let icon, color, subtitle;
        
        switch (activity.activity_type) {
          case 'questionnaire_completed':
            icon = CheckCircle;
            color = 'bg-green-500';
            // Type-safe access to metadata
            const metadata = activity.metadata as any;
            subtitle = metadata?.tools_count ? 
              `${metadata.tools_count} herramientas recomendadas` : '';
            break;
          case 'roadmap_created':
            icon = FileText;
            color = 'bg-blue-500';
            break;
          default:
            icon = Search;
            color = 'bg-gray-500';
        }

        activities.push({
          id: `activity-${activity.id}`,
          type: activity.activity_type,
          title: activity.activity_title,
          subtitle: subtitle || activity.activity_description,
          timestamp: activity.created_at,
          icon,
          color,
          relatedId: activity.related_id
        });
      });

      // Add legacy roadmap activities (for backward compatibility)
      roadmaps?.forEach(roadmap => {
        // Only add if not already included from user_activities
        const alreadyExists = activities.some(a => a.relatedId === roadmap.id);
        if (!alreadyExists) {
          activities.push({
            id: `roadmap-${roadmap.id}`,
            type: 'roadmap',
            title: `Hoja de ruta: ${roadmap.title}`,
            timestamp: roadmap.updated_at,
            icon: FileText,
            color: 'bg-blue-500',
            relatedId: roadmap.id
          });
        }
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
      const sortedActivities = activities.sort((a, b) => 
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );
      
      console.log('Final activities:', sortedActivities);
      return sortedActivities;
    },
    enabled: !!user,
  });

  const getActivityBadgeText = (type: string) => {
    switch (type) {
      case 'questionnaire_completed':
        return 'Cuestionario';
      case 'roadmap_created':
      case 'roadmap':
        return 'Roadmap';
      case 'review':
        return 'Reseña';
      default:
        return 'Actividad';
    }
  };

  const renderActivityAction = (activity: any) => {
    if (activity.type === 'roadmap' || activity.type === 'roadmap_created' || activity.type === 'questionnaire_completed') {
      if (activity.relatedId) {
        return (
          <Link to={`/roadmap?id=${activity.relatedId}`}>
            <Badge variant="outline" className="cursor-pointer hover:bg-blue-50 flex items-center gap-1">
              <Eye className="h-3 w-3" />
              Ver
            </Badge>
          </Link>
        );
      }
    }
    return null;
  };

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
                  <div className="flex items-center gap-2">
                    {renderActivityAction(activity)}
                    <Badge variant="secondary" className="text-xs">
                      {getActivityBadgeText(activity.type)}
                    </Badge>
                  </div>
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
