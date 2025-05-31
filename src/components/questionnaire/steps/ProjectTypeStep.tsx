
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
      title: 'Business/Startup',
      description: 'Building or improving a business, startup, or commercial venture'
    },
    {
      id: 'creative',
      title: 'Creative Project',
      description: 'Content creation, art, music, writing, or other creative endeavors'
    },
    {
      id: 'technical',
      title: 'Technical Project',
      description: 'Software development, data analysis, or technical research'
    },
    {
      id: 'educational',
      title: 'Educational/Learning',
      description: 'Personal learning, teaching others, or academic research'
    },
    {
      id: 'personal',
      title: 'Personal Productivity',
      description: 'Improving personal workflows, organization, or daily tasks'
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>What type of project are you working on?</CardTitle>
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
