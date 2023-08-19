import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {actions, createSecret, deleteSecret, secrets} from "./secretsSlice";
import {RootState} from "../../app/store";
import {toast} from "react-toastify";
import {CreateSecretRequest, SecretResponse} from "../../types/secrets";
import {SubmitHandler} from "react-hook-form";
import Secret from "../../components/Secret";
import Modal from "../../components/modals/Modal";
import SecretForm from "../../components/form/SecretForm";
import AuthForm from "../../components/form/Auth-form";
import SecretData from "../../components/SecretData";
import {useShowSecretDataHook} from "./show-secret-hooks";

function Secrets() {
    const dispatch = useAppDispatch();
    const deleted = useAppSelector((state: RootState) => state.secrets.deleted);
    const created = useAppSelector((state: RootState) => state.secrets.created);
    const secretsList = useAppSelector((state: RootState) => state.secrets.secretsList);
    const [deletableSecretId, setDeletableSecretId] = React.useState<string | null>(null);
    const [createSecretForm, setCreateSecretForm] = React.useState<boolean>(false);

    const {
        secretData,
        showSecretFrom,
        toggleShowSecret,
        showSecretEvent,
        onSubmitShowSecret
    } = useShowSecretDataHook();

    useEffect(() => {
        dispatch(secrets())
    }, [])

    useEffect(() => {
        if (deleted) {
            toast.success('Saved');
            setDeletableSecretId(null)
            dispatch(secrets())
        }
    }, [deleted]);

    useEffect(() => {
        if (created) {
            toast.success('Saved');
            dispatch(actions.setCreateAction(false))
            dispatch(secrets())
        }
    }, [created]);

    const deleteSecretItem = (id: string) => {
        if (deletableSecretId !== id) {
            if (window.confirm(
                'Do you really want to delete secret?' + '\n'
                + 'The next element will be removed' + '\n'
                + 'ID: ' + id
            )) {
                setDeletableSecretId(id)
                setTimeout(() => {
                    dispatch(deleteSecret(id));
                }, 1000);
            }
        }
    }


    const toggleCreateSecretForm = () => {
        setCreateSecretForm(!createSecretForm)
    }

    const onSubmitCreateSecret: SubmitHandler<CreateSecretRequest> = (data) => {
        dispatch(createSecret(data))
        toggleCreateSecretForm();
    };


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

