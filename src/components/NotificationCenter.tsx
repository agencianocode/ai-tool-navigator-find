
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, BellOff, Check, X, AlertTriangle, Info, CheckCircle, AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  created_at: string;
  action_url?: string;
}

interface AlertNotification {
  id: string;
  alert_rule_id: string;
  metric_value: number;
  triggered_at: string;
  status: 'active' | 'resolved';
  alert_rules: {
    name: string;
    description: string;
    metric_type: string;
  };
}

export const NotificationCenter = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");

  // Notificaciones generales
  const { data: notifications = [], refetch: refetchNotifications } = useQuery({
    queryKey: ['notifications', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(20);
      
      if (error) {
        console.error('Error fetching notifications:', error);
        return [];
      }
      
      return data as Notification[];
    },
    enabled: !!user,
  });

  // Notificaciones de alertas
  const { data: alertNotifications = [], refetch: refetchAlerts } = useQuery({
    queryKey: ['alert-notifications'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('alert_triggers' as any)
        .select(`
          *,
          alert_rules!inner (name, description, metric_type)
        `)
        .eq('status', 'active')
        .order('triggered_at', { ascending: false })
        .limit(10);

      if (error) {
        console.error('Error fetching alert notifications:', error);
        return [];
      }
      
      return data as AlertNotification[];
    },
    refetchInterval: 30000,
  });

  // Notificaciones del sistema
  const { data: systemNotifications = [] } = useQuery({
    queryKey: ['system-notifications'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .is('user_id', null)
        .order('created_at', { ascending: false })
        .limit(10);
      
      if (error) {
        console.error('Error fetching system notifications:', error);
        return [];
      }
      
      return data as Notification[];
    },
    refetchInterval: 60000,
  });

  const allNotifications = [...notifications, ...systemNotifications];
  const unreadCount = allNotifications.filter(n => !n.read).length + alertNotifications.length;

  const markAsRead = async (notificationId: string) => {
    try {
      const { error } = await supabase
        .from('notifications')
        .update({ read: true })
        .eq('id', notificationId)
        .eq('user_id', user?.id);

      if (error) throw error;
      refetchNotifications();
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const markAllAsRead = async () => {
    try {
      const { error } = await supabase
        .from('notifications')
        .update({ read: true })
        .eq('user_id', user?.id)
        .eq('read', false);

      if (error) throw error;
      refetchNotifications();
      toast({
        title: "Notificaciones marcadas",
        description: "Todas las notificaciones han sido marcadas como leídas",
      });
    } catch (error) {
      console.error('Error marking all as read:', error);
    }
  };

  const deleteNotification = async (notificationId: string) => {
    try {
      const { error } = await supabase
        .from('notifications')
        .delete()
        .eq('id', notificationId)
        .eq('user_id', user?.id);

      if (error) throw error;
      refetchNotifications();
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };

  const resolveAlert = async (alertId: string) => {
    try {
      const { error } = await supabase
        .from('alert_triggers' as any)
        .update({ 
          status: 'resolved',
          resolved_at: new Date().toISOString()
        })
        .eq('id', alertId);

      if (error) throw error;
      refetchAlerts();
      toast({
        title: "Alerta resuelta",
        description: "La alerta ha sido marcada como resuelta",
      });
    } catch (error) {
      console.error('Error resolving alert:', error);
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'error': return <AlertCircle className="h-4 w-4 text-red-500" />;
      default: return <Info className="h-4 w-4 text-blue-500" />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'success': return 'border-l-green-500';
      case 'warning': return 'border-l-yellow-500';
      case 'error': return 'border-l-red-500';
      default: return 'border-l-blue-500';
    }
  };

  if (!user) return null;

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              {unreadCount > 9 ? '9+' : unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96 p-0" align="end">
        <Card className="border-0 shadow-none">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Notificaciones</CardTitle>
              {unreadCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={markAllAsRead}
                  className="text-xs"
                >
                  Marcar todas como leídas
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3 mx-4 mb-4">
                <TabsTrigger value="all" className="text-xs">
                  Todas
                  {unreadCount > 0 && (
                    <Badge variant="secondary" className="ml-1 h-4 w-4 p-0 text-xs">
                      {unreadCount}
                    </Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger value="alerts" className="text-xs">
                  Alertas
                  {alertNotifications.length > 0 && (
                    <Badge variant="destructive" className="ml-1 h-4 w-4 p-0 text-xs">
                      {alertNotifications.length}
                    </Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger value="system" className="text-xs">Sistema</TabsTrigger>
              </TabsList>

              <ScrollArea className="h-96">
                <TabsContent value="all" className="m-0">
                  {allNotifications.length > 0 ? (
                    <div className="space-y-1">
                      {allNotifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-4 border-l-4 ${getNotificationColor(notification.type)} ${
                            !notification.read ? 'bg-blue-50' : 'bg-gray-50'
                          } hover:bg-gray-100 transition-colors`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                {getNotificationIcon(notification.type)}
                                <h4 className="font-medium text-sm truncate">{notification.title}</h4>
                                {!notification.read && (
                                  <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />
                                )}
                              </div>
                              <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
                              <p className="text-xs text-gray-500">
                                {formatDistanceToNow(new Date(notification.created_at), { 
                                  addSuffix: true, 
                                  locale: es 
                                })}
                              </p>
                            </div>
                            <div className="flex gap-1">
                              {!notification.read && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => markAsRead(notification.id)}
                                  className="h-6 w-6 p-0"
                                >
                                  <Check className="h-3 w-3" />
                                </Button>
                              )}
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => deleteNotification(notification.id)}
                                className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-8 text-center text-gray-500">
                      <BellOff className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">No tienes notificaciones</p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="alerts" className="m-0">
                  {alertNotifications.length > 0 ? (
                    <div className="space-y-1">
                      {alertNotifications.map((alert) => (
                        <div
                          key={alert.id}
                          className="p-4 border-l-4 border-l-red-500 bg-red-50 hover:bg-red-100 transition-colors"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <AlertTriangle className="h-4 w-4 text-red-500" />
                                <h4 className="font-medium text-sm">{alert.alert_rules.name}</h4>
                              </div>
                              <p className="text-sm text-gray-600 mb-1">{alert.alert_rules.description}</p>
                              <p className="text-xs text-gray-500 mb-2">
                                Valor: {alert.metric_value} | {alert.alert_rules.metric_type}
                              </p>
                              <p className="text-xs text-gray-500">
                                {formatDistanceToNow(new Date(alert.triggered_at), { 
                                  addSuffix: true, 
                                  locale: es 
                                })}
                              </p>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => resolveAlert(alert.id)}
                              className="h-6 px-2 text-xs bg-white hover:bg-gray-50"
                            >
                              Resolver
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-8 text-center text-gray-500">
                      <CheckCircle className="h-8 w-8 mx-auto mb-2 text-green-500 opacity-50" />
                      <p className="text-sm">No hay alertas activas</p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="system" className="m-0">
                  {systemNotifications.length > 0 ? (
                    <div className="space-y-1">
                      {systemNotifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-4 border-l-4 ${getNotificationColor(notification.type)} bg-gray-50 hover:bg-gray-100 transition-colors`}
                        >
                          <div className="flex items-start gap-2">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                {getNotificationIcon(notification.type)}
                                <h4 className="font-medium text-sm">{notification.title}</h4>
                              </div>
                              <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
                              <p className="text-xs text-gray-500">
                                {formatDistanceToNow(new Date(notification.created_at), { 
                                  addSuffix: true, 
                                  locale: es 
                                })}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-8 text-center text-gray-500">
                      <Info className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">No hay notificaciones del sistema</p>
                    </div>
                  )}
                </TabsContent>
              </ScrollArea>
            </Tabs>
          </CardContent>
        </Card>
      </PopoverContent>
    </Popover>
  );
};
