import React from 'react';

function Modal() {

    const toggleModal = () => {
//         if (bodyClassList.contains('modal-open')) {
//             bodyClassList.remove('modal-open');
//             bodyClassList.add('closed');
//             seFormType(null);
//         } else {
//             bodyClassList.remove('modal-closed');
//             bodyClassList.add('modal-open');
//         }
    }

    return (
        <>
            <div className="modal-background" onClick={toggleModal}/>
            <div className="modal">
                d
            </div>
        </>
    )
}

export default Modal;

