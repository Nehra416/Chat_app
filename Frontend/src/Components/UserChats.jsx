import React, { useEffect, useState } from 'react'
import me from "../Img/me.jpg";
import { GoDotFill } from "react-icons/go";
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { MdMoreHoriz } from 'react-icons/md';


const UserChats = () => {
    const [resData, setResData] = useState([]);
    const navigate = useNavigate();
    let { search } = useLocation();
    search = search.replace('?', '');
    const { id } = useParams();
    const selectChat = (_id) => {
        navigate(`/logo/${id}/?${_id}`);
    }

    useEffect(() => {
        const getUsers = async () => {
            console.log('value fo id is :', id);
            try {
                const res = await axios.get(`http://localhost:8000/user/${id}`, { withCredentials: true });
                console.log('Users :', res.data.users.chatWith);
                setResData(res.data.users.chatWith);
            } catch (err) {
                console.error('Error in getting users :', err);
            }
        }
        getUsers();
    }, [id]);

    return (
        <>
            {
                resData.map((item, index) => {
                    return (
                        <div key={index} onClick={() => selectChat(item.userId._id)} className={`flex gap-3 items-center cursor-pointer hover:bg-gray-100 mx-2 rounded p-2 group ${search === item.userId._id && 'bg-gray-200'}`}>
                            <img src={item.userId.profilePic || me} alt="Dp" className='rounded-full w-12 h-12' />
                            <section className='flex flex-col flex-grow '>
                                <span className='font-medium  max-w-[20vw] truncate'>{item.userId.userName}</span>
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