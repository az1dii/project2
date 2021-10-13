// import the connected mongoose object
const mongoose = require("./connection")


/////////////////////////////////////////
// Our Model
/////////////////////////////////////////
const {Schema, model} = mongoose

const snowboardSchema = new Schema({
    username: String,
    name: String,
    profile: String,
    damaged: Boolean,
    terrain: String,
    size: Number,
    flex: String,
    year: Number,
    brand: String,
})

const Snowboard = model("Snowboard", snowboardSchema)

//export the model
module.exports = Snowboard