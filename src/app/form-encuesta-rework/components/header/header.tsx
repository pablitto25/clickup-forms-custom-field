
import style from '@/app/styles/form-encuesta.module.css';
import Image from 'next/image';
import logo from '@/app/form-encuesta-rework/components/header/assets/logo/latamly_group_logo-200x43.png';

const Header: React.FC = () => {




    return (                    
        <header className='flex justify-around items-center w-full h-24 shadow-xl'>
            <div className=''>
                <Image
                    src={logo}
                    width={150}
                    height={150}
                    alt="Picture of the author"
                />
            </div>
            <div>
                
            </div>
        </header>
    )
}

export default Header;
