import React from 'react';

const FormErrorField = (formDataError: any) => {
    return (
        <>
            {
                formDataError.error
                &&
                (<div className="form__error-container">
                    {formDataError.error &&
                    <p className="form__error-text"> {formDataError.error?.message || ''}</p>}
                </div>)
            }
        </>
    )
};

export default FormErrorField;

