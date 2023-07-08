import React, {useEffect} from 'react';
import FormErrorField from "../../components/form-error-field/FormErrorField";
import {style} from "../../assets/form-styles/formErrorStyle";
import {useForm} from "react-hook-form";
import {SecretDataState, setSecretDataAction, showSecret} from "./secretsSlice";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {LoginState} from "../../app/authSlice";
import {RootState} from "../../app/store";

interface Props {
    showSecretId: number | undefined;
}

function ShowSecretForm({showSecretId}: Props) {
    const dispatch = useAppDispatch();
    const secretData = useAppSelector<SecretDataState | null>((state: RootState) => state.secrets.secretData);
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

    useEffect(() => {
        if (secretData) {
            setTimeout(() => {
                dispatch(setSecretDataAction(null));
            }, 5000);
        }
    }, [secretData]);

    const onSubmitShowCreate = handleSubmit((data: LoginState) => {
        const result = Object.assign(data, {id: showSecretId})
        dispatch(showSecret(result))
    })
    return (
        <>
            {
                !secretData &&
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
            }
            {
                secretData
                &&
                <div className="secret-container">
                    <div className="secret-item">
                        <strong>ID:</strong> {secretData.id}
                    </div>
                    <div className="secret-item">
                        <strong>TITLE:</strong> {secretData.title}
                    </div>
                    <div className="secret-item">
                        <strong>BODY:</strong> {secretData.body}
                    </div>
                </div>
            }
        </>
    )
}

export default ShowSecretForm;

