import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {deleteSecret, secrets, setCreateAction, setDeleteAction} from "./secretsSlice";
import {RootState} from "../../app/store";
import classNames from "classnames";
import {toast} from "react-toastify";
import SecretModal from "./SecretModal";

function Secrets() {
    const dispatch = useAppDispatch();
    const deleted = useAppSelector((state: RootState) => state.secrets.deleted);
    const created = useAppSelector((state: RootState) => state.secrets.created);
    const secretsList = useAppSelector((state: RootState) => state.secrets.secretsList);
    const [deletableSecretId, setDeletableSecretId] = React.useState<string | null>(null);
    const [formType, seFormType] = React.useState<string | null>(null);
    const [showSecretId, setShowSecretId] = React.useState<number>();
    const bodyClassList = document.body.classList;
    useEffect(() => {
        dispatch(secrets())
    }, [])

    useEffect(() => {
        if (deleted) {
            toast.success('Saved');
            setDeletableSecretId(null)
            dispatch(setDeleteAction(false))
            dispatch(secrets())
        }
    }, [deleted]);

    useEffect(() => {
        if (created) {
            toast.success('Saved');
            toggleModal();
            dispatch(setCreateAction(false))
            dispatch(secrets())
        }
    }, [created]);

    const deleteSecretItem = (id: string) => {
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

    const toggleModal = () => {
        if (bodyClassList.contains('modal-open')) {
            bodyClassList.remove('modal-open');
            bodyClassList.add('closed');
        } else {
            bodyClassList.remove('modal-closed');
            bodyClassList.add('modal-open');
        }
    }

    useEffect(() => {
        return () => {
            bodyClassList.remove('modal-open');
            bodyClassList.add('closed');
        }
    }, []);

    const showSecretEvent = (id: number) => {
        seFormType('showSecret');
        setShowSecretId(id)
        toggleModal();
    }
    const createSecretEvent = () => {
        seFormType('createSecret');
        toggleModal();
    }

    return (
        <>
            <SecretModal modal={toggleModal} formType={formType} showSecretId={showSecretId}/>
            <div className="secrets-list">
                <div className="secrets-create">
                    <button className="button" onClick={() => createSecretEvent()} type="button">
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
                        secretsList.map((item: any) =>
                            <div className="secrets-list-row" key={item.id}>
                                <div className="secrets-list-item">{item.id}</div>
                                <div className="secrets-list-item">{item.title}</div>
                                <div className="button_s" onClick={() => showSecretEvent(item.id)}>Show</div>
                                <button
                                    onClick={() => deleteSecretItem(item.id)}
                                    className={classNames('button-delete', deletableSecretId === item.id ? ' deleting' : '')}
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
                </div>
            </div>
        </>
    )
}

export default Secrets;

