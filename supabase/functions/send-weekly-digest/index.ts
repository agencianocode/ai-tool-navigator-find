
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

const supabase = createClient(supabaseUrl, supabaseKey);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get users who want weekly digest
    const { data: users, error: usersError } = await supabase
      .from('notification_preferences')
      .select(`
        user_id,
        profiles!inner(email, full_name)
      `)
      .eq('email_weekly_digest', true);

    if (usersError) throw usersError;

    // Get top rated tools from the last week
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const { data: topTools, error: toolsError } = await supabase
      .from('tool_reviews')
      .select('tool_name, tool_id, rating')
      .gte('created_at', oneWeekAgo.toISOString())
      .order('rating', { ascending: false })
      .limit(5);

    if (toolsError) throw toolsError;

    // Get recent reviews count
    const { count: recentReviewsCount } = await supabase
      .from('tool_reviews')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', oneWeekAgo.toISOString());

    const emailPromises = users.map(async (user: any) => {
      const topToolsList = topTools.map(tool => 
        `<li style="margin: 10px 0;">${tool.tool_name} - ${tool.rating}/5 ⭐</li>`
      ).join('');

      return resend.emails.send({
        from: "AI Tools Weekly <noreply@resend.dev>",
        to: [user.profiles.email],
        subject: "🚀 Tu resumen semanal de AI Tools",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
              <h1 style="margin: 0; font-size: 28px;">🚀 AI Tools Weekly</h1>
              <p style="margin: 10px 0 0 0; opacity: 0.9;">Tu resumen semanal de las mejores herramientas IA</p>
            </div>

            <div style="padding: 30px; background-color: #ffffff;">
              <h2 style="color: #333; margin-top: 0;">¡Hola ${user.profiles.full_name || 'Usuario'}!</h2>
              
              <p style="color: #666; line-height: 1.6;">
                Aquí tienes lo más destacado de esta semana en el mundo de las herramientas de IA:
              </p>

              ${topTools.length > 0 ? `
                <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                  <h3 style="color: #374151; margin-top: 0;">🏆 Herramientas mejor calificadas esta semana</h3>
                  <ul style="color: #4b5563; padding-left: 20px;">
                    ${topToolsList}
                  </ul>
                </div>
              ` : ''}

              <div style="background-color: #e0f2fe; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #0277bd; margin-top: 0;">📊 Estadísticas de la semana</h3>
                <ul style="color: #01579b; padding-left: 20px;">
                  <li>Nuevas reseñas: ${recentReviewsCount || 0}</li>
                  <li>Herramientas más populares: ${topTools.length}</li>
                  <li>Comunidad activa y creciendo 🚀</li>
                </ul>
              </div>

              <div style="text-align: center; margin: 30px 0;">
                <a href="${supabaseUrl.replace('supabase.co', 'lovable.app')}" 
                   style="background-color: #6366f1; color: white; padding: 15px 30px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold;">
                  Explorar Nuevas Herramientas
                </a>
              </div>

              <div style="border-top: 1px solid #e2e8f0; padding-top: 20px; margin-top: 30px; text-align: center; color: #6b7280; font-size: 14px;">
                <p>¿No quieres recibir este resumen semanal? 
                   <a href="${supabaseUrl.replace('supabase.co', 'lovable.app')}/preferences" style="color: #6366f1;">
                     Configura tus preferencias
                   </a>
                </p>
                <p style="margin-top: 15px; font-size: 12px; color: #9ca3af;">
                  AI Tools - Descubre, evalúa y domina las mejores herramientas de IA
                </p>
              </div>
            </div>
          </div>
        `,
      });
    });

    const results = await Promise.allSettled(emailPromises);
    const successful = results.filter(r => r.status === 'fulfilled').length;
    const failed = results.filter(r => r.status === 'rejected').length;

    console.log(`Weekly digest sent: ${successful} successful, ${failed} failed`);

    return new Response(JSON.stringify({ 
      message: `Weekly digest sent to ${successful} users`,
      successful,
      failed 
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-weekly-digest function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
