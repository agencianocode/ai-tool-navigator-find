
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Crown, AlertTriangle, TrendingUp } from "lucide-react";
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
    budget_plans: 0
  });

  useEffect(() => {
    if (user) {
      fetchUsage();
    }
  }, [user]);

  const fetchUsage = async () => {
    if (!user) return;

    try {
      const { data: stats } = await supabase
        .from('user_stats')
        .select('total_roadmaps, total_tools_explored')
        .eq('user_id', user.id)
        .single();

      const { data: budgets } = await supabase
        .from('generated_budgets')
        .select('id')
        .eq('user_id', user.id);

      setUsage({
        roadmaps: stats?.total_roadmaps || 0,
        tools_explored: stats?.total_tools_explored || 0,
        budget_plans: budgets?.length || 0
      });
    } catch (error) {
      console.error('Error fetching usage:', error);
    }
  };

  const getLimits = () => {
    if (subscriptionStatus.subscribed) {
      switch (subscriptionStatus.subscription_tier) {
        case 'basic':
          return { roadmaps: 5, tools_explored: 20, budget_plans: 3 };
        case 'premium':
          return { roadmaps: -1, tools_explored: -1, budget_plans: -1 }; // unlimited
        case 'enterprise':
          return { roadmaps: -1, tools_explored: -1, budget_plans: -1 }; // unlimited
        default:
          return { roadmaps: 2, tools_explored: 10, budget_plans: 1 }; // free
      }
    }
    return { roadmaps: 2, tools_explored: 10, budget_plans: 1 }; // free
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

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Uso del Plan
          {subscriptionStatus.subscribed && (
            <Badge variant="outline" className="ml-auto">
              {subscriptionStatus.subscription_tier}
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Roadmaps Usage */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Hojas de Ruta</span>
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
            <span>Herramientas Exploradas</span>
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

        {showUpgrade && !subscriptionStatus.subscribed && (
          <div className="pt-4 border-t">
            <Button asChild className="w-full">
              <Link to="/subscriptions">
                <Crown className="mr-2 h-4 w-4" />
                Actualizar Plan
              </Link>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
