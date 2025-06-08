
import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface AnalyticsEvent {
  event_type: string;
  event_name: string;
  event_data?: Record<string, any>;
  page_url?: string;
}

export const useAnalytics = () => {
  const trackEvent = async (event: AnalyticsEvent) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      await supabase.from('analytics_events').insert({
        user_id: user?.id || null,
        session_id: getSessionId(),
        event_type: event.event_type,
        event_name: event.event_name,
        event_data: event.event_data || {},
        page_url: event.page_url || window.location.href,
        user_agent: navigator.userAgent,
        ip_address: null, // Se puede obtener del servidor
        country: null // Se puede obtener de una API de geolocalización
      });
      
      console.log('Analytics event tracked:', event.event_name);
    } catch (error) {
      console.error('Error tracking analytics event:', error);
    }
  };

  const trackPageView = (pageName: string) => {
    trackEvent({
      event_type: 'page_view',
      event_name: 'page_viewed',
      event_data: { page_name: pageName },
      page_url: window.location.href
    });
  };

  const trackToolView = (toolId: string, toolName: string) => {
    trackEvent({
      event_type: 'tool_interaction',
      event_name: 'tool_viewed',
      event_data: { tool_id: toolId, tool_name: toolName }
    });
  };

  const trackToolFavorite = (toolId: string, toolName: string, action: 'add' | 'remove') => {
    trackEvent({
      event_type: 'tool_interaction',
      event_name: 'tool_favorited',
      event_data: { tool_id: toolId, tool_name: toolName, action }
    });
  };

  const trackQuestionnaireCompleted = (answers: Record<string, any>) => {
    trackEvent({
      event_type: 'engagement',
      event_name: 'questionnaire_completed',
      event_data: { answers, completion_time: new Date().toISOString() }
    });
  };

  const trackRoadmapGenerated = (roadmapData: any) => {
    trackEvent({
      event_type: 'engagement',
      event_name: 'roadmap_generated',
      event_data: { 
        roadmap_type: roadmapData.project_type,
        tools_count: roadmapData.selected_tools?.length || 0
      }
    });
  };

  const trackTemplateView = (templateId: string, templateTitle: string) => {
    trackEvent({
      event_type: 'template_interaction',
      event_name: 'template_viewed',
      event_data: { template_id: templateId, template_title: templateTitle }
    });
  };

  const trackTemplateDownload = (templateId: string, templateTitle: string) => {
    trackEvent({
      event_type: 'template_interaction',
      event_name: 'template_downloaded',
      event_data: { template_id: templateId, template_title: templateTitle }
    });
  };

  const trackSearchQuery = (query: string, resultsCount: number) => {
    trackEvent({
      event_type: 'search',
      event_name: 'search_performed',
      event_data: { query, results_count: resultsCount }
    });
  };

  return {
    trackEvent,
    trackPageView,
    trackToolView,
    trackToolFavorite,
    trackQuestionnaireCompleted,
    trackRoadmapGenerated,
    trackTemplateView,
    trackTemplateDownload,
    trackSearchQuery
  };
};

// Helper function to get or create session ID
const getSessionId = (): string => {
  let sessionId = sessionStorage.getItem('analytics_session_id');
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    sessionStorage.setItem('analytics_session_id', sessionId);
  }
  return sessionId;
};

// Component to track page views automatically
export const AnalyticsPageTracker = ({ pageName }: { pageName: string }) => {
  const { trackPageView } = useAnalytics();

  useEffect(() => {
    trackPageView(pageName);
  }, [pageName, trackPageView]);

  return null;
};
