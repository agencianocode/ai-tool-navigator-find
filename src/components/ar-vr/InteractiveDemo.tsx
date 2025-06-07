
import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Maximize, 
  Eye,
  Headphones,
  MousePointer,
  Smartphone
} from "lucide-react";

interface Demo3DProps {
  toolName: string;
  demoType: 'interface-tour' | 'architecture-3d' | 'workflow-demo';
}

export const InteractiveDemo = ({ toolName, demoType }: Demo3DProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [viewMode, setViewMode] = useState<'3d' | 'ar' | 'vr'>('3d');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const demoSteps = {
    'interface-tour': [
      { title: 'Dashboard Principal', description: 'Explora la vista general de la herramienta' },
      { title: 'Panel de Configuración', description: 'Configura tus preferencias' },
      { title: 'Área de Trabajo', description: 'Donde ocurre la magia' },
      { title: 'Opciones Avanzadas', description: 'Funcionalidades para expertos' }
    ],
    'architecture-3d': [
      { title: 'Vista General', description: 'Arquitectura completa del sistema' },
      { title: 'Componentes Core', description: 'Elementos fundamentales' },
      { title: 'Integraciones', description: 'Conexiones con otros sistemas' },
      { title: 'Flujo de Datos', description: 'Cómo se procesan los datos' }
    ],
    'workflow-demo': [
      { title: 'Inicio del Proceso', description: 'Configuración inicial' },
      { title: 'Procesamiento', description: 'Ejecución del workflow' },
      { title: 'Validación', description: 'Verificación de resultados' },
      { title: 'Finalización', description: 'Entrega del resultado final' }
    ]
  };

  const steps = demoSteps[demoType];

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setCurrentStep(prev => (prev + 1) % steps.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isPlaying, steps.length]);

  useEffect(() => {
    // Initialize 3D scene (mock implementation)
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Simple animated 3D-like visualization
        const animate = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          
          // Background gradient
          const gradient = ctx.createRadialGradient(
            canvas.width / 2, canvas.height / 2, 0,
            canvas.width / 2, canvas.height / 2, canvas.width / 2
          );
          gradient.addColorStop(0, '#667eea');
          gradient.addColorStop(1, '#764ba2');
          ctx.fillStyle = gradient;
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          // Animated elements based on current step
          const time = Date.now() * 0.001;
          const stepProgress = (time % 3) / 3;
          
          // Draw floating elements
          for (let i = 0; i < 5; i++) {
            const x = canvas.width / 2 + Math.cos(time + i) * (50 + i * 20);
            const y = canvas.height / 2 + Math.sin(time + i) * (30 + i * 15);
            const size = 10 + Math.sin(time + i) * 5;
            
            ctx.beginPath();
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.fillStyle = `hsl(${200 + i * 30}, 70%, ${60 + stepProgress * 20}%)`;
            ctx.fill();
            
            // Add glow effect
            ctx.shadowColor = ctx.fillStyle;
            ctx.shadowBlur = 20;
            ctx.fill();
            ctx.shadowBlur = 0;
          }

          // Draw connecting lines
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
          ctx.lineWidth = 2;
          ctx.beginPath();
          for (let i = 0; i < 4; i++) {
            const x1 = canvas.width / 2 + Math.cos(time + i) * (50 + i * 20);
            const y1 = canvas.height / 2 + Math.sin(time + i) * (30 + i * 15);
            const x2 = canvas.width / 2 + Math.cos(time + i + 1) * (50 + (i + 1) * 20);
            const y2 = canvas.height / 2 + Math.sin(time + i + 1) * (30 + (i + 1) * 15);
            
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
          }
          ctx.stroke();

          if (isPlaying) {
            requestAnimationFrame(animate);
          }
        };
        
        if (isPlaying) {
          animate();
        }
      }
    }
  }, [isPlaying, currentStep]);

  const getDemoTitle = () => {
    switch (demoType) {
      case 'interface-tour': return `Tour Virtual: ${toolName}`;
      case 'architecture-3d': return `Arquitectura 3D: ${toolName}`;
      case 'workflow-demo': return `Demo Workflow: ${toolName}`;
      default: return `Demo Interactivo: ${toolName}`;
    }
  };

  const getViewModeIcon = () => {
    switch (viewMode) {
      case 'ar': return <Smartphone className="w-4 h-4" />;
      case 'vr': return <Headphones className="w-4 h-4" />;
      default: return <Eye className="w-4 h-4" />;
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Eye className="w-6 h-6 text-blue-600" />
            {getDemoTitle()}
          </CardTitle>
          <div className="flex gap-2">
            <Badge variant={viewMode === '3d' ? 'default' : 'outline'}>
              3D
            </Badge>
            <Badge variant={viewMode === 'ar' ? 'default' : 'outline'}>
              AR
            </Badge>
            <Badge variant={viewMode === 'vr' ? 'default' : 'outline'}>
              VR
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* 3D Canvas */}
        <div className={`relative bg-gradient-to-br from-purple-900 to-blue-900 rounded-lg overflow-hidden ${
          isFullscreen ? 'fixed inset-0 z-50' : 'h-64'
        }`}>
          <canvas
            ref={canvasRef}
            width={isFullscreen ? window.innerWidth : 400}
            height={isFullscreen ? window.innerHeight : 256}
            className="w-full h-full"
          />
          
          {/* Overlay Controls */}
          <div className="absolute top-4 right-4 flex gap-2">
            <Button
              size="sm"
              variant="secondary"
              onClick={() => setViewMode(viewMode === '3d' ? 'ar' : viewMode === 'ar' ? 'vr' : '3d')}
            >
              {getViewModeIcon()}
            </Button>
            <Button
              size="sm"
              variant="secondary"
              onClick={() => setIsFullscreen(!isFullscreen)}
            >
              <Maximize className="w-4 h-4" />
            </Button>
          </div>

          {/* Step Info Overlay */}
          <div className="absolute bottom-4 left-4 right-4 bg-black/50 backdrop-blur-sm rounded-lg p-3 text-white">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold">{steps[currentStep].title}</h4>
              <Badge variant="secondary">
                {currentStep + 1} / {steps.length}
              </Badge>
            </div>
            <p className="text-sm opacity-90">{steps[currentStep].description}</p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <Button
              size="sm"
              onClick={() => setIsPlaying(!isPlaying)}
              variant={isPlaying ? "secondary" : "default"}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              {isPlaying ? 'Pausar' : 'Reproducir'}
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                setCurrentStep(0);
                setIsPlaying(false);
              }}
            >
              <RotateCcw className="w-4 h-4" />
              Reiniciar
            </Button>
          </div>

          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              disabled={currentStep === 0}
            >
              Anterior
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
              disabled={currentStep === steps.length - 1}
            >
              Siguiente
            </Button>
          </div>
        </div>

        {/* Step Navigation */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {steps.map((step, index) => (
            <Button
              key={index}
              size="sm"
              variant={index === currentStep ? "default" : "outline"}
              onClick={() => setCurrentStep(index)}
              className="flex-shrink-0"
            >
              <span className="text-xs">{index + 1}</span>
            </Button>
          ))}
        </div>

        {/* Additional Info */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-sm">
          <div>
            <div className="font-semibold text-blue-600">Interactivo</div>
            <div className="text-gray-600">100%</div>
          </div>
          <div>
            <div className="font-semibold text-green-600">Duración</div>
            <div className="text-gray-600">{steps.length * 3}s</div>
          </div>
          <div>
            <div className="font-semibold text-purple-600">Pasos</div>
            <div className="text-gray-600">{steps.length}</div>
          </div>
          <div>
            <div className="font-semibold text-orange-600">Modo</div>
            <div className="text-gray-600 uppercase">{viewMode}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
