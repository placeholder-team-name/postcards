const express = require('express');
const cors = require('cors');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const app = express();

app.use(cors());

app.post('/SendEmail', function (req, res) {
    let recipients = req.body.recepients;
    let user = req.body.user;

    if (len(recipients) < 1) {
        res.status('400').json('Recipients has to contain one or more addresses.');
    }
    const msg = {
        to: recipients,
        from: user.email,
        subject: 'Postcards from ' + user.name,
        text: 'This was my month!', // change this text
        html: req.body.html,
      };
      sgMail.sendMultiple(msg).then(() => {
          res.status('200').json('Emails sent.');
      })
      .catch(error => {
        //Extract error msg
        const {message, code, response} = error;
    
        //Extract response msg
        const {headers, body} = response;

        console.log(headers);
        console.log(body);
        console.log(message + " "  + code + " " + response);
        res.status(code).json(message);
      });
});

app.listen(3000, () => 
    console.log('postcards app listening on port 3000.'),
);