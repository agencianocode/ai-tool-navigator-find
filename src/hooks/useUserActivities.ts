
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useCallback } from "react";

interface ActivityData {
  activity_type: string;
  activity_title: string;
  activity_description?: string;
  related_id?: string;
  metadata?: any;
}

export const useUserActivities = () => {
  const { user } = useAuth();

  const logActivity = useCallback(async (activityData: ActivityData) => {
    if (!user) return;

    try {
      console.log('Logging activity:', activityData);
      const { error } = await supabase
        .from('user_activities')
        .insert({
          user_id: user.id,
          ...activityData
        });

      if (error) {
        console.error('Error logging activity:', error);
      } else {
        console.log('Activity logged successfully');
      }
    } catch (error) {
      console.error('Error logging activity:', error);
    }
  }, [user]);

  return { logActivity };
};
