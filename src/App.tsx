import React from 'react';
import './App.css';
import SingIn from "./pages/authentication/Sing-in";
import {Navigate, Route, Routes} from "react-router-dom";
import "./assets/css/main.scss";
import {useAppSelector} from "./app/hooks";
import {RootState} from "./app/store";
import Layout from "./pages/layout/Layout";

function App() {
    const token = useAppSelector((state: RootState) => state.auth.access_token);
    return (
        <>
            {
                token && (
                    <Routes>
                        <Route path="/" element={<Layout/>}/>
                        <Route path="*" element={<Navigate replace to="/"/>}/>
                    </Routes>
                )
            }
            {
                !token && (
                    <Routes>
                        <Route path="sing-in" element={<SingIn/>}/>
                        <Route path="*" element={<Navigate replace to="/sing-in"/>}/>
                    </Routes>
                )
            }
        </>
    )
}

export default App;
