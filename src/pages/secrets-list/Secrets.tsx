import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {deleteSecret, secrets} from "./secretsSlice";
import {RootState} from "../../app/store";
import classNames from "classnames";

function Secrets() {
    const dispatch = useAppDispatch();
    const secretsList = useAppSelector((state: RootState) => state.secrets.secretsList);
    const [deletableSecretId, setDeletableSecretId] = React.useState('');

    useEffect(() => {
        dispatch(secrets())
    }, [])

    const deleteSecretItem = (id: string) => {
        if (window.confirm(
            'Do you really want to delete secret?' + '\n'
            + 'The next element will be removed' + '\n'
            + 'ID: ' + id
        )) {
            setDeletableSecretId(id)
            setTimeout(() => {
                dispatch(deleteSecret({id}));
            }, 1000);
        }
    }
    return (
        <div className="secrets-list">
            <div className="secrets-list-row">
                <div>ID</div>
                <div>TITLE</div>
                <div>BODY</div>
            </div>
            {
                secretsList.map((item: any) =>
                    <div className="secrets-list-row" key={item.id}>
                        <div>{item.id}</div>
                        <div>{item.title}</div>
                        <div>{item.body}</div>
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
    )
}

export default Secrets;

