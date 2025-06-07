
import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface AIAnalysisResult {
  insights: string[];
  recommendations: string[];
  complexity: 'beginner' | 'intermediate' | 'advanced';
  score: number;
}

interface RoadmapGenerationOptions {
  projectType?: string;
  skillLevel?: string;
  timeline?: string;
  budget?: string;
  preferences?: string[];
}

export const useAIIntegration = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyzeToolDocumentation = useCallback(async (url: string): Promise<AIAnalysisResult | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.functions.invoke('analyze-documentation', {
        body: { url }
      });

      if (error) throw error;
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error analyzing documentation');
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const generatePersonalizedRoadmap = useCallback(async (
    tools: string[], 
    options: RoadmapGenerationOptions
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.functions.invoke('generate-personalized-roadmap', {
        body: { tools, options }
      });

      if (error) throw error;
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error generating roadmap');
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const askAIAssistant = useCallback(async (question: string, context?: any) => {
    setIsLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.functions.invoke('ai-assistant', {
        body: { question, context }
      });

      if (error) throw error;
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error processing question');
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const analyzeUserNeedsFromText = useCallback(async (description: string) => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate AI analysis for now
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const analysis = {
        detectedNeeds: ['automation', 'design', 'collaboration'],
        suggestedTools: ['Zapier', 'Figma', 'Slack'],
        complexityLevel: 'intermediate' as const,
        estimatedTimeline: '4-6 weeks',
        priorityAreas: ['workflow optimization', 'team communication']
      };

      return analysis;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error analyzing needs');
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    error,
    analyzeToolDocumentation,
    generatePersonalizedRoadmap,
    askAIAssistant,
    analyzeUserNeedsFromText,
  };
};
