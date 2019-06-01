# backend

Generate a new private key by going to https://console.firebase.google.com/u/0/project/info442-postcards/settings/serviceaccounts/adminsdk and save it as `serviceAccountKey.json`. Run backend with `npm run dev`.

## Endpoints

### POST _/SendEmail_

Takes in request body:

    {
        "recipients": [ {"email":"example@email.com", "name": "Example Recipient"},
                        {"email":"claireiscool@email.com", "name": "Claire"}]
        "user": {
            "email": "user@email.com",
            "name": "John Doe"
        },
        "html": "<h1>title of email</h1><p>some postcard content</p>"
    }

Returns:

-   Successful
    -   `{status: 200, message: "Email sent."}`
-   If recipient is empty
    -   `{status: 400, message: "Recipients have to contain one or more addresses."}`
-   if (req.body == null || req.body == undefined)
    -   `{status: 400, message: "Request body cannot be empty"}`
-   Sendgrid catches error (example):

          {
              status: 400,
              message: Bad Request,
              errors: { errors: [
                  { message: 'The to array is required for all personalization objects, and must have at least one email object with a valid email address.',
              field: 'personalizations.0.to',
              help:'http://sendgrid.com/docs/API_Reference/Web_API_v3/Mail/errors.html#message.personalizations.to' }
              ]}
          }
