
import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  MessageCircle, 
  Send, 
  Bot, 
  User, 
  Sparkles,
  BookOpen,
  Zap,
  Target
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  toolSuggestions?: string[];
  roadmapGenerated?: boolean;
}

export const IntelligentChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: '¡Hola! Soy tu asistente de IA especializado en herramientas tecnológicas. Puedo ayudarte con recomendaciones, generar roadmaps personalizados, analizar documentación y mucho más. ¿En qué puedo ayudarte hoy?',
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Simulate AI response (in real implementation, call your AI service)
      const aiResponse = await generateAIResponse(inputValue);
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: aiResponse.content,
        timestamp: new Date(),
        toolSuggestions: aiResponse.toolSuggestions,
        roadmapGenerated: aiResponse.roadmapGenerated,
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error generating AI response:', error);
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Lo siento, hubo un error al procesar tu consulta. Por favor, intenta de nuevo.',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const generateAIResponse = async (prompt: string) => {
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Analyze prompt for specific intents
    const lowerPrompt = prompt.toLowerCase();
    
    if (lowerPrompt.includes('roadmap') || lowerPrompt.includes('plan')) {
      return {
        content: 'He generado un roadmap personalizado basado en tus necesidades. Te recomiendo comenzar con las herramientas básicas y luego avanzar gradualmente hacia soluciones más complejas.',
        toolSuggestions: ['ChatGPT', 'Notion', 'Zapier', 'Figma'],
        roadmapGenerated: true,
      };
    }

    if (lowerPrompt.includes('herramienta') || lowerPrompt.includes('tool')) {
      return {
        content: 'Basándome en tu consulta, te recomiendo estas herramientas que podrían ser perfectas para tu proyecto. Cada una tiene sus fortalezas específicas.',
        toolSuggestions: ['OpenAI GPT-4', 'Midjourney', 'Bubble', 'Webflow'],
      };
    }

    if (lowerPrompt.includes('presupuesto') || lowerPrompt.includes('precio')) {
      return {
        content: 'Entiendo que el presupuesto es importante. Te ayudo a encontrar opciones que se ajusten a tu rango de precios, incluyendo alternativas gratuitas y de bajo costo.',
        toolSuggestions: ['GitHub', 'Canva', 'Google Analytics', 'Slack'],
      };
    }

    // Default response
    return {
      content: 'Entiendo tu consulta. Para darte la mejor recomendación, ¿podrías contarme más sobre tu proyecto específico? Por ejemplo, ¿qué tipo de solución estás buscando crear?',
    };
  };

  const quickActions = [
    { icon: Target, label: 'Generar Roadmap', action: () => setInputValue('Necesito un roadmap personalizado para mi proyecto') },
    { icon: BookOpen, label: 'Analizar Herramienta', action: () => setInputValue('Analiza las características de') },
    { icon: Zap, label: 'Comparar Opciones', action: () => setInputValue('Compara las mejores opciones para') },
  ];

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          className="rounded-full w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-96 max-w-[calc(100vw-2rem)]">
      <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5" />
              <CardTitle className="text-lg">Asistente IA</CardTitle>
              <Badge variant="secondary" className="bg-white/20 text-white">
                <Sparkles className="w-3 h-3 mr-1" />
                GPT-4
              </Badge>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20"
            >
              ✕
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          {/* Quick Actions */}
          <div className="p-4 border-b bg-gray-50">
            <p className="text-xs text-gray-600 mb-2">Acciones rápidas:</p>
            <div className="flex gap-2 flex-wrap">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={action.action}
                  className="text-xs"
                >
                  <action.icon className="w-3 h-3 mr-1" />
                  {action.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Messages */}
          <div className="h-80 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.role === 'assistant' && (
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-purple-100">
                      <Bot className="w-4 h-4 text-purple-600" />
                    </AvatarFallback>
                  </Avatar>
                )}
                
                <div className={`max-w-[70%] ${message.role === 'user' ? 'order-first' : ''}`}>
                  <div
                    className={`p-3 rounded-lg ${
                      message.role === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                  </div>
                  
                  {message.toolSuggestions && (
                    <div className="mt-2 space-y-1">
                      <p className="text-xs text-gray-600">Herramientas sugeridas:</p>
                      <div className="flex flex-wrap gap-1">
                        {message.toolSuggestions.map((tool, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tool}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {message.roadmapGenerated && (
                    <div className="mt-2">
                      <Button size="sm" variant="outline" className="text-xs">
                        Ver Roadmap Completo
                      </Button>
                    </div>
                  )}
                  
                  <p className="text-xs text-gray-500 mt-1">
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>

                {message.role === 'user' && (
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-blue-100">
                      <User className="w-4 h-4 text-blue-600" />
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
            
            {isLoading && (
              <div className="flex gap-3">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-purple-100">
                    <Bot className="w-4 h-4 text-purple-600" />
                  </AvatarFallback>
                </Avatar>
                <div className="bg-gray-100 p-3 rounded-lg">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t bg-white">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Pregúntame sobre cualquier herramienta..."
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                disabled={isLoading}
                className="flex-1"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isLoading}
                size="sm"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
