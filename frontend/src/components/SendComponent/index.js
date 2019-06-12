import React, { useState } from "react";
import { Button, Text } from "../globals";
import { Endpoint } from '../../constants';
import ErrorContent from "../ErrorContent";
import SentPage from "../../pages/SentPage";
import useRecipients from "../../hooks/useRecipients";
import MainRouter from "../MainRouter";
import { Redirect } from "@reach/router";

export const SendComponent = ({ 
    user, 
    HTMLContent,
    // recipients
}) => {
    const [sentLastestNotebookToRecipients, setSentLastestNotebookToRecipients] = useState(
        false
    );
    const [errorSending, setErrorSending] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [recipients, loading] = useRecipients(user);

    const sendEmail = async (e) => {
        try {
            e.preventDefault();
            setIsLoading(true);
            var promises = [];
            recipients.forEach(recipient => {
                promises.push({ email: recipient.email, name: recipient.firstName + " " + recipient.lastName });
            });
            Promise.all(promises).then(() => {
                fetch(Endpoint + "/SendEmail", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json; charset=utf-8"
                    },
                    body: JSON.stringify({
                    recipients: promises,
                    user: { email: user.email, name: user.displayName },
                    html: HTMLContent
                    })
                }).then(res => {
                    if (res.ok) {
                        setSentLastestNotebookToRecipients(true);
                    } else {
                        let response = res.json();
                        setIsLoading(false);
                        setErrorSending(response.messsge);
                    }
                }).catch(err => {
                    setIsLoading(false);
                    setErrorSending(err.message);
                    throw err;
                });
            }).catch(err => {
                setIsLoading(false);
                setErrorSending(err.message);
                throw err;
            });
        } catch (e) {
            setErrorSending(e.message);
        }
    };

    return (
        <>
            { isLoading ? (
            <Text>Sending...</Text>
            ) : (
            <Button
                disabled={sentLastestNotebookToRecipients}
                onClick={e => {
                    e.preventDefault()
                    sendEmail(e);
                }}
            >
                Send
            </Button>
            )} 
            
            <ErrorContent errorMessage={errorSending} />
            { sentLastestNotebookToRecipients ? <Redirect to="/sent" noThrow /> : undefined }
        </>
    );
};
