const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");
const cron = require("node-cron");
const sgMail = require("@sendgrid/mail");
const serviceAccount = require("./serviceAccountKey.json");
const fs = require('fs');
const https = require('https');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://info442-postcards.firebaseio.com"
});
const db = admin.database();
const app = express();

app.use(cors());
app.use(express.json());

// TODO: Change this from once every minute to something
// more realistic
cron.schedule("*/1 * * * *", () => {
    db.ref(`push-notification-tokens`)
        .once("value")
        .then(function(snapshot) {
            if (snapshot) {
                let receivers = [];

                snapshot = snapshot.val();
                for (let uid in snapshot) {
                    const tokens = snapshot[uid];
                    for (let token in tokens) {
                        if (tokens[token]) {
                            receivers = [...receivers, token];
                        }
                    }
                }

                const message = {
                    notification: {
                        title: "Postcards App",
                        body: "It's time to work on your postcard!"
                        // TODO: Clickable link
                    },
                    tokens: receivers
                };

                // TODO: Take into account 100 device token limit
                admin
                    .messaging()
                    .sendMulticast(message)
                    .then(response => {
                        if (response.failureCount > 0) {
                            const failedTokens = [];
                            response.responses.forEach((resp, idx) => {
                                if (!resp.success) {
                                    failedTokens.push(receivers[idx]);
                                }
                            });
                            // TODO: Log failedTokens
                            // Perhaps set them to `false` in DB?
                        }
                    });
            }
        });
});

app.post("/SendEmail", function(req, res) {
    if (req.body == null || req.body == undefined) {
        return res.json({
            status: 400,
            message: "Request body cannot be empty"
        });
    }
    let recipients = req.body.recipients;
    let user = req.body.user;

    if (recipients.length < 1) {
        return rres.json({
            status: 400,
            message: "Recipients have to contain one or more addresses."
        });
    }
    const msg = {
        personalizations: [],
        subject: "Postcards from " + user.name,
        text: "This was my month!", // change this text
        html: req.body.html,
        from: user
    };
    recipients.map(recipient => {
        msg.personalizations.push({ to: [recipient] });
    });

    sgMail
        .sendMultiple(msg)
        .then(() => {
            return res.json({
                status: 200,
                message: "Emails sent."
            });
        })
        .catch(error => {
            //Extract error msg
            const { message, code, response } = error;
            //Extract response msg
            const { headers, body } = response;

            return res.json({
                status: code,
                message: message,
                errors: body
            });
        });
});

try {
    const options = {
        cert: fs.readFileSync(process.env.TLS_CERT),
        key: fs.readFileSync(process.env.TLS_KEY)
    };
    
    app.listen(8080, () =>
        console.log("Express is listening on port 8080")
    );
    https.createServer(options, app).listen(443);
} catch (err) {
    console.error(err);
}