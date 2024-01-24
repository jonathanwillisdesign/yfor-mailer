const express = require('express');
const PORT = 3000;

const app = express()

app.get('/', (req, res) => {
  console.log("Hey")
  res.send('Hi')
})

app.listen(PORT)
