import React, {useEffect} from 'react';
import {SubmitHandler} from 'react-hook-form'
import {actions, LoginState} from "../../app/authSlice";
import {NavLink, useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {RootState} from "../../app/store";
import {toast} from "react-toastify";
import LoginForm from "../../components/form/Login-form";

type RegistrationFormProps = {
    onSubmitRegistrationForm: SubmitHandler<LoginState>;
}

function SingUp({onSubmitRegistrationForm}: RegistrationFormProps) {
    const currentYear = new Date().getFullYear();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const created = useAppSelector((state: RootState) => state.auth.created);

    const onSubmit: SubmitHandler<LoginState> = (data) => onSubmitRegistrationForm(data)

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
                    <LoginForm onSubmitLoginForm={onSubmit}/>
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

export default SingUp;

