import React from "react";
import { Formik, Form, Field } from "formik";
import { navigate } from "@reach/router";
import * as Yup from "yup";
import { db } from "../../firebase";

import {
    Container,
    Button,
    Heading,
    ScrollView
} from "../../components/globals";

const RecipientsNewSchema = Yup.object().shape({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string()
        .email("Invalid email")
        .required("Email is required")
});

const RecipientsNewPage = ({ user }) => {
    return (
        <ScrollView>
            <Container>
                <Heading as="h1" fontSize={5} mt={12}>
                    New Recipient
                </Heading>
                <Formik
                    initialValues={{
                        firstName: "",
                        lastName: "",
                        email: ""
                    }}
                    validationSchema={RecipientsNewSchema}
                    onSubmit={(values, actions) => {
                        db.ref(`recipients/${user.uid}`).once("value", function(
                            snapshot
                        ) {
                            let isUnique = true;
                            snapshot.forEach(function(childSnapshot) {
                                const recipient = childSnapshot.val();
                                if (recipient.email === values.email) {
                                    isUnique = false;
                                }
                            });
                            // ...
                            // TODO: Could this cause a race condition?
                            if (isUnique) {
                                const newRecipientRef = db
                                    .ref(`recipients/${user.uid}`)
                                    .push();
                                newRecipientRef.set(values).then(() => {
                                    // TODO: Do we need this call?
                                    actions.setSubmitting(false);
                                    navigate("/recipients");
                                });
                            } else {
                                actions.setSubmitting(false);
                                // TODO: Determine if this is the correct way to do it
                                actions.setErrors({
                                    email: "Email already exists"
                                });
                                actions.setStatus({
                                    msg: "Error creating new recipient"
                                });
                            }
                        });
                    }}
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
