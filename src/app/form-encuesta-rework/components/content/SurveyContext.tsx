// context/SurveyContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SurveyContextProps {
  step: number;
  nextStep: () => void;
  prevStep: () => void;
}

const SurveyContext = createContext<SurveyContextProps | undefined>(undefined);

export const SurveyProvider = ({ children }: { children: ReactNode }) => {
  const [step, setStep] = useState(0);

  const nextStep = () => setStep((prevStep) => prevStep + 1);
  const prevStep = () => setStep((prevStep) => (prevStep > 0 ? prevStep - 1 : 0));

  return (
    <SurveyContext.Provider value={{ step, nextStep, prevStep }}>
      {children}
    </SurveyContext.Provider>
  );
};

export const useSurvey = (): SurveyContextProps => {
  const context = useContext(SurveyContext);
  if (!context) {
    throw new Error('useSurvey must be used within a SurveyProvider');
  }
  return context;
};
