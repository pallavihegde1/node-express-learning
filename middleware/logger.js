function log(req, resp, next) {
  console.log('logging...')
  next();
}

module.exports = log;
