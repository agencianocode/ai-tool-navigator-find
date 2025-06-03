
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ReviewNotificationRequest {
  recipientEmail: string;
  recipientName: string;
  toolName: string;
  reviewerName: string;
  rating: number;
  reviewTitle?: string;
  reviewContent?: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { 
      recipientEmail, 
      recipientName, 
      toolName, 
      reviewerName, 
      rating, 
      reviewTitle, 
      reviewContent 
    }: ReviewNotificationRequest = await req.json();

    const stars = "★".repeat(rating) + "☆".repeat(5 - rating);

    const emailResponse = await resend.emails.send({
      from: "AI Tools Reviews <noreply@resend.dev>",
      to: [recipientEmail],
      subject: `Nueva reseña para ${toolName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #333;">Nueva reseña en AI Tools</h1>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #6366f1; margin-top: 0;">¡Hola ${recipientName}!</h2>
            <p>Alguien ha escrito una nueva reseña para <strong>${toolName}</strong>, una herramienta que has utilizado.</p>
          </div>

          <div style="border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; margin: 20px 0;">
            <div style="display: flex; align-items: center; margin-bottom: 10px;">
              <span style="font-size: 20px; color: #fbbf24;">${stars}</span>
              <span style="margin-left: 10px; font-weight: bold;">${rating}/5</span>
            </div>
            
            <p style="margin: 5px 0;"><strong>Por:</strong> ${reviewerName}</p>
            
            ${reviewTitle ? `<h3 style="color: #374151; margin: 15px 0 10px 0;">${reviewTitle}</h3>` : ''}
            
            ${reviewContent ? `<p style="color: #6b7280; line-height: 1.6;">${reviewContent}</p>` : ''}
          </div>

          <div style="text-align: center; margin: 30px 0;">
            <a href="${Deno.env.get('SUPABASE_URL') || 'https://tu-app.com'}/tool/${encodeURIComponent(toolName)}" 
               style="background-color: #6366f1; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
              Ver todas las reseñas
            </a>
          </div>

          <div style="border-top: 1px solid #e2e8f0; padding-top: 20px; margin-top: 30px; text-align: center; color: #6b7280; font-size: 14px;">
            <p>¿No quieres recibir estos emails? 
               <a href="${Deno.env.get('SUPABASE_URL') || 'https://tu-app.com'}/preferences" style="color: #6366f1;">
                 Configura tus preferencias
               </a>
            </p>
            <p>AI Tools - Tu guía inteligente para herramientas de IA</p>
          </div>
        </div>
      `,
    });

    console.log("Review notification sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-review-notification function:", error);
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
