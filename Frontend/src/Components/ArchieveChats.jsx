import React from 'react'
import me from "../Img/me.jpg";
import { GoDotFill } from "react-icons/go";
import { useNavigate, useParams } from 'react-router-dom';


const ArchieveChats = ({ item, index }) => {
    const navigate = useNavigate();
    const { id } = useParams();
    const selectChat = () => {
        console.log(item._id);
        navigate(`/logo/${id}/?${item._id}`);
    }

    return (
        <div key={index} onClick={selectChat} className='flex gap-3 items-center cursor-pointer hover:bg-gray-100 mx-2 rounded p-2'>
            <img src={item.profilePic || me} alt="Dp" className='rounded-full w-12 h-12' />
            <section className='flex flex-col flex-grow '>
                <span className='font-medium  max-w-[20vw] truncate'>{item.userName}</span>
                <section className='flex items-center gap-2 '>
                    {/* <span className='text-sm text-gray-500 max-w-[18vw] truncate'>{item.message}</span> */}
                    <span className='text-gray-400 text-xs flex items-center'><GoDotFill color='lightgray' size={'10px'} /> 1 day ago</span>
                </section>
            </section>
            {item.read && <GoDotFill color='skyblue' size={'20px'} />}
        </div>
    )
}

export default ArchieveChats