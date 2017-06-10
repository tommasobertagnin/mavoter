const bodyParser = require('body-parser')
const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const path = require('path')

require('dotenv').config()
const PUBLIC_PATH = path.resolve(__dirname, '../public')
const DB_URL = process.env.NODE_ENV === 'production'
  ? process.env.DB_URL_PRODUCTION
  : process.env.DB_URL_DEV

const app = express()

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(PUBLIC_PATH))

mongoose.connect(DB_URL)
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))

db.once('open', () => {
  app.use('/', require('./routes'))
  app.use('/api/users', require('./api/users'))
  app.use('/api/polls', require('./api/polls'))
})

app.listen(process.env.PORT || 8080, () => {
  console.log('Server is Live!')
})