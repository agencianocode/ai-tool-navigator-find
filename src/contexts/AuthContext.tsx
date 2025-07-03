
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
  const [adminStateInitialized, setAdminStateInitialized] = useState(false);
  const { toast } = useToast();

  // Admin enterprise state configuration
  const ADMIN_ENTERPRISE_STATE = {
    subscribed: true,
    subscription_tier: 'enterprise',
    subscription_end: null,
  };

  // Admin state persistence functions
  const getAdminStateKey = (userId: string) => `admin_state_v3_${userId}`;
  
  const setAdminStatePermanently = (userId: string) => {
    console.log('🔧 [ADMIN] Setting permanent admin state for:', userId);
    
    setIsAdmin(true);
    setUserRole('admin');
    setSubscriptionStatus({ ...ADMIN_ENTERPRISE_STATE });
    setAdminStateInitialized(true);
    
    const adminData = {
      isAdmin: true,
      userRole: 'admin',
      subscriptionStatus: { ...ADMIN_ENTERPRISE_STATE },
      timestamp: Date.now(),
      version: 3
    };
    
    localStorage.setItem(getAdminStateKey(userId), JSON.stringify(adminData));
    console.log('✅ [ADMIN] Admin state persisted permanently');
  };

  const loadPersistedAdminState = (userId: string): boolean => {
    console.log('💾 [ADMIN] Checking persisted admin state for:', userId);
    
    try {
      const stateKey = getAdminStateKey(userId);
      const persistedState = localStorage.getItem(stateKey);
      
      if (persistedState) {
        const state = JSON.parse(persistedState);
        
        if (state.version === 3 && state.isAdmin && state.userRole === 'admin') {
          console.log('🚀 [ADMIN] Restoring admin state from localStorage');
          
          setIsAdmin(true);
          setUserRole('admin');
          setSubscriptionStatus({ ...ADMIN_ENTERPRISE_STATE });
          setAdminStateInitialized(true);
          
          return true;
        } else {
          localStorage.removeItem(stateKey);
        }
      }
    } catch (error) {
      console.error('❌ [ADMIN] Error loading persisted admin state:', error);
    }
    
    return false;
  };

  const clearAdminState = (userId?: string) => {
    console.log('🧹 [ADMIN] Clearing admin state');
    setIsAdmin(false);
    setUserRole('user');
    setAdminStateInitialized(false);
    
    if (userId) {
      localStorage.removeItem(getAdminStateKey(userId));
    }
  };

  // Admin protection guard
  const isAdminProtected = () => {
    const adminStatus = isAdmin || userRole === 'admin';
    if (adminStatus) {
      console.log('🛡️ [ADMIN] Guard activated - operation blocked for admin');
    }
    return adminStatus;
  };

  // Main role verification function
  const refreshUserRole = async () => {
    if (!session?.user) {
      clearAdminState();
      setSubscriptionStatus({
        subscribed: false,
        subscription_tier: null,
        subscription_end: null,
      });
      setAdminStateInitialized(true);
      return;
    }
    
    const userId = session.user.id;
    
    // Always clear persisted state and check fresh from DB
    localStorage.removeItem(getAdminStateKey(userId));
    
    try {
      console.log('🔍 [AUTH] Verifying role in database for:', session.user.email);
      
      const { data: roleData, error: roleError } = await supabase
        .rpc('get_user_role', { _user_id: userId });

      console.log('👑 [AUTH] Role verification result:', { roleData, roleError });
      
      if (!roleError && roleData === 'admin') {
        setAdminStatePermanently(userId);
        console.log('🎯 [ADMIN] Admin confirmed - state set permanently');
      } else {
        clearAdminState(userId);
        setUserRole(roleData || 'user');
        setAdminStateInitialized(true);
        
        console.log('👤 [AUTH] Regular user detected - checking subscription...');
        await checkSubscriptionForRegularUser();
      }
    } catch (error) {
      console.error('❌ [AUTH] Error verifying role:', error);
      clearAdminState(userId);
      setUserRole('user');
      setAdminStateInitialized(true);
    }
  };

  // Subscription check for regular users only
  const checkSubscriptionForRegularUser = async () => {
    if (!session?.user) return;
    
    if (isAdminProtected()) {
      console.log('🚫 [ADMIN] checkSubscriptionForRegularUser blocked for admin');
      return;
    }
    
    try {
      console.log('🔍 [SUB] Checking subscription for regular user');

      const { data: dbData, error: dbError } = await supabase
        .from('subscribers')
        .select('*')
        .eq('user_id', session.user.id)
        .single();

      console.log('📊 [SUB] Subscription data from DB:', { dbData, dbError });

      if (!dbError && dbData) {
        const newStatus = {
          subscribed: dbData.subscribed || false,
          subscription_tier: dbData.subscription_tier || null,
          subscription_end: dbData.subscription_end || null,
        };
        console.log('✅ [SUB] Setting regular subscription status:', newStatus);
        setSubscriptionStatus(newStatus);
        return;
      }

      console.log('⚠️ [SUB] No DB data, trying edge function...');
      const { data, error } = await supabase.functions.invoke('check-subscription');
      if (error) {
        console.error('❌ [SUB] Error checking subscription via function:', error);
        return;
      }
      
      const fallbackStatus = {
        subscribed: data.subscribed || false,
        subscription_tier: data.subscription_tier || null,
        subscription_end: data.subscription_end || null,
      };
      console.log('✅ [SUB] Setting fallback subscription status:', fallbackStatus);
      setSubscriptionStatus(fallbackStatus);
    } catch (error) {
      console.error('❌ [SUB] Error checking subscription:', error);
    }
  };

  // Public checkSubscription function with admin guard
  const checkSubscription = async () => {
    if (!session?.user) {
      console.log('⚠️ [SUB] No user, skipping checkSubscription');
      return;
    }
    
    if (isAdminProtected()) {
      console.log('🚫 [ADMIN] checkSubscription blocked for admin');
      toast({
        title: "Usuario Admin",
        description: "Los administradores tienen acceso ilimitado automáticamente.",
        variant: "default",
      });
      return;
    }
    
    if (loadPersistedAdminState(session.user.id)) {
      console.log('🚀 [ADMIN] Admin state restored during checkSubscription - skipping');
      return;
    }
    
    if (!adminStateInitialized) {
      console.log('⏳ [AUTH] Waiting for admin initialization...');
      setTimeout(() => checkSubscription(), 500);
      return;
    }
    
    await checkSubscriptionForRegularUser();
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
      console.log('🚪 [AUTH] Starting logout...');
      
      if (user?.id) {
        localStorage.removeItem(getAdminStateKey(user.id));
      }
      
      setUser(null);
      setSession(null);
      setIsAdmin(false);
      setUserRole(null);
      setAdminStateInitialized(false);
      setSubscriptionStatus({
        subscribed: false,
        subscription_tier: null,
        subscription_end: null,
      });
      
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error('❌ [AUTH] Error during signOut:', error);
        toast({
          title: "Error",
          description: "Ocurrió un error al cerrar sesión.",
          variant: "destructive",
        });
      } else {
        console.log('✅ [AUTH] Logout successful');
        toast({
          title: "Sesión cerrada",
          description: "Has cerrado sesión exitosamente.",
        });
        
        window.location.href = '/';
      }
    } catch (error) {
      console.error('❌ [AUTH] Unexpected error during signOut:', error);
      toast({
        title: "Error",
        description: "Ocurrió un error al cerrar sesión.",
        variant: "destructive",
      });
    }
  };

  // Main auth state effect
  useEffect(() => {
    let mounted = true;

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!mounted) return;
        
        console.log('🔐 [AUTH] Auth state change:', event, session?.user?.email);
        
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
        
        if (event === 'SIGNED_IN' && session) {
          console.log('✅ [AUTH] User authenticated, initializing state...');
          
          if (loadPersistedAdminState(session.user.id)) {
            console.log('🚀 [ADMIN] Admin state restored immediately - no DB verification');
            return;
          }
          
          await refreshUserRole();
        }
        
        if (event === 'SIGNED_OUT') {
          console.log('🚪 [AUTH] User disconnected, resetting states');
          clearAdminState();
          setSubscriptionStatus({
            subscribed: false,
            subscription_tier: null,
            subscription_end: null,
          });
          setAdminStateInitialized(true);
        }
      }
    );

    // Check existing session
    supabase.auth.getSession().then(async ({ data: { session }, error }) => {
      if (!mounted) return;
      
      if (error) {
        console.error('❌ [AUTH] Error getting session:', error);
      }
      console.log('🔐 [AUTH] Initial session check:', session?.user?.email);
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
      
      if (session && mounted) {
        console.log('✅ [AUTH] Existing session found, initializing state...');
        
        if (loadPersistedAdminState(session.user.id)) {
          console.log('🚀 [ADMIN] Admin state restored from persistence on initial load');
          return;
        }
        
        await refreshUserRole();
      } else {
        setAdminStateInitialized(true);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

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
