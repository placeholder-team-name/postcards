import React from 'react';

export const PreviewComponent = ({ HTMLContent }) => {
    return <><div dangerouslySetInnerHTML={{ __html: HTMLContent }}>

    </div></>
}