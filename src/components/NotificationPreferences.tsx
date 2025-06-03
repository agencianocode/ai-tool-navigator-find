
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Bell, Mail } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface NotificationPreferences {
  email_reviews: boolean;
  email_roadmap_updates: boolean;
  email_new_tools: boolean;
  email_weekly_digest: boolean;
}

export const NotificationPreferences = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [preferences, setPreferences] = useState<NotificationPreferences>({
    email_reviews: true,
    email_roadmap_updates: true,
    email_new_tools: false,
    email_weekly_digest: true,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (user) {
      loadPreferences();
    }
  }, [user]);

  const loadPreferences = async () => {
    try {
      const { data, error } = await supabase
        .from('notification_preferences')
        .select('*')
        .eq('user_id', user?.id)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setPreferences({
          email_reviews: data.email_reviews,
          email_roadmap_updates: data.email_roadmap_updates,
          email_new_tools: data.email_new_tools,
          email_weekly_digest: data.email_weekly_digest,
        });
      }
    } catch (error) {
      console.error('Error loading preferences:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const savePreferences = async () => {
    if (!user) return;

    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('notification_preferences')
        .upsert({
          user_id: user.id,
          ...preferences,
          updated_at: new Date().toISOString(),
        });

      if (error) throw error;

      toast({
        title: "Éxito",
        description: "Preferencias guardadas correctamente",
      });
    } catch (error) {
      console.error('Error saving preferences:', error);
      toast({
        title: "Error",
        description: "Error al guardar las preferencias",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handlePreferenceChange = (key: keyof NotificationPreferences, value: boolean) => {
    setPreferences(prev => ({ ...prev, [key]: value }));
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="animate-pulse space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                <div className="h-6 bg-gray-200 rounded w-12"></div>
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
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Preferencias de Notificaciones
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <label className="text-sm font-medium">Nuevas reseñas</label>
              <p className="text-xs text-gray-500">
                Recibe emails cuando alguien escriba una reseña sobre herramientas que has usado
              </p>
            </div>
            <Switch
              checked={preferences.email_reviews}
              onCheckedChange={(value) => handlePreferenceChange('email_reviews', value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <label className="text-sm font-medium">Actualizaciones de hojas de ruta</label>
              <p className="text-xs text-gray-500">
                Notificaciones sobre el progreso de tus hojas de ruta y nuevas recomendaciones
              </p>
            </div>
            <Switch
              checked={preferences.email_roadmap_updates}
              onCheckedChange={(value) => handlePreferenceChange('email_roadmap_updates', value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <label className="text-sm font-medium">Nuevas herramientas</label>
              <p className="text-xs text-gray-500">
                Entérate cuando agreguemos nuevas herramientas IA a nuestra base de datos
              </p>
            </div>
            <Switch
              checked={preferences.email_new_tools}
              onCheckedChange={(value) => handlePreferenceChange('email_new_tools', value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <label className="text-sm font-medium">Resumen semanal</label>
              <p className="text-xs text-gray-500">
                Un email semanal con las mejores herramientas y tendencias en IA
              </p>
            </div>
            <Switch
              checked={preferences.email_weekly_digest}
              onCheckedChange={(value) => handlePreferenceChange('email_weekly_digest', value)}
            />
          </div>
        </div>

        <Button onClick={savePreferences} disabled={isSaving} className="w-full">
          <Mail className="mr-2 h-4 w-4" />
          {isSaving ? "Guardando..." : "Guardar Preferencias"}
        </Button>
      </CardContent>
    </Card>
  );
};
