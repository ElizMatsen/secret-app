import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";
import {environment} from "../../environments/environment";
import {CreateSecretRequest, SecretResponse, ShowSecretRequest} from "../../types/secrets";

export interface State {
    secretsList: Array<SecretResponse>,
    deleted: boolean,
    created: boolean,
    secretData: SecretResponse | null,
}

export const initialState: State = {
    secretsList: [],
    deleted: false,
    created: false,
    secretData: null,
}
export const secrets = createAsyncThunk<{ secrets: Array<SecretResponse> }>(
    'secrets',
    async () => {
        const response = await axios.get(environment.apiBasepointSecret + 'secrets');
        return response.data;
    },
)
export const createSecret = createAsyncThunk(
    'createSecret',
    async ({title, body}: CreateSecretRequest) => {
        const response = await axios.post(environment.apiBasepointSecret + 'secrets', {
            title: title,
            body: body
        })
        return response.data;
    },
)
export const showSecret = createAsyncThunk<{ secret: SecretResponse | null }, ShowSecretRequest>(
    'showSecret',
    async ({id, email, password}: ShowSecretRequest) => {
        const response = await axios.post(environment.apiBasepointSecret + 'secrets/' + id,
            {
                email: email,
                password: password
            })
        return response.data;
    },
)

export const deleteSecret = createAsyncThunk(
    'deleteSecret',
    async (id: string) => {
        const response = await axios.delete(environment.apiBasepointSecret + 'secrets/' + id)
        return response.data;
    },
)
const secretsSlice = createSlice({
    name: 'secrets',
    initialState,
    reducers: {
        setSecretDataAction: (state: State, action: PayloadAction<SecretResponse | null>) => {
            state.secretData = action.payload;
        },
        setCreateAction: (state: State, action: PayloadAction<boolean>) => {
            state.created = action.payload;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(secrets.fulfilled, (state: State, {payload}: PayloadAction<{ secrets: Array<SecretResponse> }>) => {
                    if (payload !== undefined) {
                        state.secretsList = payload.secrets
                    }
                }
            )
            .addCase(deleteSecret.pending, (state: State) => {
                    state.deleted = true;
                }
            )
            .addCase(deleteSecret.fulfilled, (state: State) => {
                    state.deleted = false;
                }
            )
            .addCase(deleteSecret.rejected, (state: State) => {
                    state.deleted = false;
                }
            )
            .addCase(createSecret.fulfilled, (state: State) => {
                    state.created = true;
                }
            )
            .addCase(showSecret.fulfilled, (state: State, {payload}: PayloadAction<{ secret: SecretResponse | null }>) => {
                    if (payload !== undefined) {
                        state.secretData = payload.secret;
                    }
                }
            )
    }
})

export const actions = secretsSlice.actions;
export default secretsSlice.reducer;


