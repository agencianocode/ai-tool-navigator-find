
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { Resend } from "npm:resend@2.0.0"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const resend = new Resend(Deno.env.get('RESEND_API_KEY'))

interface AlertEmailRequest {
  userEmail: string
  userName: string
  alertName: string
  alertDescription: string
  metricValue: number
  metricType: string
  thresholdValue: number
  condition: string
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { 
      userEmail, 
      userName, 
      alertName, 
      alertDescription, 
      metricValue, 
      metricType, 
      thresholdValue, 
      condition 
    }: AlertEmailRequest = await req.json()

    console.log('Sending alert email to:', userEmail)

    const conditionText = condition === 'greater_than' ? 'mayor que' : 
                         condition === 'less_than' ? 'menor que' : 'igual a'

    const metricNames: Record<string, string> = {
      'conversion_rate': 'Tasa de conversión',
      'daily_unique_users': 'Usuarios únicos diarios',
      'roadmaps_generated': 'Roadmaps generados',
      'tool_views': 'Vistas de herramientas',
      'questionnaire_completions': 'Cuestionarios completados'
    }

    const metricName = metricNames[metricType] || metricType

    const emailResponse = await resend.emails.send({
      from: "AI Tools Hub <alertas@yourdomain.com>",
      to: [userEmail],
      subject: `🚨 Alerta: ${alertName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0;">🚨 Alerta Activada</h1>
          </div>
          
          <div style="padding: 30px; background: #f8f9fa;">
            <h2 style="color: #333; margin-bottom: 20px;">Hola ${userName},</h2>
            
            <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #dc3545; margin-bottom: 20px;">
              <h3 style="color: #dc3545; margin-top: 0;">${alertName}</h3>
              <p style="color: #666; margin-bottom: 15px;">${alertDescription}</p>
              
              <div style="background: #f8f9fa; padding: 15px; border-radius: 4px;">
                <strong>Detalles de la alerta:</strong><br>
                📊 Métrica: <strong>${metricName}</strong><br>
                📈 Valor actual: <strong>${metricValue}</strong><br>
                ⚖️ Condición: <strong>${conditionText} ${thresholdValue}</strong><br>
                🕐 Hora: <strong>${new Date().toLocaleString('es-ES')}</strong>
              </div>
            </div>
            
            <div style="text-align: center; margin-top: 30px;">
              <a href="https://yourdomain.com/alerts" 
                 style="background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
                Ver Panel de Alertas
              </a>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #dee2e6; color: #666; font-size: 14px;">
              <p>Puedes configurar tus preferencias de notificaciones <a href="https://yourdomain.com/settings">aquí</a>.</p>
              <p>Si no deseas recibir estas alertas, puedes desactivarlas en tu panel de control.</p>
            </div>
          </div>
        </div>
      `,
    })

    console.log('Email sent successfully:', emailResponse)

    return new Response(
      JSON.stringify({ success: true, messageId: emailResponse.data?.id }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )

  } catch (error) {
    console.error('Error sending alert email:', error)
    return new Response(
      JSON.stringify({ 
        error: error.message || 'Error sending email',
        success: false
      }),
      { 
        status: 500,
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )
  }
})
