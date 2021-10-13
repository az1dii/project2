// import the connected mongoose object
const mongoose = require("./connection")


/////////////////////////////////////////
// Our Model
/////////////////////////////////////////
const {Schema, model} = mongoose

const snowboardSchema = new Schema({
    name: String,
    profile: String,
    damaged: Boolean,
    terrain: String,
    size: Number,
    flex: Number,
    year: Number,
    brand: String,
})

const Snowboard = model("Snowboard", snowboardSchema)

//export the model
module.exports = Snowboard