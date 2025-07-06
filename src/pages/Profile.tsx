
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { User, Bell, Save, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import { SEO } from "@/components/SEO";

const Profile = () => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: "",
    email: user?.email || "",
    bio: "",
    website: ""
  });

  const [notifications, setNotifications] = useState({
    emailRoadmapUpdates: true,
    emailNewTools: false,
    emailWeeklyDigest: true
  });

  useEffect(() => {
    if (user) {
      fetchProfile();
      fetchNotificationPreferences();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching profile:', error);
        return;
      }

      if (data) {
        setProfileData({
          fullName: data.full_name || "",
          email: user?.email || "",
          bio: data.bio || "",
          website: data.website || ""
        });
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchNotificationPreferences = async () => {
    try {
      const { data, error } = await supabase
        .from('notification_preferences')
        .select('*')
        .eq('user_id', user?.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching preferences:', error);
        return;
      }

      if (data) {
        setNotifications({
          emailRoadmapUpdates: data.email_roadmap_updates ?? true,
          emailNewTools: data.email_new_tools ?? false,
          emailWeeklyDigest: data.email_weekly_digest ?? true
        });
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSaveProfile = async () => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user?.id,
          full_name: profileData.fullName,
          bio: profileData.bio,
          website: profileData.website,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;

      toast({
        title: "Perfil actualizado",
        description: "Tus cambios han sido guardados correctamente",
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Error",
        description: "No se pudo actualizar el perfil",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveNotifications = async () => {
    try {
      const { error } = await supabase
        .from('notification_preferences')
        .upsert({
          user_id: user?.id,
          email_roadmap_updates: notifications.emailRoadmapUpdates,
          email_new_tools: notifications.emailNewTools,
          email_weekly_digest: notifications.emailWeeklyDigest,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;

      toast({
        title: "Preferencias guardadas",
        description: "Tus preferencias de notificación han sido actualizadas",
      });
    } catch (error) {
      console.error('Error updating preferences:', error);
      toast({
        title: "Error",
        description: "No se pudieron actualizar las preferencias",
        variant: "destructive"
      });
    }
  };

  if (!user) {
    return <div>Cargando...</div>;
  }

  return (
    <>
      <SEO
        title="Mi Perfil - AI Tool Navigator"
        description="Gestiona tu perfil y preferencias en AI Tool Navigator."
        url="https://ai-tool-navigator.com/profile"
      />
      <Navigation />
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-2">
              <User className="h-8 w-8" />
              Mi Perfil
            </h1>
            <p className="text-gray-600">
              Gestiona tu información personal y preferencias
            </p>
          </div>

          <div className="space-y-6">
            {/* Profile Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Información Personal
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fullName">Nombre completo</Label>
                    <Input
                      id="fullName"
                      value={profileData.fullName}
                      onChange={(e) => setProfileData(prev => ({ ...prev, fullName: e.target.value }))}
                      placeholder="Tu nombre completo"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      disabled
                      className="bg-gray-100"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Input
                      id="bio"
                      value={profileData.bio}
                      onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                      placeholder="Cuéntanos sobre ti"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="website">Sitio web</Label>
                    <Input
                      id="website"
                      value={profileData.website}
                      onChange={(e) => setProfileData(prev => ({ ...prev, website: e.target.value }))}
                      placeholder="https://tusitio.com"
                    />
                  </div>
                </div>
                <Button onClick={handleSaveProfile} disabled={loading} className="w-full md:w-auto">
                  <Save className="mr-2 h-4 w-4" />
                  {loading ? 'Guardando...' : 'Guardar Cambios'}
                </Button>
              </CardContent>
            </Card>

            {/* Notification Preferences */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Preferencias de Notificación
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Actualizaciones de hojas de ruta</p>
                      <p className="text-sm text-gray-600">Recibe emails cuando actualicemos tus hojas de ruta</p>
                    </div>
                    <Switch
                      checked={notifications.emailRoadmapUpdates}
                      onCheckedChange={(checked) => 
                        setNotifications(prev => ({ ...prev, emailRoadmapUpdates: checked }))
                      }
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Nuevas herramientas</p>
                      <p className="text-sm text-gray-600">Notificaciones sobre nuevas herramientas de IA</p>
                    </div>
                    <Switch
                      checked={notifications.emailNewTools}
                      onCheckedChange={(checked) => 
                        setNotifications(prev => ({ ...prev, emailNewTools: checked }))
                      }
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Resumen semanal</p>
                      <p className="text-sm text-gray-600">Recibe un resumen semanal de actividad</p>
                    </div>
                    <Switch
                      checked={notifications.emailWeeklyDigest}
                      onCheckedChange={(checked) => 
                        setNotifications(prev => ({ ...prev, emailWeeklyDigest: checked }))
                      }
                    />
                  </div>
                </div>
                
                <Button onClick={handleSaveNotifications} variant="outline" className="w-full md:w-auto">
                  <Save className="mr-2 h-4 w-4" />
                  Guardar Preferencias
                </Button>
              </CardContent>
            </Card>

            {/* Account Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Acciones de Cuenta</CardTitle>
              </CardHeader>
              <CardContent>
                <Button onClick={signOut} variant="destructive" className="w-full md:w-auto">
                  <LogOut className="mr-2 h-4 w-4" />
                  Cerrar Sesión
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
