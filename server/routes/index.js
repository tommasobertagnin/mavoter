const path = require('path')
const Router = require('express').Router()
const jwt = require('../jwt')

Router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/index.html'))
})

Router.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/login.html'))
})

Router.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/register.html'))
})

Router.get('/protected-page', jwt.verifyUser, (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/protected.html'))
})

module.exports = Router