import React from 'react';
import FormErrorField from "../../components/form-error-field/FormErrorField";
import {style} from "../../assets/form-styles/formErrorStyle";
import {useForm} from "react-hook-form";
import {createSecret, CreateSecretState, showSecret} from "./secretsSlice";
import {useAppDispatch} from "../../app/hooks";
import {LoginState} from "../../app/authSlice";

interface Props {
    modal?: () => void;
    formType?: string | null;
    showSecretId?: number | null;
}

function SecretCreate({modal, formType, showSecretId}: Props) {
    const dispatch = useAppDispatch();
    const bodyClassList = document.body.classList;
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors, isValid}
    } = useForm<CreateSecretState>({mode: "all"})
    const {
        register: showSecretRegister,
        handleSubmit: showSecretHandleSubmit,
        reset: showSecretReset,
        formState: {errors: showSecretErrors, isValid: showSecretIsValid}
    } = useForm<LoginState>({mode: "all"})

    const onSubmitCreateSecret = handleSubmit((data: CreateSecretState) => {
        dispatch(createSecret(data));
        reset();
    })

    modal = () => {
        bodyClassList.remove("modal-open");
        bodyClassList.add("closed");
        reset();
    }
    const onSubmitShowCreate = showSecretHandleSubmit((data: LoginState) => {
        const result = Object.assign(data, {id: showSecretId})
        dispatch(showSecret(result))
    })
    return (
        <>
            <div className="modal-background" onClick={modal}/>
            <div className="modal">
                {
                    formType === 'createSecret'
                    &&
                    <form className="form" onSubmit={onSubmitCreateSecret}>
                        <div className="form__input-container">
                            <div className="form__input-item">
                                <FormErrorField error={errors.title}/>
                                <input
                                    {...register('title', {
                                        required: 'Required field',
                                    })}
                                    className="form__input"
                                    style={style(errors?.title)}
                                    placeholder='Title'
                                    type="text"/>
                            </div>
                            <div className="form__input-item">
                                <FormErrorField error={errors.body}/>
                                <input
                                    {...register('body', {
                                        required: 'Required field',
                                    })}
                                    className="form__input"
                                    style={style(errors?.body)}
                                    placeholder='Body'
                                    type="text"/>
                            </div>
                        </div>
                        <div className="login__btn-container mt-1">
                            <button
                                type="submit"
                                className="button w-100"
                                disabled={!isValid}
                            >
                                Create
                            </button>
                        </div>
                    </form>
                }
                {
                    formType === 'showSecret'
                    &&
                    <form className="form" onSubmit={onSubmitShowCreate}>
                        <div className="form__input-container">
                            <div className="form__input-item">
                                <FormErrorField error={showSecretErrors.email}/>
                                <input
                                    {...showSecretRegister('email', {
                                        required: 'Required field',
                                    })}
                                    className="form__input"
                                    style={style(showSecretErrors?.email)}
                                    placeholder='E-mail'
                                    type="text"
                                    data-testid={'email'}/>
                            </div>
                            <div className="form__input-item">
                                <FormErrorField error={showSecretErrors.password}/>
                                <input
                                    {...showSecretRegister('password', {
                                        required: 'Required field',
                                    })}
                                    className="form__input"
                                    style={style(showSecretErrors?.password)}
                                    placeholder='Enter password'
                                    type="password"
                                    data-testid={'password'}/>
                            </div>
                        </div>
                        <div className="login__btn-container mt-1">
                            <button
                                type="submit"
                                className="button w-100"
                                disabled={!showSecretIsValid}
                                data-testid={'submit-button'}
                            >
                                SHOW
                            </button>
                        </div>
                    </form>
                }
            </div>
        </>
    )
}

export default SecretCreate;

