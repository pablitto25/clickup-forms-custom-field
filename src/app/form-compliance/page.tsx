"use client"
import React, { useState } from 'react';
import style from '@/app/styles/form-compliance.module.css';
import ImageDropzone from './utils/ImageDropzone';
import { Button, Image} from "@nextui-org/react";
import { Raleway } from 'next/font/google';

const raleway = Raleway({ subsets: ['latin'], style: 'italic' })
const raleway2 = Raleway({ subsets: ['latin'] })


interface FormDataa {
    nombreYapellido: string;
    descripcion: string;
}

const FormCompliance: React.FC = () => {
    const [taskId, setTaskId] = useState<string>('');
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [isSelected, setIsSelected] = React.useState(false);
    const [formDataa, setFormData] = useState<FormDataa>({
        nombreYapellido: '',
        descripcion: '',
    });
    const fechaActual = new Date();
    const timestampActual = fechaActual.getTime();
    const [successMessage, setSuccessMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const [selectionButton, setSelectionButton] = useState(true);
    const [showRegularForm, setShowRegularForm] = useState(false);
    const [showAnonymousForm, setShowAnonymousForm] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const resp = await fetch('http://localhost:3000/api/clickup-compliance', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: `test1`,
                    description: 'test2',
                    markdown_description: 'test3',
                    assignees: [183],
                    tags: ['test4'],
                    priority: 3,
                    due_date: timestampActual,
                    due_date_time: false,
                    notify_all: true,
                    parent: null,
                    links_to: null,
                    check_required_custom_fields: true,
                    custom_fields: [
                        {
                            id: 'e8ed4be5-7fea-437a-b03e-d37d653d62ab',
                            value: formDataa.nombreYapellido,
                        },
                        {
                            id: 'ec81db50-ce20-4d1a-94c2-d16f486cc002',
                            value: formDataa.descripcion,
                        },
                    ],
                }),
            });

            if (resp.ok) {
                const data = await resp.json();
                setTaskId(data.id);

                try {
                    const taskIdd = data.id;
                    const apiKey = 'pk_67345527_MM90CA72SZNR4QPWA8V75X15FQZO7Y47';
                    const query = new URLSearchParams({
                        custom_task_ids: 'true',
                        team_id: '9002029932'
                    }).toString();

                    if (selectedImage !== null) {
                        const formm = new FormData();
                        formm.append("attachment", selectedImage, selectedImage?.name || 'defaultFileName');

                        const response = await fetch(
                            `https://api.clickup.com/api/v2/task/${taskIdd}/attachment?${query}`,
                            {
                                method: 'POST',
                                headers: {
                                    Authorization: apiKey,
                                },
                                body: formm
                            }
                        );
                    }
                } catch (error) {
                    console.error('Error al enviar el formulario:', error);
                }

                setSuccessMessage(true);
                setErrorMessage(false);
            } else {
                setSuccessMessage(false);
                setErrorMessage(true);
            }

        } catch (error) {
            console.error('Error al enviar el formulario:', error);
            setSuccessMessage(false);
            setErrorMessage(true);
        }
    }

    const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleDescripcion = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleImageDrop = (acceptedFiles: File[]) => {
        const imageFile = acceptedFiles[0];
        setSelectedImage(imageFile);
    };

    return (
        <main className={`${style.shape} flex min-h-screen flex-col items-center`}>
            <div className='pt-4 relative'>
                <div className='grid grid-cols-2 lg:grid-cols-4 gap-0'>
                    <div className='lg:col-start-2 lg:col-span-1'>
                        <p className={`${raleway.className} font-raleway bg-[#FF0000] text-white text-[0.8rem] lg:text-[1.2rem] p-6 lg:p-12 rounded-[18px] relative z-10`}>Conocer en profundidad nuestra cultura institucional nos ayuda a alinear mejor nuestros objetivos para crece hacia donde queremos crecer.</p>
                    </div>
                    <div className='h-[10rem] lg:h-[12rem] pl-8 lg:col-start-3 lg:col-span-2 flex flex-col justify-center bg-[#FFFFFF] shadow-xl  w-3/4 lg:w-2/5 rounded-t rounded-b rounded-r-[25px] relative z-0 ml-[-10px]'>
                        <p className={`${raleway2.className}text-[0.8rem] lg:text-[1.2rem] pb-4`}>Código de ética y gobierno corporativo</p>
                        <div className="flex justify-center">
                            <Button className='bg-[#FF0000] text-[#FFFFFF] shadow-lg text-[0.8rem] lg:text-[1rem] h-7 lg:h-9  rounded-full'>
                                Leer
                            </Button>
                        </div>
                    </div>
                </div>
                {selectionButton && (
                    <div className='grid grid-cols-2 lg:grid-cols-2 pt-12'>
                        <div className='lg:col-start-1 lg:col-span-1 lg:pl-64 '>
                            <Image
                                src="/image-form-compliance.png"
                                width={719}
                                height={436}
                                alt="Picture of the author">

                            </Image>
                        </div>
                        <div className='h-[9rem] gap-4 lg:h-[12rem] pl-8 pt-12 lg:col-start-2 lg:col-span-2 flex flex-col bg-[#FFFFFF] w-3/4 lg:w-3/5 rounded-t rounded-b rounded-r-[25px] relative z-0 ml-[-10px]'>
                            <p className={`${raleway.className}text-[1.2rem] lg:text-[2rem]`}>Formulario de reporte</p>
                            <div className='flex gap-6 flex-col pl-6 pt-6'>
                                <Button
                                    className={`${raleway2.className} bg-[#FF0000] text-[#FFFFFF] text-[0.8rem] lg:text-[1rem] rounded-full w-[12rem] lg:w-[18rem]`}
                                    onClick={() => {
                                        setShowRegularForm(true);
                                        setShowAnonymousForm(false);
                                        setSelectionButton(false);
                                    }}
                                >
                                    Enviar reporte
                                </Button>

                                <Button
                                    className={`${raleway2.className} bg-[#FF0000] text-[#FFFFFF] text-[0.8rem] lg:text-[1rem] rounded-full w-[12rem] lg:w-[18rem]`}
                                    onClick={() => {
                                        setShowRegularForm(false);
                                        setShowAnonymousForm(true);
                                        setSelectionButton(false);
                                    }}
                                >
                                    Enviar reporte anónimo
                                </Button>
                            </div>
                        </div>
                    </div>
                )}

                {showRegularForm && (
                    <div className='grid grid-cols-2 lg:grid-cols-2 pt-12'>
                        <div className='lg:col-start-1 lg:col-span-1 lg:pl-64 '>
                            <Image
                                src="/image-form-compliance.png"
                                width={719}
                                height={436}
                                alt="Picture of the author">

                            </Image>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className='h-[9rem] gap-4 lg:h-[12rem] pl-8 pt-12 lg:col-start-2 lg:col-span-2 flex flex-col bg-[#FFFFFF] w-3/4 lg:w-3/5 rounded-t rounded-b rounded-r-[25px] relative z-0 ml-[-10px]'>
                                <p className={`${raleway.className}text-[1.2rem] lg:text-[2rem]`}>Formulario confidencial
                                    <button
                                        className='bg-[#FF0000] rounded-lg p-1'
                                        onClick={() => {
                                            setShowRegularForm(false);
                                            setShowAnonymousForm(false);
                                            setSelectionButton(true);
                                        }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25" />
                                        </svg>

                                    </button></p>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className='col-span-full'>
                                        <input className='w-3/4 border-b border-gray-400'
                                            name='nombreYapellido'
                                            placeholder='Nombre y apellido'
                                            value={formDataa.nombreYapellido}
                                            onChange={handleName}
                                        />
                                    </div>
                                    <div className="row-start-2">
                                        <textarea
                                            name='descripcion'
                                            placeholder='Mensaje'
                                            value={formDataa.descripcion}
                                            onChange={handleDescripcion}
                                            id="message" rows={4} className="block p-2.5 w-full text-sm text-black-900 rounded-lg border border-gray-400 focus:ring-blue-500 focus:border-blue-500 dark:placeholder-gray-400 text-black h-40" />
                                    </div>
                                    <div className="flex flex-col justify-center items-center row-start-2 gap-4 pr-32">
                                        <div className='border border-gray-400 w-32 h-28 rounded-lg text-center pt-1'>
                                            <ImageDropzone onImageDrop={handleImageDrop} />
                                        </div>
                                        <div className=''>
                                            <Button type="submit" className='bg-[#FF0000] text-[#FFFFFF] text-[0.8rem] lg:text-[0.8rem] rounded-full w-[4rem] lg:w-[4rem] h-8'>Enviar</Button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </form>
                    </div>
                )}

                {showAnonymousForm && (
                    <div className='grid grid-cols-2 lg:grid-cols-2 pt-12'>
                        <div className='lg:col-start-1 lg:col-span-1 lg:pl-64 '>
                            <Image
                                src="/image-form-compliance.png"
                                width={719}
                                height={436}
                                alt="Picture of the author">
                            </Image>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className='h-[9rem] gap-4 lg:h-[12rem] pl-8 pt-12 lg:col-start-2 lg:col-span-2 flex flex-col bg-[#FFFFFF] w-3/4 lg:w-3/5 rounded-t rounded-b rounded-r-[25px] relative z-0 ml-[-10px]'>
                                <p className={`${raleway.className}text-[1.2rem] lg:text-[2rem]`}>Formulario anónimo
                                <button
                                        className='bg-[#FF0000] rounded-lg p-1'
                                        onClick={() => {
                                            setShowRegularForm(false);
                                            setShowAnonymousForm(false);
                                            setSelectionButton(true);
                                        }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25" />
                                        </svg>

                                    </button></p>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="row-start-2">
                                        <textarea
                                            name='descripcion'
                                            placeholder='Mensaje'
                                            value={formDataa.descripcion}
                                            onChange={handleDescripcion}
                                            id="message" rows={4} className="block p-2.5 w-full text-sm text-black-900 rounded-lg border border-gray-400 focus:ring-blue-500 focus:border-blue-500 dark:placeholder-gray-400 text-black h-40" />
                                    </div>
                                    <div className="flex flex-col justify-center items-center row-start-2 gap-4 pr-32">
                                        <div className='border border-gray-400 w-32 h-28 rounded-lg text-center pt-1'>
                                            <ImageDropzone onImageDrop={handleImageDrop} />
                                        </div>
                                        <div className=''>
                                            <Button type="submit" className='bg-[#FF0000] text-[#FFFFFF] text-[0.8rem] lg:text-[0.8rem] rounded-full w-[4rem] lg:w-[4rem] h-8'>Enviar</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>

                )}
            </div>


        </main>
    )
}

export default FormCompliance;
