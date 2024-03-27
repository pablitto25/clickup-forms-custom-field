"use client"
import Link from 'next/link';
import React from 'react';






const Etica: React.FC = () => {
    

    return (
        <main className={`flex min-h-screen flex-col pb-12 bg-white p-12`}>
            <p className='font-bold'>Nuestra ética - Our Ethics</p>
            <ul className='text-[#1639FF]'>
                <Link href="/etica/Código de Ética Latamly Group-Comercializadora Latamly Chile S.P.A..pdf"><li>Código de Ética Latamly Group-Comercializadora Latamly Chile S.P.A. - Download</li></Link>
                <Link href="/etica/Código de Ética Latamly Group-Kefordy Limited.pdf"><li>Código de Ética Latamly Group-Kefordy Limited - Download</li></Link>
                <Link href="/etica/Código de Ética Latamly Group-Kefordy S.A..pdf"><li>Código de Ética Latamly Group-Kefordy S.A. - Download</li></Link>
                <Link href="/etica/Código de Ética Latamly Group-Latamly Colombia SAS.pdf"><li>Código de Ética Latamly Group-Latamly Colombia SAS - Download</li></Link>
                <Link href="/etica/Código de Ética Latamly Group-Latamly Group S.L..pdf"><li>Código de Ética Latamly Group-Latamly Group S.L. - Download</li></Link>
                <Link href="/etica/Código de Ética Latamly Group-Latamly México S.R.L. de C.V..pdf"><li>Código de Ética Latamly Group-Latamly México S.R.L. de C.V. - Download</li></Link>
                <Link href="/etica/Código de Ética Latamly Group-Latamly S.A..pdf"><li>Código de Ética Latamly Group-Latamly S.A. - Download</li></Link>
            </ul>
        </main>
    )
}

export default Etica;
