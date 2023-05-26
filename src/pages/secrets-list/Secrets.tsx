import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {secrets} from "./secretsSlice";
import {RootState} from "../../app/store";

function Secrets() {
    const dispatch = useAppDispatch();
    const secretsList = useAppSelector((state: RootState) => state.secrets.secretsList);
    useEffect(() => {
        dispatch(secrets())
    }, [])
    return (
        <div className="secrets-list">
            {
                secretsList.map((item: any) =>
                    <div className="secrets-list-row" key={item.id}>
                        <div>{item.title}</div>
                        <div>{item.body}</div>
                        <div>{item.id}</div>
                    </div>
                )
            }
        </div>
    )
}

export default Secrets;

