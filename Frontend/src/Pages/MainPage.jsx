import React from 'react'
import Menubar from "../Components/MenuBar";
import ChatBar from '../Components/ChatBar';
import Chating from '../Components/Chating';

const MainPage = () => {
    return (
        <div className='flex gap-3'>
            <Menubar />
            <ChatBar />
            <Chating className="flex-grow"/>
        </div>
    )
}

export default MainPage