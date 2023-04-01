import {configureStore} from '@reduxjs/toolkit';
import auth from "./authSlice";

const store = configureStore({
    reducer: {
        auth
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware()
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
