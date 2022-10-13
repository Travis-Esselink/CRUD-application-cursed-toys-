// Variable to access express
const express = require('express')
// Variable to access router feature
const router = express.Router()
// Variable to access user object model
const User = require('../models/userModel')
// Variable to access passport middleware
const passport = require('passport')



// REGISTER 
router.get('/register', (req, res) => {
    res.render('register.ejs', {
        tabTitle: 'Register'
    })
})

// REGISTER POST
router.post('/register', async (req, res) => {
    const { username, password } = req.body
    try {
    const user = await User.register(
        new User ({ username: username }),
        password
    )
    req.login(user, () => {
        res.redirect('/decksite')
    }) 
    } catch (error) {
        req.flash('error', error.message)
        res.redirect('/register')
    }
})

// LOGIN 
router.get('/login', (req, res) => {
    if (req.isAuthenticated()) {
        res.redirect('/decksite')
    } else {
        res.render('login.ejs', {
            tabTitle: 'Login'
        })
    }
})

// LOGIN POST
router.post('/login', passport.authenticate('local', {
    failureRedirect: '/login',
    successRedirect: '/decksite',
    failureFlash: true
}))

// LOGOUT
router.post('/logout', (req, res) => {
    req.logout(() => {
        res.redirect('/')
    })
})



module.exports = router



