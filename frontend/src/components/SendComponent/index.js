import React, { useState } from "react";
import { Button, Text, Image } from "../globals";
import { Endpoint, CheckIcon } from '../../constants';
import ErrorContent from "../ErrorContent";

import useRecipients from "../../hooks/useRecipients";

export const SendComponent = ({ 
    user, 
    HTMLContent,
    // recipients
}) => {
    const [sentLastestNotebookToRecipients, setSentLastestNotebookToRecipients] = useState(
        false
    );
    const [errorSending, setErrorSending] = useState("");
    const [recipients, loading] = useRecipients(user);

    const sendEmail = async (e) => {
        try {
            e.preventDefault();
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
                        setErrorSending(response.messsge);
                    }
                }).catch(err => {
                    setErrorSending(err.message);
                    throw err;
                });
            }).catch(err => {
                setErrorSending(err.message);
                throw err;
            });
        } catch (e) {
            setErrorSending(e.message);
        }
    };

    return (
        <>
            {sentLastestNotebookToRecipients ? (
                <>
                <Text> 
                    <Image 
                    src={CheckIcon}
                    width="25px" 
                    />
                    Sent! 
                </Text>
                </>
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
        </>
    );
};
