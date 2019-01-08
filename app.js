const express = require('express');
const app = express()
app.use(express.json());

const courses = [
 {id: 1, name: 'javascript'},
 {id: 2, name: 'node'},
 {id: 3, name: 'ruby'}
]

app.get('/', (request, response) => {
  response.send('Hello World , how u?');
})


app.get('/api/courses', (request, response) => {
  response.send(courses);
})

app.get('/api/courses/:id', (request, response) => {
  const course = courses.find(c => c.id === +request.params.id)
  if(!course) response.status(404).send('The course with this id doesnt exist')
  response.send(course);
})

app.get('/api/courses/:id/:name', (request, response) => {
  response.send(request.params)
})

app.get('/api/posts/:id', (request, response) => {
  response.send(request.query)
})

//http post requests

app.post('/api/courses', (req, resp) => {
  if(!req.body.name || req.body.name.length < 3) {
    resp.status(400).send('name is required and should be a minimum of 3 characters')
  }
  const course = {
    id: courses.length + 1,
    name: req.body.name
  }
  courses.push(course)
  resp.send(course);
})


const port = process.env.PORT || 3006
app.listen(port, () => console.log(`listening on port ${port}`))
