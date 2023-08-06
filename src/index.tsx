import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import store from "./app/store";
import {Provider} from "react-redux";
import axios from "axios";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

axios.interceptors.request.use(
    config => {
        config.headers['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`;
        return config;
    }
);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);

reportWebVitals();
