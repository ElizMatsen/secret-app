import React, {useEffect} from 'react';
import FormErrorField from "../../components/form-error-field/FormErrorField";
import {style} from "../../assets/form-styles/formErrorStyle";
import {useForm} from "react-hook-form";
import {showSecret} from "./secretsSlice";
import {useAppDispatch} from "../../app/hooks";
import {LoginState} from "../../app/authSlice";

interface Props {
    showSecretId: number | undefined;
}

function ShowSecretForm({showSecretId}: Props) {
    const dispatch = useAppDispatch();
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors, isValid}
    } = useForm<LoginState>({mode: "all"})

    useEffect(() => {
        return () => {
            reset();
        }
    }, []);

    const onSubmitShowCreate = handleSubmit((data: LoginState) => {
        const result = Object.assign(data, {id: showSecretId})
        dispatch(showSecret(result))
    })
    return (
        <form className="form" onSubmit={onSubmitShowCreate}>
            <div className="form__input-container">
                <div className="form__input-item">
                    <FormErrorField error={errors.email}/>
                    <input
                        {...register('email', {
                            required: 'Required field',
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
                            required: 'Required field',
                        })}
                        className="form__input"
                        style={style(errors?.password)}
                        placeholder='Enter password'
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
                    SHOW
                </button>
            </div>
        </form>
    )
}

export default ShowSecretForm;

