
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useQuestionnaire } from "../QuestionnaireContext";

const TimelineStep = () => {
  const { state, dispatch } = useQuestionnaire();
  const { answers } = state;

  const setAnswer = (key: string, value: any) => {
    dispatch({ type: 'SET_ANSWER', payload: { key, value } });
  };

  const timelines = [
    { id: 'immediate', label: 'Inmediatamente (en días)' },
    { id: 'weeks', label: 'En unas pocas semanas' },
    { id: 'months', label: 'En unos pocos meses' },
    { id: 'flexible', label: 'Sin cronograma específico' }
  ];

  const urgencies = [
    { id: 'critical', label: 'Crítico - Necesito solución URGENTE' },
    { id: 'important', label: 'Importante - Alta prioridad' },
    { id: 'moderate', label: 'Moderado - Puedo esperar por la solución correcta' },
    { id: 'low', label: 'Bajo - Solo estoy explorando opciones' }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cronograma y urgencia</CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Timeline */}
        <div>
          <Label className="text-base font-medium mb-4 block">
            ¿Cuándo necesitas implementar estas herramientas?
          </Label>
          <RadioGroup
            value={answers.timeline || ''}
            onValueChange={(value) => setAnswer('timeline', value)}
            className="space-y-3"
          >
            {timelines.map((timeline) => (
              <div key={timeline.id} className="flex items-center space-x-2">
                <RadioGroupItem value={timeline.id} id={timeline.id} />
                <Label htmlFor={timeline.id}>{timeline.label}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        {/* Urgency */}
        <div>
          <Label className="text-base font-medium mb-4 block">
            ¿Qué tan urgente es este proyecto para ti?
          </Label>
          <RadioGroup
            value={answers.urgency || ''}
            onValueChange={(value) => setAnswer('urgency', value)}
            className="space-y-3"
          >
            {urgencies.map((urgency) => (
              <div key={urgency.id} className="flex items-center space-x-2">
                <RadioGroupItem value={urgency.id} id={urgency.id} />
                <Label htmlFor={urgency.id}>{urgency.label}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      </CardContent>
    </Card>
  );
};

export default TimelineStep;
