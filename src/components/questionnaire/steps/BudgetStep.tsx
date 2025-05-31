
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useQuestionnaire } from "../QuestionnaireContext";

const BudgetStep = () => {
  const { state, dispatch } = useQuestionnaire();
  const { answers } = state;

  const setAnswer = (key: string, value: any) => {
    dispatch({ type: 'SET_ANSWER', payload: { key, value } });
  };

  const budgetRanges = [
    {
      id: 'free',
      title: 'Free only',
      description: 'I want to use only free tools and services'
    },
    {
      id: 'low',
      title: '$1 - $50/month',
      description: 'Small budget for basic premium features'
    },
    {
      id: 'medium',
      title: '$50 - $200/month',
      description: 'Moderate budget for professional tools'
    },
    {
      id: 'high',
      title: '$200 - $500/month',
      description: 'Higher budget for advanced solutions'
    },
    {
      id: 'enterprise',
      title: '$500+/month',
      description: 'Enterprise budget for comprehensive solutions'
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>What's your budget range for AI tools?</CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup
          value={answers.budgetRange || ''}
          onValueChange={(value) => setAnswer('budgetRange', value)}
          className="space-y-4"
        >
          {budgetRanges.map((budget) => (
            <div key={budget.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-start space-x-3">
                <RadioGroupItem value={budget.id} id={budget.id} className="mt-1" />
                <div className="flex-1">
                  <Label htmlFor={budget.id} className="text-base font-medium cursor-pointer">
                    {budget.title}
                  </Label>
                  <p className="text-sm text-gray-600 mt-1">{budget.description}</p>
                </div>
              </div>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
    </Card>
  );
};

export default BudgetStep;
