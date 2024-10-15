import React, { useEffect, useState } from 'react'
import me from "../Img/me.jpg"
import { MdCall } from "react-icons/md";
import { FaVideo } from "react-icons/fa";
import { MdMoreHoriz } from "react-icons/md";
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const Chating = () => {
    const { search } = useLocation();
    const [chatData, setChatData] = useState([]);
    const [inputText, setInputText] = useState('')

    useEffect(() => {
        const getChat = async () => {
            const senderId = search.replace('?', '');
            try {
                const res = await axios.post(`http://localhost:8000/chat/all`, { senderId }, { withCredentials: true })
                console.log("res is :", res);
                setChatData(res.data.messages);
            } catch (error) {
                console.log(error);
            }
        }
        getChat();
    }, [search]);

    const sendMessage = async () => {
        try {
            const senderId = search.replace('?', '');
            const res = await axios.post('http://localhost:8000/chat/send', { senderId, content: inputText }, { withCredentials: true })
            console.log("res is :", res);
            if (res.data.success) {
                setChatData([...chatData, { content: inputText }]);
                setInputText('');
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='bg-white w-[58vw] h-[95vh] my-3 rounded-xl overflow-hidden relative'>

            {/* Chating Header div */}
            <div className='flex justify-between items-center p-3 shadow shadow-gray-200 drop-shadow-xl'>
                <section className='flex items-center gap-2'>
                    <img src={me} alt="Dp" className='rounded-full w-10 h-10' />
                    <span className='text-lg font-medium'>Nehra</span>
                </section>
                <section className='flex gap-4'>
                    <MdCall size={'22px'} cursor={'pointer'} />
                    <FaVideo size={'22px'} cursor={'pointer'} />
                    <MdMoreHoriz size={'22px'} cursor={'pointer'} />
                </section>
            </div>

            {/* Display Message */}
            <div className='overflow-auto h-[75vh] pb-3 chat-scrollbar'>
                <section className='flex gap-2 justify-center flex-col items-center my-7'>
                    <img src={me} alt="Profile" className='rounded-full w-32 h-32' />
                    <span className='text-2xl font-medium max-w-[30vw] truncate'>Deepak Nehra</span>
                </section>
                {
                    chatData.map((item, index) => {
                        return (
                            <div className='mx-2 mt-2' key={index}>
                                {/* Others message */}
                                <section className='flex gap-2 items-center mb-2 group'>
                                    <img src={me} alt="Dp" className='rounded-full w-8 h-8' />
                                    <span className='bg-[#F5F5F5] px-3 py-1 rounded-2xl border max-w-[30vw]'>{item.content}</span>
                                </section>

                                {/* Our Message */}
                                <section className='flex justify-end group'>
                                    <span className='bg-gray-600 text-white px-3 py-1 rounded-2xl border max-w-[30vw]'>{item.content}</span>
                                </section>
                            </div>
                        )
                    })
                }
            </div>

            {/* Send Message div */}
            <div className='flex gap-2 absolute bottom-0 left-0 right-0 mx-2 bg-white py-2'>
                <input value={inputText} onChange={(e) => setInputText(e.target.value)} type="text" className='pl-2 py-1 border rounded outline-none flex-grow' placeholder='Text . . .' />
                <button onClick={sendMessage} className='bg-gray-600 hover:bg-gray-800 text-white px-4 py-2 rounded'>Send</button>
            </div>
        </div>
    )
}

export default Chating