import React, {useEffect} from 'react';
import FormErrorField from "../../components/form-error-field/FormErrorField";
import {style} from "../../assets/form-styles/formErrorStyle";
import {useForm} from "react-hook-form";
import {createSecret, CreateSecretState} from "./secretsSlice";
import {useAppDispatch} from "../../app/hooks";

function SecretCreateForm() {
    const dispatch = useAppDispatch();
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors, isValid}
    } = useForm<CreateSecretState>({mode: "all"})

    const onSubmitCreateSecret = handleSubmit((data: CreateSecretState) => {
        dispatch(createSecret(data));
        reset();
    })

    useEffect(() => {
        return () => {
            reset();
        }
    }, []);

    return (
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
    )
}

export default SecretCreateForm;

