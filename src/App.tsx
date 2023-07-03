import React, {useEffect} from 'react';
import SingIn from "./pages/authentication/SingIn";
import {Navigate, Route, Routes} from "react-router-dom";
import "./assets/css/main.scss";
import Layout from "./pages/layout/Layout";
import SecretsList from "./pages/secrets-list/SecretsList";
import SecretCreate from "./pages/secrets-list/SecretCreate";
import Secrets from "./pages/secrets-list/Secrets";
import {useAppDispatch, useAppSelector} from "./app/hooks";
import SingUp from "./pages/authentication/SingUp";
import {login, LoginState, registration, setAccessToken} from "./app/authSlice";
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
        if (tokenFromLocalstorage) {
            dispatch(setAccessToken(tokenFromLocalstorage))
        }
    }, [tokenFromLocalstorage]);

    axios.interceptors.response.use(response => {
        return response;
    }, error => {
        console.log(error);
        if (error.response.status === 500) {
            toast.error('Server error');
        }
        if (error.response.status === 404) {
            toast.error('Data entry error');
        }
        if (error.response.status === 401) {
            dispatch(setAccessToken(null))
        }
        return Promise.reject(error)
    });

    return (
        <>
            {
                token && (
                    <Routes>
                        <Route element={<Layout/>}>
                            <Route path="secrets-list" element={<SecretsList/>}>
                                <Route path="secrets" element={<Secrets/>}/>
                                <Route path="secret-create" element={<SecretCreate/>}/>
                            </Route>
                        </Route>
                        <Route path="*" element={<Navigate replace to="/secrets-list"/>}/>
                    </Routes>
                )
            }
            {
                !token && (
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
