import React from "react";
import { Link } from "@reach/router";
import { Button, Flex, Container } from "../../globals";
import { SendComponent } from "../../SendComponent";

export const PreviewComponent = ({ HTMLContent, user }) => {
    console.log(HTMLContent);
    return (
        <>
            <Container mt={4}></Container>
            <Link to="/">
                <Button>Write</Button>
            </Link>
            <Container mt={6}>
                <div dangerouslySetInnerHTML={{ __html: HTMLContent }} />
            </Container>
            <Container mt={4}></Container>
            <Flex flexWrap="wrap">
                <SendComponent
                    user={user}
                    HTMLContent={HTMLContent}
                />
            </Flex>
        </>
    );
};
