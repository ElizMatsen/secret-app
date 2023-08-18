import React, {useEffect} from 'react';
import {SubmitHandler} from "react-hook-form";
import ShowSecretData from "../ShowSecretData";
import {actions} from "../../pages/secrets/secretsSlice";
import {ShowSecretRequest} from "../../types/secrets";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {RootState} from "../../app/store";
import Modal from "../modals/Modal";
import AuthForm from "../form/Auth-form";

interface Props {
    modalEvent: () => void;
    onSubmitForm: SubmitHandler<ShowSecretRequest>;
}

function ShowSecretForm({modalEvent, onSubmitForm}: Props) {
    const dispatch = useAppDispatch();
    const secretData = useAppSelector((state: RootState) => state.secrets.secretData);

    useEffect(() => {
        return () => {
            dispatch(actions.setSecretDataAction(null));
        }
    }, []);

    useEffect(() => {
        if (secretData) {
            setTimeout(() => {
                dispatch(actions.setSecretDataAction(null));
            }, 5000);
        }
    }, [secretData]);

    const onSubmit: SubmitHandler<ShowSecretRequest> = (data) => onSubmitForm(data)

    const closeModal = () => {
        modalEvent()
        dispatch(actions.setSecretDataAction(null));
    }

    return (
        <>
            {
                !secretData &&
                <Modal
                    modalEvent={closeModal}
                    children={<AuthForm
                        buttonName={'Log in'}
                        onSubmitLoginForm={onSubmit}/>}
                />
            }
            {
                secretData
                &&
                <Modal
                    modalEvent={closeModal}
                    children={<ShowSecretData
                        secretData={secretData}/>}
                />
            }
        </>
    )
}

export default ShowSecretForm;

