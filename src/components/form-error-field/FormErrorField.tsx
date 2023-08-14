import React from 'react';

const FormErrorField = (formDataError: { error: any }) => {
    return (
        <>
            {
                formDataError.error
                &&
                (<div className="form__error-container"
                      data-testid={'error-message'}>
                    {formDataError.error &&
                    <p className="form__error-text"> {formDataError.error?.message || ''}</p>}
                </div>)
            }
        </>
    )
};

export default FormErrorField;

