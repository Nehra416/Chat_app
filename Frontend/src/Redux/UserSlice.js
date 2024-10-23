import { createSlice } from '@reduxjs/toolkit'

const userslice = createSlice({
    name: 'user',
    initialState: {
        userData: {},
    },
    reducers: {
        // we add here
        setUserData: (state, action) => {
            state.userData = action.payload;
        },
    }
})

export const { setUserData } = userslice.actions;

export default userslice.reducer;