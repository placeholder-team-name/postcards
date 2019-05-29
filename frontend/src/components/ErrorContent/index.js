import React from 'react';

const ErrorContent = ({ errorMessage }) => {
    return <>
        <div style={{
            height: "50%", // TODO: set this to pixels or something to make it take up height
            width: "100%",
            border: errorMessage ? "1px solid red" : "none"
        }}>
            {errorMessage && <>{errorMessage}</>}
            {''}
        </div>
    </>
};

export default ErrorContent;