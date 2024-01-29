const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser'); // Import body-parser

const PORT = 3000;

const app = express()

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res) => {
  console.log("Running")
  res.json({"response": "ready"})
})

app.post('/', (req, res) => {
  console.log(req.body)
  res.json({"response": "sent", "name": req.body.name})
})

app.listen(PORT)
