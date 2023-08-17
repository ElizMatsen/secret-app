import React, {useEffect} from 'react';
import {SubmitHandler} from "react-hook-form";
import {actions} from "../../secretsSlice";
import {useAppDispatch, useAppSelector} from "../../../../app/hooks";
import {RootState} from "../../../../app/store";
import AuthForm from "../../../../components/form/Auth-form";
import {ShowSecretRequest} from "../../../../types/secrets";
import Modal from "../../../../components/modals/Modal";
import ShowSecretData from "./ShowSecretData";

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

