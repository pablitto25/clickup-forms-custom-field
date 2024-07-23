// context/SurveyContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SurveyData {
  company: string;
  fullName: string;
  email: string;
  // Añade más campos según sea necesario
  paso2: { [key: string]: string };
  paso3: { [key: string]: string };
  paso4: { [key: string]: boolean};
}

interface SurveyContextProps {
  step: number;
  surveyData: SurveyData;
  setSurveyData: (data: Partial<SurveyData>) => void;
  nextStep: () => void;
  prevStep: () => void;
}

const SurveyContext = createContext<SurveyContextProps | undefined>(undefined);

export const SurveyProvider = ({ children }: { children: ReactNode }) => {
  const [step, setStep] = useState(0);
  const [surveyData, setSurveyDataState] = useState<SurveyData>({
    company: '',
    fullName: '',
    email: '',
    // Inicializa más campos según sea necesario
    paso2: {},
    paso3: {},
    paso4: {},
  });

  const setSurveyData = (data: Partial<SurveyData>) => {
    setSurveyDataState(prevData => ({ ...prevData, ...data }));
  };

  const nextStep = () => setStep((prevStep) => prevStep + 1);
  const prevStep = () => setStep((prevStep) => (prevStep > 0 ? prevStep - 1 : 0));


  //test guardado de datos
  console.log(surveyData);

  return (
    <SurveyContext.Provider value={{ step, surveyData, setSurveyData, nextStep, prevStep }}>
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
