import React, {useEffect} from 'react';
import {SubmitHandler} from 'react-hook-form'
import {NavLink, useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {RootState} from "../../../app/store";
import {toast} from "react-toastify";
import UserAuthForm from "../../../components/form/UserAuthForm";
import {LoginRequest} from "../../../types/auth";
import {actions} from "../../../app/authSlice";

type RegistrationFormProps = {
    onSubmitRegistrationForm: SubmitHandler<LoginRequest>;
}

function SignUp({onSubmitRegistrationForm}: RegistrationFormProps) {
    const currentYear = new Date().getFullYear();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const created = useAppSelector((state: RootState) => state.auth.created);

    const onSubmit: SubmitHandler<LoginRequest> = (data) => onSubmitRegistrationForm(data)

    useEffect(() => {
        if (created) {
            toast.success('Created successfully');
            dispatch(actions.setCreateAction(false));
            navigate('/sing-in')
        }
    }, [created]);
    return (
        <div className="login wh-100">
            <span/>
            <div className="login__container">
                <div className="login__body">
                    <UserAuthForm
                        buttonName={'Sing up'}
                        onSubmitLoginForm={onSubmit}/>
                </div>
                <div className="login__footer">
                    <p className="login__footer-text"> Do you have an account?</p>
                    <NavLink className="login__footer-link pointer" to="/sing-in">Log in</NavLink>
                </div>

            </div>
            <div className="copyright mt-1">{currentYear} &#169; KikLi Production</div>
        </div>
    )
}

export default SignUp;

