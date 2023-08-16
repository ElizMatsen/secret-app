import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {actions, createSecret, deleteSecret, secrets, showSecret} from "./secretsSlice";
import {RootState} from "../../app/store";
import {toast} from "react-toastify";
import SecretCreateForm from "./form/create/SecretCreateForm";
import ShowSecretForm from "./form/show/ShowSecretForm";
import {SecretType, ShowSecretRequest} from "../../types/secrets";
import {SubmitHandler} from "react-hook-form";
import Secret from "../../components/Secret";

function Secrets() {
    const dispatch = useAppDispatch();
    const deleted = useAppSelector((state: RootState) => state.secrets.deleted);
    const created = useAppSelector((state: RootState) => state.secrets.created);
    const secretsList = useAppSelector((state: RootState) => state.secrets.secretsList);
    const [deletableSecretId, setDeletableSecretId] = React.useState<string | null>(null);
    const [createSecretForm, setCreateSecretForm] = React.useState<boolean>(false);
    const [showSecretFrom, setShowSecretFrom] = React.useState<boolean>(false);
    const [showSecretId, setShowSecretId] = React.useState<string>();
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

    const showSecretEvent = (id: string) => {
        setShowSecretId(id)
        toggleShowSecret();
    }

    const toggleShowSecret = () => {
        setShowSecretFrom(!showSecretFrom)
    }

    const onSubmit: SubmitHandler<SecretType> = (data) => {
        dispatch(createSecret(data))
        toggleCreateSecretForm();
    };

    const toggleCreateSecretForm = () => {
        setCreateSecretForm(!createSecretForm)
    }

    const onSubmitShowSecret: SubmitHandler<ShowSecretRequest> = (data) => {
        const requestData = {
            id: showSecretId,
            email: data.email,
            password: data.password
        }
        dispatch(showSecret(requestData))
    };

    return (
        <>
            {
                createSecretForm
                &&
                <SecretCreateForm
                    modalEvent={toggleCreateSecretForm}
                    onSubmitForm={onSubmit}/>
            }
            {
                showSecretFrom
                &&
                <ShowSecretForm
                    modalEvent={toggleShowSecret}
                    onSubmitForm={onSubmitShowSecret}/>
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
                        secretsList.map((secret: SecretType) =>
                            <Secret key={secret.id}
                                    secret={secret}
                                    showSecretModal={showSecretEvent}
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

