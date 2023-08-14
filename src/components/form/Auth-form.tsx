import React from 'react';
import {Resolver, SubmitHandler, useForm} from "react-hook-form"
import {style} from "../../assets/form-styles/formErrorStyle";
import FormErrorField from "../../components/form-error-field/FormErrorField";
import {LoginType} from "../../types/auth";

type LoginFormProps = {
    buttonName: string;
    onSubmitLoginForm: SubmitHandler<LoginType>;
}
const resolver: Resolver<LoginType> = async (values: LoginType) => {
    if (values.email !== '' && !/\S+@\S+\.\S+/.test(values.email)) {
        return {
            values: values,
            errors: {
                email: {
                    message: 'Incorrect email address'
                }
            },
        }
    }
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

function AuthForm({buttonName, onSubmitLoginForm}: LoginFormProps) {
    const {
        register,
        handleSubmit,
        formState: {errors, isValid}
    } = useForm({
        resolver,
        mode: 'all'
    })
    const onSubmit: SubmitHandler<LoginType> = (data) => onSubmitLoginForm(data)
    return (
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
                    {buttonName}
                </button>
            </div>
        </form>
    )
}

export default AuthForm;

