import { configureStore } from '@reduxjs/toolkit'
import ChatReduser from './ChatSlice';
import UserReduser from './UserSlice';

const store = configureStore({
    reducer: {
        chat: ChatReduser,
        user: UserReduser
    },

})

export default store;