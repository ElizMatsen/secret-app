import {configureStore} from '@reduxjs/toolkit';
import auth from "./auth-slice";
import secrets from "../pages/secrets-list/secretsSlice";

const store = configureStore({
    reducer: {
        auth,
        secrets,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware()
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
