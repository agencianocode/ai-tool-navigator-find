
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface FavoriteTool {
  id: string;
  tool_name: string;
  created_at: string;
}

export const useFavorites = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [favorites, setFavorites] = useState<FavoriteTool[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadFavorites = async () => {
    if (!user) {
      setFavorites([]);
      setIsLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('user_favorite_tools')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setFavorites(data || []);
    } catch (error) {
      console.error('Error loading favorites:', error);
      toast({
        title: "Error",
        description: "Error al cargar herramientas favoritas",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const isFavorite = (toolName: string) => {
    return favorites.some(fav => fav.tool_name === toolName);
  };

  const addToFavorites = async (toolName: string) => {
    if (!user) {
      toast({
        title: "Error",
        description: "Debes iniciar sesión para agregar favoritos",
        variant: "destructive",
      });
      return false;
    }

    if (isFavorite(toolName)) {
      toast({
        title: "Info",
        description: "Esta herramienta ya está en tus favoritos",
      });
      return false;
    }

    try {
      const { error } = await supabase
        .from('user_favorite_tools')
        .insert({
          user_id: user.id,
          tool_name: toolName,
        });

      if (error) throw error;

      await loadFavorites();
      toast({
        title: "Éxito",
        description: `${toolName} agregada a favoritos`,
      });
      return true;
    } catch (error) {
      console.error('Error adding to favorites:', error);
      toast({
        title: "Error",
        description: "Error al agregar a favoritos",
        variant: "destructive",
      });
      return false;
    }
  };

  const removeFromFavorites = async (toolName: string) => {
    if (!user) return false;

    try {
      const { error } = await supabase
        .from('user_favorite_tools')
        .delete()
        .eq('user_id', user.id)
        .eq('tool_name', toolName);

      if (error) throw error;

      await loadFavorites();
      toast({
        title: "Éxito",
        description: `${toolName} eliminada de favoritos`,
      });
      return true;
    } catch (error) {
      console.error('Error removing from favorites:', error);
      toast({
        title: "Error",
        description: "Error al eliminar de favoritos",
        variant: "destructive",
      });
      return false;
    }
  };

  const toggleFavorite = async (toolName: string) => {
    if (isFavorite(toolName)) {
      return await removeFromFavorites(toolName);
    } else {
      return await addToFavorites(toolName);
    }
  };

  useEffect(() => {
    loadFavorites();
  }, [user]);

  return {
    favorites,
    isLoading,
    isFavorite,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    refresh: loadFavorites,
  };
};
