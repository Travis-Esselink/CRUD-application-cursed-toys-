// Accessing the dotenv plugin
require('dotenv').config()

// Variables for accessing express, mongoose and method override
const express = require('express')
const mongoose = require('mongoose')
const methodOverride = require("method-override")

// Variables for accessing express session and connext-mongodb-session middlewares to store session data
const session = require('express-session')
const mongoDBSession = require('connect-mongodb-session')



// const passport = require('passport')
// const flash = require('flash')


// const User= require('.models.userModel')


// Variables for accessing object model and controller
const Deck = require('./models/deckModel')
const decksiteController = require('./controllers/decksite')

// Variable for accessing object list
const seedData = require('./seed/decksList')


// Variables for express, port number database URL and database
const app = express()
const PORT = process.env.PORT
const dbURL = process.env.MONGODB_URL
const db = mongoose.connection

// Variable for accessing connect-mongodb-sessions
const mongoDBStore = mongoDBSession(session)
// Variable for accessing mongoDBStore, providing the databse URL and designating the 'sessions' collection in order to store sessions in mongoDB
const sessionStore = new mongoDBStore({
    uri: dbURL,
    collection: 'sessions'
})



// Not sure if this line is required
app.use(express.static('public'))
 // Not sure what this line does tbh
app.use(express.urlencoded({ extended: true }))
// Accessing the _method function of method override to be used in edit, update and delete routes
app.use(methodOverride("_method"))

// Utilising the express app session function and providing some params.... ? double check why 
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: sessionStore
}))


// Connecting to database via its URL using mongoose.connect
mongoose.connect(dbURL, () => {
    console.log('Connected to decks db')
})

// Deck
//    .insertMany(seedData)
//    .then((decks) => {
//     console.log('Added deck data', decks)
//     db.close()
//    })

// Listens for request on port accessed via .env file
app.listen(PORT, ()=>  {
    console.log('Listening on port', PORT)
})


// Using express to call controller file
app.use(decksiteController)