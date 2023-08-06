import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";
import {environment} from "../../environments/environment";

export interface CreateSecretState {
    title: string,
    body: string
}

export interface SecretDataState {
    id: string,
    title: string,
    body: string
}

export const initialState = {
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
    async ({title, body}: CreateSecretState) => {
        return await axios.post(environment.apiBasepointSecret + 'secrets', {
            title: title,
            body: body
        }).then((response) => response.data);
    },
)
export const showSecret = createAsyncThunk(
    'showSecret',
    async ({id, email, password}: { id: number | null | undefined, email: string, password: string }) => {
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
        setDeleteAction: (state: any, action: PayloadAction<boolean>) => {
            state.deleted = action.payload;
        },
        setCreateAction: (state: any, action: PayloadAction<boolean>) => {
            state.created = action.payload;
        },
        setSecretDataAction: (state: any, action: PayloadAction<any>) => {
            state.secretData = action.payload;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(secrets.pending, (state) => {
                    console.log(state)
                }
            )
            .addCase(secrets.fulfilled, (state, action: any) => {
                    state.secretsList = action.payload.secrets
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
                    state.deleted = true;
                }
            )
            .addCase(deleteSecret.rejected, (state) => {
                    console.log(state)
                }
            )
            .addCase(createSecret.pending, (state) => {
                    console.log(state)
                }
            )
            .addCase(createSecret.fulfilled, (state, action: any) => {
                    state.created = true;
                }
            )
            .addCase(createSecret.rejected, (state) => {
                    console.log(state)
                }
            )
            .addCase(showSecret.pending, (state) => {
                    console.log(state)
                }
            )
            .addCase(showSecret.fulfilled, (state, action: any) => {
                    state.secretData = action.payload?.secret;
                }
            )
            .addCase(showSecret.rejected, (state) => {
                    console.log(state)
                }
            )
    }
})
export const {
    setDeleteAction,
    setCreateAction,
    setSecretDataAction,
} = secretsSlice.actions;

export default secretsSlice.reducer;


