import axios from "axios";
import {toast} from "react-toastify";
import {actions} from "../authSlice";
import store from "../store";

axios.interceptors.response.use(
    (response) => response,
    async (err) => {
        if (err.response.status === 500) {
            toast.error('Server error');
        }
        if (err.response.status === 404 || err.response.status === 400) {
            toast.error('Data entry error');
        }
        if (err.response.status === 401) {
            store.dispatch(actions.setAccessToken(null))
        }
        return err;
    },
);
