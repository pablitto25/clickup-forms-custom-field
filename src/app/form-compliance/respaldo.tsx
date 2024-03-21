"use client"
import React, { useState } from 'react';
import styles from '@/app/styles/form-compliance.module.css';
import ImageDropzone from './utils/ImageDropzone';
import { Switch, Button } from "@nextui-org/react";
import axios from 'axios'; // Importar Axios

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
                    const apiKey = 'pk_67345527_67JFLU4GLNKKU4H9YH1SS9FFREQ1Y97U';
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

    const handleDescripcion = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        <main className='flex min-h-screen flex-col items-center'>
            <form className={styles.body} onSubmit={handleSubmit}>
                <p className=''>Formulario de Denuncia / Complaint form</p>
                <div className="flex flex-col gap-2">
                    <Switch isSelected={isSelected} onValueChange={setIsSelected}>
                        Anonimo o no
                    </Switch>
                </div>
                {isSelected && (
                    <div className='flex flex-col'>
                        <label>Nombre - Apellido / Name - Last Name</label>
                        <input
                            name='nombreYapellido'
                            placeholder='Introducir texto'
                            value={formDataa.nombreYapellido}
                            onChange={handleName}
                        />
                    </div>
                )}
                <div className='flex flex-col'>
                    <label>Descripción de los hechos o eventos / Description of facts or events*</label>
                    <input
                        name='descripcion'
                        placeholder='Introducir texto'
                        value={formDataa.descripcion}
                        onChange={handleDescripcion}
                    />
                </div>
                <div className='flex flex-col'>
                    <label>Evidencia / Evidence*</label>
                    <ImageDropzone onImageDrop={handleImageDrop} />
                    {selectedImage && (
                        <div className='flex flex-col justify-center items-center'>
                            <h2>Imagen Seleccionada</h2>
                            <img src={URL.createObjectURL(selectedImage)} alt="Imagen seleccionada" style={{ maxWidth: '500px' }} />
                        </div>
                    )}
                </div>
                <div className='flex justify-center items-center p-2'>
                    <Button color="primary" type="submit">
                        Enviar
                    </Button>
                </div>
            </form>
            {successMessage && (
                <div className='success flex flex-row items-center mx-80'>
                    <div>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-6 h-6 bg-[#00ff00] rounded-full"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    </div>
                    <div>
                        <p className='text-[#00ff00] text-lg whitespace-nowrap'>Envio exitoso.</p>
                    </div>
                </div>
            )}
            {errorMessage && (
                <div className='error flex flex-row items-center mx-80'>
                    <div>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-6 h-6 bg-red-500 rounded-full"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    </div>
                    <div>
                        <p className='text-red-500 text-lg whitespace-nowrap'>Ocurrio un error intentalo mas tarde.</p>
                    </div>
                </div>
            )}
        </main>
    )
}

export default FormCompliance;
