import React from 'react';

interface Props {
    children: JSX.Element;
    modalEvent: () => void;
}

function Modal({children, modalEvent}: Props) {

    const closeModal = () => {
        modalEvent();
    }

    return (
        <>
            <div className="modal-background" onClick={closeModal}/>
            <div className="modal">
                {children}
            </div>
        </>

    )
}

export default Modal;

