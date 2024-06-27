"use client"
import style from '@/app/styles/form-encuesta.module.css';
import { Button } from '@nextui-org/react';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { RadioGroup, Radio } from "@nextui-org/react";

interface ContactInformation {
    /** 
     *Formulario de Contacto de la persona que llenara el formulario
     *Company: De que compañia es,
     *fullName: Nombre Completo
     *Position: Posicion en la compañia o cargo actual
     */
    Company: string;
    fullName: string;
    Position: string;
}


const FormEncuesta: React.FC = () => {

    const [formContact, setFormContact] = useState<ContactInformation>({
        Company: '',
        fullName: '',
        Position: '',
    });
    const [infoFormContact, setInfoFormContact] = useState(true);
    const [firstChoice, setFirstChoice] = useState(false);
    const [secondChoice, setSecondChoice] = useState(false);
    const [threeChoice, setThreeChoice] = useState(false);
    const [finish, setFinish] = useState(false);
    const [step, setStep] = useState(0);
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);


    useEffect(() => {
        changeSteps();
    }, [step]);


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

    const handleNext = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setStep(step + 1);
        changeSteps();
        console.log(step);
    }

    const handlePreview = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (step <= 0) {
            setStep(0);
        } else {
            setStep(step - 1);
        }

        changeSteps();
        console.log(step);
    }

    const changeSteps = () => {
        switch (step) {
            case 0:
                setInfoFormContact(true);
                setFirstChoice(false);
                setFinish(false);
                break;
            case 1:
                setInfoFormContact(false);
                setFirstChoice(true);
                setSecondChoice(false);
                setThreeChoice(false);
                setFinish(false);

                break;
            case 2:
                setInfoFormContact(false);
                setFirstChoice(false);
                setFinish(false);
                setSecondChoice(true);
                setThreeChoice(false);
                break;
            case 3:
                setInfoFormContact(false);
                setFirstChoice(false);
                setSecondChoice(false);
                setThreeChoice(true);
                setFinish(false);
                break;
            case 4:
                setInfoFormContact(false);
                setFirstChoice(false);
                setSecondChoice(false);
                setThreeChoice(false);
                setFinish(true);
                break;
            default:
                break;
        }
    }
    //checkboxs
    const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name } = event.target;
        if (selectedOptions.includes(name)) {
            setSelectedOptions(selectedOptions.filter(option => option !== name));
        } else {
            if (selectedOptions.length < 3) {
                setSelectedOptions([...selectedOptions, name]);
            }
        }
    }





        return (
            <main className={`flex flex-col items-center ${style.shape}`}>
                <h1 className={`text-white`}>Encuesta - Latamly</h1>

                <form className={`text-white`}>
                    <h2>Informacion de Contacto</h2>
                    {infoFormContact && (
                        <div>
                            <input className='w-3/4 border-b border-gray-400 text-black'
                                name='Company'
                                placeholder='Company'
                                value={formContact.Company}
                                onChange={handleCompany}
                            />
                            <input className='w-3/4 border-b border-gray-400 text-black'
                                name='fullName'
                                placeholder='Full Name'
                                value={formContact.fullName}
                                onChange={handleFullName}
                            />
                            <input className='w-3/4 border-b border-gray-400 text-black'
                                name='Position'
                                placeholder='Position in the Company'
                                value={formContact.Position}
                                onChange={handlePosition}
                            />
                        </div>
                    )}

                    {firstChoice && (
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
                                                <td className="border border-gray-200 px-4 py-2 text-center">
                                                    <div className="flex items-center">
                                                        <input id="red-radio" type="radio" value="" name="option-1" className="w-4 h-4 text-red-600 bg-gray-100 dark:ring-offset-gray-800" />
                                                        <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">1</label>
                                                    </div>
                                                </td>
                                                <td className="border border-gray-200 px-4 py-2 text-center">
                                                    <div className="flex items-center">
                                                        <input id="red-radio" type="radio" value="" name="option-1" className="w-4 h-4 text-red-600 bg-gray-100  dark:ring-offset-gray-800" />
                                                        <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">2</label>
                                                    </div>
                                                </td>
                                                <td className="border border-gray-200 px-4 py-2 text-center">
                                                    <div className="flex items-center">
                                                        <input id="red-radio" type="radio" value="" name="option-1" className="w-4 h-4 text-red-600 bg-gray-100  dark:ring-offset-gray-800" />
                                                        <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">3</label>
                                                    </div>
                                                </td>
                                                <td className="border border-gray-200 px-4 py-2 text-center">
                                                    <div className="flex items-center">
                                                        <input id="red-radio" type="radio" value="" name="option-1" className="w-4 h-4 text-red-600 bg-gray-100  dark:ring-offset-gray-800" />
                                                        <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">4</label>
                                                    </div>
                                                </td>
                                                <td className="border border-gray-200 px-4 py-2 text-center">
                                                    <div className="flex items-center">
                                                        <input id="red-radio" type="radio" value="" name="option-1" className="w-4 h-4 text-red-600 bg-gray-100  dark:ring-offset-gray-800" />
                                                        <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">5</label>
                                                    </div>
                                                </td>
                                                <td className="border border-gray-200 px-4 py-2 text-center">
                                                    <div className="flex items-center">
                                                        <input id="red-radio" type="radio" value="" name="option-1" className="w-4 h-4 text-red-600 bg-gray-100  dark:ring-offset-gray-800" />
                                                        <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">No Aplica</label>
                                                    </div>
                                                </td>
                                        </tr>
                                    ))}
                                        </tbody>
                                    </table>

                                </div>
                            </div>
                        </div>

                    )}
                    {secondChoice && (
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
                                                <div className="flex items-center">
                                                    <input id="red-radio" type="radio" value="" name="option-3" className="w-4 h-4 text-red-600 bg-gray-100 dark:ring-offset-gray-800" />
                                                    <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">1</label>
                                                </div>
                                            </td>
                                            <td className="px-4 py-2 text-center">
                                                <div className="flex items-center">
                                                    <input id="red-radio" type="radio" value="" name="option-3" className="w-4 h-4 text-red-600 bg-gray-100  dark:ring-offset-gray-800" />
                                                    <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">2</label>
                                                </div>
                                            </td>
                                            <td className="px-4 py-2 text-center">
                                                <div className="flex items-center">
                                                    <input id="red-radio" type="radio" value="" name="option-3" className="w-4 h-4 text-red-600 bg-gray-100  dark:ring-offset-gray-800" />
                                                    <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">3</label>
                                                </div>
                                            </td>
                                            <td className="px-4 py-2 text-center">
                                                <div className="flex items-center">
                                                    <input id="red-radio" type="radio" value="" name="option-3" className="w-4 h-4 text-red-600 bg-gray-100  dark:ring-offset-gray-800" />
                                                    <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">4</label>
                                                </div>
                                            </td>
                                            <td className="px-4 py-2 text-center">
                                                <div className="flex items-center">
                                                    <input id="red-radio" type="radio" value="" name="option-3" className="w-4 h-4 text-red-600 bg-gray-100  dark:ring-offset-gray-800" />
                                                    <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">5</label>
                                                </div>
                                            </td>
                                            <td className="px-4 py-2 text-center">
                                                <div className="flex items-center">
                                                    <input id="red-radio" type="radio" value="" name="option-3" className="w-4 h-4 text-red-600 bg-gray-100  dark:ring-offset-gray-800" />
                                                    <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">No Aplica</label>
                                                </div>
                                            </td>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    )}
                    {threeChoice && (
                        <div className='text-black'>
                            <table className="min-w-full text-black border-collapse border border-gray-200">
                                <thead>
                                    <tr>
                                        <th className="border border-gray-200 px-4 py-2">¿Cuál es el atributo que MÁS valora de Latamly Group?</th>
                                    </tr>
                                </thead>
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
                                                        checked={selectedOptions.includes(label)}
                                                        onChange={handleCheckboxChange}
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
                    {finish && (
                        <div className='text-black'>
                            <h2>¿Fin Encuesta?</h2>
                        </div>
                    )}
                    <Button onClick={handleNext} className={`${style.btnEnviar}`}>Next</Button>
                    <Button onClick={handlePreview} className={`${style.btnEnviar}`}>Preview</Button>
                </form>


            </main >
        )
    }

    export default FormEncuesta;
