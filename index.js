const express = require('express');
const cors = require('cors')
const PORT = 3000;

const app = express()

app.use(cors())

app.get('/', (req, res) => {
  console.log("Running")
  res.json({message: "Server Working"})
})

app.listen(PORT)
