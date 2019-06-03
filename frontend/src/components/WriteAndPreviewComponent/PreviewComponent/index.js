import React from "react";
import { Link } from "@reach/router";
import { Button } from "../../globals";
import { SendComponent } from "../../SendComponent";

export const PreviewComponent = ({ HTMLContent, user }) => {
    return (
        <>
            <Link to="/">
                <Button>Write</Button>
            </Link>
            <div dangerouslySetInnerHTML={{ __html: HTMLContent }} />
            <SendComponent
                user={user}
                HTMLContent={HTMLContent}
            />
        </>
    );
};
