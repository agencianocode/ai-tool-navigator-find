
import { useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface AlertRule {
  id: string;
  name: string;
  metric_type: string;
  condition: 'greater_than' | 'less_than' | 'equals';
  threshold_value: number;
  is_active: boolean;
  notification_type: 'in_app' | 'email' | 'both';
  check_interval: number;
  last_checked?: string;
}

interface MetricValue {
  conversion_rate: number;
  daily_unique_users: number;
  roadmaps_generated: number;
  tool_views: number;
  questionnaire_completions: number;
}

export const AlertsProcessor = () => {
  const { toast } = useToast();
  const intervalRefs = useRef<Record<string, NodeJS.Timeout>>({});

  // Obtener reglas de alerta activas
  const { data: activeRules = [] } = useQuery({
    queryKey: ['active-alert-rules'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('alert_rules')
        .select('*')
        .eq('is_active', true);

      if (error) {
        console.error('Error fetching alert rules:', error);
        return [];
      }
      return (data || []) as AlertRule[];
    },
    refetchInterval: 60000,
  });

  // Función para obtener métricas actuales
  const getCurrentMetrics = async (): Promise<MetricValue> => {
    const now = new Date();
    const last24h = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    // Obtener eventos de las últimas 24 horas
    const { data: events } = await supabase
      .from('analytics_events')
      .select('*')
      .gte('created_at', last24h.toISOString());

    if (!events) return {
      conversion_rate: 0,
      daily_unique_users: 0,
      roadmaps_generated: 0,
      tool_views: 0,
      questionnaire_completions: 0
    };

    const uniqueUsers = new Set(events.filter(e => e.user_id).map(e => e.user_id)).size;
    const toolViews = events.filter(e => e.event_name === 'tool_viewed').length;
    const questionnaireCompletions = events.filter(e => e.event_name === 'questionnaire_completed').length;
    const roadmapGenerations = events.filter(e => e.event_name === 'roadmap_generated').length;

    const conversionRate = questionnaireCompletions > 0 
      ? Math.round((roadmapGenerations / questionnaireCompletions) * 100)
      : 0;

    return {
      conversion_rate: conversionRate,
      daily_unique_users: uniqueUsers,
      roadmaps_generated: roadmapGenerations,
      tool_views: toolViews,
      questionnaire_completions: questionnaireCompletions
    };
  };

  // Función para evaluar una regla de alerta
  const evaluateRule = async (rule: AlertRule) => {
    try {
      const metrics = await getCurrentMetrics();
      const metricValue = metrics[rule.metric_type as keyof MetricValue];
      
      console.log(`Evaluating rule ${rule.name}: ${metricValue} ${rule.condition} ${rule.threshold_value}`);

      let shouldTrigger = false;
      switch (rule.condition) {
        case 'greater_than':
          shouldTrigger = metricValue > rule.threshold_value;
          break;
        case 'less_than':
          shouldTrigger = metricValue < rule.threshold_value;
          break;
        case 'equals':
          shouldTrigger = metricValue === rule.threshold_value;
          break;
      }

      if (shouldTrigger) {
        await triggerAlert(rule, metricValue);
      }

      // Actualizar última verificación
      await supabase
        .from('alert_rules')
        .update({ last_checked: new Date().toISOString() })
        .eq('id', rule.id);

    } catch (error) {
      console.error(`Error evaluating rule ${rule.name}:`, error);
    }
  };

  // Función para disparar una alerta
  const triggerAlert = async (rule: AlertRule, metricValue: number) => {
    try {
      // Verificar si ya existe una alerta activa para esta regla
      const { data: existingAlert } = await supabase
        .from('alert_triggers')
        .select('id')
        .eq('alert_rule_id', rule.id)
        .eq('status', 'active')
        .maybeSingle();

      if (existingAlert) {
        console.log(`Alert already active for rule ${rule.name}`);
        return;
      }

      // Crear nueva alerta
      const { error: insertError } = await supabase
        .from('alert_triggers')
        .insert({
          alert_rule_id: rule.id,
          metric_value: metricValue,
          status: 'active',
          triggered_at: new Date().toISOString()
        });

      if (insertError) throw insertError;

      // Actualizar última activación de la regla
      await supabase
        .from('alert_rules')
        .update({ last_triggered: new Date().toISOString() })
        .eq('id', rule.id);

      // Obtener información del usuario y sus preferencias
      const { data: userData } = await supabase
        .from('profiles')
        .select('full_name')
        .eq('id', rule.user_id)
        .maybeSingle();

      const { data: userAuth } = await supabase.auth.admin.getUserById(rule.user_id);
      const userEmail = userAuth.user?.email;
      const userName = userData?.full_name || userEmail?.split('@')[0] || 'Usuario';

      // Verificar preferencias de notificación
      const { data: preferences } = await supabase
        .from('notification_preferences')
        .select('*')
        .eq('user_id', rule.user_id)
        .maybeSingle();

      const shouldSendEmail = preferences?.alert_notifications !== false && 
                             (rule.notification_type === 'email' || rule.notification_type === 'both');

      const shouldSendPush = preferences?.push_notifications !== false && 
                            preferences?.alert_notifications !== false &&
                            (rule.notification_type === 'in_app' || rule.notification_type === 'both');

      // Mostrar notificación in-app si está habilitada
      if (shouldSendPush) {
        toast({
          title: `⚠️ Alerta: ${rule.name}`,
          description: `Métrica ${rule.metric_type}: ${metricValue}`,
          variant: "destructive",
        });

        // Crear notificación persistente
        await supabase
          .from('notifications')
          .insert({
            user_id: rule.user_id,
            title: `Alerta: ${rule.name}`,
            message: `La métrica ${rule.metric_type} ha alcanzado el valor ${metricValue}`,
            type: 'warning'
          });
      }

      // Enviar email si está habilitado
      if (shouldSendEmail && userEmail) {
        try {
          console.log(`Sending email alert to ${userEmail} for rule ${rule.name}`);
          
          await supabase.functions.invoke('send-alert-email', {
            body: {
              userEmail,
              userName,
              alertName: rule.name,
              alertDescription: rule.description || 'Sin descripción',
              metricValue,
              metricType: rule.metric_type,
              thresholdValue: rule.threshold_value,
              condition: rule.condition
            }
          });

          // Registrar en el historial
          await supabase
            .from('notification_history')
            .insert({
              user_id: rule.user_id,
              notification_type: 'alert',
              channel: 'email',
              title: `Alerta: ${rule.name}`,
              content: `Métrica ${rule.metric_type}: ${metricValue}`,
              status: 'sent',
              sent_at: new Date().toISOString()
            });

        } catch (emailError) {
          console.error(`Error sending email for rule ${rule.name}:`, emailError);
          
          // Registrar error en el historial
          await supabase
            .from('notification_history')
            .insert({
              user_id: rule.user_id,
              notification_type: 'alert',
              channel: 'email',
              title: `Alerta: ${rule.name}`,
              content: `Métrica ${rule.metric_type}: ${metricValue}`,
              status: 'failed',
              error_message: emailError.message
            });
        }
      }

      console.log(`Alert triggered for rule ${rule.name}: ${metricValue}`);

    } catch (error) {
      console.error(`Error triggering alert for rule ${rule.name}:`, error);
    }
  };

  // Configurar intervalos para cada regla activa
  useEffect(() => {
    // Limpiar intervalos existentes
    Object.values(intervalRefs.current).forEach(interval => {
      clearInterval(interval);
    });
    intervalRefs.current = {};

    // Crear nuevos intervalos para reglas activas
    activeRules.forEach(rule => {
      const intervalMs = rule.check_interval * 60 * 1000;
      
      intervalRefs.current[rule.id] = setInterval(() => {
        evaluateRule(rule);
      }, intervalMs);

      // Evaluar inmediatamente también
      evaluateRule(rule);
    });

    return () => {
      Object.values(intervalRefs.current).forEach(interval => {
        clearInterval(interval);
      });
    };
  }, [activeRules]);

  return null;
};
