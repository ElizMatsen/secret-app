import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Secrets from "./Secrets";
import SecretCreate from "./SecretCreate";

function SecretsList() {
    return (
        <Routes>
            <Route path="secrets" element={<Secrets/>}/>
            <Route path="secret-create" element={<SecretCreate/>}/>
        </Routes>
    )
}

export default SecretsList;

