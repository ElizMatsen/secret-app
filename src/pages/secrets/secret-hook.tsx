import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {SubmitHandler} from "react-hook-form";
import {CreateSecretRequest, ShowSecretRequest} from "../../types/secrets";
import {actions, createSecret, deleteSecret, secrets, showSecret} from "./secretsSlice";
import React, {useEffect} from "react";
import {toast} from "react-toastify";
import {RootState} from "../../app/store";
import {LoginRequest} from "../../types/auth";


export const SecretHook = () => {
    const dispatch = useAppDispatch();
    const created = useAppSelector((state: RootState) => state.secrets.created);
    const secretData = useAppSelector((state: RootState) => state.secrets.secretData);
    const deleted = useAppSelector((state: RootState) => state.secrets.deleted);
    const [createSecretForm, setCreateSecretForm] = React.useState<boolean>(false);
    const [showSecretFrom, setShowSecretFrom] = React.useState<boolean>(false);
    const [showSecretId, setShowSecretId] = React.useState<string>('');
    const [deletableSecretId, setDeletableSecretId] = React.useState<string | null>(null);

    useEffect(() => {
        if (created) {
            toast.success('Saved');
            dispatch(actions.setCreateAction(false))
            dispatch(secrets())
        }
    }, [created]);

    useEffect(() => {
        if (secretData) {
            setTimeout(() => {
                dispatch(actions.setSecretDataAction(null))
            }, 5000);
        }
    }, [secretData]);

    useEffect(() => {
        if (deleted) {
            toast.success('Saved');
            setDeletableSecretId(null)
            dispatch(secrets())
        }
    }, [deleted]);

    const toggleCreateSecretForm = () => {
        setCreateSecretForm(!createSecretForm)
    }

    const onSubmitCreateSecret: SubmitHandler<CreateSecretRequest> = (data) => {
        dispatch(createSecret(data))
        toggleCreateSecretForm();
    };

    const showSecretEvent = (id: string) => {
        setShowSecretId(id)
        toggleShowSecret();
    }
    const onSubmitShowSecret: SubmitHandler<LoginRequest> = (data) => {
        const requestData: ShowSecretRequest = {
            id: showSecretId,
            email: data.email,
            password: data.password
        }
        dispatch(showSecret(requestData))
    };

    const toggleShowSecret = () => {
        setShowSecretFrom(!showSecretFrom);
        dispatch(actions.setSecretDataAction(null))
    }

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

    return {
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
    }
}
