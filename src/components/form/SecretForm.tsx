import React from 'react';
import FormErrorField from "../../components/form-error-field/FormErrorField";
import {style} from "../../assets/form-styles/formErrorStyle";
import {SubmitHandler, useForm} from "react-hook-form";
import {SecretRequest} from "../../types/secrets";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";

interface Props {
    onSubmitForm: SubmitHandler<SecretRequest>;
}

const validationSchema = yup.object({
    title: yup.string()
        .required("Required field")
        .matches(
            /^[a-zA-Z0-9]+$/,
            'Only latin letters'
        ),
    body: yup.string().required("Required field")
        .matches(
            /^[a-zA-Z0-9]+$/,
            'Only latin letters'
        ),
});

function SecretForm({onSubmitForm}: Props) {
    const {
        register,
        handleSubmit,
        formState: {errors, isValid}
    } = useForm({
        resolver: yupResolver(validationSchema),
        mode: 'all'
    })

    const onSubmit: SubmitHandler<SecretRequest> = (data) => onSubmitForm(data)

    return (
        <>
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
                <div className="form__input-container">
                    <div className="form__input-item">
                        <FormErrorField error={errors.title}/>
                        <input
                            {...register('title')}
                            className="form__input"
                            style={style(errors?.title)}
                            placeholder='Title'
                            type="text"
                            data-testid={'title'}/>
                    </div>
                    <div className="form__input-item">
                        <FormErrorField error={errors.body}/>
                        <input
                            {...register('body')}
                            className="form__input"
                            style={style(errors?.body)}
                            placeholder='Body'
                            type="text"
                            data-testid={'body'}/>
                    </div>
                </div>
                <div className="login__btn-container mt-1">
                    <button
                        type="submit"
                        className="button w-100"
                        disabled={!isValid}
                        data-testid={'submit-button'}
                    >
                        Create
                    </button>
                </div>
            </form>
        </>

    )
}

export default SecretForm;

