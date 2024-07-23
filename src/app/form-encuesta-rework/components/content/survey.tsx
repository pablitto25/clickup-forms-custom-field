

import Encuesta_1 from "../pasos-encuesta/Encuesta_1";
import Encuesta_2 from "../pasos-encuesta/Encuesta_2";
import Encuesta_3 from "../pasos-encuesta/Encuesta_3";
import Encuesta_4 from "../pasos-encuesta/Encuesta_4";
import { useSurvey } from "./SurveyContext";

const Survey: React.FC = () => {

    const { step, surveyData } = useSurvey();

  const handleSubmit = async () => {
    const response = await fetch('URL_DE_TU_API', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(surveyData),
    });
    if (response.ok) {
      // Maneja la respuesta exitosa
    } else {
      // Maneja el error
    }
  };


    return (
        <form>
            {step === 0 && <Encuesta_1 />}
            {step === 1 && <Encuesta_2 />}
            {step === 2 && <Encuesta_3 />}
            {step === 3 && <Encuesta_4 />}
            {/* {step === 3 && <button type="button" onClick={handleSubmit}>Enviar</button>} */}
        </form>
    )
}

export default Survey;
