import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    accessToken: null,
    isLoading: true,
}

export const appSlice = createSlice({
    initialState,
    name: "app_slice",
    reducers: {
        addAccessTokenToken: (state, action) => {
            state.accessToken = action.payload;
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload
        },
        logout: (state) => {
            state.accessToken = null;
        },
    }
})

export const { addAccessTokenToken, logout, setLoading } = appSlice.actions;
export default appSlice.reducer;