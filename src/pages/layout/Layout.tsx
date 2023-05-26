import React from 'react';
import SecretsList from "../secrets-list/SecretsList";
import {Navigate, Route, Routes} from 'react-router-dom';
import Secrets from "../secrets-list/Secrets";
import SecretCreate from "../secrets-list/SecretCreate";
import off from "../../assets/icons/off.svg";
import {useAppDispatch} from "../../app/hooks";
import {setAccessToken} from "../../app/authSlice";

function Layout() {
    const dispatch = useAppDispatch();

    const logOut = () => {
        dispatch(setAccessToken(null))
    }

    return (
        <div className="container">
            <header className="header">
                <div className="header__logo">logo</div>
                <div className="user__info">
                    <div className="user__description">
                        <div className="user__name">userName</div>
                    </div>
                    <div className="dropdown__body user__dropdown">
                        <div className="user__dropdown-item log-out" onClick={logOut}>
                            <div className="icon icon_wh-20">
                                <img className="user__dropdown-img" src={off} alt="icon"/>
                            </div>
                            <p className="navigation__item-text alarm-text">Log out</p>
                        </div>
                    </div>
                </div>
            </header>
            <div className="main__container">
                <Routes>
                    <Route path="secrets-list/*" element={<SecretsList/>}>
                        <Route path="secrets" element={<Secrets/>}/>
                        <Route path="secret-create" element={<SecretCreate/>}/>
                    </Route>
                    <Route path="secrets-list" element={<Navigate replace to="/secrets-list/secrets"/>}/>
                </Routes>
            </div>
        </div>
    )
}

export default Layout;

