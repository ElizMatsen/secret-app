import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";
import {environment} from "../../environments/environment";

export interface SecretDataState {
    id: string,
    title: string,
    body: string
}

export interface InitialState {
    secretsList: Array<SecretDataState>,
    deleted: boolean,
    created: boolean,
    secretData: SecretDataState | null,
}

export const initialState: InitialState = {
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
    async ({title, body}: SecretDataState) => {
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
        setDeleteAction: (state: InitialState, action: PayloadAction<boolean>) => {
            state.deleted = action.payload;
        },
        setCreateAction: (state: InitialState, action: PayloadAction<boolean>) => {
            state.created = action.payload;
        },
        setSecretDataAction: (state: InitialState, action: PayloadAction<SecretDataState | null>) => {
            state.secretData = action.payload;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(secrets.fulfilled, (state: InitialState, action: PayloadAction<{ secrets: Array<SecretDataState> }>) => {
                    state.secretsList = action.payload.secrets
                }
            )
            .addCase(deleteSecret.fulfilled, (state: InitialState) => {
                    state.deleted = true;
                }
            )
            .addCase(createSecret.fulfilled, (state: InitialState) => {
                    state.created = true;
                }
            )
            .addCase(showSecret.fulfilled, (state: InitialState, action: PayloadAction<{ secret: SecretDataState | null }>) => {
                    if (action.payload !== undefined) {
                        state.secretData = action.payload.secret;
                    }
                }
            )
    }
})

export const actions = secretsSlice.actions;
export default secretsSlice.reducer;


