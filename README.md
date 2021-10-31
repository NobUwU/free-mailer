# free-mailer

Free mailer is a simple service using express.js and nodemailer to send emails with a custom address.

## Usage

`BASE`: https://free-mailer.herokuapp.com/

`POST` `/send`

```json
{
  transport: {
    host: "ip",
    port: 465,
    secure: true,
    username: "some@email.com",
    password: "some_cool_pass!"
  },
  content: {
    from: "Some Sender <some@email.com>",
    to: "recipient1@email.com, recipient2@email.com...",
    subject: "Hello",
    text: "World",
    html: "<b>World</b>"
  }
}
```

## Why?
Personal use case. Simple service for you to use ?? idk