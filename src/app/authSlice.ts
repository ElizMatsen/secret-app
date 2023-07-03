import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {environment} from "../environments/environment";
import axios from "axios";

export interface AccessTokenState {
    access_token: string | null
}

export interface LoginState {
    email: string,
    password: string
}

export const initialState = {
    access_token: null,
    user: {email: ''},
    created: false,
}

export const login = createAsyncThunk(
    'login',
    async ({email, password}: LoginState) => {
        return axios.post(environment.apiBasepoint + 'login', {
            email: email,
            password: password
        }).then((response) => response.data)
    },
)

export const registration = createAsyncThunk(
    'registration',
    async ({email, password}: LoginState) => {
        return axios.post(environment.apiBasepoint + 'create-user', {
            email: email,
            password: password
        }).then((response) => response.data)
    },
)

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAccessToken: (state: AccessTokenState, action: PayloadAction<string | null>) => {
            state.access_token = action.payload;
            if (action.payload) {
                localStorage.setItem('access_token', action.payload);
            } else {
                localStorage.removeItem('access_token');
            }
        },
        setCreateAction: (state: any, action: PayloadAction<boolean>) => {
            state.created = action.payload;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(login.pending, (state) => {
                    console.log(state)
                }
            )
            .addCase(login.fulfilled, (state, action: any) => {
                    if (action.payload && action.payload.accessToken) {
                        state.access_token = action.payload.accessToken;
                        localStorage.setItem('access_token', action.payload.accessToken);
                    }
                }
            )
            .addCase(login.rejected, (state) => {
                    console.log(state)
                }
            )
            .addCase(registration.pending, (state) => {
                    console.log(state)
                }
            )
            .addCase(registration.fulfilled, (state, action: any) => {
                    console.log(action.payload)
                    state.user = action.payload.user;
                    state.created = true;
                }
            )
            .addCase(registration.rejected, (state) => {
                    console.log(state)
                }
            )
    }
})

export const {
    setAccessToken,
    setCreateAction,
} = authSlice.actions;

export default authSlice.reducer;


