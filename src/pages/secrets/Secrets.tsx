import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {secrets} from "./secretsSlice";
import {RootState} from "../../app/store";
import {SecretResponse} from "../../types/secrets";
import Secret from "../../components/Secret";
import Modal from "../../components/modals/Modal";
import SecretForm from "../../components/form/SecretForm";
import UserAuthForm from "../../components/form/UserAuthForm";
import SecretData from "../../components/SecretData";
import {SecretHook} from "./secret-hook";

function Secrets() {
    const dispatch = useAppDispatch();
    const secretsList = useAppSelector((state: RootState) => state.secrets.secretsList);

    const {
        createSecretForm,
        toggleCreateSecretForm,
        onSubmitCreateSecret,
        secretData,
        showSecretFrom,
        toggleShowSecret,
        showSecretEvent,
        onSubmitShowSecret,
        deletableSecretId,
        deleteSecretItem
    } = SecretHook();

    useEffect(() => {
        dispatch(secrets())
    }, [])

    return (
        <>
            {
                createSecretForm
                &&
                <Modal
                    modalEvent={toggleCreateSecretForm}
                    children={<SecretForm
                        onSubmitForm={onSubmitCreateSecret}/>}
                />
            }
            {
                showSecretFrom
                &&
                <>
                    {
                        !secretData &&
                        <Modal
                            modalEvent={toggleShowSecret}
                            children={<UserAuthForm
                                buttonName={'Log in'}
                                onSubmitLoginForm={onSubmitShowSecret}/>}
                        />
                    }
                    {
                        secretData
                        &&
                        <Modal
                            modalEvent={toggleShowSecret}
                            children={<SecretData
                                secretData={secretData}/>}
                        />
                    }
                </>
            }
            <div className="secrets-list">
                <div className="secrets-create">
                    <button className="button" onClick={() => toggleCreateSecretForm()} type="button">
                        Create secret
                    </button>
                </div>
                <div className="secrets-list-body">
                    <div className="secrets-list-row">
                        <div className="secrets-list-item">ID</div>
                        <div className="secrets-list-item">TITLE</div>
                        <div className="secrets-list-item">BODY</div>
                    </div>
                    {
                        secretsList.map((secret: SecretResponse) =>
                            <Secret key={secret.id}
                                    secret={secret}
                                    showSecretEvent={showSecretEvent}
                                    deleteSecret={deleteSecretItem}
                                    deletableSecretId={deletableSecretId}/>
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default Secrets;

