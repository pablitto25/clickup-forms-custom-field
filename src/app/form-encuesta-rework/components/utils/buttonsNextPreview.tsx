
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/react";
import { useState } from "react";
import { useSurvey } from "../content/SurveyContext";

const ButtonNextPreview: React.FC = () => {
    const { step, nextStep, prevStep } = useSurvey();
  
    return (
      <div className='mt-4'>
        {step > 0 && (
          <Button className='mr-2' color="default" onClick={prevStep}>Prev</Button>
        )}
  
        {step < 8 && (
          <Button onClick={nextStep} color="primary">Next</Button>
        )}
      </div>
    );
  };

export default ButtonNextPreview;
