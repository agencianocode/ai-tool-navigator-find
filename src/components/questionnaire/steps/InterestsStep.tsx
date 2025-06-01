
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useQuestionnaire } from "../QuestionnaireContext";

const InterestsStep = () => {
  const { state, dispatch } = useQuestionnaire();
  const { answers } = state;

  const setAnswer = (key: string, value: any) => {
    dispatch({ type: 'SET_ANSWER', payload: { key, value } });
  };

  const interests = [
    { id: 'content-creation', label: 'Creación de Contenido y Marketing' },
    { id: 'business-automation', label: 'Automatización de Procesos Empresariales' },
    { id: 'data-analysis', label: 'Análisis de Datos e Insights' },
    { id: 'design-creative', label: 'Diseño y Trabajo Creativo' },
    { id: 'development', label: 'Desarrollo de Software' },
    { id: 'education', label: 'Educación y Aprendizaje' },
    { id: 'research', label: 'Investigación y Escritura' },
    { id: 'customer-service', label: 'Atención al Cliente y Soporte' }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cuéntanos sobre tus intereses y experiencia</CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Interests */}
        <div>
          <Label className="text-base font-medium mb-4 block">
            ¿En qué áreas estás más interesado? (Selecciona todas las que apliquen)
          </Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {interests.map((interest) => (
              <div key={interest.id} className="flex items-center space-x-2">
                <Checkbox
                  id={interest.id}
                  checked={answers.interests?.includes(interest.id) || false}
                  onCheckedChange={(checked) => {
                    const currentInterests = answers.interests || [];
                    if (checked) {
                      setAnswer('interests', [...currentInterests, interest.id]);
                    } else {
                      setAnswer('interests', currentInterests.filter((i: string) => i !== interest.id));
                    }
                  }}
                />
                <Label htmlFor={interest.id} className="text-sm font-normal">
                  {interest.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Skill Level */}
        <div>
          <Label className="text-base font-medium mb-4 block">
            ¿Cómo describirías tu nivel técnico general?
          </Label>
          <RadioGroup
            value={answers.skillLevel || ''}
            onValueChange={(value) => setAnswer('skillLevel', value)}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="beginner" id="beginner" />
              <Label htmlFor="beginner">Principiante - Soy nuevo usando herramientas IA y soluciones tecnológicas</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="intermediate" id="intermediate" />
              <Label htmlFor="intermediate">Intermedio - Tengo algo de experiencia con varias herramientas</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="advanced" id="advanced" />
              <Label htmlFor="advanced">Avanzado - Me siento cómodo con herramientas complejas e integraciones</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="expert" id="expert" />
              <Label htmlFor="expert">Experto - A menudo ayudo a otros con soluciones técnicas</Label>
            </div>
          </RadioGroup>
        </div>
      </CardContent>
    </Card>
  );
};

export default InterestsStep;
