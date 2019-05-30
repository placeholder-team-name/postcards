import React from 'react';
import { Link } from '@reach/router';
import { Button } from '../../globals';

export const PreviewComponent = ({ HTMLContent }) => {
    return <>
        <Link to="/editor/write"><Button>Write</Button></Link>
        <div dangerouslySetInnerHTML={{ __html: HTMLContent }}>

        </div></>
}