
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, Smartphone, Bell, RefreshCw, Calendar, AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { format } from "date-fns";
import { es } from "date-fns/locale";

interface NotificationHistoryItem {
  id: string;
  notification_type: string;
  channel: string;
  title: string;
  content: string;
  status: string;
  error_message?: string;
  sent_at?: string;
  delivered_at?: string;
  created_at: string;
}

export const NotificationHistory = () => {
  const { user } = useAuth();

  const { data: notifications = [], refetch, isLoading } = useQuery({
    queryKey: ['notification-history', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('notification_history')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) throw error;
      return (data || []) as NotificationHistoryItem[];
    },
    enabled: !!user,
  });

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: { variant: "secondary" as const, text: "Pendiente" },
      sent: { variant: "default" as const, text: "Enviado" },
      delivered: { variant: "default" as const, text: "Entregado" },
      failed: { variant: "destructive" as const, text: "Fallido" }
    };
    
    const config = variants[status as keyof typeof variants] || variants.pending;
    return <Badge variant={config.variant}>{config.text}</Badge>;
  };

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case 'email': return <Mail className="h-4 w-4" />;
      case 'push': return <Smartphone className="h-4 w-4" />;
      case 'in_app': return <Bell className="h-4 w-4" />;
      default: return <Bell className="h-4 w-4" />;
    }
  };

  const getChannelName = (channel: string) => {
    const names = {
      email: 'Email',
      push: 'Push',
      in_app: 'En App'
    };
    return names[channel as keyof typeof names] || channel;
  };

  const filterByChannel = (channel: string) => {
    return notifications.filter(n => n.channel === channel);
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="animate-pulse space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between p-4 border rounded">
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-48"></div>
                  <div className="h-3 bg-gray-200 rounded w-32"></div>
                </div>
                <div className="h-6 bg-gray-200 rounded w-16"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Historial de Notificaciones
          </CardTitle>
          <Button 
            onClick={() => refetch()} 
            variant="outline" 
            size="sm"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Actualizar
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList className="grid grid-cols-4 w-full">
            <TabsTrigger value="all">Todas ({notifications.length})</TabsTrigger>
            <TabsTrigger value="email">
              Email ({filterByChannel('email').length})
            </TabsTrigger>
            <TabsTrigger value="push">
              Push ({filterByChannel('push').length})
            </TabsTrigger>
            <TabsTrigger value="in_app">
              En App ({filterByChannel('in_app').length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            {notifications.length > 0 ? (
              <div className="space-y-3">
                {notifications.map((notification) => (
                  <div 
                    key={notification.id} 
                    className="flex items-start justify-between p-4 border rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex items-start gap-3">
                      {getChannelIcon(notification.channel)}
                      <div className="space-y-1">
                        <h4 className="font-medium text-sm">{notification.title}</h4>
                        <p className="text-sm text-gray-600">{notification.content}</p>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <Calendar className="h-3 w-3" />
                          {format(new Date(notification.created_at), "dd/MM/yyyy HH:mm", { locale: es })}
                          <span>•</span>
                          <span>{getChannelName(notification.channel)}</span>
                        </div>
                        {notification.error_message && (
                          <div className="flex items-center gap-1 text-xs text-red-600">
                            <AlertCircle className="h-3 w-3" />
                            {notification.error_message}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      {getStatusBadge(notification.status)}
                      {notification.sent_at && (
                        <span className="text-xs text-gray-500">
                          Enviado: {format(new Date(notification.sent_at), "HH:mm", { locale: es })}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Bell className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Sin notificaciones
                </h3>
                <p className="text-gray-500">
                  No hay notificaciones en tu historial aún
                </p>
              </div>
            )}
          </TabsContent>

          {['email', 'push', 'in_app'].map((channel) => (
            <TabsContent key={channel} value={channel}>
              {filterByChannel(channel).length > 0 ? (
                <div className="space-y-3">
                  {filterByChannel(channel).map((notification) => (
                    <div 
                      key={notification.id} 
                      className="flex items-start justify-between p-4 border rounded-lg hover:bg-gray-50"
                    >
                      <div className="space-y-1">
                        <h4 className="font-medium text-sm">{notification.title}</h4>
                        <p className="text-sm text-gray-600">{notification.content}</p>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <Calendar className="h-3 w-3" />
                          {format(new Date(notification.created_at), "dd/MM/yyyy HH:mm", { locale: es })}
                        </div>
                        {notification.error_message && (
                          <div className="flex items-center gap-1 text-xs text-red-600">
                            <AlertCircle className="h-3 w-3" />
                            {notification.error_message}
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        {getStatusBadge(notification.status)}
                        {notification.sent_at && (
                          <span className="text-xs text-gray-500">
                            {format(new Date(notification.sent_at), "HH:mm", { locale: es })}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  {getChannelIcon(channel)}
                  <h3 className="text-lg font-medium text-gray-900 mb-2 mt-4">
                    Sin notificaciones por {getChannelName(channel)}
                  </h3>
                  <p className="text-gray-500">
                    No hay notificaciones de este tipo aún
                  </p>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};
