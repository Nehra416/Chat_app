import React, { useEffect, useState } from 'react'
import me from "../Img/default.png";
import { GoDotFill } from "react-icons/go";
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { MdMoreHoriz } from 'react-icons/md';
import { useSelector } from 'react-redux';


const UserChats = () => {
    console.log('UserChats');
    const [resData, setResData] = useState([]);
    const navigate = useNavigate();
    let { search } = useLocation();
    search = search.replace('?', '');
    const { id } = useParams();
    const selectChat = (_id) => {
        navigate(`/nehra/chat/?${_id}`);
    }

    let { friendList } = useSelector(store => store.chat);
    console.log("friendlist", friendList);

    
    return (
        <>
            {
                friendList.map((item, index) => {
                    return (
                        <div key={index} onClick={() => selectChat(item.senderId._id)} className={`flex gap-3 items-center cursor-pointer hover:bg-gray-100 mx-2 rounded p-2 group ${search === item.senderId._id && 'bg-gray-200'}`}>
                            <img src={item.senderId.profilePic || me} alt="Dp" className='rounded-full w-12 bg-gray-100 h-12' />
                            <section className='flex flex-col flex-grow '>
                                <span className='font-medium  max-w-[20vw] truncate'>{item.senderId.userName}</span>
                                <section className='flex items-center gap-2 '>
                                    <span className='text-sm text-gray-500 max-w-[18vw] truncate'>{item.lastMessage}</span>
                                    <span className='text-gray-400 text-xs flex items-center'><GoDotFill color='lightgray' size={'10px'} /> 1 day ago</span>
                                </section>
                            </section>
                            <span className='group-hover:block hidden '>
                                <MdMoreHoriz size={'22px'} cursor={'pointer'} />
                            </span>
                            {/* {<GoDotFill color='skyblue' size={'20px'} className='group-hover:hidden block' />} */}
                        </div>
                    )
                })
            }
        </>

    )
}

export default UserChats