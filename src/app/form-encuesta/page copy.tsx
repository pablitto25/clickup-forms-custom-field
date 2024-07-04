"use client"
import style from '@/app/styles/form-encuesta.module.css';
import { Button } from '@nextui-org/react';
import React, { ChangeEvent, useEffect, useState, FC } from 'react';
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

interface StepProps {
    nextStep?: () => void;
    prevStep?: () => void;
}


const FormEncuesta: React.FC = () => {

    const [step, setStep] = useState(1);
    const [formContact, setFormContact] = useState<ContactInformation>({
        Company: '',
        fullName: '',
        Position: '',
    });

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

    const nextStep = () => setStep(prev => prev + 1);
    const prevStep = () => setStep(prev => prev - 1);

    const Step1: FC<StepProps> = ({ nextStep }) => (
        <div>
            {/* encuesta 1 */}
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
            {/* fin encuesta 1 */}
            <button onClick={nextStep}>Next</button>
        </div>
    );

    const Step2: FC<StepProps> = ({ nextStep, prevStep }) => (
        <div>
            <h2>Step 2</h2>
            <input type="radio" name="option" value="1" /> Option 1
            <input type="radio" name="option" value="2" /> Option 2
            <button onClick={prevStep}>Back</button>
            <button onClick={nextStep}>Next</button>
        </div>
    );
    
    const Step3: FC<StepProps> = ({ prevStep }) => (
        <div>
            <h2>Step 3</h2>
            <p>Thank you for completing the survey!</p>
            <button onClick={prevStep}>Back</button>
        </div>
    );



    return (
        <main className={`main flex flex-col items-center ${style.shape}`}>
            <form className={`text-white`}>
                <h2>Informacion de Contacto</h2>
                {step === 1 && <Step1 nextStep={nextStep} />}
                {step === 2 && <Step2 nextStep={nextStep} prevStep={prevStep} />}
                {step === 3 && <Step3 prevStep={prevStep} />}
            </form>


        </main >
    )
}

export default FormEncuesta;
