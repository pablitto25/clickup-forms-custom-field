import { useSurvey } from "@/app/form-encuesta-rework/components/content/SurveyContext";



const Encuesta_3: React.FC = ({ }) => {
    const { surveyData, setSurveyData } = useSurvey();

    const handleRadioChange = (label: string, value: string) => {
        setSurveyData({
            paso3: {
                ...surveyData.paso3,
                [label]: value
            }
        });
    };

    return (
        <>
            <h2 className="flex justify-center text-2xl p-8">¿Cómo evaluarías los siguientes atributos de nuestra propuesta? - Muy Insatisfecho a Muy Satisfecho</h2>
            <div className="max-w-5xl mx-auto">
                <div>
                    <table className="flex flex-col items-center min-w-full text-black border-collapse border border-gray-200">
                        <thead>
                            <tr className="">
                                <th className="text-lg px- py-2">¿Cómo calificaría a Latamly, respecto del conocimiento del mercado de los países donde opera?</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <td className="px-4 py-2 text-center">
                                        {["1", "2", "3", "4", "5", "No Aplica"].map((rating, index) => (
                                            <td key={index} className="px-4 py-2 text-center border border-gray-200">
                                                <div className="flex items-center">
                                                    <input
                                                        id={`rating-${rating}`}
                                                        type="radio"
                                                        value={rating}
                                                        name="option-3"
                                                        className="w-4 h-4 text-red-600 bg-gray-100 dark:ring-offset-gray-800"
                                                        onChange={() => handleRadioChange(
                                                            "¿Cómo calificaría a Latamly, respecto del conocimiento del mercado de los países donde opera?",
                                                            rating
                                                        )}
                                                        checked={surveyData.paso3?.rating === rating}
                                                    />
                                                    <label htmlFor={`rating-${rating}`} className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                                        {rating}
                                                    </label>
                                                </div>
                                            </td>
                                        ))}
                                    </td>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default Encuesta_3;
