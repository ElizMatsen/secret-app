import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {environment} from "../../environments/environment";
import axios from "axios";

export const initialState = {
    secrets: null,
}
export const secrets = createAsyncThunk(
    'login',
    async () => {
        return axios(environment.apiBasepoint + 'secrets')
            .then((res) => res)
    },
)

const secretsSlice = createSlice({
    name: 'secrets',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(secrets.pending, (state) => {
                    console.log(state)
                }
            )
            .addCase(secrets.fulfilled, (state, action: any) => {
                    console.log(action.payload)

                }
            )
            .addCase(secrets.rejected, (state) => {
                    console.log(state)
                }
            )
    }
})

export default secretsSlice.reducer;


