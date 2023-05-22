import React, {useEffect} from 'react';
import {useAppDispatch} from "../../app/hooks";
import {secrets} from "./secretsSlice";

function Secrets() {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(secrets())
    }, [])

    return (
        <div>Secrets</div>
    )
}

export default Secrets;

