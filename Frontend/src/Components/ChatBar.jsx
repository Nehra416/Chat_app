import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { MdOpenInNew } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import me from "../Img/me.jpg";
import { GoDotFill } from "react-icons/go";
import UserChats from './UserChats';
import axios from 'axios';
import AllUsers from './AllUsers';
import RequestChats from './RequestChats';
import ArchieveChats from './ArchieveChats';

const ChatBar = ({ activePage }) => {
    console.log("ChatBar:", activePage);
    // const [MenuBarValue, setMenuBarValue] = useState();
    // const { id } = useParams();
    // useEffect(() => {
    //     setMenuBarValue(id);
    // }, [MenuBarValue, id]);

    // console.log("menubar value is ", MenuBarValue);

    return (
        <div className='h-[96vh] w-[35vw] rounded-xl bg-white my-[2vh] overflow-hidden'>

            {/* Top fixed div for logo and search */}
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
                    activePage == 'chat' ? <UserChats activePage={activePage} /> :
                        activePage == 'all-users' ? <AllUsers activePage={activePage} /> :
                            activePage == 'request' ? <RequestChats activePage={activePage} /> :
                                activePage == 'archeives' ? <ArchieveChats activePage={activePage} /> : null
                }
            </div>
        </div>
    )
}

export default ChatBar