import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {deleteSecret, secrets} from "./secretsSlice";
import React, {useEffect} from "react";
import {toast} from "react-toastify";
import {RootState} from "../../app/store";


export const useDeleteSecretHook = () => {
    const dispatch = useAppDispatch();
    const deleted = useAppSelector((state: RootState) => state.secrets.deleted);
    const [deletableSecretId, setDeletableSecretId] = React.useState<string | null>(null);

    useEffect(() => {
        if (deleted) {
            toast.success('Saved');
            setDeletableSecretId(null)
            dispatch(secrets())
        }
    }, [deleted]);

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
        deletableSecretId,
        deleteSecretItem
    }
}
