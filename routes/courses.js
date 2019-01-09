const express = require('express');
const router = express.Router();

const courses = [
 {id: 1, name: 'javascript'},
 {id: 2, name: 'node'},
 {id: 3, name: 'ruby'}
]

router.get('/', (request, response) => {
  response.send(courses);
})

router.get('/:id', (request, response) => {
  const course = courses.find(c => c.id === +request.params.id)
  if(!course) response.status(404).send('The course with this id doesnt exist')
  response.send(course);
})

router.get('/:id/:name', (request, response) => {
  response.send(request.params)
})

router.get('/:id', (request, response) => {
  response.send(request.query)
})

//http post requests

router.post('/', (req, resp) => {
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

router.put('/:id', (request, response) => {
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

// HTTP DELETE
router.delete('/:id', (request, response) => {
  //find course , if not found return 404
  const course = courses.find(c => c.id === +request.params.id)
  if(!course) response.status(404).send('The course with this id doesnt exist')
  //delete
  const index = courses.indexOf(course);
  courses.splice(index, 1);
  response.send(course)
})

const courseValidator = course => {
  const schema = {
    name: Joi.string().min(3).required()
  }
  return Joi.validate(course, schema);
}

module.exports = router;
