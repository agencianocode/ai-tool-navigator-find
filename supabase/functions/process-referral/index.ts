
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

    const { referralCode, newUserId } = await req.json();

    if (!referralCode || !newUserId) {
      throw new Error("Código de referido y ID de usuario requeridos");
    }

    // Find the referrer by code
    const { data: referralCodeData, error: codeError } = await supabaseClient
      .from('referral_codes')
      .select('user_id')
      .eq('code', referralCode)
      .single();

    if (codeError || !referralCodeData) {
      throw new Error("Código de referido inválido");
    }

    // Create referral record
    const { error: referralError } = await supabaseClient
      .from('referrals')
      .insert({
        referrer_id: referralCodeData.user_id,
        referred_id: newUserId,
        referral_code: referralCode,
        status: 'pending',
        reward_amount: 5 // $5 reward when referred user subscribes
      });

    if (referralError) {
      throw referralError;
    }

    // Update referral code usage count
    const { error: updateError } = await supabaseClient
      .from('referral_codes')
      .update({ 
        uses_count: referralCodeData.uses_count + 1,
        updated_at: new Date().toISOString()
      })
      .eq('user_id', referralCodeData.user_id);

    if (updateError) {
      console.error('Error updating referral code usage:', updateError);
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Referido procesado correctamente" 
      }),
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
