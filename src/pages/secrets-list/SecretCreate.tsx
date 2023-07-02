import React from 'react';
import FormErrorField from "../../components/form-error-field/FormErrorField";
import {style} from "../../assets/form-styles/formErrorStyle";
import {useForm} from "react-hook-form";
import {createSecret, CreateSecretState} from "./secretsSlice";
import {useAppDispatch} from "../../app/hooks";

interface Props {
    modal?: () => void;
}

function SecretCreate({modal}: Props) {
    const dispatch = useAppDispatch();
    const bodyClassList = document.body.classList;
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors, isValid}
    } = useForm<CreateSecretState>({mode: "all"})

    const onSubmit = handleSubmit((data: CreateSecretState) => {
        dispatch(createSecret(data));
        reset();
    })

    modal = () => {
        bodyClassList.remove("modal-open");
        bodyClassList.add("closed");
        reset();
    }

    return (
        <>
            <div className="modal-background" onClick={modal}/>
            <div className="modal">
                <form className="form" onSubmit={onSubmit}>
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
            </div>
        </>
    )
}

export default SecretCreate;

