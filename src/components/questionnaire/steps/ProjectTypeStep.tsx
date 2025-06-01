
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useQuestionnaire } from "../QuestionnaireContext";

const ProjectTypeStep = () => {
  const { state, dispatch } = useQuestionnaire();
  const { answers } = state;

  const setAnswer = (key: string, value: any) => {
    dispatch({ type: 'SET_ANSWER', payload: { key, value } });
  };

  const projectTypes = [
    {
      id: 'business',
      title: 'Negocio/Startup',
      description: 'Construir o mejorar un negocio, startup o empresa comercial'
    },
    {
      id: 'creative',
      title: 'Proyecto Creativo',
      description: 'Creación de contenido, arte, música, escritura u otros esfuerzos creativos'
    },
    {
      id: 'technical',
      title: 'Proyecto Técnico',
      description: 'Desarrollo de software, análisis de datos o investigación técnica'
    },
    {
      id: 'educational',
      title: 'Educativo/Aprendizaje',
      description: 'Aprendizaje personal, enseñanza a otros o investigación académica'
    },
    {
      id: 'personal',
      title: 'Productividad Personal',
      description: 'Mejorar flujos de trabajo personales, organización o tareas diarias'
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>¿En qué tipo de proyecto estás trabajando?</CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup
          value={answers.projectType || ''}
          onValueChange={(value) => setAnswer('projectType', value)}
          className="space-y-4"
        >
          {projectTypes.map((type) => (
            <div key={type.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-start space-x-3">
                <RadioGroupItem value={type.id} id={type.id} className="mt-1" />
                <div className="flex-1">
                  <Label htmlFor={type.id} className="text-base font-medium cursor-pointer">
                    {type.title}
                  </Label>
                  <p className="text-sm text-gray-600 mt-1">{type.description}</p>
                </div>
              </div>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
    </Card>
  );
};

export default ProjectTypeStep;
