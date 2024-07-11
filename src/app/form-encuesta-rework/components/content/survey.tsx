import Encuesta_1 from "../pasos-encuesta/encuesta_1";
/* import Encuesta_2 from "../pasos-encuesta/encuesta_2"; */
import { useSurvey } from "./SurveyContext";

const Survey: React.FC = () => {

    const { step } = useSurvey();




    return (
        <form className="max-w-xl">
            {step === 0 && <Encuesta_1 />}
            {/* {step === 1 && <Encuesta_2 />} */}
        </form>
    )
}

export default Survey;
