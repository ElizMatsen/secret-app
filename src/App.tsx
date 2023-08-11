import React, {useEffect} from 'react';
import SingIn from "./pages/authentication/SingIn";
import {Navigate, Route, Routes} from "react-router-dom";
import "./assets/css/main.scss";
import Layout from "./pages/layout/Layout";
import Secrets from "./pages/secrets-list/Secrets";
import {useAppDispatch, useAppSelector} from "./app/hooks";
import SingUp from "./pages/authentication/SingUp";
import {actions, login, LoginState, registration} from "./app/authSlice";
import {RootState} from "./app/store";
import axios from "axios";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
    const dispatch = useAppDispatch();
    const onSubmitLogin = ((data: LoginState) => {
        dispatch(login(data))
    })
    const onSubmitRegistration = ((data: LoginState) => {
        dispatch(registration(data))
    })
    const token = useAppSelector((state: RootState) => state.auth.access_token);
    const tokenFromLocalstorage = localStorage.getItem('access_token');
    useEffect(() => {
        if (tokenFromLocalstorage !== null) {
            dispatch(actions.setAccessToken(tokenFromLocalstorage))
        }
    }, [tokenFromLocalstorage]);

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
                dispatch(actions.setAccessToken(null))
            }
            return err;
        },
    );

    return (
        <>
            {
                token !== null && (
                    <Routes>
                        <Route element={<Layout/>}>
                            <Route path="secrets-list" element={<Secrets/>}/>
                        </Route>
                        <Route path="*" element={<Navigate replace to="/secrets-list"/>}/>
                    </Routes>
                )
            }
            {
                token === null && (
                    <Routes>
                        <Route path="sing-in" element={<SingIn onSubmitLoginForm={onSubmitLogin}/>}/>
                        <Route path="sing-up" element={<SingUp onSubmitRegistrationForm={onSubmitRegistration}/>}/>
                        <Route path="*" element={<Navigate replace to="/sing-in"/>}/>
                    </Routes>
                )
            }
            <ToastContainer/>
        </>
    )
}

export default App;
