import React, {useEffect} from 'react';
import {SubmitHandler} from "react-hook-form";
import {actions} from "../../secretsSlice";
import {useAppDispatch, useAppSelector} from "../../../../app/hooks";
import {RootState} from "../../../../app/store";
import {toast} from "react-toastify";
import AuthForm from "../../../../components/form/Auth-form";
import {ShowSecretRequest} from "../../../../types/secrets";

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

    const copy = (data: string) => {
        navigator.clipboard.writeText(data)
        toast.success('Copied successfully');
    }

    const onSubmit: SubmitHandler<ShowSecretRequest> = (data) => onSubmitForm(data)

    const closeModal = () => {
        modalEvent()
        dispatch(actions.setSecretDataAction(null));
    }

    return (
        <>
            <div className="modal-background" onClick={closeModal}/>
            <div className="modal">
                {
                    !secretData &&
                    <AuthForm
                        buttonName={'Log in'}
                        onSubmitLoginForm={onSubmit}/>
                }
                {
                    secretData
                    &&
                    <div className="secret-container">
                        <div className="secret-copy-container"
                             onClick={() => copy(secretData.body)}>
                            <div className="secret-copy-text">Copy body</div>
                        </div>
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
            </div>
        </>
    )
}

export default ShowSecretForm;

