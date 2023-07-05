import React from 'react';
import {createSecret, showSecret} from "./secretsSlice";
import ShowSecretForm from "./ShowSecretForm";
import SecretCreateForm from "./SecretCreateForm";

interface Props {
    modal?: () => void;
    formType?: string | null;
    showSecretId?: number;
}

function SecretModal({modal, formType, showSecretId}: Props) {
    const bodyClassList = document.body.classList;

    modal = () => {
        bodyClassList.remove("modal-open");
        bodyClassList.add("closed");
    }

    return (
        <>
            <div className="modal-background" onClick={modal}/>
            <div className="modal">
                {
                    formType === 'createSecret'
                    &&
                    <SecretCreateForm/>
                }
                {
                    formType === 'showSecret'
                    &&
                    <ShowSecretForm showSecretId={showSecretId}/>
                }
            </div>
        </>
    )
}

export default SecretModal;

