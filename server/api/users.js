const mongoose = require('mongoose')
const usersRouter = require('express').Router()

const URL = process.env.NODE_ENV === 'production'
  ? process.env.DB_URL_PRODUCTION
  : process.env.DB_URL_LOCAL

mongoose.connect(URL)
const db = mongoose.connection

db.once('open', () => {
  usersRouter.post('/login', (req, res) => {
    const { username, password } = req.body
    // TODO: IMPLEMENT LOGIN
    res.json({ ok: `trying to log in as: ${username}@${password}` })
  })
})

db.on('error', console.error.bind(console, 'connection error:'))

module.exports = usersRouter