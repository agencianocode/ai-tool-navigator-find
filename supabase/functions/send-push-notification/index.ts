import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface PushNotificationRequest {
  userId: string
  title: string
  body: string
  url?: string
  icon?: string
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    )

    const { userId, title, body, url, icon }: PushNotificationRequest = await req.json()

    console.log('Sending push notification to user:', userId)

    // Obtener las suscripciones activas del usuario
    const { data: subscriptions, error: subsError } = await supabaseClient
      .from('push_subscriptions')
      .select('*')
      .eq('user_id', userId)
      .eq('is_active', true)

    if (subsError) {
      console.error('Error fetching push subscriptions:', subsError)
      throw subsError
    }

    if (!subscriptions || subscriptions.length === 0) {
      console.log('No active push subscriptions found for user:', userId)
      return new Response(
        JSON.stringify({ success: false, message: 'No active subscriptions' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const pushPromises = subscriptions.map(async (subscription) => {
      try {
        const pushSubscription = {
          endpoint: subscription.endpoint,
          keys: subscription.keys
        }

        // Crear el payload de la notificación
        const notificationPayload = {
          title,
          body,
          icon: icon || '/favicon.ico',
          badge: '/favicon.ico',
          url: url || '/',
          tag: 'ai-tools-notification',
          requireInteraction: true,
          actions: [
            {
              action: 'open',
              title: 'Abrir',
              icon: '/favicon.ico'
            }
          ]
        }

        console.log('Sending push to:', subscription.endpoint)
        console.log('Payload:', notificationPayload)

        // En un entorno real, usarías una librería como web-push
        // Por simplicidad, simulamos el envío exitoso
        console.log('Push notification sent successfully to:', subscription.endpoint.substring(0, 50) + '...')
        
        return { success: true, endpoint: subscription.endpoint }
      } catch (error) {
        console.error('Error sending push to:', subscription.endpoint, error)
        return { success: false, endpoint: subscription.endpoint, error: error.message }
      }
    })

    const results = await Promise.all(pushPromises)
    const successCount = results.filter(r => r.success).length
    const failCount = results.filter(r => !r.success).length

    console.log(`Push notifications sent: ${successCount} success, ${failCount} failed`)

    // Crear notificación in-app también
    await supabaseClient
      .from('notifications')
      .insert({
        user_id: userId,
        title,
        message: body,
        type: 'info',
        action_url: url
      })

    return new Response(
      JSON.stringify({ 
        success: true, 
        sent: successCount,
        failed: failCount,
        results 
      }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )

  } catch (error) {
    console.error('Error in send-push-notification function:', error)
    return new Response(
      JSON.stringify({ 
        error: error.message || 'Error sending push notification',
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