import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MessageSquare, 
  Users, 
  Calendar, 
  TrendingUp,
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";

export const CommunityWidget = () => {
  // Mock data - replace with real data from your backend
  const communityStats = {
    totalMembers: 2847,
    activeDiscussions: 23,
    upcomingEvents: 2,
    trendingTopic: "IA Generativa"
  };

  const recentActivity = [
    {
      id: 1,
      type: "discussion",
      title: "¿Mejores herramientas para automatización?",
      author: "Carlos M.",
      replies: 8,
      time: "hace 2h"
    },
    {
      id: 2,
      type: "event",
      title: "Webinar: IA en Marketing Digital",
      date: "Mañana 19:00",
      attendees: 156
    },
    {
      id: 3,
      type: "discussion",
      title: "Experiencias con ChatGPT para código",
      author: "Ana L.",
      replies: 12,
      time: "hace 4h"
    }
  ];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Comunidad
          </CardTitle>
          <Link to="/community">
            <Button variant="ghost" size="sm">
              Ver todo <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Community Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">
              {communityStats.totalMembers.toLocaleString()}
            </div>
            <div className="text-sm text-blue-700">Miembros</div>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">
              {communityStats.activeDiscussions}
            </div>
            <div className="text-sm text-green-700">Discusiones</div>
          </div>
        </div>

        {/* Trending Topic */}
        <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-orange-600" />
            <span className="text-sm font-medium">Tema tendencia:</span>
          </div>
          <Badge variant="outline" className="text-orange-700 border-orange-300">
            {communityStats.trendingTopic}
          </Badge>
        </div>

        {/* Recent Activity */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-gray-700">Actividad Reciente</h4>
          {recentActivity.map((activity) => (
            <div key={activity.id} className="flex items-start gap-3 p-2 hover:bg-gray-50 rounded-md cursor-pointer">
              <div className="mt-1">
                {activity.type === 'discussion' ? (
                  <MessageSquare className="h-4 w-4 text-blue-500" />
                ) : (
                  <Calendar className="h-4 w-4 text-green-500" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {activity.title}
                </p>
                {activity.type === 'discussion' ? (
                  <p className="text-xs text-gray-500">
                    por {activity.author} • {activity.replies} respuestas • {activity.time}
                  </p>
                ) : (
                  <p className="text-xs text-gray-500">
                    {activity.date} • {activity.attendees} asistentes
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="flex gap-2">
          <Link to="/community" className="flex-1">
            <Button variant="outline" size="sm" className="w-full">
              <MessageSquare className="h-4 w-4 mr-1" />
              Participar
            </Button>
          </Link>
          <Link to="/community" className="flex-1">
            <Button variant="outline" size="sm" className="w-full">
              <Calendar className="h-4 w-4 mr-1" />
              Eventos
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};