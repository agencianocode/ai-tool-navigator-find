
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import Stripe from 'https://esm.sh/stripe@14.21.0'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
  apiVersion: '2023-10-16',
})

const cryptoProvider = Stripe.createSubtleCryptoProvider()

serve(async (req) => {
  const signature = req.headers.get('Stripe-Signature')
  const body = await req.text()
  
  if (!signature) {
    return new Response('No signature', { status: 400 })
  }

  try {
    const event = await stripe.webhooks.constructEventAsync(
      body,
      signature,
      Deno.env.get('STRIPE_WEBHOOK_SECRET') || '',
      undefined,
      cryptoProvider
    )

    console.log('Webhook event:', event.type)

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    switch (event.type) {
      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription
        const customer = await stripe.customers.retrieve(subscription.customer as string)
        
        if (customer.deleted) break
        
        const email = customer.email
        if (!email) break

        // Get subscription tier from price
        const priceId = subscription.items.data[0].price.id
        const price = await stripe.prices.retrieve(priceId)
        const amount = price.unit_amount || 0
        
        let subscriptionTier = 'basic'
        if (amount >= 2999) {
          subscriptionTier = 'enterprise'
        } else if (amount >= 1999) {
          subscriptionTier = 'premium'
        }

        await supabase.from('subscribers').upsert({
          email,
          stripe_customer_id: customer.id,
          subscribed: subscription.status === 'active',
          subscription_tier: subscriptionTier,
          subscription_end: new Date(subscription.current_period_end * 1000).toISOString(),
          updated_at: new Date().toISOString(),
        }, { onConflict: 'email' })

        console.log('Updated subscription for:', email)
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        const customer = await stripe.customers.retrieve(subscription.customer as string)
        
        if (customer.deleted) break
        
        const email = customer.email
        if (!email) break

        await supabase.from('subscribers').upsert({
          email,
          stripe_customer_id: customer.id,
          subscribed: false,
          subscription_tier: null,
          subscription_end: null,
          updated_at: new Date().toISOString(),
        }, { onConflict: 'email' })

        console.log('Canceled subscription for:', email)
        break
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice
        const customer = await stripe.customers.retrieve(invoice.customer as string)
        
        if (customer.deleted) break
        
        const email = customer.email
        if (!email) break

        // Log payment failure - could trigger email notification
        console.log('Payment failed for customer:', email)
        
        // Optionally update a payment_failures table for tracking
        break
      }

      default:
        console.log('Unhandled event type:', event.type)
    }

    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })

  } catch (error) {
    console.error('Webhook error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  }
})
