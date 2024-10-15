import React from 'react'
import { FaArchive } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";
import { HiUserGroup } from "react-icons/hi2";
import { FaHandshakeAngle } from "react-icons/fa6";
import me from '../Img/me.jpg'
import { GoDotFill } from "react-icons/go";
import { useNavigate, useParams } from 'react-router-dom';

const MenuBar = () => {
    const read = false;
    const navigate = useNavigate();
    const { id } = useParams();

    return (
        <div className='flex flex-col justify-between items-center h-[100vh] py-[5vh] text-gray-500 px-2 border-r border-white max-w-max'>
            <div className='flex flex-col gap-5'>
                <section title='Messages' className='relative' onClick={() => navigate('/logo/chat')}>
                    <FaUserGroup size={'25px'} className={`hover:text-gray-800 cursor-pointer ${id == 'chat' && 'text-gray-950'}`} />
                    {read && <GoDotFill className='absolute -top-2 -right-2 text-blue-400' />}
                </section>
                <span title='Groups' className='relative' onClick={() => navigate('/logo/all-users')}>
                    <HiUserGroup size={'25px'} className={`hover:text-gray-800 cursor-pointer ${id == 'all-users' && 'text-gray-950'}`} />
                    {read && <GoDotFill className='absolute -top-2 -right-2 text-blue-400' />}
                </span>
                <span title='Requests' className='relative' >
                    <FaHandshakeAngle size={'25px'} className={`hover:text-gray-800 cursor-pointer ${id == 'request' && 'text-gray-950'}`} />
                    {read && <GoDotFill className='absolute -top-3 -right-2 text-blue-400' />}
                </span>
                <span title='Archievs' className='relative' >
                    <FaArchive size={'25px'} className={`hover:text-gray-800 cursor-pointer ${id == 'archeives' && 'text-gray-950'}`} />
                    {read && <GoDotFill className='absolute -top-3 -right-2 text-blue-400' />}
                </span>
            </div>
            <div>
                <img src={me} alt="Dp" title='Profile' className='rounded-full w-8 h-8' />
            </div>
        </div>
    )
}

export default MenuBar