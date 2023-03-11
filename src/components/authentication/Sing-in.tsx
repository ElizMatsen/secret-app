import React from 'react';
import {useForm} from 'react-hook-form'
import {style} from "../../assets/formErrorStyle";

export interface FormLoginTypes {
    email: string,
    password: string
}

function SingIn() {
    const currentYear = new Date().getFullYear();

    const {
        register,
        handleSubmit,
        formState: {errors, isValid}
    } = useForm<FormLoginTypes>({mode: "all"})

    const onSubmit = handleSubmit((data: FormLoginTypes) => {
        fetch('http://localhost:8080/v1/login', {
            method: 'POST',
            body: JSON.stringify(data),
            // headers: {
            //     'Content-type': 'application/json; charset=UTF-8',
            // },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
            })
            .catch((err) => {
                console.log(err.message);
            });
    })

    return (
        <div className="login wh-100">
            <span> </span>
            <div className="login__container">
                <div className="login__body">
                    <form className="form" onSubmit={onSubmit}>
                        <div className="form__input-container">
                            <div className="form__input-item">
                                {
                                    errors.email && (
                                        <div className="form__error-container">
                                            <p className="form__error-text">{errors.email?.message}</p>
                                        </div>
                                    )

                                }
                                <input
                                    {...register('email', {
                                        required: 'Обязательное поле',
                                    })}
                                    className="form__input"
                                    style={style(errors?.email)}
                                    placeholder='E-mail'
                                    type="text"/>
                            </div>
                            <div className="form__input-item">
                                {
                                    errors.password && (
                                        <div className="form__error-container">
                                            <p className="form__error-text">{errors.password?.message}</p>
                                        </div>
                                    )

                                }
                                <input
                                    {...register('password', {
                                        required: 'Обязательное поле',
                                    })}
                                    className="form__input"
                                    style={style(errors?.password)}
                                    placeholder='Ведите пароль'
                                    type="password"/>
                            </div>
                        </div>
                        <div className="login__btn-container mt-1">
                            <button
                                type="submit"
                                className="button w-100"
                                disabled={!isValid}
                            >
                                Войти
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="copyright mt-1">{currentYear} &#169; Solomon</div>
        </div>
    )
}

export default SingIn;

