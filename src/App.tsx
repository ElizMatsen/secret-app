import React, {useEffect} from 'react';
import SingIn from "./pages/authentication/singIn/SingIn";
import {Navigate, Route, Routes} from "react-router-dom";
import "./assets/css/main.scss";
import Layout from "./pages/layout/Layout";
import {useAppDispatch, useAppSelector} from "./app/hooks";
import SingUp from "./pages/authentication/singUp/SingUp";
import {actions, login, registration} from "./app/authSlice";
import {RootState} from "./app/store";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {LoginRequest} from "./types/auth";
import Secrets from "./pages/secrets/Secrets";

function App() {
    const dispatch = useAppDispatch();
    const onSubmitLogin = ((data: LoginRequest) => {
        dispatch(login(data))
    })
    const onSubmitRegistration = ((data: LoginRequest) => {
        dispatch(registration(data))
    })
    const token = useAppSelector((state: RootState) => state.auth.access_token);
    const tokenFromLocalstorage = localStorage.getItem('access_token');
    useEffect(() => {
        if (tokenFromLocalstorage !== null) {
            dispatch(actions.setAccessToken(tokenFromLocalstorage))
        }
    }, [tokenFromLocalstorage]);

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
