import { createSlice } from '@reduxjs/toolkit'

const chatslice = createSlice({
    name: 'chats',
    initialState: {
        chats: [],
    },
    reducers: {
        // we add here
    }
})

export const { } = chatslice.actions;

export default chatslice.reducer;