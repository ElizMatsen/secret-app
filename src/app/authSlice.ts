import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {environment} from "../environments/environment";
import axios from "axios";

export interface LoginState {
    email: string,
    password: string
}

export interface InitialState {
    access_token: null | string,
    user: any,
    created: boolean,
}

export const initialState: InitialState = {
    access_token: null,
    user: null,
    created: false,
}

export const login = createAsyncThunk(
    'login',
    async ({email, password}: LoginState) => {
        return await axios.post(environment.apiBasepointLogin + 'login', {
            email: email,
            password: password
        }).then((response) => response.data)
    },
)

export const registration = createAsyncThunk(
    'registration',
    async ({email, password}: LoginState) => {
        return await axios.post(environment.apiBasepoint + 'user', {
            email: email,
            password: password
        }).then((response) => response.data)
    },
)

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAccessToken: (state: InitialState, action: PayloadAction<string | null>) => {
            state.access_token = action.payload;
            if (action.payload !== null) {
                return localStorage.setItem('access_token', action.payload);
            }
            return localStorage.removeItem('access_token');
        },
        setCreateAction: (state: InitialState, action: PayloadAction<boolean>) => {
            state.created = action.payload;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(login.fulfilled, (state: InitialState, action: PayloadAction<{ accessToken: string | null }>) => {
                    if (action.payload.accessToken !== null) {
                        state.access_token = action.payload.accessToken;
                        localStorage.setItem('access_token', action.payload.accessToken);
                    }
                }
            )
            .addCase(registration.fulfilled, (state: InitialState, action: PayloadAction<any>) => {
                    if (action.payload !== undefined) {
                        state.created = true;
                        state.user = action.payload.user;
                    }
                }
            )
    }
})

export const actions = authSlice.actions;
export default authSlice.reducer;


