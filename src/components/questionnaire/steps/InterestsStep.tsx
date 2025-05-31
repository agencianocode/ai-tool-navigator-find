
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
    { id: 'content-creation', label: 'Content Creation & Marketing' },
    { id: 'business-automation', label: 'Business Process Automation' },
    { id: 'data-analysis', label: 'Data Analysis & Insights' },
    { id: 'design-creative', label: 'Design & Creative Work' },
    { id: 'development', label: 'Software Development' },
    { id: 'education', label: 'Education & Learning' },
    { id: 'research', label: 'Research & Writing' },
    { id: 'customer-service', label: 'Customer Service & Support' }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tell us about your interests and experience</CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Interests */}
        <div>
          <Label className="text-base font-medium mb-4 block">
            What areas are you most interested in? (Select all that apply)
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
            How would you describe your overall technical skill level?
          </Label>
          <RadioGroup
            value={answers.skillLevel || ''}
            onValueChange={(value) => setAnswer('skillLevel', value)}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="beginner" id="beginner" />
              <Label htmlFor="beginner">Beginner - I'm new to using AI tools and tech solutions</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="intermediate" id="intermediate" />
              <Label htmlFor="intermediate">Intermediate - I have some experience with various tools</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="advanced" id="advanced" />
              <Label htmlFor="advanced">Advanced - I'm comfortable with complex tools and integrations</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="expert" id="expert" />
              <Label htmlFor="expert">Expert - I often help others with technical solutions</Label>
            </div>
          </RadioGroup>
        </div>
      </CardContent>
    </Card>
  );
};

export default InterestsStep;
