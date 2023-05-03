import React from 'react';
import './App.css';
import SingIn from "./pages/authentication/SingIn";
import {Navigate, Route, Routes} from "react-router-dom";
import "./assets/css/main.scss";
import Layout from "./pages/layout/Layout";
import SecretsList from "./pages/secrets-list/SecretsList";
import SecretCreate from "./pages/secrets-list/SecretCreate";
import Secrets from "./pages/secrets-list/Secrets";
import {useAppDispatch, useAppSelector} from "./app/hooks";
import {RootState} from "./app/store";
import SingUp from "./pages/authentication/SingUp";
import {login, LoginState, registration} from "./app/authSlice";

function App() {
    const dispatch = useAppDispatch();
    const onSubmitLogin = ((data: LoginState) => {
        dispatch(login(data))
    })
    const onSubmitRegistration = ((data: LoginState) => {
        dispatch(registration(data))
    })
    const token = useAppSelector((state: RootState) => state.auth.access_token);
//     const token = localStorage.getItem('access_token');
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
        </>
    )
}

export default App;
