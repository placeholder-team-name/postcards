const express = require('express');
const cors = require('cors');
var bodyParser = require('body-parser');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const app = express();

app.use(cors());
app.use(express.json());

app.post('/SendEmail', function (req, res) {
    if (req.body == null || req.body == undefined) {
        return res.json({
            status: 400,
            message: 'Request body cannot be empty'
        });
    }
    let recipients = req.body.recipients;
    let user = req.body.user;
    
    if (recipients.length < 1) {
        return rres.json({
            status: 400,
            message:'Recipients have to contain one or more addresses.'
        });
    }
    const msg = {   
        personalizations: [],
        subject: 'Postcards from ' + user.name,
        text: 'This was my month!', // change this text
        html: req.body.html,
        from: user
      };
    recipients.map(recipient => {
        msg.personalizations.push({to: [recipient]});
    });
        
    sgMail.sendMultiple(msg).then(() => {
        return res.json({
            status: 200,
            message: 'Emails sent.'
        });
    })
    .catch(error => {
    //Extract error msg
    const {message, code, response} = error;
    //Extract response msg
    const {headers, body} = response;

    return res.json({
        status: code,
        message: message,
        errors: body
    });
    });
});

app.listen(3000, () => 
    console.log('postcards app listening on port 3000.'),
);