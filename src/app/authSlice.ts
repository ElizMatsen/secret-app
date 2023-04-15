import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

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

export const getAccessToken = createAsyncThunk(
    'token',
    async ({email, password}: LoginState) => {
        return fetch('http://localhost:8080/v1/login', {
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
            .addCase(getAccessToken.pending, (state) => {
                    console.log(state)
                }
            )
            .addCase(getAccessToken.fulfilled, (state, action: any ) => {
                    console.log(action.payload)
                    state.access_token = action.payload.accessToken;
                }
            )
            .addCase(getAccessToken.rejected, (state) => {
                console.log(state)
                }
            )
    }
})

export const {
    setAccessToken,
} = authSlice.actions;

export default authSlice.reducer;


