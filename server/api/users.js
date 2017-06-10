const mongoose = require('mongoose')
const passport = require('passport')
const usersRouter = require('express').Router()
const User = require('../models/user')
const jwt = require('../jwt')

usersRouter.post('/register', (req, res) => {
  User.register(
    new User({ username: req.body.username }),
    req.body.password,

    function (err) {
      if (err) {
        return res.status(500).json({ err })
      }
      res.redirect('/')
    }
  )
})

usersRouter.post('/login', passport.authenticate('local'), (req, res) => {
  if (!req.user) {
    res.json({ message: 'No user available' })
  }
  res.json({ token: jwt.getToken(req.user) })
})

usersRouter.post('/logout', (req, res) => {
  // TODO: destroy token
  req.logOut()
  res.redirect('/')
})

module.exports = usersRouter