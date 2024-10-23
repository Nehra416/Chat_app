import React, { useEffect, useState } from 'react'
import Menubar from "../Components/MenuBar";
import ChatBar from '../Components/ChatBar';
import Chating from '../Components/Chating';
import Profile from '../Components/Profile';
import { useParams } from 'react-router-dom';
import GetAllTypeChats from '@/hooks/GetAllTypeChats';

const MainPage = () => {
    const [activePage, setActivePage] = useState('chat');
    // const { id } = useParams();
    // useEffect(() => {
    //     setMenuBarValue(id);
    // }, [MenuBarValue, id]);
    console.log('ActivePage', activePage);
    return (
        <div className='flex gap-3'>
            {GetAllTypeChats(activePage)}

            <Menubar activePage={activePage} setActivePage={setActivePage} />

            {/* {
                activePage === 'chat' && <Chating />
            } */}

            <ChatBar activePage={activePage} />
            {/* {
                MenuBarValue === 'profile' ?
                    <Profile /> :
                    <Chating />
            } */}
            {
                activePage === 'profile' ?
                 <Profile /> : <Chating />
            }
        </div>
    )
}

export default MainPage