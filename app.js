const express = require('express');
const app = express()

app.get('/', (request, response) => {
  response.send('Hello World , how u?');
})


app.get('/api/courses', (request, response) => {
  response.send(['javascript', 'node', 'react', 'ruby']);
})


app.listen(3006, () => console.log('listening on port 3006'))
