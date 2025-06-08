
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
  Zap,
  BookOpen,
  Target,
  Loader2,
  Brain,
  X
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  toolSuggestions?: string[];
  suggestedActions?: string[];
}

export const EnhancedChatbot = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: '¡Hola! Soy tu asistente de IA especializado en herramientas tecnológicas. Puedo ayudarte con recomendaciones personalizadas, generar roadmaps, analizar herramientas y mucho más. ¿En qué puedo ayudarte hoy?',
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(true);
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
    const currentInput = inputValue;
    setInputValue('');
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('ai-chat-assistant', {
        body: {
          message: currentInput,
          conversationHistory: messages.slice(-5), // Últimos 5 mensajes para contexto
          userContext: user ? {
            userId: user.id,
            email: user.email
          } : null
        }
      });

      if (error) {
        setIsConnected(false);
        throw error;
      }

      setIsConnected(true);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.message,
        timestamp: new Date(),
        toolSuggestions: data.toolSuggestions,
        suggestedActions: data.suggestedActions,
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      setIsConnected(false);
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Lo siento, hubo un error al procesar tu consulta. Por favor, intenta de nuevo. Verifica que las APIs estén configuradas correctamente en los secretos de Supabase.',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickActions = [
    { 
      icon: Target, 
      label: 'Generar Roadmap', 
      action: () => setInputValue('Necesito un roadmap personalizado para mi proyecto de IA')
    },
    { 
      icon: BookOpen, 
      label: 'Recomendar Herramientas', 
      action: () => setInputValue('¿Qué herramientas me recomiendas para mi proyecto?')
    },
    { 
      icon: Zap, 
      label: 'Comparar Opciones', 
      action: () => setInputValue('Compara las mejores opciones para automatización')
    },
    { 
      icon: Brain, 
      label: 'Análisis IA', 
      action: () => setInputValue('Analiza mi perfil y recomienda herramientas de IA')
    },
  ];

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          className="rounded-full w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-xl relative group"
        >
          <MessageCircle className="w-6 h-6" />
          {/* Pulso de notificación */}
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-pulse" />
          {/* Tooltip */}
          <div className="absolute bottom-full right-0 mb-2 hidden group-hover:block">
            <div className="bg-black text-white text-xs rounded py-1 px-2 whitespace-nowrap">
              Asistente IA
            </div>
          </div>
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
              <Brain className="w-5 h-5" />
              <CardTitle className="text-lg">Asistente IA</CardTitle>
              <div className="flex gap-1">
                <Badge variant="secondary" className="bg-white/20 text-white">
                  <Sparkles className="w-3 h-3 mr-1" />
                  Claude
                </Badge>
                {isConnected ? (
                  <Badge variant="secondary" className="bg-green-500/20 text-white">
                    ●  Online
                  </Badge>
                ) : (
                  <Badge variant="secondary" className="bg-red-500/20 text-white">
                    ●  Offline
                  </Badge>
                )}
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          {/* Quick Actions */}
          <div className="p-4 border-b bg-gradient-to-r from-purple-50 to-blue-50">
            <p className="text-xs text-gray-600 mb-2 font-medium">Acciones rápidas:</p>
            <div className="grid grid-cols-2 gap-2">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={action.action}
                  className="text-xs h-8 justify-start"
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
                    <AvatarFallback className="bg-gradient-to-r from-purple-100 to-blue-100">
                      <Brain className="w-4 h-4 text-purple-600" />
                    </AvatarFallback>
                  </Avatar>
                )}
                
                <div className={`max-w-[75%] ${message.role === 'user' ? 'order-first' : ''}`}>
                  <div
                    className={`p-3 rounded-lg ${
                      message.role === 'user'
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                        : 'bg-gray-100 text-gray-900 border'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</p>
                  </div>
                  
                  {message.toolSuggestions && message.toolSuggestions.length > 0 && (
                    <div className="mt-2 space-y-1">
                      <p className="text-xs text-gray-600 font-medium">Herramientas mencionadas:</p>
                      <div className="flex flex-wrap gap-1">
                        {message.toolSuggestions.map((tool, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tool}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {message.suggestedActions && message.suggestedActions.length > 0 && (
                    <div className="mt-2 space-y-1">
                      <p className="text-xs text-gray-600 font-medium">Acciones sugeridas:</p>
                      <div className="flex flex-wrap gap-1">
                        {message.suggestedActions.map((action, index) => (
                          <Button key={index} size="sm" variant="outline" className="text-xs h-6">
                            {action === 'generate_roadmap' && 'Generar Roadmap'}
                            {action === 'compare_tools' && 'Comparar Herramientas'}
                            {action === 'get_recommendations' && 'Ver Recomendaciones'}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <p className="text-xs text-gray-500 mt-1">
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>

                {message.role === 'user' && (
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-gradient-to-r from-blue-100 to-purple-100">
                      <User className="w-4 h-4 text-blue-600" />
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
            
            {isLoading && (
              <div className="flex gap-3">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-gradient-to-r from-purple-100 to-blue-100">
                    <Brain className="w-4 h-4 text-purple-600" />
                  </AvatarFallback>
                </Avatar>
                <div className="bg-gray-100 p-3 rounded-lg border">
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-purple-600" />
                    <span className="text-sm text-gray-600">Procesando con IA...</span>
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
                placeholder={isConnected ? "Pregúntame sobre cualquier herramienta..." : "Conectando..."}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                disabled={isLoading || !isConnected}
                className="flex-1"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isLoading || !isConnected}
                size="sm"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </Button>
            </div>
            {!isConnected && (
              <p className="text-xs text-red-500 mt-1">
                Sin conexión. Verifica la configuración de la API.
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
