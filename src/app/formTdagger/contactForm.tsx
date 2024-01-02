"use client"
// components/Formulario.tsx

import { useState } from 'react';
import { Barlow_Condensed } from 'next/font/google';
import paisesData from './paises.json';

const barlow = Barlow_Condensed({
  subsets: ['latin'],
  weight: '600',
  style: 'normal',
});

const apiKey = process.env.NEXT_PUBLIC_CLICKUP_API_URL;



const Formulario = () => {
  const [formData, setFormData] = useState({
    email: '',
    observaciones: '',
    ciudad: '',
    pais: '',
    nombre: '',
    apellido: '',
  });

  const fechaActual = new Date();
  const timestampActual = fechaActual.getTime();  

  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const listId = '900201694393';

    try {
      const resp = await fetch(
        `https://api.clickup.com/api/v2/list/${listId}/task?${new URLSearchParams({
          custom_task_ids: 'true',
          team_id: '123',
        }).toString()}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${apiKey}`,
          },
          body: JSON.stringify({
            name: `${formData.nombre}, ${formData.apellido}`,
            description: 'Prueba tarea contacto',
            markdown_description: `${formData.observaciones}`,
            assignees: [183],
            tags: ['T-Dagger'],
            priority: 3,
            due_date: timestampActual,
            due_date_time: false,
            notify_all: true,
            parent: null,
            links_to: null,
            check_required_custom_fields: true,
            custom_fields: [
              {
                id: '5ae9c0c7-de18-46f7-80b7-c54428475963',
                value: formData.email
              },
              {
                id: '6c85a9fa-0106-4501-8c18-1cacd5fb1351',
                value: formData.observaciones
              },
              {
                id: '856590cf-e268-43d6-ba72-7a1daf26b8af',
                value: formData.ciudad
              },
              {
                id: 'cfa1316b-a8e7-413f-adaf-888ad7274fe5',
                value: formData.pais
              },
              {
                id: 'e8ed4be5-7fea-437a-b03e-d37d653d62ab',
                value: formData.nombre
              },
              {
                id: 'e9df409d-3f85-42eb-b03a-58c30fe2a3d9',
                value: formData.apellido
              }
            ]
          }),
        }
      );

      if (resp.ok) {
        setSuccessMessage(true);
        setErrorMessage(false);
      } else {
        setSuccessMessage(false);
        setErrorMessage(true);
      }

      const data = await resp.json();
      console.log('Respuesta del servidor:', data);
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      setSuccessMessage(false);
      setErrorMessage(true);
    }
  };

  return (
    <div className={`grid lg:grid-cols-3 sm:grid-cols-1 text-sm ${barlow.className}`}>
      <div className='contact_title col-span-1 w-10/12 text-white'>
        <p className='text-2xl font-bold pb-3'>¿NECESITAS REFUERZOS?</p>
        <p className='border-solid border-t border-[#00E200] w-12 pt-3'></p>
        <p className='text-lg'>Completa el formulario para que podamos ayudarte con lo que necesites.</p>
      </div>
      <div className='contact_form col-span-2'>
        <form onSubmit={handleSubmit} className='grid grid-cols-2 gap-y-2 gap-x-4'>
          <div className="box">
            <input
              className='h-12 w-full pl-4 border-solid border-2 border-white-700 bg-black hover:border-gray-400 text-lg text-white'
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder='¿CUÁL ES TU NOMBRE?*'
            />
          </div>
          <div className="box">
            <input
              className='h-12 w-full pl-4 border-solid border-2 border-white-700 bg-black hover:border-gray-400 text-lg text-white'
              type="text"
              name="apellido"
              value={formData.apellido}
              onChange={handleChange}
              placeholder='¿CUÁL ES TU APELLIDO?*'
            />
          </div>
          <div className="box">
            <select
              id="countries"
              name='pais'
              className="h-12 w-full pl-4 bg-black border-solid border-2 border-white-700 hover:border-gray-400 text-gray-400 text-lg"
              onChange={handleChangeSelect}
              value={formData.pais}
            >
              <option value="" disabled>
                ¿EN QUÉ PAÍS VIVES?*
              </option>
              {paisesData.paises.map((pais, index) => (
                <option key={index} value={pais.name}>
                  {pais.name}
                </option>
              ))}
            </select>
          </div>
          <div className="box">
            <input
              className='h-12 w-full pl-4 border-solid border-2 border-white-700 bg-black hover:border-gray-400 text-lg text-white'
              type="text"
              name="ciudad"
              value={formData.ciudad}
              onChange={handleChange}
              placeholder='¿EN QUÉ CIUDAD VIVES?*'
            />
          </div>
          <div className="box col-span-2">
            <input
              className='h-12 w-full pl-4 border-solid border-2 border-white-700 bg-black hover:border-gray-400 text-lg text-white'
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder='INGRESA TU EMAIL*'
              required
            />
          </div>
          <div className="box col-span-2">
            <textarea
              className='h-12 w-full pl-4 pt-3 h-24 border-solid border-2 border-white-700 bg-black hover:border-gray-400 text-lg text-white'
              name="observaciones"
              value={formData.observaciones}
              onChange={handleChangeTextArea}
              placeholder='CUÉNTANOS EN QUÉ PODEMOS AYUDARTE...*'
            />
          </div>
          <button className='bg-[#00E200] font-bold text-lg hover:text-white rounded-full w-52 p-2' type="submit">PEDIR REFUERZOS</button>
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
              <p className='text-[#00ff00] text-lg'>Confirmación de solicitud de refuerzos.</p>
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
                stroke-width="1.5"
                stroke="currentColor"
                className="w-6 h-6 bg-red-500 rounded-full"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
            </div>
            <div>
              <p className='text-red-500 text-lg'>Ocurrio un error intentalo mas tarde.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Formulario;
