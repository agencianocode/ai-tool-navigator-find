
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, RefreshCw, Loader2, Clock, CheckCircle, AlertTriangle } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";
import { generateRoadmap } from "@/utils/roadmapGenerator";
import { useToast } from "@/hooks/use-toast";

interface RoadmapPhase {
  id: number;
  title: string;
  duration: string;
  status: 'upcoming' | 'current' | 'completed';
  tasks: string[];
  tools: string[];
  insights: string;
  challenges: string[];
  resources: string[];
}

const Roadmap = () => {
  const location = useLocation();
  const { toast } = useToast();
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [selectedTools, setSelectedTools] = useState<any[]>([]);
  const [roadmap, setRoadmap] = useState<RoadmapPhase[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [expandedPhases, setExpandedPhases] = useState<number[]>([1]);

  useEffect(() => {
    // Get data from location state or localStorage
    const answersFromState = location.state?.answers;
    const toolsFromState = location.state?.selectedTools;
    const answersFromStorage = localStorage.getItem('questionnaireAnswers');
    const toolsFromStorage = localStorage.getItem('selectedTools');
    
    if (answersFromState) {
      setAnswers(answersFromState);
    } else if (answersFromStorage) {
      setAnswers(JSON.parse(answersFromStorage));
    }

    if (toolsFromState) {
      setSelectedTools(toolsFromState);
    } else if (toolsFromStorage) {
      setSelectedTools(JSON.parse(toolsFromStorage));
    }
  }, [location]);

  useEffect(() => {
    if (Object.keys(answers).length > 0 && selectedTools.length > 0) {
      generateInitialRoadmap();
    }
  }, [answers, selectedTools]);

  const generateInitialRoadmap = async () => {
    setIsGenerating(true);
    try {
      const generatedRoadmap = await generateRoadmap(answers, selectedTools);
      setRoadmap(generatedRoadmap);
    } catch (error) {
      console.error('Error generating roadmap:', error);
      toast({
        title: "Error",
        description: "Failed to generate roadmap. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRegenerateRoadmap = async () => {
    setIsGenerating(true);
    try {
      const generatedRoadmap = await generateRoadmap(answers, selectedTools, true);
      setRoadmap(generatedRoadmap);
      toast({
        title: "Success",
        description: "Alternative roadmap generated successfully!",
      });
    } catch (error) {
      console.error('Error regenerating roadmap:', error);
      toast({
        title: "Error",
        description: "Failed to generate alternative roadmap. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const togglePhase = (phaseId: number) => {
    setExpandedPhases(prev => 
      prev.includes(phaseId) 
        ? prev.filter(id => id !== phaseId)
        : [...prev, phaseId]
    );
  };

  const getPhaseIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-6 w-6 text-green-500" />;
      case 'current':
        return <Clock className="h-6 w-6 text-blue-500" />;
      default:
        return <div className="h-6 w-6 rounded-full border-2 border-gray-300" />;
    }
  };

  const getPhaseColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'border-green-500 bg-green-50';
      case 'current':
        return 'border-blue-500 bg-blue-50';
      default:
        return 'border-gray-300 bg-gray-50';
    }
  };

  if (isGenerating && roadmap.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <Card className="w-full max-w-md">
              <CardContent className="pt-6">
                <div className="text-center">
                  <Loader2 className="h-16 w-16 text-purple-600 mx-auto mb-4 animate-spin" />
                  <h2 className="text-xl font-bold text-gray-900 mb-2">
                    Generating Your Personalized Roadmap
                  </h2>
                  <p className="text-gray-600">
                    Our AI is analyzing your responses and creating a tailored implementation plan...
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link to="/results">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Results
            </Button>
          </Link>
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Your Personalized AI Implementation Roadmap
              </h1>
              <p className="text-gray-600">
                A 12-week step-by-step plan tailored to your project and selected tools
              </p>
            </div>
            <div className="flex gap-2">
              <Button 
                onClick={handleRegenerateRoadmap}
                disabled={isGenerating}
                variant="outline"
              >
                {isGenerating ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <RefreshCw className="mr-2 h-4 w-4" />
                )}
                Generate Alternative Plan
              </Button>
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600">
                <Download className="mr-2 h-4 w-4" />
                Export Roadmap
              </Button>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="space-y-6">
          {roadmap.map((phase, index) => (
            <div key={phase.id} className="relative">
              {/* Timeline Line */}
              {index !== roadmap.length - 1 && (
                <div className="absolute left-6 top-16 w-0.5 h-full bg-gray-300 z-0"></div>
              )}
              
              <Card className={`relative z-10 ${getPhaseColor(phase.status)} border-l-4`}>
                <Collapsible 
                  open={expandedPhases.includes(phase.id)} 
                  onOpenChange={() => togglePhase(phase.id)}
                >
                  <CollapsibleTrigger asChild>
                    <CardHeader className="cursor-pointer hover:bg-white/50 transition-colors">
                      <div className="flex items-center gap-4">
                        {getPhaseIcon(phase.status)}
                        <div className="flex-1">
                          <CardTitle className="flex items-center justify-between">
                            <span>{phase.title}</span>
                            <Badge variant="outline">{phase.duration}</Badge>
                          </CardTitle>
                          <p className="text-sm text-gray-600 mt-1">
                            Click to expand details and view AI-generated insights
                          </p>
                        </div>
                      </div>
                    </CardHeader>
                  </CollapsibleTrigger>
                  
                  <CollapsibleContent>
                    <CardContent className="pt-0">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Tasks */}
                        <div>
                          <h4 className="text-sm font-semibold text-gray-900 mb-3">Key Tasks</h4>
                          <ul className="space-y-2">
                            {phase.tasks.map((task, idx) => (
                              <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                                <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                                {task}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Tools */}
                        <div>
                          <h4 className="text-sm font-semibold text-gray-900 mb-3">Tools to Implement</h4>
                          <div className="flex flex-wrap gap-2">
                            {phase.tools.map((tool, idx) => (
                              <Badge key={idx} variant="secondary">{tool}</Badge>
                            ))}
                          </div>
                        </div>

                        {/* AI Insights */}
                        <div className="lg:col-span-2">
                          <h4 className="text-sm font-semibold text-gray-900 mb-3">AI-Generated Insights</h4>
                          <p className="text-sm text-gray-700 bg-white/70 p-3 rounded-lg border">
                            {phase.insights}
                          </p>
                        </div>

                        {/* Challenges */}
                        <div>
                          <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                            <AlertTriangle className="h-4 w-4 text-yellow-500" />
                            Potential Challenges
                          </h4>
                          <ul className="space-y-1">
                            {phase.challenges.map((challenge, idx) => (
                              <li key={idx} className="text-sm text-gray-700">• {challenge}</li>
                            ))}
                          </ul>
                        </div>

                        {/* Resources */}
                        <div>
                          <h4 className="text-sm font-semibold text-gray-900 mb-3">Recommended Resources</h4>
                          <ul className="space-y-1">
                            {phase.resources.map((resource, idx) => (
                              <li key={idx} className="text-sm text-blue-600 hover:underline cursor-pointer">
                                • {resource}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </CollapsibleContent>
                </Collapsible>
              </Card>
            </div>
          ))}
        </div>

        {/* Footer Actions */}
        <Card className="mt-8">
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">Ready to get started?</h3>
              <p className="text-gray-600 mb-4">
                This roadmap is personalized based on your responses. Adjust as needed for your specific requirements.
              </p>
              <div className="flex justify-center gap-4">
                <Link to="/results">
                  <Button variant="outline">View Tool Details</Button>
                </Link>
                <Link to="/questionnaire">
                  <Button variant="outline">Retake Assessment</Button>
                </Link>
                <Link to="/">
                  <Button variant="ghost">Back to Home</Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Roadmap;
