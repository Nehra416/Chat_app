import React from 'react'
import { FaArchive } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";
import { HiUserGroup } from "react-icons/hi2";
import { FaHandshakeAngle } from "react-icons/fa6";
import me from '../Img/default.png'
import { GoDotFill } from "react-icons/go";
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const MenuBar = ({ activePage, setActivePage }) => {
    const read = false;
    // const navigate = useNavigate();
    // const { id } = useParams();
    const { userData } = useSelector(store => store.user);

    return (
        <div className='flex flex-col justify-between items-center h-[100vh] py-[5vh] text-gray-500 px-2 border-r border-white max-w-max'>
            <div className='flex flex-col gap-5'>
                <section title='Messages' className='relative' onClick={() => setActivePage('chat')}>
                    <FaUserGroup size={'25px'} className={`hover:text-gray-800 cursor-pointer ${activePage == 'chat' && 'text-gray-950'}`} />
                    {read && <GoDotFill className='absolute -top-2 -right-2 text-blue-400' />}
                </section>
                <span title='Groups' className='relative' onClick={() => setActivePage('all-users')}>
                    <HiUserGroup size={'25px'} className={`hover:text-gray-800 cursor-pointer ${activePage == 'all-users' && 'text-gray-950'}`} />
                    {read && <GoDotFill className='absolute -top-2 -right-2 text-blue-400' />}
                </span>
                <span title='Requests' className='relative' >
                    <FaHandshakeAngle size={'25px'} className={`hover:text-gray-800 cursor-pointer ${activePage == 'request' && 'text-gray-950'}`} />
                    {read && <GoDotFill className='absolute -top-3 -right-2 text-blue-400' />}
                </span>
                <span title='Archievs' className='relative' >
                    <FaArchive size={'25px'} className={`hover:text-gray-800 cursor-pointer ${activePage == 'archeives' && 'text-gray-950'}`} />
                    {read && <GoDotFill className='absolute -top-3 -right-2 text-blue-400' />}
                </span>
            </div>
            <div onClick={() => setActivePage('profile')}>
                <img src={userData?.profilePic || me} alt="Dp" title='Profile' className='rounded-full w-8 h-8' />
            </div>
        </div>
    )
}

export default MenuBar