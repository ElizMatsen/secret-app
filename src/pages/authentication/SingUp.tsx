import React, {useState} from 'react';
import {useForm} from 'react-hook-form'
import {style} from "../../assets/form-styles/formErrorStyle";
import FormErrorField from "../../components/form-error-field/FormErrorField";
import {LoginState, registration, setAccessToken} from "../../app/authSlice";
import {useAppDispatch} from "../../app/hooks";
import {toast} from "react-toastify";
import {NavLink, useNavigate} from "react-router-dom";

function SingUp() {
    const currentYear = new Date().getFullYear();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: {errors, isValid}
    } = useForm<LoginState>({mode: "all"})

    const onSubmit = handleSubmit((data: LoginState) => {
        dispatch(registration(data))
    })

    return (
        <div className="login wh-100">
            <span></span>
            <div className="login__container">
                <div className="login__body">
                    <form className="form" onSubmit={onSubmit}>
                        <div className="form__input-container">
                            <div className="form__input-item">
                                <FormErrorField error={errors.email}/>
                                <input
                                    {...register('email', {
                                        required: 'Обязательное поле',
                                        pattern: {
                                            value: /\S+@\S+\.\S+/,
                                            message: 'Некорректный email адрес'
                                        }
                                    })}
                                    className="form__input"
                                    style={style(errors?.email)}
                                    placeholder='E-mail'
                                    type="text"
                                    data-testid={'email'}/>
                            </div>
                            <div className="form__input-item">
                                <FormErrorField error={errors.password}/>
                                <input
                                    {...register('password', {
                                        required: 'Обязательное поле',
                                    })}
                                    className="form__input"
                                    style={style(errors?.password)}
                                    placeholder='Ведите пароль'
                                    type="password"
                                    data-testid={'password'}/>
                            </div>
                        </div>
                        <div className="login__btn-container mt-1">
                            <button
                                type="submit"
                                className="button w-100"
                                disabled={!isValid}
                                data-testid={'submit-button'}
                            >
                                Войти
                            </button>
                        </div>
                    </form>
                </div>
                <div className="login__footer">
                    <p className="login__footer-text"> У Вас есть акаунт?</p>
                    <NavLink className="login__footer-link pointer" to="/sing-in">Войти</NavLink>
                </div>

            </div>
            <div className="copyright mt-1">{currentYear} &#169; Solomon</div>
        </div>
    )
}

export default SingUp;

