
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export type UserRole = 'admin' | 'moderator' | 'user';

export interface UserWithRole {
  id: string;
  email: string;
  full_name?: string;
  role: UserRole;
  created_at: string;
}

export const useRoles = () => {
  const { user, isAdmin } = useAuth();
  const { toast } = useToast();
  const [users, setUsers] = useState<UserWithRole[]>([]);
  const [loading, setLoading] = useState(false);

  const loadUsers = async () => {
    if (!user || !isAdmin) return;

    try {
      setLoading(true);
      
      // Obtener usuarios con sus roles
      const { data: userRoles, error: rolesError } = await supabase
        .from('user_roles')
        .select(`
          user_id,
          role,
          created_at
        `);

      if (rolesError) throw rolesError;

      // Obtener perfiles de usuarios
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('id, full_name');

      if (profilesError) throw profilesError;

      // Obtener usuarios de auth (solo admins pueden hacer esto)
      const { data: authUsers, error: authError } = await supabase.auth.admin.listUsers();

      if (authError) throw authError;

      // Combinar datos
      const combinedUsers: UserWithRole[] = authUsers.users.map(authUser => {
        const userRole = userRoles?.find(ur => ur.user_id === authUser.id);
        const profile = profiles?.find(p => p.id === authUser.id);
        
        return {
          id: authUser.id,
          email: authUser.email || '',
          full_name: profile?.full_name || authUser.user_metadata?.full_name,
          role: (userRole?.role as UserRole) || 'user',
          created_at: authUser.created_at
        };
      });

      setUsers(combinedUsers);
    } catch (error) {
      console.error('Error loading users:', error);
      toast({
        title: "Error",
        description: "Error al cargar los usuarios",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateUserRole = async (userId: string, newRole: UserRole) => {
    if (!user || !isAdmin) return false;

    try {
      const { error } = await supabase
        .from('user_roles')
        .upsert({
          user_id: userId,
          role: newRole
        }, {
          onConflict: 'user_id,role'
        });

      if (error) throw error;

      toast({
        title: "Éxito",
        description: "Rol de usuario actualizado correctamente",
      });

      await loadUsers();
      return true;
    } catch (error) {
      console.error('Error updating user role:', error);
      toast({
        title: "Error",
        description: "Error al actualizar el rol del usuario",
        variant: "destructive",
      });
      return false;
    }
  };

  const getCurrentUserRole = async () => {
    if (!user) return null;

    try {
      const { data, error } = await supabase
        .rpc('get_user_role', { _user_id: user.id });

      if (error) throw error;
      return data as UserRole;
    } catch (error) {
      console.error('Error getting user role:', error);
      return null;
    }
  };

  useEffect(() => {
    if (isAdmin) {
      loadUsers();
    }
  }, [user, isAdmin]);

  return {
    users,
    loading,
    loadUsers,
    updateUserRole,
    getCurrentUserRole
  };
};
