import React from 'react';
import {Resolver, SubmitHandler, useForm} from "react-hook-form"
import {NavLink} from "react-router-dom";
import {style} from "../../assets/form-styles/formErrorStyle";
import FormErrorField from "../../components/form-error-field/FormErrorField";
import {LoginState} from "../../app/authSlice";

type LoginFormProps = {
    onSubmitLoginForm: any;
}

const resolver: Resolver<LoginState> = async (values) => {
    if (values.email === '') {
        return {
            values: {},
            errors: {
                email: {
                    type: "required",
                    message: "Required field",
                },
            },
        }
    } else if (values.password === '') {
        return {
            values: {},
            errors: {
                password: {
                    type: "required",
                    message: "Required field",
                },
            },
        }
    }
    return {
        values: values,
        errors: {},
    }
}

function SingIn({onSubmitLoginForm}: LoginFormProps) {
    const currentYear = new Date().getFullYear();
    const {
        register,
        handleSubmit,
        formState: {errors, isValid}
    } = useForm({
        resolver,
        mode: 'all'
    })
    const onSubmit: SubmitHandler<LoginState> = (data) => onSubmitLoginForm(data)
    return (
        <div className='login wh-100'>
            <span/>
            <div className='login__container'>
                <div className='login__body'>
                    <form className='form' onSubmit={handleSubmit(onSubmit)}>
                        <div className='form__input-container'>
                            <div className='form__input-item'>
                                <FormErrorField error={errors.email}/>
                                <input {...register('email')}
                                       className="form__input"
                                       style={style(errors?.email)}
                                       placeholder='E-mail'
                                       type='text'
                                       data-testid={'email'}/>
                            </div>
                            <div className='form__input-item'>
                                <FormErrorField error={errors.password}/>
                                <input
                                    {...register('password')}
                                    className="form__input"
                                    style={style(errors?.password)}
                                    placeholder='Enter password'
                                    type='password'
                                    data-testid={'password'}/>
                            </div>
                        </div>
                        <div className='login__btn-container mt-1'>
                            <button
                                type='submit'
                                className='button w-100'
                                disabled={!isValid}
                                data-testid={'submit-button'}
                            >
                                Log in
                            </button>
                        </div>
                    </form>
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

