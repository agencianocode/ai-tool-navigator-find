
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Crown, Loader2, Tag } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface StripeProviderProps {
  priceId: string;
  planName: string;
  buttonText?: string;
  className?: string;
}

export const StripeProvider = ({ 
  priceId, 
  planName, 
  buttonText = "Suscribirse",
  className = ""
}: StripeProviderProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [showCoupon, setShowCoupon] = useState(false);

  const handleCheckout = async () => {
    if (!user) {
      toast({
        title: "Autenticación requerida",
        description: "Debes iniciar sesión para suscribirte.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { 
          priceId,
          couponCode: couponCode.trim() || undefined
        }
      });

      if (error) throw error;

      if (data?.url) {
        // Open checkout in new tab
        window.open(data.url, '_blank');
      }
    } catch (error) {
      console.error('Error creating checkout:', error);
      toast({
        title: "Error",
        description: "No se pudo crear la sesión de pago. Inténtalo de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Crown className="h-5 w-5" />
          {planName}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {showCoupon && (
          <div className="space-y-2">
            <Label htmlFor="coupon">Código de descuento (opcional)</Label>
            <div className="flex gap-2">
              <Input
                id="coupon"
                placeholder="Ingresa tu código"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowCoupon(false)}
              >
                Cancelar
              </Button>
            </div>
          </div>
        )}

        {!showCoupon && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowCoupon(true)}
            className="w-full"
          >
            <Tag className="h-4 w-4 mr-2" />
            ¿Tienes un código de descuento?
          </Button>
        )}

        <Button
          onClick={handleCheckout}
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Procesando...
            </>
          ) : (
            buttonText
          )}
        </Button>
      </CardContent>
    </Card>
  );
};
