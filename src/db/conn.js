const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/studentsapi")
  .then(() => {
    console.log("database connection successful");
  })
  .catch((e) => {
    console.log(e);
  });
