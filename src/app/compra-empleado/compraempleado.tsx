"use client"
import { useEffect, useState } from 'react';
import { fetchUsersClickUp, MemberData } from './utils/callusers';
import { fetchDataVtexProducts } from './utils/callvtexproducts';


export default function Compraempleado() {

    const fechaActual = new Date();
    const timestampActual = fechaActual.getTime();
    const [successMessage, setSuccessMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);

    const [userList, setUserList] = useState<JSX.Element[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [searchTermProduct, setSearchTermProduct] = useState<string>('');
    const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(null);
    const [showSearch, setShowSearch] = useState(false);
    const [selectedUser, setSelectedUser] = useState<MemberData | null>(null);
    const [showUser, setShowUser] = useState(false);
    const [showSolicitante, setShowSolicitante] = useState(true);
    const [selectedUserDNI, setSelectedUserEmail] = useState<string | null>(null);
    const [searchProductTimeout, setSearchProductTimeout] = useState<NodeJS.Timeout | null>(null);
    const [searchResults, setSearchResults] = useState<{ productos_Shipin: { linkText: string; productName: string; imageURL: string; }[] }>({ productos_Shipin: [] });
    const [loading, setLoading] = useState(false);
    const [selectedProductLink, setSelectedProductLink] = useState<string>('');
    const [selectedProductName, setSelectedProductName] = useState<string>('');
    const [searchTermProductInput, setSearchTermProductInput] = useState<string>('');

    const [formData, setFormData] = useState({
        solicitante: 0,
        productoSolicitado: '',
        correo: '',
        linkProducto: '',
        productoRefurbish: '',
        dni: '',
      });

    


    useEffect(() => {
        const fetchData = async () => {

            try {
                const users = await fetchUsersClickUp();
                if (users[0] && users[0].members) {
                    const filteredUsers = users[0].members.filter(member => {
                        return member.user && member.user.username && member.user.username.toLowerCase().includes(searchTerm.toLowerCase());
                    });
                    const newUserList = filteredUsers.map((member: MemberData) => (
                        <li
                            className='hover:bg-[#384047] pb-1 hover:cursor-pointer'
                            key={member.user.id}
                            onClick={() => {
                                setSelectedUser(member);
                                fetchSheet();
                                setShowUser(!showUser);
                                setShowSearch(false); // Cerrar la lista al seleccionar un usuario
                                setShowSolicitante(!showSolicitante); // Ocultar icono buscar usuario
                                setFormData({
                                    ...formData,
                                    solicitante: parseInt(`${member.user.id}`),
                                    correo: `${member.user.email}`
                                });
                                
                            }}
                        >
                            <div className="flex text-white items-center">
                                {member.user.profilePicture ? (
                                    <div>
                                        <img className="photoCircle w-8 rounded-full" src={member.user.profilePicture} alt="" />
                                    </div>
                                ) : (
                                    <div className={`colorCircle bg-[#7B68EE] w-[32px] h-[32px] text-center rounded-full p-2`}>
                                        <p className={`text-xs`}>{member.user.initials}</p>
                                    </div>
                                )}
                                <div className="pl-2">
                                    {member.user.username ? (
                                        <p>{member.user.username}</p>
                                    ) : (
                                        <p>{member.user.email}</p>
                                    )}
                                </div>
                            </div>
                        </li>
                    ));
                    setUserList(newUserList);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }


        };

        // Limpiar el timeout anterior si existe
        if (searchTimeout) {
            clearTimeout(searchTimeout);
        }

        // Establecer un nuevo timeout
        const timeoutId = setTimeout(() => {
            fetchData();
        }, 500); // 500 milisegundos de retraso

        // Guardar el ID del nuevo timeout
        setSearchTimeout(timeoutId);
    }, [searchTerm]);

    const fetchSheet = async () => {
        try {
            const resp = await fetch('http://localhost:3000/api/sheet', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await resp.json();

            if (!data.error && data.data) {
                // Buscar el mail del usuario seleccionado en el resultado del sheet
                const userEmail = data.data.find((row: string[]) => row[1] === selectedUser?.user.email);

                if (userEmail) {
                    setSelectedUserEmail(userEmail[0]); // Guardar el mail en el estado
                    setFormData({
                        ...formData,
                        dni: `${userEmail[0]}`
                    })
                }

            }
        } catch (error) {
            console.error('Error fetching sheet data:', error);
        }
    }

    useEffect(() => {
        if (selectedUser) {
            fetchSheet();
        }
    }, [selectedUser]);

    const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
      };


    const handleSearchProductChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTermProductInput(value);

        // Limpiar el timeout anterior si existe
        if (searchProductTimeout) {
            clearTimeout(searchProductTimeout);
        }

        // Mostrar el indicador de carga
        setLoading(true);

        // Establecer un nuevo timeout
        const timeoutId = setTimeout(() => {
            if (value.trim() === '') {
                // Si el valor está vacío, no realizar la búsqueda y ocultar el indicador de carga
                setSearchResults({ productos_Shipin: [] });
                setLoading(false);
                return;
            }

            fetchDataVtexProducts(value)
                .then((data) => {
                    // Actualizar la lista de productos y ocultar el indicador de carga
                    setSearchResults(data);
                    setLoading(false);
                    console.log('Datos recibidos en el componente:', data);
                })
                .catch((error) => {
                    // Manejar errores y ocultar el indicador de carga
                    console.error('Error en el componente:', error);
                    setLoading(false);
                });
        }, 500); // 500 milisegundos de retraso

        // Guardar el ID del nuevo timeout
        setSearchProductTimeout(timeoutId);
    };


    const handleProductSelection = (selectedLink: string, selectedName: string) => {
        setSelectedProductLink('https://www.shipin.ar/' + selectedLink + '/p');
        setSelectedProductName(selectedName);
        setSearchTermProductInput(selectedName); // Actualizar el valor del campo de búsqueda
        setSearchTermProduct(''); // Limpiar el término de búsqueda
        setSearchResults({ productos_Shipin: [] }); // Limpiar los resultados de búsqueda
        setLoading(false); // Detener el indicador de carga
        setFormData({
            ...formData,
            productoSolicitado: `${selectedName}`,
            linkProducto: `https://www.shipin.ar/${selectedLink}/p`
        });
    };
     //borrar
     console.log(formData);

     const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const resp = await fetch('http://localhost:3000/api/clickupcompraempleado', { // Cambia la URL a tu función API local
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                name: `${selectedUser?.user.username}`,
                description: 'Prueba tarea contacto',
                markdown_description: 'Vacio',
                assignees: [183],
                tags: ['Compra-Empleado'],
                priority: 3,
                due_date: timestampActual,
                due_date_time: false,
                notify_all: true,
                parent: null,
                links_to: null,
                check_required_custom_fields: true,
                custom_fields: [
                  {
                    id: '08e07798-a026-4de3-ae65-73fc584120b4',
                    value: formData.productoSolicitado,
                  },
                  
                  {
                    id: 'd0733872-2b3a-41f9-8897-164e7591c805',
                    value: {
                        add: [67345527],
                        rem: [0]
                    }
                  }, 
                  
                  {
                    id: '0e59b7eb-d311-4878-9d77-bc19acb52fcd',
                    value: formData.correo,
                  },
                  {
                    id: '71900659-2adf-4136-b408-079244e7b690',
                    value: formData.linkProducto,
                  },
                  {
                    id: 'f5a3ed08-95aa-42ed-bdb1-c31ca86e0290',
                    value: formData.dni,
                  }, 
                ],
              }),
            });
        
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

     }


    return (
        <main className="flex min-h-screen flex-col items-center pt-20 relative">
            <img className='w-20 rounded-full absolute top-11' src="https://attachments2.clickup.com/team_avatars/9002029932_amQ.blob?Expires=1717113600&Key-Pair-Id=APKAIYJRUKB5RLQWHZWQ&Signature=tnAPE4Bz2Z98LZ9Lv0Rzi1EFzMTVdqeNMVZjqVOaDDPnBosiLTBoUBZff8qCzJLbI7M6InLUQsLNpc2jnoXWsPKyT-NKMujVu4~1iUmlb4J7AIFybWjqRjYcISELO3OjVTXFHZ8~FKwkzuQayxn6gwaOWznTDQoQzfzbOCbpKKPIkJKTmt-gIc8JP-vJJm3rH6jkELnCc0sld23wmvxsTa0gFzM2s7nhcsOLwWDDepZIkdO7w5uE~X6m9tf5DftG0rHCDv4ZuPgkiBszopGwwkfaYP9fyfFHH4D3lYt~-58BgDCjLQh~DogMNPWWWE8TkAMkvQx3JVerYjOC6Kw-5w__" alt='' />
            <div className='lg:w-2/4 sm:w-3/5 bg-[#2A2E34] rounded-lg p-16 shadow-lg'>
                <div>
                    <p className='text-2xl pt-6 pb-6 text-[#D5D6D7] text-center font-medium'>Formulario de compras de empleados</p>
                    <p className='text-sm text-[#D5D6D7] text-center'>Bienvenido al formulario de solicitud de compras de empleados. Acá deberás cargar tu solicitud en caso de proceder con la compra de algún producto comercializado por la empresa. </p>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className='pt-12'>
                        <label className='text-xs pb-1 text-white'>Solicitante<span className='text-red-500'>*</span></label>
                        {showSolicitante && (
                            <div
                            className='iconUser border-dotted border-2 border-[#4F5762] w-8 h-8 rounded-full hover:cursor-pointer'
                            onClick={() => {
                                setShowSearch(!showSearch);
                                setSelectedUser(null); // Limpiar la selección al abrir la lista
                                
                            }}
                        >
                            <svg className="m-auto w-5 h-5 text-gray-400 mt-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 8h6m-3 3V5m-6-.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0ZM5 11h3a4 4 0 0 1 4 4v2H1v-2a4 4 0 0 1 4-4Z" />
                            </svg>
                        </div>
                        )}
                        

                        {showUser && (
                            <div className='showUserSelected flex items-center'>
                                {selectedUser?.user?.profilePicture ? (
                                    <div>
                                        <img className="photoCircle w-8 rounded-full" src={selectedUser.user.profilePicture} alt="" />
                                    </div>
                                ) : (
                                    <div className={`colorCircle bg-[#7B68EE] w-[32px] h-[32px] text-center rounded-full p-2`}>
                                        <p className={`text-xs`}>{selectedUser?.user?.initials}</p>
                                    </div>
                                )}
                                <div className="pl-2 pr-2 text-white">
                                    {selectedUser?.user?.username ? (
                                        <p>{selectedUser?.user?.username}</p>
                                    ) : (
                                        <p>{selectedUser?.user?.email}</p>
                                    )}
                                </div>
                                <div className='text-white hover:text-red-500 bg-black rounded-full h-[21px] w-[21px] text-center hover:cursor-pointer text-sm'
                                    onClick={() => {
                                        setSelectedUser(null); // Limpiar la selección al abrir la lista
                                        setShowUser(!showUser);
                                        setShowSolicitante(!showSolicitante); // mostrar icono buscar usuario
                                        
                                    }}
                                >x</div>
                            </div>
                        )}

                        {/* start Buscar User */}
                        {showSearch && (
                            <div className="findUser">
                                <div className="flex flex-row items-center bg-[#384047] w-3/5 h-10 rounded-t-lg">
                                    <div className="p-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 text-[#9AA0AA]">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <input
                                            type="text"
                                            placeholder="Buscar..."
                                            className="bg-[#384047] text-white outline-none text-sm"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="list bg-[#30353C] w-3/5 pt-2 pb-2 overflow-auto max-h-64">
                                    <ul>
                                        {userList}
                                    </ul>
                                </div>
                            </div>
                        )}
                        {/* fin Buscar User */}
                        <div className='flex flex-col pt-12'>
                            <label className='text-xs pb-3 text-white'>Nombre del producto solicitado<span className='text-red-500'>*</span></label>
                            <input
                                type="text"
                                placeholder="Detalle producto y marca"
                                className="bg-[#2A2E34] border-solid border-b border-[#4F5762] hover:border-[#7c8899] focus:border-red-600 outline-none placeholder-gray-500 text-sm text-white"
                                value={searchTermProductInput}
                                onChange={handleSearchProductChange}
                                required
                            />
                        </div>
                        <div className="list pb-2 overflow-auto max-h-64">
                            {loading ? (
                                <div className='flex'>
                                    <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2" />
                                    </svg>
                                    <p className='text-white'>Cargando...</p>
                                </div>
                            ) : (
                                <ul className='productList'>
                                    {searchResults.productos_Shipin.length > 0 ? (
                                        <ul className='productList'>
                                            {searchResults.productos_Shipin.map((product, index) => (
                                                <li
                                                    key={index}
                                                    className='hover:bg-[#384047] hover:cursor-pointer'
                                                    onClick={() => handleProductSelection(product.linkText, product.productName)}
                                                >
                                                    <p className='text-white pl-4'>{product.productName}</p>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        searchTermProduct.trim() !== '' && <li>No hay resultados</li>
                                    )}
                                </ul>
                            )}
                        </div>
                        <div className='flex flex-col pt-12'>
                            <label className='text-xs pb-3 text-white'>Link del producto<span className='text-red-500'>*</span></label>
                            <input
                                className='linkProduct bg-[#2A2E34] border-solid border-b border-[#4F5762] hover:border-[#7c8899] focus:border-red-600 outline-none placeholder-gray-500 text-sm text-white'
                                placeholder='Indique el link del producto en la página'
                                type="text"
                                required
                                value={selectedProductLink}
                                onChange={(e) => setSelectedProductLink(e.target.value)}
                            />
                        </div>
                        <div className='flex flex-col pt-12 pb-12'>
                            <label className='text-xs pb-3 text-white'>¿Es un producto refurbished?<span className='text-red-500'>*</span></label>
                            <select name="productoRefurbish" id="" className='bg-[#2A2E34] border-solid border-b border-[#4F5762] hover:border-[#7c8899] outline-none text-sm text-white' required
                            onChange={handleChangeSelect}
                            value={formData.productoRefurbish}>
                                <option value="">Seleccionar</option>
                                <option value="Si">Si</option>
                                <option value="No">No</option>
                            </select>
                        </div>
                    </div>
                    <button className='bg-[#F10000] font-bold text-sm hover:text-white w-full h-14 text-white' type="submit">Enviar</button>
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
              <p className='text-[#00ff00] text-lg whitespace-nowrap'>Confirmación de solicitud de refuerzos.</p>
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
            </div>
        </main>
    )
}
