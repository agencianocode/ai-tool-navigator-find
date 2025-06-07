
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Roadmap {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  project_type?: string;
  skill_level?: string;
  timeline?: string;
  budget_range?: string;
  selected_tools?: any;
  roadmap_data: any;
  questionnaire_answers?: any;
  status: string;
  is_favorite: boolean;
  custom_name?: string;
  created_at: string;
  updated_at: string;
}

export const useRoadmaps = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [roadmaps, setRoadmaps] = useState<Roadmap[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadRoadmaps = async () => {
    if (!user) {
      setRoadmaps([]);
      setIsLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('roadmaps')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRoadmaps(data || []);
    } catch (error) {
      console.error('Error loading roadmaps:', error);
      toast({
        title: "Error",
        description: "Error al cargar roadmaps",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const createRoadmap = async (roadmapData: Omit<Roadmap, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
    if (!user) return null;

    try {
      const { data, error } = await supabase
        .from('roadmaps')
        .insert({
          ...roadmapData,
          user_id: user.id,
        })
        .select()
        .single();

      if (error) throw error;

      await loadRoadmaps();
      toast({
        title: "Éxito",
        description: "Roadmap creado correctamente",
      });
      return data;
    } catch (error) {
      console.error('Error creating roadmap:', error);
      toast({
        title: "Error",
        description: "Error al crear roadmap",
        variant: "destructive",
      });
      return null;
    }
  };

  const updateRoadmap = async (id: string, updates: Partial<Roadmap>) => {
    if (!user) return false;

    try {
      const { error } = await supabase
        .from('roadmaps')
        .update(updates)
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;

      await loadRoadmaps();
      toast({
        title: "Éxito",
        description: "Roadmap actualizado correctamente",
      });
      return true;
    } catch (error) {
      console.error('Error updating roadmap:', error);
      toast({
        title: "Error",
        description: "Error al actualizar roadmap",
        variant: "destructive",
      });
      return false;
    }
  };

  const deleteRoadmap = async (id: string) => {
    if (!user) return false;

    try {
      const { error } = await supabase
        .from('roadmaps')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;

      await loadRoadmaps();
      toast({
        title: "Éxito",
        description: "Roadmap eliminado correctamente",
      });
      return true;
    } catch (error) {
      console.error('Error deleting roadmap:', error);
      toast({
        title: "Error",
        description: "Error al eliminar roadmap",
        variant: "destructive",
      });
      return false;
    }
  };

  useEffect(() => {
    loadRoadmaps();
  }, [user]);

  return {
    roadmaps,
    isLoading,
    createRoadmap,
    updateRoadmap,
    deleteRoadmap,
    refresh: loadRoadmaps,
  };
};
