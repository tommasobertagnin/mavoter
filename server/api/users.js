const mongoose = require('mongoose')
const usersRouter = require('express').Router()

usersRouter.post('/login', (req, res) => {
  const { username, password } = req.body
  // TODO: IMPLEMENT LOGIN
  res.json({ ok: `trying to log in as: ${username}@${password}` })
})

module.exports = usersRouter