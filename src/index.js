require('dotenv').config()

const express = require('express')
const mailer = require('nodemailer')
const cors = require('cors')
const http = require('http')
const schema = require('./validation')

const app = express()
const server = http.createServer(app)

const PORT = Number(process.env.PORT) || 1111

// ENV SHIT
const HOST = String(process.env.HOST)
const TOKEN = String(process.env.TOKEN)
const EMAIL = String(process.env.EMAIL)
const PASS = String(process.env.PASS)
const EPORT = Number(process.env.EPORT)
const SECURE = Boolean(process.env.SECURE)

app.use(cors())
app.use(express.json())

app.all("/", (req, res) => {
  res.status(200).json({
    status: "OKAY",
    docs: "https://github.com/NobUwU/free-mailer",
  })
})

app.post("/send", (req, res) => {
  const validate = schema.random.validate(req.body)
  if (validate.error) {
    return res.status(400)
      .json({
        ...validate.error
      })
  }
  const transport = mailer.createTransport({
    host: validate.value.transport.host,
    port: validate.value.transport.port,
    secure: validate.value.transport.secure,
    auth: {
      user: validate.value.transport.username,
      pass: validate.value.transport.password,
    }
  })
  transport.sendMail({
    from: validate.value.content.from,
    to: validate.value.content.to,
    subject: validate.value.content.subject,
    text: validate.value.content.text,
    html: validate.value.content.html
  })
    .then((rez) => {
      res.status(200).json({
        ...rez
      })
    })
    .catch((err) => {
      res.status(500).json({
        ...err
      })
    })
})

app.post("/known", (req, res) => {
  const token = req.query.token
  if (!token || token !== TOKEN) {
    return res.sendStatus(403)
  }
  const validate = schema.known.validate(req.body)
  if (validate.error) {
    return res.status(400)
      .json({
        ...validate.error
      })
  }
  const transport = mailer.createTransport({
    host: HOST,
    port: EPORT,
    secure: SECURE,
    auth: {
      user: EMAIL,
      pass: PASS,
    }
  })
  transport.sendMail({
    from: validate.value.content.from,
    to: validate.value.content.to,
    subject: validate.value.content.subject,
    text: validate.value.content.text,
    html: validate.value.content.html
  })
    .then((rez) => {
      res.status(200).json({
        ...rez
      })
    })
    .catch((err) => {
      console.error(err)
      res.status(500).json({
        ...err
      })
    })
})

server.listen(PORT, () => console.log("Server open on port:", PORT))
