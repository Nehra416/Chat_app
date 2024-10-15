import { configureStore } from '@reduxjs/toolkit'
import ChatReduser from './ChatSlice';

const store = configureStore({
    reducer: {
        chat: ChatReduser,
    },

})

export default store;