import React from 'react';
import './App.css';
import SingIn from "./components/authentication/Sing-in";
import {Navigate, Route, Routes} from "react-router-dom";
import "./css/main.scss";

function App() {
    return (
        <Routes>
            <Route path="sing-in" element={<SingIn/>}/>
            <Route path="*" element={<Navigate replace to="/sing-in"/>}/>
        </Routes>
    )
}

export default App;
