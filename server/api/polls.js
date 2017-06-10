const mongoose = require('mongoose')
const pollsRouter = require('express').Router()
const Poll = require('../models/poll')

// TODO: add polls tests

pollsRouter.get('/list', (req, res) => {
  Poll.find({})
    .limit(35)
    .exec((err, polls) => {
      if (err) {
        return res.json(err)
      }
      res.json(polls)
    })
})

pollsRouter.get('/poll/:id', (req, res) => {
  Poll.findOne({ _id: req.params.id })
    .exec((err, poll) => {
      if (err) {
        return res.json(err)
      }
      res.json(poll)
    })
})

/* PRIVATE ENDPOINTS */
// TODO: PROTECT PRIVATE ENDPOINTS WITH AUTH MIDDLEWARE

pollsRouter.post('/new-poll', (req, res) => {
  const {
    title,
    options,
    username
  } = req.body

  const newPoll = new Poll({ title, options, username })
  
  newPoll.save((err, result) => {
    if (err) {
      return res.json(err)
    }
    res.json(result)
  })
})

pollsRouter.put('/poll/:id', (req, res) => {
  const _id = req.params.id
  const newObj = req.body.poll
  const opts = {
    runValidators: true,
    new: true
  }

  Poll.findOneAndUpdate({ _id }, newObj, opts, (err, doc) => {
      if (err) {
        return res.json(err)
      }
      res.json(doc)
    })
})

pollsRouter.delete('/poll/:id', (req, res) => {
  const _id = req.params.id
  
  Poll.findOneAndRemove({ _id }, (err, deletedDoc) => {
      if (err) {
        return res.json(err)
      }
      res.json(deletedDoc)
    }
  )
})

module.exports = pollsRouter