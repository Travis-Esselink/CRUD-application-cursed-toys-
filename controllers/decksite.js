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

const User = require('../models/userModel')

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
    const user = req.user.username
    res.render('new.ejs', {
        user,
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
    const user = req.user.username
    res.render('edit.ejs', {
        deck,
        user,
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
router.get('/decksite/:id', async (req, res, next) => {
    try {
        const deck = await Deck.findById(req.params.id)
        if (deck) {
            res.render('show.ejs', {
                deck: deck,
                tabTitle: deck.name
            })
        } else {
            throw new Error('Deck not found')
        }
    } catch (error) {
        next(error)
    }
})

// *** FILTER ROUTES ***

// ALL BRANDS 
router.get('/brand', async (req, res) => {
    const brands = await Deck.find(req.params.brand).distinct('brand')
    brands.sort(function (a, b) {
        return a.localeCompare(b)
    })

    res.render('allbrands.ejs', {
       brands
    })
})

// BRAND
router.get('/brand/:brand', async (req, res) => {
    const decks = await Deck.find({ brand: req.params.brand })
    res.render('brand.ejs', {
        decks
    })
})

// ALL WIDTHS

router.get('/width', async (req, res) => {
    const widths = await Deck.find(req.params.brand).distinct('width')
    widths.sort(function (a, b) {
        return a - b
    })
    res.render('allwidths.ejs', {
       widths
    })
})

// WIDTH

router.get('/width/:width', async (req, res) => {
    const decks = await Deck.find({ width: req.params.width })
    res.render('width.ejs', {
        decks
    })
})

// ALL LENGTHS

router.get('/length', async (req, res) => {
    const lengths = await Deck.find(req.params.length).distinct('length')
    lengths.sort(function (a, b) {
        return a - b
    })
    res.render('alllengths.ejs', {
       lengths
    })
})

// LENGTH

router.get('/length/:length', async (req, res) => {
    const decks = await Deck.find({ length: req.params.length })
    res.render('length.ejs', {
        decks
    })
})

// ALL WHEELBASES

router.get('/wheelbase', async (req, res) => {
    const wheelbases = await Deck.find(req.params.wheelbase).distinct('wheelbase')
    wheelbases.sort(function (a, b) {
        return a - b
    })
    res.render('allbases.ejs', {
       wheelbases
    })
})

// WHEELBASE

router.get('/wheelbase/:wheelbase', async (req, res) => {
    const decks = await Deck.find({ wheelbase: req.params.wheelbase })
    res.render('wheelbase.ejs', {
        decks
    })
})

// ALL COLLECTIONS

router.get('/collections', async (req, res) => {
    const owners = await Deck.find(req.params.owner).distinct('owner')
    owners.sort(function (a, b) {
        return a.localeCompare(b)
    })
    res.render('allcollections.ejs', {
       owners
    })
})

// COLLECTION
router.get('/collections/:owner', async (req, res) => {
    const decks = await Deck.find({ owner: req.params.owner })
    res.render('collection.ejs', {
        decks
    })
})


// MY COLLECTION
router.get('/mycollection', async (req, res) => {
    const decks = await Deck.find({ owner: req.user.username })
    const user = req.user.username
    res.render('mycollection.ejs', {
        decks,
        user
    })

})

module.exports = router