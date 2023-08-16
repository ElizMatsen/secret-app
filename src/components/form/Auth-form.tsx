import React from 'react';
import {SubmitHandler, useForm} from "react-hook-form"
import {style} from "../../assets/form-styles/formErrorStyle";
import FormErrorField from "../../components/form-error-field/FormErrorField";
import {LoginRequest} from "../../types/auth";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";

type LoginFormProps = {
    buttonName: string;
    onSubmitLoginForm: SubmitHandler<LoginRequest>;
}

const validationSchema = yup.object({
    email: yup.string()
        .required("Required field")
        .matches(
            /\S+@\S+\.\S+/,
            'Incorrect email address'
        ),
    password: yup.string().required("Required field"),
});

function AuthForm({buttonName, onSubmitLoginForm}: LoginFormProps) {
    const {
        register,
        handleSubmit,
        formState: {errors, isValid}
    } = useForm({
        resolver: yupResolver(validationSchema),
        mode: 'all'
    })
    const onSubmit: SubmitHandler<LoginRequest> = (data) => onSubmitLoginForm(data)
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

