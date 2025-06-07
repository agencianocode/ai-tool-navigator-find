
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Code, Key, Book, Copy, CheckCircle, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const PublicAPISection = () => {
  const { toast } = useToast();
  const [apiKey, setApiKey] = useState("");
  const [selectedEndpoint, setSelectedEndpoint] = useState("tools");

  const generateApiKey = () => {
    const key = `aita_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;
    setApiKey(key);
    toast({
      title: "API Key Generada",
      description: "Tu nueva API key está lista para usar. Guárdala en un lugar seguro.",
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copiado",
      description: "Código copiado al portapapeles",
    });
  };

  const apiEndpoints = [
    {
      id: "tools",
      name: "Herramientas",
      method: "GET",
      endpoint: "/api/v1/tools",
      description: "Obtener lista de herramientas de IA"
    },
    {
      id: "evaluate",
      name: "Evaluar",
      method: "POST",
      endpoint: "/api/v1/evaluate",
      description: "Evaluar herramientas para un proyecto"
    },
    {
      id: "roadmap",
      name: "Roadmap",
      method: "POST",
      endpoint: "/api/v1/roadmap",
      description: "Generar hoja de ruta personalizada"
    },
    {
      id: "compare",
      name: "Comparar",
      method: "POST",
      endpoint: "/api/v1/compare",
      description: "Comparar múltiples herramientas"
    }
  ];

  const codeExamples = {
    javascript: {
      tools: `// Obtener herramientas
const response = await fetch('https://api.aitoolsadvisor.com/api/v1/tools', {
  headers: {
    'Authorization': 'Bearer ${apiKey}',
    'Content-Type': 'application/json'
  }
});
const tools = await response.json();`,
      evaluate: `// Evaluar herramientas para un proyecto
const response = await fetch('https://api.aitoolsadvisor.com/api/v1/evaluate', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer ${apiKey}',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    project_type: "web_development",
    budget_range: "low",
    team_size: "small",
    requirements: ["automation", "design", "content"]
  })
});
const evaluation = await response.json();`
    },
    python: {
      tools: `import requests

# Obtener herramientas
headers = {
    'Authorization': f'Bearer ${apiKey}',
    'Content-Type': 'application/json'
}

response = requests.get(
    'https://api.aitoolsadvisor.com/api/v1/tools',
    headers=headers
)
tools = response.json()`,
      evaluate: `import requests

# Evaluar herramientas para un proyecto
headers = {
    'Authorization': f'Bearer ${apiKey}',
    'Content-Type': 'application/json'
}

data = {
    "project_type": "web_development",
    "budget_range": "low", 
    "team_size": "small",
    "requirements": ["automation", "design", "content"]
}

