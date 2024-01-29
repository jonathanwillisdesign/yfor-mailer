require('dotenv').config()
const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "",
    pass: "",
  },
});

async function newEnquiryNotificationEmail({email, name, message}) {
  const info = await transporter.sendMail({
    from: {
      name: name,
      address: email
    },
    to: process.env.NOTIFICATION_EMAIL,
    subject: `New Enquiry - ${name}`,
    html: `<p>New enquiry from ${name}</p><br><p>Email - ${email}</p><br><p>${message}</p>`,
  });

  console.log("Message sent: %s", info.messageId);
}

const PORT = process.env.PORT || 3000;

const app = express()

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res) => {
  console.log("Running")
  res.json({"response": "ready"})
})

app.post('/', (req, res) => {
  const { email, name, message } = req.body;

  if (!email || !name || !message) {
    res.status(400).json({"response": "incomplete"});
    return;
  }
  
  newEnquiryNotificationEmail({email, name, message}).catch(console.error())

  res.json({"response": "sent", "name": req.body.name})
})

app.listen(PORT)
