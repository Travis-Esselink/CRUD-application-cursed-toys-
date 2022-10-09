// Defining variables for and accessing express, object model, method override
const express = require('express')
const Deck = require('../models/deckModel')
const methodOverride = require("method-override")
// Defining variable for express router function
const router = express.Router()


// INDEX
router.get('/decksite', async (req, res) => {
    const decks = await Deck.find()
    res.render('index.ejs', {
        decks: decks,
        tabTitle: ''
    })
})

// NEW route
router.get('/decksite/new', (req, res) => {
    res.render('new.ejs',{
        tabTitle: 'New Deck'
    })
})

// CREATE route
router.post('/decksite', async (req, res) => {
   await Deck.create(req.body)
   res.redirect('/decksite')
})

// EDIT route
router.get('/decksite/:id/edit', async (req, res) => {
    const deck = await Deck.findById(req.params.id)
    res.render('edit.ejs', {
        deck: deck,
        tabTitle: 'Edit Deck Listing'
    })
  
})

// UPDATE route
router.put('/decksite/:id', async (req, res) => {
    const deck = await Deck.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
        )
    console.log('Updated deck', deck)
    res.redirect(`/decksite/${req.params.id}`)
})


// DELETE route
router.delete('/decksite/:id', async (req, res) => {
    const deck = await Deck.findByIdAndRemove(req.params.id)
    console.log('Deleted deck', deck)
    res.redirect('/decksite')
   })


// SHOW route
router.get('/decksite/:id', async (req, res) => {
    const deck = await Deck.findById(req.params.id)
    res.render('show.ejs', {
        deck: deck,
        tabTitle: deck.name
    })
})

module.exports = router