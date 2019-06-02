import React from "react";
import { Link } from "@reach/router";
import { Button } from "../../globals";

export const PreviewComponent = ({ HTMLContent }) => {
    /*
                <Link to="/">
                <Button>Write</Button>
            </Link>
            */
    return (
        <>
            <div dangerouslySetInnerHTML={{ __html: HTMLContent }} />
        </>
    );
};
