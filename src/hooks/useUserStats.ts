
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface UserStats {
  id: string;
  user_id: string;
  total_roadmaps: number;
  completed_roadmaps: number;
  total_tools_explored: number;
  last_activity: string;
  created_at: string;
  updated_at: string;
}

export const useUserStats = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [stats, setStats] = useState<UserStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadStats = async () => {
    if (!user) {
      setStats(null);
      setIsLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('user_stats')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        // Create initial stats if they don't exist
        const { data: newStats, error: createError } = await supabase
          .from('user_stats')
          .insert({
            user_id: user.id,
            total_roadmaps: 0,
            completed_roadmaps: 0,
            total_tools_explored: 0,
          })
          .select()
          .single();

        if (createError) throw createError;
        setStats(newStats);
      } else {
        setStats(data);
      }
    } catch (error) {
      console.error('Error loading user stats:', error);
      toast({
        title: "Error",
        description: "Error al cargar estadísticas del usuario",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateToolsExplored = async () => {
    if (!user || !stats) return;

    try {
      const { error } = await supabase
        .from('user_stats')
        .update({
          total_tools_explored: stats.total_tools_explored + 1,
          last_activity: new Date().toISOString(),
        })
        .eq('user_id', user.id);

      if (error) throw error;
      await loadStats();
    } catch (error) {
      console.error('Error updating tools explored:', error);
    }
  };

  useEffect(() => {
    loadStats();
  }, [user]);

  return {
    stats,
    isLoading,
    updateToolsExplored,
    refresh: loadStats,
  };
};
