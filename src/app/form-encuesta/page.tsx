"use client"
import style from '@/app/styles/form-encuesta.module.css';
import { Button } from '@nextui-org/react';
import React, { ChangeEvent, useEffect, useState } from 'react';

interface ContactInformation {
    company: string;
    fullName: string;
    position: string;
}

type SelectedOptionStep2 = {
    label: string;
    rating: string;
};


type SelectedOptionsStep3 = {
    [key: string]: boolean;
};

type SelectedOptionsStep4 = {
    [key: string]: boolean;
};

type SelectedOptionStep8 = {
    label: string;
    rating: string;
};

const API_ENDPOINT = 'http://localhost:8080/api/guardarencuesta';

const FormEncuesta: React.FC = () => {

    //step0
    const [formContact, setFormContact] = useState<ContactInformation>({
        company: '',
        fullName: '',
        position: '',
    });

    //step 1
    const [selectedOptionsStep1, setSelectedOptionsStep1] = useState<string[]>([]);
    //step2
    const OptionsStep2 = ["1", "2", "3", "4", "5", "No Aplica"];
    const [selectedOptionStep2, setSelectedOptionStep2] = useState<SelectedOptionStep2 | null>(null);// Estado para almacenar la opción seleccionada
    const [selectedOptionStep8, setSelectedOptionStep8] = useState<SelectedOptionStep8 | null>(null);// Estado para almacenar la opción seleccionada

    //step3
    const optionsStep3 = [
        "La Comunicación y la Calidad de atención en general",
        "La Rentabilidad del negocio",
        "El Plan de la marca por territorio",
        "La Logística Internacional",
        "Los Contenidos de Marketing y Comunicación regionalizados",
        "El Customer Services dedicado al usuario y RMA",
        "La Gestión de compras",
        "La Selección y Gestión con los partners comerciales",
        "El feedback en general del negocio, productos, etc."
    ];
    const [selectedOptionsStep3, setSelectedOptionsStep3] = useState<SelectedOptionsStep3>({}); // Estado para almacenar las opciones seleccionadas

    //step4
    const optionsStep4 = [
        "La Comunicación y la Calidad de atención en general",
        "La Rentabilidad del negocio",
        "El Plan de la marca por territorio",
        "La Logística Internacional",
        "Los Contenidos de Marketing y Comunicación regionalizados",
        "El Customer Services dedicado al usuario y RMA",
        "La Gestión de compras",
        "La Gestión de pagos",
        "La Selección y Gestión con los partners comerciales",
        "El feedback en general del negocio, productos, etc."
    ];
    const [selectedOptionsStep4, setSelectedOptionsStep4] = useState<SelectedOptionsStep4>({}); // Estado para almacenar las opciones seleccionadas

    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

    //step 5
    const [comment1, setComment1] = useState<string>('');
    //step 6
    const [comment2, setComment2] = useState<string>('');
    //step 7
    const [comment3, setComment3] = useState<string>('');

    const [step, setStep] = useState(0);


    /* useEffect(() => {
        console.log(selectedOptionStep8);

    }, [selectedOptionStep8]);
 */


    const handleComment1 = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setComment1(e.target.value);
    };
    const handleComment2 = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setComment2(e.target.value);
    };
    const handleComment3 = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setComment3(e.target.value);
    };

    //Step 0
    const handleCompany = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormContact(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const handleFullName = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormContact(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const handlePosition = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormContact(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    //step1
    const handleOptionsStep1 = (label: string, value: string) => {
        setSelectedOptionsStep1((prevSelectedOptions) => ({
            ...prevSelectedOptions,
            [label]: value
        }));
    };


    const handleNext = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setStep(prevStep => prevStep + 1);
    };

    const handlePreview = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setStep(prevStep => (prevStep > 0 ? prevStep - 1 : 0));
    };

    // step 3
    const handleCheckboxChangeStep3 = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = event.target;

        // Contar el número de opciones seleccionadas
        const selectedCount = Object.values(selectedOptionsStep3).filter(value => value).length;

        // Verificar si el número de opciones seleccionadas es 3 y se está tratando de seleccionar una cuarta
        if (selectedCount >= 3 && checked) {
            // Evitar que se seleccione una cuarta opción
            return;
        }

        // Actualizar el estado con la nueva selección o deselección
        const newSelectedOptions = {
            ...selectedOptionsStep3,
            [name]: checked,
        };

        // Filtrar las opciones seleccionadas para mantener solo las que están seleccionadas (true)
        const filteredSelectedOptions = Object.fromEntries(
            Object.entries(newSelectedOptions).filter(([key, value]) => value === true)
        );

        // Actualizar el estado
        setSelectedOptionsStep3(filteredSelectedOptions);
    };

    // step 4
    const handleCheckboxChangeStep4 = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = event.target;

        // Contar el número de opciones seleccionadas
        const selectedCount2 = Object.values(selectedOptionsStep4).filter(value => value).length;

        // Verificar si el número de opciones seleccionadas es 3 y se está tratando de seleccionar una cuarta
        if (selectedCount2 >= 3 && checked) {
            // Evitar que se seleccione una cuarta opción
            return;
        }

        // Actualizar el estado con la nueva selección o deselección
        const newSelectedOptions2 = {
            ...selectedOptionsStep4,
            [name]: checked,
        };

        // Filtrar las opciones seleccionadas para mantener solo las que están seleccionadas (true)
        const filteredSelectedOptions2 = Object.fromEntries(
            Object.entries(newSelectedOptions2).filter(([key, value]) => value === true)
        );

        // Actualizar el estado
        setSelectedOptionsStep4(filteredSelectedOptions2);
    };

    const rows: number = Number('4'); // Convertir cadena a número
    const cols: number = Number('50'); // Convertir cadena a número

    const ratings = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

    //step2
    const handleSelectedOptionStep2 = (label: string, rating: string) => {
        setSelectedOptionStep2({ label, rating });
    };

    //step8
    const handleSelectedOptionStep8 = (label: string, rating: string) => {
        setSelectedOptionStep8({ label, rating });
    };

    //submit form
    const handleDoneClick = async () => {
        const data = {
            formContact,
            selectedOptionsStep1,
            selectedOptionStep2,
            selectedOptionsStep3,
            selectedOptionsStep4,
            comment1,
            comment2,
            comment3,
            selectedOptionStep8
        };

        console.log(data);

        try {
            const response = await fetch(API_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                console.log('Encuesta enviada exitosamente');
                // Aquí podrías manejar la respuesta de éxito, redirección, etc.
            } else {
                console.error('Error al enviar la encuesta:', response.status);
                // Manejar errores si es necesario
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
            // Manejar errores de red u otros errores
        }
    };




    return (
        <main className={`flex flex-col items-center ${style.shape}`}>
            <h1 className={`text-white`}>Encuesta - Latamly</h1>

            <form className={`text-white`}>
                <h2>Informacion de Contacto</h2>
                {step == 0 && (
                    <div>
                        <input className='w-3/4 border-b border-gray-400 text-black'
                            name='company'
                            placeholder='Company'
                            value={formContact.company}
                            onChange={handleCompany}
                        />
                        <input className='w-3/4 border-b border-gray-400 text-black'
                            name='fullName'
                            placeholder='Full Name'
                            value={formContact.fullName}
                            onChange={handleFullName}
                        />
                        <input className='w-3/4 border-b border-gray-400 text-black'
                            name='position'
                            placeholder='Position in the Company'
                            value={formContact.position}
                            onChange={handlePosition}
                        />
                    </div>
                )}

                {step == 1 && (
                    <div className='flex'>
                        <div className='flex flex-row'>
                            <div>
                                <table className="min-w-full text-black border-collapse border border-gray-200">
                                    <thead>
                                        <tr className="">
                                            <th className="px-4 py-2">¿Cómo evaluarías los siguientes atributos de nuestra propuesta?</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {[
                                            "La Comunicación y la Calidad de atención en general:",
                                            "La Rentabilidad del negocio:",
                                            "El Plan de la marca por territorio:",
                                            "La Logística Internacional:",
                                            "Los Contenidos de Marketing y Comunicación regionalizados:",
                                            "El Customer Services dedicado al usuario y RMA:",
                                            "La Gestión de compras:",
                                            "La Selección y Gestión con los partners comerciales:",
                                            "El feedback en general del negocio, productos, etc.:"
                                        ].map((label, index) => (
                                            <tr key={index}>
                                                <td className="border border-gray-200 px-4 py-2">{label}</td>
                                                {["1", "2", "3", "4", "5", "No Aplica"].map((option, i) => (
                                                    <td key={i} className="border border-gray-200 px-4 py-2 text-center">
                                                        <div className="flex items-center">
                                                            <input
                                                                id={`option-${index}-${i}`}
                                                                type="radio"
                                                                value={option}
                                                                name={`option-${index}`}
                                                                className="w-4 h-4 text-red-600 bg-gray-100 dark:ring-offset-gray-800"
                                                                onChange={(e) => handleOptionsStep1(label, e.target.value)}
                                                            />
                                                            <label htmlFor={`option-${index}-${i}`} className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{option}</label>
                                                        </div>
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                            </div>
                        </div>
                    </div>

                )}
                {step == 2 && (
                    <div className='text-black'>
                        <table className="min-w-full text-black border-collapse border border-gray-200">
                            <thead>
                                <tr className="">
                                    <th className="border border-gray-200 px-4 py-2">¿Cómo calificaría a Latamly, respecto del conocimiento del mercado de los países donde opera?</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <td className="px-4 py-2 text-center">
                                            {OptionsStep2.map((rating, index) => (
                                                <td key={index} className="px-4 py-2 text-center">
                                                    <div className="flex items-center">
                                                        <input
                                                            id={`rating-${rating}`}
                                                            type="radio"
                                                            value={rating}
                                                            name="option-3"
                                                            className="w-4 h-4 text-red-600 bg-gray-100 dark:ring-offset-gray-800"
                                                            onChange={() => handleSelectedOptionStep2(
                                                                "¿Cómo calificaría a Latamly, respecto del conocimiento del mercado de los países donde opera?",
                                                                rating
                                                            )}
                                                            checked={selectedOptionStep2?.rating === rating} // Marcar el radio button seleccionado
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
                )}
                {step == 3 && (
                    <div className='text-black'>
                        <table className="min-w-full text-black border-collapse border border-gray-200">
                            <thead>
                                <tr>
                                    <th className="border border-gray-200 px-4 py-2">¿Cuál es el atributo que MÁS valora de Latamly Group?</th>
                                </tr>
                            </thead>
                            <tbody>
                                {optionsStep3.map((label, index) => (
                                    <tr key={index}>
                                        <td className="px-4 py-2 text-center">
                                            <div className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    name={label}
                                                    checked={!!selectedOptionsStep3[label]} // Convertir undefined a false
                                                    onChange={handleCheckboxChangeStep3}
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
                )}
                {step == 4 && (
                    <div className='text-black'>
                        <table className="min-w-full text-black border-collapse border border-gray-200">
                            <thead>
                                <tr>
                                    <th className="border border-gray-200 px-4 py-2">¿Cuál es el atributo que MENOS valora de Latamly Group?</th>
                                </tr>
                            </thead>
                            <tbody>
                                {optionsStep4.map((label, index) => (
                                    <tr key={index}>
                                        <td className="px-4 py-2 text-center">
                                            <div className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    name={label}
                                                    checked={!!selectedOptionsStep4[label]} // Convertir undefined a false
                                                    onChange={handleCheckboxChangeStep4}
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
                )}
                {step == 5 && (
                    <div className='text-black'>
                        <h2>¿Por qué siguen trabajando con nosotros?</h2>
                        <textarea className='border border-gray-400'
                            value={comment1}
                            onChange={handleComment1}
                            placeholder="Escribe algo..."
                            rows={rows}
                            cols={cols}
                        />
                    </div>
                )}
                {step == 6 && (
                    <div className='text-black'>
                        <h2>¿Por qué dejarían de trabajar con nosotros?</h2>
                        <textarea className='border border-gray-400'
                            value={comment2}
                            onChange={handleComment2}
                            placeholder="Escribe algo..."
                            rows={rows}
                            cols={cols}
                        />
                    </div>
                )}
                {step == 7 && (
                    <div className='text-black'>
                        <h2>¿Hay alguna otra cosa que te gustaría decirnos?</h2>
                        <textarea className='border border-gray-400'
                            value={comment3}
                            onChange={handleComment3}
                            placeholder="Escribe algo..."
                            rows={rows}
                            cols={cols}
                        />
                    </div>
                )}
                {step == 8 && (
                    <div>
                        <table className="min-w-full text-black border-collapse border border-gray-200">
                            <thead>
                                <tr className="">
                                    <th className="border border-gray-200 px-4 py-2">¿Cómo calificaría a Latamly, respecto del conocimiento del mercado de los países donde opera?</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <td className="px-4 py-2 text-center">
                                            {ratings.map((rating, index) => (
                                                <td key={index} className="px-4 py-2 text-center">
                                                    <div className="flex items-center">
                                                        <input
                                                            id={`rating-${rating}`}
                                                            type="radio"
                                                            name="option-4"
                                                            className="w-4 h-4 text-red-600 bg-gray-100 dark:ring-offset-gray-800"
                                                            onChange={() => handleSelectedOptionStep8(
                                                                "¿Cómo calificaría a Latamly, respecto del conocimiento del mercado de los países donde opera?",
                                                                rating
                                                            )}
                                                            checked={selectedOptionStep8?.rating === rating} // Marcar el radio button seleccionado
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
                        {step > 7 && (
                            <div className='flex justify-center'>
                            <Button className='mr-2' onClick={handleDoneClick}>Done</Button>
                            </div>
                        )}
                    </div>
                )}
                <div className='mt-4'>
                    {step > 0 && (
                        <Button className='mr-2' onClick={handlePreview}>Prev</Button>
                    )}

                    {step < 8 && (
                        <Button onClick={handleNext}>Next</Button>
                    )}
                </div>
            </form>


        </main >
    )
}

export default FormEncuesta;
