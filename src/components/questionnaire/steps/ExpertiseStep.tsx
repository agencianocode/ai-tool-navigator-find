
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
      title: 'No-code solutions only',
      description: 'I prefer drag-and-drop interfaces and simple setup'
    },
    {
      id: 'low-code',
      title: 'Low-code solutions',
      description: 'I can handle some configuration but prefer minimal coding'
    },
    {
      id: 'some-coding',
      title: 'Some coding is fine',
      description: 'I can follow tutorials and do basic coding tasks'
    },
    {
      id: 'technical',
      title: 'Technical solutions welcome',
      description: 'I\'m comfortable with APIs, integrations, and custom code'
    },
    {
      id: 'developer',
      title: 'Developer-level',
      description: 'I can build custom solutions and handle complex integrations'
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Technical expertise preference</CardTitle>
      </CardHeader>
      <CardContent>
        <Label className="text-base font-medium mb-4 block">
          What level of technical complexity are you comfortable with?
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
