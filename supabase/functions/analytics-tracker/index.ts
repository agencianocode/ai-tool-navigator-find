import { serve } from "https://deno.land/std@0.190.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    )

    const { 
      event_name, 
      event_type, 
      event_data,
      page_url,
      user_agent,
      user_id 
    } = await req.json()

    // Insert analytics event
    const { error: eventError } = await supabaseClient
      .from('analytics_events')
      .insert({
        event_name,
        event_type,
        event_data: event_data || {},
        page_url,
        user_agent,
        user_id,
        session_id: `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        ip_address: req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown',
        country: req.headers.get('cf-ipcountry') || 'unknown'
      })

    if (eventError) {
      console.error('Error inserting analytics event:', eventError)
      throw eventError
    }

    // Update or create daily metrics based on event type
    const today = new Date().toISOString().split('T')[0]
    
    switch (event_name) {
      case 'page_viewed':
        await updateMetric(supabaseClient, 'page_views', 'engagement', 1, today)
        break
      case 'tool_viewed':
        await updateMetric(supabaseClient, 'tool_views', 'engagement', 1, today)
        break
      case 'questionnaire_completed':
        await updateMetric(supabaseClient, 'questionnaire_completions', 'conversion', 1, today)
        break
      case 'roadmap_generated':
        await updateMetric(supabaseClient, 'roadmap_generations', 'conversion', 1, today)
        break
      case 'template_downloaded':
        await updateMetric(supabaseClient, 'template_downloads', 'content', 1, today)
        break
      case 'subscription_created':
        await updateMetric(supabaseClient, 'new_subscriptions', 'subscription', 1, today)
        break
    }

    // Track unique daily users
    if (user_id) {
      await updateDailyUser(supabaseClient, user_id, today)
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Event tracked successfully' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Error in analytics-tracker function:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})

async function updateMetric(supabaseClient: any, metricName: string, metricType: string, value: number, date: string) {
  // Check if metric exists for today
  const { data: existingMetric } = await supabaseClient
    .from('analytics_metrics')
    .select('id, metric_value')
    .eq('metric_name', metricName)
    .eq('metric_date', date)
    .single()

  if (existingMetric) {
    // Update existing metric
    await supabaseClient
      .from('analytics_metrics')
      .update({ 
        metric_value: existingMetric.metric_value + value,
        metadata: { last_updated: new Date().toISOString() }
      })
      .eq('id', existingMetric.id)
  } else {
    // Create new metric
    await supabaseClient
      .from('analytics_metrics')
      .insert({
        metric_name: metricName,
        metric_type: metricType,
        metric_value: value,
        metric_date: date,
        metadata: { created: new Date().toISOString() }
      })
  }
}

async function updateDailyUser(supabaseClient: any, userId: string, date: string) {
  // Check if this user was already counted today
  const { data: existingUser } = await supabaseClient
    .from('analytics_events')
    .select('id')
    .eq('user_id', userId)
    .eq('event_name', 'daily_user_tracked')
    .gte('created_at', `${date}T00:00:00Z`)
    .lt('created_at', `${date}T23:59:59Z`)
    .single()

  if (!existingUser) {
    // Mark user as counted for today
    await supabaseClient
      .from('analytics_events')
      .insert({
        event_name: 'daily_user_tracked',
        event_type: 'system',
        user_id: userId,
        event_data: { date },
        page_url: null,
        user_agent: 'system'
      })

    // Update daily active users metric
    await updateMetric(supabaseClient, 'daily_active_users', 'user', 1, date)
  }
}