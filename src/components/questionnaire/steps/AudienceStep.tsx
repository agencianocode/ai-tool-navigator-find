
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useQuestionnaire } from "../QuestionnaireContext";

const AudienceStep = () => {
  const { state, dispatch } = useQuestionnaire();
  const { answers } = state;

  const setAnswer = (key: string, value: any) => {
    dispatch({ type: 'SET_ANSWER', payload: { key, value } });
  };

  const audiences = [
    { id: 'personal', label: 'Solo para mí (uso personal)' },
    { id: 'small-team', label: 'Equipo pequeño (2-10 personas)' },
    { id: 'company', label: 'Empresa/Organización (10+ personas)' },
    { id: 'public', label: 'Audiencia pública/clientes' },
    { id: 'students', label: 'Estudiantes/aprendices' }
  ];

  const scales = [
    { id: 'hobby', label: 'Hobby/Proyecto secundario' },
    { id: 'professional', label: 'Proyecto profesional/laboral' },
    { id: 'startup', label: 'Startup/Nuevo negocio' },
    { id: 'enterprise', label: 'Gran escala/Empresarial' }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>¿Cuál es tu audiencia objetivo y la escala del proyecto?</CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Target Audience */}
        <div>
          <Label className="text-base font-medium mb-4 block">
            ¿Quién usará o se beneficiará de este proyecto?
          </Label>
          <RadioGroup
            value={answers.targetAudience || ''}
            onValueChange={(value) => setAnswer('targetAudience', value)}
            className="space-y-3"
          >
            {audiences.map((audience) => (
              <div key={audience.id} className="flex items-center space-x-2">
                <RadioGroupItem value={audience.id} id={audience.id} />
                <Label htmlFor={audience.id}>{audience.label}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        {/* Project Scale */}
        <div>
          <Label className="text-base font-medium mb-4 block">
            ¿Cuál es la escala y alcance de tu proyecto?
          </Label>
          <RadioGroup
            value={answers.projectScale || ''}
            onValueChange={(value) => setAnswer('projectScale', value)}
            className="space-y-3"
          >
            {scales.map((scale) => (
              <div key={scale.id} className="flex items-center space-x-2">
                <RadioGroupItem value={scale.id} id={scale.id} />
                <Label htmlFor={scale.id}>{scale.label}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      </CardContent>
    </Card>
  );
};

export default AudienceStep;