response = requests.post(
    'https://api.aitoolsadvisor.com/api/v1/evaluate',
    headers=headers,
    json=data
)
evaluation = response.json()`
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Code className="h-5 w-5" />
          API Pública RESTful
        </CardTitle>
        <p className="text-sm text-gray-600">
          Integra nuestra plataforma en tus aplicaciones con nuestra API RESTful
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* API Key Generation */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-medium">API Key</h4>
            <Badge variant={apiKey ? "default" : "secondary"}>
              {apiKey ? "Generada" : "No generada"}
            </Badge>
          </div>
          
          <div className="flex gap-2">
            <Input
              value={apiKey}
              placeholder="Genera una API key para comenzar"
              readOnly
              className="font-mono text-sm"
            />
            <Button onClick={generateApiKey} variant="outline">
              <Key className="w-4 h-4 mr-2" />
              Generar
            </Button>
          </div>
          
          {apiKey && (
            <p className="text-xs text-amber-600 bg-amber-50 p-2 rounded">
              ⚠️ Guarda esta API key en un lugar seguro. No la compartas públicamente.
            </p>
          )}
        </div>

        <Tabs defaultValue="endpoints" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="endpoints">Endpoints</TabsTrigger>
            <TabsTrigger value="examples">Ejemplos</TabsTrigger>
            <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
          </TabsList>

          <TabsContent value="endpoints" className="space-y-4">
            <div className="space-y-3">
              {apiEndpoints.map((endpoint) => (
                <div key={endpoint.id} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Badge variant={endpoint.method === "GET" ? "default" : "secondary"}>
                        {endpoint.method}
                      </Badge>
                      <code className="text-sm font-mono">{endpoint.endpoint}</code>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setSelectedEndpoint(endpoint.id)}
                    >
                      Ver Ejemplo
                    </Button>
                  </div>
                  <p className="text-sm text-gray-600">{endpoint.description}</p>
                </div>
              ))}
            </div>

            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">Base URL</h4>
              <code className="text-sm bg-blue-100 px-2 py-1 rounded">
                https://api.aitoolsadvisor.com
              </code>
            </div>
          </TabsContent>

          <TabsContent value="examples" className="space-y-4">
            <div className="space-y-4">
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant={selectedEndpoint === "tools" ? "default" : "outline"}
                  onClick={() => setSelectedEndpoint("tools")}
                >
                  GET Tools
                </Button>
                <Button
                  size="sm"
                  variant={selectedEndpoint === "evaluate" ? "default" : "outline"}
                  onClick={() => setSelectedEndpoint("evaluate")}
                >
                  POST Evaluate
                </Button>
              </div>

              <Tabs defaultValue="javascript" className="w-full">
                <TabsList>
                  <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                  <TabsTrigger value="python">Python</TabsTrigger>
                </TabsList>

                <TabsContent value="javascript">
                  <div className="relative">
                    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                      <code>{codeExamples.javascript[selectedEndpoint as keyof typeof codeExamples.javascript]}</code>
                    </pre>
                    <Button
                      size="sm"
                      variant="outline"
                      className="absolute top-2 right-2"
                      onClick={() => copyToClipboard(codeExamples.javascript[selectedEndpoint as keyof typeof codeExamples.javascript])}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="python">
                  <div className="relative">
                    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                      <code>{codeExamples.python[selectedEndpoint as keyof typeof codeExamples.python]}</code>
                    </pre>
                    <Button
                      size="sm"
                      variant="outline"
                      className="absolute top-2 right-2"
                      onClick={() => copyToClipboard(codeExamples.python[selectedEndpoint as keyof typeof codeExamples.python])}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </TabsContent>

          <TabsContent value="webhooks" className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-3">Webhooks Disponibles</h4>
              <div className="space-y-2 text-sm">
                <div><code>evaluation.completed</code> - Se dispara cuando se completa una evaluación</div>
                <div><code>roadmap.generated</code> - Se dispara cuando se genera una hoja de ruta</div>
                <div><code>tool.reviewed</code> - Se dispara cuando se añade una nueva reseña</div>
                <div><code>budget.calculated</code> - Se dispara cuando se calcula un presupuesto</div>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">Ejemplo de Payload de Webhook</h4>
              <pre className="bg-gray-900 text-gray-100 p-3 rounded text-xs overflow-x-auto">
{`{
  "event": "evaluation.completed",
  "timestamp": "2024-01-15T10:30:00Z",
  "data": {
    "evaluation_id": "eval_123",
    "project_type": "web_development",
    "recommended_tools": [
      {
        "name": "ChatGPT",
        "category": "AI Writing",
        "score": 9.2
      }
    ],
    "total_budget": 150,
    "implementation_time": "4 weeks"
  }
}`}
              </pre>
            </div>
          </TabsContent>
        </Tabs>

        {/* Rate Limits */}
        <div className="p-4 bg-yellow-50 rounded-lg">
          <h4 className="font-medium text-yellow-900 mb-2">Límites de Velocidad</h4>
          <div className="text-sm text-yellow-800 space-y-1">
            <div><strong>Plan Gratuito:</strong> 100 requests/hora</div>
            <div><strong>Plan Pro:</strong> 1,000 requests/hora</div>
            <div><strong>Plan Enterprise:</strong> 10,000 requests/hora</div>
          </div>
        </div>

        {/* Documentation Link */}
        <div className="flex justify-center">
          <Button variant="outline" size="sm" asChild>
            <a 
              href="/api/docs" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <Book className="w-4 h-4" />
              Documentación Completa
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
