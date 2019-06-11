import React from "react";
import { Link } from "@reach/router";
import { Button, Flex } from "../../globals";
import { SendComponent } from "../../SendComponent";

export const PreviewComponent = ({ HTMLContent, user }) => {
    console.log(HTMLContent);
    return (
        <>
            <Link to="/">
                <Button>Write</Button>
            </Link>
            <Flex>
                <div dangerouslySetInnerHTML={{ __html: HTMLContent }} />
            </Flex>
            <Flex flexWrap="wrap">
                <SendComponent
                    user={user}
                    HTMLContent={HTMLContent}
                />
            </Flex>
        </>
    );
};
