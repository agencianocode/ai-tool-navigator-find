
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
    { id: 'personal', label: 'Just for me (personal use)' },
    { id: 'small-team', label: 'Small team (2-10 people)' },
    { id: 'company', label: 'Company/Organization (10+ people)' },
    { id: 'public', label: 'Public audience/customers' },
    { id: 'students', label: 'Students/learners' }
  ];

  const scales = [
    { id: 'hobby', label: 'Hobby/Side project' },
    { id: 'professional', label: 'Professional/Work project' },
    { id: 'startup', label: 'Startup/New business' },
    { id: 'enterprise', label: 'Large-scale/Enterprise' }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Who is your target audience and what's the scale?</CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Target Audience */}
        <div>
          <Label className="text-base font-medium mb-4 block">
            Who will be using or benefiting from this project?
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
            What's the scale and scope of your project?
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
