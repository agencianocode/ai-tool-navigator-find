
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    );

    const { userId, subscriptionTier } = await req.json();

    if (!userId) {
      throw new Error("ID de usuario requerido");
    }

    // Find pending referral for this user
    const { data: referral, error: referralError } = await supabaseClient
      .from('referrals')
      .select('*')
      .eq('referred_id', userId)
      .eq('status', 'pending')
      .single();

    if (referralError || !referral) {
      // No referral found, that's okay
      return new Response(
        JSON.stringify({ success: true, message: "No hay referido pendiente" }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200,
        }
      );
    }

    // Only reward for paid subscriptions
    if (subscriptionTier && subscriptionTier !== 'free') {
      // Update referral status to completed
      const { error: updateError } = await supabaseClient
        .from('referrals')
        .update({
          status: 'completed',
          reward_amount: 5,
          updated_at: new Date().toISOString()
        })
        .eq('id', referral.id);

      if (updateError) {
        throw updateError;
      }

      // Create notification for referrer
      await supabaseClient
        .from('notifications')
        .insert({
          user_id: referral.referrer_id,
          title: '¡Felicidades!',
          message: 'Has ganado $5 por un referido exitoso',
          type: 'success'
        });

      return new Response(
        JSON.stringify({ 
          success: true, 
          message: "Recompensa de referido activada",
          reward_amount: 5
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200,
        }
      );
    }

    return new Response(
      JSON.stringify({ success: true, message: "Suscripción gratuita, no se activa recompensa" }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );

  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      }
    );
  }
});
