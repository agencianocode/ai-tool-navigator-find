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

  // ESTADO ADMIN INMUTABLE - La clave para evitar el problema
  const ADMIN_ENTERPRISE_STATE = {
    subscribed: true,
    subscription_tier: 'enterprise',
    subscription_end: null,
  };

  // Funciones de persistencia mejoradas
  const getAdminStateKey = (userId: string) => `admin_state_v2_${userId}`;
  
  const setAdminStatePermanently = (userId: string) => {
    console.log('🔧 ESTABLECIENDO ESTADO ADMIN PERMANENTE para:', userId);
    
    // Estados síncronos INMUTABLES
    setIsAdmin(true);
    setUserRole('admin');
    setSubscriptionStatus({ ...ADMIN_ENTERPRISE_STATE });
    
    // Persistencia robusta
    const adminData = {
      isAdmin: true,
      userRole: 'admin',
      subscriptionStatus: { ...ADMIN_ENTERPRISE_STATE },
      timestamp: Date.now(),
      version: 2 // Para invalidar versiones anteriores
    };
    
    localStorage.setItem(getAdminStateKey(userId), JSON.stringify(adminData));
    console.log('✅ Estado admin persistido permanentemente');
  };

  const loadPersistedAdminState = (userId: string): boolean => {
    console.log('💾 Verificando estado admin persistido para:', userId);
    
    try {
      const stateKey = getAdminStateKey(userId);
      const persistedState = localStorage.getItem(stateKey);
      
      if (persistedState) {
        const state = JSON.parse(persistedState);
        
        // Verificar versión y validez
        if (state.version === 2 && state.isAdmin && state.userRole === 'admin') {
          console.log('🚀 RESTAURANDO estado admin desde localStorage');
          
          // Restauración síncrona e inmutable
          setIsAdmin(true);
          setUserRole('admin');
          setSubscriptionStatus({ ...ADMIN_ENTERPRISE_STATE });
          
          return true;
        } else {
          // Limpiar versiones antiguas
          localStorage.removeItem(stateKey);
        }
      }
    } catch (error) {
      console.error('❌ Error cargando estado admin persistido:', error);
    }
    
    return false;
  };

  const clearAdminState = (userId?: string) => {
    console.log('🧹 Limpiando estado admin');
    setIsAdmin(false);
    setUserRole('user');
    
    if (userId) {
      localStorage.removeItem(getAdminStateKey(userId));
    }
  };

  // Función principal para verificar role - REDISEÑADA
  const refreshUserRole = async () => {
    if (!session?.user) {
      clearAdminState();
      setSubscriptionStatus({
        subscribed: false,
        subscription_tier: null,
        subscription_end: null,
      });
      return;
    }
    
    const userId = session.user.id;
    
    // PASO 1: Verificar estado persistido PRIMERO
    if (loadPersistedAdminState(userId)) {
      console.log('🚀 Admin state restaurado - SALTANDO verificación DB');
      return;
    }
    
    try {
      console.log('🔍 Verificando role en base de datos para:', session.user.email);
      
      const { data: roleData, error: roleError } = await supabase
        .rpc('get_user_role', { _user_id: userId });

      console.log('👑 Resultado verificación role:', { roleData, roleError });
      
      if (!roleError && roleData === 'admin') {
        // USUARIO ES ADMIN - Estado inmutable y permanente
        setAdminStatePermanently(userId);
        console.log('🎯 ADMIN CONFIRMADO - Estado establecido permanentemente');
      } else {
        // Usuario regular - limpiar cualquier estado admin residual
        clearAdminState(userId);
        setUserRole(roleData || 'user');
        
        // SOLO para usuarios NO-admin verificar suscripción
        console.log('👤 Usuario regular detectado - verificando suscripción...');
        await checkSubscriptionForRegularUser();
      }
    } catch (error) {
      console.error('❌ Error verificando role:', error);
      clearAdminState(userId);
      setUserRole('user');
    }
  };

  // Función separada para verificar suscripción SOLO para usuarios regulares
  const checkSubscriptionForRegularUser = async () => {
    if (!session?.user) return;
    
    try {
      console.log('🔍 Verificando suscripción para usuario regular');

      const { data: dbData, error: dbError } = await supabase
        .from('subscribers')
        .select('*')
        .eq('user_id', session.user.id)
        .single();

      console.log('📊 Datos suscripción desde DB:', { dbData, dbError });

      if (!dbError && dbData) {
        const newStatus = {
          subscribed: dbData.subscribed || false,
          subscription_tier: dbData.subscription_tier || null,
          subscription_end: dbData.subscription_end || null,
        };
        console.log('✅ Estableciendo estado suscripción regular:', newStatus);
        setSubscriptionStatus(newStatus);
        return;
      }

      // Fallback a función edge
      console.log('⚠️ Sin datos en DB, probando función edge...');
      const { data, error } = await supabase.functions.invoke('check-subscription');
      if (error) {
        console.error('❌ Error verificando suscripción via función:', error);
        return;
      }
      
      const fallbackStatus = {
        subscribed: data.subscribed || false,
        subscription_tier: data.subscription_tier || null,
        subscription_end: data.subscription_end || null,
      };
      console.log('✅ Estableciendo estado suscripción fallback:', fallbackStatus);
      setSubscriptionStatus(fallbackStatus);
    } catch (error) {
      console.error('❌ Error verificando suscripción:', error);
    }
  };

  // Función checkSubscription pública - CON GUARDIA CRÍTICA
  const checkSubscription = async () => {
    if (!session?.user) return;
    
    // GUARDIA ABSOLUTA - Nunca verificar suscripción para admins
    if (isAdmin || userRole === 'admin') {
      console.log('🚀 ADMIN DETECTADO - SALTANDO verificación suscripción completamente');
      return;
    }
    
    // Verificar estado persistido por si acaso
    if (loadPersistedAdminState(session.user.id)) {
      console.log('🚀 Estado admin restaurado durante checkSubscription - SALTANDO');
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
      console.log('🚪 Iniciando logout...');
      
      // Limpiar localStorage para este usuario
      if (user?.id) {
        localStorage.removeItem(getAdminStateKey(user.id));
      }
      
      // Limpiar estados locales ANTES de signOut
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
        console.error('❌ Error durante signOut:', error);
        toast({
          title: "Error",
          description: "Ocurrió un error al cerrar sesión.",
          variant: "destructive",
        });
      } else {
        console.log('✅ Logout exitoso');
        toast({
          title: "Sesión cerrada",
          description: "Has cerrado sesión exitosamente.",
        });
        
        window.location.href = '/';
      }
    } catch (error) {
      console.error('❌ Error inesperado durante signOut:', error);
      toast({
        title: "Error",
        description: "Ocurrió un error al cerrar sesión.",
        variant: "destructive",
      });
    }
  };

  // Effect principal - REDISEÑADO para evitar condiciones de carrera
  useEffect(() => {
    let mounted = true;

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!mounted) return;
        
        console.log('🔐 Cambio estado auth:', event, session?.user?.email);
        
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
        
        if (event === 'SIGNED_IN' && session) {
          console.log('✅ Usuario autenticado, verificando estado admin...');
          
          // PRIORIDAD MÁXIMA: Verificar estado admin persistido INMEDIATAMENTE
          if (loadPersistedAdminState(session.user.id)) {
            console.log('🚀 Estado admin restaurado inmediatamente - SIN verificación DB');
            return;
          }
          
          // Solo si NO hay estado persistido, verificar en DB
          await refreshUserRole();
        }
        
        if (event === 'SIGNED_OUT') {
          console.log('🚪 Usuario desconectado, reseteando estados');
          clearAdminState();
          setSubscriptionStatus({
            subscribed: false,
            subscription_tier: null,
            subscription_end: null,
          });
        }
      }
    );

    // Verificar sesión existente
    supabase.auth.getSession().then(async ({ data: { session }, error }) => {
      if (!mounted) return;
      
      if (error) {
        console.error('❌ Error obteniendo sesión:', error);
      }
      console.log('🔐 Verificación sesión inicial:', session?.user?.email);
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
      
      if (session && mounted) {
        console.log('✅ Sesión existente encontrada, verificando estado admin...');
        
        // PRIORIDAD MÁXIMA: Verificar estado admin persistido PRIMERO
        if (loadPersistedAdminState(session.user.id)) {
          console.log('🚀 Estado admin restaurado desde persistencia en carga inicial');
          return;
        }
        
        // Solo si NO hay estado persistido, verificar en DB
        await refreshUserRole();
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
