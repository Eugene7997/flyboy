import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentUser: null,
    loading: false,
    error: false,
}

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        signInStart: (state) => {
            state.loading = true
        },
        signInSuccess: (state, action) => {
            state.loading = false
            state.error = false
            state.currentUser = action.payload
        },
        signInFailure: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        signOut: (state) => {
            state.currentUser = null;
            state.loading = false;
            state.error = false;
        },
    }
})

export const { 
    signInStart, 
    signInSuccess, 
    signInFailure,
    signOut     
} = userSlice.actions
export default userSlice.reducer