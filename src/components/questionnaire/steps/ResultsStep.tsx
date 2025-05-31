
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Download, Share2, RefreshCw } from "lucide-react";
import { useQuestionnaire } from "../QuestionnaireContext";
import { Link } from "react-router-dom";

const ResultsStep = () => {
  const { state } = useQuestionnaire();
  const { answers } = state;

  // Mock AI tool recommendations based on answers
  const generateRecommendations = () => {
    const recommendations = [];
    
    if (answers.interests?.includes('content-creation')) {
      recommendations.push({
        name: 'Jasper AI',
        category: 'Content Creation',
        description: 'AI-powered writing assistant for marketing content',
        pricing: 'Starts at $49/month',
        match: '95%'
      });
    }
    
    if (answers.projectType === 'business') {
      recommendations.push({
        name: 'Zapier',
        category: 'Business Automation',
        description: 'Connect and automate workflows between apps',
        pricing: 'Free tier available',
        match: '90%'
      });
    }

    if (answers.interests?.includes('design-creative')) {
      recommendations.push({
        name: 'Midjourney',
        category: 'AI Image Generation',
        description: 'Create stunning images with AI prompts',
        pricing: 'Starts at $10/month',
        match: '88%'
      });
    }

    // Add default recommendations if none specific
    if (recommendations.length === 0) {
      recommendations.push(
        {
          name: 'ChatGPT',
          category: 'General AI Assistant',
          description: 'Versatile AI for various tasks and conversations',
          pricing: 'Free tier available',
          match: '85%'
        },
        {
          name: 'Notion AI',
          category: 'Productivity',
          description: 'AI-powered workspace for notes and planning',
          pricing: 'Starts at $8/month',
          match: '82%'
        }
      );
    }

    return recommendations;
  };

  const recommendations = generateRecommendations();

  return (
    <div className="space-y-6">
      {/* Success Header */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardContent className="pt-6">
          <div className="flex items-center justify-center text-center">
            <div>
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Your AI Tool Recommendations Are Ready!
              </h2>
              <p className="text-gray-600">
                Based on your responses, we've found {recommendations.length} AI tools that match your needs.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <div className="space-y-4">
        {recommendations.map((tool, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-semibold">{tool.name}</h3>
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                      {tool.match} match
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mb-2">{tool.category}</p>
                  <p className="text-gray-700 mb-3">{tool.description}</p>
                  <p className="text-sm font-medium text-purple-600">{tool.pricing}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" className="bg-gradient-to-r from-purple-600 to-blue-600">
                  Learn More
                </Button>
                <Button size="sm" variant="outline">
                  Try Free
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Actions */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600">
              <Download className="mr-2 h-4 w-4" />
              Download Report
            </Button>
            <Button variant="outline">
              <Share2 className="mr-2 h-4 w-4" />
              Share Results
            </Button>
            <Button variant="outline">
              <RefreshCw className="mr-2 h-4 w-4" />
              Retake Quiz
            </Button>
          </div>
          <div className="text-center mt-4">
            <Link to="/">
              <Button variant="ghost">
                Back to Home
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResultsStep;
