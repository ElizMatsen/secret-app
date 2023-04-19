import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {environment} from "../environments/environment";

export interface AccessTokenState {
    access_token: string | null
}

export interface LoginState {
    email: string,
    password: string
}

export const initialState = {
    access_token: null,
}

export const login = createAsyncThunk(
    'login',
    async ({email, password}: LoginState) => {
        return fetch(environment.apiBasepoint + 'login', {
            method: 'POST',
            body: JSON.stringify({
                email,
                password,
            }),
        })
            .then((response) => response.json())
            .catch((err) => {
                console.log(err.message);
            });
    },
)

export const registration = createAsyncThunk(
    'registration',
    async ({email, password}: LoginState) => {
        return fetch(environment.apiBasepoint + 'create-user', {
            method: 'POST',
            body: JSON.stringify({
                email,
                password,
            }),
        })
            .then((response) => response.json())
            .catch((err) => {
                console.log(err.message);
            });
    },
)

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
    },
    extraReducers(builder) {
        builder
            .addCase(login.pending, (state) => {
                    console.log(state)
                }
            )
            .addCase(login.fulfilled, (state, action: any ) => {
                    console.log(action.payload)
                    state.access_token = action.payload.accessToken;
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
            .addCase(registration.fulfilled, (state, action: any ) => {
                    console.log(action.payload)
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
} = authSlice.actions;

export default authSlice.reducer;


