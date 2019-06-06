import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";

import {
    Container,
    Heading,
    Text,
    ScrollView,
    Button
} from "../../components/globals";
import LoadingSpinner from "../../components/LoadingSpinner";
import useRecipientsDetail from "../../hooks/useRecipientsDetail";
import validationSchema from "../../helpers/recipients/validationSchema";
import hasUniqueEmail from "../../helpers/recipients/hasUniqueEmail";
import { db } from "../../firebase";

const RecipientsDetailPage = ({ user, recipientID }) => {
    const [isEditing, setIsEditing] = useState(false);
    const {
        loading,
        recipientsDetail,
        fetchRecipientsDetail
    } = useRecipientsDetail(user);

    useEffect(() => {
        fetchRecipientsDetail(recipientID);
    }, [isEditing, recipientID]);

    async function handleSubmit(values, actions) {
        // TODO: There might be an opportunity here to share
        // code with the new recipients page
        // TODO: Read setSubmitting documentation
        if (isEditing) {
            let isUnique = true;
            if (values.email !== recipientsDetail.email) {
                isUnique = await hasUniqueEmail(user, values.email);
            }

            if (isUnique) {
                try {
                    await db
                        .ref(`recipients/${user.uid}/${recipientID}`)
                        .set(values);

                    actions.setSubmitting(false);
                    setIsEditing(false);
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
                    msg: "Error saving changes"
                });
            }
        } else {
            actions.setSubmitting(false);
        }
    }

    // TODO: Make sure users can only access their own recipients
    if (loading) {
        return (
            <ScrollView flex={1} justifyContent="center" alignItems="center">
                <LoadingSpinner type="balls" />
            </ScrollView>
        );
    }

    if (recipientsDetail) {
        const { firstName, lastName, email } = recipientsDetail;

        // TODO: Don't forget about `Delete`
        return (
            <ScrollView>
                <Container>
                    <Heading as="h1" fontSize={5} mt={12}>
                        {`${firstName} ${lastName}`}
                    </Heading>
                    {!isEditing && (
                        <Button onClick={() => setIsEditing(true)}>Edit</Button>
                    )}
                    <Formik
                        initialValues={{
                            firstName,
                            lastName,
                            email
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
                                        disabled={!isEditing}
                                    />
                                    {errors.firstName && touched.firstName ? (
                                        <div>{errors.firstName}</div>
                                    ) : null}
                                </div>

                                <div>
                                    <Field
                                        name="lastName"
                                        placeholder="Last name"
                                        disabled={!isEditing}
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
                                        disabled={!isEditing}
                                    />
                                    {errors.email && touched.email ? (
                                        <div>{errors.email}</div>
                                    ) : null}
                                </div>

                                {isEditing && (
                                    <>
                                        <Button type="submit">
                                            Save changes
                                        </Button>
                                        <Button
                                            onClick={() => setIsEditing(false)}
                                        >
                                            Cancel
                                        </Button>
                                    </>
                                )}
                                {status && status.msg && (
                                    <div>{status.msg}</div>
                                )}
                            </Form>
                        )}
                    </Formik>
                </Container>
            </ScrollView>
        );
    }

    // TODO: Redirect user to a 404 page
    return <Container>Oops...</Container>;
};

export default RecipientsDetailPage;
