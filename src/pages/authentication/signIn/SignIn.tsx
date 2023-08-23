import React from 'react';
import {SubmitHandler} from "react-hook-form"
import {NavLink} from "react-router-dom";
import UserAuthForm from "../../../components/form/UserAuthForm";
import {LoginRequest} from "../../../types/auth";

type LoginFormProps = {
    onSubmitLoginForm: SubmitHandler<LoginRequest>;
}

function SignIn({onSubmitLoginForm}: LoginFormProps) {
    const currentYear = new Date().getFullYear();
    const onSubmit: SubmitHandler<LoginRequest> = (data) => onSubmitLoginForm(data)
    return (
        <div className='login wh-100'>
            <span/>
            <div className='login__container'>
                <div className='login__body'>
                    <UserAuthForm
                        buttonName={'Log in'}
                        onSubmitLoginForm={onSubmit}/>
                </div>
                <div className='login__footer'>
                    <p className='login__footer-text'> You don't have an account?</p>
                    <NavLink className='login__footer-link pointer' to='/sing-up'>Sign up</NavLink>
                </div>

            </div>
            <div className='copyright mt-1'>{currentYear} &#169; Matsen Production</div>
        </div>
    )
}

export default SignIn;

