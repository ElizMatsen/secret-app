import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {secrets} from "./secretsSlice";
import {RootState} from "../../app/store";
import {SecretResponse} from "../../types/secrets";
import Secret from "../../components/Secret";
import Modal from "../../components/modals/Modal";
import SecretForm from "../../components/form/SecretForm";
import AuthForm from "../../components/form/Auth-form";
import SecretData from "../../components/SecretData";
import {useShowSecretDataHook} from "./show-secret-hooks";
import {useCreateSecretHook} from "./create-secret-hooks";
import {useDeleteSecretHook} from "./delete-secret-hooks";

function Secrets() {
    const dispatch = useAppDispatch();
    const secretsList = useAppSelector((state: RootState) => state.secrets.secretsList);

    const {
        secretData,
        showSecretFrom,
        toggleShowSecret,
        showSecretEvent,
        onSubmitShowSecret
    } = useShowSecretDataHook();

    const {
        createSecretForm,
        toggleCreateSecretForm,
        onSubmitCreateSecret
    } = useCreateSecretHook();

    const {
        deletableSecretId,
        deleteSecretItem
    } = useDeleteSecretHook();

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
                            children={<AuthForm
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

