"use client"
import { useEffect, useState } from 'react';
import { fetchUsersClickUp, MemberData } from './utils/callusers';


export default function Compraempleado() {

    const [userList, setUserList] = useState<JSX.Element[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(null);
    const [showSearch, setShowSearch] = useState(false);
    const [selectedUser, setSelectedUser] = useState<MemberData | null>(null);
    const [showUser, setShowUser] = useState(false);
    const [sheetData, setSheetData] = useState<Array<Array<string>>>([]);

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
                                setShowUser(!showUser);
                                setShowSearch(false); // Cerrar la lista al seleccionar un usuario
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


        /* data sheet */
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
                    // Actualiza el estado con los datos del JSON
                    setSheetData(data.data);
                }

            } catch (error) {
                console.error('Error fetching sheet data:', error);
            }
        }
        /* data sheet */
        // Llama a fetchSheet aquí para que se ejecute al montar el componente
        /* fetchSheet(); */


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

    
    

    return (
        <main className="flex min-h-screen flex-col items-center pt-20 relative">
            <img className='w-20 rounded-full absolute top-11' src="https://attachments2.clickup.com/team_avatars/9002029932_amQ.blob?Expires=1717113600&Key-Pair-Id=APKAIYJRUKB5RLQWHZWQ&Signature=tnAPE4Bz2Z98LZ9Lv0Rzi1EFzMTVdqeNMVZjqVOaDDPnBosiLTBoUBZff8qCzJLbI7M6InLUQsLNpc2jnoXWsPKyT-NKMujVu4~1iUmlb4J7AIFybWjqRjYcISELO3OjVTXFHZ8~FKwkzuQayxn6gwaOWznTDQoQzfzbOCbpKKPIkJKTmt-gIc8JP-vJJm3rH6jkELnCc0sld23wmvxsTa0gFzM2s7nhcsOLwWDDepZIkdO7w5uE~X6m9tf5DftG0rHCDv4ZuPgkiBszopGwwkfaYP9fyfFHH4D3lYt~-58BgDCjLQh~DogMNPWWWE8TkAMkvQx3JVerYjOC6Kw-5w__" alt='' />
            <div className='lg:w-2/4 sm:w-3/5 bg-[#2A2E34] rounded-lg p-16 shadow-lg'>
                <div>
                    <p className='text-2xl pt-6 pb-6 text-[#D5D6D7] text-center font-medium'>Formulario de compras de empleados</p>
                    <p className='text-sm text-[#D5D6D7] text-center'>Bienvenido al formulario de solicitud de compras de empleados. Acá deberás cargar tu solicitud en caso de proceder con la compra de algún producto comercializado por la empresa. </p>
                </div>
                <form>
                    <div className='pt-12'>
                        <label className='text-xs pb-1 text-white'>Solicitante<span className='text-red-500'>*</span></label>
                        <div
                            className='iconUser border-dotted border-2 border-[#4F5762] w-8 h-8 rounded-full hover:cursor-pointer'
                            onClick={() => {
                                setShowSearch(!showSearch);
                                setSelectedUser(null); // Limpiar la selección al abrir la lista
                                /* setShowUser(!showUser); */

                            }}
                        >
                            <svg className="m-auto w-5 h-5 text-gray-400 mt-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 8h6m-3 3V5m-6-.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0ZM5 11h3a4 4 0 0 1 4 4v2H1v-2a4 4 0 0 1 4-4Z" />
                            </svg>
                        </div>
                        
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
                            <input className='bg-[#2A2E34] border-solid border-b border-[#4F5762] hover:border-[#7c8899] focus:border-red-600 outline-none placeholder-gray-500 text-sm text-white' placeholder='Detalle producto y marca' type="text" required />
                        </div>
                        <div className='flex flex-col pt-12'>
                            <label className='text-xs pb-3 text-white'>Link del producto<span className='text-red-500'>*</span></label>
                            <input className='bg-[#2A2E34] border-solid border-b border-[#4F5762] hover:border-[#7c8899] focus:border-red-600 outline-none placeholder-gray-500 text-sm text-white' placeholder='Indique el link del producto en la página' type="text" required />
                        </div>
                        <div className='flex flex-col pt-12 pb-12'>
                            <label className='text-xs pb-3 text-white'>¿Es un producto refurbished?<span className='text-red-500'>*</span></label>
                            <select name="" id="" className='bg-[#2A2E34] border-solid border-b border-[#4F5762] hover:border-[#7c8899] outline-none text-sm text-white' required>
                                <option value="">Seleccionar</option>
                                <option value="vacio">Si</option>
                                <option value="vacio">No</option>
                            </select>
                        </div>
                    </div>
                    <button className='bg-[#F10000] font-bold text-sm hover:text-white w-full h-14 text-white' type="submit">Enviar</button>
                </form>
            </div>
        </main>
    )
}
