import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {SubmitHandler} from "react-hook-form";
import {CreateSecretRequest} from "../../types/secrets";
import {actions, createSecret, secrets} from "./secretsSlice";
import React, {useEffect} from "react";
import {toast} from "react-toastify";
import {RootState} from "../../app/store";


export const useCreateSecretHook = () => {
    const dispatch = useAppDispatch();
    const created = useAppSelector((state: RootState) => state.secrets.created);
    const [createSecretForm, setCreateSecretForm] = React.useState<boolean>(false);
    useEffect(() => {
        if (created) {
            toast.success('Saved');
            dispatch(actions.setCreateAction(false))
            dispatch(secrets())
        }
    }, [created]);

    const toggleCreateSecretForm = () => {
        setCreateSecretForm(!createSecretForm)
    }

    const onSubmitCreateSecret: SubmitHandler<CreateSecretRequest> = (data) => {
        dispatch(createSecret(data))
        toggleCreateSecretForm();
    };

    return {
        createSecretForm,
        toggleCreateSecretForm,
        onSubmitCreateSecret
    }
}
