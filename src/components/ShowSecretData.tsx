import React from 'react';
import {toast} from "react-toastify";
import {SecretRequest} from "../types/secrets";

interface Props {
    secretData: SecretRequest;
}

function ShowSecretData({secretData}: Props) {

    const copy = (data: string) => {
        navigator.clipboard.writeText(data)
        toast.success('Copied successfully');
    }

    return (
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
    )
}

export default ShowSecretData;

