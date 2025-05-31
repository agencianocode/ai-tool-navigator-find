
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useQuestionnaire } from "./QuestionnaireContext";
import InterestsStep from "./steps/InterestsStep";
import ProjectTypeStep from "./steps/ProjectTypeStep";
import AudienceStep from "./steps/AudienceStep";
import BudgetStep from "./steps/BudgetStep";
import TimelineStep from "./steps/TimelineStep";
import ExpertiseStep from "./steps/ExpertiseStep";
import ResultsStep from "./steps/ResultsStep";

const QuestionnaireStep = () => {
  const { state, dispatch } = useQuestionnaire();
  const { currentStep, totalSteps, answers, isComplete } = state;

  const progress = (currentStep / totalSteps) * 100;

  const handleNext = () => {
    if (currentStep === totalSteps) {
      dispatch({ type: 'COMPLETE' });
    } else {
      dispatch({ type: 'NEXT_STEP' });
    }
  };

  const handlePrevious = () => {
    dispatch({ type: 'PREV_STEP' });
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return answers.interests && answers.skillLevel;
      case 2:
        return answers.projectType;
      case 3:
        return answers.targetAudience && answers.projectScale;
      case 4:
        return answers.budgetRange;
      case 5:
        return answers.timeline && answers.urgency;
      case 6:
        return answers.technicalExpertise;
      default:
        return false;
    }
  };

  const renderStep = () => {
    if (isComplete) {
      return <ResultsStep />;
    }

    switch (currentStep) {
      case 1:
        return <InterestsStep />;
      case 2:
        return <ProjectTypeStep />;
      case 3:
        return <AudienceStep />;
      case 4:
        return <BudgetStep />;
      case 5:
        return <TimelineStep />;
      case 6:
        return <ExpertiseStep />;
      default:
        return <InterestsStep />;
    }
  };

  if (isComplete) {
    return renderStep();
  }

  return (
    <div className="space-y-6">
      {/* Progress */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-600">
              Step {currentStep} of {totalSteps}
            </span>
            <span className="text-sm text-gray-500">{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </CardContent>
      </Card>

      {/* Current Step */}
      <div className="animate-fade-in">
        {renderStep()}
      </div>

      {/* Navigation */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1}
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>
            <Button
              onClick={handleNext}
              disabled={!isStepValid()}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              {currentStep === totalSteps ? 'Complete' : 'Next'}
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuestionnaireStep;
