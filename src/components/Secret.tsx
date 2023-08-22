import React from 'react';
import classNames from "classnames";
import {SecretResponse} from "../types/secrets";

interface Props {
    secret: SecretResponse;
    deletableSecretId: string | null;
    showSecretEvent: (id: string) => void;
    deleteSecret: (id: string) => void;
}

function Secret({secret, showSecretEvent, deleteSecret, deletableSecretId}: Props) {

    const deleteSecretItem = (id: string) => {
        deleteSecret(id);
    }

    const showSecretButtonClick = (id: string) => showSecretEvent(id)
    return (
        <div className="secrets-list-row">
            <div className="secrets-list-item" title={secret.id}>{secret.id}</div>
            <div className="secrets-list-item" title={secret.title}>{secret.title}</div>
            <div className="button_s"
                 onClick={() => showSecretButtonClick(secret.id !== undefined ? secret.id : '')}>Show
            </div>
            <button
                onClick={() => deleteSecretItem(secret.id !== undefined ? secret.id : '')}
                className={classNames('button-delete', deletableSecretId === secret.id ? ' deleting' : '')}
            >
                            <span className="button-delete-animation">
                                  <span className="button-delete-balls"/>
                                  <span className="button-delete-lid"/>
                                  <span className="button-delete-can">
                                      <span className="button-delete-filler"/>
                                  </span>
                            </span>
            </button>
        </div>
    )
}

export default Secret;

