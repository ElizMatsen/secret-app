import React from 'react';
import {SubmitHandler} from "react-hook-form";
import {CreateSecretRequest} from "../../types/secrets";
import SecretForm from "../form/SecretForm";
import Modal from "../modals/Modal";

interface Props {
    modalEvent: () => void;
    onSubmitForm: SubmitHandler<CreateSecretRequest>;
}

function SecretCreateForm({modalEvent, onSubmitForm}: Props) {
    const onSubmit: SubmitHandler<CreateSecretRequest> = (data) => onSubmitForm(data)

    const closeModal = () => {
        modalEvent();
    }

    return (
        <Modal
            modalEvent={closeModal}
            children={<SecretForm
                onSubmitForm={onSubmit}/>}
        />
    )
}

export default SecretCreateForm;

