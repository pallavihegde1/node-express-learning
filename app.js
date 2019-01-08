const express = require('express');
const Joi = require('joi');

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
  const schema = {
    name: Joi.string().min(3).required()
  }
  const {error} = courseValidator(request.body);
  if(error) {
    response.status(400).send(error.details[0].message);
    return;
  }
  const course = {
    id: courses.length + 1,
    name: req.body.name
  }
  courses.push(course)
  resp.send(course);
})

//http put requests

app.put('/api/courses/:id', (request, response) => {
  //find course , if not found return 404
  const course = courses.find(c => c.id === +request.params.id)
  if(!course) response.status(404).send('The course with this id doesnt exist')
  //validate the incoming course, if invalid return 400-Bad requests
  const {error} = courseValidator(request.body);
  if(error) {
    response.status(400).send(error.details[0].message);
    return;
  }
  //update the course
  course.name = request.body.name
  response.send(course)
})

const courseValidator = course => {
  const schema = {
    name: Joi.string().min(3).required()
  }
  return Joi.validate(course, schema);
}

const port = process.env.PORT || 3006
app.listen(port, () => console.log(`listening on port ${port}`))
