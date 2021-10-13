////////////////////////////////////
// Import all our dependencies
/////////////////////////////////////
require("dotenv").config() // load env vars
const express = require("express") // import express
const morgan = require("morgan") // import morgan
const methodOverride = require("method-override")
const UserRouter = require("./controllers/user")
const session = require('express-session');
const MongoStore = require('connect-mongo');

const snowboardRouter = require("./controllers/snowboard")

/////////////////////////////////////////////////
// Create our Express Application Object
/////////////////////////////////////////////////
const app = express()


/////////////////////////////////////////////////////
// Middleware
/////////////////////////////////////////////////////
app.use(morgan("tiny")) //logging
app.use(methodOverride("_method")) // override for put and delete requests from forms
app.use(express.urlencoded({extended: true})) // parse urlencoded request bodies
app.use(express.static("public")) // serve files from public statically
app.use(session({
    secret: process.env.SECRET,
    store: MongoStore.create({mongoUrl: process.env.DATABASE_URL}),
    saveUninitialized: true,
    resave: false,
}))
app.use("/snowboards", snowboardRouter)
app.use("/user", UserRouter) // "/user/signup" & "/user/login"

////////////////////////////////////////////
// Initial Route
////////////////////////////////////////////
app.get("/", (req, res) => {
    res.render("index.ejs")
})


////////////////////////////////////////////////////////////////////////////
// Server Listener
////////////////////////////////////////////////////////////////////////////
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Now Listening on port ${PORT}`))
