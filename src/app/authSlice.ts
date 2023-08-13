import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {environment} from "../environments/environment";
import axios from "axios";
import {LoginType} from "../types/auth";

export interface AuthState {
    access_token: null | string,
    user: any,
    created: boolean,
}

export const initialState: AuthState = {
    access_token: null,
    user: null,
    created: false,
}

export const login = createAsyncThunk(
    'login',
    async ({email, password}: LoginType) => {
        return await axios.post(environment.apiBasepointLogin + 'login', {
            email: email,
            password: password
        }).then((response) => response.data)
    },
)

export const registration = createAsyncThunk(
    'registration',
    async ({email, password}: LoginType) => {
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
        setAccessToken: (state: AuthState, action: PayloadAction<string | null>) => {
            state.access_token = action.payload;
            if (action.payload !== null) {
                return localStorage.setItem('access_token', action.payload);
            }
            return localStorage.removeItem('access_token');
        },
    },
    extraReducers(builder) {
        builder
            .addCase(login.fulfilled, (state: AuthState, action: PayloadAction<{ accessToken: string | null }>) => {
                    if (action.payload.accessToken !== null) {
                        state.access_token = action.payload.accessToken;
                        localStorage.setItem('access_token', action.payload.accessToken);
                    }
                }
            )
            .addCase(registration.pending, (state: AuthState) => {
                    state.created = true;
                }
            )
            .addCase(registration.fulfilled, (state: AuthState, action: PayloadAction<any>) => {
                    state.created = false;
                    if (action.payload !== undefined) {
                        state.user = action.payload.user;
                    }
                }
            )
            .addCase(registration.rejected, (state: AuthState) => {
                    state.created = false;
                }
            )
    }
})

export const actions = authSlice.actions;
export default authSlice.reducer;


