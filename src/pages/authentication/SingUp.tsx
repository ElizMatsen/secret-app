import React, {useEffect} from 'react';
import {Resolver, SubmitHandler, useForm} from 'react-hook-form'
import {style} from "../../assets/form-styles/formErrorStyle";
import FormErrorField from "../../components/form-error-field/FormErrorField";
import {actions, LoginState} from "../../app/authSlice";
import {NavLink, useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {RootState} from "../../app/store";
import {toast} from "react-toastify";

type RegistrationFormProps = {
    onSubmitRegistrationForm: any;
}
const resolver: Resolver<LoginState> = async (values: LoginState) => {
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
    } else {
        return {
            values: values,
            errors: {},
        }
    }
}

function SingUp({onSubmitRegistrationForm}: RegistrationFormProps) {
    const currentYear = new Date().getFullYear();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const created = useAppSelector((state: RootState) => state.auth.created);
    const {
        register,
        handleSubmit,
        formState: {errors, isValid}
    } = useForm({
        resolver,
        mode: "all"
    })

    const onSubmit: SubmitHandler<LoginState> = (data) => onSubmitRegistrationForm(data)

    useEffect(() => {
        if (created) {
            toast.success('Created successfully');
            dispatch(actions.setCreateAction(false));
            navigate('/sing-in')
        }
    }, [created]);
    return (
        <div className="login wh-100">
            <span/>
            <div className="login__container">
                <div className="login__body">
                    <form className="form" onSubmit={handleSubmit(onSubmit)}>
                        <div className="form__input-container">
                            <div className="form__input-item">
                                <FormErrorField error={errors.email}/>
                                <input
                                    {...register('email')}
                                    className="form__input"
                                    style={style(errors?.email)}
                                    placeholder='E-mail'
                                    type="text"
                                    data-testid={'email'}/>
                            </div>
                            <div className="form__input-item">
                                <FormErrorField error={errors.password}/>
                                <input
                                    {...register('password')}
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
                                Log in
                            </button>
                        </div>
                    </form>
                </div>
                <div className="login__footer">
                    <p className="login__footer-text"> Do you have an account?</p>
                    <NavLink className="login__footer-link pointer" to="/sing-in">Log in</NavLink>
                </div>

            </div>
            <div className="copyright mt-1">{currentYear} &#169; KikLi Production</div>
        </div>
    )
}

export default SingUp;

