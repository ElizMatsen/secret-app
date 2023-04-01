import React, {useState} from 'react';
import {useForm} from 'react-hook-form'
import {style} from "../../assets/form-styles/formErrorStyle";
import FormErrorField from "../../components/form-error-field/FormErrorField";

export interface FormLoginTypes {
    email: string,
    password: string
}

function SingIn() {
    const currentYear = new Date().getFullYear();
    const [userData, setUserData] = useState<FormLoginTypes | null>(null);
    const {
        register,
        handleSubmit,
        formState: {errors, isValid}
    } = useForm<FormLoginTypes>({mode: "all"})

    const onSubmit = handleSubmit((data: FormLoginTypes) => {
        setUserData(data)
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
                // setUserData(data)
            })
            .catch((err) => {
                console.log(err.message);
            });
    })

    return (
        <div className="login wh-100">
            <div>
                <span data-testid={'dataEmail'}> {userData?.email}</span>
            </div>

            <div className="login__container">
                <div className="login__body">
                    <form className="form" onSubmit={onSubmit}>
                        <div className="form__input-container">
                            <div className="form__input-item">
                                <FormErrorField error={errors.email}/>
                                <input
                                    {...register('email', {
                                        required: 'Обязательное поле',
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
            </div>
            <div className="copyright mt-1">{currentYear} &#169; Solomon</div>
        </div>
    )
}

export default SingIn;

