import React from 'react'
import { FaArchive } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";
import { HiUserGroup } from "react-icons/hi2";
import { FaHandshakeAngle } from "react-icons/fa6";
import me from '../Img/me.jpg'
import { GoDotFill } from "react-icons/go";

const MenuBar = () => {
    const read = false;

    return (
        <div className='flex flex-col justify-between items-center h-[100vh] py-[5vh] text-gray-500 px-2 border-r border-white max-w-max'>
            <div className='flex flex-col gap-5'>
                <section title='Messages' className='relative'>
                    <FaUserGroup size={'25px'} className='hover:text-gray-800 cursor-pointer' />
                    {read && <GoDotFill className='absolute -top-2 -right-2 text-blue-400' />}
                </section>
                <span title='Groups' className='relative'>
                    <HiUserGroup size={'25px'} className='hover:text-gray-800 cursor-pointer' />

                    {read && <GoDotFill className='absolute -top-2 -right-2 text-blue-400' />}
                </span>
                <span title='Requests' className='relative'>
                    <FaHandshakeAngle size={'25px'} className='hover:text-gray-800 cursor-pointer' />
                    {read && <GoDotFill className='absolute -top-3 -right-2 text-blue-400' />}
                </span>
                <span title='Archievs' className='relative'>
                    <FaArchive size={'25px'} className='hover:text-gray-800 cursor-pointer' />
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