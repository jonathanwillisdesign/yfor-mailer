const express = require('express');
const PORT = 3000;

const app = express()

app.get('/', (req, res) => {
  console.log("Running")
  res.json({message: "Server Working"})
})

app.listen(PORT)
