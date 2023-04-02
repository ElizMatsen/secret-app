import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface AccessTokenState {
    access_token: string | null
}

export interface LoginState {
    email: string,
    password: string
}

const initialState = {
    access_token: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAccessToken: (state: AccessTokenState, action: PayloadAction<string | null>) => {
            state.access_token = action.payload;
            // if (action.payload) {
            //     localStorage.setItem('access_token', action.payload);
            // }
        }
    }
})

export const {
    setAccessToken,
} = authSlice.actions;

export default authSlice.reducer;


