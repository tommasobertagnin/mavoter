const mongoose = require('mongoose')
const Schema = mongoose.Schema

const optionSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  votes: {
    type: Number,
    required: true
  }
})

const pollSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  options: {
    type: [optionSchema],
    required: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Poll', pollSchema)

