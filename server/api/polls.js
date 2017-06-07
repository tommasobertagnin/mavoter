const mongoose = require('mongoose')
const pollsRouter = require('express').Router()
const Poll = require('./poll.model')

// TODO: add polls tests

pollsRouter.get('/list', (req, res) => {
  Poll.find({})
    .limit(35)
    .exec((err, polls) => {
      // TODO: handle error
      if (err) {
        return res.json(err)
      }
      res.json(polls)
    })
})

pollsRouter.get('/poll/:id', (req, res) => {
  Poll.findOne({ _id: req.params.id })
    .exec((err, poll) => {
      // TODO: handle error
      if (err) {
        return res.json(err)
      }
      res.json(poll)
    })
})

/* PRIVATE ENDPOINTS */
// TODO: PROTECT ENDPOINTS WITH AUTH MIDDLEWARE

pollsRouter.post('/new-poll', (req, res) => {
  const {
    title,
    options,
    username
  } = req.body

  const newPoll = new Poll({ title, options, username })
  
  newPoll.save((err, result) => {
    // TODO: handle error
    if (err) {
      return res.json(err)
    }
    res.json(result)
  })
})

module.exports = pollsRouter