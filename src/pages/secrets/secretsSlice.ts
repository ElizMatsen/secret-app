import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";
import {environment} from "../../environments/environment";
import {SecretType, ShowSecretRequest} from "../../types/secrets";

export interface State {
    secretsList: Array<SecretType>,
    deleted: boolean,
    created: boolean,
    secretData: SecretType | null,
}

export const initialState: State = {
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
    async ({id, email, password}: ShowSecretRequest) => {
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
        setSecretDataAction: (state: State, action: PayloadAction<SecretType | null>) => {
            state.secretData = action.payload;
        },
        setCreateAction: (state: State, action: PayloadAction<boolean>) => {
            state.created = action.payload;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(secrets.fulfilled, (state: State, action: PayloadAction<{ secrets: Array<SecretType> }>) => {
                    state.secretsList = action.payload.secrets
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
            .addCase(showSecret.fulfilled, (state: State, action: PayloadAction<{ secret: SecretType | null }>) => {
                    if (action.payload !== undefined) {
                        state.secretData = action.payload.secret;
                    }
                }
            )
    }
})

export const actions = secretsSlice.actions;
export default secretsSlice.reducer;


