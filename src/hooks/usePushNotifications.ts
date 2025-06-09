
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export const usePushNotifications = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isSupported, setIsSupported] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsSupported('serviceWorker' in navigator && 'PushManager' in window);
    checkSubscriptionStatus();
  }, [user]);

  const checkSubscriptionStatus = async () => {
    if (!user || !isSupported) return;

    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();
      setIsSubscribed(!!subscription);

      if (subscription) {
        // Verificar si la suscripción está guardada en la base de datos
        const { data } = await supabase
          .from('push_subscriptions')
          .select('id')
          .eq('user_id', user.id)
          .eq('endpoint', subscription.endpoint)
          .eq('is_active', true)
          .maybeSingle();

        if (!data) {
          // Si no está en la BD, guardarla
          await savePushSubscription(subscription);
        }
      }
    } catch (error) {
      console.error('Error checking subscription status:', error);
    }
  };

  const savePushSubscription = async (subscription: PushSubscription) => {
    if (!user) return;

    try {
      const subscriptionData = {
        user_id: user.id,
        endpoint: subscription.endpoint,
        keys: {
          p256dh: subscription.toJSON().keys?.p256dh,
          auth: subscription.toJSON().keys?.auth,
        },
        is_active: true,
      };

      const { error } = await supabase
        .from('push_subscriptions')
        .upsert(subscriptionData, {
          onConflict: 'user_id, endpoint'
        });

      if (error) throw error;

      console.log('Push subscription saved successfully');
    } catch (error) {
      console.error('Error saving push subscription:', error);
    }
  };

  const subscribeToPush = async () => {
    if (!isSupported || !user) {
      toast({
        title: "No compatible",
        description: "Tu navegador no soporta notificaciones push",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const permission = await Notification.requestPermission();
      
      if (permission !== 'granted') {
        toast({
          title: "Permisos denegados",
          description: "Has denegado los permisos para notificaciones",
          variant: "destructive",
        });
        return;
      }

      const registration = await navigator.serviceWorker.ready;
      
      // Nota: Necesitarás generar una VAPID key pair
      // Puedes usar: https://vapidkeys.com/
      const vapidPublicKey = 'YOUR_VAPID_PUBLIC_KEY'; // Reemplazar con tu clave pública VAPID
      
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: vapidPublicKey,
      });

      await savePushSubscription(subscription);
      setIsSubscribed(true);

      toast({
        title: "¡Suscrito!",
        description: "Recibirás notificaciones push de alertas importantes",
      });

    } catch (error) {
      console.error('Error subscribing to push notifications:', error);
      toast({
        title: "Error",
        description: "No se pudo activar las notificaciones push",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const unsubscribeFromPush = async () => {
    if (!user) return;

    setIsLoading(true);

    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();

      if (subscription) {
        await subscription.unsubscribe();
        
        // Desactivar en la base de datos
        await supabase
          .from('push_subscriptions')
          .update({ is_active: false })
          .eq('user_id', user.id)
          .eq('endpoint', subscription.endpoint);
      }

      setIsSubscribed(false);

      toast({
        title: "Desuscrito",
        description: "Ya no recibirás notificaciones push",
      });

    } catch (error) {
      console.error('Error unsubscribing from push notifications:', error);
      toast({
        title: "Error",
        description: "No se pudo desactivar las notificaciones push",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isSupported,
    isSubscribed,
    isLoading,
    subscribeToPush,
    unsubscribeFromPush,
  };
};
