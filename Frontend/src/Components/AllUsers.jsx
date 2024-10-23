import React, { useEffect, useState } from 'react'
import me from "../Img/default.png";
import { GoDotFill } from "react-icons/go";
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';


const AllUsers = () => {
    console.log('AllUsers');
    const [resData, setResData] = useState([]);
    // const navigate = useNavigate();
    let { search } = useLocation();
    search = search.replace('?', '');
    // const { id } = useParams();
    // const selectChat = (_id) => {
    //     navigate(`/nehra/${id}/?${_id}`);
    // }

    // useEffect(() => {
    //     const getUsers = async () => {
    //         console.log('value fo id is :', id);
    //         try {
    //             const res = await axios.get(`http://localhost:8000/user/${id}`, { withCredentials: true });
    //             console.log('Users :', res.data.users);
    //             setResData(res.data.users);
    //         } catch (err) {
    //             console.error('Error in getting users :', err);
    //         }
    //     }
    //     getUsers();
    // }, [allUsers]);

    const { allUsers } = useSelector(store => store.chat);
    console.log('AllUsers :', allUsers)
    // useEffect(() => {
    //     setResData(allUsers.data.users);
    // }, [allUsers]);

    return (
        <>
            {
                allUsers.map((item, index) => {
                    return (
                        <div key={index} className={`flex gap-3 items-center cursor-pointer hover:bg-gray-100 mx-2 rounded p-2 ${search === item._id && ' bg-gray-200'}`}>
                            <img src={item.profilePic || me} alt="Dp" className='rounded-full w-12 h-12' />
                            <section className='flex flex-col flex-grow '>
                                <span className='font-medium  max-w-[20vw] truncate'>{item.userName}</span>
                                <section className='flex items-center gap-2 '>
                                    {/* <span className='text-sm text-gray-500 max-w-[18vw] truncate'>{item.lastMessage}</span> */}
                                    {/* <span className='text-gray-400 text-xs flex items-center'><GoDotFill color='lightgray' size={'10px'} /> 1 day ago</span> */}
                                </section>
                            </section>
                        </div>
                    )
                })
            }
        </>

    )
}

export default AllUsers