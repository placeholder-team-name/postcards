import React from "react";
import { Heading, Container } from "../../components/globals";

const PostcardPage = ({ user }) => {
    return (
        <Container>
            <Heading as="h1" fontSize={5} mt={12}>
                {user.displayName}
            </Heading>
        </Container>
    );
};

export default PostcardPage;
