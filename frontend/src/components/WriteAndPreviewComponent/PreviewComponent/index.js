import React from "react";
import { Link } from "@reach/router";
import { Button } from "../../globals";

export const PreviewComponent = ({ HTMLContent }) => {
    return (
        <>
            <Link to="/">
                <Button>Write</Button>
            </Link>
            <div dangerouslySetInnerHTML={{ __html: HTMLContent }} />
        </>
    );
};
