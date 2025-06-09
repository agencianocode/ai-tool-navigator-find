
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

      if (error) {
        console.error('Documentation analysis error:', error);
        throw error;
      }
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error analyzing documentation';
      console.error('Error in analyzeToolDocumentation:', errorMessage);
      setError(errorMessage);
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

      if (error) {
        console.error('Roadmap generation error:', error);
        throw error;
      }
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error generating roadmap';
      console.error('Error in generatePersonalizedRoadmap:', errorMessage);
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const askAIAssistant = useCallback(async (question: string, context?: any) => {
    setIsLoading(true);
    setError(null);

    try {
      console.log('Calling AI assistant with question:', question);
      
      const { data, error } = await supabase.functions.invoke('ai-chat-assistant', {
        body: { 
          message: question, 
          context,
          conversationHistory: [],
          userContext: context
        }
      });

      if (error) {
        console.error('AI assistant error:', error);
        throw new Error(error.message || 'Error calling AI assistant');
      }

      console.log('AI assistant response:', data);
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error processing question';
      console.error('Error in askAIAssistant:', errorMessage);
      setError(errorMessage);
      return {
        message: 'Lo siento, hubo un error al procesar tu consulta. Por favor, intenta de nuevo más tarde.',
        error: errorMessage
      };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const analyzeUserNeedsFromText = useCallback(async (description: string, answers: Record<string, any>) => {
    setIsLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.functions.invoke('analyze-user-needs', {
        body: { description, answers }
      });

      if (error) {
        console.error('User needs analysis error:', error);
        throw error;
      }
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error analyzing needs';
      console.error('Error in analyzeUserNeedsFromText:', errorMessage);
      setError(errorMessage);
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
