const jwt = require('jsonwebtoken')
const User = require('./models/user')

exports.getToken = user => jwt.sign(user, process.env.SECRET_KEY, { expiresIn: 3600 })

exports.verifyUser = (req, res, next) => {
  console.log(req.headers['x-access-token'])
  const token = req.body.token || req.query.token || req.headers['x-access-token']
  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      console.log(err)
      if (err) {
        err.status = 401
        return next(err)
      }
      req.decoded = decoded
      next()
    })
  } else {
    next({ message: 'No token provided!', status: 403 })
  }
}