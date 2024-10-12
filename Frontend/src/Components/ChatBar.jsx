import React from 'react'
import { MdOpenInNew } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import me from "../Img/me.jpg";
import { GoDotFill } from "react-icons/go";

const ChatBar = () => {
    const chatData = [
        {
            name: 'Deepak Nehra',
            message: 'Hi, How are you?',
            img: me,
            read: true,
        },
        {
            name: 'Deepak Nehra',
            message: 'Hi, How are you?',
            img: me,
            read: true,
        },
        {
            name: 'Deepak Nehra',
            message: 'Hi, How are you?',
            img: me,
            read: true,
        },
        {
            name: 'Deepak Nehra',
            message: 'Hi, How are you?',
            img: me,
            read: true,
        },
        {
            name: 'Deepak Nehra',
            message: 'Hi, How are you?',
            img: me,
            read: true,
        },
        {
            name: 'Deepak Nehra',
            message: 'Hi, How are you?',
            img: me,
            read: true,
        },
        {
            name: 'Deepak Nehra',
            message: 'Hi, How are you?',
            img: me,
            read: true,
        },
        {
            name: 'Deepak Nehra',
            message: 'Hi, How are you?',
            img: me,
            read: true,
        },
        {
            name: 'Deepak Nehra',
            message: 'Hi, How are you?',
            img: me,
            read: true,
        },
        {
            name: 'Deepak Nehra',
            message: 'Hi, How are you?',
            img: me,
            read: true,
        },
        {
            name: 'Deepak Nehra',
            message: 'Hi, How are you?',
            img: me,
            read: true,
        },
        {
            name: 'Deepak Nehra',
            message: 'Hi, How are you?',
            img: me,
            read: true,
        },
        {
            name: 'Deepak Nehra',
            message: 'Hi, How are you?',
            img: me,
            read: true,
        },
        {
            name: 'Deepak Nehra',
            message: 'Hi, How are you?',
            img: me,
            read: true,
        },
        {
            name: 'Deepak Nehra',
            message: 'Hi, How are you?',
            img: me,
            read: true,
        },
        {
            name: 'Deepak Nehra',
            message: 'Hi, How are you?',
            img: me,
            read: true,
        },
        
    ]
    return (
        <div className='h-[96vh] w-[35vw] rounded-xl bg-white my-[2vh] overflow-hidden'>
            <div className='sticky top-0 right-0 left-0 bg-white'>
                <section className='flex justify-between items-center px-5 py-3'>
                    <span className='text-2xl font-medium'>Chat</span>
                    <span className='bg-[#F5F5F5] rounded-full p-1 cursor-pointer'><MdOpenInNew size={'20px'} /></span>
                </section>

                <section className='bg-[#F5F5F5] py-2 mx-5 px-3 rounded-3xl flex items-center gap-2'>
                    <IoSearch size={'20px'} className='text-gray-400' />
                    <input type="text" placeholder='Search . . .' className='bg-[#F5F5F5] flex-grow outline-none text-gray-600 font-medium' />
                </section>

                <hr className='mt-4 mx-3' />
            </div>

            <div className='h-[78vh] overflow-auto chat-scrollbar' >
                {
                    chatData.map((item, index) => {
                        return (
                            <div key={index} className='flex gap-3 items-center cursor-pointer hover:bg-gray-100 mx-2 rounded p-2'>
                                <img src={item.img} alt="Dp" className='rounded-full w-12 h-12' />
                                <section className='flex flex-col flex-grow '>
                                    <span className='font-medium  max-w-[20vw] truncate'>{item.name}</span>
                                    <section className='flex items-center gap-2 '>
                                        <span className='text-sm text-gray-500 max-w-[18vw] truncate'>{item.message}</span>
                                        <span className='text-gray-400 text-xs flex items-center'><GoDotFill color='lightgray' size={'10px'} /> 1 day ago</span>
                                    </section>
                                </section>
                                {item.read && <GoDotFill color='skyblue' size={'20px'} />}
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default ChatBar