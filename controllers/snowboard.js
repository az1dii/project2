///////////////////////////////////////
// Import Dependencies
///////////////////////////////////////
const express = require("express")
const Snowboard = require("../models/snowboard")

///////////////////////////////////////
// create router
///////////////////////////////////////
const router = express.Router()

////////////////////////////////////////
// Router Middleware
////////////////////////////////////////
// Authorization Middleware
router.use((req, res, next) => {
    if (req.session.loggedIn) {
      next();
    } else {
      res.redirect("/user/login");
    }
});
  
///////////////////////////////////////
// routes
///////////////////////////////////////


// Index Route (Get => /snowboards)
router.get("/", (req, res) => {
    Snowboard.find({username: req.session.username}, (err, snowboards) => {
        res.render("snowboards/index.ejs", {snowboards})
    })
})

// New Route (Get => /snowboards/new)
router.get("/new", (req, res) => {
    res.render("snowboards/new.ejs")
})

router.post("/", (req, res) => {
    // convert damaged to true or false
    req.body.damaged = req.body.damaged === "on" ? true : false
    // add the username to req.body
    req.body.username = req.session.username
    // create the new snowboard
    Snowboard.create(req.body, (err, snowboard) => {
        //send the user back to index
        res.redirect("/snowboards")
    })
})

// The Edit Route (Get => /snowboards/:id/edit)
router.get("/:id/edit", (req, res) => {
    const id = req.params.id // get id from params
    // get snowboard from database
    Snowboard.findById(id,(err, snowboard) => {
        //render a template
        res.render("snowboards/edit.ejs", {snowboard})
    })

})

// THe Update Route (PUT => /snowboards/:id)
router.put("/:id", (req, res) =>{
    // get the id param
    const id = req.params.id
    // convert damaged to true or false
    req.body.damaged = req.body.damaged === "on" ? true : false
    //update the snowboard
    Snowboard.findByIdAndUpdate(id, req.body, {new: true}, (err, snowboard) => {
        //redirect back to main page
        res.redirect("/snowboards")
    })
})

router.delete("/:id", (req, res) => {
    const id = req.params.id
    Snowboard.findByIdAndRemove(id, (err, snowboard) => {
        res.redirect("/snowboards")
    })
})

// THe Show (GET => /snowboards/:id)
router.get("/:id", (req, res) => {
    // grab the id from params
    const id = req.params.id

    Snowboard.findById(id, (err, snowboard) => {
        //render the template
        res.render("snowboards/show.ejs", {snowboard})
    })
})

///////////////////////////////////////
// export the router
///////////////////////////////////////
module.exports = router