const express = require('express');
const Joi = require('joi');
const logger = require('./middleware/logger');
const morgan = require('morgan')
const courseRoutes = require('./routes/courses');

const app = express()
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'));
app.use('/api/courses', courseRoutes);

console.log(`NODE_ENV: ${process.env.NODE_ENV}`)
console.log(`app: ${app.get('env')}`)

//middleware
app.use(logger);

if(app.get('env') === 'development') {
  app.use(morgan('tiny'));
  console.log('Morgan enabled');
}
app.use(function(req, resp, next) {
  console.log('second custom middleware')
  next();
})


const port = process.env.PORT || 3006
app.listen(port, () => console.log(`listening on port ${port}`))
