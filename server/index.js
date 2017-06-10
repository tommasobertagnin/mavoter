const bodyParser = require('body-parser')
const express = require('express')
const helmet = require('helmet')
const mongoose = require('mongoose')
const morgan = require('morgan')
const passport = require('passport')
const passportLocalStrategy = require('passport-local').Strategy
const path = require('path')

// load .env
require('dotenv').config()

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(helmet())
app.use(morgan('dev')) // TODO: remove in production

// authentication
const User = require('./models/user')
app.use(passport.initialize())
passport.use(new passportLocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

// MongoDB database
const DB_URL = process.env.NODE_ENV === 'production'
  ? process.env.DB_URL_PRODUCTION
  : process.env.DB_URL_DEV
mongoose.connect(DB_URL)
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => console.log('MongoDB is connected'))

// serve static files
const PUBLIC_PATH = path.resolve(__dirname, '../public')
app.use(express.static(PUBLIC_PATH))

// mount routes and API endpoints
app.use('/', require('./routes'))
app.use('/api/users', require('./api/users'))
app.use('/api/polls', require('./api/polls'))

// handle errors
app.use((req, res, next, err) => {
  res.status(err.status || 500)
  res.json({ message: err.message })
})

app.listen(process.env.PORT || 8080, () => {
  console.log('Server is Live!')
})