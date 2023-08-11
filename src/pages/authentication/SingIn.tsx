import React from 'react';
import {SubmitHandler} from "react-hook-form"
import {NavLink} from "react-router-dom";
import {LoginState} from "../../app/authSlice";
import LoginForm from "../../components/form/Login-form";

type LoginFormProps = {
    onSubmitLoginForm: SubmitHandler<LoginState>;
}

function SingIn({onSubmitLoginForm}: LoginFormProps) {
    const currentYear = new Date().getFullYear();
    const onSubmit: SubmitHandler<LoginState> = (data) => onSubmitLoginForm(data)
    return (
        <div className='login wh-100'>
            <span/>
            <div className='login__container'>
                <div className='login__body'>
                    <LoginForm onSubmitLoginForm={onSubmit}/>
                </div>
                <div className='login__footer'>
                    <p className='login__footer-text'> You don't have an account?</p>
                    <NavLink className='login__footer-link pointer' to='/sing-up'>Sign up</NavLink>
                </div>

            </div>
            <div className='copyright mt-1'>{currentYear} &#169; KikLi Production</div>
        </div>
    )
}

export default SingIn;

