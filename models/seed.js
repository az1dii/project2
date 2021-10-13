////////////////////////////////////////////
// Import Dependencies
////////////////////////////////////////////
const mongoose = require("./connection");
const Snowboard = require("./snowboard");

////////////////////////////////////////////
// Seed Code
////////////////////////////////////////////

mongoose.connection.on("open", () => {
  // Run database queries in this function

  // create array of starter
  const startSnowboards = [
    { year: 2019, brand: "Burton", name: "Deep Thinker", flex: "medium", profile: "Directional Camber", size: 154, damaged: false },
    { year: 2019, brand: "Capita", name: "DOA", flex: "medium", Profile: "Camber", size: 154, damaged: false },
    { year: 2019, brand: "Signal", name: "Distruptor", flex: "medium", Profile: "Camber", size: 152, damaged: false },
  ];

  // Delete all snowboards
  Snowboard.deleteMany({}, (err, data) => {
      //seed starter snowboards
      Snowboard.create(startSnowboards, (err, data) => {
          // log the create snowboards to confirm
      console.log("--------SNOWBOARD CREATED----------");
      console.log(data);
      console.log("--------SNOWBOARD CREATED----------");

      // close the DB connection
      mongoose.connection.close();
      })
  })
});