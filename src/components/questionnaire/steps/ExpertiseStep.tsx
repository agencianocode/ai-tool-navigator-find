
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useQuestionnaire } from "../QuestionnaireContext";

const ExpertiseStep = () => {
  const { state, dispatch } = useQuestionnaire();
  const { answers } = state;

  const setAnswer = (key: string, value: any) => {
    dispatch({ type: 'SET_ANSWER', payload: { key, value } });
  };

  const expertiseLevels = [
    {
      id: 'no-code',
      title: 'Solo soluciones sin código',
      description: 'Prefiero interfaces de arrastrar y soltar y configuración simple'
    },
    {
      id: 'low-code',
      title: 'Soluciones de bajo código',
      description: 'Puedo manejar algo de configuración pero prefiero codificación mínima'
    },
    {
      id: 'some-coding',
      title: 'Algo de código está bien',
      description: 'Puedo seguir tutoriales y hacer tareas básicas de programación'
    },
    {
      id: 'technical',
      title: 'Soluciones técnicas bienvenidas',
      description: 'Me siento cómodo con APIs, integraciones y código personalizado'
    },
    {
      id: 'developer',
      title: 'Nivel desarrollador',
      description: 'Puedo construir soluciones personalizadas y manejar integraciones complejas'
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Preferencia de experiencia técnica</CardTitle>
      </CardHeader>
      <CardContent>
        <Label className="text-base font-medium mb-4 block">
          ¿Con qué nivel de complejidad técnica te sientes cómodo?
        </Label>
        <RadioGroup
          value={answers.technicalExpertise || ''}
          onValueChange={(value) => setAnswer('technicalExpertise', value)}
          className="space-y-4"
        >
          {expertiseLevels.map((level) => (
            <div key={level.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-start space-x-3">
                <RadioGroupItem value={level.id} id={level.id} className="mt-1" />
                <div className="flex-1">
                  <Label htmlFor={level.id} className="text-base font-medium cursor-pointer">
                    {level.title}
                  </Label>
                  <p className="text-sm text-gray-600 mt-1">{level.description}</p>
                </div>
              </div>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
    </Card>
  );
};

export default ExpertiseStep;
