import React from 'react';
import FormErrorField from "../../../components/form-error-field/FormErrorField";
import {style} from "../../../assets/form-styles/formErrorStyle";
import {Resolver, SubmitHandler, useForm} from "react-hook-form";
import {SecretType} from "../../../types/secrets";

const resolver: Resolver<SecretType> = async (values) => {
    if (values.title === '') {
        return {
            values: {},
            errors: {
                title: {
                    type: "required",
                    message: "Required field",
                },
            },
        }
    }
    if (values.body === '') {
        return {
            values: {},
            errors: {
                body: {
                    type: "required",
                    message: "Required field",
                },
            },
        }
    }
    if (values.title !== '' && !/^[a-zA-Z0-9]+$/.test(values.title)) {
        return {
            values: values,
            errors: {
                email: {
                    message: 'Only latin letters'
                }
            },
        }
    }
    if (values.body !== '' && !/^[a-zA-Z0-9]+$/.test(values.body)) {
        return {
            values: values,
            errors: {
                email: {
                    message: 'Only latin letters'
                }
            },
        }
    }
    return {
        values: values,
        errors: {},
    }
}

interface Props {
    modalEvent: () => void;
    onSubmitForm: SubmitHandler<SecretType>;
}

function SecretCreateForm({modalEvent, onSubmitForm}: Props) {
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors, isValid}
    } = useForm({
        resolver,
        mode: 'all'
    })

    const onSubmit: SubmitHandler<SecretType> = (data) => onSubmitForm(data)

    const closeModal = () => {
        modalEvent();
        reset();
    }

    return (
        <>
            <div className="modal-background" onClick={closeModal}/>
            <div className="modal">
                <form className="form" onSubmit={handleSubmit(onSubmit)}>
                    <div className="form__input-container">
                        <div className="form__input-item">
                            <FormErrorField error={errors.title}/>
                            <input
                                {...register('title')}
                                className="form__input"
                                style={style(errors?.title)}
                                placeholder='Title'
                                type="text"/>
                        </div>
                        <div className="form__input-item">
                            <FormErrorField error={errors.body}/>
                            <input
                                {...register('body')}
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

export default SecretCreateForm;

