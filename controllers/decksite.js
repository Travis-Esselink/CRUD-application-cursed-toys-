// Variables for and accessing express, object model, method override
const express = require('express')
const Deck = require('../models/deckModel')
const methodOverride = require("method-override")
// Variable for express router function
const router = express.Router()
// Variable for accessing ensure-login plugin
const ensureLogin = require('connect-ensure-login')
// Variable to access upload.js from middlewares folder
const upload = require('../middlewares/upload')

// All routes listed below will now only be accessible by logged in users
router.use(ensureLogin.ensureLoggedIn())


// INDEX
router.get('/decksite', async (req, res) => {
    const decks = await Deck.find()
    res.render('index.ejs', {
        decks: decks,
        tabTitle: ''
    })
})

// NEW 
router.get('/decksite/new', (req, res) => {
    res.render('new.ejs',{
        tabTitle: 'New Deck'
    })
})

// CREATE
router.post('/decksite', upload.single('img'), async (req, res) => {
    req.body.img = req.file.path
   await Deck.create(req.body)
   res.redirect('/decksite')
})

// EDIT 
router.get('/decksite/:id/edit', async (req, res) => {
    const deck = await Deck.findById(req.params.id)
    res.render('edit.ejs', {
        deck: deck,
        tabTitle: 'Edit Deck Listing'
    })
  
})

// UPDATE
router.put('/decksite/:id', upload.single('img'), async (req, res) => {
    req.body.img = req.file.path
    const deck = await Deck.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
        )
    console.log('Updated deck', deck)
    res.redirect(`/decksite/${req.params.id}`)
})


// DELETE 
router.delete('/decksite/:id', async (req, res) => {
    const deck = await Deck.findByIdAndRemove(req.params.id)
    console.log('Deleted deck', deck)
    res.redirect('/decksite')
   })


// SHOW
router.get('/decksite/:id', async (req, res) => {
    const deck = await Deck.findById(req.params.id)
    res.render('show.ejs', {
        deck: deck,
        tabTitle: deck.name
    })
})

module.exports = router