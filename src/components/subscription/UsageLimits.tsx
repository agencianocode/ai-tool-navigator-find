
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Crown, AlertTriangle, TrendingUp, FileText, Download, Star, Shield } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";

interface UsageLimitsProps {
  showUpgrade?: boolean;
}

export const UsageLimits = ({ showUpgrade = true }: UsageLimitsProps) => {
  const { user, subscriptionStatus } = useAuth();
  const [usage, setUsage] = useState({
    roadmaps: 0,
    tools_explored: 0,
    budget_plans: 0,
    template_purchases: 0
  });
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      checkAdminStatusAndFetchUsage();
    }
  }, [user, subscriptionStatus]);

  const checkAdminStatusAndFetchUsage = async () => {
    if (!user) return;
    
    console.log('🔍 Checking admin status and usage for user:', user.email);
    console.log('🔍 Current subscription status:', subscriptionStatus);
    
    try {
      setLoading(true);
      
      // Check admin status
      const { data: adminData, error: adminError } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id)
        .eq('role', 'admin')
        .single();
      
      console.log('👑 Admin check result:', { adminData, adminError });
      const userIsAdmin = !!adminData;
      setIsAdmin(userIsAdmin);

      // Fetch usage stats
      const { data: stats } = await supabase
        .from('user_stats')
        .select('total_roadmaps, total_tools_explored')
        .eq('user_id', user.id)
        .single();

      const { data: budgets } = await supabase
        .from('generated_budgets')
        .select('id')
        .eq('user_id', user.id);

      const { data: purchases } = await supabase
        .from('template_purchases')
        .select('id')
        .eq('user_id', user.id);

      setUsage({
        roadmaps: stats?.total_roadmaps || 0,
        tools_explored: stats?.total_tools_explored || 0,
        budget_plans: budgets?.length || 0,
        template_purchases: purchases?.length || 0
      });

      console.log('📊 Final state:', {
        isAdmin: userIsAdmin,
        subscriptionTier: subscriptionStatus.subscription_tier,
        subscribed: subscriptionStatus.subscribed,
        usage
      });

    } catch (error) {
      console.error('❌ Error checking admin status or fetching usage:', error);
    } finally {
      setLoading(false);
    }
  };

  const getLimits = () => {
    // Los admins tienen acceso ilimitado
    if (isAdmin) {
      console.log('🚀 Admin detected - returning unlimited limits');
      return { 
        roadmaps: -1, 
        tools_explored: -1, 
        budget_plans: -1,
        premium_templates: true,
        pdf_export: true,
        advanced_comparisons: true,
        api_access: true,
        white_label: true,
        consultations: true
      };
    }

    // Enterprise users tienen acceso ilimitado
    if (subscriptionStatus.subscription_tier === 'enterprise') {
      console.log('🏢 Enterprise subscription detected - returning unlimited limits');
      return { 
        roadmaps: -1, 
        tools_explored: -1, 
        budget_plans: -1,
        premium_templates: true,
        pdf_export: true,
        advanced_comparisons: true,
        api_access: true,
        white_label: true,
        consultations: true
      };
    }

    if (subscriptionStatus.subscribed) {
      switch (subscriptionStatus.subscription_tier) {
        case 'basic':
          return { 
            roadmaps: 15, 
            tools_explored: 100, 
            budget_plans: 5,
            premium_templates: true,
            pdf_export: true,
            advanced_comparisons: true
          };
        case 'premium':
          return { 
            roadmaps: -1, 
            tools_explored: -1, 
            budget_plans: -1,
            premium_templates: true,
            pdf_export: true,
            advanced_comparisons: true,
            api_access: true
          };
        default:
          return { 
            roadmaps: 3, 
            tools_explored: 20, 
            budget_plans: 1,
            premium_templates: false,
            pdf_export: false,
            advanced_comparisons: false
          };
      }
    }
    return { 
      roadmaps: 3, 
      tools_explored: 20, 
      budget_plans: 1,
      premium_templates: false,
      pdf_export: false,
      advanced_comparisons: false
    };
  };

  const limits = getLimits();
  const isUnlimited = limits.roadmaps === -1;

  const getUsagePercentage = (used: number, limit: number) => {
    if (limit === -1) return 0; // unlimited
    return Math.min((used / limit) * 100, 100);
  };

  const isNearLimit = (used: number, limit: number) => {
    if (limit === -1) return false;
    return used >= limit * 0.8;
  };

  const isAtLimit = (used: number, limit: number) => {
    if (limit === -1) return false;
    return used >= limit;
  };

  const getPlanName = () => {
    if (isAdmin) return "Admin";
    if (subscriptionStatus.subscription_tier === 'enterprise') return "Enterprise";
    if (!subscriptionStatus.subscribed) return "Free";
    return subscriptionStatus.subscription_tier === 'basic' ? 'Pro' : 
           subscriptionStatus.subscription_tier === 'premium' ? 'Premium' :
           'Free';
  };

  const getPlanVariant = () => {
    if (isAdmin || subscriptionStatus.subscription_tier === 'enterprise') return "default";
    if (subscriptionStatus.subscribed) return "secondary";
    return "outline";
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Cargando plan...
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-2">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Plan {getPlanName()}
          <Badge variant={getPlanVariant()} className="ml-auto">
            {isAdmin && <Shield className="h-3 w-3 mr-1" />}
            {getPlanName()}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Roadmaps Usage */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Hojas de Ruta
            </span>
            <span className={isAtLimit(usage.roadmaps, limits.roadmaps) ? "text-red-600" : ""}>
              {usage.roadmaps} / {isUnlimited ? "∞" : limits.roadmaps}
            </span>
          </div>
          {!isUnlimited && (
            <Progress 
              value={getUsagePercentage(usage.roadmaps, limits.roadmaps)} 
              className={`h-2 ${isNearLimit(usage.roadmaps, limits.roadmaps) ? 'bg-orange-100' : ''}`}
            />
          )}
          {isAtLimit(usage.roadmaps, limits.roadmaps) && (
            <div className="flex items-center gap-1 text-sm text-red-600">
              <AlertTriangle className="h-4 w-4" />
              Límite alcanzado
            </div>
          )}
        </div>

        {/* Tools Explored Usage */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="flex items-center gap-2">
              <Star className="h-4 w-4" />
              Herramientas Exploradas
            </span>
            <span className={isAtLimit(usage.tools_explored, limits.tools_explored) ? "text-red-600" : ""}>
              {usage.tools_explored} / {isUnlimited ? "∞" : limits.tools_explored}
            </span>
          </div>
          {!isUnlimited && (
            <Progress 
              value={getUsagePercentage(usage.tools_explored, limits.tools_explored)} 
              className={`h-2 ${isNearLimit(usage.tools_explored, limits.tools_explored) ? 'bg-orange-100' : ''}`}
            />
          )}
        </div>

        {/* Budget Plans Usage */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Planes de Presupuesto</span>
            <span className={isAtLimit(usage.budget_plans, limits.budget_plans) ? "text-red-600" : ""}>
              {usage.budget_plans} / {isUnlimited ? "∞" : limits.budget_plans}
            </span>
          </div>
          {!isUnlimited && (
            <Progress 
              value={getUsagePercentage(usage.budget_plans, limits.budget_plans)} 
              className={`h-2 ${isNearLimit(usage.budget_plans, limits.budget_plans) ? 'bg-orange-100' : ''}`}
            />
          )}
        </div>

        {/* Premium Features */}
        <div className="pt-4 border-t space-y-3">
          <h4 className="font-medium text-sm">Características Premium</h4>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2">
                <Crown className="h-4 w-4" />
                Templates Premium
              </span>
              {limits.premium_templates ? (
                <Badge variant="outline" className="text-green-600">
                  <Crown className="h-3 w-3 mr-1" />
                  Activo
                </Badge>
              ) : (
                <Badge variant="outline" className="text-gray-500">Bloqueado</Badge>
              )}
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Exportar PDF
              </span>
              {limits.pdf_export ? (
                <Badge variant="outline" className="text-green-600">Activo</Badge>
              ) : (
                <Badge variant="outline" className="text-gray-500">Bloqueado</Badge>
              )}
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2">
                <Star className="h-4 w-4" />
                Comparaciones Avanzadas
              </span>
              {limits.advanced_comparisons ? (
                <Badge variant="outline" className="text-green-600">Activo</Badge>
              ) : (
                <Badge variant="outline" className="text-gray-500">Bloqueado</Badge>
              )}
            </div>

            {(isAdmin || subscriptionStatus.subscription_tier === 'enterprise') && (
              <>
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    API Access
                  </span>
                  <Badge variant="outline" className="text-green-600">Activo</Badge>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2">
                    <Crown className="h-4 w-4" />
                    White Label
                  </span>
                  <Badge variant="outline" className="text-green-600">Activo</Badge>
                </div>
              </>
            )}
          </div>
        </div>

        {showUpgrade && !subscriptionStatus.subscribed && !isAdmin && (
          <div className="pt-4 border-t">
            <Button asChild className="w-full">
              <Link to="/subscriptions">
                <Crown className="mr-2 h-4 w-4" />
                Actualizar Plan
              </Link>
            </Button>
          </div>
        )}

        {(subscriptionStatus.subscribed || isAdmin) && (
          <div className="pt-4 border-t">
            <p className="text-xs text-center text-gray-500">
              Templates comprados: {usage.template_purchases}
            </p>
            {(isAdmin || subscriptionStatus.subscription_tier === 'enterprise') && (
              <p className="text-xs text-center text-green-600 font-medium">
                🚀 Acceso ilimitado activado
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
