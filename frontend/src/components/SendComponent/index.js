import React, { useState } from "react";
import { Button, Text } from "../globals";
import { Endpoint } from '../../constants';
import ErrorContent from "../ErrorContent";

export const SendComponent = ({ 
    user, 
    HTMLContent,
    // recipients
}) => {
    const [sentLastestNotebookToRecipients, setSentLastestNotebookToRecipients] = useState(
        false
    );
    const [errorSending, setErrorSending] = useState("");

    const sendEmail = async () => {
        try {
            fetch(Endpoint + "/SendEmail", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                },
                body: JSON.stringify({
                recipients: [
                    // we need to get props passed in 
                    { email:"clairekpromo@gmail.com", name: "Claire Kim" }
                ],
                user: { email: user.email, name: user.displayName },
                html: HTMLContent
                })
            }).then(res => {
                if (res.ok) {
                    setSentLastestNotebookToRecipients(true);
                } else {
                    let response = res.json();
                    setErrorSending(response.messsge);
                }
            }).catch(err => {
                throw err;
            });
        } catch (e) {
            setErrorSending(e.message);
        }
    };

    return (
        <>
             <Button
                disabled={sentLastestNotebookToRecipients}
                onClick={e => {
                    sendEmail();
                }}
            >
                Send
            </Button>
            <ErrorContent errorMessage={errorSending} />
            {sentLastestNotebookToRecipients && <Text> Sent! </Text> }
        </>
    );
};
