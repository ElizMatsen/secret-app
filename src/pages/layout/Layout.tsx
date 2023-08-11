import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Secrets from "../secrets-list/Secrets";
import off from "../../assets/icons/off.svg";
import {useAppDispatch} from "../../app/hooks";
import {actions} from "../../app/authSlice";
import logo from "../../assets/icons/kikly-prodaction-logo.svg";

function Layout() {
    const dispatch = useAppDispatch();

    const logOut = () => {
        dispatch(actions.setAccessToken(null))
    }

    return (
        <div className="container">
            <header className="header">
                <div className="header__logo">
                    <img className="header__logo-img" src={logo} alt=""/>
                </div>
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
                    <Route path="secrets-list/*" element={<Secrets/>}/>
                </Routes>
            </div>
        </div>
    )
}

export default Layout;

