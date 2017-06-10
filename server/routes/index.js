const path = require('path')
const Router = require('express').Router()

Router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/index.html'))
})

Router.get('/user/login', (req, res) => {
  console.log(req.cookies)
  res.sendFile(path.join(__dirname, '../../public/login.html'))
})

module.exports = Router