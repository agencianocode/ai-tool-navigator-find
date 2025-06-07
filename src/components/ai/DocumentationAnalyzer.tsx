
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  FileText, 
  Search, 
  Brain, 
  CheckCircle, 
  AlertCircle,
  TrendingUp,
  Clock,
  Users
} from "lucide-react";

interface AnalysisResult {
  toolName: string;
  complexity: 'beginner' | 'intermediate' | 'advanced';
  learningTime: string;
  keyFeatures: string[];
  pros: string[];
  cons: string[];
  useCases: string[];
  alternatives: string[];
  score: number;
}

export const DocumentationAnalyzer = () => {
  const [url, setUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [progress, setProgress] = useState(0);

  const analyzeDocumentation = async () => {
    if (!url.trim()) return;

    setIsAnalyzing(true);
    setProgress(0);
    setAnalysisResult(null);

    // Simulate analysis progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 10;
      });
    }, 200);

    try {
      // Simulate AI analysis (in real implementation, call your AI service)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock analysis result
      const mockResult: AnalysisResult = {
        toolName: url.includes('notion') ? 'Notion' : 
                  url.includes('figma') ? 'Figma' : 
                  url.includes('openai') ? 'OpenAI API' : 'Herramienta Analizada',
        complexity: 'intermediate',
        learningTime: '2-3 semanas',
        keyFeatures: [
          'API RESTful completa',
          'Documentación interactiva',
          'Ejemplos de código',
          'SDK en múltiples lenguajes',
          'Autenticación robusta'
        ],
        pros: [
          'Documentación muy completa',
          'Ejemplos prácticos abundantes',
          'Comunidad activa',
          'Soporte técnico responsivo'
        ],
        cons: [
          'Curva de aprendizaje pronunciada',
          'Algunos conceptos complejos',
          'Pricing puede ser elevado para uso intensivo'
        ],
        useCases: [
          'Automatización de flujos de trabajo',
          'Integración con sistemas existentes',
          'Desarrollo de aplicaciones personalizadas',
          'Análisis de datos en tiempo real'
        ],
        alternatives: [
          'Zapier (más simple)',
          'Make.com (visual)',
          'Microsoft Power Automate (enterprise)'
        ],
        score: 8.5
      };

      setProgress(100);
      setAnalysisResult(mockResult);
    } catch (error) {
      console.error('Error analyzing documentation:', error);
    } finally {
      setIsAnalyzing(false);
      clearInterval(progressInterval);
    }
  };

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-600';
    if (score >= 6) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="w-6 h-6 text-purple-600" />
          Analizador de Documentación IA
        </CardTitle>
        <p className="text-gray-600">
          Analiza automáticamente la documentación de cualquier herramienta para obtener insights profundos
        </p>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* URL Input */}
        <div className="flex gap-2">
          <Input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://docs.ejemplo.com o URL de documentación..."
            className="flex-1"
          />
          <Button 
            onClick={analyzeDocumentation}
            disabled={!url.trim() || isAnalyzing}
          >
            <Search className="w-4 h-4 mr-2" />
            Analizar
          </Button>
        </div>

        {/* Progress */}
        {isAnalyzing && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Analizando documentación...</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="w-full" />
            <div className="text-xs text-gray-500">
              {progress < 30 && "Escaneando estructura de documentación..."}
              {progress >= 30 && progress < 60 && "Analizando contenido con IA..."}
              {progress >= 60 && progress < 90 && "Generando insights y recomendaciones..."}
              {progress >= 90 && "Finalizando análisis..."}
            </div>
          </div>
        )}

        {/* Analysis Results */}
        {analysisResult && (
          <div className="space-y-6">
            {/* Header with Score */}
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
              <div>
                <h3 className="text-xl font-bold">{analysisResult.toolName}</h3>
                <div className="flex items-center gap-4 mt-2">
                  <Badge className={getComplexityColor(analysisResult.complexity)}>
                    {analysisResult.complexity}
                  </Badge>
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Clock className="w-4 h-4" />
                    {analysisResult.learningTime}
                  </div>
                </div>
              </div>
              <div className="text-center">
                <div className={`text-3xl font-bold ${getScoreColor(analysisResult.score)}`}>
                  {analysisResult.score}/10
                </div>
                <div className="text-sm text-gray-600">Puntuación IA</div>
              </div>
            </div>

            {/* Key Features */}
            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                Características Principales
              </h4>
              <div className="grid md:grid-cols-2 gap-2">
                {analysisResult.keyFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 bg-blue-50 rounded">
                    <CheckCircle className="w-4 h-4 text-blue-600" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pros and Cons */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2 text-green-700">
                  <CheckCircle className="w-5 h-5" />
                  Ventajas
                </h4>
                <ul className="space-y-2">
                  {analysisResult.pros.map((pro, index) => (
                    <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      {pro}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2 text-red-700">
                  <AlertCircle className="w-5 h-5" />
                  Desventajas
                </h4>
                <ul className="space-y-2">
                  {analysisResult.cons.map((con, index) => (
                    <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                      {con}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Use Cases */}
            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-purple-600" />
                Casos de Uso Ideales
              </h4>
              <div className="grid md:grid-cols-2 gap-2">
                {analysisResult.useCases.map((useCase, index) => (
                  <Badge key={index} variant="outline" className="justify-start p-2">
                    {useCase}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Alternatives */}
            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Users className="w-5 h-5 text-orange-600" />
                Alternativas Recomendadas
              </h4>
              <div className="flex flex-wrap gap-2">
                {analysisResult.alternatives.map((alt, index) => (
                  <Badge key={index} variant="secondary">
                    {alt}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 pt-4 border-t">
              <Button variant="default">
                Ver Herramienta Completa
              </Button>
              <Button variant="outline">
                Generar Roadmap
              </Button>
              <Button variant="outline">
                Comparar Alternativas
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
