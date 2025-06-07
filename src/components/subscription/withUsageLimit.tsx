
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Crown } from "lucide-react";
import { Link } from "react-router-dom";

type FeatureType = 'roadmaps' | 'tools_explored' | 'budget_plans';

interface WithUsageLimitProps {
  feature: FeatureType;
  children: React.ReactNode;
  onLimitReached?: () => void;
}

export const withUsageLimit = (WrappedComponent: React.ComponentType<any>) => {
  return (props: any) => {
    const { user, subscriptionStatus, isAdmin } = useAuth();
    const [showLimitDialog, setShowLimitDialog] = useState(false);
    const [currentUsage, setCurrentUsage] = useState(0);
    const [limit, setLimit] = useState(0);

    const checkUsageLimit = async (feature: FeatureType) => {
      if (!user) return false;

      // Los admins tienen acceso ilimitado
      if (isAdmin) {
        console.log('Admin user - unlimited access granted');
        return true;
      }

      // Enterprise users tienen acceso ilimitado
      if (subscriptionStatus.subscription_tier === 'enterprise') {
        console.log('Enterprise user - unlimited access granted');
        return true;
      }

      const limits = getLimitsForTier(subscriptionStatus.subscription_tier);
      const featureLimit = limits[feature];
      
      console.log('Usage limit check:', { 
        feature, 
        limit: featureLimit, 
        tier: subscriptionStatus.subscription_tier,
        subscribed: subscriptionStatus.subscribed 
      });
      
      if (featureLimit === -1) return true; // unlimited

      const usage = await getCurrentUsage(feature);
      
      if (usage >= featureLimit) {
        setCurrentUsage(usage);
        setLimit(featureLimit);
        setShowLimitDialog(true);
        return false;
      }
      
      return true;
    };

    const getLimitsForTier = (tier: string | null) => {
      switch (tier) {
        case 'basic':
          return { roadmaps: 15, tools_explored: 100, budget_plans: 5 };
        case 'premium':
        case 'enterprise':
          return { roadmaps: -1, tools_explored: -1, budget_plans: -1 };
        default:
          return { roadmaps: 3, tools_explored: 20, budget_plans: 1 };
      }
    };

    const getCurrentUsage = async (feature: FeatureType) => {
      switch (feature) {
        case 'roadmaps':
          const { data: stats } = await supabase
            .from('user_stats')
            .select('total_roadmaps')
            .eq('user_id', user?.id)
            .single();
          return stats?.total_roadmaps || 0;
        
        case 'budget_plans':
          const { data: budgets } = await supabase
            .from('generated_budgets')
            .select('id')
            .eq('user_id', user?.id);
          return budgets?.length || 0;
        
        default:
          return 0;
      }
    };

    return (
      <>
        <WrappedComponent {...props} checkUsageLimit={checkUsageLimit} isAdmin={isAdmin} />
        <AlertDialog open={showLimitDialog} onOpenChange={setShowLimitDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Límite de Uso Alcanzado</AlertDialogTitle>
              <AlertDialogDescription>
                Has alcanzado el límite de tu plan actual ({currentUsage}/{limit}). 
                Actualiza tu plan para continuar usando esta funcionalidad.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction onClick={() => setShowLimitDialog(false)}>
                Cerrar
              </AlertDialogAction>
              <Button asChild>
                <Link to="/subscriptions">
                  <Crown className="mr-2 h-4 w-4" />
                  Actualizar Plan
                </Link>
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </>
    );
  };
};
