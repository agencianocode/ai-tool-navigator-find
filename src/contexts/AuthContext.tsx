import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isAdmin: boolean;
  userRole: string | null;
  subscriptionStatus: {
    subscribed: boolean;
    subscription_tier: string | null;
    subscription_end: string | null;
  };
  checkSubscription: () => Promise<void>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string, fullName?: string) => Promise<{ error: any }>;
  signInWithGoogle: () => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: any }>;
  refreshUserRole: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [subscriptionStatus, setSubscriptionStatus] = useState({
    subscribed: false,
    subscription_tier: null,
    subscription_end: null,
  });
  const { toast } = useToast();

  const refreshUserRole = async () => {
    if (!session?.user) {
      setIsAdmin(false);
      setUserRole(null);
      return;
    }
    
    try {
      console.log('🔍 Checking user role for:', session.user.email);
      
      const { data: roleData, error: roleError } = await supabase
        .rpc('get_user_role', { target_user_id: session.user.id });

      console.log('👑 Role check result:', { roleData, roleError });
      
      if (!roleError && roleData) {
        setUserRole(roleData);
        const userIsAdmin = roleData === 'admin';
        setIsAdmin(userIsAdmin);
        console.log('✅ Role set to:', roleData, 'isAdmin:', userIsAdmin);
      } else {
        // Usuario nuevo o sin rol asignado, usar 'user' por defecto
        setUserRole('user');
        setIsAdmin(false);
        console.log('✅ Default role set to: user');
      }
    } catch (error) {
      console.error('❌ Error checking user role:', error);
      setUserRole('user');
      setIsAdmin(false);
    }
  };

  const checkSubscription = async () => {
    if (!session) {
      setIsAdmin(false);
      return;
    }
    
    try {
      console.log('🔍 Checking subscription and admin status for user:', session.user.email);
      
      // Si es admin, establecer tier enterprise automáticamente
      if (isAdmin) {
        console.log('🚀 Admin detected - setting enterprise tier');
        const enterpriseStatus = {
          subscribed: true,
          subscription_tier: 'enterprise',
          subscription_end: null, // Sin límite para admins
        };
        setSubscriptionStatus(enterpriseStatus);
        console.log('✅ Enterprise status set for admin:', enterpriseStatus);
        return;
      }

      // Para usuarios no-admin, verificar suscripción normal
      const { data: dbData, error: dbError } = await supabase
        .from('subscribers')
        .select('*')
        .eq('user_id', session.user.id)
        .single();

      console.log('📊 Subscription data from DB:', { dbData, dbError });

      if (!dbError && dbData) {
        const newStatus = {
          subscribed: dbData.subscribed || false,
          subscription_tier: dbData.subscription_tier || null,
          subscription_end: dbData.subscription_end || null,
        };
        console.log('✅ Setting regular subscription status:', newStatus);
        setSubscriptionStatus(newStatus);
        return;
      }

      // Fallback a la función edge solo si no hay datos en DB
      console.log('⚠️ No data in DB, trying edge function fallback...');
      const { data, error } = await supabase.functions.invoke('check-subscription');
      if (error) {
        console.error('❌ Error checking subscription via function:', error);
        return;
      }
      
      console.log('📊 Subscription from function:', data);
      const fallbackStatus = {
        subscribed: data.subscribed || false,
        subscription_tier: data.subscription_tier || null,
        subscription_end: data.subscription_end || null,
      };
      console.log('✅ Setting fallback subscription status:', fallbackStatus);
      setSubscriptionStatus(fallbackStatus);
    } catch (error) {
      console.error('❌ Error checking subscription:', error);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        let errorMessage = 'Error al iniciar sesión';
        if (error.message.includes('Invalid login credentials')) {
          errorMessage = 'Credenciales inválidas. Verifica tu email y contraseña.';
        } else if (error.message.includes('Email not confirmed')) {
          errorMessage = 'Por favor confirma tu email antes de iniciar sesión.';
        }
        
        toast({
          title: "Error de autenticación",
          description: errorMessage,
          variant: "destructive",
        });
      } else {
        toast({
          title: "¡Bienvenido de vuelta!",
          description: "Has iniciado sesión exitosamente.",
        });
      }
      
      return { error };
    } catch (error) {
      toast({
        title: "Error inesperado",
        description: "Ocurrió un error durante el inicio de sesión.",
        variant: "destructive",
      });
      return { error };
    }
  };

  const signUp = async (email: string, password: string, fullName?: string) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
          emailRedirectTo: `${window.location.origin}/`,
        },
      });
      
      if (error) {
        let errorMessage = 'Error al crear la cuenta';
        if (error.message.includes('User already registered')) {
          errorMessage = 'Este email ya está registrado. Intenta iniciar sesión.';
        } else if (error.message.includes('Password should be at least')) {
          errorMessage = 'La contraseña debe tener al menos 6 caracteres.';
        }
        
        toast({
          title: "Error de registro",
          description: errorMessage,
          variant: "destructive",
        });
      } else {
        toast({
          title: "¡Cuenta creada!",
          description: "Revisa tu email para confirmar tu cuenta.",
        });
      }
      
      return { error };
    } catch (error) {
      toast({
        title: "Error inesperado",
        description: "Ocurrió un error durante el registro.",
        variant: "destructive",
      });
      return { error };
    }
  };

  const signInWithGoogle = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
        },
      });
      return { error };
    } catch (error) {
      toast({
        title: "Error de autenticación",
        description: "No se pudo conectar con Google.",
        variant: "destructive",
      });
      return { error };
    }
  };

  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth?mode=reset`,
      });
      
      if (error) {
        toast({
          title: "Error",
          description: "No se pudo enviar el email de recuperación.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Email enviado",
          description: "Revisa tu email para restablecer tu contraseña.",
        });
      }
      
      return { error };
    } catch (error) {
      toast({
        title: "Error inesperado",
        description: "Ocurrió un error al solicitar la recuperación.",
        variant: "destructive",
      });
      return { error };
    }
  };

  const signOut = async () => {
    try {
      console.log('🚪 Attempting to sign out...');
      
      // Limpiar estados locales ANTES de llamar a signOut
      setUser(null);
      setSession(null);
      setIsAdmin(false);
      setUserRole(null);
      setSubscriptionStatus({
        subscribed: false,
        subscription_tier: null,
        subscription_end: null,
      });
      
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error('❌ Error during signOut:', error);
        toast({
          title: "Error",
          description: "Ocurrió un error al cerrar sesión.",
          variant: "destructive",
        });
      } else {
        console.log('✅ Successfully signed out');
        toast({
          title: "Sesión cerrada",
          description: "Has cerrado sesión exitosamente.",
        });
        
        // Forzar navegación a la página principal después del logout
        window.location.href = '/';
      }
    } catch (error) {
      console.error('❌ Unexpected error during signOut:', error);
      toast({
        title: "Error",
        description: "Ocurrió un error al cerrar sesión.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    let mounted = true;

    // Configurar listener de auth state PRIMERO
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!mounted) return;
        
        console.log('🔐 Auth state changed:', event, session?.user?.email);
        
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
        
        // Manejar eventos específicos
        if (event === 'SIGNED_IN' && session) {
          console.log('✅ User signed in, checking roles and subscription...');
          // Primero obtener el rol, luego la suscripción
          setTimeout(async () => {
            if (mounted) {
              await refreshUserRole();
              await checkSubscription();
            }
          }, 100);
        }
        
        if (event === 'SIGNED_OUT') {
          console.log('🚪 User signed out, resetting all states');
          setIsAdmin(false);
          setUserRole(null);
          setSubscriptionStatus({
            subscribed: false,
            subscription_tier: null,
            subscription_end: null,
          });
        }
      }
    );

    // LUEGO verificar sesión existente
    supabase.auth.getSession().then(async ({ data: { session }, error }) => {
      if (!mounted) return;
      
      if (error) {
        console.error('❌ Error getting session:', error);
      }
      console.log('🔐 Initial session check:', session?.user?.email);
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
      
      // Si ya hay una sesión, verificar rol y suscripción inmediatamente
      if (session) {
        console.log('✅ Existing session found, checking roles and subscription...');
        await refreshUserRole();
        await checkSubscription();
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  // Actualizar suscripción cuando cambie el rol
  useEffect(() => {
    if (session) {
      checkSubscription();
    }
  }, [isAdmin, userRole]);

  const value = {
    user,
    session,
    loading,
    isAdmin,
    userRole,
    subscriptionStatus,
    checkSubscription,
    signIn,
    signUp,
    signInWithGoogle,
    signOut,
    resetPassword,
    refreshUserRole,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
