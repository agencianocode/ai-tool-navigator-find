
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Copy, Gift, Users, DollarSign, Share2 } from "lucide-react";

interface ReferralData {
  code: string;
  total_referrals: number;
  pending_rewards: number;
  claimed_rewards: number;
  recent_referrals: Array<{
    id: string;
    referred_email: string;
    status: string;
    reward_amount: number;
    created_at: string;
  }>;
}

export const ReferralSystem = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [referralData, setReferralData] = useState<ReferralData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [copying, setCopying] = useState(false);

  useEffect(() => {
    if (user) {
      fetchReferralData();
    }
  }, [user]);

  const fetchReferralData = async () => {
    if (!user) return;

    try {
      // Get user's referral code
      const { data: codeData } = await supabase
        .from('referral_codes')
        .select('code, uses_count')
        .eq('user_id', user.id)
        .single();

      // Get referral statistics
      const { data: referrals } = await supabase
        .from('referrals')
        .select(`
          id,
          status,
          reward_amount,
          reward_claimed,
          created_at,
          referred_id
        `)
        .eq('referrer_id', user.id)
        .order('created_at', { ascending: false });

      // Calculate totals
      const totalReferrals = referrals?.length || 0;
      const pendingRewards = referrals?.reduce((sum, ref) => 
        !ref.reward_claimed ? sum + (ref.reward_amount || 0) : sum, 0) || 0;
      const claimedRewards = referrals?.reduce((sum, ref) => 
        ref.reward_claimed ? sum + (ref.reward_amount || 0) : sum, 0) || 0;

      setReferralData({
        code: codeData?.code || '',
        total_referrals: totalReferrals,
        pending_rewards: pendingRewards,
        claimed_rewards: claimedRewards,
        recent_referrals: referrals?.slice(0, 5).map(ref => ({
          id: ref.id,
          referred_email: 'Usuario referido', // For privacy
          status: ref.status,
          reward_amount: ref.reward_amount || 0,
          created_at: ref.created_at
        })) || []
      });

    } catch (error) {
      console.error('Error fetching referral data:', error);
      toast({
        title: "Error",
        description: "No se pudieron cargar los datos de referidos",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copyReferralLink = async () => {
    if (!referralData?.code) return;

    setCopying(true);
    const referralLink = `${window.location.origin}/auth?ref=${referralData.code}`;
    
    try {
      await navigator.clipboard.writeText(referralLink);
      toast({
        title: "¡Copiado!",
        description: "El enlace de referido se copió al portapapeles",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo copiar el enlace",
        variant: "destructive",
      });
    } finally {
      setCopying(false);
    }
  };

  const shareReferralLink = async () => {
    if (!referralData?.code) return;
    
    const referralLink = `${window.location.origin}/auth?ref=${referralData.code}`;
    const shareText = "¡Únete a esta increíble plataforma de herramientas con mi enlace de referido!";
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Plataforma de Herramientas',
          text: shareText,
          url: referralLink,
        });
      } catch (error) {
        // User cancelled sharing
      }
    } else {
      // Fallback to copying
      copyReferralLink();
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-8 bg-gray-200 rounded w-1/2"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!referralData) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-gray-500">Error al cargar datos de referidos</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Users className="w-8 h-8 text-blue-500" />
              <div>
                <p className="text-sm text-gray-600">Total Referidos</p>
                <p className="text-2xl font-bold">{referralData.total_referrals}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <DollarSign className="w-8 h-8 text-green-500" />
              <div>
                <p className="text-sm text-gray-600">Recompensas Pendientes</p>
                <p className="text-2xl font-bold">${referralData.pending_rewards}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Gift className="w-8 h-8 text-purple-500" />
              <div>
                <p className="text-sm text-gray-600">Total Ganado</p>
                <p className="text-2xl font-bold">${referralData.claimed_rewards}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Referral Link */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Share2 className="w-5 h-5" />
            Tu Enlace de Referido
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input 
              value={`${window.location.origin}/auth?ref=${referralData.code}`}
              readOnly
              className="flex-1"
            />
            <Button 
              onClick={copyReferralLink}
              disabled={copying}
              variant="outline"
            >
              <Copy className="w-4 h-4 mr-2" />
              {copying ? "Copiando..." : "Copiar"}
            </Button>
            <Button 
              onClick={shareReferralLink}
              variant="outline"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Compartir
            </Button>
          </div>
          
          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-800 mb-2">¿Cómo funciona?</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Comparte tu enlace con amigos</li>
              <li>• Ganas $5 cuando se suscriben a un plan de pago</li>
              <li>• Las recompensas se acreditan automáticamente</li>
              <li>• Sin límites en el número de referidos</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Recent Referrals */}
      {referralData.recent_referrals.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Referidos Recientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {referralData.recent_referrals.map((referral) => (
                <div key={referral.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{referral.referred_email}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(referral.created_at).toLocaleDateString('es-ES')}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={referral.status === 'completed' ? 'default' : 'secondary'}>
                      {referral.status === 'completed' ? 'Completado' : 'Pendiente'}
                    </Badge>
                    {referral.reward_amount > 0 && (
                      <span className="text-green-600 font-medium">
                        +${referral.reward_amount}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
