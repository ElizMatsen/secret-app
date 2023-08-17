import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {environment} from "../environments/environment";
import axios from "axios";
import {LoginRequest, UserRequest} from "../types/auth";

export interface State {
    access_token: null | string,
    user: any,
    created: boolean,
}

export const initialState: State = {
    access_token: null,
    user: null,
    created: false,
}

export const login = createAsyncThunk<{ accessToken: string | null }, LoginRequest>(
    'login', async ({email, password}: LoginRequest) => {
        const response = await axios.post(environment.apiBasepointLogin + 'login', {
            email: email,
            password: password
        })
        return response.data
    })

export const registration = createAsyncThunk<{ user: UserRequest }, LoginRequest>(
    'registration',
    async ({email, password}: LoginRequest) => {
        const response = await axios.post(environment.apiBasepoint + 'user', {
            email: email,
            password: password
        })
        return response.data;
    },
)

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAccessToken: (state: State, action: PayloadAction<string | null>) => {
            state.access_token = action.payload;
            if (action.payload !== null) {
                localStorage.setItem('access_token', action.payload);
            } else {
                localStorage.removeItem('access_token');
            }
        },
        setCreateAction: (state: State, action: PayloadAction<boolean>) => {
            state.created = action.payload;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(login.fulfilled, (state: State, {payload}: PayloadAction<{ accessToken: string | null }>) => {
                    if (payload.accessToken !== null) {
                        state.access_token = payload.accessToken;
                        localStorage.setItem('access_token', payload.accessToken);
                    }
                }
            )
            .addCase(registration.fulfilled, (state: State, {payload}: PayloadAction<{ user: UserRequest }>) => {
                    if (payload !== undefined) {
                        state.created = true;
                        state.user = payload.user;
                    }
                }
            )
    }
})

export const actions = authSlice.actions;
export default authSlice.reducer;


