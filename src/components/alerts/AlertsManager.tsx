
import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertTriangle, Bell, Settings, TrendingDown, Users, Target, Zap } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface AlertRule {
  id: string;
  name: string;
  description: string;
  metric_type: string;
  condition: 'greater_than' | 'less_than' | 'equals';
  threshold_value: number;
  is_active: boolean;
  notification_type: 'in_app' | 'email' | 'both';
  check_interval: number; // en minutos
  last_triggered?: string;
}

interface AlertTrigger {
  id: string;
  alert_rule_id: string;
  metric_value: number;
  triggered_at: string;
  resolved_at?: string;
  status: 'active' | 'resolved';
}

export const AlertsManager = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [newRule, setNewRule] = useState<Partial<AlertRule>>({
    name: '',
    metric_type: 'conversion_rate',
    condition: 'less_than',
    threshold_value: 0,
    is_active: true,
    notification_type: 'both',
    check_interval: 60
  });

  // Predefined alert templates
  const alertTemplates = [
    {
      name: "Baja tasa de conversión",
      description: "Alerta cuando la tasa de conversión cae por debajo del umbral",
      metric_type: "conversion_rate",
      condition: "less_than" as const,
      threshold_value: 15,
      icon: TrendingDown
    },
    {
      name: "Pocos usuarios activos",
      description: "Alerta cuando los usuarios únicos diarios son bajos",
      metric_type: "daily_unique_users",
      condition: "less_than" as const,
      threshold_value: 10,
      icon: Users
    },
    {
      name: "Roadmaps generados altos",
      description: "Notificación cuando se superan los roadmaps esperados",
      metric_type: "roadmaps_generated",
      condition: "greater_than" as const,
      threshold_value: 50,
      icon: Target
    },
    {
      name: "Alto uso de herramientas",
      description: "Alerta cuando las vistas de herramientas son altas",
      metric_type: "tool_views",
      condition: "greater_than" as const,
      threshold_value: 100,
      icon: Zap
    }
  ];

  // Query para obtener reglas de alerta existentes
  const { data: alertRules = [], refetch: refetchRules } = useQuery({
    queryKey: ['alert-rules', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('alert_rules')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as AlertRule[];
    },
    enabled: !!user,
  });

  // Query para obtener alertas activas
  const { data: activeAlerts = [] } = useQuery({
    queryKey: ['active-alerts', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('alert_triggers')
        .select(`
          *,
          alert_rules!inner (name, description, metric_type)
        `)
        .eq('alert_rules.user_id', user.id)
        .eq('status', 'active')
        .order('triggered_at', { ascending: false });

      if (error) throw error;
      return data as AlertTrigger[];
    },
    enabled: !!user,
    refetchInterval: 30000, // Actualizar cada 30 segundos
  });

  // Mutación para crear regla de alerta
  const createAlertRule = useMutation({
    mutationFn: async (rule: Partial<AlertRule>) => {
      if (!user) throw new Error('Usuario no autenticado');

      const { error } = await supabase
        .from('alert_rules')
        .insert({
          ...rule,
          user_id: user.id,
        });

      if (error) throw error;
    },
    onSuccess: () => {
      toast({
        title: "Regla creada",
        description: "La regla de alerta se ha creado correctamente",
      });
      refetchRules();
      setNewRule({
        name: '',
        metric_type: 'conversion_rate',
        condition: 'less_than',
        threshold_value: 0,
        is_active: true,
        notification_type: 'both',
        check_interval: 60
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Error al crear la regla de alerta",
        variant: "destructive",
      });
    },
  });

  // Mutación para actualizar regla
  const updateAlertRule = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<AlertRule> }) => {
      const { error } = await supabase
        .from('alert_rules')
        .update(updates)
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      refetchRules();
      toast({
        title: "Regla actualizada",
        description: "La regla de alerta se ha actualizado correctamente",
      });
    },
  });

  // Mutación para resolver alerta
  const resolveAlert = useMutation({
    mutationFn: async (alertId: string) => {
      const { error } = await supabase
        .from('alert_triggers')
        .update({ 
          status: 'resolved',
          resolved_at: new Date().toISOString()
        })
        .eq('id', alertId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['active-alerts'] });
      toast({
        title: "Alerta resuelta",
        description: "La alerta ha sido marcada como resuelta",
      });
    },
  });

  const handleCreateRule = (template?: typeof alertTemplates[0]) => {
    const ruleData = template ? {
      name: template.name,
      description: template.description,
      metric_type: template.metric_type,
      condition: template.condition,
      threshold_value: template.threshold_value,
      is_active: true,
      notification_type: 'both' as const,
      check_interval: 60
    } : newRule;

    createAlertRule.mutate(ruleData);
  };

  const getConditionText = (condition: string) => {
    switch (condition) {
      case 'greater_than': return 'mayor que';
      case 'less_than': return 'menor que';
      case 'equals': return 'igual a';
      default: return condition;
    }
  };

  const getMetricName = (metricType: string) => {
    const metrics: Record<string, string> = {
      'conversion_rate': 'Tasa de conversión',
      'daily_unique_users': 'Usuarios únicos diarios',
      'roadmaps_generated': 'Roadmaps generados',
      'tool_views': 'Vistas de herramientas',
      'questionnaire_completions': 'Cuestionarios completados'
    };
    return metrics[metricType] || metricType;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Sistema de Alertas</h2>
          <p className="text-gray-600">
            Configura alertas automáticas basadas en métricas y comportamiento de usuarios
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={activeAlerts.length > 0 ? "destructive" : "secondary"}>
            {activeAlerts.length} alertas activas
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="active" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="active">Alertas Activas</TabsTrigger>
          <TabsTrigger value="rules">Reglas de Alerta</TabsTrigger>
          <TabsTrigger value="templates">Plantillas</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          {activeAlerts.length > 0 ? (
            <div className="space-y-4">
              {activeAlerts.map((alert) => (
                <Card key={alert.id} className="border-l-4 border-l-red-500">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-red-500" />
                        <CardTitle className="text-lg">
                          {(alert as any).alert_rules.name}
                        </CardTitle>
                      </div>
                      <Button 
                        onClick={() => resolveAlert.mutate(alert.id)}
                        size="sm"
                        variant="outline"
                      >
                        Resolver
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-2">
                      {(alert as any).alert_rules.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>Valor: {alert.metric_value}</span>
                      <span>
                        Disparada: {new Date(alert.triggered_at).toLocaleString('es-ES')}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="text-center py-8">
                <Bell className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No hay alertas activas
                </h3>
                <p className="text-gray-500">
                  Todas las métricas están dentro de los rangos normales
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="rules" className="space-y-6">
          {/* Formulario para crear nueva regla */}
          <Card>
            <CardHeader>
              <CardTitle>Crear Nueva Regla de Alerta</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="rule-name">Nombre de la regla</Label>
                  <Input
                    id="rule-name"
                    value={newRule.name}
                    onChange={(e) => setNewRule(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Ej: Baja conversión de cuestionarios"
                  />
                </div>
                <div>
                  <Label htmlFor="metric-type">Métrica</Label>
                  <select
                    id="metric-type"
                    className="w-full p-2 border rounded-md"
                    value={newRule.metric_type}
                    onChange={(e) => setNewRule(prev => ({ ...prev, metric_type: e.target.value }))}
                  >
                    <option value="conversion_rate">Tasa de conversión</option>
                    <option value="daily_unique_users">Usuarios únicos diarios</option>
                    <option value="roadmaps_generated">Roadmaps generados</option>
                    <option value="tool_views">Vistas de herramientas</option>
                    <option value="questionnaire_completions">Cuestionarios completados</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="condition">Condición</Label>
                  <select
                    id="condition"
                    className="w-full p-2 border rounded-md"
                    value={newRule.condition}
                    onChange={(e) => setNewRule(prev => ({ ...prev, condition: e.target.value as any }))}
                  >
                    <option value="less_than">Menor que</option>
                    <option value="greater_than">Mayor que</option>
                    <option value="equals">Igual a</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="threshold">Valor umbral</Label>
                  <Input
                    id="threshold"
                    type="number"
                    value={newRule.threshold_value}
                    onChange={(e) => setNewRule(prev => ({ ...prev, threshold_value: Number(e.target.value) }))}
                    placeholder="0"
                  />
                </div>
              </div>
              <Button 
                onClick={() => handleCreateRule()}
                disabled={!newRule.name || !newRule.threshold_value}
                className="w-full"
              >
                Crear Regla
              </Button>
            </CardContent>
          </Card>

          {/* Lista de reglas existentes */}
          <div className="space-y-4">
            {alertRules.map((rule) => (
              <Card key={rule.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{rule.name}</CardTitle>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={rule.is_active}
                        onCheckedChange={(checked) => 
                          updateAlertRule.mutate({ 
                            id: rule.id, 
                            updates: { is_active: checked } 
                          })
                        }
                      />
                      <span className="text-sm text-gray-500">
                        {rule.is_active ? 'Activa' : 'Inactiva'}
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-2">{rule.description}</p>
                  <div className="text-sm text-gray-500">
                    <span className="font-medium">{getMetricName(rule.metric_type)}</span>
                    {' '}{getConditionText(rule.condition)}{' '}
                    <span className="font-medium">{rule.threshold_value}</span>
                  </div>
                  {rule.last_triggered && (
                    <p className="text-xs text-gray-400 mt-2">
                      Última activación: {new Date(rule.last_triggered).toLocaleString('es-ES')}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {alertTemplates.map((template, index) => {
              const IconComponent = template.icon;
              return (
                <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <IconComponent className="h-8 w-8 text-blue-600" />
                      <div>
                        <CardTitle className="text-lg">{template.name}</CardTitle>
                        <p className="text-sm text-gray-500">{template.description}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-gray-600">
                        {getMetricName(template.metric_type)} {getConditionText(template.condition)} {template.threshold_value}
                      </div>
                      <Button 
                        onClick={() => handleCreateRule(template)}
                        size="sm"
                      >
                        Usar Plantilla
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
