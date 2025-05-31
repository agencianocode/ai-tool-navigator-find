
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
    { id: 'immediate', label: 'Immediately (within days)' },
    { id: 'weeks', label: 'Within a few weeks' },
    { id: 'months', label: 'Within a few months' },
    { id: 'flexible', label: 'No specific timeline' }
  ];

  const urgencies = [
    { id: 'critical', label: 'Critical - Need solution ASAP' },
    { id: 'important', label: 'Important - High priority' },
    { id: 'moderate', label: 'Moderate - Can wait for right solution' },
    { id: 'low', label: 'Low - Just exploring options' }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Timeline and urgency</CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Timeline */}
        <div>
          <Label className="text-base font-medium mb-4 block">
            When do you need to implement these tools?
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
            How urgent is this project for you?
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
