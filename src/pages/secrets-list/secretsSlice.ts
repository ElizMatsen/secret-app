import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {environment} from "../../environments/environment";

export interface CreateSecretState {
    title: string,
    body: string
}

export const initialState = {
    secretsList: [],
}

export const secrets = createAsyncThunk(
    'secrets',
    async () => {
        return axios.get(environment.apiBasepoint + 'secrets')
            .then((res) => res)
    },
)

export const createSecret = createAsyncThunk(
    'createSecret',
    async ({title, body}: CreateSecretState) => {
        return axios.post(environment.apiBasepoint + 'secrets', {
            title: title,
            body: body
        }).then((response) => {
            console.log(response);
        });
    },
)

export const deleteSecret = createAsyncThunk(
    'deleteSecret',
    async (id: { id: string }) => {
        return axios.delete(environment.apiBasepoint + 'secrets/' + id.id).then((response) => {
            console.log(response);
        });
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
                    state.secretsList = action.payload.data.secrets
                }
            )
            .addCase(secrets.rejected, (state) => {
                    console.log(state)
                }
            )
            .addCase(deleteSecret.pending, (state) => {
                    console.log(state)
                }
            )
            .addCase(deleteSecret.fulfilled, (state, action: any) => {
                    console.log(action.payload)
                }
            )
            .addCase(deleteSecret.rejected, (state) => {
                    console.log(state)
                }
            )
    }
})

export default secretsSlice.reducer;


