import React from 'react';
import {SubmitHandler} from "react-hook-form";
import {SecretRequest} from "../../../../types/secrets";
import SecretForm from "../../../../components/form/SecretForm";

interface Props {
    modalEvent: () => void;
    onSubmitForm: SubmitHandler<SecretRequest>;
}

function SecretCreateForm({modalEvent, onSubmitForm}: Props) {
    const onSubmit: SubmitHandler<SecretRequest> = (data) => onSubmitForm(data)

    const closeModal = () => {
        modalEvent();
    }

    return (
        <>
            <div className="modal-background" onClick={closeModal}/>
            <div className="modal">
                <SecretForm
                    onSubmitForm={onSubmit}/>
            </div>
        </>

    )
}

export default SecretCreateForm;

