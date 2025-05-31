
import React, { createContext, useContext, useReducer, ReactNode } from "react";

export interface QuestionnaireState {
  currentStep: number;
  totalSteps: number;
  answers: Record<string, any>;
  isComplete: boolean;
}

interface QuestionnaireAction {
  type: 'SET_ANSWER' | 'NEXT_STEP' | 'PREV_STEP' | 'COMPLETE';
  payload?: any;
}

const initialState: QuestionnaireState = {
  currentStep: 1,
  totalSteps: 6,
  answers: {},
  isComplete: false,
};

const questionnaireReducer = (state: QuestionnaireState, action: QuestionnaireAction): QuestionnaireState => {
  switch (action.type) {
    case 'SET_ANSWER':
      return {
        ...state,
        answers: {
          ...state.answers,
          [action.payload.key]: action.payload.value,
        },
      };
    case 'NEXT_STEP':
      return {
        ...state,
        currentStep: Math.min(state.currentStep + 1, state.totalSteps),
      };
    case 'PREV_STEP':
      return {
        ...state,
        currentStep: Math.max(state.currentStep - 1, 1),
      };
    case 'COMPLETE':
      return {
        ...state,
        isComplete: true,
      };
    default:
      return state;
  }
};

const QuestionnaireContext = createContext<{
  state: QuestionnaireState;
  dispatch: React.Dispatch<QuestionnaireAction>;
} | null>(null);

export const QuestionnaireProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(questionnaireReducer, initialState);

  return (
    <QuestionnaireContext.Provider value={{ state, dispatch }}>
      {children}
    </QuestionnaireContext.Provider>
  );
};

export const useQuestionnaire = () => {
  const context = useContext(QuestionnaireContext);
  if (!context) {
    throw new Error('useQuestionnaire must be used within QuestionnaireProvider');
  }
  return context;
};
