
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  Shield, 
  CreditCard,
  Download,
  Trash2,
  Save
} from "lucide-react";
import { NotificationPreferences } from "@/components/NotificationPreferences";
import { PushNotificationManager } from "@/components/notifications/PushNotificationManager";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [profileData, setProfileData] = useState({
    fullName: "",
    email: user?.email || "",
    company: "",
    website: ""
  });

  const [notifications, setNotifications] = useState({
    emailReviews: true,
    emailRoadmapUpdates: true,
    emailNewTools: false,
    emailWeeklyDigest: true,
    pushNotifications: true
  });

  const [privacy, setPrivacy] = useState({
    profilePublic: false,
    showActivity: true,
    dataCollection: true
  });

  const handleSaveProfile = () => {
    toast({
      title: "Perfil actualizado",
      description: "Tus cambios han sido guardados correctamente",
    });
  };

  const handleSaveNotifications = () => {
    toast({
      title: "Preferencias guardadas",
      description: "Tus preferencias de notificación han sido actualizadas",
    });
  };

  const handleExportData = () => {
    toast({
      title: "Exportación iniciada",
      description: "Te enviaremos un email con tus datos en breve",
    });
  };

  const handleDeleteAccount = () => {
    toast({
      title: "Eliminación programada",
      description: "Tu cuenta será eliminada en 30 días. Puedes cancelar esta acción en cualquier momento",
      variant: "destructive",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-2">
            <SettingsIcon className="h-8 w-8" />
            Configuración
          </h1>
          <p className="text-gray-600">
            Gestiona tu cuenta y personaliza tu experiencia
          </p>
        </div>

        <div className="space-y-6">
          {/* Profile Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Información del Perfil
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
                    onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="tu@email.com"
                  />
                </div>
                <div>
                  <Label htmlFor="company">Empresa (opcional)</Label>
                  <Input
                    id="company"
                    value={profileData.company}
                    onChange={(e) => setProfileData(prev => ({ ...prev, company: e.target.value }))}
                    placeholder="Nombre de tu empresa"
                  />
                </div>
                <div>
                  <Label htmlFor="website">Sitio web (opcional)</Label>
                  <Input
                    id="website"
                    value={profileData.website}
                    onChange={(e) => setProfileData(prev => ({ ...prev, website: e.target.value }))}
                    placeholder="https://tusitio.com"
                  />
                </div>
              </div>
              <Button onClick={handleSaveProfile} className="w-full md:w-auto">
                <Save className="mr-2 h-4 w-4" />
                Guardar Cambios
              </Button>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <NotificationPreferences />
          <PushNotificationManager />

          {/* Privacy Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Privacidad y Seguridad
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Perfil público</p>
                    <p className="text-sm text-gray-600">Permite que otros usuarios vean tu perfil</p>
                  </div>
                  <Switch
                    checked={privacy.profilePublic}
                    onCheckedChange={(checked) => 
                      setPrivacy(prev => ({ ...prev, profilePublic: checked }))
                    }
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Mostrar actividad</p>
                    <p className="text-sm text-gray-600">Mostrar tu actividad reciente en tu perfil</p>
                  </div>
                  <Switch
                    checked={privacy.showActivity}
                    onCheckedChange={(checked) => 
                      setPrivacy(prev => ({ ...prev, showActivity: checked }))
                    }
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Recopilación de datos</p>
                    <p className="text-sm text-gray-600">Permitir recopilación de datos para mejorar el servicio</p>
                  </div>
                  <Switch
                    checked={privacy.dataCollection}
                    onCheckedChange={(checked) => 
                      setPrivacy(prev => ({ ...prev, dataCollection: checked }))
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Account Management */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Gestión de Cuenta
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                <div>
                  <p className="font-medium">Plan actual</p>
                  <p className="text-sm text-gray-600">Plan Gratuito</p>
                </div>
                <Badge variant="secondary">Gratis</Badge>
              </div>
              
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Actualizar Plan
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={handleExportData}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Exportar Mis Datos
                </Button>
                
                <Button 
                  variant="destructive" 
                  className="w-full justify-start"
                  onClick={handleDeleteAccount}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Eliminar Cuenta
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Settings;
