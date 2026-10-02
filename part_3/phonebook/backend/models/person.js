const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

mongoose.connect(process.env.MONGODB_URI, {family: 4})

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

module.exports = mongoose.model('Person', personSchema)