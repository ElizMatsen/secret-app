import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Secrets from "./Secrets";

function SecretsList() {
    return (
        <Routes>
            <Route path="secrets" element={<Secrets/>}/>
        </Routes>
    )
}

export default SecretsList;

