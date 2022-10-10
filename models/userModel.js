// Variable accessing mongoose middleware and passport-local-mongoose plugin
const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')

// Create user schema (blank object)
const userSchema = new mongoose.Schema({})

// Connect user schema to passport local mongoose plugig to simplify authentication and user verification process
userSchema.plugin(passportLocalMongoose)

// Variable using mongoose model with parameters of userModel and userSchema
const User = mongoose.model('User', userSchema)

module.exports = User