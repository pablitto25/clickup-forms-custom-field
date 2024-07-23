"use client"
import style from '@/app/styles/form-encuesta.module.css';
import React from 'react';
import { SurveyProvider } from '@/app/form-encuesta-rework/components/content/SurveyContext';
import { AppProps } from 'next/app';
import Header from './components/header/header';
import Content from './components/content/content';




const FormEncuestaRework: React.FC<AppProps> = ({ Component, pageProps }) => {


    return (
        <main className={`${style.shape}`}>

            <SurveyProvider>
                <Header />
                <Content />
            </SurveyProvider>

        </main >
    )
}

export default FormEncuestaRework;
