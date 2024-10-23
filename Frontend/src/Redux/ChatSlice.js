import { createSlice } from '@reduxjs/toolkit'

const chatslice = createSlice({
    name: 'chat',
    initialState: {
        friendList: [],
        allUsers: [],
    },
    reducers: {
        // we add here
        setFriendsList: (state, action) => {
            state.friendList = action.payload;
        },
        setAllUsers: (state, action) => {
            state.allUsers = action.payload;
        },
    }
})

export const { setFriendsList, setAllUsers } = chatslice.actions;

export default chatslice.reducer;