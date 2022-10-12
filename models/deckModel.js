const mongoose = require('mongoose')

const Schema = mongoose.Schema

const deckSchema = new Schema ({
    name: String,
    brand: String,
    width: Number,
    length: Number,
    wheelbase: Number,
    woodshop: String,
    img: String,
    owner: String
})

const Deck = mongoose.model('Deck', deckSchema)

module.exports = Deck