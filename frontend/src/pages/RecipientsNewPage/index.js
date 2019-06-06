import React from "react";
import { Formik, Form, Field } from "formik";
import { navigate } from "@reach/router";

import {
    Container,
    Button,
    Heading,
    ScrollView
} from "../../components/globals";
import { db } from "../../firebase";
import validationSchema from "../../helpers/recipients/validationSchema";
import hasUniqueEmail from "../../helpers/recipients/hasUniqueEmail";

const RecipientsNewPage = ({ user }) => {
    async function handleSubmit(values, actions) {
        const isUnique = await hasUniqueEmail(user, values.email);

        if (isUnique) {
            try {
                await db
                    .ref(`recipients/${user.uid}`)
                    .push()
                    .set(values);

                // TODO: Read setSubmitting documentation
                actions.setSubmitting(false);
                navigate("/recipients");
            } catch {
                actions.setSubmitting(false);
                actions.setStatus({
                    msg: "Something went wrong! Please try again."
                });
            }
        } else {
            actions.setSubmitting(false);
            actions.setErrors({
                email: "Email already exists"
            });
            actions.setStatus({
                msg: "Error creating new recipient"
            });
        }
    }

    return (
        <ScrollView>
            <Container my={12}>
                <Heading as="h1" fontSize={5} mt={0}>
                    New Recipient
                </Heading>
                <Formik
                    initialValues={{
                        firstName: "",
                        lastName: "",
                        email: ""
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ errors, touched, status }) => (
                        <Form>
                            <div>
                                <Field
                                    name="firstName"
                                    placeholder="First name"
                                />
                                {errors.firstName && touched.firstName ? (
                                    <div>{errors.firstName}</div>
                                ) : null}
                            </div>

                            <div>
                                <Field
                                    name="lastName"
                                    placeholder="Last name"
                                />
                                {errors.lastName && touched.lastName ? (
                                    <div>{errors.lastName}</div>
                                ) : null}
                            </div>

                            <div>
                                <Field
                                    name="email"
                                    type="email"
                                    placeholder="Email"
                                />
                                {errors.email && touched.email ? (
                                    <div>{errors.email}</div>
                                ) : null}
                            </div>

                            <Button type="submit">Submit</Button>
                            {status && status.msg && <div>{status.msg}</div>}
                        </Form>
                    )}
                </Formik>
            </Container>
        </ScrollView>
    );
};

export default RecipientsNewPage;
