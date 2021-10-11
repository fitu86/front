const express = require('express')
const app = express();

app.get('/', (req, res) => {
  res.send('Hola mundo!')
});

app.listen(8000, () => {
  console.log('Example app listening on port 8000!')
});
