import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";
import {environment} from "../../environments/environment";
import {SecretType} from "../../types/secrets";

export interface SecretState {
    secretsList: Array<SecretType>,
    deleted: boolean,
    created: boolean,
    secretData: SecretType | null,
}

export const initialState: SecretState = {
    secretsList: [],
    deleted: false,
    created: false,
    secretData: null,
}
export const secrets = createAsyncThunk(
    'secrets',
    async () => {
        return await axios.get(environment.apiBasepointSecret + 'secrets')
            .then((response) => response.data);
    },
)
export const createSecret = createAsyncThunk(
    'createSecret',
    async ({title, body}: SecretType) => {
        return await axios.post(environment.apiBasepointSecret + 'secrets', {
            title: title,
            body: body
        }).then((response) => response.data);
    },
)
export const showSecret = createAsyncThunk(
    'showSecret',
    async ({id, email, password}: { id?: string, email: string, password: string }) => {
        return await axios.post(environment.apiBasepointSecret + 'secrets/' + id,
            {
                email: email,
                password: password
            })
            .then((response) => response.data);
    },
)

export const deleteSecret = createAsyncThunk(
    'deleteSecret',
    async (id: string) => {
        return await axios.delete(environment.apiBasepointSecret + 'secrets/' + id)
            .then((response) => response.data);
    },
)
const secretsSlice = createSlice({
    name: 'secrets',
    initialState,
    reducers: {
        setSecretDataAction: (state: SecretState, action: PayloadAction<SecretType | null>) => {
            state.secretData = action.payload;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(secrets.fulfilled, (state: SecretState, action: PayloadAction<{ secrets: Array<SecretType> }>) => {
                    state.secretsList = action.payload.secrets
                }
            )
            .addCase(deleteSecret.pending, (state: SecretState) => {
                    state.deleted = true;
                }
            )
            .addCase(deleteSecret.fulfilled, (state: SecretState) => {
                    state.deleted = false;
                }
            )
            .addCase(deleteSecret.rejected, (state: SecretState) => {
                    state.deleted = false;
                }
            )
            .addCase(createSecret.pending, (state: SecretState) => {
                    state.created = true;
                }
            )
            .addCase(createSecret.fulfilled, (state: SecretState) => {
                    state.created = false;
                }
            )
            .addCase(createSecret.rejected, (state: SecretState) => {
                    state.created = false;
                }
            )
            .addCase(showSecret.fulfilled, (state: SecretState, action: PayloadAction<{ secret: SecretType | null }>) => {
                    if (action.payload !== undefined) {
                        state.secretData = action.payload.secret;
                    }
                }
            )
    }
})

export const actions = secretsSlice.actions;
export default secretsSlice.reducer;


