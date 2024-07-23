import { useSurvey } from "@/app/form-encuesta-rework/components/content/SurveyContext";



const Encuesta_4: React.FC = ({ }) => {
    const { surveyData, setSurveyData } = useSurvey();

    const handleCheckboxChange = (label: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setSurveyData({
            paso4: {
                ...surveyData.paso4,
                [label]: event.target.checked
            }
        });
    };

    return (
        <>
            <h2 className="flex justify-center text-2xl p-8">¿Cómo evaluarías los siguientes atributos de nuestra propuesta? - Muy Insatisfecho a Muy Satisfecho</h2>
            <div className="max-w-5xl mx-auto">
                <div>
                    <table className="min-w-full text-black border-collapse border border-gray-200">
                        <tbody>
                            {[
                                "La Comunicación y la Calidad de atención en general",
                                "La Rentabilidad del negocio",
                                "El Plan de la marca por territorio",
                                "La Logística Internacional",
                                "Los Contenidos de Marketing y Comunicación regionalizados",
                                "El Customer Services dedicado al usuario y RMA",
                                "La Gestión de compras",
                                "La Selección y Gestión con los partners comerciales",
                                "El feedback en general del negocio, productos, etc."
                            ].map((label, index) => (
                                <tr key={index}>
                                    <td className="px-4 py-2 text-center">
                                        <div className="flex items-center">
                                            <input
                                                type="checkbox"
                                                name={label}
                                                checked={!!surveyData.paso4[label]} // Convertir undefined a false
                                                onChange={handleCheckboxChange(label)}
                                                className="w-4 h-4 text-red-600 bg-gray-100 dark:ring-offset-gray-800"
                                            />

                                            <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{label}</label>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default Encuesta_4;
