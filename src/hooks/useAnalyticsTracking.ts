import { useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

export const useAnalyticsTracking = () => {
  const { user } = useAuth();

  const trackEvent = useCallback(async (
    eventName: string,
    eventType: string,
    eventData?: Record<string, any>
  ) => {
    try {
      await supabase.functions.invoke('analytics-tracker', {
        body: {
          event_name: eventName,
          event_type: eventType,
          event_data: eventData,
          page_url: window.location.href,
          user_agent: navigator.userAgent,
          user_id: user?.id || null,
        }
      });
    } catch (error) {
      console.error('Error tracking analytics event:', error);
    }
  }, [user?.id]);

  const trackPageView = useCallback((pageName: string) => {
    trackEvent('page_viewed', 'navigation', { page_name: pageName });
  }, [trackEvent]);

  const trackToolView = useCallback((toolId: string, toolName: string) => {
    trackEvent('tool_viewed', 'engagement', { 
      tool_id: toolId, 
      tool_name: toolName 
    });
  }, [trackEvent]);

  const trackQuestionnaireComplete = useCallback((answers: Record<string, any>) => {
    trackEvent('questionnaire_completed', 'conversion', { 
      answers,
      completion_time: Date.now()
    });
  }, [trackEvent]);

  const trackRoadmapGeneration = useCallback((roadmapData: Record<string, any>) => {
    trackEvent('roadmap_generated', 'conversion', {
      tools_count: roadmapData.tools?.length || 0,
      project_type: roadmapData.projectType,
      budget_range: roadmapData.budgetRange
    });
  }, [trackEvent]);

  const trackTemplateDownload = useCallback((templateId: string, templateName: string) => {
    trackEvent('template_downloaded', 'content', {
      template_id: templateId,
      template_name: templateName
    });
  }, [trackEvent]);

  const trackSubscriptionEvent = useCallback((eventType: string, planId?: string) => {
    trackEvent('subscription_event', 'subscription', {
      subscription_event_type: eventType,
      plan_id: planId
    });
  }, [trackEvent]);

  const trackSearchQuery = useCallback((query: string, resultsCount: number) => {
    trackEvent('search_performed', 'engagement', {
      search_query: query,
      results_count: resultsCount
    });
  }, [trackEvent]);

  const trackReviewSubmission = useCallback((toolId: string, rating: number) => {
    trackEvent('review_submitted', 'engagement', {
      tool_id: toolId,
      rating
    });
  }, [trackEvent]);

  const trackIntegrationUsage = useCallback((integrationType: string, action: string) => {
    trackEvent('integration_used', 'feature', {
      integration_type: integrationType,
      action
    });
  }, [trackEvent]);

  return {
    trackEvent,
    trackPageView,
    trackToolView,
    trackQuestionnaireComplete,
    trackRoadmapGeneration,
    trackTemplateDownload,
    trackSubscriptionEvent,
    trackSearchQuery,
    trackReviewSubmission,
    trackIntegrationUsage
  };
};