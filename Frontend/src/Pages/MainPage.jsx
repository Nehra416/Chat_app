import React, { useEffect, useState } from 'react'
import Menubar from "../Components/MenuBar";
import ChatBar from '../Components/ChatBar';
import Chating from '../Components/Chating';
import Profile from '../Components/Profile';
import { useParams } from 'react-router-dom';

const MainPage = () => {
    const [MenuBarValue, setMenuBarValue] = useState();
    const { id } = useParams();
    useEffect(() => {
        setMenuBarValue(id);
    }, [MenuBarValue, id]);

    return (
        <div className='flex gap-3'>
            <Menubar />
            <ChatBar />
            {
                MenuBarValue === 'profile' ?
                    <Profile /> :
                    <Chating />
            }
            {/* <Chating className="flex-grow" /> */}
            {/* <Profile /> */}
        </div>
    )
}

export default MainPage