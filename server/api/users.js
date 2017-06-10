const mongoose = require('mongoose')
const usersRouter = require('express').Router()

usersRouter.post('/login', (req, res) => {
  const { email, password } = req.body
  // TODO: IMPLEMENT LOGIN
  res.json({ ok: `trying to log in as: ${email}@${password}` })
})

module.exports = usersRouter