import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {RootState} from "../../app/store";
import React, {useEffect} from "react";
import {actions, showSecret} from "./secretsSlice";
import {SubmitHandler} from "react-hook-form";
import {LoginRequest} from "../../types/auth";
import {ShowSecretRequest} from "../../types/secrets";


export const useShowSecretDataHook = () => {
    const dispatch = useAppDispatch();
    const secretData = useAppSelector((state: RootState) => state.secrets.secretData);
    const [showSecretFrom, setShowSecretFrom] = React.useState<boolean>(false);
    const [showSecretId, setShowSecretId] = React.useState<string>('');

    const toggleShowSecret = () => {
        setShowSecretFrom(!showSecretFrom);
        dispatch(actions.setSecretDataAction(null))
    }

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

    useEffect(() => {
        if (secretData) {
            setTimeout(() => {
                dispatch(actions.setSecretDataAction(null))
            }, 5000);
        }
    }, [secretData]);

    return {
        secretData,
        showSecretFrom,
        toggleShowSecret,
        showSecretEvent,
        onSubmitShowSecret
    }
}
