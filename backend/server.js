const express = require('express');
const cors = require('cors');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const app = express();

app.use(cors());

app.post('/SendEmail', function (req, res) {
    const msg = {
        to: 'clairekpromo@gmail.com',
        from: 'test@example.com',
        subject: 'Postcards from <Name>',
        text: 'that you have received with Postcards.',
        html: '<h1>April</h1><p>This was my summary of the month</p><h4>Lunches</h4><p>yummy</p>',
      };
      sgMail.send(msg).then(() => {
        console.log("sent email");
      })
      .catch(error => {
        //Log friendly error
        console.error(error.toString());
    
        //Extract error msg
        const {message, code, response} = error;
    
        //Extract response msg
        const {headers, body} = response;
      });
});

app.listen(3000, () => 
    console.log('postcards app listening on port 3000.'),
);